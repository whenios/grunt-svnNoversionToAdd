/*
 * grunt-svnNoversionToAdd
 * https://github.com/Administrator/grunt-svnNoversionToAdd
 *
 * Copyright (c) 2015 sesamewen
 * Licensed under the MIT license.
 */

'use strict';
var iconv = require('iconv-lite');
module.exports = function (grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('svn_noversion2add', 'to change no-version files to add', function () {
        //开启同步模式
        var done = this.async();
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            punctuation: '.',
            separator: ', '
        });
        grunt.util.spawn({
            cmd: 'svn',
            args: ['status', '../']
        }, function (err, result) {
            if (err) {
                console.log(err);
                done();
            } else {
                var resultArray = result.stdout.split('\r\n');
                var toAddPathArray = [];
                for (var i = 0; i < resultArray.length; i++) {
                    //console.log(resultArray[i][0]);
                    if (resultArray[i][0] == '?') {
                        var item = iconv.decode(new Buffer(resultArray[i].slice(8).replace(/\\/ig, "/")), 'CP936');
                        //console.log(resultArray[i]);
                        //var path = resultArray[i].slice(8).replace(/\\/ig, "/");
                        //var buf = new Buffer(path,'binary');
                        //var item = iconv.decode(buf, 'cp936');
                        //console.log(item+"/n");
                        console.log(item);
                        toAddPathArray.push(item);
                    }
                }
                if (toAddPathArray.length != 0) {
                    grunt.util.spawn({
                        cmd: 'svn',
                        args: ['add'].concat(toAddPathArray)
                    }, function (err, result) {
                        if (err) {
                            console.log(err);
                        } else {
                            //console.log("add result ="+ result);
                            console.log("新添加了下面这些文件");
                            console.log(toAddPathArray);
                            done();
                        }
                    })
                } else {
                    console.log("没有无状态码的文件");
                }

            }
        });
    });

};
