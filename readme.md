# Null-Object

<small>See Null Object pattern [^1].</small>

[^1]: [Kerievsky J., Refactoring to Patterns (2004)](https://www.amazon.com/Refactoring-Patterns-Joshua-Kerievsky/dp/0321213351), p. 343; [Fowler M., Refactoring (2018)](https://www.amazon.com/Refactoring-Improving-Existing-Addison-Wesley-Signature/dp/0134757599), p. 289 under "Introduce Special Case" title.

A tiny runtime _polymorphic noop object_ that substitutes for your real implementation without side effects.

**Package Status**

![Codecov](https://img.shields.io/codecov/c/github/WhereJuly/68-null-object?color=%2308A108)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=WhereJuly_68-null-object&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=WhereJuly_68-null-object)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=WhereJuly_68-null-object&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=WhereJuly_68-null-object)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=WhereJuly_68-null-object&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=WhereJuly_68-null-object)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=WhereJuly_68-null-object&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=WhereJuly_68-null-object)

![npm version](https://img.shields.io/npm/v/env-schema-cli?color=green)
![npm downloads](https://img.shields.io/npm/dm/env-schema-cli.svg?color=green)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?color=green)](https://opensource.org/licenses/MIT)

<details>
<summary><b><a>Contents</a></b></summary>

- [Basic Usage](#basic-usage)
- [Summary](#summary)
- [Usage](#usage)
- [Convenience](#convenience)
  - [noop Function](#noop-function)

</details>

## Basic Usage

```typescript
const logger = config.log ? realLogger : nullObject<Logger>();
logger.info('User signed in'); // Always safe to call any method or access property on a null-object
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

- Provide a noop plugin when none is installed:
  ```typescript
  const plugin = userProvidedPlugin ?? nullObject<Plugin>();
  ```
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

Call any method, chained, with arbitrary arguments, access any property, nested and do nothing.

```typescript
const silent = nullObject<{ method: any; prop: any }>();
silent.method().another('arbitrary', 'args', 123, true);
silent.prop.method('arbitrary', 'args', 123, true).more;
```

Help debugging with `.toString()` and optional named identity

```typescript
const logger = config.log ? realLogger : nullObject<Logger>();
const name = logger.toString(); // name === [NullObject]
// or
const logger = config.log ? realLogger : nullObject<Logger>('Logger');
const name = logger.toString(); // name === [NullObject: Logger]
```

## Convenience

### noop Function

The package also provides the `noop` function so that you do not have to import another package for it.

```typescript
noop(); // returns `undefined`
noop(1, 'a', true, null); // Accepts arbitrary arguments without throwing
function onEvent(callback: () => void = noop) {
 callback(); // Safe to call without checking
}
```
