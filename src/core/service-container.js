/**
 * Service Container
 *
 * A minimal DI container for resolving services in widget constructors.
 * Uses class constructors as tokens for type-safe injection.
 *
 * Usage:
 * ```ts
 * // Registration (during kendo.core.js init)
 * serviceContainer.singleton(UtilsService);
 * serviceContainer.scoped(SomeScopedService);
 *
 * // Or register an existing instance
 * serviceContainer.singletonInstance(UtilsService, existingUtilsService);
 *
 * // In widgets - use inject() with default parameter
 * class Chat extends Widget {
 *     constructor(
 *         element: HTMLElement,
 *         options: ChatOptions,
 *         utils = inject(UtilsService)
 *     ) {
 *         super(element, options);
 *         this.utils = utils;
 *     }
 * }
 * ```
 */
import { ServiceLifetime } from "./models/dependency-container";
class ServiceContainer {
    constructor() {
        /** Map from constructor to registration */
        this.registrations = new Map();
    }
    /**
     * Register a class as a singleton service.
     * One instance will be created and shared everywhere.
     */
    singleton(ctor, factory) {
        this.registrations.set(ctor, {
            ctor,
            factory: factory !== null && factory !== void 0 ? factory : (() => new ctor()),
            lifetime: ServiceLifetime.Singleton,
            instance: undefined
        });
    }
    /**
     * Register an existing instance as a singleton.
     * Useful when the instance is already created (e.g., during kendo.core.js init).
     */
    singletonInstance(ctor, instance) {
        this.registrations.set(ctor, {
            ctor,
            factory: () => instance,
            lifetime: ServiceLifetime.Singleton,
            instance
        });
    }
    /**
     * Register a class as a scoped service.
     * A new instance will be created each time it's resolved.
     */
    scoped(ctor, factory) {
        this.registrations.set(ctor, {
            ctor,
            factory: factory !== null && factory !== void 0 ? factory : (() => new ctor()),
            lifetime: ServiceLifetime.Scoped,
            instance: undefined
        });
    }
    /**
     * Resolve a service by its class constructor.
     * - Singleton: returns cached instance (creates on first call)
     * - Scoped: creates new instance each time
     */
    resolve(ctor) {
        const registration = this.registrations.get(ctor);
        if (!registration) {
            throw new Error(`Service ${ctor.name} is not registered`);
        }
        if (registration.lifetime === ServiceLifetime.Singleton) {
            // Return cached instance or create and cache
            if (registration.instance === undefined) {
                registration.instance = registration.factory();
            }
            return registration.instance;
        }
        // Scoped: always create new instance
        return registration.factory();
    }
    /**
     * Try to resolve a service, returns undefined if not registered.
     */
    tryResolve(ctor) {
        if (!this.has(ctor)) {
            return undefined;
        }
        return this.resolve(ctor);
    }
    /**
     * Check if a service is registered.
     */
    has(ctor) {
        return this.registrations.has(ctor);
    }
    /**
     * Get the lifetime of a registered service.
     */
    getLifetime(ctor) {
        var _a;
        return (_a = this.registrations.get(ctor)) === null || _a === void 0 ? void 0 : _a.lifetime;
    }
}
/** Global service container instance */
export const serviceContainer = new ServiceContainer();
/**
 * Inject a service by its class constructor.
 * Use as default parameter value in constructors.
 *
 * @example
 * class Chat extends Widget {
 *     constructor(
 *         element: HTMLElement,
 *         options: ChatOptions,
 *         utils = inject(UtilsService)
 *     ) {
 *         this.utils = utils;
 *     }
 * }
 */
export function inject(ctor) {
    return serviceContainer.resolve(ctor);
}
