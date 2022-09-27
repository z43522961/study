# 块级元素

级元素占据其父元素（容器）的整个水平空间，垂直空间等于其内容高度

标签：p、h1-h6、hr、ul、ul、ol、li、dl、dd、dt、form

**特点：**

- 支持宽高，自上而下排列
- 不受空格影响
- 块级元素可以容纳行内元素和其他块级元素
- 默认宽高为100%



# 行内元素

一个行内元素只占据它对应标签的边框所包含的空间。

标签：span、i、a、b、strong、em、sub、sup、u、label、br、font

**特点：**

- 不支持宽高（宽高根据内容大小自动撑开；可以通过line-height来设置），自左向右排列
- 受空格影响
- 和其他元素都在同一行
- 行内元素只能容纳文本或其他行内元素
- 不支持上下的margin与上下的padding。只支持左右的margin和padding



**块级元素与行内元素的区别：**

格式：

​	默认情况下，块级元素会新起一行。

内容模型：

​	一般块级元素可以包含行内元素和其他块级元素。这种结构上的包含继承区别可以使块级元素创建比行内元素更大型的结构



# 行内块元素

标签：img、textarea、input

**特点：**

- 支持宽高，自左向右排列

- 受空格影响

- 不独占一行

- 不给宽高的话，宽度由内容撑开

  



**标签元素之间的转换：**

display: inline、inline-block、block

浮动：当元素浮动时会转换成行内块元素的特点



# 行内格式化上下文

创建方式：

IFC的创建方式是被动的、隐式的、是由所包含的子元素来创建：只有一个区域内仅包含可水平排列的元素时才会生成，这些子元素可以是文本、inline-level元素或inline-block-level元素。

特性：

- IFC内部的元素，按照左到右，从上到下的顺序排布
- IFC的高度，由里面最高盒子的高度决定
- IFC内部的每个元素，都可以通过设置vertical-align属性来调整垂直方向上的对齐；
- 包含这些内部元素的矩形区域，形成的每一行，被称为 line box（行框）
- margin、border、padding的设置，在行的方向上是生效的。

可能遇到的问题：

- 当IFC中有块级元素插入时，会产生两个匿名块将父元素分隔开来，产生两个IFC
- 当一个行内元素超过父元素的宽度时，它会被分割成多个盒子，这些盒子分布在多个行框中。如果子元素未设置强制换行的情况下，行框将不可被分割，将会溢出父元素
- 



行内格式化上下文是一个网页的渲染结果的一部分。其中，各行内框顺序排列，其排列顺序根据书写模式来决定：

- 水平书写模式：自左到右
- 垂直书写模式：自上到下

margin、border、padding的设置，在行的方向上是生效的。

**行盒（line box）**

包含来自同一行的盒的矩形区域叫做行盒

line box 的宽度由 **包含块** 和 **float** 情况决定，一般来说， **line box** 的宽度等于包含块两边之间的宽度，然而 **float** 可以插入到包含块和行盒边之间，如果有 **float** ，那么 **line box** 的宽度会比没有 **float** 时小。

**line box** 的高度由 **line-height** 决定，而 **line box** 之间的高度各不相同（比如 只含文本的 **line box** 高度与包含图片的 **line height **之间）

**line box** 的高度能够容纳它包含所有的盒，当盒的高度小于行盒的高度（例如：如果盒是 **baseline** 对齐）时，盒的竖直对齐方式由 **vertical-align** 属性决定

当一行的行内级盒的总高度小于它们所在的 **line box** 的宽度时， 它们在行盒的水平分布由 **text-align** 属性决定。如果该属性值为 **justify**  ，用户代理可能会拉伸行内盒（不包括 **inline-table** 和 **inline-block**盒）里的空白和字（间距）

line box 与 float、vertical-align、text-align

**行内盒（inline box）** 

一个 **inline box** 是一个（特殊的）行内级盒，其内容参与了它的包含行内格式化上下文

当一个 **inline box** 超出一个 **line box** 的宽度时，它会被分成几个盒， 并且这些盒会跨多 **line box** 分布。如果一个 **inline-block** 无法分割（例如，如果该 **inline box** 含有一个单个字符， 或者特定语言的单词分隔规则不允许在 **inline box** 里分隔， 或如果 **inline box** 收到一个值为 **nowrap** 或者 **pre** 的 **white-space** 的影响），那么该 **inline box** 会从 **line box** 溢出

当一个 **inline box** 被分割后， **margin**， **border** 和 **padding** 在发生分割的地方（或者在热河分隔处，如果有多处的话）不会有可视化效果  

同一个 **line box **里的 **inline box** 也可能因为双向 （bidirectional）文本处理而被分隔成几个盒

需要盛放一个行内格式化上下文中的行内级内容时，创建一个 **line box**。 不含文本、保留空白符、 margin、 padding或者border非0的行内元素、其他流内内容（例如，图片，**inline block** 或者 **inline table**），并且不以保留换行符结束的 **line box** 必须被当作一个0高度 **line box**，为了确定它里面所有元素的位置，而其他时候必须当它不存在

inline box与断行，溢出

**行高（line-height）**

在CSS中，**line-height** 不是相邻文本行间上一个 **baseline** 与下一个文本行 **baseline** 之间的距离，而是 **line box** 的高度，也就是相邻文本行间底线的距离



**在块的方向上对齐**

行内块可以使用 vertical-align 属性，以不同的方式在块的方向上进行对齐

middle、bottom、baseline

**在行内方向上对齐**

如果行内方向上还有额外空间，那么text-align可用于将各行内框在行框内对齐。



**浮动造成的效果**

在行内方向上，各行框（Line Boxes）通常具有相同的尺寸，即在水平书写模式下，它们具有相同的宽度；在垂直书写模式下，它们具有相同的高度。但是，如果同一个格式化上下文中存在一个float，则这个浮动元素将包裹了它的各行框变短。



