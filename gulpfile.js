const gulp = require('gulp')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const cleanCSS = require('gulp-clean-css')
const mode = require('gulp-mode')()
const log = require('fancy-log')

const folderPaths = {
  js: './assets/js/',
  css: './assets/css/',
  distJs: './assets/js/dist/' // Destination folder for compiled JS
}
const paths = {
  editorJs: `${folderPaths.js}editor/*.js`, // All JS files in the editor folder
  adminJs: `${folderPaths.js}admin/*.js`,   // All JS files in the admin folder
  css: `${folderPaths.css}*.css`
}

function buildJsEditor() {
  console.log('Running buildJsEditor...')

  // Exclude already minified files (files with .min.js)
  let pipeline = gulp.src([ paths.editorJs, `!${folderPaths.js}*.min.js` ], { allowEmpty: true })

  if (mode.production()) {
    console.log('Production mode: Minifying JS for Editor...')
    pipeline = pipeline
      .pipe(concat('editor.min.js')) // Concatenate all JS files into one for editor
      .pipe(uglify().on('error', log)) // Minify JavaScript in production
  } else {
    console.log('Development mode: Concatenating JS for Editor without minification.')
    pipeline = pipeline
      .pipe(concat('editor.min.js')) // Concatenate all JS files into one for editor
  }

  return pipeline
    .pipe(gulp.dest(folderPaths.distJs)) // Write to assets/js/dist
    .on('end', () => console.log('buildJsEditor task completed!'))
}

function buildJsAdmin() {
  console.log('Running buildJsAdmin...')

  // Exclude already minified files (files with .min.js)
  let pipeline = gulp.src([ paths.adminJs, `!${folderPaths.js}*.min.js` ], { allowEmpty: true })

  if (mode.production()) {
    console.log('Production mode: Minifying JS for Admin...')
    pipeline = pipeline
      .pipe(concat('admin.min.js')) // Concatenate all JS files into one for admin
      .pipe(uglify().on('error', log)) // Minify JavaScript in production
  } else {
    console.log('Development mode: Concatenating JS for Admin without minification.')
    pipeline = pipeline
      .pipe(concat('admin.min.js')) // Concatenate all JS files into one for admin
  }

  return pipeline
    .pipe(gulp.dest(folderPaths.distJs)) // Write to assets/js/dist
    .on('end', () => console.log('buildJsAdmin task completed!'))
}

function buildCss() {
  console.log('Running buildCss...')

  // Exclude already minified files (files with .min.css)
  let pipeline = gulp.src([ paths.css, `!${folderPaths.css}*.min.css` ], { allowEmpty: true })

  if (mode.production()) {
    console.log('Production mode: Minifying CSS...')
    pipeline = pipeline
      .pipe(cleanCSS({ compatibility: 'ie8' }).on('error', log)) // Minify CSS in production
      .pipe(rename({ suffix: '.min' })) // Add .min suffix in production mode
  } else {
    console.log('Development mode: No minification, just renaming.')
    pipeline = pipeline
      .pipe(rename({ suffix: '.min' })) // Add .min suffix for development without minifying
  }

  return pipeline
    .pipe(gulp.dest(file => {
      console.log(`Writing file to: ${file.base}`)
      return file.base // Write back to the same folder
    }))
    .on('end', () => console.log('buildCss task completed!'))
}

function watchFiles() {
  gulp.watch(paths.editorJs, buildJsEditor)
  gulp.watch(paths.adminJs, buildJsAdmin)
  gulp.watch(paths.css, buildCss)
}

// Define tasks
const build = gulp.parallel(buildJsEditor, buildJsAdmin, buildCss)
const watch = gulp.series(build, watchFiles)

// Export tasks
exports.watch = watch
exports.default = build
