<script lang="ts" generics="As extends AsTag = 'div'">
	import type { Component, Snippet } from 'svelte';
	import Slot from './slot.svelte';
	import type { AsTag, KnownAsTag } from '.';
	import type { SvelteHTMLElements } from 'svelte/elements';

	// type ReturnType<T extends (...args: any) => any> = T extends (...args: any) => infer R ? R : any

	// type XXX<T extends SvelteHTMLElements[AsTag]> = T extends SvelteHTMLElements[infer R] ? R : any

	type NativeProps<T extends AsTag> = T extends KnownAsTag ? SvelteHTMLElements[T] : Record<string, any>;

	type BasePrimitiveProps = NativeProps<As> & {
		as?: As;
		asChild?: Snippet<[props: { [x: string]: any }]>;
		children?: Snippet;
	};

	let { as = 'div' as As, asChild, children, ...props }: BasePrimitiveProps = $props();
	const forwardedProps = props as any;
</script>

{#if asChild}
	<Slot {...forwardedProps} children={asChild} />
{:else if typeof as === 'string'}
	<svelte:element this={as} {...forwardedProps}>
		{@render children?.()}
	</svelte:element>
{:else}
	<asChild {...forwardedProps}>
		{@render children?.()}
	</asChild>
{/if}
