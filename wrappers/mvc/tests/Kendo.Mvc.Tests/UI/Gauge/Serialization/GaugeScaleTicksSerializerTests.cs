namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class GaugeScaleTicksSerializerTests
    {
        private readonly GaugeScaleTicks ticks;

        public GaugeScaleTicksSerializerTests()
        {
            ticks = new GaugeScaleTicks();
        }

        [Fact]
        public void Serializes_size()
        {
            ticks.Size = 1;
            GetJson()["size"].ShouldEqual(1);
        }

        [Fact]
        public void Does_not_serialize_default_size()
        {
            GetJson().ContainsKey("size").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_width()
        {
            ticks.Width = 1;
            GetJson()["width"].ShouldEqual(1);
        }

        [Fact]
        public void Does_not_serialize_default_width()
        {
            GetJson().ContainsKey("width").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_dash_type()
        {
            ticks.DashType = ChartDashType.Dot;
            GetJson()["dashType"].ShouldEqual("dot");
        }

        [Fact]
        public void Does_not_serialize_default_dash_type()
        {
            GetJson().ContainsKey("dashType").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_color()
        {
            ticks.Color = "red";
            GetJson()["color"].ShouldEqual("red");
        }

        [Fact]
        public void Does_not_serialize_default_color()
        {
            GetJson().ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_visible()
        {
            ticks.Visible = false;
            GetJson()["visible"].ShouldEqual(false);
        }

        [Fact]
        public void Does_not_serialize_visible()
        {
            GetJson().ContainsKey("visible").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return ticks.CreateSerializer().Serialize();
        }
    }
}