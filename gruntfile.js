module.exports = function(grunt) {
    grunt.initConfig({
        jade: {
            compile: {
                options: {
                    pretty: true,
                },
                files: {
                    'public/views/partials/404.html': 'public/views/partials/404.jade',
                    'public/views/partials/signup.html': 'public/views/partials/signup.jade'
                }
            }
        },
        watch: {
            grunt: { files: ['Gruntfile.js'] },
            jade: {
                files: 'public/views/partials/*.jade',
                tasks: ['jade']
            }

        }
    });

    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('build', 'Convert Jade templates into html templates', ['jade']);
    grunt.registerTask('default', 'Convert Jade templates into html templates', ['jade', 'watch']);

};