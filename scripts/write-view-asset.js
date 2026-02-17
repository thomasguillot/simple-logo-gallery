/**
 * Write view.asset.php with empty dependencies (view.js bundles React).
 */
const fs = require( 'fs' );
const path = require( 'path' );

const distPath = path.join( __dirname, '..', 'dist' );
const viewPath = path.join( distPath, 'view.js' );

let version = '1.0.0';
if ( fs.existsSync( viewPath ) ) {
	const stat = fs.statSync( viewPath );
	version = stat.mtime.getTime().toString( 36 );
}

const php = `<?php return array(
	'dependencies' => array(),
	'version' => '${ version }',
);
`;

fs.writeFileSync( path.join( distPath, 'view.asset.php' ), php, 'utf8' );
console.log( 'Wrote dist/view.asset.php' );
