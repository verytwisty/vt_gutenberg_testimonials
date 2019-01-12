import './editor.scss';
import './style.scss';
import icon from './icon';

/* Import internal block libraries */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/* Register Block */

export default registerBlockType(
	'testimonials/static',
	{
		title: __('Static Testimonial', '_vt'),
		description: __('Example Static Testimonial Block', '_vt'),
		category: 'common',
		icon: icon,
		keywords: [
			__( 'Testimonials', '_vt' ),
			__( 'Static', '_vt' ),
			__( 'Call out', '_vt' ),

		],
		edit: props => {
			const { className, isSelected } = props;
			console.log( props );
			return (
				<div className={ className }>
					<div className="image">
						<img src="/wp-content/plugins/vt_testimonials/assets/images/David-Brent.jpg" />
					</div>
					<div className="info">
						<h2>David Brent</h2>
						<h3>General Manager</h3>
						<div className="text">
							<p>People see me, and they see the suit, and they go: 'you're not fooling anyone', they know I'm rock and roll through and through.</p> 
							<p>But you know that old thing, live fast, die young? Not my way. Live fast, sure, live too bloody fast sometimes, but die young? Die old.</p>
						</div>
						<a href="https://www.wernham-hogg-limited.com" className="website">Wernham Hogg</a>
					</div>
					{
						isSelected && (
							<div className="warn"><p>Sorry you can't edit this block</p></div>
						)
					}
				</div>
			);
		},
		save: props => {
			const { className } = props;
			return (
				<div className={ className }>
					<div className="image">
						<img src="/wp-content/plugins/vt_testimonials/assets/images/David-Brent.jpg" />
					</div>
					<div className="info">
						<h2>David Brent</h2>
						<h3>General Manager</h3>
						<div className="text">
							<p>People see me, and they see the suit, and they go: 'you're not fooling anyone', they know I'm rock and roll through and through.</p> 
							<p>But you know that old thing, live fast, die young? Not my way. Live fast, sure, live too bloody fast sometimes, but die young? Die old.</p>
						</div>
						<a href="https://www.wernham-hogg-limited.com" className="website">Wernham Hogg</a>
					</div>
				</div>
			);

		},
	},

);