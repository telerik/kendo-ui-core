namespace Kendo.Mvc.Infrastructure.Implementation.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Reflection;
    using System.Web.Routing;
    using Xunit;

    public class AuthorizationContextCacheTests
    {
        private readonly IRouteDataCache routeDataCache;
        private readonly IControllerTypeCache controllerTypeCache;
        private readonly IControllerContextCache controllerContextCache;
        private readonly IControllerDescriptorCache controllerDescriptorCache;
        private readonly IAuthorizationContextCache authorizationContextCache;
        private readonly RequestContext requestContext;

        public AuthorizationContextCacheTests()
        {
            requestContext = TestHelper.CreateRequestContext();
            controllerTypeCache = new ControllerTypeCache(new NoCache())
            {
                ReferencedAssemblies = (() => new List<Assembly> { GetType().Assembly })
            };

            routeDataCache = new RouteDataCache(new NoCache());
            controllerContextCache = new ControllerContextCache(new NoCache(), controllerTypeCache);
            controllerDescriptorCache = new ControllerDescriptorCache(new NoCache(), controllerTypeCache);
            authorizationContextCache = new AuthorizationContextCache(new NoCache(), controllerContextCache, controllerDescriptorCache, routeDataCache);
        }

        [Fact]
        public void GetAuthorizationContext_should_return_null_if_no_such_controller()
        {
            var context = authorizationContextCache.GetAuthorizationContext(requestContext, "fake", "", null);

            context.ShouldBeNull();
        }

        [Fact]
        public void GetAuthorizationContext_should_not_change_requestContext_if_no_RouteData_found()
        {
            var routeData = requestContext.RouteData;

            authorizationContextCache.GetAuthorizationContext(requestContext, "fake", "", new RouteValueDictionary(new { area = "Area1" }));

            requestContext.RouteData.ShouldEqual(routeData);
        }
    }
}