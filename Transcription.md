## Slide 1 (Intro)

Hello! My name is Kseniya Yatskevich and the topic of my presentation is The Event loop.

The Even Loop is one of the most important aspects to understand about Java Script. This presentation to explain the inner details of how JS work with a single thread and how it handles asynchronous function.

## Slide 2 (Single threaded language)

JS is a single threaded language. It means that JS engine has one call stack and one memory head. It executes code in order and must finish executed a peace of code before moving onto the next.

The asynchronous behaviour is not part of the JavaScript language itself, they are built on top of the core JavaScript language in the browser (or the programming environment) and accessed through the browser APIs. 

## Slide 3 (main components of the browser)

Look at the main components of the browser
* Objects are allocated in a **heap**. **Heap** is a  large unstructured region of memory
* **Stack** represents the single thread provided for JavaScript code execution. Function calls form a stack of frames.
* **Browser** or **Web APIs** are built into your web browser, and are able to expose data from the browser and surrounding computer environment and do useful complex things with it. They are built on top of the core JavaScript language, providing you with extra superpowers to use in your JavaScript code.

## Slide 4 (Example of code)

Now let’s take a look on how this components work with on example.

We have the main function which has 2 console.log commands logging ‘A’ and ‘C’ to the console. Between them we have  a setTimeout call which logs ‘B’ to the console with 0ms delay.

## Slide 5 (Example of code)

1. The call of  the main function is first pushed into the stack (as a frame). Then the browser pushes the first statement in the main function into the stack which is console.log(‘A’). This statement is executed and upon completion that frame is popped out. Letter A is displayed in the console.

## Slide 6 (Example of code)

2. The next statement (setTimeout() with callback exec() and 0ms delay) is pushed into the call stack and execution starts. setTimeout function uses a Browser API to delay a callback to the provided function. The frame (with setTimeout) is then popped out once the handover to browser is complete (for the timer).


## Slide 7 (Example of code)
3. console.log(‘C’) is pushed to the stack while the timer runs in the browser for the callback to the exec() function. In this particular case, as the delay provided was 0ms, the callback will be added to the message queue as soon as the browser receives it.

## Slide 8 (Example of code)
4. After the execution of the last statement in the main function, the main() frame is popped out of the call stack and call stack is empty. For the browser to push any message from the queue to the call stack, the call stack has to be empty first. That is why even though the delay provided in the setTimeout() was 0 seconds, the callback to exec() has to wait till the execution of all the frames in the call stack is complete.

## Slide 9 (Example of code)

5. Now the callback exec() is pushed into the call stack and executed. The letter ‘B’ is logging to the console. This is the event loop of javascript.

## Slide 10 (Macrotasks)

As we see, It may happen that a task comes while the stack is busy, then it’s enqueued.  The tasks create a queue, so-called **macrotask queue**. Macrotasks can be setTimeout and setInterval, Ajax, different events,

## Slide 11 (Example of using macrotasks)

For instance, while the engine is busy executing a script, a user can move their mouse causing mousemove, and setTimeout may be due and so on, these tasks form a queue.

Tasks from the queue are processed on “first in – first out” basis. When the engine browser is done with the script, it handles mousemove event, then setTimeout handler, and so on.

## Slide 12 (Microtasks)

Along with macrotasks there exist **microtasks**. Microtasks come only from our code. They are usually created by promises: an execution of .then/catch/finally handler becomes a microtask. Async function wish await are also comes to microtask queue it’s another form of promise handling.

There’s also a special function queueMicrotask(func) that queues func for execution in the microtask queue.


## Slide 13 (Example of using microtasks)

Immediately after every macrotask, the engine executes all tasks from microtask queue, prior to running any other macrotasks or rendering or anything else.

All microtasks are completed before any other event handling or rendering or any other macrotask takes place.

That’s important, as it guarantees that the application environment is basically the same (no mouse coordinate changes, no new network data, etc) between microtasks.

## Slide 14 (algorithm of the event loop)

The more detailed algorithm of the event loop (though still simplified compare to the specification):
1. Dequeue and run the oldest task from the macrotask queue (e.g. “script”).
2. Execute all microtasks:

    While the microtask queue is not empty: dequeue and run the oldest microtask.
3.  Render changes if any.
4.	If the macrotask queue is empty, wait till a macrotask appears.
5.	Go to step 1.


## Slide 15 (Example of code)

For instance, tak a look code.

What’s going to be the order here?
1.	code shows first, because it’s a regular synchronous call.
2.	promise shows second, because .then passes through the microtask queue, and runs after the current code.
3.	timeout shows last, because it’s a macrotask.

## Slide 16 (Conclusion)

Understanding how event loop works is very important. In order to finaly understand how it works I recomend using [Loupe](http://latentflip.com/loupe).

Loupe is alittle visualisation to help you understand haw JS's call stack, event loop, callback queu interract with each other.