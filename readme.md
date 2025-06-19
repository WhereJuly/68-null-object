# Null-Object

A tiny runtime type-safe _polymorphic noop object_ that substitutes for your real implementation without side effects.

<small>See Null Object pattern [^1].</small>

[^1]: [Kerievsky J., Refactoring to Patterns (2004)](https://www.amazon.com/Refactoring-Patterns-Joshua-Kerievsky/dp/0321213351), p. 343; [Fowler M., Refactoring (2018)](https://www.amazon.com/Refactoring-Improving-Existing-Addison-Wesley-Signature/dp/0134757599), p. 289 under "Introduce Special Case" title.

**Package Status**

![Codecov](https://img.shields.io/codecov/c/github/WhereJuly/68-null-object?color=%2308A108)
[![Quality Gate](https://sonarcloud.io/api/project_badges/measure?project=WhereJuly_68-null-object&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=WhereJuly_68-null-object)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=WhereJuly_68-null-object&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=WhereJuly_68-null-object)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=WhereJuly_68-null-object&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=WhereJuly_68-null-object)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=WhereJuly_68-null-object&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=WhereJuly_68-null-object)

![npm bundle size](https://img.shields.io/bundlephobia/min/@wherejuly/null-object)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@wherejuly/null-object)

![npm downloads](https://img.shields.io/npm/dm/env-schema-cli.svg?color=green)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?color=green)](https://opensource.org/licenses/MIT)

---

<details>
<summary><b><a>Contents</a></b></summary>

- [Basic Usage](#basic-usage)
- [Summary](#summary)
- [Usage](#usage)
  - [The Convenience noop Function](#the-convenience-noop-function)
- [Maintenance](#maintenance)
  - [Contributions](#contributions)
- [License](#license)

</details>

## Basic Usage

Install the package.

```bash
npm install --save @wherejuly/null-object
```

Null-Object:

```typescript
const logger = config.log ? realLogger : nullObject<Logger>();
logger.info('User signed in'); // Always safe to call any method or access property on a null-object
```

A bundled noop function just for convenience:

```typescript
noop(); // returns `undefined`
```

## Summary

It is often useful to silently replace an optional dependency, service, or plugin that is not available in some environment (e.g. stub metrics service in development and stage environments).

The package provides a safe fallback for any expected object interface by returning a no-op implementation object. It enables cleaner and more robust code due to no null checks or conditional logic.

Any methods called on it are noop, including chained ones. Methods silently accept arbitrary arguments. Access any properties, including nested, silently assign to properties.

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
  ```
- Middleware chains:
  ```typescript
  const middleware = [authMiddleware, config.enableAudit ? auditMiddleware : nullObject<Middleware>()];
  ```

## Usage

The signature:

```typescript
function nullObject<T = Record<string, any>>(name?: string): T;
```

Call any method, chained if needed, with arbitrary arguments, access any property, including nested and do nothing. Optionally provide null-object with the actual object type to ensure type safety.

```typescript
type TSomeActualHandler = { method: any; prop: any }; // May come as third-party type

const silent = nullObject<TSomeActualHandler>();
// Could also use it untyped: `const silent = nullObject()`

silent.method().another('arbitrary', 'args', 123, true);
silent.prop.method('arbitrary', 'args', 123, true).more;
```

Help debugging with `.toString()` and optional named identity.

```typescript
const logger = config.log ? realLogger : nullObject<Logger>();
const name = logger.toString(); // name === [NullObject]
// or
const logger = config.log ? realLogger : nullObject<Logger>('Logger');
const name = logger.toString(); // name === [NullObject: Logger]
```

Can silently accept assignments to any property including nested.

```typescript
const plugin = userProvidedPlugin ?? nullObject<Plugin>();
plugin.settings.some = true;
```

### The Convenience noop Function

The package also provides the `noop` function so that you do not have to import another package for it.

```typescript
noop(); // returns `undefined`
noop(1, 'a', true, null); // Accepts arbitrary arguments without throwing
function onEvent(callback: () => void = noop) {
 callback(); // Safe to call without checking
}
```

## Maintenance

The package is written in TypeScript with the informative JSDoc blocks available on hover for public interface (e.g. in VS Code) for comfortable programmatic usage. The code is carefully crafted with TDD allowing simple extension. The project is production-ready and actively maintained.

### Contributions

Filling issues, questions in Discussions are all welcome.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
