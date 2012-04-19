namespace KendoUI.Mvc.Infrastructure
{
    using System.Web;
    using System.Web.Routing;
    using KendoUI.Mvc.Infrastructure.Implementation;
    using KendoUI.Mvc.UI;
    
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

            RegisterComponentDependencies();
        }

        private static void RegisterCoreDependencies()
        {
            Current.Register<IPathResolver>(() => new PathResolver());

            Current.Register<IUrlResolver>(() => new UrlResolver());

            Current.Register<IUrlResolver>(() => new UrlResolver());

            Current.Register<IConfigurationManager>(() => new ConfigurationManagerWrapper());

            Current.Register<IVirtualPathProvider>(() => new VirtualPathProviderWrapper());

            Current.Register<ILocalizationServiceFactory>(() => new LocalizationServiceFactory());

            Current.Register<IUrlAuthorization>(() => new UrlAuthorization());
        }
        private static void RegisterAuthorizationDependencies()
        {
            Current.Register<IControllerAuthorization, IAuthorizeAttributeCache, IAuthorizationContextCache>((authorizeAttributeCache, authorizationContextFactory) => 
                new ControllerAuthorization(authorizeAttributeCache, authorizationContextFactory, RouteTable.Routes));

            Current.Register<INavigationItemAuthorization, IControllerAuthorization, IUrlAuthorization>((controllerAuthorization, urlAuthorization) =>
                new NavigationItemAuthorization(controllerAuthorization, urlAuthorization));
        }
        
        private static void RegisterComponentDependencies()
        {
            Current.Register<IClientSideObjectWriterFactory>(() => new ClientSideObjectWriterFactory());
        }
        
        static void RegisterCacheDependencies()
        {
            Current.Register<ICacheProvider>(() => new CacheProvider());
            Current.Register<ICacheFactory, ICacheProvider>((provider) => new CacheFactory(IsDebug, provider));
            Current.Register<IControllerTypeCache, ICacheFactory>((cacheFactory) => new ControllerTypeCache(cacheFactory.Create("controllerType")));
            Current.Register<IActionMethodCache, ICacheFactory, IControllerTypeCache>((cacheFactory, controllerTypeCache) =>
                new ActionMethodCache(cacheFactory.Create("actionMethod"), controllerTypeCache));
            Current.Register<IAuthorizeAttributeCache, ICacheFactory, IControllerTypeCache, IActionMethodCache>((cacheFactory, controllerTypeCache, actionMethodCache) =>
                new AuthorizeAttributeCache(cacheFactory.Create("authorizeAttribute"), controllerTypeCache, actionMethodCache));
            Current.Register<IControllerContextCache, ICacheFactory, IControllerTypeCache>((cacheFactory, controllerTypeCache) => 
                new ControllerContextCache(cacheFactory.Create("controllerContext"), controllerTypeCache));
            Current.Register<IControllerDescriptorCache, ICacheFactory, IControllerTypeCache>((cacheFactory, controllerTypeCache) => 
                new ControllerDescriptorCache(cacheFactory.Create("controllerDescriptor"), controllerTypeCache));
            Current.Register<IAuthorizationContextCache, ICacheFactory, IControllerContextCache, IControllerDescriptorCache>((cacheFactory, controllerContextCache, controllerDescriptorCache) => 
                new AuthorizationContextCache(cacheFactory.Create("authorizeContext"), controllerContextCache, controllerDescriptorCache));
        }
    }
}
