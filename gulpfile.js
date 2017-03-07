var gulp = require('gulp'),
  args = require('yargs').argv,
  bump = require('gulp-bump'),
  livereload = require('gulp-livereload'),
  mocha = require('gulp-mocha'),
  nodemon = require('gulp-nodemon'),
  runSequence = require('run-sequence'),
  shell = require('gulp-shell'),
  git = require('gulp-git');

var VERSION;

gulp.task('set-ulimit', shell.task([
  'ulimit -n 10240'
]));

gulp.task('test', function() {
  return gulp.src('test/**/*.test.js', {
      read: false
    })
    .pipe(mocha({
      reporter: 'spec'
    }));
});

gulp.task('test-deployed', function() {
  return gulp.src('test/**/*.test.js', {
      read: false
    })
    .pipe(mocha({
      reporter: 'spec'
    }))
    .once('end', function() {
      process.exit();
    });
});

gulp.task('git-commit', function() {
  var packageJSON = require('./package.json');
  return gulp.src(['./build/*', './package.json', './bower.json'])
    .pipe(git.add({
      args: '-A'
    }))
    .pipe(git.commit('Release v' + packageJSON.version));
});

gulp.task('git-push', function() {
  return git.push('origin', 'master', function(err) {
    if (err) {
      throw err;
    }
    process.exit();
  });
});

gulp.task('bump', function() {
  return gulp.src(['./bower.json', './package.json'])
    .pipe(bump({
      type: VERSION
    }))
    .pipe(gulp.dest('./'));
});

/**
 *  gulp release --version major|minor|patch
 *  gulp release -v major|minor|patch
 */
gulp.task('release', function() {
  VERSION = args.v || args.version;

  if (typeof VERSION !== 'undefined') {
    runSequence('bump', 'git-commit', 'git-push');
  } else {
    console.log('SORRY, app --version parameter missing.');
  }
});

gulp.task('start-server', function() {
  nodemon({
    script: 'server/app.js',
    exec: 'node',
    watch: ['server/**/*.js']
  }).on('start');

  livereload.listen();
  gulp.watch(['test/**/*.js'], ['test']);
  gulp.watch(['server/views/**/*.jade']).on('change', livereload.changed);
});

gulp.task('server', ['start-server']);
gulp.task('default', ['set-ulimit', 'start-server']);
