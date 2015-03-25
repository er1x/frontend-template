'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: ['app/js/**/*.js']
    },

    clean: {
      build: ['build'],
      release: ['release']
    },

    uglify: {
      options: {
        compress: {
          drop_console: true
        }
      },
      release:{
        files: {
          'release/js/bundle.js': ['release/js/bundle.js']
        }
      }
    },

    browserify: {
      options: {
        debug: true,
        transform: ['hbsfy'],
        extensions: ['.hbs']
      },
      build: {
        src: 'app/js/main.js',
        dest: 'build/js/bundle.js'
      },
      release: {
        options: {
          debug: false
        },
        src: 'app/js/main.js',
        dest: 'release/js/bundle.js'
      }
    },

    copy: {
      build: {
        files: [
          {expand: true, cwd: 'app/', src: ['fonts/*'], dest: 'build'},
          {expand: true, cwd: 'app/', src: ['img/*'], dest: 'build'},
          {expand: true, cwd: 'app/', src: ['data/*'], dest: 'build'},
          {expand: true, cwd: 'app/', src: ['*.html'], dest: 'build'}
        ]        
      },
      release: {
        files: [
          {expand: true, cwd: 'app/', src: ['fonts/*'], dest: 'release'},
          {expand:true, cwd: 'app/', src: ['data/*'], dest: 'release'},
          {expand: true, cwd: 'app/', src: ['*.html'], dest: 'release'}
        ]
      }
    },

    htmlmin: {
      options: {
        removeComments: true,
        collapseWhitespace: true
      },
      release: {
        files: {
          'release/index.html': 'app/index.html'
        }
      }
    },

    stylus: {
      build: {
        files: {
          'build/css/bundle.css': 'app/stylus/main.styl'
        }
      },
      release: {
        files: {
          'release/css/bundle.css': 'app/stylus/main.styl'
        }
      }
    },

    imagemin: {
      release: {
        files: [
          {expand: true, cwd: 'app/', src: ['img/*'], dest: 'release'}
        ]
      }
    },

    cssmin: {
      release: {
        files: {
          'release/css/bundle.css': ['release/css/bundle.css']
        }
      }
    },

    connect: {
      build: {
        options: {
          port: 9000,
          base: 'build'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      js: {
        files: ['app/js/**/*'],
        tasks: ['jshint', 'browserify:build']
      },
      stylus: {
        files: ['app/stylus/**/*'],
        tasks: ['stylus:build']        
      },
      others: {
        files: ['app/*.html', 'app/fonts/**/*', 'app/img/**/*'],
        tasks: ['copy:build']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');

  grunt.registerTask('default', [
    'clean:build',
    'jshint',
    'copy:build',
    'browserify:build',
    'stylus:build',
    'connect',
    'watch'
  ]);

  grunt.registerTask('build', [
    'clean:release',
    'jshint',
    'browserify:release',
    'uglify',
    'copy:release',
    'stylus:release',
    'htmlmin',
    'cssmin',
    'imagemin'
  ]);

};