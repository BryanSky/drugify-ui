import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import * as ScanditSDK from 'scandit-sdk';
import {DrugsService} from '../../services/drugs/drugs.service';
import {Drug} from '../../models/drug';
import {FormControl, FormGroup} from '@angular/forms';
import {UserService} from '../../services/users/user.service';
import {environment} from '../../../environments/environment';
import {DrugHistory} from '../../models/drugHistory';

@Component({
    selector: 'app-barcode-scanner',
    templateUrl: './barcode-scanner.component.html',
    styleUrls: ['./barcode-scanner.component.css'],
})
export class BarcodeScannerComponent implements OnInit, AfterViewInit {
    public scanning = false;
    public inputValue: string;
    public scannedDrug: Drug;
    public hasConflict: boolean;
    public saveSuccess: boolean;
    public retryScan = false;


    fromDateStr;
    toDateStr;

    private scannerContainer: HTMLElement;
    private scanInput: HTMLElement;
    private picker: ScanditSDK.BarcodePicker;

    constructor(private drugService: DrugsService, private userService: UserService) {
    }

    ngOnInit() {
        this.fromDateStr = new FormControl('2019-03-09');
        this.toDateStr = new FormControl('2019-03-10');
    }

    public ngAfterViewInit(): void {
        this.scannerContainer = document.getElementById('scandit-barcode-picker');
        this.scanInput = document.getElementById('scan-input');
        this.initializeScanner();
    }

    private stopScanning(): void {
        this.scanning = false;
        if (this.picker) {
            this.picker.pauseScanning();
        }
    }

    private initializeScanner(): void {
        // Configure the library and activate it with a license key
        const licenseKey = 'AUSsvAmMFdcTMaMl3UPh11YKZtj3KdetOkjuP/JhX2snS0EyJFNi/S9MSYMwXCAXKleGSEJS+Q3oQU3S01wBYX1i/sZkPpa7vlsga8dKw3rTLAx1DX597yBmN3nCd35vrGrqwGEDUZLxNEEUMHsEVwBpF7zqlAtZA8dANzh+qoZGtknzswvrBqJSPoXgvKd3Indjf/S6tCt3gVX0FiGPSlGO96qOY8dFPLpNlN59LzVeBncAFim1ztFlAmIVvDfqgp4aVrcP9riBahUQHSSWho9KI5BFWfMCgLyG1Z77x0QoT/w+aqwYruBboMot+6ui6QTwCKekixSKI5aUPktz6NReVtpmJkqb47CpKD+vuSVvk3Jwg7PlJsDXEgkUi5X8Nf3K8dnCVdbg1XY8dK0eBDsTOmNc6c6BAm0xBhcPnfmEHb9f4KRG2kYm5jlZSC+5g7A4qKPcvuZi5Wf+KThNYuUDeKHAoSIVX+BDv6ER+zksRBI9uxOA0ZI8Ekl4N0kqHZTnVLc4BpjLzisNAGNS9nAQw2A152DF64kmZA/O6+o6Bi14ur1Macv7+WVljqCw99u2vh2dJfqmyU7nFCecft8K1DQWUMrwBu+/cRnWGMYwEsOEqgSe8OmyI9uqWwiJGzwjyCxsv3Tsefxy6M5AK6+BBAlHzBWn0FKv1dDfoVo0/3Hp4a2kBoVYydgSba3+D1Jv8jQz7bOfjH/wOXblsz0Ucnb5D2XiYvWGOFu818nc5tGQrLEumDD58ZgieLxPHBDK1LwN4E8CgxoUx3CzKQFth4bSm3IAiphw1tax9R50J3d3jqqnQ7vJD/Oo';
        ScanditSDK.configure(licenseKey, {engineLocation: 'assets/'});

        ScanditSDK.BarcodePicker.create(this.scannerContainer)
            .then(barcodePicker => {
                this.picker = barcodePicker;

                const scanSettings = new ScanditSDK.ScanSettings({
                    enabledSymbologies: [
                        ScanditSDK.Barcode.Symbology.EAN8,
                        ScanditSDK.Barcode.Symbology.EAN13,
                        ScanditSDK.Barcode.Symbology.UPCA,
                        ScanditSDK.Barcode.Symbology.UPCE,
                        ScanditSDK.Barcode.Symbology.CODE128,
                        ScanditSDK.Barcode.Symbology.CODE39,
                    ]
                });
                this.picker.applyScanSettings(scanSettings);

                this.picker.onScan(this.handleScan.bind(this));
                this.picker.onScanError(error => alert(error.message));
                this.picker.resumeScanning();
            })
            .catch(error => alert(error));
    }

    private handleScan(scanResult: ScanditSDK.ScanResult): void {
        console.log('BarcodeScannerComponent -> handleScan() called');
        this.stopScanning();
        this.inputValue = scanResult.barcodes[0].data;
        this.retryScan = true;
        console.log('The barcode value is: ', this.inputValue);
        const swissMedicId = this.extractSwissMedicId(this.inputValue);

        if (swissMedicId) {
            this.drugService.getDrugById(swissMedicId)
                .subscribe((data) => {
                    this.scannedDrug = data;
                });

            this.userService.hasConflict('martin.ponbauer', swissMedicId)
                .subscribe((data) => {
                    this.hasConflict = false;
                }, (error) => {
                    this.hasConflict = true;
                });
        }
    }

    // Helper function called when the "Continue Scanning" button is clicked
    public continueScanning(): void {
        if (this.picker) {
            this.retryScan = false;
            this.scannedDrug = null;
            this.picker.resumeScanning();
        }
    }

    private extractSwissMedicId(barcode: string): string {
        if (barcode && barcode.length >= 10) {
            const swissMedicId = barcode.substring(4, 9);
            console.log('Found swiss medic id ', swissMedicId);
            return swissMedicId;
        }
        console.log('Barcode was invalid, returning null!');
        return null;
    }

    public addToHistory() {
        this.userService.createDrugHistory('martin.ponbauer', this.scannedDrug, this.fromDateStr.value, this.fromDateStr.value)
            .subscribe(value => {
                    console.log('Call was a success!');
                    this.saveSuccess = true;
                },
                err => {
                    console.error('Oops:', err.message);
                    this.saveSuccess = false;
                });
    }
}
