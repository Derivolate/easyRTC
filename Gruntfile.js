module.exports = function(grunt) {
    var client_build = 'static';
    var client_source = 'static/build';
    var server_source = 'server';
    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            client: {
                src: client_source + '/*.js',
                dest: client_build + '/production.js'
            },
            server: {
                src: server_source + '/*.js',
                dest: 'server.js'
            }
        },

        uglify: {
            build: {
                src: client_build + '/production.js',
                dest: client_build + '/production.min.js'
            }
        },

        watch: {
            client: {
                files: client_source + '/*.js',
                tasks: 'concat:client'
            },
            server: {
                files: server_source + '/*.js',
                tasks: 'concat:client'
            }
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify']);
};
