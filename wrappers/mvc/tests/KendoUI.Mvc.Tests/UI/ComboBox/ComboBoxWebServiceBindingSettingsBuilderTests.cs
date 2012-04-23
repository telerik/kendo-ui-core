namespace Telerik.Web.Mvc.UnitTest.Menu
{
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;

    using Xunit;
    using System.Web.Mvc;
    using System.Web.Routing;

    public class ComboBoxWebServiceBindingSettingsBuilderTests
    {
        private readonly AutoCompleteBindingSettings settings;
        private readonly AutoCompleteWebServiceBindingSettingsBuilder builder;

        public ComboBoxWebServiceBindingSettingsBuilderTests()
        {
            settings = new AutoCompleteBindingSettings();
            builder = new AutoCompleteWebServiceBindingSettingsBuilder(settings);
        }

        [Fact]
        public void Builder_should_set_Enabled_property()
        {
            const bool enabled = true;

            builder.Enabled(enabled);
            Assert.Equal(enabled, settings.Enabled);
        }

        [Fact]
        public void Enabled_method_should_return_builder()
        {
            var sameBuilder = builder.Enabled(false);
            Assert.IsType(typeof(AutoCompleteWebServiceBindingSettingsBuilder), sameBuilder);
        }


        [Fact]
        public void Builder_should_set_Cache_property()
        {
            const bool cached = true;

            builder.Cache(cached);
            Assert.Equal(cached, settings.Cache);
        }

        [Fact]
        public void Cache_method_should_return_builder()
        {
            var sameBuilder = builder.Cache(false);
            Assert.IsType(typeof(AutoCompleteWebServiceBindingSettingsBuilder), sameBuilder);
        }

        [Fact]
        public void Builder_should_set_Delay_property()
        {
            const int delay = 400;

            builder.Delay(delay);
            Assert.Equal(delay, settings.Delay);
        }

        [Fact]
        public void Delay_method_should_return_builder()
        {
            var sameBuilder = builder.Delay(400);
            Assert.IsType(typeof(AutoCompleteWebServiceBindingSettingsBuilder), sameBuilder);
        }

        [Fact]
        public void Builder_should_set_Select_properties()
        {
            string url = "url";

            builder.Select(url);

            Assert.Equal(url, settings.Select.Url);
        }

        [Fact]
        public void Select_method_should_return_builder()
        {
            string url = "url";

            var sameBuilder = builder.Select(url);
            Assert.IsType(typeof(AutoCompleteWebServiceBindingSettingsBuilder), sameBuilder);
        }
    }
}
