namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Moq;
    using System.Linq;
    using Xunit;

    public class CombinedWebAssetGroupResolverTests
    {
        private Mock<IWebAssetResolverFactory> resolverFactory;
        private Mock<IWebAssetChecker> checker;
        private Mock<IWebAssetGroupSerializer> serializer;
        private WebAssetGroup group;
        private CombinedWebAssetGroupResolver resolver;

        public CombinedWebAssetGroupResolverTests()
        {
            checker = new Mock<IWebAssetChecker>();
            serializer = new Mock<IWebAssetGroupSerializer>();
            resolverFactory = new Mock<IWebAssetResolverFactory>();
        }

        [Fact]
        public void Should_check_for_absolute_assets()
        {
            var asset = new WebAsset("foo");
            
            group = new WebAssetGroup("foo", false);
            group.Items.Add(asset);

            checker.Setup(c => c.IsAbsolute(asset));

            resolver = new CombinedWebAssetGroupResolver(group, resolverFactory.Object, checker.Object, serializer.Object);

            resolver.Resolve(new ResolverContext());

            checker.VerifyAll();
        }
        
        [Fact]
        public void Should_check_for_native_assets_when_cdn_is_enabled()
        {
            var asset = new WebAsset("foo");
            
            group = new WebAssetGroup("foo", false);
            group.UseTelerikContentDeliveryNetwork = true;
            group.Items.Add(asset);

            checker.Setup(c => c.IsNative(asset));

            resolver = new CombinedWebAssetGroupResolver(group, resolverFactory.Object, checker.Object, serializer.Object);

            resolver.Resolve(new ResolverContext());

            checker.VerifyAll();
        }
        
        [Fact]
        public void Should_not_check_for_native_assets_when_cdn_is_disabled()
        {
            var asset = new WebAsset("foo");
            
            group = new WebAssetGroup("foo", false);
            group.Items.Add(asset);

            checker.Setup(c => c.IsNative(asset));

            resolver = new CombinedWebAssetGroupResolver(group, resolverFactory.Object, checker.Object, serializer.Object);

            resolver.Resolve(new ResolverContext());

            checker.Verify(c => c.IsNative(asset), Times.Never());
        }
        
        [Fact]
        public void Should_resolve_absolute_assets()
        {
            var asset = new WebAsset("foo");
            
            group = new WebAssetGroup("foo", false);
            group.Items.Add(asset);

            checker.Setup(c => c.IsAbsolute(asset)).Returns(true);
            resolverFactory.Setup(f => f.Create(asset)).Returns(new Mock<IWebAssetResolver>().Object);

            resolver = new CombinedWebAssetGroupResolver(group, resolverFactory.Object, checker.Object, serializer.Object);

            resolver.Resolve(new ResolverContext());

            resolverFactory.VerifyAll();
        }
        
        [Fact]
        public void Should_resolve_native_assets()
        {
            var asset = new WebAsset("foo");
            
            group = new WebAssetGroup("foo", false);
            group.UseTelerikContentDeliveryNetwork = true;
            group.Items.Add(asset);

            checker.Setup(c => c.IsNative(asset)).Returns(true);
            resolverFactory.Setup(f => f.Create(asset)).Returns(new Mock<IWebAssetResolver>().Object);

            resolver = new CombinedWebAssetGroupResolver(group, resolverFactory.Object, checker.Object, serializer.Object);

            resolver.Resolve(new ResolverContext());

            resolverFactory.VerifyAll();
        }        
        
        [Fact]
        public void Should_append_asset_handler_path()
        {
            var asset = new WebAsset("foo");
            
            group = new WebAssetGroup("foo", false);
            group.Items.Add(asset);

            serializer.Setup(s => s.Serialize(group)).Returns("bar");

            resolver = new CombinedWebAssetGroupResolver(group, resolverFactory.Object, checker.Object, serializer.Object);

            var result = resolver.Resolve(new ResolverContext
                {
                    HttpHandlerPath = "baz.axd"
                });

            Assert.Equal("baz.axd?" + WebAssetHttpHandler.IdParameterName + "=bar", result.First());
        }        
        
        [Fact]
        public void Should_use_group_name_if_asset_is_shared()
        {
            var asset = new WebAsset("foo");
            
            group = new WebAssetGroup("foo", true);
            group.Items.Add(asset);

            resolver = new CombinedWebAssetGroupResolver(group, resolverFactory.Object, checker.Object, serializer.Object);

            var result = resolver.Resolve(new ResolverContext
                {
                    HttpHandlerPath = "baz.axd"
                });

            Assert.Equal("baz.axd?" + WebAssetHttpHandler.IdParameterName + "=foo", result.First());
        }

        [Fact]
        public void Should_return_empty_result_if_group_is_empty()
        {
            group = new WebAssetGroup("foo", true);

            resolver = new CombinedWebAssetGroupResolver(group, resolverFactory.Object, checker.Object, serializer.Object);

            var result = resolver.Resolve(new ResolverContext());

            Assert.Empty(result);
        }

        [Fact]
        public void Should_set_the_content_type_of_the_group()
        {
            group = new WebAssetGroup("foo", true);
            
            ResolverContext resolverContext = new ResolverContext
            {
                ContentType = "text/javascript"
            };
            resolver = new CombinedWebAssetGroupResolver(group, resolverFactory.Object, checker.Object, serializer.Object);
            resolver.Resolve(resolverContext);
            Assert.Equal(group.ContentType, resolverContext.ContentType);
        }
    }
}