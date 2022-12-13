# CozyPorts

## Pipeline concept

CozyPorts are based on a `pipeline concept`, which means that events and dispatched only to entities in a specified 'pipeline'. What's that mean and how it works:

Imagine a some kind of pipeline or tunnel with no light in it and it contains some amount of entities. Entities, that contains in it, can't see each other, but instead they can hear. Basically - they don't know anything about each other, even where they are and how many entities down here, BUT, they can hear - receive data and respond to it, if it's needed within this 'place', about which they know nothing, except that they are in it.

So, let me explain the same in practice.

> For better understanding download file `CozyPorts.ts` and import it to an empty file and follow steps in the next paragraph.
```ts
import CozyPorts from './CozyPorts'
```
## How it works in practice

Firstly we need an pipeline. Where we can put our entities.
`CozyPorts` is used not to return a single pipeline, but a pipelines network - an instance of `CozyPorst`, which takes only one parameter as an integer - a number of pipelines, that will exist in a network.

> Code below creates a network with 10 pipelines in it.
```ts
const pipelines_network = new CozyPorts(10);
```
An identifier of specific pipeline is an integer number, in `CozyPorts` it's called `port`.

Now our `pipelines_network` is an API to interract with it - object that has two methods: `.connectToPort(port: number, entity: any)` and `dispatchToAll(message: string, data?: any)`.

### Connect to port

