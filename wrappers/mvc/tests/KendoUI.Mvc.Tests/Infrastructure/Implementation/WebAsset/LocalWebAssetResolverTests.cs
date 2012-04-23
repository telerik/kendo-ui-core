namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Moq;
    using System.Linq;
    using Xunit;

    public class LocalWebAssetResolverTests
    {
        private LocalWebAssetResolver resolver;
        private Mock<IWebAssetLocator> locator;
        
        public LocalWebAssetResolverTests()
        {
            locator = new Mock<IWebAssetLocator>();
        }

        [Fact]
        public void Should_locate_the_source()
        {
            string source = "foo";

            resolver = new LocalWebAssetResolver(new WebAsset(source), locator.Object);

            locator.Setup(l => l.Locate(source, null));

            resolver.Resolve(new ResolverContext());

            locator.VerifyAll();
        }

        [Fact]
        public void Should_return_located_source()
        {
            string source = "foo";

            resolver = new LocalWebAssetResolver(new WebAsset(source), locator.Object);

            locator.Setup(l => l.Locate(source, null)).Returns(source);

            var result = resolver.Resolve(new ResolverContext());

            Assert.Equal(1, result.Count());
            Assert.Equal(source, result.ElementAt(0));
        }
    }
}
