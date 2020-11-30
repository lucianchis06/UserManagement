import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(private router: Router) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentToken = localStorage.getItem('currentToken');
        if (currentToken) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentToken}`
                }
            });
        }

        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.removeItem("currentUser");
                localStorage.removeItem("currentToken");
                this.router.navigate(['/login']);
            }

            const error = (err.error && err.error.message) ? err.error.message : err.statusText;
            return throwError(error);
        }));
    }
}
