import type { Component } from 'svelte';
import type { SvelteHTMLElements } from 'svelte/elements';

import {
	default as BasePrimitive,
	type PrimitiveProps as BasePrimitiveProps
} from './primitive.svelte';

export { default as Slot } from './slot.svelte';

const NODES = [
	'a',
	'button',
	'div',
	'form',
	'h2',
	'h3',
	'img',
	'input',
	'label',
	'li',
	'nav',
	'ol',
	'p',
	'select',
	'span',
	'svg',
'ul'
] as const;

export type KnownAsTag = (typeof NODES)[number];

export type AsTag = (typeof NODES)[number] | ({} & string); // any other string

type PrimitiveProps<T extends AsTag> = SvelteHTMLElements[T] & BasePrimitiveProps;

type PrimitiveComponent<T extends AsTag> = Component<PrimitiveProps<T>, object, ''>;

type Primitives = { [E in AsTag]: PrimitiveComponent<E> };

const Primitive = NODES.reduce(
	(primitive, node) => ({ ...primitive, [node]: BasePrimitive as PrimitiveComponent<typeof node> }),
	{} as Primitives
);

export { Primitive, type PrimitiveProps };

// type Primitives = { [E in (typeof NODES)[number]]: PrimitiveComponent<E> };

// const Primitive = BasePrimitive as typeof BasePrimitive & {
// 	a: AsTagPrimitiveProps<'a'>;
// 	button: AsTagPrimitiveProps<'button'>;
// 	div: AsTagPrimitiveProps<'div'>;
// 	form: AsTagPrimitiveProps<'form'>;
// 	h2: AsTagPrimitiveProps<'h2'>;
// 	h3: AsTagPrimitiveProps<'h3'>;
// 	img: AsTagPrimitiveProps<'img'>;
// 	input: AsTagPrimitiveProps<'input'>;
// 	label: AsTagPrimitiveProps<'label'>;
// 	li: AsTagPrimitiveProps<'li'>;
// 	nav: AsTagPrimitiveProps<'nav'>;
// 	ol: AsTagPrimitiveProps<'ol'>;
// 	p: AsTagPrimitiveProps<'p'>;
// 	select: AsTagPrimitiveProps<'select'>;
// 	span: AsTagPrimitiveProps<'span'>;
// 	svg: AsTagPrimitiveProps<'svg'>;
// 	ul: AsTagPrimitiveProps<'ul'>;
// };

// Primitive.a = BasePrimitive as AsTagPrimitiveProps<'a'>;
// Primitive.button = BasePrimitive as AsTagPrimitiveProps<'button'>;
// Primitive.div = BasePrimitive as AsTagPrimitiveProps<'div'>;
// Primitive.form = BasePrimitive as AsTagPrimitiveProps<'form'>;
// Primitive.h2 = BasePrimitive as AsTagPrimitiveProps<'h2'>;
// Primitive.h3 = BasePrimitive as AsTagPrimitiveProps<'h3'>;
// Primitive.img = BasePrimitive as AsTagPrimitiveProps<'img'>;
// Primitive.input = BasePrimitive as AsTagPrimitiveProps<'input'>;
// Primitive.label = BasePrimitive as AsTagPrimitiveProps<'label'>;
// Primitive.li = BasePrimitive as AsTagPrimitiveProps<'li'>;
// Primitive.nav = BasePrimitive as AsTagPrimitiveProps<'nav'>;
// Primitive.ol = BasePrimitive as AsTagPrimitiveProps<'ol'>;
// Primitive.p = BasePrimitive as AsTagPrimitiveProps<'p'>;
// Primitive.select = BasePrimitive as AsTagPrimitiveProps<'select'>;
// Primitive.span = BasePrimitive as AsTagPrimitiveProps<'span'>;
// Primitive.svg = BasePrimitive as AsTagPrimitiveProps<'svg'>;
// Primitive.ul = BasePrimitive as AsTagPrimitiveProps<'ul'>;
