# Extension For HBuilderX

Plugin development documentation：[https://hx.dcloud.net.cn](https://hx.dcloud.net.cn)

## introduction

This template is the JS template of hbuilderx plugin(Support i18n internationalization)

## file structure：

    ├─i18n(translation source)
    │  ├─base(default language)
    │  ├─en(english language)
    │  └─zh-cn(chinese language)
    ├─src(development directory)
	├─package.json(configuration file)
	├─package.nls.json(Default internationalization language for content in package.json)
	├─package.nls.en.json(Internationalize the content in package.json in English)
	└─package.nls.zh-cn.en(Chinese internationalization language for content in package.json)
	

Before the plugin run, please enter the following command in the terminal:
```shell
npm run dev
```

## Plugin running or debugging

Use steps of this example:

1. Open this sample project，click the run button on the toolbar，or press the shortcut key`Ctrl+r`，a new HBuilderX form opens，the new form will load this plugin
2. Open a document in a new form，right click，there will be a new menu item at the bottom of the menu`hello world`(in case of Chinese language，menu items are`你好 世界`)
3. click`hello world`(`你好 世界`)，a dialog box will pop up
4. In`src/extension.js`, you can modify the code logic of the plugin，in `package.json`, you can modify the configuration of the plugin
5. After modifying these codes or configurations，hot refresh is not currently supported。you need to click the run button on the toolbar again，or press the shortcut key`Ctrl+r`，stop operation，then run again。generally, it is recommended to press continuously`Ctrl+r`

### plugin build:

Build command:
```shell
npm run build
```

Build Description:
After executing the build command，a `dist` folder will be generated under the project root directory，the content in the folder is the published plugin content。

### Use internationalization:

1. Import `hxnls` builtin package

```javascript
    const nls = require('hxnls');
```

2. call `nls.loadMessageBundle()`:

```javascript
    let localize = nls.loadMessageBundle();
```

3. Method support under Internationalization:

```javascript
    1)localize(key, value);
        key: string type, unique, It needs to be used as a key in the JSON file under the i18n folder;
        value: string type, corresponding to the value in the JSON file under the i18n folder。
        localize('hello', 'hello world');
    2)localize(key, value);
        value: string containing parameters;
        localize('hello', 'hello {0}{1}{2}{3}{4}...', 'w', 'o', 'r', 'l', 'd', ...);
        localize() After the first parameter, it is the string parameter in value. The calling method is {x-2}
```



