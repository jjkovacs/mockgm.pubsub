module.exports = function (grunt) {
    'use strict';
    // Project configuration
    grunt.initConfig({
        // Metadata
        pkg: grunt.file.readJSON('package.json'),
        // Task configuration
        uglify: {
            dist: {
                src: '<%= browserify.dist.dest %>',
                dest: 'dist/mockgm.pubsub.min.js'
            }
        },
        jshint: {
            options: {
                node: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: 'nofunc',
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                eqnull: true,
                boss: true
            },
            gruntfile: {
                src: 'gruntfile.js'
            },
            src_test: {
                src: ['src/**/*.js']
            }
        },
        browserify: {
            options: {
              browserifyOptions: {
                  standalone: 'gm'
              }  
            },
            dist: {
                src: 'index.js',
                dest: 'dist/mockgm.pubsub.js'
            }
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib_test: {
                files: '<%= jshint.src_test.src %>',
                tasks: ['jshint:src_test']
            }
        }
    });

    // These plugins provide necessary tasks
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');

    // Default task
    grunt.registerTask('default', ['jshint', 'browserify:dist', 'uglify']);
};

