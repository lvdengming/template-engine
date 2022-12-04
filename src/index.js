/**
 * @file 入口
 * @author lvdengming
 */

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

console.log(html);
