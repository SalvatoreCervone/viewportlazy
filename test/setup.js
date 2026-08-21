import { vi } from 'vitest';

export const observerInstances = [];

class MockIntersectionObserver {
    constructor(callback, options = {}) {
        this.callback = callback;
        this.options = options;
        this.elements = new Set();
        observerInstances.push(this);
    }

    observe(element) {
        this.elements.add(element);
    }

    unobserve(element) {
        this.elements.delete(element);
    }

    disconnect() {
        this.elements.clear();
    }

    trigger(entries) {
        this.callback(entries, this);
    }
}

global.IntersectionObserver = MockIntersectionObserver;
global.mockObserverInstances = observerInstances;
