namespace Telerik.Web.Mvc.UnitTest.Menu
{
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class AutoCompleteMultipleValuesSettingsBuilderTests
    {
        private readonly AutoCompleteMultipleValuesSettings settings;
        private readonly AutoCompleteMultipleValuesSettingsBuilder builder;

        public AutoCompleteMultipleValuesSettingsBuilderTests()
        {
            settings = new AutoCompleteMultipleValuesSettings();
            builder = new AutoCompleteMultipleValuesSettingsBuilder(settings);
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
            Assert.IsType(typeof(AutoCompleteMultipleValuesSettingsBuilder), sameBuilder);
        }

        [Fact]
        public void Builder_should_set_Separator_property_and_enable_multiple_selection()
        {
            const string separator = " ";

            builder.Separator(separator);
            Assert.Equal(separator, settings.Separator);
            Assert.True(settings.Enabled);
        }

        [Fact]
        public void MinimumChars_method_should_return_builder()
        {
            var sameBuilder = builder.Separator(" ");
            Assert.IsType(typeof(AutoCompleteMultipleValuesSettingsBuilder), sameBuilder);
        }
    }
}
