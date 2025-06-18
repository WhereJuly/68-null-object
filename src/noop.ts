'use strict';

/**
 * A noop function, the small convenience companion for Null Object.
 * 
 * @example
 * 
 * noop() // returns `undefined`
 * noop(1, 'a', true, null) // Accepts arbitrary arguments without throwing
 * 
 * @tutorial
 * 
 * Provide a safe default when a callback is optional:
 * ```typescript
 * function onEvent(callback: () => void = noop) {
 *   callback();  // Safe to call without checking
 * }
 * ```
 * 
 * Silence an expected or optional error:
 * ```typescript
 * someAsyncOperation().catch(noop);
 * ```
 */
export const noop: (...args: any[]) => void = () => { };
