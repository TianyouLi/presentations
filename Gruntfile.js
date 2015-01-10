'use strict';

var request = require('request');

module.exports = function (grunt) {
  // show elapsed time at the end
  require('time-grunt')(grunt);
  // load all grunt tasks
  require('load-grunt-tasks')(grunt);

  var reloadPort = 35729, files;

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    develop: {
      server: {
        file: 'bin/www'
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: reloadPort
      },
      server: {
        files: [
          'bin/www',
          'app.js',
          'db/script/*.js',
          'routes/*.js',
          'test/**/*.js'
        ],
        tasks: ['mochaTest', 'develop', 'delayed-livereload']
      },
      js: {
        files: ['public/js/*.js'],
        options: {
          livereload: reloadPort
        },
        tasks: ['mochaTest']
      },
      css: {
        files: [
          'public/css/*.css'
        ],
        options: {
          livereload: reloadPort
        }
      },
      views: {
        files: ['views/*.jade'],
        options: {
          livereload: reloadPort
        }
      }
    },
    
    jshint: {
      global: [
        'bin/www',
        'app.js',
        'db/**/*.js',
        'views/**/*.js',
        'route/**/*.js',
        'test/**/*.js'
      ],
      options: {
        asi: true,
        boss: true,
        browser: true,
        camelcase: true,
        curly: false,
        devel: false,
        eqeqeq: true,
        eqnull: true,
        es5: false,
        evil: false,
        immed: false,
        indent: 2,
        jquery: true,
        latedef: false,
        laxbreak: true,
        laxcomma: true,
        maxcomplexity: 6,
        maxdepth: 4,
        maxstatements: 25,
        newcap: true,
        node: true,
        noempty: false,
        nonew: true,
        quotmark: "single",
        smarttabs: true,
        strict: false,
        trailing: false,
        undef: true,
        unused: true
      },
      
      browser: {
        files: {
          src: ['public/js/**/*.js']
        },
        options: {
          globals: {
            d3: false,
            console: true
          },
          browser: true,
          node: false
        }
      }
    },
    
    mochaTest: {
      test: {
        options: {
          reporter: 'spec',
          clearRequireCache: true
        },
        src: ['test/**/*.js']
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  
  grunt.config.requires('watch.server.files');
  files = grunt.config('watch.server.files');
  files = grunt.file.expand(files);

  grunt.registerTask('delayed-livereload', 'Live reload after the node server has restarted.', function () {
    var done = this.async();
    setTimeout(function () {
      request.get('http://localhost:' + reloadPort + '/changed?files=' + files.join(','),  function (err, res) {
          var reloaded = !err && res.statusCode === 200;
          if (reloaded) {
            grunt.log.ok('Delayed live reload successful.');
          } else {
            grunt.log.error('Unable to make a delayed live reload.');
          }
          done(reloaded);
        });
    }, 500);
  });
  
  grunt.registerTask('default', [
    'mochaTest',
    'jshint',
    'develop', 
    'watch'
  ]);
};
