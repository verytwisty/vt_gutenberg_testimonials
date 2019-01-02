import './editor.scss';
import './style.scss';
import icon from './icon';

/* Import internal block libraries */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText } = wp.editor;

/* Register Block */

export default registerBlockType(
	'testimonials/title',
	{
		title: __('Testimonial Edit Text', '_vt'),
		description: __('Example Testimonial with Editable text', '_vt'),
		category: 'common',
		icon: icon,
		keywords: [
			__( 'Testimonials', '_vt' ),
			__( 'Editable text', '_vt' ),
			__( 'Call out', '_vt' ),

		],
		attributes: {
			title: {
				type: 'array',
				source: 'children',
				selector: 'h2',
			},
			jobTitle:{
				type: 'array',
				source: 'children',
				selector: 'h3',
			},
			text: {
				type: 'array',
				source: 'children',
				selector: '.text',
			}
		},
		edit: props => {
			const { attributes: { title, jobTitle, text }, className, setAttributes } = props;
			const onChangeHeader = title => { setAttributes( { title } ) };
			const onChangeTitle = jobTitle => { setAttributes( { jobTitle } ) };
			const onChangeText = text => { setAttributes( { text } ) };
			return (
				<div className={ className }>
					<div className="image">
						<img src="/wp-content/plugins/vt_testimonials/assets/images/austin-distel-675050-unsplash.jpg" />
					</div>
					<div className="info">
						<RichText
							tagName="h2"
							placeholder={ __( "Add Person Title", "_vt" ) }
							onChange= { onChangeHeader }
							value={ title }
						/>
						<RichText
							tagName="h3"
							placeholder={ __( "Add Job Title", "_vt" ) }
							onChange= { onChangeTitle }
							value={ jobTitle }
						/>
						<RichText
							tagName="div"
							placeholder={ __( "Add Testimonial here", "_vt" ) }
							onChange= { onChangeText }
							value={ text }
							wrapperClassName=".text"
						/>
						<a href="https://dog.ceo/" className="website">Dog.ceo</a>
					</div>
				</div>
			);
		},
		save: props => {
			const { attributes: { title, jobTitle, text }, className } = props;
			return (
				<div className={ className }>
					<div className="image">
						<img src="/wp-content/plugins/vt_testimonials/assets/images/austin-distel-675050-unsplash.jpg" />
					</div>
					<div className="info">
						<h2>{ title }</h2>
						<h3>{ jobTitle }</h3>
						<div className="text">
							{ text }
						</div>
						<a href="https://dog.ceo/" className="website">Dog.ceo</a>
					</div>
				</div>
			);

		},
	},

);