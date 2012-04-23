

namespace KendoUI.Mvc.Infrastructure.Implementation.Tests
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Reflection;
    using System.Web.Routing;

    using Xunit;

    public class ControllerTypeCacheTests
    {
        private readonly ControllerTypeCache _controllerTypeCache;
        public ControllerTypeCacheTests()
        {
            _controllerTypeCache = new ControllerTypeCache(new NoCache())
                                      {
                                          ReferencedAssemblies = (() => new List<Assembly>{ GetType().Assembly })
                                      };
        }

        [Fact]
        public void GetControllerType_should_return_correct_type()
        {
            Type type = _controllerTypeCache.GetControllerTypes(TestHelper.CreateRequestContext(), "Home").FirstOrDefault();

            Assert.Same(typeof(HomeController), type);
        }

        [Fact]
        public void GetControllerType_should_return_all_types_from_different_namespaces()
        {
            var list = _controllerTypeCache.GetControllerTypes(TestHelper.CreateRequestContext(), "Area");

            Assert.Equal(2, list.Count);
        }

        [Fact]
        public void GetControllerType_should_return_all_types_using_only_controller_name()
        {
            var list = _controllerTypeCache.GetControllerTypes("Home");

            Assert.Equal(2, list.Count);
        }

        [Fact]
        public void GetController_with_namespace_should_return_correct_type()
        {
            RequestContext requestContext = TestHelper.CreateRequestContext();

            requestContext.RouteData.DataTokens.Add("Namespaces", new[] { "KendoUI.Mvc.Infrastructure.Implementation.Tests.DummyNamespace" });

            Type type = _controllerTypeCache.GetControllerTypes(requestContext, "DuplicateName").FirstOrDefault();

            Assert.Same(typeof(DummyNamespace.DuplicateNameController), type);
        }
    }
}