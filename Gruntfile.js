//Heroku with a connected dropbox account was used for the development of this application. To automatically
//deploy to the dropbox folder where heroku is connected the variable named dropboxDir is used. Feel free to change it and put it into a file that is ignored by git if more than 1 person starts deploying to heroku.
var dropboxDir = 'C:\\Users\\net\\Dropbox\\Apps\\Heroku\\shitjeb2b';

module.exports = function(grunt) {

    grunt.initConfig({
        browserify: {
            dist: {
                options: {
                    transform: [["babelify", { "stage": 0 }]]
                },
                files: {
                    "build/bundle.js": "src/main.js"
                }
            }
        },
        watch: {
            scripts: {
                files: "src/**/*.js",
                tasks: ["browserify"]
            },
            styles: {
                files: "assets/**/*.sass",
                tasks: ["sass"]
            }
        },
        sass: {
            options: {
                sourceMap: false
            },
            dist: {
                files: {
                    'assets/css/index.css': 'assets/css/index.sass'
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask("default", ["browserify"]);
};