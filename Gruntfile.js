module.exports = function (grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        path: {
            src: {
                blocks: 'src/blocks',
                js: 'src/js',
                less: 'src/less',
                img: 'src/img'
            },
            dest: {
                js: 'dist/js',
                css: 'dist/css',
                img: 'dist/img'
            }
        },
        imagemin: {
            files: {
                expand: true,
                flatten: true,
                cwd: '<%= path.dest.img %>',
                src: '**/*.{png,jpg,gif,svg}',
                dest: '<%= path.dest.img %>'
            }
        },
        concat: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> | Project base: Jekins.ru */\n'
            },
            jsCommon: {
                src: [
                    '<%= path.src.blocks %>/**/*.js',
                    '<%= path.src.js %>/**/*.js'
                ],
                dest: '<%= path.dest.js %>/common.js'
            },
            css: {
                src: '<%= path.dest.css %>/includes/*.css',
                dest: '<%= path.dest.css %>/concat/common.css'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> | Project base: Jekins.ru */\n'
            },
            jsCommon: {
                files: {
                    '<%= path.dest.js %>/common.min.js': '<%= path.dest.js %>/common.js'
                }
            }
        },
        less: {
            options: {
                //compress: true
            },
            files: {
                expand: true,
                cwd: '<%= path.src.less %>',
                src: ['*.less'],
                dest: '<%= path.dest.css %>/includes/',
                ext: '.css'
            }
        },
        clean: {
            css: {
                src: [
                    "<%= path.dest.css %>/includes/",
                    "<%= path.dest.css %>/concat/"
                ]
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 30 versions', 'ie 8', 'ie 9']
            },
            files: {
                src: '<%= path.dest.css %>/concat/*.css',
                dest: '<%= path.dest.css %>/common.min.css'
            }
        },
        copy: {
            img: {
                expand: true,
                flatten: true,
                src: [
                    '<%= path.src.img %>/**/*.{png,jpg,gif,svg}',
                    '<%= path.src.blocks %>/**/*.{png,jpg,gif,svg}'
                ],
                dest: '<%= path.dest.img %>'
            }
        },
        watch: {
            options: {
                spawn: false,
                livereload: true
            },
            jsCommon: {
                files: [
                    '<%= path.src.js %>/**/*.js',
                    '<%= path.src.blocks %>/**/*.js'
                ],
                tasks: [
                    'concat:jsCommon',
                    'uglify:jsCommon'
                ]
            },
            less: {
                files: [
                    '<%= path.src.less %>/**/*.less',
                    '<%= path.src.blocks %>/**/*.less',
                ],
                tasks: [
                    'less',
                    'concat:css',
                    'autoprefixer',
                    'clean:css'
                ]
            },
            img: {
                files: [
                    '<%= path.src.blocks %>/**/*.{png,jpg,gif,svg}',
                    '<%= path.src.img %>/**/*.{png,jpg,gif,svg}'
                ],
                tasks: [
                    'copy:img'
                ]
            }
        },
        browserSync: {
            bsFiles: {
                src: 'src/**/*'
            },
            options: {
                watchTask: true,
                    
                server: {
                    baseDir: "./dist"
                }
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');


    grunt.registerTask('default', ['concat:jsCommon', 'uglify:jsCommon', 'copy', 'less', 'concat:css', 'autoprefixer', 'clean:css']);
    grunt.registerTask('serve', ['default', 'browserSync', 'watch']);
    grunt.registerTask('img', ['default', 'imagemin']);

};