# 变量的解构赋值

## 1. 数组的解构赋值

### 基本用法

ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，着被称为解构，如下：

```javascript
let [a, b, c] = [1, 2, 3]
console.log(a)
console.log(b)
console.log(c)
```

上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

```javascript
let [foo, [
    [bar], baz
]] = [1, [
    [2], 3
]]

foo //1 
bar //2
baz //3

let [, , third] = ["foo", "bar", "baz"]
third // baz

let [x, ,y] = [1, 2, 3]
x //1
y //3

let [head, ...tail] = [1, 2, 3, 4];
head //1
tail //[2, 3, 4]

let [x, y, ...z] = ['a'];
x // "a"
y // undefined
z // []
```

如果解构不成功，变量的值就等于undefined。

```javascript
// 不成功解构
let [foo] = [];
let [bar, foo] = [1];

```

以上两种情况都属于解构不成功，foo的值都会等于undefined

```javascript
// 不完全解构
let [x, y] = [1, 2, 3]
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4]
a // 1
b // 2
d // 4
```



另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号左边的数组，这种情况下解构依然可以成功。

```javascript
// 不完全解构
let [x, y] = [1, 2, 3]
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4]
a // 1
b // 2
d // 4
```



如果等号右边不是数组（不可遍历的解构）那么将会报错

```javascript
// 报错
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

上面的语句都会报错，因为等号右边的值，要么转为对象以后不具备 Iterator 接口（前五个表达式），要么本身就不具备 Iterator 接口（最后一个表达式）。

对于 Set 结构，也可以使用数组的解构赋值。

```javascript
let [x, y, z] = new Set(['a', 'b', 'c']);
x // "a"
```

事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。

```javascript
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5
```

上面代码中，`fibs`是一个 **Generator 函数**（参见《Generator 函数》一章），原生具有 Iterator 接口。解构赋值会依次从这个接口获取值。     

## 2. 对象的解构赋值

### 简介

解构不仅可以用于数组，还可以用于对象。

```javascript
let { foo, bar } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"
```

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```javascript
let { bar, foo } = { foo: 'aaa', bar: 'bbb' };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: 'aaa', bar: 'bbb' };
baz // undefined
```

上面代码的第一个例子，等号左边的两个变量的次序，与等号右边两个同名属性的次序不一致，但是对取值完全没有影响。第二个例子的变量没有对应的同名属性，导致取不到值，最后等于`undefined`。

如果解构失败，变量的值等于`undefined`。

```javascript
let {foo} = {bar: 'baz'};
foo // undefined
```

上面代码中，等号右边的对象没有`foo`属性，所以变量`foo`取不到值，所以等于`undefined`。

对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```javascript
// 例一
let { log, sin, cos } = Math;

// 例二
const { log } = console;
log('hello') // hello
```

上面代码的例一将`Math`对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。例二将`console.log`赋值到`log`变量。

如果变量名与属性名不一致，必须写成下面这样。

```javascript
let { foo: baz } = { foo: 'aaaa', bar: 'bbb' }
console.log(baz) // "aaaa"

let obj = { first: 'hello', last: 'world' }
let { first: f, last: l } = obj
console.log(f) // hello
console.log(l) // world
```

这实际上说明，对象的解构赋值是下面形式的简写

```javascript
let { foo: foo, bar: bar } = { foo: 'aaa', bar: 'bbb' };
```

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```javascript
let { foo: baz } = { foo: 'aaa', bar: 'bbb' };
baz // "aaa"
foo // error: foo is not defined
```

上面代码中，`foo`是匹配的模式，`baz`才是变量。真正被赋值的是变量`baz`，而不是模式`foo`。

与数组一样，解构也可以用于嵌套结构的对象。

```javascript
let obj = {
    p: [
        'Hello',
        { y: 'World' }
    ]
};

let { p: [x, { y }] } = obj;
console.log(x) // hello
console.log(y) // world
```

此时p是模式，不是变量因此不会被赋值，如果p也要作为变量赋值，可以写成下面这样

```javascript
let obj = {
    p: [
        'Hello',
        { y: 'World' }
    ]
};

let { p, p: [x, { y }] } = obj;
console.log(x) // hello
console.log(y) // world
console.log(p) // [ 'Hello', { y: 'World' } ]
```

下面是另一个例子

```javascript
const node = {
    loc: {
        start: {
            line: 1,
            column: 5
        }
    }
}
let { loc, loc: { start }, loc: { start: { line, column } } } = node;
console.log(loc);
console.log(start)
console.log(line)
console.log(column)
```

上面代码有三次解构赋值，分别是对`loc`、`start`、`line`三个属性的解构赋值。注意，最后一次对`line`属性的解构赋值之中，只有`line`是变量，`loc`和`start`都是模式，不是变量。

下面是嵌套赋值的例子。







# ES6模板字符串

## 基础用法

```javascript
let message = `Hello world`;
console.log(message);
```

如果需要在字符串中使用反撇号，可以使用转移字符   \ `

