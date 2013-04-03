namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Xunit;

    public class ChartMarkerSerializerTests
    {
        private readonly ChartMarkers lineMarkers;

        public ChartMarkerSerializerTests()
        {
            lineMarkers = new ChartMarkers();
        }

        [Fact]
        public void Serializes_visible()
        {
            lineMarkers.Visible = false;
            GetJson()["visible"].ShouldEqual(false);
        }

        [Fact]
        public void Does_not_serialize_default_visible()
        {
            GetJson().ContainsKey("visible").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_background()
        {
            lineMarkers.Background = "Red";
            GetJson()["background"].ShouldEqual("Red");
        }

        [Fact]
        public void Does_not_serialize_default_background()
        {
            GetJson().ContainsKey("background").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_border()
        {
            lineMarkers.Border.Color = "red";
            lineMarkers.Border.Width = 1;
            lineMarkers.Border.DashType = ChartDashType.Dot;
            ((Dictionary<string, object>)GetJson()["border"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson()["border"])["color"].ShouldEqual("red");
            ((Dictionary<string, object>)GetJson()["border"])["dashType"].ShouldEqual("dot");
        }

        [Fact]
        public void Does_not_serialize_default_border()
        {
            GetJson().ContainsKey("border").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_type()
        {
            lineMarkers.Type = ChartMarkerShape.Circle;
            GetJson()["type"].ShouldEqual("circle");
        }

        [Fact]
        public void Does_not_serialize_default_type()
        {
            GetJson().ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_size()
        {
            lineMarkers.Size = 10;
            GetJson()["size"].ShouldEqual(10);
        }

        [Fact]
        public void Does_not_serialize_default_size()
        {
            GetJson().ContainsKey("size").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_rotation()
        {
            lineMarkers.Rotation = 45;
            GetJson()["rotation"].ShouldEqual(45);
        }

        [Fact]
        public void Does_not_serialize_default_rotation()
        {
            GetJson().ContainsKey("rotation").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return lineMarkers.CreateSerializer().Serialize();
        }
    }
}