import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "../services/user.service";
import { catchError, of, take } from "rxjs";
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    imports: [ReactiveFormsModule],
    providers: [UserService]
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private userService = inject(UserService);
    private router = inject(Router);

    loginForm = this.fb.group({
        username: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required]]
    });

    get username() {
        return this.loginForm.get('username')!;
    }

    get password() {
        return this.loginForm.get('password')!;
    }

    onSubmit(): void {
        if (this.loginForm.valid) {
            const loginData = this.loginForm.value;
            console.log('Login Data:', loginData);

            //Use an operator like take(1) or first() in the pipe() chain. 
            //This ensures the observable emits only one value and then automatically completes the subscription, 
            //preventing the callback from running multiple times or after the component is destroyed. 
            this.userService.validateUser$(loginData.username!, loginData.password!)
                .pipe(take(1))
                .subscribe((response) => {
                    if(response && response.length == 1 && response[0].isActive) {
                        console.log('User is valid and active');
                        //set auth token in local storage
                        localStorage.setItem('auth_token', 'some_dummy_token_value');
                        //redirect to pokedex dashboard
                        console.log('Redirecting to dashboard...');
                        this.router.navigate(['/dashboard']);
                    }
                    else {
                        console.log('Invalid username or password, or user is inactive');
                    }
                }), catchError((error) => {
                    console.error('Error during user validation:', error);
                    return of([]);
                });
        }
        else {
            console.log('Form is invalid');
        }
    }
}