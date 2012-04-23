namespace Telerik.Web.Mvc.UI.Fluent.Tests
{
    using Xunit;

    using Telerik.Web.Mvc.UI.Fluent;

    public class ComboBoxDataBindingConfigurationBuilderTests
    {
        private AutoCompleteDataBindingConfiguration settings;
        private AutoCompleteDataBindingConfigurationBuilder builder;

        public ComboBoxDataBindingConfigurationBuilderTests()
        {
            settings = new AutoCompleteDataBindingConfiguration();
            builder = new AutoCompleteDataBindingConfigurationBuilder(settings);
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
