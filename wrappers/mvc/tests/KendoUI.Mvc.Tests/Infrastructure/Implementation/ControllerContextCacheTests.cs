// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace KendoUI.Mvc.Infrastructure.Implementation.Tests
{
    using System.Collections.Generic;
    using System.Reflection;
    using System.Web.Routing;

    using Moq;
    using Xunit;

    using System;
    using System.Web.Mvc;

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