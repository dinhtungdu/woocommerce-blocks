/**
 * Internal dependencies
 */
import { GUTENBERG_EDITOR_CONTEXT, describeOrSkip } from '../../utils';
import { shopper } from '../../../utils';

const block = {
	name: 'Product Search',
	slug: 'core/search',
	class: '.wp-block-search',
};

for ( let i=1; i<=100; i++ ) {
	describeOrSkip( GUTENBERG_EDITOR_CONTEXT === 'gutenberg' )(
		`Shopper → Product Search - ${i}`,
		() => {
			beforeEach( async () => {
				await shopper.block.goToBlockPage( block.name );
			} );

			it( 'should render product variation', async () => {
				await expect( page ).toMatchElement(
					'input[name="post_type"][value="product"]'
				);
			} );

			it( 'should be able to search for products', async () => {
				await page.type( '.wp-block-search input[name="s"]', 'Stick' );

				await Promise.all( [
					page.waitForNavigation(),
					page.keyboard.press( 'Enter' ),
				] );

				await expect( page ).toMatchElement( 'ul.products.columns-3' );

				const products = await page.$$( 'ul.products.columns-3 > li' );

				expect( products ).toHaveLength( 2 );

				expect( page ).toMatchElement( 'ul.products.columns-3 > li', {
					text: '128GB USB Stick',
				} );
			} );
		}
	);
}
