import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../services/loader-service/loader.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

	constructor(public loaderService: LoaderService) { }

	intercept(req: HttpRequest<object>, next: HttpHandler): Observable<HttpEvent<object>> {
			this.loaderService.show();
			return next.handle(req).pipe(
					finalize(() => this.loaderService.hide())
			);
	}
}
