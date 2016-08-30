module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [["babelify"]]
                },
                files: {
                    "build/bundle.js": "example.js"
                }
            }
        },
        watch: {
            scripts: {
                files: ["src/**/*.js", "example.js"],
                tasks: ["browserify"]
            }
        },
        uglify: {
            static_mappings: {
                files: [
                    {src: 'index.js', dest: 'index.js'}
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask("default", ["browserify"]);
};