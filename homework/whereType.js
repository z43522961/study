/**
 * @author zxl
 * @description
 * @param {*} type 传递的数据类型
 * @param {*} value 需要判断的数据
 * @returns boolean
 */
function isType(type) {
    return function(value) {
        const judgeTylpe = `[object ${type}]`
        const resultType = Object.prototype.toString.call(value)
        return judgeTylpe === resultType
    }
}

const isNumber = isType('Number');
const isBoolean = isType('Boolean');
const isString = isType('String');
const isNull = isType('Null');
const isObject = isType('Object');
const isArray = isType('Array');
const isUndefined = isType('Undefined');
const isFunction = isType('Function');
const isDate = isType('Date');
const isSet = isType('Set');
const isMap = isType('Map');