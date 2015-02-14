module.exports = {
  friendlyName: 'Check Active Subscription',
  description: 'Detects if there is an active azure subscription',
  extendedDescription: '',
  inputs: {},
  defaultExit: 'success',
  exits: { error: { description: 'Unexpected error occurred.' },
    success: { description: 'Done.' } },
  fn: function (inputs,exits) {


    var child_process = require('child_process');
    var readline = require('readline');
    var cliPath = './node_modules/azure-cli/bin/azure';

    var rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    var command;

    command = 'node ' + cliPath + ' account list ';
    child_process.exec(command, function (err, stdout) {

      if(err){
        return exits.error(err);
      }

      if(stdout.indexOf('  true') > -1){
        return exits.success(true);
      }
      else{
        return exists.success(false);
      }
    });

  },

};
