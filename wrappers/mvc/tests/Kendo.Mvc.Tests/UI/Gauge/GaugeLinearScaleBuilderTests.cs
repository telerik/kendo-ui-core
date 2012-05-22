namespace Kendo.Mvc.UI.Tests.Gauge
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class GaugeLinearScaleBuilderTests
        : GaugeScaleBuilderBaseTests<ILinearScale<double>, GaugeLinearScaleBuilder<double>>
    {
        public GaugeLinearScaleBuilderTests()
        {
            var gauge = GaugeTestHelper.CreateLinearGauge();
            scale = new GaugeLinearScale<double>(gauge);
            gauge.Scale = scale;
            builder = new GaugeLinearScaleBuilder<double>(gauge);
        }

        [Fact]
        public void Mirror_should_set_Mirror()
        {
            var mirror = true;

            builder.Mirror(mirror);

            scale.Mirror.ShouldEqual(mirror);
        }
    }
}