namespace Telerik.Web.Mvc.Configuration.Tests
{
    using Moq;
    using System;
    using Telerik.Web.Mvc.Infrastructure;
    using Xunit;
    
    public class SharedWebAssetTests : IDisposable
    {
        private IConfigurationManager defaultConfigurationManager;
        private WebAssetConfigurationSection section;

        public SharedWebAssetTests()
        {
            defaultConfigurationManager = DI.Current.Resolve<IConfigurationManager>();

            var mockConfigurationManager = new Mock<IConfigurationManager>();
            DI.Current.Register<IConfigurationManager>(() => mockConfigurationManager.Object);
            
            section = new WebAssetConfigurationSection();
            section.StyleSheets.Add(new WebAssetGroupConfigurationElement
            {
                Name = "foo"
            });
            section.Scripts.Add(new WebAssetGroupConfigurationElement
            {
                Name = "bar"
            });
            mockConfigurationManager.Setup(c => c.GetSection<WebAssetConfigurationSection>(It.IsAny<string>())).Returns(section);
        }
        
        [Fact]
        public void Should_return_null_if_stylesheet_group_does_not_exist()
        {
            var group = SharedWebAssets.FindStyleSheetGroup("baz");
            group.ShouldBeNull();
        }        
        
        [Fact]
        public void Should_return_null_if_javascript_group_does_not_exist()
        {
            var group = SharedWebAssets.FindStyleSheetGroup("baz");
            group.ShouldBeNull();
        }

        [Fact]
        public void Should_set_content_type_for_stylesheet_groups()
        {
            var group = SharedWebAssets.FindStyleSheetGroup("foo");

            group.ContentType.ShouldEqual("text/css");
        }
        
        [Fact]
        public void Should_set_content_type_for_javascript_groups()
        {
            var group = SharedWebAssets.FindScriptGroup("bar");

            group.ContentType.ShouldEqual("text/javascript");
        }

        public void Dispose()
        {
            DI.Current.Register<IConfigurationManager>(() => defaultConfigurationManager);
        }
    }
}
