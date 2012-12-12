namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class ChartSeriesHighlightSerializerTests
    {
        private readonly ChartSeriesHighlight highlight;
        private readonly ChartSeriesHighlightSerializer serializer;

        public ChartSeriesHighlightSerializerTests()
        {
            highlight = new ChartSeriesHighlight();
            serializer = new ChartSeriesHighlightSerializer(highlight);
        }

        [Fact]
        public void Serializes_opacity()
        {
            highlight.Opacity = 0.5;
            GetJson()["opacity"].ShouldEqual(0.5);
        }

        [Fact]
        public void Should_not_serialize_default_opacity()
        {
            GetJson().ContainsKey("opacity").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_color()
        {
            highlight.Color = "#f00";
            GetJson()["color"].ShouldEqual("#f00");
        }

        [Fact]
        public void Should_not_serialize_color_if_not_set()
        {
            GetJson().ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_border()
        {
            highlight.Border.Color = "red";
            highlight.Border.Width = 1;

            ((Dictionary<string, object>)GetJson()["border"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson()["border"])["color"].ShouldEqual("red");
        }

        [Fact]
        public void Does_not_serialize_default_border()
        {
            GetJson().ContainsKey("border").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_line()
        {
            highlight.Line.Color = "red";
            highlight.Line.Width = 1;
            highlight.Line.DashType = ChartDashType.Dot;

            ((Dictionary<string, object>)GetJson()["line"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson()["line"])["color"].ShouldEqual("red");
            ((Dictionary<string, object>)GetJson()["line"])["dashType"].ShouldEqual("dot");
        }

        [Fact]
        public void Does_not_serialize_default_line()
        {
            GetJson().ContainsKey("line").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return highlight.CreateSerializer().Serialize();
        }
    }
}