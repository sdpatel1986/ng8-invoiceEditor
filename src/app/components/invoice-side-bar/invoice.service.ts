import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    constructor(private http: HttpClient) {
    }

    getInvoiceList() {
        const queryUrl = '../../../assets/json/invoice.json';
        return this.http.get<any>(queryUrl)
            .pipe(map((body) => body));
    }
}
