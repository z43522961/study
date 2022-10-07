/*
Promise的状态
待定（pending）：最终状态，既没有被兑现，也没有被拒绝。
兑现（ fulfilled）：意味着操作成功完成。
已拒绝（rejected）：表示操作失败。
 */
const PromiseStatus = {
    Pending: 'Pending',
    FulFilled: 'Fulfilled',
    Rejected: 'Rejected'
};

/**
 * @author zxl
 * @description 判断是否是Object
 * @param value
 * @returns {boolean}
 */
const isObject = (value) => {
    return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * @author zxl
 * @description 判断是否是Promise
 * @param obj
 * @returns {boolean}
 */
//Object.prototype.toString.call(obj) === 'object Promise'
const isPromise = (obj) => {
    return (isObject(obj) || typeof obj === 'function') && typeof obj.then === 'function'
}

/**
 * 
 * @param {*} p 表示上次的 promise 实例
 * @param {*} preValue 上次的值
 * @param {*} resolve then返回promise的 resolve
 * @param {*} reject then返回promise中的 reject 
 */
const depthResolvePromise = (p, preValue, resolve, reject) => {
    // 如果返回值 与实例是同一个的话直接报错
    if (p === preValue) {
        throw new TypeError("the same instance cannot be referenced cyclically ")
    }

    // 判断是否是对象， 如果不是对象的话直接执行resolve
    if (isObject(preValue) || typeof preValue === 'function') {
        const then = preValue.then;
        // 判断then属性是不是方法，如果是的话执行then方法，如果不是的话执行resolve
        if (typeof then === 'function') {
            try {
                then.call(preValue,
                    y => depthResolvePromise(p, y, resolve, reject),
                    r => depthResolvePromise(p, r, resolve, reject))
            } catch (e) {
                reject(e)
            }
        } else {
            resolve(preValue)
        }
    } else {
        resolve(preValue);
    }
}

function myPromise(execution) {
    // 成功状态的值
    this.value = "";
    // 失败的值
    this.reason = "";
    // Promise 的状态 默认Pending
    this.state = PromiseStatus.Pending;
    // 为了应对异步状况。保存onFulfilled/onRejected 方法
    this.fulfilledCallback = [];
    this.rejectedCallback = [];
    // 构造函数的resovle方法
    const resolveFn = value => {
        if (value instanceof myPromise) {
            return value.then(resolveFn, rejectFn)
        }
        if (this.state !== PromiseStatus.Pending) return;
        this.value = value;
        this.state = PromiseStatus.FulFilled;

        this.fulfilledCallback.forEach(fn => fn(this.value))
    }

    // 构造函数的reject 方法
    const rejectFn = reason => {
        if (this.state !== PromiseStatus.Pending) return;
        this.reason = reason;
        this.state = PromiseStatus.Rejected;

        this.rejectedCallback.forEach(fn => fn(this.reason))
    }

    try {
        execution(resolveFn, rejectFn);
    } catch (e) {
        rejectFn(e);
    }

}

/**
 * @author zxl
 * @description Promise then方法 本身是一个微任务
 * @param {*} onFulfilled 成功状态的回调
 * @param {*} onRejected 失败状态的回调
 * @returns 
 */
myPromise.prototype.then = function(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") onFulfilled = x => x;
    if (typeof onRejected !== "function")
        onRejected = err => {
            throw err;
        };

    // 状态resolve/ rejected 的时候
    if ([PromiseStatus.Fulfilled, PromiseStatus.Rejected].includes(this.state)) {
        // 返回的一个新的Promise实例
        const p = new myPromise((resolve, reject) => {
            queueMicrotask(() => {
                try {
                    const r =
                        this.state === PromiseStatus.Fulfilled ?
                        onFulfilled(this.value) :
                        onRejected(this.reason);
                    depthResolvePromise(p, r, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
        return p;
    }

    // 状态是pending 的场合
    const p = new myPromise((resolve, reject) => {
        this.fulfilledCallback.push(value => {
            queueMicrotask(() => {
                try {
                    const r = onFulfilled(value);
                    depthResolvePromise(p, r, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
        this.rejectedCallback.push(reason => {
            queueMicrotask(() => {
                try {
                    const r = onRejected(reason);
                    depthResolvePromise(p, r, resolve, reject);
                } catch (e) {
                    reject(e);
                }
            });
        });
    });
    return p;
};

myPromise.prototype.finally = function(fn) {
    try {
        fn();
        return this.then(null, null);
    } catch (e) {
        const callback = () => {
            throw e;
        };
        return this.then(callback, callback);
    }
};

myPromise.prototype.catch = function(fn) {
    return this.then(null, fn);
};

/**
 * @author zxl
 * @description promise中断方法
 * @param {*} userPromise 用户自己的promise
 * @returns 
 */
myPromise.abort = function(userPromise) {
    let abort;
    const innerPromise = new myPromise((_, reject) => {
        abort = reject;
    });

    const racePromise = myPromise.race([userPromise, innerPromise]);
    racePromise.abort = abort;
    return racePromise;
};

/**
 * @author zxl
 * @description 直接返回一个具有成功状态的myPromise
 * @param {*} params 传递参数
 * @returns myPromise
 */
myPromise.resolve = function(params) {
    return new myPromise(resolve => {
        resolve(params);
    });
};

/**
 * @author zxl
 * @description 直接返回一个具有失败状态的 promise
 * @param {*} params 传递参数
 * @returns myPromise
 */
myPromise.reject = function(params) {
    return new myPromise((_, reject) => {
        reject(params);
    });
};

/**
 * @author zxl
 * @description 返回一个promise的状态，无论是成功还是失败
 * @param {*} allPromise 表示所有的promise
 * @returns 
 */
myPromise.race = function(allPromise = []) {
    return new myPromise((resolve, reject) => {
        let i = 0;
        for (; i < allPromise.length; i += 1) {
            const item = allPromise[i];

            if (!isPromise(item)) {
                return resolve(item);
            } else {
                item.then(resolve, reject);
                return;
            }
        }
    });
};



/**
 * @author zxl
 * @description 出现第一个成功状态 或是 如果所有的 promise 状态都失败了，则返回失败的状态
 * @param {*} allPromise 表示所有的promise
 * @returns 
 */
myPromise.any = function(allPromise) {
    return new myPromise((resolve, reject) => {
        let count = 0;
        const rejectedCallback = () => {
            count += 1;
            if (count >= allPromise.length) {
                reject("[AggregateError: All promises were rejected]");
            }
        };

        let i = 0;
        for (; i < allPromise.length; i += 1) {
            const item = allPromise[i];
            if (!isPromise(item)) {
                return resolve(item);
            } else {
                item.then(
                    res => {
                        return resolve(res);
                    },
                    () => {
                        rejectedCallback();
                    }
                );
            }
        }
    });
};



/**
 * @author zxl
 * @description 批量执行promise数组 无论是成功还是失败都会返回 最后返回一个promise  返回结构是：{status: 'fulfilled/ rejected', value}
 * @param {*} allPromise 传递参数
 * @returns 
 */
myPromise.allSettled = function(allPromise = []) {
    return new myPromise(resolve => {
        let count = 0;
        const resultArr = [];

        const callback = (index, value, status) => {
            resultArr[index] = { status, value };
            count += 1;

            if (count >= allPromise.length) {
                resolve(resultArr);
            }
        };

        allPromise.forEach((item, index) => {
            if (!isPromise(item)) {
                callback(index, item, "fulfilled");
            } else {
                item.then(
                    res => {
                        callback(index, res, "fulfilled");
                    },
                    err => {
                        callback(index, err, "rejected");
                    }
                );
            }
        });
    });
};

/**
 * @author zxl
 * @description 多个promise 同时发出请求，如果全部成功结果 以数组的形式全部返回
 * @param {*} promiseAll promise 数组
 * @returns Promise
 */
myPromise.all = function(promiseAll = []) {
    return new myPromise((resolve, reject) => {
        const resultArr = [];
        let count = 0;
        const callback = (index, res) => {
            count += 1;
            resultArr[index] = res;
            if (count >= promiseAll.length) {
                resolve(resultArr);
            }
        };

        for (let i = 0; i < promiseAll.length; i += 1) {
            const p = promiseAll[i];
            if (!isPromise(p)) {
                callback(i, p);
            } else {
                p.then(res => {
                    callback(i, res);
                }, reject);
            }
        }
    });
};