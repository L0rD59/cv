var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var ghPages = require('gulp-gh-pages');

var paths = {
    'bower': './bower_components',
    'assets': './source/assets',
    'public': './dist'
};


gulp.task('styles', function () {
    // app
    return gulp.src([
        paths.assets + '/styles/app.scss',
    ])
        .pipe(sass({
            includePaths: [
                paths.bower + '/foundation/scss',
                paths.bower + '/foundation-icon-fonts'
            ]
        }))
        .pipe(concat('app.css'))
        .pipe(gulp.dest(paths.public + '/assets/css'))
        ;
});


gulp.task('scripts', function () {
    // modernizer
    gulp.src([
        paths.bower + '/foundation/js/vendor/modernizr.js'
    ])
        .pipe(concat('modernizr.js'))
        .pipe(gulp.dest(paths.public + '/assets/js'))
        ;

    // app
    return gulp.src([
        paths.bower + '/foundation/js/vendor/**/*',
        paths.bower + '/foundation/js/foundation.min.js',
        paths.assets + '/scripts/app.js',
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.public + '/assets/js'))
        ;
});


gulp.task('images', function () {

    // foundation icon fonts
    return gulp.src([
        paths.assets + '/images/**/*.png',
        paths.assets + '/images/**/*.jpeg',
        paths.assets + '/images/**/*.jpg',
        paths.assets + '/images/**/*.svg',
        paths.assets + '/images/**/*.gif',
    ])
        .pipe(gulp.dest(paths.public + '/assets/images'))
    ;

});

gulp.task('template', function () {
    return gulp.src([
        './source/index.html'
    ])
        .pipe(gulp.dest(paths.public + '/'))
    ;
});

gulp.task('fonts', function () {
    // foundation icon fonts
    return gulp.src([
        paths.bower + '/foundation-icon-fonts/**/*.eot',
        paths.bower + '/foundation-icon-fonts/**/*.svg',
        paths.bower + '/foundation-icon-fonts/**/*.ttf',
        paths.bower + '/foundation-icon-fonts/**/*.woff',
        paths.assets + '/fonts/**/*.eot',
        paths.assets + '/fonts/**/*.svg',
        paths.assets + '/fonts/**/*.ttf',
        paths.assets + '/fonts/**/*.woff',
        paths.assets + '/fonts/**/*.otf'
    ])
        .pipe(gulp.dest(paths.public + '/assets/fonts'))
    ;

});


gulp.task('watch', function () {
    gulp.watch(paths.assets + '/styles/**/*.scss', ['styles']);
    gulp.watch(paths.assets + '/scripts/**/*.js', ['scripts']);
});


gulp.task('deploy', function() {
    return gulp.src(paths.public + '/**/*')
        .pipe(ghPages());
});

gulp.task('build', ['styles', 'scripts', 'images', 'fonts', 'template']);

gulp.task('default', ['build', 'deploy']);
