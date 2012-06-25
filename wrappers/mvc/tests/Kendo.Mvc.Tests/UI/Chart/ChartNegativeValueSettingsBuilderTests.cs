namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartNegativeValueSettingsBuilderTests
    {
        private ChartNegativeValueSettings settings;
        private ChartNegativeValueSettingsBuilder builder;
        
        public ChartNegativeValueSettingsBuilderTests()
        {
            settings = new ChartNegativeValueSettings();
            builder = new ChartNegativeValueSettingsBuilder(settings);
        }

        [Fact]
        public void Visible_should_set_visible()
        {
            builder.Visible(true);
            settings.Visible.Value.ShouldBeTrue();
        }

        [Fact]
        public void Visible_should_return_builder()
        {
            builder.Visible(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Color_should_set_color()
        {
            builder.Color("#ff0000");
            settings.Color.ShouldEqual("#ff0000");
        }

        [Fact]
        public void Color_should_return_builder()
        {
            builder.Color("#ff0000").ShouldBeSameAs(builder);
        }
    }
}