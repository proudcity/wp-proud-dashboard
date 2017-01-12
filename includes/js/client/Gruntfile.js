'use strict';

// Deal with local HTML5 Mode
var serveStatic = require('serve-static');
var modRewrite = require('connect-modrewrite');
var mountFolder = function (connect, dir) {
  return connect().use(require('path').resolve(dir), serveStatic(require('path').resolve(dir)));
};
var filesRedirect = '!\\.html|\\.js|\\.svg|\\.woff|\\.ttf|\\.eot|\\.otf|\\.css|\\.png|\\.jpg$ /index.html [L]';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);


	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		app: 'app',
		dist: 'dist',

		sass: {
			options: {
				includePaths: [
					'<%= app %>',
				  '<%= app %>/bower_components/bootstrap-sass-official/assets/stylesheets',
          '<%= app %>/bower_components/bourbon/dist',
          '<%= app %>/bower_components/proudcity-patterns/app'

				]
			},
			dist: {
				options: {
					outputStyle: 'extended'
				},
				files: {
					'<%= app %>/css/bootstrap.css': '<%= app %>/scss/bootstrap.scss',
					'<%= app %>/css/app.css': '<%= app %>/scss/app.scss'
				}
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'Gruntfile.js',
				'<%= app %>/js/**/*.js'
			]
		},

		clean: {
			dist: {
				src: ['<%= dist %>/*']
			},
		},

		copy: {
			dist: {
				files: [{
					expand: true,
					cwd:'<%= app %>/',
					src: ['CNAME', '.htaccess', 'images/**/*.{jpg,gif,svg,jpeg,png}', 'favicon.ico', 'fonts/**', 'vendor/**', '**/*.html', '!**/*.scss', '!bower_components/**'],
					dest: '<%= dist %>/'
				} , {
					expand: true,
					flatten: true,
					src: ['<%= app %>/bower_components/font-awesome/fonts/**'],
					dest: '<%= dist %>/fonts/',
					filter: 'isFile'
				} ]
			},
		},

		imagemin: {
			target: {
				files: [{
					expand: true,
					cwd: '<%= app %>/images/',
					src: ['**/*.{jpg,gif,svg,jpeg,png}'],
					dest: '<%= dist %>/images/'
				}]
			}
		},

		concat: {
			wrap: {
				src: [
		      '.tmp/concat/js/app.min.js'
	     	],
	     	dest: '.tmp/concat/js/app.min.js',
   	    options: {
      		banner: "!function($){",
		      footer: "}(jQuery);"
	    	}
			}
		},

		uglify: {
			options: {
				preserveComments: 'some',
				mangle: false
			}
		},

		useminPrepare: {
			html: ['<%= app %>/index.html'],
			options: {
				dest: '<%= dist %>'
			}
		},

		usemin: {
			html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
			css: ['<%= dist %>/css/**/*.css'],
			options: {
				dirs: ['<%= dist %>']
			}
		},

		watch: {
			grunt: {
				files: ['Gruntfile.js'],
				tasks: ['sass']
			},
			sass: {
				files: '<%= app %>/scss/**/*.scss',
				tasks: ['sass']
			},
			livereload: {
				files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
				options: {
					livereload: 35727
				}
			}
		},

		connect: {
			app: {
				options: {
					port: 9000,
					base: '<%= app %>/',
					open: true,
					livereload: 35727,
					hostname: 'localhost'
				}
			},
			dist: {
				options: {
					port: 9001,
					base: '<%= dist %>/',
					open: true,
					keepalive: true,
					livereload: false,
					hostname: 'localhost'
				}
			}
		},
		
		ngtemplates:  {
		  "311AppParent":        {
		    cwd:      '<%= dist %>',
		    src:      'views/**/*.html',
		    dest:     '<%= dist %>/views/app.templates.js',
		    options:    {
		      htmlmin:  { collapseWhitespace: true, collapseBooleanAttributes: true }
		    }
		  }
		},

		wiredep: {
			target: {
				src: [
					'<%= app %>/**/*.html'
				],
				exclude: [
					'font-awesome',
					'bootstrap-sass-official'
				]
			}
		}

	});

	
	grunt.registerTask('compile-sass', ['sass']);
	grunt.registerTask('bower-install', ['wiredep']);
	
	grunt.registerTask('default', ['compile-sass', 'bower-install', 'connect:app', 'watch']);
	grunt.registerTask('validate-js', ['jshint']);
	//grunt.registerTask('validate-js', ['jshint', 'ngtemplates', 'concat']);
	grunt.registerTask('server-dist', ['connect:dist']);
	
	grunt.registerTask('publish', ['compile-sass', 'clean:dist', 'useminPrepare', 'copy:dist',  'concat:generated', 'concat:wrap', 'cssmin', 'ngtemplates','uglify', 'usemin']);

};
