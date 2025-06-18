'use strict';

import { describe, it, expect } from 'vitest';

import { noop } from '@src/core/noop.js';

describe('noop Function Test', () => {

    it('Should be a function', () => {
        expect(typeof noop).toBe('function');
    });

    it('Should return undefined when called', () => {
        expect(noop()).toBeUndefined();
    });

    it('Should accept any arguments without throwing', () => {
        expect(() => noop(1, 'a', true, null)).not.toThrow();
    });

});