# 块格式化上下文





# CSS如何运行

1. 浏览器载入 HTML 文件（比如从网络上获取）。
2. 将 HTML 文件转化成一个 DOM（Document Object Model），DOM 是文件在计算机内存中的表现形式，下一节将更加详细的解释 DOM。
3. 接下来，浏览器会拉取该 HTML 相关的大部分资源，比如嵌入到页面的图片、视频和 CSS 样式。JavaScript 则会稍后进行处理，简单起见，同时此节主讲 CSS，所以这里对如何加载 JavaScript 不会展开叙述。
4. 浏览器拉取到 CSS 之后会进行解析，根据选择器的不同类型（比如 element、class、id 等等）把他们分到不同的“桶”中。浏览器基于它找到的不同的选择器，将不同的规则（基于选择器的规则，如元素选择器、类选择器、id 选择器等）应用在对应的 DOM 的节点中，并添加节点依赖的样式（这个中间步骤称为渲染树）。
5. 上述的规则应用于渲染树之后，渲染树会依照应该出现的结构进行布局。
6. 网页展示在屏幕上（这一步被称为着色）。

![image-20220822093534224](G:\project\前端学习\笔记\CSS.assets\image-20220822093534224.png)

# 层叠

Stylesheets **cascade（样式表层叠）** — 简单的说，css 规则的顺序很重要；当应用两条同级别的规则到一个元素的时候，写在后面的就是实际使用的规则。

下面的例子中，我们有两个关于 `h1` 的规则。`h1` 最后显示蓝色 — 这些规则有相同的优先级，所以顺序在最后的生效。

# 优先级

浏览器是根据优先级来决定当多个规则有不同选择器对应相同的元素的时候需要使用哪个规则。它基本上是一个衡量选择器具体选择哪些区域的尺度：

- 一个元素选择器不是很具体 — 会选择页面上该类型的所有元素 — 所以它的优先级就会低一些。
- 一个类选择器稍微具体点 — 它会选择该页面中有特定 `class` 属性值的元素 — 所以它的优先级就要高一点。



# 选择器权重



![image-20220822094212945](G:\project\前端学习\笔记\CSS.assets\image-20220822094212945.png)

添加!important标识 的样式 -> 行内样式 -> id选择器 -> 类/伪类选择器 -> 元素选择器 -> 通配符 ->继承样式



- 组合选择器，其权重结果是进行相加
- 分组的选择器，各计算各的
- 无论选择器怎么相加，也无法超过前一个权重的。就是无论类选择器结果怎么相加，无法超过id选择器



# 控制继承

CSS 为控制继承提供了五个特殊的通用属性值。每个 css 属性都接收这些值。

- [`inherit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inherit)

  设置该属性会使子元素属性和父元素相同。实际上，就是 "开启继承".

- [`initial`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial)

  设置属性值和浏览器默认样式相同。如果浏览器默认样式中未设置且该属性是自然继承的，那么会设置为 `inherit` 。

- [`revert` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/revert)

  将应用于选定元素的属性值重置为浏览器的默认样式，而不是应用于该属性的默认值。在许多情况下，此值的作用类似于 `unset`。

- [`revert-layer` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/revert-layer)

  将应用于选定元素的属性值重置为在上一个[层叠层](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@layer)中建立的值。

- [`unset`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unset)

  将属性重置为自然值，也就是如果属性是自然继承那么就是 `inherit`，否则和 `initial` 一样



# 重置所有属性

CSS 的 shorthand 属性 `all` 可以用于同时将这些继承值中的一个应用于（几乎）所有属性。它的值可以是其中任意一个 (`inherit`, `initial`, `unset`, or `revert`)。这是一种撤销对样式所做更改的简便方法，以便回到之前已知的起点。

下面的例子中有两个**blockquote** 。第一个用元素本身的样式 ，第二个设置 `all` 为 `unset`



# !import

```css
#winning {
    background-color: red;
    border: 1px solid black ;
}
    
.better {
    background-color: gray;
    border: none !important;
}
    
