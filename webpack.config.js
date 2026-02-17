const path = require( 'path' );
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

// Editor block build (editor.js) — uses default externals so React comes from wp.element.
const indexConfig = {
	...defaultConfig,
	entry: {
		editor: path.resolve( __dirname, 'src/editor.js' ),
	},
};

// View script build (view.js) — bundle React and react-dom so the front-end does not depend on wp.
const viewConfig = {
	...defaultConfig,
	entry: {
		view: path.resolve( __dirname, 'src/view.js' ),
	},
	externals: {},
	plugins: ( defaultConfig.plugins || [] ).filter(
		( p ) => p && p.constructor && p.constructor.name !== 'DependencyExtractionWebpackPlugin'
	),
};

module.exports = [ indexConfig, viewConfig ];
