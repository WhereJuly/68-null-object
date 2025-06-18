'use strict';

import { describe, expect, it } from 'vitest';

import { nullObject } from '@src/core/nullObject.js';

describe('Basic Null-Object Test', () => {

    it('Should create basic null object', () => {
        const actual = nullObject<{ dummy: any; }>();

        expect(actual).toBeInstanceOf(Function);
    });

    it('Should have a dummy properties', () => {
        const actual = nullObject<{ dummy: any; }>();

        expect(actual.dummy).toBeInstanceOf(Function);
        expect(actual.dummy.another).toBeInstanceOf(Function);
        expect(actual.dummy().another.more()).toBeInstanceOf(Function);
    });

    it('Should be able to call a noop method', () => {
        const actual = nullObject<{ method: any; }>();

        expect(actual.method()).toBeInstanceOf(Function);
    });

    it('Should be able to call a chained noop methods', () => {
        const actual = nullObject<{ method: any; }>();

        expect(actual.method().another()).toBeInstanceOf(Function);
    });

    it('Should be able to call a chained noop methods with arbitrary arguments', () => {
        const actual = nullObject<{ method: any; }>();

        expect(actual.method(123).another('abc')).toBeInstanceOf(Function);
    });

    it('Should be able to silently accept assignments to properties', () => {
        const actual = nullObject<{ dummy: any; }>();

        actual.dummy = 123;
        actual.dummy.another = 'abc';

        expect(actual.dummy).toBeInstanceOf(Function);
        expect(actual.dummy.another).toBeInstanceOf(Function);
    });

    describe('Null-object identity name test', () => {

        it('Should output a default null-object identity name', () => {
            const actual = nullObject<{ dummy: any; }>();

            expect(actual.toString()).toEqual('[NullObject]'); // NOSONAR
        });

        it('Should output a custom null-object identity name', () => {
            const fixture = 'Fixture name';
            const actual = nullObject(fixture);

            expect(actual.toString()).toEqual(`[NullObject: ${fixture}]`); // NOSONAR
        });

    });

});


