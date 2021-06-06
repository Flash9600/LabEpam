import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoContentComponent } from '../shared-module/components/no-content/no-content.component';
import { UserLoginComponent } from '../login-module/user-login/user-login.component';
import { CoursesGuard } from './guards/courses.guard';

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
	imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
	exports: [RouterModule]
})
export class AppRoutingModule { }
