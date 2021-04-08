import { inject, InjectionToken } from '@angular/core';

export const DOCUMENT = new InjectionToken<Document>('DocumentToken',
	{
		providedIn: 'root',
		factory: () => document
	}
);

export const WINDOW = new InjectionToken<Window>(
	'An abstraction over global window object',
	{
		providedIn: 'root',
		factory: () => {
			return inject(DOCUMENT).defaultView;
		}
	},
);

export const NAVIGATOR = new InjectionToken<Navigator>(
	'An abstraction over window.navigator object',
	{
		providedIn: 'root',
		factory: () => inject(WINDOW).navigator,
	},
);
