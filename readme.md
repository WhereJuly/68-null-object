# Null-Object

<small>See Null Object pattern [^1].</small>

[^1]: [Kerievsky J., Refactoring to Patterns (2004)](https://www.amazon.com/Refactoring-Patterns-Joshua-Kerievsky/dp/0321213351), p. 343; [Fowler M., Refactoring (2018)](https://www.amazon.com/Refactoring-Improving-Existing-Addison-Wesley-Signature/dp/0134757599), p. 289 under "Introduce Special Case" title.

A tiny runtime _polymorphic noop object_ that substitutes for your real implementation without side effects.

## Basic Usage

```typescript
const logger = config.log ? realLogger : nullObject<Logger>();
logger.info('User signed in'); // Always safe
```

## Summary

Provides a safe fallback for any expected object interface by returning a no-op implementation object. Any methods called on it are noop. It enables cleaner and more robust code due to no null checks or conditional logic.

- No need for `if (handler)` checks;
- `handler.doSomething()` always works, even on the noop;
- Methods return `undefined` or chainable noop;
- Can be typed to match the real interface;

It is useful to silently replace an optional dependency, service, or plugin that is not available in some environment (e.g. stub metrics).

Common use cases include:

- Optional services like logging, analytics, metrics:

  ```typescript
  const metrics = prod ? nullObject<Metrics>() : devMetrics;
  ```

- Provide a noop plugin when none is installed: `const plugin = userProvidedPlugin ?? nullObject<Plugin>();`
- Avoid conditional logic in consumers via default parameter:
  ```typescript
  function createHandler(callbacks: Callbacks = nullObject<Callbacks>()) {
   callbacks.onReady(); // Always callable
  }
  // Usage:
  const callback;
  createHandler(); // Will silently
  ```
- Middleware chains:

  ```typescript
  const middleware = [authMiddleware, config.enableAudit ? auditMiddleware : nullObject<Middleware>()];
  ```

## Usage