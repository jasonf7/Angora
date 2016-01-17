module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jade: {
            compile: {
                options: {
                    pretty: true,
                },
                files: {
                    'public/views/partials/404.html': 'public/views/partials/404.jade',
                    'public/views/partials/signup.html': 'public/views/partials/signup.jade',
                    'public/views/partials/home.html': 'public/views/partials/home.jade',
                    'public/views/partials/nearby.html': 'public/views/partials/nearby.jade',
                    'public/views/modals/stylistsModal.html': 'public/views/modals/stylistsModal.jade'
                }
            }
        },
        less: {
            compile: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    'public/css/main.css': 'public/less/main.less',
                    'public/css/home.css': 'public/less/home.less',
                    'public/css/signup.css': 'public/less/signup.less',
                    'public/css/nearby.css': 'public/less/nearby.less',
                    'public/css/stylistsModal.css': 'public/less/stylistsModal.less'
                }
            }
        },
        browserify: {
            main: {
                src: 'public/index.js',
                dest: 'public/bundle.js'
            }
        },
        watch: {
            grunt: { files: ['Gruntfile.js'] },
            jade: {
                files: [
                    'public/views/partials/*.jade',
                    'public/views/modals/*.jade'
                ],
                tasks: ['jade']
            },
            less: {
                files: 'public/less/*.less',
                tasks: ['less']
            },
            browserify: {
                files: ['public/index.js'],
                tasks: ['browserify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('build', 'Convert Jade templates into html templates', ['jade', 'less', 'browserify']);
    grunt.registerTask('default', 'Convert Jade templates into html templates', ['jade', 'less', 'browserify', 'watch']);

};