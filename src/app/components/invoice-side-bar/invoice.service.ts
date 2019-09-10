import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {

    constructor(private http: HttpClient) {
    }

    getInvoiceList() {
        const queryUrl = environment.apiURl;
        return this.http.get<any>(queryUrl)
            .pipe(map((body) => body));
    }
}
