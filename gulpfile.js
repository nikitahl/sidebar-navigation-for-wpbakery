const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const mode = require('gulp-mode')();

const paths = {
	js: 'js/*.js',
	css: 'css/*.css',
};

function buildJs() {
	return gulp.src(paths.js)
		.pipe(mode.production(uglify()))
		.pipe(rename({ suffix: mode.production() ? '.min' : '' }))
		.pipe(gulp.dest(file => file.base));
}

function buildCss() {
	return gulp.src(paths.css)
		.pipe(mode.production(cleanCSS()))
		.pipe(rename({ suffix: mode.production() ? '.min' : '' }))
		.pipe(gulp.dest(file => file.base));
}

// Function to watch files during development
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
