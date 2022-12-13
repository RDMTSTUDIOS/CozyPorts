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
Let's create an entity and place it to specific pipeline.

```ts
const Button1: HTMLElement = document.createElement('button');
Button1.textContent = 'Button1';
Button1.addEventListener('your_event', (): void => console.log('Event dispatched to Button1'));
```
> Note: entities can only not be a html elements, we will see it a bit later.




