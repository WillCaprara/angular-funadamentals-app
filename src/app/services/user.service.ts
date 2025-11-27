import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { UserInterface } from "../interfaces/user.interface";

@Injectable({
    providedIn: 'root'
})
export class UserService {
    httpClient = inject(HttpClient);
    private usersUrl = 'http://localhost:3004/users';

    validateUser$(username: string, password: string) {
        return this.httpClient.get<UserInterface[]>(this.usersUrl, {
            params: {
                email: username,
                password: password
            }
        });
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('auth_token');
        return !!token; // returns true if token exists, false otherwise
    }
}