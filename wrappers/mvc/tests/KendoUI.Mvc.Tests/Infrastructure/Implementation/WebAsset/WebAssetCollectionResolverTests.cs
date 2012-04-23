namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Moq;
    using System.Linq;
    using Xunit;

    public class WebAssetCollectionResolverTests
    {
        WebAssetCollectionResolver resolver;
        Mock<IWebAssetLocator> locator;
        Mock<IUrlResolver> urlResolver;
        Mock<IWebAssetResolverFactory> resolverFactory;
        
        public WebAssetCollectionResolverTests()
        {
            locator = new Mock<IWebAssetLocator>();
            urlResolver = new Mock<IUrlResolver>();
            resolverFactory = new Mock<IWebAssetResolverFactory>();
            
            resolver = new WebAssetCollectionResolver(urlResolver.Object, resolverFactory.Object);
        }
        
        [Fact]
        public void Should_not_add_what_empty_result_returned_by_asset_resolver()
        {
            var asset = ArrangeAsset(new string[0]);

            var result = resolver.Resolve(new ResolverContext(), new WebAssetCollection("~/Scripts") { asset.Object });

            Assert.Equal(0, result.Count());
        }
        
        [Fact]
        public void Should_not_return_duplicates()
        {
            var asset = ArrangeAsset("foo", "foo");

            var result = resolver.Resolve(new ResolverContext(), new WebAssetCollection("~/Scripts") { asset.Object });

            Assert.Equal(1, result.Count());
        }        
        
        [Fact]
        public void Should_not_return_duplicates_with_different_case()
        {
            var asset = ArrangeAsset("foo", "Foo");

            var result = resolver.Resolve(new ResolverContext(), new WebAssetCollection("~/Scripts") { asset.Object });

            Assert.Equal(1, result.Count());
        }

        [Fact]
        public void Should_call_url_resolver()
        {
            var asset = ArrangeAsset("foo");
            urlResolver.Setup(u => u.Resolve("foo")).Returns("bar");

            var result = resolver.Resolve(new ResolverContext(), new WebAssetCollection("~/Scripts") { asset.Object });
            
            Assert.Equal("bar", result.First());
        }

        private Mock<IWebAsset> ArrangeAsset(params string [] resolverResult)
        {
            var assetResolver = new Mock<IWebAssetResolver>();
            
            assetResolver.Setup(ar => ar.Resolve(It.IsAny<ResolverContext>())).Returns(() => resolverResult);
            resolverFactory.Setup(r => r.Create(It.IsAny<IWebAsset>())).Returns(assetResolver.Object);

            var asset = new Mock<IWebAsset>();

            return asset;
        }
    }
}
