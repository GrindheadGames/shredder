ig.module(
  'plugins.logger'
)
.requires()
.defines(function () {

  Logger = ig.Class.extend(
    { rankThreshold: 0

    , levels:
        { 'log': {rank: 1}
        , 'info': {rank: 1}
        , 'warn': {rank: 1}
        , 'error': {rank: 1}
        , 'time': {rank: 2}
        , 'timeEnd': {rank: 2}
        }

    , init: function(rankThreshold) {
        this.rankThreshold = rankThreshold;

        var levelNames = Object.keys(this.levels);

        // Create a function for each log level.
        for (var i = 0; i < levelNames.length; i++) {
          var level = levelNames[i];
          try {
            // peg the log function onto this class.
            this[level] = this.writeLog.bind(this, level)
          } catch (e) {
            throw new Error('Unsupported log level `' + level + '`')
          }
        }
      }

      // This function is a proxy for all log calls.
    , writeLog: function(level) {

        if (!this.shouldLog(level)) return;
        // Get the original arguments (except the level).
        var args = Array.prototype.slice.call(arguments, 1)
          , console = window.console

        // Call console with arguments.
        console[level].apply(console, args);
      }

    , consoleExists: function() {
        return typeof console == "object" ? true : false;
      }

    , logLevelThresholdPassed: function(level) {
        return (this.levels[level].rank <= this.rankThreshold)
      }

    , shouldLog: function(level) {
        return this.logLevelThresholdPassed(level) && this.consoleExists();
      }
  });
});

