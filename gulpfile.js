// Gulp
const cssnext = require('postcss-cssnext');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const stylus = require('gulp-stylus');
const watch = require('gulp-watch');
const webpack = require('webpack-stream');
// Electron
const electron = require('electron-connect').server.create();

// Pugをビルド
gulp.task('pug', () => {
    gulp.src('./src/pug/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./build'));
});

// Stylusをビルド
gulp.task('stylus', () => {
    gulp.src('./src/stylus/!(_)*.styl')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(stylus())
        .pipe(postcss([ cssnext({ browsers: ['last 1 version'] }) ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'));
});

gulp.task('build:watch', () => {
    // ビルドの監視
    watch('./src/pug/**/*.pug', () => {
        gulp.start('pug');
    });
    watch('./src/stylus/**/*.styl', () => {
        gulp.start('stylus');
    });
});

gulp.task('build', ['build:watch', 'pug', 'stylus']);

// Electronを起動
gulp.task('serve', () => {
    electron.start();
});

// ElectronをCLIから再起動
gulp.task('self-restart', () => {
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (data) => {
        if(data.match(/rs/)) {
            electron.restart();
            console.log('Application Restart');
        }
    });
});

gulp.task('app:watch', () => {
    // ElectronのLiveReload
    watch(['main.js', 'config.yml'], electron.restart);
    watch('./build/**/*', electron.reload);
});

gulp.task('app', ['app:watch', 'serve', 'self-restart']);
