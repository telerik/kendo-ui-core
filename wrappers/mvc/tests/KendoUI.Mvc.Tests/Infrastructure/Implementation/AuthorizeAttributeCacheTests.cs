// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

using System.Collections.Generic;

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using System;
    using System.Linq;
    using System.Reflection;
    using System.Web.Mvc;
    using System.Web.Routing;

    using Moq;
    using Xunit;

    public class AuthorizeAttributeCacheTests
    {
        private readonly Mock<IControllerTypeCache> controllerTypeCache;
        private readonly Mock<IActionMethodCache> actionMethodCache;

        private readonly AuthorizeAttributeCache authorizeAttributeCache;

        public AuthorizeAttributeCacheTests()
        {
            Func<string, Type> getType = name =>
                                         {
                                             Type t = Type.GetType("Telerik.Web.Mvc.Infrastructure.Implementation.Tests." + name + "Controller", false, true);

                                             return t;
                                         };

            controllerTypeCache = new Mock<IControllerTypeCache>();
            controllerTypeCache.Setup(c => c.GetControllerTypes(It.IsAny<string>())).Returns((string t) => new List<Type>{ getType(t)});

            actionMethodCache = new Mock<IActionMethodCache>();
            actionMethodCache.Setup(c => c.GetAllActionMethods(It.IsAny<RequestContext>(), It.IsAny<string>())).Returns((RequestContext r, string c) => getType(c).GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly).ToDictionary(m => m.Name, m => new List<MethodInfo>{ m } as IList<MethodInfo>));

            actionMethodCache.Setup(c => c.GetAllActionMethods(It.IsAny<Type>())).Returns((Type t) => t.GetMethods(BindingFlags.Instance | BindingFlags.Public | BindingFlags.DeclaredOnly).ToDictionary(m => m.Name, m => new List<MethodInfo> { m } as IList<MethodInfo>));

            authorizeAttributeCache = new AuthorizeAttributeCache(new NoCache(), controllerTypeCache.Object, actionMethodCache.Object);
        }

        [Fact]
        public void GetAuthorizeAttributes_should_return_correct_attribute_from_action_method()
        {
            AuthorizeAttribute attribute = authorizeAttributeCache.GetAuthorizeAttributes(TestHelper.CreateRequestContext(), "Product", "Detail", null).ElementAt(0);

            Assert.Equal("Mort, Elvis, Einstein", attribute.Users);
        }

        [Fact]
        public void GetAuthorizeAttributes_should_return_correct_users_from_controller()
        {
            AuthorizeAttribute attribute = authorizeAttributeCache.GetAuthorizeAttributes(TestHelper.CreateRequestContext(), "Home", "Index", null).ElementAt(0);

            Assert.Equal("Mort, Elvis, Einstein", attribute.Users);
        }

        [Fact]
        public void GetAuthorizeAttributes_should_return_correct_roles_from_namespaced_controller()
        {
            controllerTypeCache.Setup(c => c.GetControllerTypes(It.IsAny<string>())).Returns((string t) => new List<Type>{ Type.GetType("Telerik.Web.Mvc.Infrastructure.Implementation.Tests.DummyNamespace." + t + "Controller", false, true) });

            RequestContext context = TestHelper.CreateRequestContext();
            context.RouteData.DataTokens.Add("Namespaces", new[] { "Telerik.Web.Mvc.Infrastructure.Implementation.Tests.DummyNamespace" });

            AuthorizeAttribute attribute = authorizeAttributeCache.GetAuthorizeAttributes(context, "DuplicateName", "AMethod", null).ElementAt(0);

            Assert.Equal("User, Power User, Admin", attribute.Roles);
        }

        [Fact]
        public void GetAuthorizeAttributes_should_not_throw_exception_if_controller()
        {
            controllerTypeCache.Setup(c => c.GetControllerTypes(It.IsAny<string>())).Returns((string t) => null);

            Assert.DoesNotThrow(() => authorizeAttributeCache.GetAuthorizeAttributes(TestHelper.CreateRequestContext(), "NotExistingController", "Detail", null));
        }

        [Fact]
        public void GetAuthorizeAttributes_should_return_correct_action_attribute_from_area_controller()
        {
            List<Type> list = new List<Type> { 
                typeof(Telerik.Web.Mvc.Infrastructure.Implementation.Areas.Test1.AreaController),
                typeof(Telerik.Web.Mvc.Infrastructure.Implementation.Areas.Test1.AreaController)
            };

            controllerTypeCache.Setup(c => c.GetControllerTypes(It.IsAny<string>())).Returns((string t) => list);

            RouteValueDictionary routeValues = new RouteValueDictionary();
            routeValues.Add("Area", "Test1");

            AuthorizeAttribute attribute = authorizeAttributeCache.GetAuthorizeAttributes(TestHelper.CreateRequestContext(), "Area", "AMethod", routeValues).ElementAt(0);

            Assert.Equal("Mort, Elvis, Einstein", attribute.Users);
        }

        [Fact]
        public void GetAuthorizeAttributes_should_return_null_if_there_are_duplicated_methods_in_different_areas_and_the_second_method_does_not_have_attribute()
        {
            List<Type> list = new List<Type> { 
                typeof(Telerik.Web.Mvc.Infrastructure.Implementation.Areas.Test1.AreaController),
                typeof(Telerik.Web.Mvc.Infrastructure.Implementation.Areas.Test1.AreaController)
            };

            controllerTypeCache.Setup(c => c.GetControllerTypes(It.IsAny<string>())).Returns((string t) => list);

            RouteValueDictionary routeValues = new RouteValueDictionary();
            routeValues.Add("Area", "Test2");

            List<AuthorizeAttribute> attributes = authorizeAttributeCache.GetAuthorizeAttributes(TestHelper.CreateRequestContext(), "Area", "AMethod", routeValues).ToList();

            Assert.Equal(0, attributes.Count);
        }
    }
}
