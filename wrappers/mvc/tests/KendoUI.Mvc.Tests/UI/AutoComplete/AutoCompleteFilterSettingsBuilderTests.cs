namespace Telerik.Web.Mvc.UnitTest.Menu
{
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class AutoCompleteFilterSettingsBuilderTests
    {
        private readonly AutoCompleteFilterSettings settings;
        private readonly AutoCompleteFilterSettingsBuilder builder;

        public AutoCompleteFilterSettingsBuilderTests()
        {
            settings = new AutoCompleteFilterSettings();
            builder = new AutoCompleteFilterSettingsBuilder(settings);
        }

        [Fact]
        public void Builder_should_set_FilterMode_property()
        {
            builder.FilterMode(AutoCompleteFilterMode.StartsWith);
            Assert.Equal(AutoCompleteFilterMode.StartsWith, settings.FilterMode);
        }

        [Fact]
        public void FilterMode_method_should_return_builder()
        {
            var sameBuilder = builder.FilterMode(AutoCompleteFilterMode.StartsWith);
            Assert.IsType(typeof(AutoCompleteFilterSettingsBuilder), sameBuilder);
        }

        [Fact]
        public void Builder_should_set_MinimumChars_property()
        {
            builder.MinimumChars(2);
            Assert.Equal(2, settings.MinimumChars);
        }

        [Fact]
        public void MinimumChars_method_should_return_builder()
        {
            var sameBuilder = builder.MinimumChars(1);
            Assert.IsType(typeof(AutoCompleteFilterSettingsBuilder), sameBuilder);
        }
    }
}
