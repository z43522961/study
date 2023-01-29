/**
 * @author 赵旭龙
 * @description 获取某个数据的数据类型
 * @param {*} value 需要获取类型的数据(任意类型的数据)
 * @returns 传递参数的数据类型(string)
 */
function getType(value) {
    // Object.prototype.toString()会返回[object, [[class]]]的字符串,其中[[class]]会返回es定义的对象类型
    // call(thisArg, arg1, arg2, ...) 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。
    return /([A-Za-z]+)]/.exec(Object.prototype.toString.call(value))[1].toLowerCase()
}


/** 
 * @author 赵旭龙
 * @description 获取多个数据的数据类型保存到数组中
 * @param  {...any} args 任意类型的数据, 数据之间用逗号分隔（例: 1, "123", ()=>{}）
 * @returns 数组(所有参数的数据类型)
 */
function getTypes(...args) {
    let res = [];
    for (let x of args) {
        res[res.length] = getType(x)
    }
    return res;
}