```javascript
let message = `Hello \`world`;
console.log(message);
```

 在模板字符串中，空格、缩进、换行都会被保留；

```javascript
let message = `
    <ul>
        <li>1</li>
        <li>2</li>
    </ul>
`
console.log(message)
```

![image-20220818145456398](G:\project\前端学习\笔记\ECMAScript6.assets\image-20220818145456398.png)

注意：第一行结果是一个换行，可以使用trim()函数消除换行

```javascript
let message = `
    <ul>
        <li>1</li>
        <li>2</li>
    </ul>
`.trim()
console.log(message)
```



## 嵌入变量

模板字符串支持嵌入变量，只需要将变量名写在 ${} 之中，其实不止变量，任意的 JavaScript 表达式都是可以的：



```javascript
let x = 1, y = 2;
let message = `<ul><li>${x}</li><li>${x + y}</li></ul>`;
console.log(message); // <ul><li>1</li><li>3</li></ul>
```

模板字符串支持嵌套:

```javascript
let arr = [{value: 1}, {value: 2}];
let message = `
	<ul>
		${arr.map((item) => {
			return `
				<li>${item.value}</li>
			`
		})}
	</ul>
`;
console.log(message);
```



## 标签模板

模板字符串可以紧跟在一个函数名后面，该函数将被调用来处理这个模板字符串，举个例子

```javascript
function message(literals, ...values) {
    let result = literals.reduce((prev, next, i) => {
        console.log("prev:" + prev);
        console.log("next:" + next)
        console.log("i:" + i)

        let value = values[i - 1];
        return prev + value + next;

    })
    return result
}

var res = message `${x}, I am ${y}`;
console.log(res)
```



# 箭头函数

## 与普通函数比较

主要区别包括：

### 1.没有 this

**箭头函数没有 this，所以需要通过查找作用域链来确定 this 的值。**

这就意味着如果箭头函数被非箭头函数包含，this 绑定的就是最近一层非箭头函数的 this。

模拟一个实际开发中的例子：

我们的需求是点击一个按钮，改变该按钮的背景色。

为了方便开发，我们抽离一个 Button 组件，当需要使用的时候，直接：

```html
<button id="btn">按钮</button>
<script>
    function Button(id) {
        this.element = document.querySelector("#" + id);
        this.bindEvent();
    }
    Button.prototype.bindEvent = function() {
        console.log(this.element)
        this.element.addEventListener("click", this.setBgColor, false);
    }
    Button.prototype.setBgColor = function() {
        this.style.backgroundColor = '#1abc9c'
    }
    var button = new Button("btn")
</script>
```



```html
<button id="btn">按钮</button>
<script>
    function Button(id) {
        this.element = document.querySelector("#" + id);
        this.bindEvent();
    }
    Button.prototype.bindEvent = function() {
        this.element.addEventListener("click", () => {
            this.element.style.backgroundColor = '#1abc9c'
        }, false);
    }
    Button.prototype.setBgColor = function() {

    }
    var button = new Button("btn")
</script>
```



### 2. 没有 arguments

箭头函数没有自己的 arguments 对象，这不一定是件坏事，因为箭头函数可以访问外围函数的 arguments 对象：

```javascript
var fun = () => {
    console.log(arguments)
}
console.log(fun(1, 2));
```



```javascript
function constant() {
    return () => arguments[0]
}

var result = constant(1);
console.log(result()); // 1
```



### 3. 不能通过 new 关键字调用

JavaScript 函数有两个内部方法：[[Call]] 和 [[Construct]]。

当通过 new 调用函数时，执行 [[Construct]] 方法，创建一个实例对象，然后再执行函数体，将 this 绑定到实例上。

当直接调用的时候，执行 [[Call]] 方法，直接执行函数体。

箭头函数并没有 [[Construct]] 方法，不能被用作构造函数，如果通过 new 的方式调用，会报错。

### 4. 没有 new.target

`new`是从构造函数生成实例对象的命令。ES6 为`new`命令引入了一个`new.target`属性，该属性一般用在构造函数之中，返回`new`命令作用于的那个构造函数。如果构造函数不是通过`new`命令或`Reflect.construct()`调用的，`new.target`会返回`undefined`，因此这个属性可以用来确定构造函数是怎么调用的。



### 5. 没有原型

由于不能使用 new 调用箭头函数，所以也没有构建原型的需求，于是箭头函数也不存在 prototype 这个属性。



### 6. 没有 super





# 迭代器与for of

## 迭代器

所谓迭代器，其实就是一个具有 next() 方法的对象，每次调用 next() 都会返回一个结果对象，该结果对象有两个属性，value 表示当前的值，done 表示遍历是否结束。

```javascript
function createIterator(items) {
    var i = 0;
    return {
        next: function() {
            var done = i >= item.length;
            var value = !done ? items[i++] : undefined;

            return {
                done: done,
                value: value
            };
        }
    };
}

