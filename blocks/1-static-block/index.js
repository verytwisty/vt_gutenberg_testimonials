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
			return (
				<div className={ className }>
					<div className="image">
						<img src="/wp-content/plugins/vt_testimonials/assets/images/austin-distel-675050-unsplash.jpg" />
					</div>
					<div className="info">
						<h2>Joe Bloggs</h2>
						<h3>Superstar CEO at <a href="https://dog.ceo/">dog.ceo</a></h3>
						<div className="text">
							<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. </p>
							<p>Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla sed consectetur. </p>
						</div>
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
						<img src="/wp-content/plugins/vt_testimonials/assets/images/austin-distel-675050-unsplash.jpg" />
					</div>
					<div className="info">
						<h2>Joe Bloggs</h2>
						<h3>Superstar CEO at <a href="https://dog.ceo/">dog.ceo</a></h3>
						<div className="text">
							<p>Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean lacinia bibendum nulla sed consectetur. </p>
							<p>Donec ullamcorper nulla non metus auctor fringilla. Aenean lacinia bibendum nulla sed consectetur. </p>
						</div>
					</div>
				</div>
			);

		},
	},

);