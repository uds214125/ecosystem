
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ConfigService {
  public url: String;
  public options: any;
  constructor(
        private _httpClient: HttpClient
    ) {
        this.url = 'http://localhost:4125/api';
        let headers = new HttpHeaders();
            headers = headers.set('Content-Type', 'application/json');
            this.options = { headers: headers };
    }

    getConfigurations(): Observable<any> {
        const url = `${this.url}/find`;
        return this._httpClient.get(url);
    }

    updateConfigWhereId(data): Observable<any> {
        const url = `${this.url}/update`;
        return this._httpClient.patch(url, data, this.options);
    }
}


