# VisLeader
village sale user by leader

2015-09-09

项目构建与cuttingedge模板工具之上参考:
https://github.com/gengen1988/cuttingedge


前置条件
----
git http://git-scm.com/
Node.js http://nodejs.org/
grunt-cli (npm install -g grunt-cli)
sencha cmd 


使用方法
----
开发者需要 clone 这个项目，在这个模板的基础上进行开发。

在 `src` 目录中编写自己的应用，编写方法与 Sencha Touch 的 app 文件夹是一样的。

在 `src` 中的代码可以使用 CoffeeScript 编写，同时也可以用 Javascript 编写，以扩展名 `.coffee` 区分。

在 `src` 中可以使用模板简化命名空间的编写。

模板语法
====
### 定义类
```
{{#class [parent class]}}
{{/class}}
```

这个模板会自动匹配当然的文件名与路径生成 Sencha Touch MVC 的类。使用时无需编写类名，自动从文件名获取。

例子
```
{{#class 'Ext.app.Controller'}}

  config:
    routes:
      '': 'entry'
      
  entry: ->
    console.log 'helloworld'
    
{{/class}}
```

### 命名空间补全
```
{{app 'className'}}
{{controller 'className'}}
{{view 'className'}}
{{store 'className'}}
{{model 'className'}}
...

这个模板会根据配置自动补齐命名空间，使得更改应用名变得更简单。

例子
```
{{#class (view 'Main')}}
  config:
    items: [{
      xtype: 'button'
      text: 'push me'
    }]
    
  initialize: ->
    @callParent arguments
    view = Ext.create '{{view "Test"}}'
    Ext.Viewport.add view
{{/class}}
```

控制台命令
====

### 构建应用
```
grunt build
```

### 编译模板
```
grunt template
```

### 实机调试
```
grunt test
```
###  浏览器调试
```
grunt 
```