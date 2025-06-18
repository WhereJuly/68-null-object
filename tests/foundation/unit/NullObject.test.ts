'use strict';

import { nullObject } from '@src/nullObject.js';
import { describe, expect, it } from 'vitest';

describe('Basic Null-Object Test', () => {

    it('Should create basic null object', () => {
        const actual = nullObject<{ dummy: any; }>();

        expect(actual).toBeInstanceOf(Function);
    });

    it('Should have a dummy properties on a null-object', () => {
        const actual = nullObject<{ dummy: any; }>();

        expect(actual.dummy.another).toBeInstanceOf(Function);
    });

    it('Should be able to call a noop method on a null-object', () => {
        const actual = nullObject<{ dummy: any; }>();

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


