namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Moq;
    using Xunit;

    public class WebAssetResolverFactoryTests
    {
        private WebAssetResolverFactory factory;
        private Mock<IWebAssetChecker> checker;
        private Mock<IWebAssetLocator> locator;
        private Mock<IWebAssetGroupSerializer> serializer;

        public WebAssetResolverFactoryTests()
	    {
            checker = new Mock<IWebAssetChecker>();
            serializer = new Mock<IWebAssetGroupSerializer>();
            locator = new Mock<IWebAssetLocator>();
            factory = new WebAssetResolverFactory(checker.Object, locator.Object, serializer.Object);
	    }

        [Fact]
        public void Should_create_local_resolver()
        {
            Assert.IsType<LocalWebAssetResolver>(factory.Create(new WebAsset("foo.js")));
        }

        [Fact]
        public void Should_create_cdn_resolver_if_cdn_is_enabled_and_the_file_is_native()
        {
            checker.Setup(c => c.IsNative(It.IsAny<WebAsset>())).Returns(true);

            WebAsset asset = new WebAsset("foo.js");
            asset.UseTelerikContentDeliveryNetwork = true;
            Assert.IsType<CdnWebAssetResolver>(factory.Create(asset));
        }
        
        [Fact]
        public void Should_create_local_resolver_if_cdn_is_disabled_and_the_file_is_native()
        {
            checker.Setup(c => c.IsNative(It.IsAny<WebAsset>())).Returns(true);

            Assert.IsType<LocalWebAssetResolver>(factory.Create(new WebAsset("foo.js")));
        }
        
        [Fact]
        public void Should_create_absolute_resolver_if_asset_is_absolute()
        {
            checker.Setup(c => c.IsAbsolute(It.IsAny<WebAsset>())).Returns(true);

            Assert.IsType<AbsoluteWebAssetResolver>(factory.Create(new WebAsset("foo.js")));
        }        
        
        [Fact]
        public void Absolute_takes_precedense_over_native()
        {
            checker.Setup(c => c.IsAbsolute(It.IsAny<WebAsset>())).Returns(true);
            checker.Setup(c => c.IsNative(It.IsAny<WebAsset>())).Returns(true);

            Assert.IsType<AbsoluteWebAssetResolver>(factory.Create(new WebAsset("foo.js")));
        }

        [Fact]
        public void CreateResolver_returns_CombinedWebAssetItemGroupResolver_if_group_is_combined()
        {
            var group = new WebAssetGroup("default", false);
            group.Combined = true;

            Assert.IsType<CombinedWebAssetGroupResolver>(factory.Create(group));
        }

        [Fact]
        public void CreateResolver_returns_WebAssetItemGroupResolver()
        {
            var group = new WebAssetGroup("default", false);
            Assert.IsType<WebAssetGroupResolver>(factory.Create(group));
        }

    }
}
