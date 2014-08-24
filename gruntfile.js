/* globals module */

module.exports = function (grunt) {
    var config = {
        pkg: grunt.file.readJSON("package.json"),
        docco: {
            javascript: {
                src: ["<%= grunt.option('src') %>pointy*.js"],
                dest: "./site/_site/docco/"
            }
        },
        mkdir: {
            docco: {
                options: {
                    create: ["./site/_site/docco/"]
                }
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: "<%= grunt.option('src') %>dist/",
                    src: ["**"],
                    dest: "./site/_site/dist/"
                }, {
                    expand: true,
                    cwd: "<%= grunt.option('src') %>",
                    flatten: true,
                    src: ["LICENSE"],
                    processFile: true,
                    dest: "./site/_site/"
                }]
            },
            doccoFix: {
                files: [{
                    expand: true,
                    cwd: "./site/_docco/",
                    src: ["**"],
                    dest: "./site/_site/docco"
                }]
            }
        },
        clean: {
            options: {
                force: true
            },
            docs: ["./site/_site"],
            dist: ["./dist"]
        },
        jekyll: {
            docs: {
                options: {
                    src: "./site/",
                    config: "./site/_config.yml",
                    dest: "./site/_site"
                }
            }
        },
        compress: {
            main: {
                options: {
                    archive: "./site/pointyjs.zip"
                },
                files: [{
                    // includes files in path
                    expand: true,
                    src: ["**"],
                    cwd: "<%= grunt.option('src') %>dist",
                    dest: "",
                    filter: "isFile"
                }]
            }
        },
        "string-replace": {
            site: {
                files: [{
                    expand: true,
                    cwd: "./site/_site/",
                    flatten: false,
                    src: ["*.html"],
                    dest: "./site/_site/"
                }],
                options: {
                    replacements: [{
                        pattern: /\.\.\/dist\//ig,
                        replacement: "dist/"
                    }]
                }
            }
        }
    };

    // Project configuration.
    grunt.initConfig(config);

    if (!grunt.option("src")) {
        grunt.option("src", "../pointy/");        
    } else if (grunt.option("src")[grunt.option("src").length - 1] != "/") {
        grunt.option("src", grunt.option("src") + "/");
    }

    // NPM tasks
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-docco");
    grunt.loadNpmTasks("grunt-contrib-compress");
    grunt.loadNpmTasks("grunt-string-replace");
    grunt.loadNpmTasks("grunt-jekyll");
    grunt.loadNpmTasks("grunt-mkdir");

    grunt.registerTask("verifypath", function() {
        if (!grunt.file.exists(grunt.option("src"))) {
            throw new Error("The src path '" + grunt.option("src") + "' could not be found.")
        }

        grunt.log.write("Generating site from pointy.js repo with path '" + grunt.option("src") + "'");
    })

    // Custom tasks
    grunt.loadTasks("./site/_tasks");

    grunt.registerTask("default", ["verifypath", "compress", "sitePages", "docs"]);

    grunt.registerTask("docs", ["mkdir:docco", "docco", "docco-add-links", "copy:doccoFix"]);

    grunt.registerTask("sitePages", ["jekyll", "string-replace:site", "copy:dist"]);
};
