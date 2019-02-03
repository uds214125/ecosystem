
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
    public url; options;
    constructor(private http: HttpClient) {
        this.url = 'http://localhost:4125/api';

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        this.options = { headers: headers };
    }

    login(data) {
        return this.http.post<any>(`${this.url}/users/find`, data)
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('currentUser');
    }

    register(user) {
        return this.http.post(`${this.url}/users/create`, user);
    }
}
