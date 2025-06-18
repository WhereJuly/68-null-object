'use strict';

/**
 * @description
 * 
 * @example
 * 
 * Help debugging with `toString` and optional named identity 
 * 
 * ```typescript
 * const logger = config.log ? realLogger : nullObject<Logger>()
 * logger.toString() // [NullObject]
 * // or
 * const logger = config.log ? realLogger : nullObject<Logger>('Logger');
 * logger.toString() // [NullObject: Logger]
 * ```
 * 
 */
export function nullObject<T = Record<string, any>>(name?: string): T {
    const handler = new NullObjectHandler(name);

    return handler.proxy;
}


class NullObjectHandler implements ProxyHandler<any> {

    public proxy: any;
    private readonly name?: string;

    constructor(name?: string) {
        this.name = name;

        this.get = this.get.bind(this);
        this.apply = this.apply.bind(this);

        this.proxy = new Proxy(() => this.proxy, this);
    }

    public get(_target: any, prop: PropertyKey) {
        if (prop === Symbol.toPrimitive) return () => '';
        if (prop === 'toString') return this._toString.bind(this);

        return this.proxy;
    };


    /**
     * Accept all assignments, but do nothing
     */
    public set(_target: any, _prop: PropertyKey, _value: any): boolean {
        return true;
    }

    public apply() { return this.proxy; };

    private _toString(): string {
        const name = this.name ? `: ${this.name}` : '';

        return `[NullObject${name}]`;
    }

}
