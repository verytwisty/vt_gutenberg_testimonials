import './editor.scss';
import './style.scss';
import classnames from 'classnames';
import icon from './icon';

/* Import internal block libraries */

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { 
	RichText,
	Editable,
	MediaUpload,
	URLInput,
	AlignmentToolbar,
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
	PanelBody,
  	PanelRow,
  	PanelColorSettings,
  	ColorPalette,
} = wp.editor;
const {
    Button,
    IconButton,
    Tooltip,
    TextControl,
    Spinner,
    SelectControl,
} = wp.components;

const {
	withSelect
} = wp.data;


/* Register Block */

export default registerBlockType(
	'testimonials/dynamicblock',
	{
		title: __('Testimonial Dynamic Block', '_vt'),
		description: __('Example Dynamic Testimonial Block', '_vt'),
		category: 'common',
		icon: icon,
		keywords: [
			__( 'Testimonials', '_vt' ),
			__( 'Dynamic Block', '_vt' ),
			__( 'Call out', '_vt' ),

		],
		attributes: {
            textAlignment: {
            	type: 'string',
                default: 'left',
            },
            blockAlignment: {
            	type: 'string',
            	default: 'wide',
            },
            colorPalette: {
		    type: "string",
		    default: "#FF6F61"
		  },
		  selectControl:{
		  	type: 'string',
		  }
		},
		getEditWrapperProps( { blockAlignment } ) {
            if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment ) {
                return { 'data-align': blockAlignment };
            }
        },
		edit: withSelect( select => {
                return {
                    posts: select( 'core' ).getEntityRecords( 'postType', 'vt_testimonials', { per_page: 50 } )
                };
            } )( ( { posts, className, isSelected, setAttributes, attributes: { textAlignment, blockAlignment, colorPalette, selectControl } } ) => {
                if ( ! posts ) {
                    return (
                        <p className={className} >
                            <Spinner />
                            { __( 'Loading Testimonials', '_vt' ) }
                        </p>
                    );
                }
                if ( 0 === posts.length ) {
                    return <p>{ __( 'No Posts', '_vt' ) }</p>;
                }


                let testimonials = posts.map( ( post, index ) => {
                	let Obj = {};
                        Obj['value'] = post.id,
					    Obj['label'] = post.title.rendered
				    return Obj;
                });

                console.log('eee');
                console.log(selectControl);

                return [

                	<InspectorControls>

                		<SelectControl
		                    label={ __( 'Select Testimonial', '_vt' ) }
		                    value={ selectControl }
		                    options={ testimonials }
		                    onChange={ selectControl => setAttributes( { selectControl } ) }
		                />

						<PanelColorSettings
				          title={__("Background Colour", "_vt")}
				          colorSettings={[
				            {
				              value: colorPalette,
				              onChange: colorPalette => {
				                setAttributes({ colorPalette });
				              },
				              label: __("Select BG Colour")
				            }
				          ]}
				        />

				</InspectorControls>,

				<BlockControls>
                    <AlignmentToolbar
                        value={ textAlignment }
                        onChange={ textAlignment => setAttributes( { textAlignment } ) }
                    />
	                 <BlockAlignmentToolbar
                        value={ blockAlignment }
                        onChange={ blockAlignment => setAttributes( { blockAlignment } ) }
                    />
                </BlockControls>,

                    <div 
                    className={ classnames(
                      `txt-align${textAlignment}`, className,
                    )}
                    style={ { backgroundColor: colorPalette, textAlign: textAlignment } }
                    >

                    { ! selectControl ? (

                        setAttributes({ 
                            selectControl: posts[0].id,

                        })

                        
                        ):(

                            <div dangerouslySetInnerHTML={{ __html: posts.find(x => x.id == selectControl ).content.rendered }} ></div>
                        )

                    }

                    
                   </div>
                ];
            } ) // end withAPIData
        , // end edit
		save: props => {
			const { attributes: { textAlignment, blockAlignment, colorPalette, selectControl }, className } = props;
			return null;

		},
	},

);