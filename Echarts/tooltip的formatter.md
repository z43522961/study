# tooltip的formatter

## 方法一：字符串模板

模板变量有 `{a}`, `{b}`，`{c}`，`{d}`，`{e}`，分别表示系列名，数据名，数据值等。 在 [trigger](https://echarts.apache.org/zh/option.html#tooltip.trigger) 为 `'axis'` 的时候，会有多个系列的数据，此时可以通过 `{a0}`, `{a1}`, `{a2}` 这种后面加索引的方式表示系列的索引。 不同图表类型下的 `{a}`，`{b}`，`{c}`，`{d}` 含义不一样。 其中变量`{a}`, `{b}`, `{c}`, `{d}`在不同图表类型下代表数据含义为：

- 折线（区域）图、柱状（条形）图、K线图 : `{a}`（系列名称），`{b}`（类目值），`{c}`（数值）, `{d}`（无）
- 散点图（气泡）图 : `{a}`（系列名称），`{b}`（数据名称），`{c}`（数值数组）, `{d}`（无）
- 地图 : `{a}`（系列名称），`{b}`（区域名称），`{c}`（合并数值）, `{d}`（无）
- 饼图、仪表盘、漏斗图: `{a}`（系列名称），`{b}`（数据项名称），`{c}`（数值）, `{d}`（百分比）

**示例：**

```ts
formatter: '{b0}: {c0}<br />{b1}: {c1}'
```



## 方法二：回调函数

回调函数格式：

```
(params: Object|Array, ticket: string, callback: (ticket: string, html: string)) => string | HTMLElement | HTMLElement[]
```

params 是 formatter需要的数据集。如下：

```
{
    "componentType": "series",
    "componentSubType": "line",
    "componentIndex": 0,
    "seriesType": "line",
    "seriesIndex": 0,
    "seriesId": "\u0000高危险攻击\u00000",
    "seriesName": "高危险攻击",
    "name": "12:00",
    "dataIndex": 2,
    "data": 5,
    "value": 5,
    "color": "#18CEF4",
    "dimensionNames": [
        "x",
        "y"
    ],
    "encode": {
        "x": [
            0
        ],
        "y": [
            1
        ]
    },
    "$vars": [
        "seriesName",
        "name",
        "value"
    ],
    "axisDim": "x",
    "axisIndex": 0,
    "axisType": "xAxis.category",
    "axisId": "\u0000时间\u00000",
    "axisValue": "12:00",
    "axisValueLabel": "12:00",
    "marker": "<span style=\"display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#18CEF4;\"></span>"
}
```

使用如下：

```javascript
formatter: function(params) {
    console.log(params)
    let dataStr = `<div><p style="margin:0">${params[0].name}</p></div>`
    params.forEach(item => {
        dataStr += `<div>
                        <span style="display:inline-block;margin-right:5px;width:10px;height:10px;background-color:${item.color};border-radius: 3px;"></span>
                        <span>${item.seriesName}:</span>
                        <span style="color:${item.color};font-weight:900">${item.data}</span>
                        </div>`
    })
    return dataStr
}
```

