module.exports = {
  friendlyName: 'Set Azure Account',
  description: 'Sets the active azure subscription',
  extendedDescription: '',
  inputs: {
    subNameOrId: {
      description: 'The subscription id or name to set as active',
      example: 'johndoe',
      required: true
    }
  },

  defaultExit: 'success',
  exits: { 
    error: { 
      description: 'Unexpected error occurred.' 
    },
    success: { 
      description: 'Done.' 
    } 
  },
  
  fn: function (inputs,exits) {
    var child_process = require('child_process');
    var inquirer = require('inquirer');
    var cliPath = require('path').resolve(__dirname, '../node_modules/azure-cli/bin/azure');
    
    var command = 'node ' + cliPath + ' account set ' + inputs.subNameOrId;

    child_process.exec(command, function(err, stdout){

      if(err){
        return exits.error(err);
      }

      return exits.success();
    });
  }
};
