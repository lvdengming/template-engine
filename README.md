# 简单的模板引擎

## 1. 功能

1. 支持自定义匹配符
2. 支持if/else
3. 支持for循环
4. 支持自定义filter

## 2. 使用

```js
const TemplateEngine = require('./template');

const engine = new TemplateEngine({
    filters: {
        cubic(num) {
            return num ** 3;
        }
    },
    varControls: ['{#', '#}'],
    tagControls: ['{~', '~}']
});
const render = engine.compile(`
    <ul class="list">
        {~ for val in list ~}
            {~ if val.show ~}<li>{# val.num | cubic(1) #}</li>{~ endif ~}
        {~ endfor ~}
    </ul>
`);
const html = render({
    list: [{
        show: true,
        num: 2
    }, {
        show: true,
        num: 4
    }]
})

console.log(html);  // <ul class="list">  <li>8</li>  <li>64</li>  </ul>
```

1. 在src/index.js下编写测试案例
2. 通过`npm start`命令运行

## 3. 参考博客：

1. 编写一个简单的JavaScript模板引擎：https://juejin.cn/post/6844903633000087560
2. 最简单的JavaScript模板引擎：https://www.cnblogs.com/dolphinX/p/3489269.html
3. 只有 20 行 JavaScript 代码！手把手教你写一个页面模板引擎：https://juejin.cn/post/6844903423591055373
4. 正则表达式：https://www.cnblogs.com/dong-xu/p/6926064.html
