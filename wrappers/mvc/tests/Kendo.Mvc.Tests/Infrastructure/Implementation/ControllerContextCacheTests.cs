namespace Kendo.Mvc.Infrastructure.Implementation.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Reflection;
    using System.Web.Routing;
    using Xunit;

    public class ControllerContextCacheTests
    {
        private readonly IControllerTypeCache controllerTypeCache;
        private readonly IControllerContextCache controllerContextCache;
        private readonly RequestContext requestContext;

        public ControllerContextCacheTests()
        {
            requestContext = TestHelper.CreateRequestContext();
            controllerTypeCache = new ControllerTypeCache(new NoCache())
            {
                ReferencedAssemblies = (() => new List<Assembly> { GetType().Assembly })
            };

            controllerContextCache = new ControllerContextCache(new NoCache(), controllerTypeCache);
        }

        [Fact]
        public void GetControllerContext_should_return_null_if_no_such_controller()
        {
            var context = controllerContextCache.GetControllerContext(requestContext, "Fake", "");

            context.ShouldBeNull();
        }
    }
}