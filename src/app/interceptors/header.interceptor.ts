import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export function headerInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    console.log('Intercepting request to add API_KEY header');
    const clonedReq = req.clone({ setHeaders: { API_KEY: '12345' } });
    return next(clonedReq);
}