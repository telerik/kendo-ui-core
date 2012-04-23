namespace Telerik.Web.Mvc.UnitTest.Menu
{
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class ComboBoxFilterSettingsBuilderTests
    {
        private readonly ComboBoxFilterSettings settings;
        private readonly ComboBoxFilterSettingsBuilder builder;

        public ComboBoxFilterSettingsBuilderTests()
        {
            settings = new ComboBoxFilterSettings();
            builder = new ComboBoxFilterSettingsBuilder(settings);
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
            Assert.IsType(typeof(ComboBoxFilterSettingsBuilder), sameBuilder);
        }

        [Fact]
        public void Builder_should_set_FilterMode_property_and_enable_filtering()
        {
            builder.FilterMode(AutoCompleteFilterMode.StartsWith);
            Assert.Equal(AutoCompleteFilterMode.StartsWith, settings.FilterMode);
            Assert.True(settings.Enabled);
        }

        [Fact]
        public void FilterMode_method_should_return_builder()
        {
            var sameBuilder = builder.FilterMode(AutoCompleteFilterMode.StartsWith);
            Assert.IsType(typeof(ComboBoxFilterSettingsBuilder), sameBuilder);
        }

        [Fact]
        public void Builder_should_set_MinimumChars_property_and_enable_filtering()
        {
            builder.MinimumChars(2);
            Assert.Equal(2, settings.MinimumChars);
            Assert.True(settings.Enabled);
        }

        [Fact]
        public void MinimumChars_method_should_return_builder()
        {
            var sameBuilder = builder.MinimumChars(1);
            Assert.IsType(typeof(ComboBoxFilterSettingsBuilder), sameBuilder);
        }
    }
}
