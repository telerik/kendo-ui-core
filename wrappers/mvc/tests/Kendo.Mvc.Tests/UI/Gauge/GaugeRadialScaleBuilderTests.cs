namespace Kendo.Mvc.UI.Tests.Gauge
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class GaugeRadialScaleBuilderTests
        : GaugeScaleBuilderBaseTests<IRadialScale, GaugeRadialScaleBuilder>
    {
        public GaugeRadialScaleBuilderTests()
        {
            var gauge = GaugeTestHelper.CreateRadialGauge();
            scale = new GaugeRadialScale(gauge);
            gauge.Scale = scale;
            builder = new GaugeRadialScaleBuilder(gauge);
        }

        [Fact]
        public void EndAngle_should_set_EndAngle()
        {
            var angle = 22;

            builder.EndAngle(angle);

            scale.EndAngle.ShouldEqual(angle);
        }

        [Fact]
        public void StartAngle_should_set_StartAngle()
        {
            var angle = 22;

            builder.StartAngle(angle);

            scale.StartAngle.ShouldEqual(angle);
        }
    }
}