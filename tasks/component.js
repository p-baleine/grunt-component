module.exports = function(grunt) {

  var existsSync = require('fs').existsSync
    , path = require('path');

  /**
   * Makefile directory option
   */
  var include = grunt.config.get('component.include');

  grunt.registerTask('component', 'Build component"', function() {
    if ( !existsSync(path.join(include ? include + '/' : '', 'Makefile')) ){
      grunt.log.errorlns('`Makefile` generated by `component-create` should be placed to make this task to work!');
      return false;
    }
    var done = this.async()
      , args = ['build'];

    if (include) args.push('--directory', include);

    grunt.utils.spawn({cmd: 'make', args: args }, function(err, result, code){
        if ( err ) grunt.log.writeln(err);
        done(null, result);
    });
  });
};
