// 请你仅使用两个栈实现先入先出队列。队列应当支持一般队列支持的所有操作（push、pop、peek、empty）：

// 实现 MyQueue 类：

// void push(int x) 将元素 x 推到队列的末尾
// int pop() 从队列的开头移除并返回元素
// int peek() 返回队列开头的元素
// boolean empty() 如果队列为空，返回 true ；否则，返回 false
const myQueue = function () {
    this.stack1 = []
    this.stack2 = []
}
myQueue.prototype.push = function (x) {
    this.stack1.push(x)
}
myQueue.prototype.pop = function () {
    if (this.stack2.length === 0) {
        while (this.stack1.length > 0) {
            this.stack2.push(this.stack1.pop())
        }
    }
    return this.stack2.pop()
}
myQueue.prototype.peek = function (){
    if (this.stack2.length === 0) {
        while (this.stack1.length > 0) {
            this.stack2.push(this.stack1.pop())
        }
    }
    return this.stack2[this.stack2.length - 1]
}
myQueue.prototype.empty = function(){
    if (this.stack1.length === 0){
        if (this.stack2.length === 0) {
            return true
        }
    }
    return false
}

const queue = new myQueue()
queue.push(1)
queue.push(2)
console.log(queue.stack1);
queue.pop()
console.log(queue.stack2);
queue.push(3)
console.log(queue.stack1);

