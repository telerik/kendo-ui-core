/**
 * Service Container Models
 *
 * Simple DI container for Kendo widgets. Services can be:
 * - Singleton: one instance shared everywhere
 * - Scoped: new instance created per resolution
 */
export var ServiceLifetime;
(function (ServiceLifetime) {
    ServiceLifetime["Singleton"] = "singleton";
    ServiceLifetime["Scoped"] = "scoped";
})(ServiceLifetime || (ServiceLifetime = {}));
