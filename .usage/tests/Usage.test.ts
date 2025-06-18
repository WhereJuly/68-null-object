'use strict';

import { describe, expect, it } from 'vitest';

import { noop, nullObject } from '@wherejuly/null-object';

describe('Null-Object & noop Function Usage Test', () => {

    it('Should access properties or methods on Null-Object', () => {
        const actual = nullObject();

        expect(actual.dummy).toBeInstanceOf(Function);
        expect(actual.dummy.another).toBeInstanceOf(Function);
        expect(actual.dummy().another.more()).toBeInstanceOf(Function);
        expect(actual.method()).toBeInstanceOf(Function);
        expect(actual.method(123).another('abc')).toBeInstanceOf(Function);
    });

    it('Should be able to silently accept assignments to properties', () => {
        const actual = nullObject<{ dummy: any; }>();

        actual.dummy = 123;
        actual.dummy.another = 'abc';

        expect(actual.dummy).toBeInstanceOf(Function);
        expect(actual.dummy.another).toBeInstanceOf(Function);
    });

    it('Should output a custom null-object identity name', () => {
        const fixture = 'Fixture name';
        const actual = nullObject(fixture);

        expect(actual.toString()).toEqual(`[NullObject: ${fixture}]`); // NOSONAR
    });

    it('noop: Should accept any arguments without throwing', () => {
        expect(() => noop(1, 'a', true, null)).not.toThrow();
    });

});
