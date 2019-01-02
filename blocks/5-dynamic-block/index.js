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
			},
			imgURL: {
                type: 'string',
                source: 'attribute',
                attribute: 'src',
                selector: 'img',
            },
            imgID: {
                type: 'number',
            },
            imgAlt: {
                type: 'string',
                source: 'attribute',
                attribute: 'alt',
                selector: 'img',
            },
            linkText: {
            	type: 'string',
            	source: 'text',
            	selector: 'a',
            	default: 'Add website link here'
            },
            url: {
            	type: 'string',
            	source: 'attribute',
            	attribute: 'href',
            	selector: 'a',
            },
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
            default: '237'
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

                // setAttributes({ selectControl: posts[0].id })

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

                    <div className={ className } style={ { backgroundColor: colorPalette, textAlign: textAlignment } }>

                    {console.log(  posts.find(x => x.id == selectControl ).content.rendered )}

                    <div dangerouslySetInnerHTML={{ __html: posts.find(x => x.id == selectControl ).content.rendered }} ></div>

                    
                   </div>
                ];
            } ) // end withAPIData
        , // end edit
		save: props => {
			const { attributes: { textAlignment, blockAlignment, colorPalette }, className } = props;
			return (
				<div
				className={ classnames(
                  `align${blockAlignment}`,
                  	className,
              	)}
				style={ { backgroundColor: colorPalette } }
              	>

				</div>
			);

		},
	},

);