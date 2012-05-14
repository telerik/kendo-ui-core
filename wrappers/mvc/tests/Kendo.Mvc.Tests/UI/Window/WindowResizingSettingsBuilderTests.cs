namespace Kendo.Mvc.UI.Tests
{
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

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

            settings.Enabled.ShouldEqual(enabled);
        }

        [Fact]
        public void Enabled_method_should_return_builder()
        {
            builder.Enabled(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MinWidth_should_set_MinWidth_property()
        {
            const int minWidth = 100;

            builder.MinWidth(minWidth);

            settings.MinWidth.ShouldEqual(minWidth);
        }

        [Fact]
        public void MinWidth_method_should_return_builder()
        {
            builder.MinWidth(100).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MaxWidth_should_set_MaxWidth_property()
        {
            const int maxWidth = 100;

            builder.MaxWidth(maxWidth);

            settings.MaxWidth.ShouldEqual(maxWidth);
        }

        [Fact]
        public void MaxWidth_method_should_return_builder()
        {
            builder.MaxWidth(100).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MinHeight_should_set_MinHeight_property()
        {
            const int minHeight = 100;

            builder.MinHeight(minHeight);

            settings.MinHeight.ShouldEqual(minHeight);
        }

        [Fact]
        public void MinHeight_method_should_return_builder()
        {
            builder.MinHeight(100).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MaxHeight_should_set_MaxHeight_property()
        {
            const int maxHeight = 100;

            builder.MaxHeight(maxHeight);

            settings.MaxHeight.ShouldEqual(maxHeight);
        }

        [Fact]
        public void MaxHeight_method_should_return_builder()
        {
            builder.MaxHeight(100).ShouldBeSameAs(builder);
        }
    }
}
