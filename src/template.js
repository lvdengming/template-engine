/**
 * @file 简单的模板引擎
 * @author lvdengming
 */

const constant = require('./constant');

class TemplateEngine {
    constructor(config = {}) {
        this.tagControls = config.tagControls ? config.tagControls : ['{%', '%}'];
        this.varControls = config.varControls ? config.varControls : ['{%', '%}'];
        this.filters = config.filters ? config.filters : {};

        this.tagVarRegExp = this.getTagVarRegExp(this.tagControls, this.varControls);
    }

    /**
     * 获取匹配流程、变量的正则
     * @param {Array} tagControls 流程匹配符号
     * @param {Array} varControls 变量匹配符号
     * @returns RegExp
     */
    getTagVarRegExp(tagControls, varControls) {
        // 获取 /{%=?\s*([^%}]+?)\s*%}/g 形式正则（tagControls=['{%', '%}']）
        const tagPattern = tagControls.join('\\s*([^' + tagControls[1] + ']+?)\\s*');
        // 获取 /{{\s*([^}}\|]+?\s*\|\s*[^}}\|]+?)\s*}}/g 形式正则（varControls=['{%', '%}']）
        const varPattern = varControls.join('\\s*([^' + varControls[1] +
            '\\|]+?\\s*\\|\\s*[^' + varControls[1]+ '\\|]+?)\\s*');
        const pattern = tagPattern + '|' + varPattern;
        const regexp = new RegExp(pattern, 'g');
        return regexp;
    }

    /**
     * 获取编译模板后通过数据可获取html字符串的函数
     * @param {string} template 待编译的模板
     * @returns Function
     */
    compile(template) {
        let functionBody = 'let code = [];\n';

        // 记录模板匹配位置的游标
        let cursor = 0;
        // 每次匹配的中间结果
        let match;
        const tagVarRegExp = this.tagVarRegExp;

        while (match = tagVarRegExp.exec(template)) {
            // 非流程&变量片段
            let fragment = template.slice(cursor, match.index);
            // 转义 "'"
            fragment = fragment.replace(/'/g, "\\'");
            functionBody += 'code.push(\'' + fragment + '\');\n';

            // 流程片段
            if (match[1]) {
                functionBody += match[1]
                    .replace(constant.IF_REGEXP, constant.IF_REPLACE)
                    .replace(constant.ENDIF_REGEXP, constant.END_REPLACE)
                    .replace(constant.FOR_KV_REGEXP, constant.FOR_KV_REPLACE)
                    .replace(constant.ENDFOR_REGEXP, constant.END_REPLACE)
                    .replace(constant.FOR_V_REGEXP, constant.FOR_V_REPLACE);
            }
            // 变量片段
            else if (match[2]) {
                functionBody += (/\|/.test(match[2])) ?
                    'code.push(' + match[2].replace(constant.FILTER_REGEXP, constant.FILTER_REPLACE) + ');\n'
                    : 'code.push(' + match[2] + ');\n';
            }

            // 游标下移
            cursor = match.index + match[0].length;
        }

        // 剩余代码片段处理
        let fragment = template.slice(cursor);
        fragment = fragment.replace(/'/g, "\\'");
        functionBody += 'code.push(\'' + fragment + '\');\n';
        functionBody += 'return code.join(\'\');';

        // 去除回车、制表、换行，多余的空白
        functionBody = functionBody
            .replace(/[\r\t\n]/g, '')
            .replace(/\s+/g, ' ');

        // 创建函数，设置参数并传值（参数顺序：数据，过滤器）
        return data => new Function(...Object.keys(data), ...Object.keys(this.filters), functionBody)
            .call(null, ...Object.values(data), ...Object.values(this.filters));
    }
}

module.exports = TemplateEngine;
