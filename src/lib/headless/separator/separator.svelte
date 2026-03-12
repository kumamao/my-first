<script lang="ts">
	import { Primitive, type PrimitiveProps } from '../primitive';

	export interface SeparatorProps extends PrimitiveProps<'div'> {
		/**
		 * Whether or not the component is purely decorative. When true, accessibility-related attributes
		 * are updated so that that the rendered element is removed from the accessibility tree.
		 */
		decorative?: boolean;

		/**
		 * Either `vertical` or `horizontal`. Defaults to `horizontal`.
		 */
		orientation?: 'horizontal' | 'vertical';
	}

	let { decorative, orientation = 'horizontal', ...props }: SeparatorProps = $props();

	const ariaOrientation = orientation === 'vertical' ? orientation : undefined;

	const semanticProps = decorative
		? { role: 'none' }
		: { 'aria-orientation': ariaOrientation, role: 'separator' };
</script>

<Primitive.div data-orientation={orientation} {...semanticProps} {...props} />
