/*
1. css预处理 压缩 合并
2. js合并 压缩 混淆 
3. 图片复制
4. html压缩
5. 开启服务器，监听
*/

'use strict';

var gulp = require('gulp');

//1. css预处理 压缩 合并
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
gulp.task('style',function(){
	gulp.src(['src/styles/*.less','!src/styles/_*.less'])
		.pipe(less())
		.pipe(cssnano())
		.pipe(gulp.dest('dist/styles'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//2. js合并 压缩 混淆 
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
gulp.task('script',function(){
	gulp.src('src/scripts/*.js')
		.pipe(concat('all.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//3. 图片复制
gulp.task('image',function(){
	gulp.src('src/images/*.*')
		.pipe(gulp.dest('dist/images'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//4. html压缩，多个html拷贝
var htmlMin = require('gulp-htmlmin');
gulp.task('html',function(){
	gulp.src(['src/index.html','src/login/*.html'],{base:'src'})
		.pipe(htmlMin({collapseWhitespace: true}))
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({
			stream: true
		}));
});

//5. 开启服务器，监听  browser-sync
var browserSync = require('browser-sync');
gulp.task('serve',function(){
	browserSync({
		server: {
			baseDir: ['dist']
		}
	}, function(err, bs) {
    	console.log(bs.options.getIn(["urls", "local"]));
	});

	gulp.watch('src/index.html',['html']);
	gulp.watch('src/scripts/*.js',['script']);
	gulp.watch('src/styles/*.less',['style']);
	gulp.watch('src/images/*.*',['image']);


});




