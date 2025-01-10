const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const mode = require('gulp-mode')();
const log = require('fancy-log');

const paths = {
	js: './js/*.js',
	css: './css/*.css',
};

function buildJs() {
	console.log('Running buildJs...');

	// Exclude already minified files (files with .min.js)
	let pipeline = gulp.src([paths.js, '!./js/*.min.js'], { allowEmpty: true });

	if (mode.production()) {
		console.log('Production mode: Minifying JS...');
		pipeline = pipeline
			.pipe(uglify().on('error', log)) // Minify JavaScript in production
			.pipe(rename({ suffix: '.min' })); // Add .min suffix in production mode
	} else {
		console.log('Development mode: No minification, just renaming.');
		pipeline = pipeline
			.pipe(rename({ suffix: '.min' })); // Add .min suffix for development without minifying
	}

	return pipeline
		.pipe(gulp.dest(file => {
			console.log(`Writing file to: ${file.base}`);
			return file.base; // Write back to the same folder
		}))
		.on('end', () => console.log('buildJs task completed!'));
}

function buildCss() {
	console.log('Running buildCss...');

	// Exclude already minified files (files with .min.css)
	let pipeline = gulp.src([paths.css, '!./css/*.min.css'], { allowEmpty: true });

	if (mode.production()) {
		console.log('Production mode: Minifying CSS...');
		pipeline = pipeline
			.pipe(cleanCSS({ compatibility: 'ie8' }).on('error', log)) // Minify CSS in production
			.pipe(rename({ suffix: '.min' })); // Add .min suffix in production mode
	} else {
		console.log('Development mode: No minification, just renaming.');
		pipeline = pipeline
			.pipe(rename({ suffix: '.min' })); // Add .min suffix for development without minifying
	}

	return pipeline
		.pipe(gulp.dest(file => {
			console.log(`Writing file to: ${file.base}`);
			return file.base; // Write back to the same folder
		}))
		.on('end', () => console.log('buildCss task completed!'));
}

function watchFiles() {
	gulp.watch(paths.js, buildJs);
	gulp.watch(paths.css, buildCss);
}

// Define tasks
const build = gulp.parallel(buildJs, buildCss);
const watch = gulp.series(build, watchFiles);

// Export tasks
exports.watch = watch;
exports.default = build;
