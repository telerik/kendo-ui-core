// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using System.Collections.Generic;
    using System.Reflection;
    using System.Web.Routing;

    using Moq;
    using Xunit;

using System;

    public class ActionMethodCacheTests
    {
        private readonly Mock<IControllerTypeCache> controllerTypeCache;
        private readonly ActionMethodCache actionMethodCache;

        public ActionMethodCacheTests()
        {
            controllerTypeCache = new Mock<IControllerTypeCache>();
            actionMethodCache = new ActionMethodCache(new NoCache(), controllerTypeCache.Object);
        }

        [Fact]
        public void GetActionMethods_should_return_correct_action_methods()
        {
            controllerTypeCache.Setup(c => c.GetControllerTypes(It.IsAny<RequestContext>(), It.IsAny<string>())).Returns(new List<Type> { typeof(HomeController)} );

            IDictionary<string, IList<MethodInfo>> actionMethods = actionMethodCache.GetAllActionMethods(TestHelper.CreateRequestContext(), "Home");

            Assert.True(actionMethods.ContainsKey("Index"));
        }
    }
}