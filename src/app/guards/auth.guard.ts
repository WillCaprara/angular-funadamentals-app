import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { UserService } from "../services/user.service";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const userService = inject(UserService);
    const router = inject(Router);
    
    const isAuthenticated = userService.isAuthenticated();

    if(isAuthenticated) {
        console.log('User is authenticated. Access granted to route:', state.url);
        return true;
    }
    else  {
        console.log('User is not authenticated. Access denied to route:', state.url);
        const urlTree: UrlTree = router.createUrlTree(['/']);
        return urlTree; // Redirect to login
    }
}