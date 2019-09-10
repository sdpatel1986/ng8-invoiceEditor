import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { InvoiceModel, InvoiceTotal, LineItem } from '../invoice-side-bar/invoice.model';

@Component({
    selector: 'app-invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit, OnChanges {
    @Input() invoiceDetail: InvoiceModel;
    invoiceTotal: InvoiceTotal = new InvoiceTotal();

    constructor() {

    }

    ngOnInit() {

    }

    ngOnChanges() {
        this.calculateInvoiceAmount();
    }

    addNewInvoice() {
        let obj: LineItem = new LineItem();
        obj.name = '';
        obj.description = '';
        obj.price_cents = 0;
        obj.quantity = 0;
        if (this.invoiceDetail.line_items[this.invoiceDetail.line_items.length - 1].name) {
            obj.price_cents = 0;
            obj.quantity = 0;
            this.invoiceDetail.line_items.push(obj);
        }

    }

    calculateInvoiceAmount() {
        let totalAmount = 0;
        this.invoiceDetail.line_items.forEach(res => {
            totalAmount = totalAmount + res.quantity * res.price_cents;
        });
        this.invoiceTotal.totalAmount = totalAmount;
        this.invoiceTotal.tax = (totalAmount * 19) / 100;
    }

    deleteInvoice(index) {
        this.invoiceDetail.line_items.splice(index, 1);
        this.calculateInvoiceAmount();
    }
}
