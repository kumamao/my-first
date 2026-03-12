// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { Component } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	type SvelteElementAttributes<T extends keyof SvelteHTMLElements> = SvelteHTMLElements[T];

	type SvelteComponentProps<T extends Component<any, any, any>> =
	T extends Component<infer P, any, any> ? P : nevers;
}

export {};
