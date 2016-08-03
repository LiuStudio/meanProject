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
var notify = require('gulp-notify');
var livereload = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();

// gulp.task('clean', function(){
//     return gulp.src('app_client/**/*.js')
//     .pipe(clean());
// })
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
    gulp.src(['./app_client/**/*.js'])
        //.pipe(sourcemaps.init())
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
            .pipe(concat('all.js'))
            .pipe(gulp.dest('dist'))
            .pipe(rename({suffix: '.min'}))
            .pipe(uglify().on('error', function(e){
                 console.log(e);
             }))
            .pipe(livereload(server))
            .pipe(gulp.dest('dist'))
            .pipe(notify({message: 'Scripts task complete'}));
            
        //.pipe(sourcemaps.write('./'))
        //.pipe(gulp.dest('app_client'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./app_client/**/*.js', ['lint', 'scripts']);
  //  gulp.watch('scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'watch']);