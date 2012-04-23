namespace Telerik.Web.Mvc.UI.Tests
{
    using Xunit;
    using Telerik.Web.Mvc.UI.Fluent;

    public class WindowResizingSettingsBuilderTests
    {
        private WindowResizingSettingsBuilder builder;
        private WindowResizingSettings settings;


        public WindowResizingSettingsBuilderTests()
        {
            settings = new WindowResizingSettings();
            builder = new WindowResizingSettingsBuilder(settings);
        }

        [Fact]
        public void Enabled_should_set_Enabled_property()
        {
            const bool enabled = true;

            builder.Enabled(enabled);

            Assert.True(settings.Enabled == enabled);
        }

        [Fact]
        public void Enabled_method_should_return_builder()
        {
            const bool enabled = false;

            var returned = builder.Enabled(enabled);

            Assert.IsType(typeof(WindowResizingSettingsBuilder), returned);
        }

        [Fact]
        public void MinWidth_should_set_MinWidth_property()
        {
            const int minWidth = 100;

            builder.MinWidth(minWidth);

            Assert.True(settings.MinWidth == minWidth);
        }

        [Fact]
        public void MinWidth_method_should_return_builder()
        {
            var returned = builder.MinWidth(100);

            Assert.IsType(typeof(WindowResizingSettingsBuilder), returned);
        }

        [Fact]
        public void MaxWidth_should_set_MaxWidth_property()
        {
            const int maxWidth = 100;

            builder.MaxWidth(maxWidth);

            Assert.True(settings.MaxWidth == maxWidth);
        }

        [Fact]
        public void MaxWidth_method_should_return_builder()
        {
            var returned = builder.MaxWidth(100);

            Assert.IsType(typeof(WindowResizingSettingsBuilder), returned);
        }

        [Fact]
        public void MinHeight_should_set_MinHeight_property()
        {
            const int minHeight = 100;

            builder.MinHeight(minHeight);

            Assert.True(settings.MinHeight == minHeight);
        }

        [Fact]
        public void MinHeight_method_should_return_builder()
        {
            var returned = builder.MinHeight(100);

            Assert.IsType(typeof(WindowResizingSettingsBuilder), returned);
        }

        [Fact]
        public void MaxHeight_should_set_MaxHeight_property()
        {
            const int maxHeight = 100;

            builder.MaxHeight(maxHeight);

            Assert.True(settings.MaxHeight == maxHeight);
        }

        [Fact]
        public void MaxHeight_method_should_return_builder()
        {
            var returned = builder.MaxHeight(100);

            Assert.IsType(typeof(WindowResizingSettingsBuilder), returned);
        }
    }
}