// iterator 就是一个迭代器对象
var iterator = createIterator([1, 2, 3]);

console.log(iterator.next()); // { done: false, value: 1 }
console.log(iterator.next()); // { done: false, value: 2 }
console.log(iterator.next()); // { done: false, value: 3 }
console.log(iterator.next()); // { done: true, value: undefined }
```

## for of

除了迭代器之外，我们还需要一个可以遍历迭代器对象的方式，ES6 提供了 for of 语句，我们直接用 for of 遍历一下我们上节生成的遍历器对象试试：



```javascript
var iterator = createIterator([1, 2, 3]);

for (let value of iterator) {
    console.log(value);
}
```

结果报错 `TypeError: iterator is not iterable`，表明我们生成的 iterator 对象并不是 iterable(可遍历的)。

那什么才是可遍历的呢？

其实一种数据结构只要部署了 Iterator 接口，我们就称这种数据结构是“可遍历的”（iterable）。

ES6 规定，默认的 Iterator 接口部署在数据结构的 Symbol.iterator 属性，或者说，一个数据结构只要具有 Symbol.iterator 属性，就可以认为是"可遍历的"（iterable）。

举个例子：

```javascript
const obj = {
    value: 1
};

for (value of obj) {
    console.log(value);
}

// TypeError: iterator is not iterable
```



我们直接for of遍历一个对象，会报错，然而如果我们给该对象添加Symbol.iterator属性

```javascript
const obj = {
    value:1
}
obj[Symbol.iterator] = function() {
    return createIterator([1 ,2 ,3]);
}

for(value of obj) {
    console.log(value);
}
// 1
// 2
// 3
```



## 默认可遍历对象

**数组对象：**

```javascript
const colors = ["red", "green", "blue"];

for (let color of colors) {
    console.log(color);
}

// red
// green
// blue
```



尽管我们没有手动添加 Symbol.iterator 属性，还是可以遍历成功，这是因为 ES6 默认部署了 Symbol.iterator 属性，当然我们也可以手动修改这个属性：

手动修改Symbol.iterator属性：

```javascript
var colors = ["red", "green", "blue"]
colors[Symbol.iterator] = function() {
    return createIterator([1, 2, 3]);
}
for (let color of colors) {
    console.log(color);
}

//1 // 2 // 3
```

默认部署了Symbol.iterator，还有：

1. 数组
2. Set
3. Map
4. 类数组对象，如：arguments对象，DOM NodeList 对象
5. Generator对象
6. 字符串





## for in





# Set数据结构

## 初始化

Set 本身就是一个构造函数，用来生成Set数据结构

```javascript
let set = new Set()
```

Set 函数可以接收一个数组（或者）

```javascript
let set = new Set([1, 2, 3, 4, 4])
console.log(set); // Set(4) {1, 2, ,3 ,4}

set = new Set(document.querySelectorAll('div'));
console.log(set.size); // 66

