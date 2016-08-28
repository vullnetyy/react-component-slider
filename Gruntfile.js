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
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("default", ["browserify"]);
};