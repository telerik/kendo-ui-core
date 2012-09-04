namespace Kendo.Mvc.Infrastructure
{
    using System.Web;
    using System.Web.Routing;
    using Kendo.Mvc.Infrastructure.Implementation;
    using Kendo.Mvc.UI.Html;

    public static class DI
    {
        public static IDependencyInjectionContainer Current
        {
            get;
            set;
        }

        public static bool IsDebug
        {
            get;
            set;
        }

        static DI()
        {
            if (HttpContext.Current != null)
            {
                IsDebug = HttpContext.Current.IsDebuggingEnabled;
            }
            else
            {
                IsDebug = true;
            }

            Current = new DependencyInjectionContainer();

            RegisterCoreDependencies();

            RegisterAuthorizationDependencies();

            RegisterCacheDependencies();

            GridDependencyBootstrapper.Setup();
            ImageBrowserDependencyBootstrapper.Setup();
        }

        private static void RegisterCoreDependencies()
        {
            Current.Register<IPathResolver>(() => new PathResolver());

            Current.Register<IUrlResolver>(() => new UrlResolver());

            Current.Register<IUrlGenerator>(() => new UrlGenerator());

            Current.Register<IUrlResolver>(() => new UrlResolver());

            Current.Register<IVirtualPathProvider>(() => new VirtualPathProviderWrapper());

            Current.Register<IUrlAuthorization>(() => new UrlAuthorization());

            Current.Register<IJavaScriptInitializer>(() => new JavaScriptInitializer());
        }

        private static void RegisterAuthorizationDependencies()
        {
            Current.Register<IControllerAuthorization, IAuthorizeAttributeCache, IAuthorizationContextCache>((authorizeAttributeCache, authorizationContextFactory) =>
                new ControllerAuthorization(authorizeAttributeCache, authorizationContextFactory, RouteTable.Routes));

            Current.Register<INavigationItemAuthorization, IControllerAuthorization, IUrlAuthorization>((controllerAuthorization, urlAuthorization) =>
                new NavigationItemAuthorization(controllerAuthorization, urlAuthorization));
        }

        static void RegisterCacheDependencies()
        {
            Current.Register<ICacheProvider>(() => new CacheProvider());
            Current.Register<ICacheFactory, ICacheProvider>((provider) => new CacheFactory(IsDebug, provider));
            Current.Register<IControllerTypeCache, ICacheFactory>((cacheFactory) => new ControllerTypeCache(cacheFactory.Create("controllerType")));
            Current.Register<IRouteDataCache, ICacheFactory>((cacheFactory) => new RouteDataCache(cacheFactory.Create("routeData")));
            Current.Register<IActionMethodCache, ICacheFactory, IControllerTypeCache>((cacheFactory, controllerTypeCache) =>
                new ActionMethodCache(cacheFactory.Create("actionMethod"), controllerTypeCache));
            Current.Register<IAuthorizeAttributeCache, ICacheFactory, IControllerTypeCache, IActionMethodCache>((cacheFactory, controllerTypeCache, actionMethodCache) =>
                new AuthorizeAttributeCache(cacheFactory.Create("authorizeAttribute"), controllerTypeCache, actionMethodCache));
            Current.Register<IControllerContextCache, ICacheFactory, IControllerTypeCache>((cacheFactory, controllerTypeCache) =>
                new ControllerContextCache(cacheFactory.Create("controllerContext"), controllerTypeCache));
            Current.Register<IControllerDescriptorCache, ICacheFactory, IControllerTypeCache>((cacheFactory, controllerTypeCache) =>
                new ControllerDescriptorCache(cacheFactory.Create("controllerDescriptor"), controllerTypeCache));
            Current.Register<IAuthorizationContextCache, ICacheFactory, IControllerContextCache, IControllerDescriptorCache, IRouteDataCache>(
                (cacheFactory, controllerContextCache, controllerDescriptorCache, routeDataCache) =>
                new AuthorizationContextCache(cacheFactory.Create("authorizeContext"), controllerContextCache, controllerDescriptorCache, routeDataCache));
        }
    }
}