Remember about entities that contained in a pipeline? [Pipeline concept](https://github.com/RDMTSTUDIOS/CozyPorts/blob/main/README.md#pipeline-concept). So `.connectToPort()` is a method that places to a specified pipeline (port: integer) a specified entity (entity: any).

```ts
.connectToPort(port: number, entity: any)
```
Let's create an entity and place it to a specific pipeline.
> Note: entities can only not be a html elements, we will see it a bit later.
```ts
const Button1: HTMLElement = document.createElement('button');
Button1.textContent = 'Button1';
Button1.addEventListener('your_event', (): void => console.log('Event dispatched to Button1'));
```
Our first entity called 'Button1' will now respond, if someone will " shout 'your_event' ".

Now let's place it to pipeline:

```ts
const Button1_connection = pipelines_network.connectToPort(1, Button1);
```
`1` - port, identifier of that pipeline, `Button1` - entity to place in it. This method returns an function - a method to " shout " something to the pipeline.

```ts
Button1_connection: (message: string, data?: any) => void
```
`message` - is like, the words that entity with shout in this pipeline, and `data` - any other stuff you can pass with this message.

To " shout ", we can just call it:

```ts
Button1_connection('your_event')
```

Basically, `Button_1` shouts: 'your_event' in the pipeline with id: 1, so every entity in it can hear it. Important, that entity, that " shouts " also receives this message.

Now create another entity - Button2:
```ts
const Button2: HTMLElement = document.createElement('button');
Button2.textContent = 'Button2';
Button2.addEventListener('your_event', (): void => console.log('Event dispatched to Button2'));

const Button2_connection = pipelines_network.connectToPort(1, Button2);
```

Button2 is now placed to pipeline with id: 1.

`addEventListener('your_event', ...)` in our paradigm of CozyPorts means, that Button2 will now respond, if someone in pipeline (port) width id: 1, it will do something.

And now, we can test, how it's all works.

```ts
Button1_connection('your_event')
```

![result](https://user-images.githubusercontent.com/118057254/207444662-05a6acbd-e3e4-441f-8e6c-7885967a28c7.png)

Let's change pipeline (port) to, where we placing our Button2.

```ts
const Button2_connection = pipelines_network.connectToPort(2, Button2);
```

And now, if Button1 will " shout 'your_event' " - Button2 won't hear it. 

![result_anotherPort](https://user-images.githubusercontent.com/118057254/207444999-04569032-5196-499b-b051-d7f93e470a01.png)

And it's obvious, because they are in different pipelines.

But another very important feature of the `CozyPorts` - that we can put in pipelines now only HTMLElements, but any another entity, that can be provided with interface.

For example classes, objects, `CozyPorts` even can be used to work only with them, without HTMLElements. And the point is we can build very flexible and light-weight 'networks', becaise `CozyPorts` constructor via `new` keyword provides a newly created incapsulated instance of a `Pipelines nerwork` with specified amount of `pipes`, which marker with unique identifiers called `ports`: 0 to (number of ports - 1).

You can control, what **what entity hears** or **will it respond or not** by connecting it to a **Pipelines nerwork** specified `port`. And the feature here that entity hears everything in that pipeline, BUT, it can respond and not to respond, and it depends only on entity, so your code is still encapsulated - 

" ***any other entity don't have to know anything about this entity, and even don't have to know, that it's even exists.
Messages can be compared to echo, which spreads across the pipeline.***. "


AND it's very easy to make them respond to `messages` - by just adding a eventListeners to HTMLElements and public methods to classes and objects. You can even done it dynamically in your code - remove method/eventListener - entity won't respond, add method/eventListener - it will. You don't need co configure the pipeline or a network later in code. You are not controlling the structure of a network - you control entitys behavior or they are control themselves dynamically listen for event or not or changing it's behavior for various messages - messages also can be passed with `data: any`.

### Dispatch to all

Create pipelines networks also provided you a second method `.dispatchToAll()`:

```ts
.dispatchToAll(message: string, data?: any): void
```
It " shouts " to all entities, connected to any port in that network. Entities, connected to ports, for example, 2 and 7 will receive this message.

## "Good" example

Create and prepare your entities:

```ts
import CozyPorts from './CozyPorts'

const pipelines_network = new CozyPorts(10);


// Entity 1: --->
const Button1: HTMLElement = document.createElement('button');
Button1.textContent = 'Button1';

// responce for message 'your_event'
Button1.addEventListener('your_event', (): void => console.log('Event dispatched to Button1'));
// placed to pipeline 1
const Button1_connection = pipelines_network.connectToPort(1, Button1);
// <---


// Entity 2: --->
const Button2: HTMLElement = document.createElement('button');
Button2.textContent = 'Button2';

// responce for message 'your_event'
Button2.addEventListener('your_event', (): void => console.log('Event dispatched to Button2'));
// placed to pipeline 2
const PlaySound = pipelines_network.connectToPort(2, Button2);
// <---


// Entity 3: --->
class Logger
{
    private static _logs: string[] = [];
    private static get logs(): string[]
    {
        this._logs.forEach((value, index): void => console.log(`%c${index} - ${value}`, 'background: #222; color: #bada55'))
        return this._logs;
    };
    
    private static WriteLog(data: string): void
    {
        this._logs.push(typeof data === 'string' ? data : 'incorrect data');
        this.logs;
    };

    // responce for message 'your_event'
    public static your_event(data: any)
    {
        this.WriteLog(data)
    };
};

// If this entity won't send messages anyway or there is just no need in it,
// you can just connect it, it don't save API to send messages.
pipelines_network.connectToPort(1, Logger);
// <---


// Entity 4: --->
class DummyObjectsGenerator
{
    private veryUsefulMethod(): void
    {
        console.log('Fetching Pentagon and Zone-51 most secret server . . .');
    };
};
// object, that won't respond to message 'your_event';
const RandomName55 = new DummyObjectsGenerator();
// placed to pipeline 1
const DummyObjectsGenerator_connection = pipelines_network.connectToPort(1, RandomName55);
// <---
```

And now send messages through pipelines:

```ts
console.log(`\n\nSingle calls:\n\n`) // ! just for better console readability !

// Send message through pipeline (port) - 1
Button1_connection('your_event', 'some_random_data')

// Send message through pipeline (port) - 2
// The thing is you can use imperative approach.
// To send message - just call a function, named as you want.
// Basically, you can setup a complex bigger pipelines network,
and, to start something some process, you just call it through interface,

// through one entry point,
// through one entity,
// with a signle function call,
// with a single line of code,
// where each part is encapsulated and flexible,
// and you don't have to setup imports.

// Isn't that good?

PlaySound('your_event');

console.log(`\n\nDispatch to all:\n\n`) // ! just for better console readability !

pipelines_network.dispatchToAll('your_event', 'another_random_data')

console.log(`\n\n`) // ! just for better console readability !
```

The result is:

![good-example_final-result](https://user-images.githubusercontent.com/118057254/207460862-b7e700e4-9e8d-4379-9fe8-0f428518dcc9.png)





