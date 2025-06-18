'use strict';

/**
 * @description
 * 
 * @example
 */

export function createNullObject<T extends object>(): T {

    const handler: ProxyHandler<any> = {
        get: (_, prop) => {
            if (prop === Symbol.toPrimitive) return () => '';
            return typeof prop === 'symbol' ? undefined : proxy;
        },
        apply: () => proxy, // if function is called
    };

    const proxy = new Proxy(() => proxy, handler);
    return proxy;

}