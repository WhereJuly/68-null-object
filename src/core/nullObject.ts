'use strict';

/**
 * @description
 * Creates a no-op proxy that silently accepts any method calls, property accesses, 
 * or assignments (even nested). Useful for optional dependencies or safe stubbing.
 * Optional name aids debugging via .toString().
 * 
 * @signature
 * 
 * ```typescript
 * function nullObject<T = Record<string, any>>(name?: string): T
 * ```
 * 
 * @example
 * 
 * Call any method, chained, with arbitrary arguments, access any property, nested and do nothing.
 * 
 * ```typescript
 * const silent = nullObject<{ method: any; prop: any; }>();
 * silent.method().another('arbitrary', 'args', 123, true)
 * silent.prop.method('arbitrary', 'args', 123, true).more
 * ```
 * 
 * @example
 * 
 * Help debugging with `.toString()` and optional named identity 
 * 
 * ```typescript
 * const logger = config.log ? realLogger : nullObject<Logger>()
 * const name = logger.toString() // name === [NullObject]
 * // or
 * const logger = config.log ? realLogger : nullObject<Logger>('Logger');
 * const name = logger.toString() // name === [NullObject: Logger]
 * ```
 * 
 * @example
 * 
 * Can silently assign to any property including nested
 * 
 * ```typescript
 * const plugin = userProvidedPlugin ?? nullObject<Plugin>();
 * plugin.settings.some = true;
 * ```
 * 
 */
export function nullObject<T = Record<string, any>>(name?: string): T {
    const handler = new NullObjectHandler(name);

    return handler.proxy as T;
}

class NullObjectHandler implements ProxyHandler<any> {

    public proxy: unknown;
    private readonly name?: string;

    constructor(name?: string) {
        this.name = name;

        this.get = this.get.bind(this);
        this.apply = this.apply.bind(this);

        this.proxy = new Proxy(() => this.proxy, this);
    }

    public get(_target: any, prop: PropertyKey) {
        // NB: Symbol.toPrimitive: case for implicit type coercion e.g. `obj + 'text' -> ._toString()` 
        if (prop === Symbol.toPrimitive || prop === 'toString') {
            return this._toString.bind(this);
        }

        return this.proxy;
    };


    /**
     * Allows to silently accept assignments to any property and do nothing.
     */
    public set(_target: any, _prop: PropertyKey, _value: any): boolean {
        return true;
    }

    public apply() {
        return this.proxy;
    };

    private _toString(): string {
        const name = this.name ? `: ${this.name}` : '';

        return `[NullObject${name}]`;
    }

}
