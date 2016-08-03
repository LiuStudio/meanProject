//include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var clean = require('gulp-clean');

gulp.task('clean', function(){
    return gulp.src('app_client/**/*.js')
    .pipe(clean());
})
// Lint Task
gulp.task('lint', function() {
    return gulp.src('./app_client/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
// gulp.task('sass', function() {
//     return gulp.src('app_client/scss/*.scss')
//         .pipe(sass())
//         .pipe(gulp.dest('dist/css'));
// });

// Concatenate & Minify JS
gulp.task('scripts', function() {
    gulp.src(['./app_client/**/*.js', '!./app_client/**/*.test.js','!./app_client/app.min.js'])
        .pipe(sourcemaps.init())
            .pipe(concat('./app_client/app.min.js'))
            .pipe(uglify({mangle:true}).on('error', function(e){
                 console.log(e);
             }))
            .pipe(gulp.dest('app_client'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('app_client'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./app_client/**/*.js', ['lint', 'scripts']);
  //  gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);