// Generated on 2014-08-01 using generator-phonegap 0.1.2
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {
	// show elapsed time at the end
	require('time-grunt')(grunt);
	// load all grunt tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		// configurable paths
		yeoman: {
			app: 'app',
			dist: 'dist'
		},

		phonegap: {
			config: {
				root: 'dist',
				config: 'config.xml',
				cordova: 'phonegap/.cordova',
				html : 'index.html',
				path: 'phonegap',
				plugins: [
					'https://github.com/phonegap-build/StatusBarPlugin.git',
					'https://github.com/apache/cordova-plugin-inappbrowser.git',
					'https://github.com/apache/cordova-plugin-splashscreen.git'
				],
				platforms: ['ios', 'android'],
				verbose: false,
				
				name: function(){
					var pkg = grunt.file.readJSON('package.json');
					return pkg.name;
				},
				
				versionCode: function() {
					var pkg = grunt.file.readJSON('package.json');
					var vArr = pkg.version.split('.');
					var vc = vArr[0];
					for (var i = 1; i < vArr.length; i++) {
						vc += ("00" + vArr[i]).slice(-3);
					}
					return vc;
				},
				
				releases: 'releases',
				releaseName: function(){
					var pkg = grunt.file.readJSON('package.json');
					return(pkg.name + '-' + pkg.version);
				},
				
				key: {
					store: 'fhsapp-dev.keystore',
					alias: 'FhsApp',
					aliasPassword: function(){
						return('rainorshine4')
					},
					storePassword: function(){
						return('rainorshine4')
					}
				},
				
				icons: {
		          	android: {
						ldpi: '<%= yeoman.dist %>/res/icon/android/drawable-ldpi/icon.png',
						mdpi: '<%= yeoman.dist %>/res/icon/android/drawable-mdpi/icon.png',
						hdpi: '<%= yeoman.dist %>/res/icon/android/drawable-hdpi/icon.png',
						xhdpi: '<%= yeoman.dist %>/res/icon/android/drawable-xhdpi/icon.png',
						//xxhdpi: '<%= yeoman.dist %>/res/icon/android/drawable-xxhdpi/icon.png'
					},
					//wp8: {
					//  app: 'icon-62-tile.png',
					//  tile: 'icon-173-tile.png'
					//},
					ios: {
						//icon29: '<%= yeoman.dist %>/res/icon/ios/icon-small.png',
						//icon29x2: '<%= yeoman.dist %>/res/icon/ios/icon-small@2x.png',
						//icon40: '<%= yeoman.dist %>/res/icon/ios/icon-40.png',
						//icon40x2: '<%= yeoman.dist %>/res/icon/ios/icon-40@2x.png',
						//icon50: '<%= yeoman.dist %>/res/icon/ios/icon-50.png',
						//icon50x2: '<%= yeoman.dist %>/res/icon/ios/icon-50@2x.png',
						icon57: '<%= yeoman.dist %>/res/icon/ios/icon-57.png',
						icon57x2: '<%= yeoman.dist %>/res/icon/ios/icon-57@2x.png',
						//icon60: '<%= yeoman.dist %>/res/icon/ios/icon-60.png',
						icon60x2: '<%= yeoman.dist %>/res/icon/ios/icon-60@2x.png',
						icon72: '<%= yeoman.dist %>/res/icon/ios/icon-72.png',
						icon72x2: '<%= yeoman.dist %>/res/icon/ios/icon-72@2x.png',
						icon76: '<%= yeoman.dist %>/res/icon/ios/icon-76.png',
						icon76x2: '<%= yeoman.dist %>/res/icon/ios/icon-76@2x.png'
			        }
				},
				
				screens: {
			        android: {
						ldpi: '<%= yeoman.dist %>/res/screen/android/drawable-ldpi/splash.png',
						ldpiLand: '<%= yeoman.dist %>/res/screen/android/drawable-land-ldpi/splash.png',
						mdpi: '<%= yeoman.dist %>/res/screen/android/drawable-mdpi/splash.png',
						mdpiLand: '<%= yeoman.dist %>/res/screen/android/drawable-land-mdpi/splash.png',
						hdpi: '<%= yeoman.dist %>/res/screen/android/drawable-hdpi/splash.png',
						hdpiLand: '<%= yeoman.dist %>/res/screen/android/drawable-land-hdpi/splash.png',
						xhdpi: '<%= yeoman.dist %>/res/screen/android/drawable-xhdpi/splash.png',
						xhdpiLand: '<%= yeoman.dist %>/res/screen/android/drawable-land-xhdpi/splash.png'
			        },
			        ios: {
						ipadLand: '<%= yeoman.dist %>/res/screen/ios/Default-Landscape~ipad.png',
						ipadLandx2: '<%= yeoman.dist %>/res/screen/ios/Default-Landscape@2x~ipad.png',
						ipadPortrait: '<%= yeoman.dist %>/res/screen/ios/Default-Portrait~ipad.png',
						ipadPortraitx2: '<%= yeoman.dist %>/res/screen/ios/Default-Portrait@2x~ipad.png',
						iphonePortrait: '<%= yeoman.dist %>/res/screen/ios/Default~iphone.png',
						iphonePortraitx2: '<%= yeoman.dist %>/res/screen/ios/Default@2x~iphone.png',
						iphone568hx2: '<%= yeoman.dist %>/res/screen/ios/Default-568h@2x~iphone.png'
			        }
				}
			}
		},

        watch: {
            //compass: {
            //    files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
            //    tasks: ['compass:server', 'autoprefixer']
            //},
            styles: {
                files: ['<%= yeoman.app %>/{,*/}*.css'],
                tasks: ['copy:styles', 'autoprefixer']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= yeoman.app %>/*.html',
                    //'.tmp/styles/{,*/}*.css',
                    '{.tmp,<%= yeoman.app %>}/js/{,*/}*.js',
                    '<%= yeoman.app %>/Images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            test: {
                options: {
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= yeoman.dist %>'
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/js/{,*/}*.js',
                '!<%= yeoman.app %>/js/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },
		karma: {
			options: {
				files: ['test/**/*.js']
			},
			continuous: {
			},
			dev: {
			}
		},
        mocha: {
            all: {
                options: {
                    run: true,
                    urls: ['http://<%= connect.test.options.hostname %>:<%= connect.test.options.port %>/index.html']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },
        // not used since Uglify task does concat,
        // but still available if needed
        /*concat: {
            dist: {}
        },*/
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
            }
        },
        // not enabled since usemin task does concat and uglify
        // check index.html to edit your build targets
        // enable this task if you prefer defining your build targets here
        /*uglify: {
            dist: {}
        },*/
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/js/{,*/}*.js',
                        '<%= yeoman.dist %>/{,*/}*.css',
                        '<%= yeoman.dist %>/Images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        //'<%= yeoman.dist %>/styles/fonts/{,*/}*.*'
                    ]
                }
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= yeoman.dist %>'
            },
            html: '<%= yeoman.app %>/index.html'
        },
        usemin: {
            options: {
                dirs: ['<%= yeoman.dist %>']
            },
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css']
        },
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/Images',
                    src: '{,*/}*.{png,jpg,jpeg}',
                    dest: '<%= yeoman.dist %>/Images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/Images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/Images'
                }]
            }
        },
        cssmin: {
            // This task is pre-configured if you do not wish to use Usemin
            // blocks for your CSS. By default, the Usemin block from your
            // `index.html` will take care of minification, e.g.
            //
            //     <!-- build:css({.tmp,app}) styles/main.css -->
            //
            //dist: {
            //     files: {
            //        '<%= yeoman.dist %>/styles/main.css': [
            //             '.tmp/styles/{,*/}*.css',
            //             '<%= yeoman.app %>/styles/{,*/}*.css'
            //        ]
            //     }
            //}
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                    // https://github.com/yeoman/grunt-usemin/issues/44
                    //collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeAttributeQuotes: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true*/
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>',
                    src: '*.html',
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'Images/{,*/}*.{webp,gif}',
						'res/**',
                        'styles/fonts/{,*/}*.*'
                    ]
                }]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            }
        },
        concurrent: {
            server: [
                'copy:styles'
            ],
            test: [
                'copy:styles'
            ],
            dist: [
                'copy:styles',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        }
    });

    grunt.registerTask('server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'concurrent:server',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        //'mocha'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        //'rev',
        'usemin'
    ]);

	grunt.registerTask('platform-build', [
		'default',
		'phonegap:build',
		'phonegap:release:android'
	]);

    grunt.registerTask('default', [
        //'jshint',
        //'test',
        'build'
    ]);
};