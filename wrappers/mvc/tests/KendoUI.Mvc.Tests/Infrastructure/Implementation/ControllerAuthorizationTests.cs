

namespace KendoUI.Mvc.Infrastructure.Implementation.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Security.Principal;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Routing;

    using Moq;
    using Xunit;

    public class ControllerAuthorizationTests
    {
        private readonly Mock<AuthorizationContext> _authorizationContext;
        private readonly Mock<IAuthorizeAttributeCache> _authorizeAttributeCache;
        private readonly Mock<IAuthorizationContextCache> _authorizationContextCache;
        private readonly ControllerAuthorization _controllerAuthorization;

        public ControllerAuthorizationTests()
        {
            _authorizationContext = new Mock<AuthorizationContext>();
            _authorizeAttributeCache = new Mock<IAuthorizeAttributeCache>();
            _authorizationContextCache = new Mock<IAuthorizationContextCache>();
            RouteCollection routes = new RouteCollection();
            TestHelper.RegisterDummyRoutes(routes);

            _controllerAuthorization = new ControllerAuthorization(_authorizeAttributeCache.Object, _authorizationContextCache.Object, routes);
        }

        [Fact]
        public void IsAccessibleToUser_should_return_true_if_AuthorizationContext_Result_is_null()
        {
            Mock<AuthorizeAttribute> decoratedActionAttribute = new Mock<AuthorizeAttribute>();
            Mock<AuthorizeAttribute> decoratedControllerAttribute = new Mock<AuthorizeAttribute>();

            IList<AuthorizeAttribute> attributes = new List<AuthorizeAttribute>
                                                       {
                                                           decoratedActionAttribute.Object,
                                                           decoratedControllerAttribute.Object
                                                       };



            _authorizeAttributeCache.Setup(c => c.GetAuthorizeAttributes(It.IsAny<RequestContext>(), It.IsAny<string>(), It.IsAny<string>(), null)).Returns(attributes);
            _authorizationContextCache.Setup(c => c.GetAuthorizationContext(It.IsAny<RequestContext>(), It.IsAny<string>(), It.IsAny<string>(), null)).Returns(_authorizationContext.Object);

            Assert.True(_controllerAuthorization.IsAccessibleToUser(TestHelper.CreateRequestContext(), "Default"));
        }

        [Fact]
        public void IsAccessibleToUser_should_return_false_if_OnAuthorization_result_is_HttpUnauthorizedResult()
        {
            Mock<AuthorizeAttribute> decoratedActionAttribute = new Mock<AuthorizeAttribute>();
            Mock<AuthorizeAttribute> decoratedControllerAttribute = new Mock<AuthorizeAttribute>();

            IList<AuthorizeAttribute> attributes = new List<AuthorizeAttribute>
                                                       {
                                                           decoratedActionAttribute.Object,
                                                           decoratedControllerAttribute.Object
                                                       };


            var context = _authorizationContext.Object;

            _authorizeAttributeCache.Setup(c => c.GetAuthorizeAttributes(It.IsAny<RequestContext>(), It.IsAny<string>(), It.IsAny<string>(), null)).Returns(attributes);
            _authorizationContextCache.Setup(c => c.GetAuthorizationContext(It.IsAny<RequestContext>(), It.IsAny<string>(), It.IsAny<string>(), null)).Returns(context);

            context.Result = new HttpUnauthorizedResult();

            Assert.False(_controllerAuthorization.IsAccessibleToUser(TestHelper.CreateRequestContext(), "Default"));
        }
    }
}