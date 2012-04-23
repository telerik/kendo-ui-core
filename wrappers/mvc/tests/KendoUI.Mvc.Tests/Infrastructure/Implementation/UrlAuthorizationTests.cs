// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using System;

    using Xunit;

    public class UrlAuthorizationTests
    {
        private readonly UrlAuthorization _urlAuthorization;

        public UrlAuthorizationTests()
        {
            _urlAuthorization = new UrlAuthorization();
        }

        [Fact]
        public void IsAccessibleToUser_should_throw_exception_when_not_running_in_web_Server()
        {
            Assert.Throws<ArgumentNullException>(() => _urlAuthorization.IsAccessibleToUser(TestHelper.CreateRequestContext(), "~/Faq"));
        }
    }
}