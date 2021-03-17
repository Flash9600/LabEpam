import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { SearchComponent } from './search/search.component';
import { CourseListComponent } from './course-list/course-list.component';
import {CourseItemComponent} from './course-list/course-item/course-item.component';



@NgModule({
	declarations: [HeaderComponent, FooterComponent, BreadcrumbsComponent, SearchComponent, CourseListComponent, CourseItemComponent],
	imports: [
		CommonModule
	],
	exports: [HeaderComponent, BreadcrumbsComponent, CourseListComponent, FooterComponent, SearchComponent, CourseItemComponent]
})
export class CoreModule { }
