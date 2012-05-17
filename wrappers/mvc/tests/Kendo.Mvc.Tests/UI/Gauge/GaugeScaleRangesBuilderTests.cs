namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class GaugeScaleRangesBuilderTests
    {
        private readonly GaugeScaleRanges ranges;
        private readonly GaugeScaleRangesBuilder builder;

        public GaugeScaleRangesBuilderTests()
        {
            ranges = new GaugeScaleRanges();
            builder = new GaugeScaleRangesBuilder(ranges);
        }

        [Fact]
        public void Color_should_set_color()
        {
            builder.Color("color");
            ranges.Color.ShouldEqual("color");
        }

        [Fact]
        public void To_should_set_to()
        {
            builder.To(2);
            ranges.To.ShouldEqual(2);
        }

        [Fact]
        public void From_should_set_from()
        {
            builder.From(2);
            ranges.From.ShouldEqual(2);
        }

        [Fact]
        public void Opacity_should_set_opacity()
        {
            builder.Opacity(0.22);
            ranges.Opacity.ShouldEqual(0.22);
        }
    }
}