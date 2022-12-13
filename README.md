# CozyPorts

### Pipeline concept

CozyPorts are based on a `pipeline concept`, which means that events and dispatched only to entities in a specified 'pipeline'. What's that mean and how it works:

Imagine a some kind of pipeline or tunnel with no light in it and it contains some amount of entities. Entities, that contains in it, can't see each other, but instead they can hear. Basically - they don't know anything about each other, even how many entities down here, BUT, they can hear - receive data and respond to it, if it's needed.

So, let me explain the same in practice.

> For better understanding download file `CozyPorts.ts` and import it to an empty file.
```ts
import CozyPorts from './CozyPorts'
```
# TypeScript implematation

An identifier of that pipeline is a integer number, in `CozyPorts` it's called `port`.
