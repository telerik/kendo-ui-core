// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Xunit;

    public class PathResolverTests
    {
        private readonly PathResolver _pathResolver;

        public PathResolverTests()
        {
            _pathResolver = new PathResolver();
        }

        [Fact]
        public void Resolve_should_return_null_when_not_running_in_web_server()
        {
            Assert.Null(_pathResolver.Resolve("~/assets/scripts/jquery-1.3.2.min.js"));
        }
    }
}