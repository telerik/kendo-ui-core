namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class GaugeLinearTrackSerializerTests
    {
        private readonly GaugeLinearTrack track;

        public GaugeLinearTrackSerializerTests()
        {
            track = new GaugeLinearTrack();
        }

        [Fact]
        public void Serializes_color()
        {
            track.Color = "Color";
            GetJson()["color"].ShouldEqual("Color");
        }

        [Fact]
        public void Does_not_serialize_default_color()
        {
            GetJson().ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_opacity()
        {
            track.Opacity = 0.33;
            GetJson()["opacity"].ShouldEqual(0.33);
        }

        [Fact]
        public void Does_not_serialize_default_opacity()
        {
            GetJson().ContainsKey("opacity").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_border()
        {
            track.Border.Color = "red";
            track.Border.Width = 1;
            ((Dictionary<string, object>)GetJson()["border"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson()["border"])["color"].ShouldEqual("red");
        }

        [Fact]
        public void Does_not_serialize_default_border()
        {
            GetJson().ContainsKey("border").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_size()
        {
            track.Size = 3.3;
            GetJson()["size"].ShouldEqual(3.3);
        }

        [Fact]
        public void Does_not_serialize_default_size()
        {
            GetJson().ContainsKey("size").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_visible()
        {
            track.Visible = false;
            GetJson()["visible"].ShouldEqual(false);
        }

        [Fact]
        public void Does_not_serialize_default_visible()
        {
            GetJson().ContainsKey("visible").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return track.CreateSerializer().Serialize();
        }
    }
}