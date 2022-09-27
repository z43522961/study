## iterator

> es6 新特性

### 遍历数组

```javascript
//通过for of/ for in 下标
for (var x of arr) {
    console.log(x)
}
 
```

### 遍历map

```javascript
var map = new Map([['tom',100],['jack',90],['xulong',150]]);
for (let x of map){
    console.log(x);
}

let map1 = new Map([
    ["张三", 18],
    ["李四", 17],
    ["王五", 20]
])
for (let [key, value] of map1) {
    console.log(key + ":" + value)
}
```

### 遍历set

```javascript
var set = new Set([3,52,55,6,78]);
for(let x of set){
    console.log(x);
}
```

## 