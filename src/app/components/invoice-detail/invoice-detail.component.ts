import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { InvoiceModel, InvoiceTotal, LineItem } from '../invoice-side-bar/invoice.model';

@Component({
    selector: 'app-invoice-detail',
    templateUrl: './invoice-detail.component.html',
    styleUrls: ['./invoice-detail.component.css']
})
export class InvoiceDetailComponent implements OnInit, OnChanges {
    @Input() invoiceDetail: InvoiceModel;
    invoiceTotal: InvoiceTotal = new InvoiceTotal();
    quantityList: Array<any> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    @Output() calculateInvoice = new EventEmitter();

    constructor() {

    }

    ngOnInit() {
    }

    ngOnChanges() {
        this.calculateInvoiceAmount();
    }

    /**
     * it is use to add new line item to  selected invoice 
     */
    addNewInvoice = (): void => {
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

    /**
     * 
     * @param isChange this optional parameter for handle callling function by change qty or ngOnchange 
     * it use to calculate total amount of line item of selected invoice and apply tax on it total amount
     */

    calculateInvoiceAmount = (isChange?): void => {
        let totalAmount = 0;
        this.invoiceDetail.line_items.forEach(res => {
            totalAmount = totalAmount + res.quantity * res.price_cents;
        });
        this.invoiceTotal.totalAmount = totalAmount;
        this.invoiceTotal.tax = (totalAmount * 19) / 100;
        if (isChange === true) {
            this.viewContentData();

        }
    }

    /**
     * 
     * @param index its array index value to delete invoice
     */
    deleteInvoice = (index): void => {
        this.invoiceDetail.line_items.splice(index, 1);
        this.calculateInvoiceAmount();
    }

    /**
     * it is use to call parent component funtion for invoice calculation
     */
    viewContentData = (): void => {
        this.calculateInvoice.emit(this.invoiceDetail);

    }
}
