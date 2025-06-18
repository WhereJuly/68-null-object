'use strict';

import { createNullObject } from '@src/nullObject.js';
import { describe, expect, it } from 'vitest';

describe('Basic Null-Object Test', () => {

    it('Should create basic null object', () => {
        const actual = createNullObject<{ dummy: any; }>();
        
        expect(actual).toBeInstanceOf(Function);
    });
    
    it('Should have a dummy properties on a null-object', () => {
        const actual = createNullObject<{ dummy: any; }>();

        expect(actual.dummy.another).toBeInstanceOf(Function);
    });

    it('Should be able to call a noop method on a null-object', () => {
        const actual = createNullObject<{ dummy: any; }>();

        expect(actual.dummy.another).toBeInstanceOf(Function);
    });

});


