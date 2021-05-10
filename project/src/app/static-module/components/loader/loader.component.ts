import { LoaderService } from './../../../services/loader-service/loader.service';
import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

	public isShowLoader: boolean;

	constructor(protected loaderService: LoaderService) { }

	ngOnInit(): void {
		this.loaderService.isLoading.subscribe((isShowLoader) => {
			this.isShowLoader = isShowLoader;
		});
	}

}
