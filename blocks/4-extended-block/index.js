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
} = wp.components;


/* Register Block */

export default registerBlockType(
	'testimonials/extendedblock',
	{
		title: __('Testimonial Extended Block', '_vt'),
		description: __('Example Testimonial with extended functionality', '_vt'),
		category: 'common',
		icon: icon,
		keywords: [
			__( 'Testimonials', '_vt' ),
			__( 'Editable Fields', '_vt' ),
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
            	type: 'string'
            },
            blockAlignment: {
            	type: 'string',
            	default: 'wide',
            },
            colorPalette: {
		    type: "string",
		    default: "#FF6F61"
		  },
		},
		getEditWrapperProps( { blockAlignment } ) {
            if ( 'left' === blockAlignment || 'right' === blockAlignment || 'full' === blockAlignment ) {
                return { 'data-align': blockAlignment };
            }
        },
		edit: props => {
			const { attributes: { title, jobTitle, text, imgURL, imgID, imgAlt, linkText, url, textAlignment, blockAlignment, colorPalette  }, className, setAttributes, isSelected } = props;
			const onChangeHeader = title => { setAttributes( { title } ) };
			const onChangeTitle = jobTitle => { setAttributes( { jobTitle } ) };
			const onChangeText = text => { setAttributes( { text } ) };
			const onSelectImage = img => { 
				setAttributes({
					imgID: img.id,
	                imgURL: img.sizes.medium.url,
	                imgAlt: img.alt,
	            })
			};
			const onRemoveImage = () => {
				setAttributes({
					imgID: null,
	                imgURL: null,
	                imgAlt: null,
				})
			};
			return [
					<InspectorControls>

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

					<div className={ className } style={ { backgroundColor: colorPalette } }>
			
						<div className="image">
							{
								! imgID ? (

									<MediaUpload
			                            onSelect={ onSelectImage }
			                            type="image"
			                            value={ imgID }
			                            render={ ( { open } ) => (
			                                <Button
			                                    className={ "button button-large" }
			                                    onClick={ open }
			                                >
			                                    { __( 'Add Image', '_vt' ) }
			                                </Button>
			                            ) }
			                        >
			                        </MediaUpload>

								) : (

									<React.Fragment>

									<img 
										src={ imgURL }
										alt={ imgAlt }
									/>

									{ isSelected ? (

											<Button
												className="remove-image"
												onClick={ onRemoveImage }
											>
											Remove Image
											</Button>

										) : ( null )
									}

									</React.Fragment> 
								)
							}
							
						</div>
						<div className="info" style={ { textAlign: textAlignment } }>

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
							{
								isSelected ? (

									<React.Fragment>

										<TextControl
											id="linkText"
											label="Add name here"
											value={ linkText }
											onChange={ linkText => setAttributes( { linkText } ) }
										/>
										<Tooltip text="Add Company Website">
											{ icon } Website
										</Tooltip>
										<URLInput
											className="link-url"
											value={ url }
											onChange={ url => setAttributes( { url } ) }
										/>

									</React.Fragment>

								) : (

									<a href="{ url }" className="website">{ linkText }</a>

								)
							}
							
						</div>
					</div>
			];
		},
		save: props => {
			const { attributes: { title, jobTitle, text, imgURL, imgAlt, linkText, url, textAlignment, blockAlignment, colorPalette }, className } = props;
			return (
				<div
				className={ classnames(
                  `align${blockAlignment}`,
                  	className,
              	)}
				style={ { backgroundColor: colorPalette } }
              	>
					<div className="image">
						<img 
							src={ imgURL }
							alt={ imgAlt }
						/>
					</div>
					<div className="info" style={ { textAlign: textAlignment } }>
						<h2>{ title }</h2>
						<h3>{ jobTitle }</h3>
						<div className="text">
							{ text }
						</div>
						<a href={ url } className="website">{ linkText }</a>
					</div>
				</div>
			);

		},
	},

);