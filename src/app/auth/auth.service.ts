import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './model/user.model';

export interface ILoginFields {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {

    constructor(private http: HttpClient) {

    }

    login(loginFields: ILoginFields): Observable<User> {
        return this.http.post<User>('/api/login', loginFields);
    }

}
