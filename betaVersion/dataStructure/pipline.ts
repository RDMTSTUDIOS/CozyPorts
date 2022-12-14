import Entity from "./entity";

export default class PipeLine
{
    private first?: Entity;
    private last?: Entity;
    private n: number = 0;

    /**
     * Method, that add's a new entity to the Pipeline.
     * @param  {any} value
     */
    public place(value: any): Entity
    {   
        if (this.n) {
            if (this.n === 1) {
                this.last = new Entity(value);
                this.last.prev = this.first!;
                this.first!.next = this.last; 
            } else {
                let cache = this.last!;
                this.last = new Entity(value);
                cache.next = this.last;
            };
        } else {
            this.first = new Entity(value);
            this.last = this.first;
        };
        this.n++;
        return this.last;
    };
    
    /**
     * Removes element from the Pipeline by it's link.
     * @param  {Entity} entity
     * @returns void
     */
    public remove(entity: Entity): void
    {
        if (this.n === 1){
            this.first = undefined;
            this.last = undefined;
        };
        if(entity.prev && entity.next) {
            entity.prev.next = entity.next;
            entity.next.prev = entity.prev;
        } else if (entity.next) {
            entity.next.prev = undefined;
            this.first = entity.next;
        } else {
            entity.prev!.next = undefined;
            this.last = entity.prev;
        };
        this.n--
    };

    public echo(message: string, data?: any): void
    {
        if (this.n === 0) return;

        if(this.isElement(this.first?.value)) {
            (this.first?.value as HTMLElement).dispatchEvent(new CustomEvent(message, {detail: data}));
        } else {
            try { this.first?.value[message](data) }
            catch (e) {};
        }''
        let i: number = this.n - 1;
        let next: Entity | undefined = this.first?.next
        while (i)
        {
            if(this.isElement(next?.value)) {
                (next?.value as HTMLElement).dispatchEvent(new CustomEvent(message, {detail: data}));
            } else {
                try { next?.value[message](data) }
                catch (e) {};
            };
            next = next?.next;
            i--;
        };
    };

    private isElement(element: any) {
        return element instanceof Element || element instanceof HTMLDocument;  
    };
};