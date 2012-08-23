[![build status](https://secure.travis-ci.org/kuno/consolemark.png)](http://travis-ci.org/kuno/consolemark)
Use ansi color to render the output on console screen;

![output](https://github.com/kuno/consolemark/raw/master/misc/output.png)


###Install

    npm install consolemark

###File format

   Consolemark can parse any text file, no matter its filename extension.

   But for convenience reason, I recommend that you name the file with '.cmk' extension.

###Tags
  
   Consolemark uses tags to render text, it is similar to html tag:

       <yellow>text1</yellow> <bold>text2</bold> <white>text3</white>

   * No nested tags, please ;).

   See details at example/exmaple.cmk

####Current support tags

   red, yellow, gree, white, cyan, magenta, blue, grey, bold, italic, underline, inverse         


###Usage

####Require

    var util = require('util');
    cmk = require('consolemark');

    // Asynchronous method
    cmk.render('./path/to/cmk/file', function(err, data) {
      if (err) {throw err;}
      data.forEach(function(d) { // return a array of colorful string
        util.print(d);
      });
     });

     // Synchronous method
     var colorfule = cmk.renderSync('path/to/cmk/file');
     colorfule.forEach(function(c) {
       util.print(c);
     });
 
####Commandline tool

    cmk path/to/file


