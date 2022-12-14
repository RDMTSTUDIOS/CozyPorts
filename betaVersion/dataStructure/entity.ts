export default class Entity
{
    public prev?: Entity;
    public value: any | HTMLElement;
    public next?: Entity;

    constructor(value: any)
    {
        this.value = value;
    };
}