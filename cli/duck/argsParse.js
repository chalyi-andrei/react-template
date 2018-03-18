function usage(error) {
  if (error) {
    console.log(`\n  \u001B[31m${error}\u001B[39m`);
  }

  console.log(`
  Usage: node cli/duck [command] [name] [options]
  
  Options
    --apiModule    API module name
    --apiKey       Key in api() object
    --typeName     Flow type name

  Commands:

    create [name] [options]          Create new duck

    add [module] [name] [options]    Add module to existing duck
      - Module can be one of data, create, update or delete
  `);
  process.exit();
}

const COMMANDS = ['create', 'add'];
const MODULES = ['data', 'create', 'update', 'delete'];
const OPTIONS = ['apiModule', 'apiKey', 'typeName'];

module.exports = function parseArgs() {
  const config = {};
  const args = process.argv.slice(2);
  if (args.length < 2) {
    usage();
  }

  // Parse command
  const command = args.shift();
  if (!COMMANDS.includes(command)) {
    usage(`Wrong command "${command}"`);
  }
  config.command = command;

  // Parse module
  if (command === 'add') {
    const module = args.shift();
    if (!MODULES.includes(module)) {
      usage(`Wrong module name "${module}"`);
    }

    config.module = module;
  }

  // Parse duck name
  const duckName = args.shift();
  if (!duckName) {
    usage(`Missing duck name`);
  }
  if (duckName.startsWith('--')) {
    usage(`Wrong duck name "${duckName}"`);
  }
  config.duckName = duckName;
  config.duckNameUcFirst = `${duckName[0].toUpperCase()}${duckName.substr(1)}`;

  // Parse options
  while (args.length) {
    const oName = args.shift();
    if (!oName.startsWith('--')) {
      usage(`Unknown parameter "${oName}"`);
    }
    const key = oName.substring(2);
    if (!OPTIONS.includes(key)) {
      usage(`Unknown option "${oName}"`);
    }

    const oValue = args.shift();
    if (!oValue || oValue.startsWith('--')) {
      usage(`Missing value for option "${oName}"`);
    }

    config[key] = oValue;
  }

  if (!config.apiModule) {
    config.apiModule = duckName;
  }
  if (!config.apiKey) {
    config.apiKey = duckName;
  }
  if (!config.typeName) {
    config.typeName = `${config.duckNameUcFirst}T`;
  }

  return config;
};
