# 弱类型语言
在定义变量时，不需要指定变量的类型，变量的类型是在执行期间由执行引擎来确定的。

# == vs ===
 == 会发生类型转换，而 === 不会发生类型转换。

 # 类型转换
 1. 显示类型转换
    - Number(x) 将x转换为数字
    - String(x) 将x转换为字符串
    - Boolean(x) 将x转换为布尔值

 2. 隐式类型转换
    - 当代码中出现 + - * / > < <= >= !  !=运算符时,符号左右两边不是原始类型,v8会隐式进行类型转换，将非原始值转换为原始值


 # valueOf() 、toString() 方法
  - valueOf() 方法将包装类对象转换为原始值
  - toString() 方法返回对象的字符串

# 引用类型转换为原始类型
1. 引用类型转字符串
    - 值调用toString() 方法
    - 值调用valueOf() 方法
    - String(x) 将x转换为字符串
      - String({})==>ToObject()==>toString() 读构造函数原型内部的toString() 方法 ="[object Object]"

2. 引用类型转数字
    - Number(x) 将x转换为数字
      - Number({})==>ToNumber({})==>ToPrimitive({},Number)==>ToNumber(xx)

3. 引用类型转布尔值
    - 所有的引用类型转换为布尔值都为true

## ToPrimitive(x, type) 方法
 1. 判断x是否为原始类型
    - 如果是原始类型，直接返回x
 2. 调用x的valueOf() 方法
    - 如果valueOf() 方法返回原始类型，直接返回valueOf() 方法的返回值
 3. 调用x的toString() 方法
    - 如果toString() 方法返回原始类型，直接返回toString() 方法的返回值
 4. 报错

 ## toString() 方法
 1. {}.toString() 对象版本 toString() 方法//“[object Object]”
 2. [].toString() 数组版本 toString() 方法//'1,2,3'
 3. 其他类型 toString() 方法直接用引号括起来  

 #  + 运算符
  - 作为一元运算符
    * +x == Number(x)
  - 作为二元运算符
    * 如果 + 左右两边有一边是字符串，就把另一边转换为字符串，再进行拼接