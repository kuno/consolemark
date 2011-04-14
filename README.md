Use ansi color to render the output on console screen;

![output](https://github.com/kuno/consolemark/raw/master/misc/output.png)


###Install

    npm install consolemark


###Tags
  
   Similar to html tag, <TAG>text</TAG> <ANOTHERTAG>text</ANOTHERTAG>

   See details at example/exmaple.cmk file
;
####Current support tags

   red, yellow, gree, white, cyan, magenta, blue, grey         


###Usage

####Require

    var util = require('util');
    consolemark = require('consolemark');

    consolemark.render('./test.cmk', function(err, data) {
      if (err) {throw err;}
      data.forEach(function(d) { // return a array of colorful string
        util.print(d);
      });
     });
 
####Commandline tool

    cmk path/to/file


