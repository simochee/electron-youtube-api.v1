const cssnext = require('postcss-cssnext');
const electron = require('electron-connect').server.create();
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const rename = require('gulp-rename');
const riot = require('gulp-riot');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const watch = require('gulp-watch');
const webpack = require('gulp-webpack');
const YAML = require('yamljs');

gulp.task('serve', () => {
    electron.start(); 
});

gulp.task('pug', () => {
    gulp.src('./src/pug/!(_)*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./assets/html'));
});

gulp.task('stylus', () => {
    gulp.src('./src/stylus/!(_)*.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(postcss([ cssnext({ browsers: ['last 1 version'] }) ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./assets/css'))
});

gulp.task('riot', () => {
    gulp.src('./src/scripts/_tags/**/*.tag', { base: './src/scripts/_tags' })
        .pipe(plumber())
        .pipe(riot({
            compact: true,
            type: 'es6',
            template: 'pug',
        }))
        .pipe(gulp.dest('./src/scripts/tags'));
});

gulp.task('js', () => {
    gulp.src('')
        .pipe(plumber())
        .pipe(webpack(require('./webpack.config.js')))
        .pipe(gulp.dest('./assets/js'));
});


gulp.task('watch', () => {
    watch(['./src/pug/**/*.pug'], () => {
        gulp.start('pug');
    });
    watch('./src/stylus/**/*.styl', () => {
        gulp.start('stylus');
    });
    watch('./src/scripts/tags/**/*.tag', () => {
        gulp.start('riot');
    });
    watch('./src/scripts/**/*.js', () => {
        gulp.start('js');
    });
    // ElectronのLivereload
    watch(['main.js', 'config.yml'], () => {
        console.log('happen');
        electron.restart();
    });
    watch('./assets/**/*', electron.reload);
});

gulp.task('dev', ['watch', 'serve', 'pug', 'stylus', 'js']);