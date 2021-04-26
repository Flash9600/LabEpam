import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesGuard } from './courses.guard';
import { NoContentComponent } from '../core-module/components/no-content/no-content.component';
import { UserLoginComponent } from '../login-module/user-login/user-login.component';

const routes: Routes = [
	{ path: '', redirectTo: 'courses', pathMatch: 'full'},

	{ path: 'login', component: UserLoginComponent},

	{ path: 'courses', loadChildren: () => import('../core-module/core.module')
		.then(module => module.CoreModule ),
		canLoad: [CoursesGuard]
	},

	{ path: '**', component: NoContentComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
