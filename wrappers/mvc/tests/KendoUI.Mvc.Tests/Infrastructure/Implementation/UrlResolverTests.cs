

namespace KendoUI.Mvc.Infrastructure.Implementation.Tests
{
    using System;
    using Xunit;

    public class UrlResolverTests
    {
        private readonly UrlResolver _resolver;

        public UrlResolverTests()
        {
            _resolver = new UrlResolver();
        }

        [Fact]
        public void Resolve_should_throw_excepton_when_not_running_in_web_server()
        {
            Assert.Throws<ArgumentNullException>(() => _resolver.Resolve("~/scripts/jquery-1.3.2.min.js"));
        }
    }
}