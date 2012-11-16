namespace Kendo.Mvc.UI.Tests.Gauge
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class GaugeLinearScaleBuilderTests
    {
        protected ILinearScale scale;
        protected GaugeLinearScaleBuilder builder;

        public GaugeLinearScaleBuilderTests()
        {
            var gauge = GaugeTestHelper.CreateLinearGauge();
            scale = new GaugeLinearScale(gauge);
            gauge.Scale = scale;
            builder = new GaugeLinearScaleBuilder(gauge);
        }

        [Fact]
        public void MinorTicks_should_return_builder()
        {
            builder.MinorTicks(scale => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MajorTicks_should_return_builder()
        {
            builder.MajorTicks(scale => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Ranges_should_return_builder()
        {
            builder.Ranges(scale => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MajorUnit_should_set_MajorUnit()
        {
            builder.MajorUnit(1);
            scale.MajorUnit.ShouldEqual(1);
        }

        [Fact]
        public void MinorUnit_should_set_MinorUnit()
        {
            builder.MinorUnit(1);
            scale.MinorUnit.ShouldEqual(1);
        }

        [Fact]
        public void Min_should_set_Min()
        {
            builder.Min(1);
            scale.Min.ShouldEqual(1);
        }

        [Fact]
        public void Max_should_set_Max()
        {
            builder.Max(1);
            scale.Max.ShouldEqual(1);
        }

        [Fact]
        public void Reverse_should_set_Reverse()
        {
            builder.Reverse(true);
            scale.Reverse.ShouldEqual(true);
        }

        [Fact]
        public void Ranges_should_set_Ranges()
        {
            builder.Ranges(r => r.Add().Color("Color").From(1.1).To(2.0).Opacity(0.5));
            scale.Ranges[0].Color.ShouldEqual("Color");
            scale.Ranges[0].From.ShouldEqual(1.1);
            scale.Ranges[0].To.ShouldEqual(2.0);
            scale.Ranges[0].Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void MajorTicks_should_set_MajorTicks()
        {
            builder.MajorTicks(mt => mt.Color("color").DashType(ChartDashType.Dot).Size(2).Visible(false).Width(2));
            scale.MajorTicks.Color.ShouldEqual("color");
            scale.MajorTicks.Size.ShouldEqual(2);
            scale.MajorTicks.DashType.ToString().ToLowerInvariant().ShouldEqual("dot");
            scale.MajorTicks.Visible.ShouldEqual(false);
            scale.MajorTicks.Width.ShouldEqual(2);
        }

        [Fact]
        public void MinorTicks_should_set_MinorTicks()
        {
            builder.MinorTicks(mt => mt.Color("color").DashType(ChartDashType.Dot).Size(2).Visible(false).Width(2));
            scale.MinorTicks.Color.ShouldEqual("color");
            scale.MinorTicks.Size.ShouldEqual(2);
            scale.MinorTicks.DashType.ToString().ToLowerInvariant().ShouldEqual("dot");
            scale.MinorTicks.Visible.ShouldEqual(false);
            scale.MinorTicks.Width.ShouldEqual(2);
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
