namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class ChartElementBorderSerializerTests
    {
        private readonly ChartElementBorder border;

        public ChartElementBorderSerializerTests()
        {
            border = new ChartElementBorder();
        }

        [Fact]
        public void Serializes_width()
        {
            border.Width = 10;
            GetJson()["width"].ShouldEqual(10);
        }

        [Fact]
        public void Does_not_serialize_default_width()
        {
            GetJson().ContainsKey("width").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_opacity()
        {
            border.Opacity = 0.1;
            GetJson()["opacity"].ShouldEqual(0.1);
        }

        [Fact]
        public void Does_not_serialize_default_opacity()
        {
            GetJson().ContainsKey("opacity").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_color()
        {
            border.Color = "green";
            GetJson()["color"].ShouldEqual("green");
        }

        [Fact]
        public void Does_not_serialize_default_color()
        {
            GetJson().ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_dashType()
        {
            border.DashType = ChartDashType.DashDot;
            GetJson()["dashType"].ShouldEqual("dashdot");
        }

        [Fact]
        public void Does_not_serialize_default_dashType()
        {
            GetJson().ContainsKey("dashType").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return border.CreateSerializer().Serialize();
        }
    }
}