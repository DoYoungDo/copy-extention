# Extension For HBuilderX

插件开发文档参考：[https://hx.dcloud.net.cn](https://hx.dcloud.net.cn)

## 简介

本模板是HBuilderX插件JS模板(支持i18n国际化)

## 文件结构

    ├─i18n(国际化翻译源)
    │  ├─base(基础)
    │  ├─en(英文)
    │  └─zh-cn(中文)
    ├─src(开发目录)
	├─package.json(配置文件)
	├─package.nls.json(针对package.json中的内容进行默认国际化语言)
	├─package.nls.en.json(针对package.json中的内容进行英文国际化语言)
	└─package.nls.zh-cn.en(针对package.json中的内容进行中文国际化语言)
	

插件运行前，请在终端输入如下命令:
```shell
npm run dev
```

## 插件运行或调试

本示例使用步骤:

1. 打开本示例工程，点击工具栏的运行按钮，或者按下快捷键`Ctrl+r`，会打开一个新HBuilderX窗体，新窗体将加载这个插件
2. 在新窗体中打开一个文档，点右键，菜单底部会有一个新的菜单项`hello world`(如果是中文语言，菜单项为`你好 世界`)
3. 点击`hello world`(`你好 世界`)，会弹出一个对话框
4. 在`src/extension.js`中可以修改插件的代码逻辑，在`package.json`中可以修改插件的配置
5. 修改这些代码或配置后，目前不支持热刷新。需要重新点击工具栏的运行按钮，或者按下快捷键`Ctrl+r`，停止运行，然后再次重新运行。一般推荐连续按`Ctrl+r`

### 插件构建

构建命令:
```shell
npm run build
```

构建说明:
执行构建命令以后，会在项目根目录下产生一个`dist`文件夹，文件夹中的内容为发布的插件内容。

### 使用国际化

1. 导入`hxnls`内置包

```javascript
    const nls = require('hxnls');
```

2. 调用`hxnls`下的`loadMessageBundle()`:

```javascript
    let localize = nls.loadMessageBundle();
```

3. 国际化下的方法支持:

```javascript
    1)localize(key, value);
        key: string类型,唯一值,需要在i18n文件夹下的json文件中作为key使用;
        value: string类型,对应i18n文件夹下的json文件中的value。
        localize('hello', 'hello world');
    2)localize(key, value);
        value: 包含参数的字符串;
        localize('hello', 'hello {0}{1}{2}{3}{4}...', 'w', 'o', 'r', 'l', 'd', ...);
        localize()第1个参数以后,都为value中string的参数，调用方式为{x-2}
```



