/*
 * grunt-svnNoversionToAdd
 * https://github.com/Administrator/grunt-svnNoversionToAdd
 *
 * Copyright (c) 2015 sesamewen
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('svnNoversionToAdd', 'to change no-version files to add', function () {
        //开启同步模式
        var done = this.async();
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });
        grunt.util.spawn({
            cmd: 'svn',
            args: ['status', './']
        }, function (err, result) {
            if (err) {
                console.log(err);
                done();
            } else {
                console.log(result);
                var resultArray = result.stdout.split('\r\n');
                console.log(resultArray);
                var resultPathArray = [];
                for (var i = 0; i < resultArray.length; i++) {
                    console.log(resultArray[i][0]);
                    if (resultArray[i][0] == '?') {
                        resultPathArray.push(resultArray[i].slice(8).replace(/\\/ig, "/"));
                    }
                }
                if (resultPathArray.length != 0) {
                    grunt.util.spawn({
                        cmd: 'svn',
                        args: ['add'].concat(resultPathArray)
                    }, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            done();
                        }
                    })
                }
                console.log(resultPathArray);
            }
        });
        console.log("wh's first grunt Task");
        //
        //// Iterate over all specified file groups.
        //this.files.forEach(function(f) {
        //  // Concat specified files.
        //  var src = f.src.filter(function(filepath) {
        //    // Warn on and remove invalid source files (if nonull was set).
        //    if (!grunt.file.exists(filepath)) {
        //      grunt.log.warn('Source file "' + filepath + '" not found.');
        //      return false;
        //    } else {
        //      return true;
        //    }
        //  }).map(function(filepath) {
        //    // Read file source.
        //    return grunt.file.read(filepath);
        //  }).join(grunt.util.normalizelf(options.separator));
        //
        //  // Handle options.
        //  src += options.punctuation;
        //
        //  // Write the destination file.
        //  grunt.file.write(f.dest, src);
        //
        //  // Print a success message.
        //  grunt.log.writeln('File "' + f.dest + '" created.');
        //});
    });

};
