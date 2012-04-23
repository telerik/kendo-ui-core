namespace Telerik.Web.Mvc.UI.Fluent
{
    using Xunit;

    public class TreeViewDataBindingConfigurationBuilderTests
    {
        private TreeViewDataBindingConfiguration settings;
        private TreeViewDataBindingConfigurationBuilder builder;

        public TreeViewDataBindingConfigurationBuilderTests()
        {
            settings = new TreeViewDataBindingConfiguration();
            builder = new TreeViewDataBindingConfigurationBuilder(settings);
        }

        [Fact]
        public void Ajax_should_enabled_ajax_property()
        {
            builder.Ajax();

            Assert.True(settings.Ajax.Enabled);
        }

        [Fact]
        public void WebService_should_enabled_webservice_property()
        {
            builder.WebService();

            Assert.True(settings.WebService.Enabled);
        }
    }
}
