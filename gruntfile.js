module.exports = function(grunt) {
    grunt.initConfig({
        jade: {
            compile: {
                options: {
                    pretty: true,
                },
                files: {
                    'public/views/partials/404.html': 'public/views/partials/404.jade',
                    'public/views/partials/signup.html': 'public/views/partials/signup.jade',
                    'public/views/partials/home.html': 'public/views/partials/home.jade'
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
                    'public/css/main.css': 'public/less/main.less'
                }
            }
        },
        watch: {
            grunt: { files: ['Gruntfile.js'] },
            jade: {
                files: 'public/views/partials/*.jade',
                tasks: ['jade']
            },
            less: {
                files: 'public/less/*.less',
                tasks: ['less']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('build', 'Convert Jade templates into html templates', ['jade', 'less']);
    grunt.registerTask('default', 'Convert Jade templates into html templates', ['jade', 'less', 'watch']);

};