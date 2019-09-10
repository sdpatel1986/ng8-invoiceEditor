import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { InvoiceService } from './invoice.service';
import { InvoiceModel, InvoiceTotal } from './invoice.model';

@Component({
    selector: 'app-invoice-side-bar',
    templateUrl: './invoice-side-bar.component.html',
    styleUrls: ['./invoice-side-bar.component.css']
})

export class InvoiceSideBarComponent implements OnInit {
    invoiceList: Array<InvoiceModel> = [];
    invoiceDetail: InvoiceModel = new InvoiceModel();
    invoiceTotal: InvoiceTotal = new InvoiceTotal();
    isShow = false;
    setting = {
        element: {
            dynamicDownload: null as HTMLElement
        }
    };
    constructor(
        private invoiceService: InvoiceService
    ) {
    }

    ngOnInit() {
        this.invoiceService.getInvoiceList().subscribe(result => {
            if (result) {
                this.invoiceList = result;
                this.filterInvoiceList();
                this.calculateInvoice();

            }
        });
    }

    onSelectInvoice(invoice) {
        if (invoice.customer_id) {
            this.filterInvoiceList();
            invoice.isActive = true;
            this.isShow = true;
        }

    }

    /**
     * 
     * @param data updated line item of invoice
     */
    updatedInvoice(data) {
        this.invoiceList.forEach(result => {
            if (result.customer_id === data.customer_id) {
                result.line_items = data.line_items;
                result.totalAmount = 0;
                result.line_items.forEach(res1 => {
                    if (res1.price_cents) {
                        result.totalAmount = result.totalAmount + res1.quantity * res1.price_cents;

                    }
                });
            }
        });
        this.calculateInvoice();
    }

    filterInvoiceList() {
        let totalAmount = 0;
        this.invoiceList.forEach(res => {
            if (res.line_items && res.line_items.length > 0) {
                res.totalAmount = 0;
                res.line_items.forEach(res1 => {
                    if (res1.price_cents) {
                        res.totalAmount = res.totalAmount + res1.quantity * res1.price_cents;

                    }
                });
            }
            res.isEditable = false;
            res.isActive = false;
        });
    }

    importInvoice() {
        this.invoiceList.forEach(list => {
            if (list.isActive) {
                this.invoiceDetail = list;
            }
        });
    }

    calculateInvoice() {
        let totalAmount = 0;
        this.invoiceList.forEach(res => {
            totalAmount = totalAmount + +res.totalAmount;
        });
        this.invoiceTotal.totalAmount = totalAmount;
        this.invoiceTotal.tax = (totalAmount * 19) / 100;
    }

    addNewInvoice() {
        if (this.invoiceList[this.invoiceList.length - 1].customer_name) {
            let obj: InvoiceModel = new InvoiceModel();
            obj.customer_id = 0;
            obj.isEditable = true;
            obj.totalAmount = 0;
            obj.customer_name = '';
            this.invoiceList.push(obj);
        }

    }

    export() {
        if (this.invoiceDetail.customer_id > 0) {
            this.setting.element.dynamicDownload = document.createElement('a');
            const element = this.setting.element.dynamicDownload;
            const fileType = 'text/json';
            element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(JSON.stringify(this.invoiceList))}`);
            element.setAttribute('download', 'invoice.json');

            let event = new MouseEvent("click");
            element.dispatchEvent(event);
        }

    }



}
