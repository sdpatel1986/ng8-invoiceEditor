export class InvoiceModel {
    account_owner: string;
    bic: string;
    customer_address: string;
    customer_city: string;
    customer_contact_person: string;
    customer_id: number;
    customer_name: string;
    customer_zip: string;
    iban: string;
    invoice_date: string;
    invoice_due_date: string;
    invoice_number: string;
    invoice_period: string;
    mandate_city: string;
    mandate_date: string;
    mandate_reference: string;
    mandate_signee: string;
    totalAmount: number = 0;
    isActive: boolean;
    line_items: Array<LineItem> = [];
    isEditable: boolean;
    invoiceTotal: InvoiceTotal = new InvoiceTotal();

}

export class LineItem {
    description: string;
    name: string;
    price_cents: number;
    quantity: number;
}

export class InvoiceTotal {
    totalInvoiceAmount: number;
    tax: number = 0;
    totalAmount: number = 0;
}
