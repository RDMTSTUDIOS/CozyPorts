
export default class CozyPorts {

    private _listeners: [any?][] = [];
    private _dataBus: [any?][] = [];
    private _numberOfPorts: number;

    public constructor(numberOfPorts: number)
    {
        this._numberOfPorts = numberOfPorts;
        if (numberOfPorts === 0)
        {
            throw new Error(`At least one port shoud be created`);
        };

        for (let i = 0; i < this._numberOfPorts ; ++i)
        {
            this._dataBus.push([]);
        };
    };

    public connectToPort(port: number, entity: any)
    {
        if (port >= this._numberOfPorts)
        {
            throw new Error(`Port number ${port} can't be used. Available port numbers are: ${0 - --this._numberOfPorts}`)
        };

        this._dataBus[port].push(entity);
        this._listeners.push(entity);

        const message = (message: string, data?: any) => {
            this.dispatch(port, message, data)
        };

        return { port: port, message};
    };

    public toAll(message: string, data?: any)
    {
        this._listeners.forEach((value) => {
            try {
                value[message](data);
            } catch(e) {}
        });
    };

    private dispatch(port: number, message: string, data?: string)
    {
        this._dataBus[port].forEach((value) => {
            try {
                value[message](data);
            } catch(e) {}
        });
    };
};