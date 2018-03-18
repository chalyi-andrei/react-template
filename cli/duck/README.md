Тулза для генерации redux модулей (ducks).<br>
Без аргументов покажет справку:<br>
`$ node cli/duck
   Usage: node cli/duck [command] [name] [options]
   Options
     --apiModule    API module name
     --apiKey       Key in api() object
     --typeName     Flow type name
   Commands:
     create [name] [options]          Create new duck
     add [module] [name] [options]    Add module to existing duck
       - Module can be one of data, create, update or delete
`

Опции:<br>
**typeName** - имя для типа flow, по умолчанию ucFirst от **name**<br>
**apiModule** - имя файла api модуля, по умолчанию совпадает с **name**<br>
Ети две опции используются в хедере файла для импорта типа сущности:<br>
`import type { ${typeName} } from '../../../api/modules/${apiModule}';`

**apiKey** - имя ключа в объекте api, по умолчанию совпадает с **name**<br>
Используется и action creator'е:<br>
`{
   type: API_REQUEST,
   types: [LOAD, LOAD_SUCCESS, LOAD_FAILURE],
   // @TODO Check api path
   call: () => api().${apiKey}.get(),
 };`