p {
    background-color: blue;
    color: white;
    padding: 5px;
}   
```

```html
<p class="better">This is a paragraph.</p>
<p class="better" id="winning">One selector to rule them all!</p>
```

**备注：** 覆盖 `!important` 唯一的办法就是另一个 `!important` 具有 相同*优先级* 而且顺序靠后，或者更高优先级。

# CSS选择器

**选择器类型**

- 标签、类、ID

- 标签属性选择器 

  a[title]例如

  a[href="https:/example.com"] {}

- 伪类与伪元素

  这组选择器包含了伪类，用来样式化一个元素的特定状态。例如`:hover`伪类会在鼠标指针悬浮到一个元素上的时候选择这个元素：

  ```css
  a:hover { }
  ```

  Copy to Clipboard

  它还可以包含了伪元素，选择一个元素的某个部分而不是元素自己。例如，`::first-line`是会选择一个元素（下面的情况中是`<p>`）中的第一行，类似`<span>`包在了第一个被格式化的行外面，然后选择这个`<span>`。css

  ```css
  p::first-line { }
  ```

- 运算符

  最后一组选择器可以将其他选择器组合起来，更复杂的选择元素。下面的示例用运算符（`>`）选择了`<article>`元素的初代子元素。

  ```
  article > p { }
  ```

| 选择器                                                       | 示例                |
| :----------------------------------------------------------- | :------------------ |
| [类型选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Type_selectors) | `h1 { }`            |
| [通配选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Universal_selectors) | `* { }`             |
| [类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Class_selectors) | `.box { }`          |
| [ID 选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/ID_selectors) | `#unique { }`       |
| [标签属性选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Attribute_selectors) | `a[title] { }`      |
| [伪类选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) | `p:first-child { }` |
| [伪元素选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-elements) | `p::first-line { }` |
| [后代选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Descendant_combinator) | `article p`         |
| [子代选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Child_combinator) | `article > p`       |
| [相邻兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Adjacent_sibling_combinator) | `h1 + p`            |
| [通用兄弟选择器](https://developer.mozilla.org/zh-CN/docs/Web/CSS/General_sibling_combinator) | `h1 ~ p`            |

# 关系选择器

## 后代选择器

后代选择器——典型用单个空格（" "）字符——组合两个选择器，比如，第二个选择器匹配的元素被选择，如果他们有一个祖先（父亲，父亲的父亲，父亲的父亲的父亲，等等）元素匹配第一个选择器。选择器利用后代组合符被称作后代选择器。

```
body article p
```



## 子代关系选择器

子代关系选择器是个大于号（`>`），只会在选择器选中直接子元素的时候匹配。继承关系上更远的后代则不会匹配。例如，只选中作为`<article>`的直接子元素的`<p>`元素：

```
article > p
```

## 邻接兄弟选择器

邻接兄弟选择器（`+`）用来选中恰好处于另一个在继承关系上同级的元素旁边的物件。例如，选中所有紧随`<p>`元素之后的`<img>`元素：

```
p + img
```

常见的使用场景是，改变紧跟着一个标题的段的某些表现方面，就像是我下面的示例那样。这里我们寻找一个紧挨`<h1>`的段，然后样式化它。

如果你往`<h1>`和`<p>`之间插入其他的某个元素，例如`<h2>`，你将会发现，段落不再与选择器匹配，因而不会应用元素邻接时的前景和背景色。



## 通用兄弟选择器

如果你想选中一个元素的兄弟元素，即使它们不直接相邻，你还是可以使用通用兄弟关系选择器（`~`）。要选中所有的`<p>`元素后*任何地方*的`<img>`元素，我们会这样做：

```
p ~ img
```



## 伪类选择器

### :first-child

**`:first-child`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) [pseudo-class](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) 表示在一组兄弟元素中的第一个元素。

### :last-child

`:last-child` CSS [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) 代表父元素的最后一个子元素。

### :only-child

CSS[伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)`:only-child` 匹配没有任何兄弟元素的元素。等效的选择器还可以写成 `:first-child:last-child`或者`:nth-child(1):nth-last-child(1)`,当然，前者的权重会低一点。

### :invalid

**`:invalid`** [CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) [伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes) 表示任意内容未通过验证的 `<input>`或其他`form`元素 .



### 伪类

