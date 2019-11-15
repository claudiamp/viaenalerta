const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const $ = gulpLoadPlugins();
const reload = browserSync.reload;


gulp.task('images', () => {
    return gulp.src('src/images/**/*')
        .pipe($.newer('public/images'))
        .pipe($.imagemin([
            $.imagemin.gifsicle({interlaced: true}),
            $.imagemin.jpegtran({progressive: true}),
            $.imagemin.optipng({optimizationLevel: 5}),
            $.imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe($.size())
        .pipe(gulp.dest('public/img'))
});


gulp.task('styles', () => {
    return gulp
        .src('src/scss/**/*.scss')
        .pipe($.size())
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['src/']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('public/css'))
        .pipe(reload({stream: true}));
});

gulp.task('stylesProd', () => {
    return gulp
        .src('src/scss/**/*.scss')
        .pipe($.concat('style.css'))
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
            outputStyle: 'expanded',
            precision: 10,
            includePaths: ['src/']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
        .pipe($.sourcemaps.write())
        .pipe($.cssnano())
        .pipe($.size())
        .pipe(gulp.dest('public/css'))
        .pipe(reload({stream: true}));
});


gulp.task('templates', () => {
    return gulp
        .src('src/views/**/*.pug')
        .pipe($.plumber())
        .pipe($.pug({
            pretty: true
        }))
        .pipe(gulp.dest('public/'))
        .pipe($.size())
        .pipe(reload({stream: true}));

});

gulp.task('scritp', () => {
    return gulp
        .src('src/js/**/*.js')
        .pipe($.size())
        .pipe($.concat('main.js'))
        .pipe($.babel({
            presets: ['@babel/env']
        }))
        
        .pipe(gulp.dest('public/js'))
        .pipe($.size())
        .pipe(reload({stream: true}));

});
gulp.task('scritpProd', () => {
    return gulp
    .src('src/js/**/*.js')
        .pipe($.babel({
            presets: ['@babel/env']
        }))
        .pipe($.concat('main.js'))
        .pipe($.uglify())
        .pipe(gulp.dest('public/js'))
        .pipe($.size())
        .pipe(reload({stream: true}));

});

gulp.task('serve', () => {
    browserSync.init({
        notify: false,
        port: 9000,
        ui: false,
        server: 'public/'
    });

    gulp.watch('src/js/**/*.js', ['scritp']);
    gulp.watch('src/scss/**/*.scss', ['styles']);
    gulp.watch('src/views/**/*.pug', ['templates']);
    gulp.watch('src/images/**/*', ['images']);
    gulp.watch(['src/js/**/*.js', 'public/*.html']).on('change', reload);
});

gulp.task('prod',['stylesProd' ,'scritpProd','templates'])

gulp.task('default', ['serve']);