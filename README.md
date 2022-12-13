# CozyPorts

## Pipeline concept

CozyPorts are based on a `pipeline concept`, which means that events and dispatched only to entities in a specified 'pipeline'. What's that mean and how it works:

Imagine a some kind of pipeline or tunnel with no light in it and it contains some amount of entities. Entities, that contains in it, can't see each other, but instead they can hear. Basically - they don't know anything about each other, even where they are and how many entities down here, BUT, they can hear - receive data and respond to it, if it's needed within this 'place', about which they know nothing, except that they are in it.

So, let me explain the same in practice.

> For better understanding download file `CozyPorts.ts` and import it to an empty file and follow steps in the next paragraph.
```ts
import CozyPorts from './CozyPorts'
```
# How it works in practice

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
const Button2 = document.createElement('button');
Button2.textContent = 'Button2';
Button2.addEventListener('your_event', ()=> console.log('Event dispatched to Button2'));

const Button2_connection = pipelines_network.connectToPort(1, Button2);
```

Button2 is now placed to pipeline with id: 1.

`addEventListener('your_event', ...)` in our paradigm of CozyPorts means, that Button2 will now respond, if someone in pipeline (port) width id: 1, it will do something.

And now, we can test, how it's all works.

```ts
Button1_connection('your_event')
```

![result](https://user-images.githubusercontent.com/118057254/207444662-05a6acbd-e3e4-441f-8e6c-7885967a28c7.png)

Let's change pipeline (port) to, where we placing our `Button2`.

```ts
const Button2_connection = pipelines_network.connectToPort(2, Button2);
```

![result_anotherPort](https://user-images.githubusercontent.com/118057254/207444999-04569032-5196-499b-b051-d7f93e470a01.png)

And it's obvious, because they are in different pipelines.










