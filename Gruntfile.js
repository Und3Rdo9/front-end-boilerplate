/*global module:false*/
/* jshint node: true */
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.

    sass: {                              
      dist: {                            
        options: {                       
          style: 'expanded',
          trace: true,

        },
        files: {                         
          'src/stylesheets/build/main.compiled.css': 'src/stylesheets/scss/main.scss', // 'destination': 'source'
          
        }
      }
    },
    postcss: {
      options: {
        map: true, 
        processors: [
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'src/stylesheets/build/main.compiled.css',
        dest: 'src/stylesheets/build/main.min.css'
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        compress: {},
      },
      dist: {
        src: ['src/scripts/main.js'],
        dest: 'src/scripts/build/main.min.js'
      }
    },
    jshint: {

      options: {
        curly: true,
        eqeqeq: true,
        latedef: true,
        newcap: true,
        noarg: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        devel: true,
        reporterOutput: '', 
        globals: {
          jQuery: true
        }

      },
      main: {
        src: ['src/scripts/*.js']
      },
      gruntfile: {
        src: ['Gruntfile.js']
      },

    },
    modernizr:{
      dist: {
        "parseFiles": true,
        "crawl" : true,
        "customTests": [],
        "devFile": false,
        "dest": "src/scripts/build/modernizr-output.js",
        "tests": [
          // Tests
        ],
        "options": [
          "setClasses"
        ],
        "uglify": true
      },
    },
    htmlhint: {
      html1: {
        options: {
          'tag-pair': true
        },
        src: ['src/*.html']
      },
    },
    watch: {
      gruntfile: {
        files: 'Gruntfile.js',
        tasks: ['jshint:gruntfile']
      },
      main: {
        files: 'src/scripts/main.js',
        tasks: ['jshint:main', 'uglify'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      scss:{
        files: ['src/stylesheets/*.scss', 'src/stylesheets/**/*.scss'],
        tasks: ['sass', 'postcss'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
      html: {
        files: ['src/*.html'],
        tasks: ['htmlhint'],
        options: {
          spawn: false,
          livereload: true,
        },
      },
    },
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-modernizr');
  grunt.loadNpmTasks('grunt-htmlhint');

  // Default task.
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('compile', ['modernizr:dist', 'uglify', 'sass', 'postcss']);

};
