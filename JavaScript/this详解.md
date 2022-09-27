## this详解

> 什么是this？

1. this是指事物本身，可以理解是一种简写
2. this可以指代当前运行环境。例如：window/函数执行上下文等
3. 谁调用this就会指向谁

```javascript
var value = 1;
var foo = {
    value: 2,
    bar: function() {
        return this.value
    }
}

console.log(foo.bar()) // 2
console.log((foo.bar)()) // 2
console.log((foo.bar = foo.bar)()) // 1
console.log((false || foo.bar)()) // 1
console.log((foo.bar, foo.bar)()) // 1
```



> 函数下的this

- 谁调用函数，那么this就执行谁 
- 箭头函数除外，箭头函数的this指向定义当前调用者的上下文
- 如果是多层调用的话 this 指向最右侧调用者本身

```javascript
var name = 'zhangsan'

const user = {
    name: 'lisi',
    getName: function() {
        return this.name
    },
    getName1: () => {
        return this.name
    }
}

console.log(user.getName()) // lisi
console.log(user.getName1()) // zhangsan
```



```javascript
const user = {
    name: 'zhangsan',
    user: {
        name: 'lisi',
        user: {
            name: 'wangwu',
            getName: function() {
                return this.name
            }
        }
    }
}
console.log(user.user.user.getName()) // wangwu
```

>全局下的this

1. 在无显示的调用情况下，this指向全局(window)
2. 严格模式下this会是undefined
3. 任意函数调用时，可以理解为window.XXX

```javascript
var name = "zhangsan"

const obj = {
    name: 'lisi',
    getName: function() {
        console.log(this.name)
    }
}

const getName = obj.getName
getName() // zhangsan
```

> DOM事件下this

如果是通过点击事件触发的话，this指向DOM对象

```html
<button id="btn">点击</button>
<script>
    let btn = document.getElementById('btn')
    btn.onclick = function() {
        console.log(this)
    }
</script>
```

> 实例对象中的this

1. 通过关键字new生成一个实例对象后，如果构造函数的返回值是非引用对象类型，那么this指向实例本身
2. 通过关键字new生成一个实例对象后，如果构造函数返回的是一个引用对象，那么此时的this就是返回的引用对象

```javascript
function User() {
    this.name = "lisi"
}

const u = new User()
console.log(u.name) // lisi
```



返回引用对象

```javascript
function Person() {
    this.name = 'yao'
    return {
        name: 'xi'
    }
}
const p = new Person()
console.log(p.name) // xi
```

> class中的this

1. 通过class生成一个实例对象后，此时的this就是实例本身

```javascript
class Person {
    constructor() {
        this.name = 'lisi'
    }
}
const p = new Person()
console.log(p.name)
```

> 如何绑定this

- **call**

  使用call关键字进行函数调用，第一个参数是要改变的this，之后参数必须——进行传递

  关键字call调用函数后，函数会立即执行

  ```javascript
  function getName(a, b) {
      return [this.name, a, b]
  }
  const user = {
      name: 'zhang'
  }
  console.log(getName.call(user, 1, 3)) //[ 'zhang', 1, 3 ]
  ```

  

- **apply**

  使用关键字apply进行函数调用，第一个参数是要改变的this，之后的参数是数组的形式赋值给第二个参数

  关键字apply调用函数后，函数会立即执行

``` javascript
function getName(a, b) {
    return [this.name, a, b]
}
const user = {
    name: 'zhang'
}

console.log(getName.apply(user, [10, 8])) // [ 'zhang', 10, 8 ]
```



- **bind**

使用关键字bind进行函数调用，第一个参数是将要改变的this，之后参数进行——赋值

关键字bind调用函数后，会生成一个新的函数，调用此函数才会执行。而且此时也是可以传递函数

```javascript
function getName(a, b) {
    return [this.name, a, b]
}
const user = {
    name: 'zhang'
}

const fn = getName.bind(user, 1)
console.log(fn(10)) // [ 'zhang', 1, 10 ]
```

