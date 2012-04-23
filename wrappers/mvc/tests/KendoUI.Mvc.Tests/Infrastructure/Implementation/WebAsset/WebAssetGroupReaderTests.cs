namespace Telerik.Web.Mvc.Infrastructure.Implementation.Tests
{
    using Moq;
    using System;
    using Telerik.Web.Mvc.Extensions;
    using Xunit;

    public class WebAssetGroupReaderTests
    {
        private readonly WebAssetGroupReader reader;
        private readonly Mock<IWebAssetLocator> locator;
        private readonly Mock<IVirtualPathProvider> provider;
        private readonly Mock<IWebAssetContentFilter> filter;

        public WebAssetGroupReaderTests()
        {
            locator = new Mock<IWebAssetLocator>();
            provider = new Mock<IVirtualPathProvider>();
            filter = new Mock<IWebAssetContentFilter>();

            reader = new WebAssetGroupReader(locator.Object, provider.Object, filter.Object);
        }

        [Fact]
        public void Should_locate_the_assets()
        {
            var group = ArrangeGroup("foo");

            locator.Setup(l => l.Locate(group.Items[0].Source, group.Version));

            reader.Read(group);

            locator.VerifyAll();
        }
        
        [Fact]
        public void Should_read_all_text()
        {
            var group = ArrangeGroup("foo");
            
            string path = "path_to_asset";
            
            locator.Setup(l => l.Locate(group.Items[0].Source, group.Version)).Returns(path);

            provider.Setup(p => p.ReadAllText(path));

            reader.Read(group);

            provider.VerifyAll();
        }

        [Fact]
        public void Should_return_merged_asset_contents()
        {
            var content = new[] { "one", "two" };
            var index = 0;
            
            var group = ArrangeGroup("foo", "bar");

            locator.Setup(l => l.Locate(It.IsAny<string>(), It.IsAny<string>()));
            
            provider.Setup(p => p.ReadAllText(It.IsAny<string>())).Returns(() => content[index]).Callback(() => index++);
                
            Assert.Equal("one" + Environment.NewLine + "two" + Environment.NewLine, reader.Read(group));
        }

        [Fact]
        public void Should_check_if_the_filter_applies_to_the_group()
        {
            var group = ArrangeGroup();
            group.ContentType = "text/css";

            filter.Setup(f => f.AppliesTo(group.ContentType));

            reader.Read(group);

            filter.Verify(f => f.AppliesTo(group.ContentType), Times.Exactly(1));
        }        
        
        [Fact]
        public void Should_filter_if_filter_applies_to()
        {
            var group = ArrangeGroup("foo");
            group.ContentType = "text/css";

            filter.Setup(f => f.AppliesTo(group.ContentType)).Returns(true);
            
            provider.Setup(p => p.GetDirectory(It.IsAny<string>())).Returns("foo");
            
            filter.Setup(f => f.Filter("foo", It.IsAny<string>()));
            
            reader.Read(group);

            filter.VerifyAll();
        }        
        
        [Fact]
        public void Should_not_filter_if_filter_does_not_applies_to()
        {
            var group = ArrangeGroup("foo");

            filter.Setup(f => f.AppliesTo(It.IsAny<string>())).Returns(false);
            filter.Setup(f => f.Filter(It.IsAny<string>(), It.IsAny<string>()));
            
            reader.Read(group);

            filter.Verify(f => f.Filter(It.IsAny<string>(), It.IsAny<string>()), Times.Never());
        }

        private WebAssetGroup ArrangeGroup(params string[] sources)
        {
            var group = new WebAssetGroup("", false);
            
            sources.Each(source => group.Items.Add(new WebAsset(source)));
            
            return group;
        }
    }
}