set = new Set(new Set([1, 2, 3 ,4]));
console.log(set.size); // 4
```





## 属性和方法

操作方法有：

1. add(value)：添加某个值，返回Set结构本身
2. delete(value)：删除某个值，返回一个布尔值表示删除是否成功
3. has(value) 返回一个布尔值，表示该值是否为Set的成员
4. clear()：清除所有成员，无返回值

遍历方法有：

1. keys()：返回键名的迭代器
2. values()：返回值的迭代器
3. entries()：返回键值对的迭代器
4. forEach()：使用回调函数遍历每个成员，无返回值







# Promise

## 1. Promise的含义

​		Promise是异步编程的一种解决方案，比传统的解决方案——回调函数和时间——更合理和更强大。它由社区最早提出和实现，ES6将其写进了语言标准，统一了用法，原生提供了Promise对象。

​		所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise是一个对象，从它可以获取异步到左的消息。Promise提供统一的API，各种异步操作都可以用同样的方法进行处理。

**Promise对象的两个特点：**

1. 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending进行中、fulfilled 已成功、rejected 已失败。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。着也是Promise名字的由来，它的英语意思就是”承诺“，表示其他手段无法改变
2. 一旦状态改变，就不会再变，任何时候都可以得到这个结果。`Promise`对象的状态改变，只有两种可能：从`pending`变为`fulfilled`和从`pending`变为`rejected`。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对`Promise`对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。

有了`Promise`对象，就可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易。

`Promise`也有一些缺点。首先，无法取消`Promise`，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部。第三，当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

如果某些事件不断地反复发生，一般来说，使用 [Stream](https://nodejs.org/api/stream.html) 模式是比部署`Promise`更好的选择。

## 2. 基本用法

ES6规定，Promise对象是一个构造函数，用来生成Promise实例

下面代码创造了一个Promise实例

```javascript
const promise = new Promise(funtion(resolve, reject) {
    // ... some code
                            
    if(/* 异步操作成功 */) {
        resolve(value);
    } else {
        reject(error)
    }
})
```

`Promise`构造函数接受一个函数作为参数，该函数的两个参数分别是`resolve`和`reject`。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。

`resolve`函数的作用是，将`Promise`对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；`reject`函数的作用是，将`Promise`对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。

`Promise`实例生成以后，可以用`then`方法分别指定`resolved`状态和`rejected`状态的回调函数。

```javascript
promise.then(function(value) {
  // success
}, function(error) {
  // failure
});
```

`then`方法可以接受两个回调函数作为参数。第一个回调函数是Promise对象的状态变为resolved时调用，第二个回调函数是Promise对象状态变为rejected时调用。这两个函数都是可选的一定要提供。它们都接受Promise对象的状态为resolved时调用，第二个回调函数是Promise对象的状态变为rejected时调用。这两个哈桑农户都是可选的，不一定要提供，它们都会接受promise对象传出的值作为参数。

实例：

```javascript
function timeout(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms, 'done');
  });
}

timeout(100).then((value) => {
  console.log(value);
});
```

上面代码中.timeout方法返回一个promise实例，表示一段事件以后回发生的结果。过了指定的事件ms以后，promise实例状态会



Promise支持链式调用可以解决回调地狱问题：

![image-20220822085025640](G:\project\前端学习\笔记\ECMAScript6.assets\image-20220822085025640.png)

指定回调函数更加灵活

PromiseResult属性，保存异步操作的结果

executor 会在Promise内部立即同步调用，异步操作会在执行器中执行

Promise.prototype.then()



Promise.prototype.catch(reson => {

​	只调用失败的回调

})



Promise.resolve();

如果传入的参数位非Promise类型的对象，则返回结果为成功的Promise对象

如果传入的参数为Promise对象，则参数的结果决定了resolve的结果

Promise.reject方法(reason)=>{}

reason 失败的原因

不管传入什么值结果都是失败的Promise对象



Promise.all方法(promises) =>{}

如果promises数组中，每个promise都成功才成功，只要有一个失败就直接失败，

Promise.race方法(promises)=>{}

数组中，谁先改变状态结果就是谁



[`Promise.all(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

这个方法返回一个新的 promise 对象，等到所有的 promise 对象都成功或有任意一个 promise 失败。

如果所有的 promise 都成功了，它会把一个包含 iterable 里所有 promise 返回值的数组作为成功回调的返回值。顺序跟 iterable 的顺序保持一致。

一旦有任意一个 iterable 里面的 promise 对象失败则立即以该 promise 对象失败的理由来拒绝这个新的 promise。

[`Promise.allSettled(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

等到所有 promise 都已敲定（每个 promise 都已兑现或已拒绝）。

返回一个 promise，该 promise 在所有 promise 都敲定后完成，并兑现一个对象数组，其中的对象对应每个 promise 的结果。

[`Promise.any(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

接收一个 promise 对象的集合，当其中的任意一个 promise 成功，就返回那个成功的 promise 的值。

[`Promise.race(iterable)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

等到任意一个 promise 的状态变为已敲定。

当 iterable 参数里的任意一个子 promise 成功或失败后，父 promise 马上也会用子 promise 的成功返回值或失败详情作为参数调用父 promise 绑定的相应处理函数，并返回该 promise 对象。

[`Promise.reject(reason)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)

返回一个状态为已拒绝的 `Promise` 对象，并将给定的失败信息传递给对应的处理函数。

[`Promise.resolve(value)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)

返回一个状态由给定 value 决定的 `Promise` 对象。如果该值是 thenable（即，带有 `then` 方法的对象），返回的Promise 对象的最终状态由 then 方法执行结果决定；否则，返回的 Promise 对象状态为已兑现，并且将该 value 传递给对应的 then 方法。

通常而言，如果你不知道一个值是否是 promise 对象，使用 [`Promise.resolve(value)`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) 来返回一个 Promise 对象，这样就能将该 value 以 promise 对象形式使用。













































## 扩展运算符





















































































































































































