| 选择器                                                       | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`:active`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:active) | 在用户激活（例如点击）元素的时候匹配。                       |
| [`:any-link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:any-link) | 匹配一个链接的`:link`和`:visited`状态。                      |
| [`:blank`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:blank) | 匹配空输入值的[``元素](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)。 |
| [`:checked`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:checked) | 匹配处于选中状态的单选或者复选框。                           |
| [`:current` (en-US)](https://developer.mozilla.org/en-US/docs/Web/API/WebVTT_API) | 匹配正在展示的元素，或者其上级元素。                         |
| [`:default`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:default) | 匹配一组相似的元素中默认的一个或者更多的 UI 元素。           |
| [`:dir`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:dir) | 基于其方向性（HTML[`dir`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)属性或者 CSS[`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)属性的值）匹配一个元素。 |
| [`:disabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:disabled) | 匹配处于关闭状态的用户界面元素                               |
| [`:empty`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:empty) | 匹配除了可能存在的空格外，没有子元素的元素。                 |
| [`:enabled`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:enabled) | 匹配处于开启状态的用户界面元素。                             |
| [`:first`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first) | 匹配[分页媒体](https://developer.mozilla.org/en-US/docs/Web/CSS/Paged_Media)的第一页。 |
| [`:first-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-child) | 匹配兄弟元素中的第一个元素。                                 |
| [`:first-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:first-of-type) | 匹配兄弟元素中第一个某种类型的元素。                         |
| [`:focus`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus) | 当一个元素有焦点的时候匹配。                                 |
| [`:focus-visible`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-visible) | 当元素有焦点，且焦点对用户可见的时候匹配。                   |
| [`:focus-within`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:focus-within) | 匹配有焦点的元素，以及子代元素有焦点的元素。                 |
| [`:future` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:future) | 匹配当前元素之后的元素。                                     |
| [`:hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:hover) | 当用户悬浮到一个元素之上的时候匹配。                         |
| [`:indeterminate`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:indeterminate) | 匹配未定态值的 UI 元素，通常为[复选框](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox)。 |
| [`:in-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:in-range) | 用一个区间匹配元素，当值处于区间之内时匹配。                 |
| [`:invalid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:invalid) | 匹配诸如`<input>`的位于不可用状态的元素。                    |
| [`:lang`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:lang) | 基于语言（HTML[lang](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/lang)属性的值）匹配元素。 |
| [`:last-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-child) | 匹配兄弟元素中最末的那个元素。                               |
| [`:last-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:last-of-type) | 匹配兄弟元素中最后一个某种类型的元素。                       |
| [`:left`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:left) | 在[分页媒体 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Pages)中，匹配左手边的页。 |
| [`:link`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:link) | 匹配未曾访问的链接。                                         |
| [`:local-link` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:local-link) | 匹配指向和当前文档同一网站页面的链接。                       |
| [`:is()`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:is) | 匹配传入的选择器列表中的任何选择器。                         |
| [`:not`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:not) | 匹配作为值传入自身的选择器未匹配的物件。                     |
| [`:nth-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-child) | 匹配一列兄弟元素中的元素——兄弟元素按照*an+b*形式的式子进行匹配（比如 2n+1 匹配元素 1、3、5、7 等。即所有的奇数个）。 |
| [`:nth-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-of-type) | 匹配某种类型的一列兄弟元素（比如，`<p>`元素）——兄弟元素按照*an+b*形式的式子进行匹配（比如 2n+1 匹配元素 1、3、5、7 等。即所有的奇数个）。 |
| [`:nth-last-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-child) | 匹配一列兄弟元素，从后往前倒数。兄弟元素按照*an+b*形式的式子进行匹配（比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。 |
| [`:nth-last-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:nth-last-of-type) | 匹配某种类型的一列兄弟元素（比如，`<p>`元素），从后往前倒数。兄弟元素按照*an+b*形式的式子进行匹配（比如 2n+1 匹配按照顺序来的最后一个元素，然后往前两个，再往前两个，诸如此类。从后往前数的所有奇数个）。 |
| [`:only-child`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-child) | 匹配没有兄弟元素的元素。                                     |
| [`:only-of-type`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:only-of-type) | 匹配兄弟元素中某类型仅有的元素。                             |
| [`:optional`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:optional) | 匹配不是必填的 form 元素。                                   |
| [`:out-of-range`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:out-of-range) | 按区间匹配元素，当值不在区间内的的时候匹配。                 |
| [`:past` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:past) | 匹配当前元素之前的元素。                                     |
| [`:placeholder-shown`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:placeholder-shown) | 匹配显示占位文字的 input 元素。                              |
| [`:playing` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:playing) | 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“播放”的元素。 |
| [`:paused` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/:paused) | 匹配代表音频、视频或者相似的能“播放”或者“暂停”的资源的，且正在“暂停”的元素。 |
| [`:read-only`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-only) | 匹配用户不可更改的元素。                                     |
| [`:read-write`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:read-write) | 匹配用户可更改的元素。                                       |
| [`:required`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:required) | 匹配必填的 form 元素。                                       |
| [`:right`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:right) | 在[分页媒体 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Pages)中，匹配右手边的页。 |
| [`:root`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:root) | 匹配文档的根元素。                                           |
| [`:scope`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:scope) | 匹配任何为参考点元素的的元素。                               |
| [`:valid`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:valid) | 匹配诸如`<input>`元素的处于可用状态的元素。                  |
| [`:target`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:target) | 匹配当前 URL 目标的元素（例如如果它有一个匹配当前[URL 分段](https://en.wikipedia.org/wiki/Fragment_identifier)的元素）。 |
| [`:visited`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/:visited) | 匹配已访问链接。                                             |

### 伪元素

| 选择器                                                       | 描述                                                 |
| :----------------------------------------------------------- | :--------------------------------------------------- |
| [`::after`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::after) | 匹配出现在原有元素的实际内容之后的一个可样式化元素。 |
| [`::before`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::before) | 匹配出现在原有元素的实际内容之前的一个可样式化元素。 |
| [`::first-letter`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-letter) | 匹配元素的第一个字母。                               |
| [`::first-line`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::first-line) | 匹配包含此伪元素的元素的第一行。                     |
| [`::grammar-error`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::grammar-error) | 匹配文档中包含了浏览器标记的语法错误的那部分。       |
| [`::selection`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::selection) | 匹配文档中被选择的那部分。                           |
| [`::spelling-error`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/::spelling-error) | 匹配文档中包含了浏览器标记的拼写错误的那部分。       |







# 浮动

- 浮动会使元素向左或是向右移动，其周围元素也会重新排列
- 浮动最初初衷是为了文字环绕效果，后来也用于布局

属性：

- none 表示默认值，即：元素不浮动
- left 表示元素可以向左浮动
- right 表示元素可以向右浮动

> 特点

- 浮动元素会脱离文档流，不占据文档流的位置
- 设置浮动后，元素会向左或是向右开始移动
- 浮动元素 默认不会从父元素中溢出
  - 但是父类的宽度不足的时候，浮动元素也会溢出到父元素之外

- 浮动元素向左或是向右移动的时候，不会超过它前面的浮动元素
- 如果浮动元素的上级是非浮动元素，则浮动元素无法上移
- 浮动元素不会超过它上边的浮动元素的兄弟元素，最多一样高

## BFC 块级格式化上下文

BFC是块级格式化上下文，BFC相当于一个独立的运行空间，其中包含着自己独立的运行规则，BFC内的元素的排列等都遵循着这个运行规则，同时BFC内部的元素布局等不会影响到外部，外部同样如此

- BFC(Block Formatting Context)块级格式化上下文
- BFC是css一个隐含的属性，可以为一个元素开启BFC



**特点**

- 内部的盒子会沿着垂直方向，一个一个的放置
- 盒子垂直方向的举例由marge决定，属于同一个BFC的相邻box的上下margin会重叠
- 每个元素的左边跟包含盒子的左边接触，即使存在浮动也是如此
- BFC区域不会跟float box 重叠
- BFC就是页面上一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之也是如此
- 计算BFC的高度时，浮动元素也参数计算的



**触发BFC的条件**

- html的根元素或是其他包含它的元素
- float属性不为none元素
- overflow 为 auto，scroll，hidden
- display 为 inline-block table-cell table-caption、table、table-row、table-row-group、table-header-group、table-footer-group、inline-table、flow-root、flex或inline-flex、grid或inline-grid 的任何一种
- position 是absolute或是fixed的一种
- contain值为layout、content或paint的元素
- 多列容器（元素的column-count或column-width不为auto，包括column-count为1）

**BFC作用**

1. 避免外边距重叠

```html
<style>
    .container {
        overflow: hidden;
    }

    .cube {
        width: 100px;
        height: 100px;
        background-color: black;
        margin: 100px;
    }
</style>
<div class="container">
    <div class="cube"></div>
</div>
<div class="container">
    <div class="cube"></div>
</div>
```

2. 清除浮动

```html
<style>
    .outer {
        border: 1px solid red;
        overflow: hidden;
    }

    .inner {
        width: 100px;
        height: 100px;
        float: left;
        background-color: gray;
    }
</style>
<div class="outer">
    <div class="inner"></div>
</div>
```



3. 阻止元素被浮动元素覆盖

```html
<style>
    .floatDiv {
        width: 100px;
        height: 100px;
        background-color: blue;
        float: left;
    }

    .normalDiv {
        width: 200px;
        height: 200px;
        background-color: red;
        overflow: hidden;
    }
</style>
<div class="floatDiv"></div>
<div class="normalDiv"></div>
```





## 清除浮动的方法

1. 使用 clear: both; 来清除浮动

![image-20220822142103092](G:\project\前端学习\笔记\CSS.assets\image-20220822142103092.png)

```html
 <style>
        .outer {
            border: 1px solid red
        }
        
        .box {
            width: 200px;
            height: 200px;
            background-color: gray;
            float: left;
        }
        
        .clear {
            clear: both
        }
    </style>
<body>
    <div class="outer">
        <div class="box"></div>
        <div class="box1">1111111</div>
        <div class="clear"></div>
    </div>
</body>
```

- 通过上述代码中 可以看出其实浮动还是对 box1 元素产生了影响。
- 只不过属性`clear: both` 清除了对最后一个元素的影响
- 其实属性`clear: both` 就是消除浮动对该元素的影响，同时添加一个 margin-top 来撑起父元素
- 不是最优解



2. 利用BFC原理来清除浮动

```html
<style>
    .outer {
        border: 1px solid red;
        overflow: hidden;
    }

    .inner {
        width: 100px;
        height: 100px;
        float: left;
        background-color: gray;
    }
</style>
<div class="outer">
    <div class="inner"></div>
</div>
```

- BFC部分原理也可以清除浮动
- 但是这种方式也不是最有解



3. 利用伪类来清除浮动 ::after/ ::before

```html
 <style>
     .outer {
         border: 1px solid red
     }

     .clearfix::after,
     .clearfix::before {
         content: "";
         display: table;
         clear: both;
     }

     .inner {
         width: 100px;
         height: 100px;
         background-color: gray;
         float: left;
     }
</style>
<div class="outer clearfix">
    <div class="inner"></div>
    <div>123456</div>
</div>

```



# 定位Position

static：position的默认值

relative：在确定元素的位置通过left、right、top、bottom属性来设置位置的偏移，其他元素不会寄占他原来的空间

absolute：绝对定位，会把元素移除文档流

​	相对定位的参照物就是 距离最近的非static的祖元素

​	设置绝对定位后，元素的性质会发生改变，行内会变成块级

​	设置绝对定位后，元素的层级会发生变化

​	设置绝对定位后，元素会脱离文档流

fixed：在页面中固定位置，即使页面滑动也会跟随页面移动

​	相对于浏览器的视口进行定位

sticky：粘滞定位

​	必须设定一个方位值（top/ left/ bottom/ right）







# flex布局

主轴 flex-direction 有四个值：row、row-reverse、column、column-reverse

## flex容器

文档中采用了flexbox的区域就叫做flex容器。为了创建flex容器，我们把容器的display属性值改为flex或inline-flex。完成这步之后，容器中的直系子元素就会变成 **flex元素**。所有CSS属性都会有一个初始值，所以flex容器中的flex元素都会有下列行为：

- 元素排列为一行(flex-direction属性的初始值为row)
- 元素从主轴的起始线开始。
- 元素不会在主维度方向拉伸，但是可以缩小
- 元素被拉伸来填充交叉轴大小
- flex-basis 属性为auto
- flex-wrap 属性为nowrap



## **flex-wrap实现多行Flex容器**

[`flex-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) 属性的初始值是`nowrap`。这就意味着如果你有一组的对其容器而言太宽的弹性物件，它们就会溢出。如果你想要一旦它们变得太宽就换行，你必须给 `flex-wrap` 属性添加`wrap`值，或者，用`row wrap` 或 `column wrap` 值作用于[`flex-flow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-flow)的速写。



## 简写属性flex-flow

属性 flex-direction 和 flex-wrap 组合为简写属性 flex-flow。第一个指定为flex-direction，第二个指定为 flex-wrap。例如： flex-flow: row wrap;



## flex 元素上的属性

- flex-grow

  flex-grow 若被赋予一个正整数，flex元素会以flex-basis为基础，沿主轴方向增长尺寸。这会使该元素延展，并占据此方向轴上的可用空间。如果其他元素也被允许延展，那么他们会各自占据可用空间的一部分。

  如果我们给上例中的所有元素设定 flex-grow值为1，容器中的可用空间会被这些元素评分。它们的会延展以填满容器主轴方向上的空间。

  如果设定的值为非1则会按照比例分配空间

- flex-shrink

  flex-shrink 属性是处理flex属性收缩的问题。如果我们容器中没有足够排列flex元素的空间，那么flex元素flex-shrink属性设置为正整数来缩小它所占空间到flex-basis以下，与flex-grow属性一样，可以赋予不同的值来控制flex元素收缩的程度 —— flex-shrink属性赋予更大的数值可以比赋予小数值的同级元素收缩程度更大。

- flex-basis 

  定义了该元素的 **空间大小**，flex容器里除了元素所占的空间意外的富余空间就是**可用空间**。该属性的默认值是auto。此时，浏览器会检测这个元素是否具有确定的尺寸。

  如果没有给元素设定尺寸，flex-basis的值采用元素内容的尺寸。



**Flex属性的简写**

flex 简写形式允许把上述属性顺序书写——flex-grow, flex-shrink, flex-basis

例如：flex: 1 1 auto

几种预定义的值：

- flex: initial
- flex: auto
- flex: none 
- flex: <positive-number>

flex: initial 是把 flex 元素重置为Flexbox 的初始值，相当于 flex: 0 1 auto 。在这里 `flex-grow` 的值为 0，所以 flex 元素不会超过它们 `flex-basis` 的尺寸。`flex-shrink` 的值为 1, 所以可以缩小 flex 元素来防止它们溢出。`flex-basis` 的值为 `auto`. Flex 元素尺寸可以是在主维度上设置的，也可以是根据内容自动得到的。

flex: auto 等同于 flex: 1 1 auto;

flex: none 可以把flex元素设置为不可伸缩。等同于 flex: 0 0 auto

flex: 1 ... flex: n ，他相当于flex: 1 1 0。元素可以在 flex-basis为0的基础上伸缩。



##  **元素间的对齐和空间分配**

### align-items 控制交叉轴上所有的flex项目的对齐

align-items 可以使元素在交叉轴方向对齐。

这个属性的初始值为 stretch，这就是为什么flex元素会默认被拉伸到最高元素的高度。实际上，它们被拉伸来填满flex容器 —— 最高的元素定义了容器的高度

属性：

- stretch 默认值：拉伸来填满flex容器

  ![image-20220823141936226](G:\project\前端学习\笔记\CSS.assets\image-20220823141936226.png)

- flex-start：使flex元素按flex容器的顶部对齐

  ![image-20220823141954298](G:\project\前端学习\笔记\CSS.assets\image-20220823141954298.png)

- flex-end：使flex元素按flex容器的底部对齐

  ![image-20220823142007034](G:\project\前端学习\笔记\CSS.assets\image-20220823142007034.png)

- center：使flex元素按照flex容器居中对齐

  ![image-20220823141914973](G:\project\前端学习\笔记\CSS.assets\image-20220823141914973.png)

- baseline： flex项目的基线对齐





### justify-content 控制主轴上所有flex项目的对齐

justify-content 属性用来使元素在主轴上对齐，主轴是通过flex-direction设置的方向。

属性：

- stretch

- flex-start 元素从容器的起始线排列。

  ![image-20220823143130579](G:\project\前端学习\笔记\CSS.assets\image-20220823143130579.png)

- flex-end 从终止线排列。

  ![image-20220823143144090](G:\project\前端学习\笔记\CSS.assets\image-20220823143144090.png)

- center 在中间排列

  ![image-20220823143200454](G:\project\前端学习\笔记\CSS.assets\image-20220823143200454.png)

- space-around  。使每个元素的左右空间相等。

  ![image-20220823143224714](G:\project\前端学习\笔记\CSS.assets\image-20220823143224714.png)

- space-between 把元素排列好之后的剩余空间拿出来，平均分配到元素之间，所以元素之间间隔相等。

  ![image-20220823143237324](G:\project\前端学习\笔记\CSS.assets\image-20220823143237324.png)

### align-self  控制交叉轴上单个flex项目的对齐



### align-content 控制 多条主轴的flex项目在交叉轴的对齐

要使得align-content生效，你需要你的flex容器的height要大于flex项目的可是内容。然后它会将所有的flex项目打包成一块之后再对齐剩下的空间。

align-content 属性如下：

- flex-start

  ![image-20220823150050593](G:\project\前端学习\笔记\CSS.assets\image-20220823150050593.png)

- flex-end

  ![image-20220823150108593](G:\project\前端学习\笔记\CSS.assets\image-20220823150108593.png)

- center

  ![image-20220823150140890](G:\project\前端学习\笔记\CSS.assets\image-20220823150140890.png)

- space-between

  ![image-20220823150155999](G:\project\前端学习\笔记\CSS.assets\image-20220823150155999.png)

- space-around 每行flex项目的前后距离相等

  ![image-20220823150213888](G:\project\前端学习\笔记\CSS.assets\image-20220823150213888.png)

- stretch

  ![image-20220823145950860](G:\project\前端学习\笔记\CSS.assets\image-20220823145950860.png)

- space-evenly (没有再flexbox特性中定义) 每行flex项目之间的举例相等

  ![image-20220823150251377](G:\project\前端学习\笔记\CSS.assets\image-20220823150251377.png)

  ​	

## order属性

除了颠倒显示弹性项目的顺序之外，您还可以使用order属性指定单个项目并更改其在视觉顺序中的显示位置。.

`order`属性旨在按顺序排列项目。这意味着为项目分配了代表其组的整数。然后，按照该整数（最低的值）首先按照视觉顺序放置项目。如果多个项目具有相同的整数值，则在该组中按照源顺序对项目进行布局。

```html
<style>
    .box {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        border: 1px solid red;
        width: 200px;
    }

    .box>* {
        border: 1px solid black;
    }

    .active {
        order: -1;
        flex: 1 0 100%;
    }
</style>

<div class="box">
    <div><a href="">1</a></div>
    <div><a href="">2</a></div>
    <div class="active"><a href="">3</a></div>
    <div><a href="">4</a></div>
    <div><a href="">5</a></div>
</div>
```



​	![image-20220823152242123](G:\project\前端学习\笔记\CSS.assets\image-20220823152242123.png)





**在物件之间建立间隔：**

![image-20220823154358582](G:\project\前端学习\笔记\CSS.assets\image-20220823154358582.png)

```html
<style>
    .wrapper {
        border: 2px dotted red;
        width: 500px;
    }

    .box {
        display: flex;
        flex-wrap: wrap;
        margin: -10px
    }

    .box>* {
        flex: 1 1 160px;
        margin: 10px;
        background-color: aqua;
    }
</style>

<div class="wrapper">
    <div class="box">
        <div>one</div>
        <div>two</div>
        <div>three</div>
        <div>four</div>
        <div>five</div>
        <div>six</div>
        <div>seven</div>
        <div>eight</div>
        <div>nine</div>
        <div>ten</div>
    </div>
</div>
```



## Flex布局案例

### 导航栏

1. 在元素外部处理空间分布

```html
<style>
    nav ul {
      display: flex;
      justify-content: space-between;
    }
</style>

<nav>
  <ul>
    <li><a href="#">Page 1</a></li>
    <li><a href="#">Page 2</a></li>
    <li><a href="#">Page 3 is longer</a></li>
    <li><a href="#">Page 4</a></li>
  </ul>
</nav>
```

2. 让元素自己处理空间分布

```html
<style>
    nav ul {
      display: flex;
    }
    nav li {
      flex: auto ;
    }
</style>
<nav>
  <ul>
    <li><a href="#">Page 1</a></li>
    <li><a href="#">Page 2</a></li>
    <li><a href="#">Page 3 is longer</a></li>
    <li><a href="#">Page 4</a></li>
  </ul>
</nav>
```



### 拆分导航

```html
<style>
	nav ul {
      display: flex;
      margin: 0 -10px;
    }

    nav li {
      margin: 0 10px;
    }

    .push-right {
      margin-left: auto;
    }	
</style>
<nav>
  <ul>
    <li><a href="#">Page 1</a></li>
    <li><a href="#">Page 2</a></li>
    <li><a href="#">Page 3 is longer</a></li>
    <li class="push-right"><a href="#">Page 4</a></li>
  </ul>
</nav>
```

### 元素居中

```html
<style>
    .box {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .box div {
        width: 100px;
        height: 100px;
    }
</style>
<div class="box">
  <div></div>
</div>
```



### 绝对底部

```html
<style>
    .cards {
        display: flex;
    }

    .card {
        display: flex;
        flex-direction: column;
        width: 500px;
        border: 1px solid red;
    }

    .card .content {
        border: 1px solid black;
        flex-grow: 1;
    }
</style>
<div class="cards">
    <div class="card">
        <div class="content">
            <p>This card doesn't have much content.</p>
        </div>
        <footer>Card footer</footer>
    </div>
    <div class="card">
        <div class="content">
            <p>This card has a lot more content which means that it defines the height of the container the cards are in. I've laid the cards out using grid layout, so the cards themselves will stretch to the same height.</p>
        </div>
        <footer>Card footer</footer>
    </div>
</div>
```



### 媒体对象

### Form controls

```html
<style>
    .media {
        display: flex;
        align-items: flex-start;
    }

    .media .content {
        flex: 1;
        padding: 10px;
    }
</style>
<div class="media">
  <div class="image"><img src="MDN.svg" alt="MDN logo"></div>
    <div class="content">This is the content of my media object. Items directly inside the flex container will be aligned to flex-start.</div>
</div>

```



# grid布局

## 网格容器

我们通过在元素上声明 `display：grid` 或 `display：inline-grid` 来创建一个网格容器。一旦我们这样做，这个元素的所有直系子元素将成为网格元素。

在这个例子中，这有一个类名为 `wrapper` 的`div` 元素作为容器 ，它内部有五个子元素。

```html
<style>
    .wrapper {
        display: grid;
        border: 1px solid black;
        width: 500px;
    }

    .wrapper>* {
        background-color: aqua;
        border: 1px solid red;
    }
</style>
<div class="wrapper">
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
</div>
```



## 网格轨道

我们通过 **grid-template-columns** 和 **grid-template-rows** 属性来定义网格中的行和列。这些属性定义了网格的轨道。一个网格轨道就是网格中任意两条线之间的空间。在下图中你可以看到一个高亮的轨道——网格的第一个行轨道。

我可以通过添加 `grid-template-columns` 属性将列轨道添加到之前的例子，然后定义列轨道的大小。



```html
<style>
    .wrapper {
        display: grid;
        border: 1px solid black;
        grid-template-columns: 100px 100px 100px;
        width: 800px;
    }

    .wrapper>* {
        background-color: aqua;
        border: 1px solid red;
    }
</style>

<div class="wrapper">
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
</div>
```

### fr单位

轨道可以使用任何长度单位进行定义。网格还引入了一个另外的长度单位来帮助我们创建灵活的网格轨道。新的`fr`单位代表网格容器中可用空间的一等份。下一个网格定义将创建三个相等宽度的轨道，这些轨道会随着可用空间增长和收缩。

```html
<style>
    .wrapper {
        display: grid;
        border: 1px solid black;
        grid-template-columns: 1fr 1fr 1fr;
        width: 800px;
    }

    .wrapper>* {
        background-color: aqua;
        border: 1px solid red;
    }
</style>
<div class="wrapper">
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
</div>
```

### 在轨道清单上用repeat()

有着多轨道的大型网格可使用 `repeat()` 标记来重复部分或整个轨道列表。

```html
<style>
    .wrapper {
        display: grid;
        border: 1px solid black;
        grid-template-columns: repeat(3, 1fr);
        width: 800px;
    }

    .wrapper>* {
        background-color: aqua;
        border: 1px solid red;
    }
</style>
<div class="wrapper">
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
</div>
```

Repeat 语句可以用于重复轨道列表中的一部分。在下面的例子中我创建了一个网格：它起始轨道为 20 像素，接着重复了 6 个`1fr`的轨道，最后再添加了一个 20 像素的轨道。

```css
.wrapper {
  display: grid;
  grid-template-columns: 20px repeat(6, 1fr) 20px;
}
```



Repeat 语句可以传入一个轨道列表，因此你可以用它来创建一个多轨道模式的重复轨道列表。在下一个例子中，网格将有共计 10 个轨道，为 1 个`1fr`轨道后面跟着 1 个`2fr`轨道，该模式重复 5 次。

```
.wrapper {
  display: grid;
  grid-template-columns: repeat(5, 1fr 2fr);
}
```



### 隐式和显式网格

当我们创建上文中网格例子的时候，我们用 `grid-template-columns` 属性定义了自己的列轨道，但是却让网格按所需的内容创建行，这些行会被创建在隐式网格中。显式网格包含了你在 `grid-template-columns` 和 `grid-template-rows` 属性中定义的行和列。如果你在网格定义之外又放了一些东西，或者因为内容的数量而需要的更多网格轨道的时候，网格将会在隐式网格中创建行和列。按照默认，这些轨道将自动定义尺寸，所以会根据它里面的内容改变尺寸。

你也可以在隐式网格中用 `grid-auto-rows` 和 `grid-auto-columns` 属性来定义一个设置大小尺寸的轨道。

在下面的例子中我们用 `grid-auto-rows` 属性来确保在隐式网格中创建的轨道是 200 像素高。

```html
<div class="wrapper">
   <div>One</div>
   <div>Two</div>
   <div>Three</div>
   <div>Four</div>
   <div>Five</div>
</div>
```



```css
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
}
```

### 轨道大小和minmax()

在设置一个显式的网格或者定义自动创建的行和列的大小的时候，我们也许想给网格一个最小的尺寸，确保他们能扩大到容纳他里面添加的内容。举个例子，我想让我的行的高度永远不会缩小到 100 像素以下，但是如果我的内容延伸到 300 像素高了我想让我的行高也延伸到这个高度。

网格用 minmax() 函数来解决这个问题。在下一个例子中我用 minmax() 作为 grid-auto-rows 的值。自动创建的行高将会是最小 100 像素，最大为 auto。用 auto 意味着行的尺寸将会根据内容的大小来自动变换：根据本行中最高的单元，把空间扩展到足够容纳该单元。

```html
<style>
    .wrapper {
        display: grid;
        border: 1px solid black;
        grid-template-columns: 1fr 1fr 1fr;
        grid-auto-rows: minmax(100px, auto);
        width: 500px;
    }

    .wrapper>* {
        background-color: aqua;
        border: 1px solid red;
    }
</style>
<div class="wrapper">
    <div>One</div>
    <div>
        Two
        <p>I have some more content in.</p>
        <p>This makes me taller than 100 pixels.</p>
    </div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
</div>
```



## 网格线

![image-20220824111254798](G:\project\前端学习\笔记\CSS.assets\image-20220824111254798.png)

### 跨轨道放置网格元素

```html
<style>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: 50px;
        border: 1px solid red;
        width: 600px;
    }

    .wrapper>* {
        border: 1px solid black;
        background-color: aqua;
    }

    .box1 {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 3;
    }

    .box2 {
        grid-column-start: 1;
        grid-row-start: 3;
        grid-row-end: 5;
    }
</style>
<div class="wrapper">
    <div class="box1">One</div>
    <div class="box2">Two</div>
    <div class="box3">Three</div>
    <div class="box4">Four</div>
    <div class="box5">Five</div>
</div>
```

![image-20220824111936715](G:\project\前端学习\笔记\CSS.assets\image-20220824111936715.png)

## 网格单元

一个网格单元是在一个网格元素中最小的单位， 从概念上来讲其实它和表格的一个单元格很像。现在再看回我们前面的一个例子，一旦一个网格元素被定义在一个父级元素当中，那么他的子级元素将会排列在每个事先定义好的网格单元中。在下面的图中，我会将第一个网格单元作高亮处理。

![image-20220824112028199](G:\project\前端学习\笔记\CSS.assets\image-20220824112028199.png)

## 网格区域

网格元素可以向行或着列的方向扩展一个或多个单元，并且会创建一个网格区域。网格区域的形状应该是一个矩形 - 也就是说你不可能创建出一个类似于“L”形的网格区域。下图高亮的网格区域扩展了 2 列以及 2 行。

![image-20220824112120038](G:\project\前端学习\笔记\CSS.assets\image-20220824112120038.png)

## 网格间距

在两个网格单元之间的 *网格横向间距* 或 *网格纵向间距* 可使用 [`grid-column-gap` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/column-gap) 和 [`grid-row-gap` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/row-gap) 属性来创建，或者直接使用两个合并的缩写形式 [`grid-gap` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/gap)。在下面的例子中，我会创建一个横向间距为 10px、纵向间距为 1em 的网格元素。

```html
<style>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 1em;
        width: 800px;
        border: 1px solid red;
    }

    .wrapper>* {
        background-color: aqua;
        border: 1px solid black;
    }
</style>
<div class="wrapper">
    <div>One</div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
</div>
```



## 嵌套网格

一个网格元素可以也成为一个网格容器。在接下来的例子中我事先有了一个 3 列的网格元素，并有两个跨轨道的网格。在这个例子中，第一个网格元素含有几个子级元素。当这些元素不是网格容器的直接子级元素时，它们不会参与到网格布局中，并显示为正常的文档流。

```html
<style>
    .wrapper {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-column-gap: 10px;
        grid-row-gap: 1em;
        width: 800px;
        border: 1px solid red;
    }

    .wrapper>* {
        background-color: aqua;
        border: 1px solid black;
    }

    .box1 {
        grid-column-start: 1;
        grid-column-end: 4;
        grid-row-start: 1;
        grid-row-end: 3;
        display: grid;
        grid-template-rows: repeat(3, 1fr);
    }

    .box1>* {
        border: 1px solid blue;
        background-color: aquamarine;
        margin: 10px;
    }
</style>

<div class="wrapper">
    <div class="box1 box">
        <div>a</div>
        <div>b</div>
        <div>c</div>
    </div>
    <div>Two</div>
    <div>Three</div>
    <div>Four</div>
    <div>Five</div>
</div>

```





![image-20220824133917255](G:\project\前端学习\笔记\CSS.assets\image-20220824133917255.png)



## 媒体查询

根据设备的大致类型或者特定的特征和设备参数来修改网站或应用程序。

目的：

- 有条件的通过@media和@import at-rules用CSS装饰样式
- 用media= 属性为<style> <link> <source> 和其他HTML元素指定特定的媒体类型。例如：

```html
<link rel="stylesheet" src="styles.css" media="screen" />
<link rel="stylesheet" src="styles.css" media="print" />
```































































































