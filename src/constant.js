/**
 * @file 常量
 * @author lvdengming
 */

// 匹配 'if xxx' 形式正则
const IF_REGEXP = /if\s+([\w\$\[\]\.]+)/;

// 'if xxx' 形式替换项
const IF_REPLACE = 'if ($1) {\n';

// 匹配 'endif' 形式正则
const ENDIF_REGEXP = /endif/;

// 'endif'、'endfor' 形式替换项
const END_REPLACE = '}\n';

// 匹配 'for key, val in list’ 形式正则
const FOR_KV_REGEXP = /for\s+(\w+),\s+(\w+)\s+in\s+([\w\$\[\]\.]+)/;

// 'for key, val in list’ 形式替换项
const FOR_KV_REPLACE = 'for (const [$1, $2] of Object.entries($3)) {\n';

// 匹配 'for val in list' 形式正则
const FOR_V_REGEXP = /for\s+(\w+)\s+in\s+([\w\$\[\]\.]+)/;

// 'for val in list’ 形式替换项
const FOR_V_REPLACE = 'for (const $1 of Object.values($2)) {\n';

// 匹配 'endfor' 形式正则
const ENDFOR_REGEXP = /endfor/;

// 匹配 'var | filter(param)' 形式正则
const FILTER_REGEXP = /([^\|]+?)\s*\|\s*([^\|]+?)\((\d*)\)/;

// 'var | filter(param)' 形式替换项，默认
const FILTER_REPLACE = '$2($1, $3)';


module.exports = {
    IF_REGEXP,
    IF_REPLACE,
    ENDIF_REGEXP,
    END_REPLACE,
    FOR_KV_REGEXP,
    FOR_KV_REPLACE,
    FOR_V_REGEXP,
    FOR_V_REPLACE,
    ENDFOR_REGEXP,
    FILTER_REGEXP,
    FILTER_REPLACE
};
