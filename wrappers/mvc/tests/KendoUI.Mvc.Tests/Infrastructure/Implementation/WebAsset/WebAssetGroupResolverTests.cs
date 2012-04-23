namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Moq;
    using System.Linq;
    using Telerik.Web.Mvc.Extensions;
    using Xunit;

    public class WebAssetGroupResolverTests
    {
        private WebAssetGroupResolver resolver;
        private Mock<IWebAssetResolverFactory> factory;
        private Mock<IWebAssetResolver> assetResolver;

        public WebAssetGroupResolverTests()
        {
            assetResolver = new Mock<IWebAssetResolver>();

            factory = new Mock<IWebAssetResolverFactory>();

            factory.Setup(f => f.Create(It.IsAny<WebAsset>())).Returns(assetResolver.Object);
        }

        [Fact]
        public void Should_resolve_the_web_asset_items()
        {
            var expected = "foo";
            var group = ArrangeGroup(expected);

            resolver = new WebAssetGroupResolver(group, factory.Object);

            resolver.Resolve(new ResolverContext());

            factory.VerifyAll();
        }

        [Fact]
        public void Should_return_resolved_asset_items()
        {
            var first = "foo";

            var group = ArrangeGroup(first);

            resolver = new WebAssetGroupResolver(group, factory.Object);

            assetResolver.Setup(r => r.Resolve(It.IsAny<ResolverContext>())).Returns(new[] { first });

            var result = resolver.Resolve(new ResolverContext());
            
            Assert.Equal(1, result.Count());
            Assert.Equal(first, result.ElementAt(0));
        }
        
        [Fact]
        public void Should_return_empty_list_if_grop_is_disabled()
        {
            var group = ArrangeGroup("foo");
            group.Enabled = false;
            resolver = new WebAssetGroupResolver(group, factory.Object);

            var result = resolver.Resolve(new ResolverContext());

            Assert.False(result.Any());
        }        
        
        [Fact]
        public void Should_prefer_cdn_url()
        {
            var group = ArrangeGroup("foo");
            
            group.ContentDeliveryNetworkUrl = "bar";

            resolver = new WebAssetGroupResolver(group, factory.Object);

            var result = resolver.Resolve(new ResolverContext());

            Assert.Equal(group.ContentDeliveryNetworkUrl, result.ElementAt(0));
            Assert.Equal(1, result.Count());
        }

        private WebAssetGroup ArrangeGroup(params string[] expected)
        {
            var group = new WebAssetGroup("default", false);
            group.Items.AddRange(expected.Select(asset => new WebAsset(asset))
                                         .ToArray());
            return group;
        }

    }
}
