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
`CozyPorts` is used not to return a single pipeline, but a pipelines network - an instance of `CozyPorst`, which takes as a parameter an integer - a number of pipelines, that exist in this network.

```ts
const pipeline = new CozyPorts(10);
```ts

An identifier of that pipeline is a integer number, in `CozyPorts` it's called `port`.
