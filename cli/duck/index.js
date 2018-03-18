const path = require('path');
const fs = require('fs');
const parseArgs = require('./argsParse');

const params = parseArgs();

const ducksPath = path.join(__dirname, '..', '..', 'src', 'store', 'modules');

const newDucksPath = path.join(ducksPath, params.duckName);

if (!fs.existsSync(ducksPath)) {
  console.log(`\u001B[31m  Cannot find modules directory. Expected: ${ducksPath}\u001B[39m`);
  process.exit(-1);
}

const modules = {
  'index': require('./tpl/index'),
  'data': require('./tpl/data'),
  'load': require('./tpl/load.js'),
  'create': require('./tpl/create'),
  'update': require('./tpl/update'),
  'delete': require('./tpl/delete'),
};

const commands = {
  create(params) {
    if (fs.existsSync(newDucksPath)) {
      console.log(`\u001B[31m  Module "${params.duckName}" already exist. Check ${newDucksPath}\u001B[39m`);
      process.exit(-1);
    }

    fs.mkdirSync(newDucksPath);
    for (const moduleName of Object.keys(modules)) {
      fs.writeFileSync(
        path.join(newDucksPath, `${moduleName}.js`),
        modules[moduleName](
          params.duckName,
          params.duckNameUcFirst,
          params.apiModule,
          params.apiKey,
          params.typeName
        )
      );
    }
    console.log(`  Module "${params.duckName}" was created in ${newDucksPath}`);
  },
  add(params) {
    if (!fs.existsSync(newDucksPath)) {
      fs.mkdirSync(newDucksPath);
    }
    const modulePath = path.join(newDucksPath, `${params.module}.js`);
    if (fs.existsSync(modulePath)) {
      console.log(`\u001B[31m  Module "${params.duckName}/${params.module}.js" already exist. Check ${newDucksPath}\u001B[39m`);
      process.exit(-1);
    }

    fs.writeFileSync(
      modulePath,
      modules[params.module](
        params.duckName,
        params.duckNameUcFirst,
        params.apiModule,
        params.apiKey,
        params.typeName
      )
    );

    console.log(`  Module "${params.duckName}/${params.module}.js" was created in ${newDucksPath}`);
    console.log(`  \u001B[33mDon't forget to add it in ${params.duckName}/index.js\u001B[39m`)
  }
};


if (commands[params.command]) {
  commands[params.command](params);
}
