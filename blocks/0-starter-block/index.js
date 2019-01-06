import './editor.scss';
import './style.scss';

/* Import internal block libraries */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

/* Register Block */

export default registerBlockType(
	'namespace/blockname',
	{
		title: __('Block Name', '_vt'),
		description: __('Description of the block', '_vt'),
		category: 'common',
		icon: dashicon || svgIcon,
		keywords: [
			__( 'Key Word 1', '_vt' ),
			__( 'Key Word 2', '_vt' ),
			__( 'Key Word 3', '_vt' ),

		],
		edit: props => {
			const { className } = props;
			return (
				<div className={ className }>Block Back End </div>
			);
		},
		save: props => {
			const { className } = props;
			return (
				<div className={ className }>Block Front End</div>
			);

		},
	},

);