// Define dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();

gulp.task('styles', function() {
	gulp.src('sass/style.scss')
		.pipe(sass({})).on('error', function(error) {console.log('\n ERROR \n' + error.message + '\n FUCK! \n');})
		.pipe(autoprefixer({browsers: ['last 2 versions']}))
		.pipe(gulp.dest('./public/css'))
		.pipe(browserSync.stream());
});

gulp.task('scripts', function() {
	gulp.src(['public/js/script.js'])
		.pipe(browserSync.stream());
});

gulp.task('serve', ['styles', 'scripts'], function() {
	browserSync.init({
		server: '.'
	});
	gulp.watch('sass/**/*.scss', ['styles']);
	gulp.watch('public/js/*.js', ['scripts']);
	gulp.watch(['./*.html', 'app/core.js']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);