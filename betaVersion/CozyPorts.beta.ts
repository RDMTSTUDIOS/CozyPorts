import PipeLine from "./dataStructure/pipline";

export default class CozyPorts
{
     private _listeners: PipeLine = new PipeLine;
    private _dataBus: PipeLine[] = [];
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
            this._dataBus.push(new PipeLine());
        };
    };

    public connectToPort(port: number, entity: any)
    {
        if (port >= this._numberOfPorts)
        {
            throw new Error(`Port number ${port} can't be used. Available port numbers are: ${0 - --this._numberOfPorts}`)
        };

        const message = (message: string, data?: any) => {            
        };

        return message;
    };

    public dispatchToAll(message: string, data?: any): void
    {

    };

    private echo(port: number, message: string, data?: any): void
    {
        if (port) this._dataBus[port].echo(message, data)
        else this._listeners.echo(message, data);
    };
};
