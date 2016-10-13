var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var util = require('gulp-util');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');

// browserify utils
var browserify = require('browserify');
var watchify = require('watchify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');

// less utils
var less = require('gulp-less');
var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefixPlugin = new LessPluginAutoPrefix({browsers: ['last 2 versions']});

// etc
var ngAnnotate = require('gulp-ng-annotate');
var browserSync = require('browser-sync').create();
var testServer = require('karma').Server;


var config = {
  browserSync: {
    server: {
      baseDir: './build'
    },
  },
  configLocation: {
    target: 'app/config/config.js',
    sample: 'app/config/config_sample.js'
  },
  src: {
    index: './app/index.js',
    views: ['app/modules/**/*.html', 'app/*.html'],
    styles: ['app/**/*.less'],
    assets: 'app/assets/**/*',
    karma: __dirname + '/karma.conf.js',
  },
}

// ----------- run [dev] task ----------- //

gulp.task('run', function() {
  scripts({ dev: true, src: config.src.index, dest: './build/js/' });
  styles({ dev: true, src: config.src.styles, dest: './build/styles' });
  staticF({ src: config.src.views, dest: './build', dev: true });
  staticF({ src: config.src.assets, dest: './build', dev: true });
  tests({ src: config.src.karma, dev: true });
  browserSync.init(config.browserSync);
});

// ----------- build [prod] task ----------- //

gulp.task('build', function() {
  scripts({ dev: false, src: config.src.index, dest: './dist/js/' });
  styles({ dev: false, src: config.src.styles, dest: './dist/styles' });
  staticF({ src: config.src.views, dest: './dist', dev: false });
  staticF({ src: config.src.assets, dest: './dist', dev: false });
  tests({ src: config.src.karma, dev: false });
});

// ------------ default task -------------- //

gulp.task('default', ['run']);

// ---------------------------------------- //

// ------------- scripts -------------- //

function scripts(options){
  var bundler = browserify({
    entries: [options.src], // The entry file, normally "main.js"
    debug: options.dev, // Sourcemapping
    cache: {}, packageCache: {}, fullPaths: true // Requirement of watchify
  });

  var compress = lazypipe()
  .pipe(buffer)
  .pipe(ngAnnotate)
  .pipe(uglify);

  if(options.dev){
    bundler = watchify(bundler);
    bundler.on('update', build);
    gulp.watch(options.dest + '/*.js').on('change', browserSync.reload);
  }

  build();

  function build() {
    bundler.bundle()
      .on('error', util.log)
      .pipe(source('bundle.js'))
      .pipe(gulpif(!options.dev, compress()))
      .pipe(gulp.dest(options.dest));
  };
}

// ------------- staticF -------------- //

function staticF(options){
  repack();
  if(options.dev) {
    gulp.watch(options.src, repack);
    gulp.watch(options.dest + '**/*.html', browserSync.reload);
  }

  function repack(){
    gulp.src(options.src)
      .pipe(gulp.dest(options.dest));
  }
}

// ------------- styles -------------- //

function styles(options){

  compile();

  if(options.dev) {
    gulp.watch(options.src, compile);
  }

  function compile(){
    gulp.src(options.src)
      .pipe(less({ plugins: [autoprefixPlugin] }))
      .pipe(concat('app.css'))
      .pipe(gulpif(!options.dev, cssmin()))
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.dev,  browserSync.stream()));
  }
}

// ------------- tests -------------- //

function tests(options){
  new testServer({
    configFile: options.src,
    singleRun: options.dev ? false : true
  }).start();
}
