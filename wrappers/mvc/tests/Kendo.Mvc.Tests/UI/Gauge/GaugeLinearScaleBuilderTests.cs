namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class GaugeLinearScaleBuilderTests
        : GaugeScaleBuilderBaseTests<ILinearScale, GaugeLinearScaleBuilder>
    {
        public GaugeLinearScaleBuilderTests()
        {
            var gauge = GaugeTestHelper.CreateLinearGauge();
            scale = new GaugeLinearScale(gauge);
            gauge.Scale = scale;
            builder = new GaugeLinearScaleBuilder(gauge);
        }

        [Fact]
        public void Mirror_should_set_Mirror()
        {
            var mirror = true;

            builder.Mirror(mirror);

            scale.Mirror.ShouldEqual(mirror);
        }

        [Fact]
        public void Vertical_should_set_Vertical()
        {
            var vertical = true;

            builder.Vertical(vertical);

            scale.Vertical.ShouldEqual(vertical);
        }
    }
}