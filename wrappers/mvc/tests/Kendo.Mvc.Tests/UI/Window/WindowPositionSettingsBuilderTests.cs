namespace Kendo.Mvc.UI.Tests
{
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class WindowPositionSettingsBuilderTests
    {
        private WindowPositionSettingsBuilder builder;
        private WindowPositionSettings settings;

        public WindowPositionSettingsBuilderTests()
        {
            settings = new WindowPositionSettings();
            builder = new WindowPositionSettingsBuilder(settings);
        }

        [Fact]
        public void Top_should_set_Top_property()
        {
            const int top = 100;

            builder.Top(top);

            settings.Top.ShouldEqual(top);
        }

        [Fact]
        public void Top_method_should_return_builder()
        {
            builder.Top(100).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Left_should_set_Left_property()
        {
            const int left = 100;

            builder.Left(left);

            settings.Left.ShouldEqual(left);
        }

        [Fact]
        public void Left_method_should_return_builder()
        {
            builder.Left(100).ShouldBeSameAs(builder);
        }

    }
}
