module.exports = function(grunt) {
    var client_source = ['static/js/*.js', 'stactic/js/*/*.js'];
    var client_build = 'static/build/production.js';
    var server_source = ['server/*.js', 'server/*/*.js'];
    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            client: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        ' <%= grunt.template.today("yyyy-mm-dd") %> */ \n' +
                        'function load(){\n',
                    footer: '\n};'
                },
                src: client_source,
                dest: client_build
            },
            server: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                        ' <%= grunt.template.today("yyyy-mm-dd") %> */ \n' +
                        '(function(){\n',
                    footer: '\n})();'
                }
                src: server_source,
                dest: 'server.js'
            }
        },

        uglify: {
            build: {
                src: client_build,
                dest: client_build - 'js' + 'min.js'
            }
        },

        watch: {
            client: {
                files: client_source,
                tasks: ['concat:client']
            },
            server: {
                files: server_source,
                tasks: ['concat:server']
            }
        }
    });

    //3.Where we tell Grunt we plan to use this plug-in
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['concat', 'uglify']);
};
