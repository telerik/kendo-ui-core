

namespace KendoUI.Mvc.Infrastructure.Implementation.Tests
{
    using System.Collections.Generic;
    using System.Reflection;
    using System.Web.Routing;

    using Moq;
    using Xunit;

    using System;
    using System.Web.Mvc;

    public class AuthorizationContextCacheTests
    {
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

            controllerContextCache = new ControllerContextCache(new NoCache(), controllerTypeCache);
            controllerDescriptorCache = new ControllerDescriptorCache(new NoCache(), controllerTypeCache);
            authorizationContextCache = new AuthorizationContextCache(new NoCache(), controllerContextCache, controllerDescriptorCache);
        }

        [Fact]
        public void GetAuthorizationContext_should_return_null_if_no_such_controller()
        {
            var context = authorizationContextCache.GetAuthorizationContext(requestContext, "fake", "", null);

            context.ShouldBeNull();
        }
    }
}