

namespace KendoUI.Mvc.Infrastructure.Implementation.Tests
{
    using System.Collections.Generic;
    using System.Reflection;
    using System.Web.Routing;

    using Moq;
    using Xunit;

    using System;
    using System.Web.Mvc;

    public class ControllerDescriptorCacheTests
    {
        private readonly IControllerTypeCache controllerTypeCache;
        private readonly IControllerDescriptorCache controllerDescriptorCache;

        public ControllerDescriptorCacheTests()
        {
            controllerTypeCache = new ControllerTypeCache(new NoCache())
            {
                ReferencedAssemblies = (() => new List<Assembly> { GetType().Assembly })
            };

            controllerDescriptorCache = new ControllerDescriptorCache(new NoCache(), controllerTypeCache);
        }

        [Fact]
        public void GetControllerDescriptor_should_return_correct_controller_context()
        {
            var controllerName = "Home";
            var descriptor = controllerDescriptorCache.GetControllerDescriptor(controllerName, "");

            descriptor.ShouldBeType(typeof(ReflectedControllerDescriptor));
            descriptor.ControllerName.ShouldEqual(controllerName);
            descriptor.ControllerType.ShouldEqual(typeof(HomeController));
        }

        [Fact]
        public void GetControllerDescriptor_should_return_correct_controller_context_for_area_controller()
        {
            var controllerName = "Home";
            var descriptor = controllerDescriptorCache.GetControllerDescriptor(controllerName, "Test1");

            descriptor.ShouldBeType(typeof(ReflectedControllerDescriptor));
            descriptor.ControllerName.ShouldEqual(controllerName);
            descriptor.ControllerType.ShouldEqual(typeof(KendoUI.Mvc.Infrastructure.Implementation.Areas.Test1.HomeController));
        }

        [Fact]
        public void GetControllerDescriptor_should_return_null_if_no_such_controller()
        {
            var context = controllerDescriptorCache.GetControllerDescriptor("Fake", "");

            context.ShouldBeNull();
        }
    }
}