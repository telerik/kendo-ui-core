namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class ChartLegendSerializerTests
    {
        private readonly ChartLegend legend;

        public ChartLegendSerializerTests()
        {
            legend = new ChartLegend();
        }

        [Fact]
        public void Serializes_font()
        {
            legend.Font = "Font";
            ((Dictionary<string, object>)GetJson()["labels"])["font"].ShouldEqual("Font");
        }

        [Fact]
        public void Does_not_serialize_default_font()
        {
            GetJson().ContainsKey("labels").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_Color()
        {
            legend.Color = "Color";
            ((Dictionary<string, object>)GetJson()["labels"])["color"].ShouldEqual("Color");
        }

        [Fact]
        public void Does_not_serialize_default_color()
        {
            GetJson().ContainsKey("labels").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_background()
        {
            legend.Background = "Background";
            GetJson()["background"].ShouldEqual("Background");
        }

        [Fact]
        public void Does_not_serialize_default_background()
        {
            GetJson().ContainsKey("background").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_position()
        {
            legend.Position = ChartLegendPosition.Bottom;
            GetJson()["position"].ShouldEqual("bottom");
        }

        [Fact]
        public void Does_not_serialize_default_position()
        {
            GetJson().ContainsKey("legend").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_offsetX()
        {
            legend.OffsetX = 100;
            GetJson()["offsetX"].ShouldEqual(100);
        }

        [Fact]
        public void Does_not_serialize_default_offsetX()
        {
            GetJson().ContainsKey("offsetX").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_offsetY()
        {
            legend.OffsetY = 100;
            GetJson()["offsetY"].ShouldEqual(100);
        }

        [Fact]
        public void Does_not_serialize_default_offsetY()
        {
            GetJson().ContainsKey("offsetY").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_visible_with_false()
        {
            legend.Visible = false;
            GetJson()["visible"].ShouldEqual(false);
        }

        [Fact]
        public void Serializes_visible_with_true()
        {
            legend.Visible = true;
            GetJson()["visible"].ShouldEqual(true);
        }

        [Fact]
        public void Does_not_serialize_default_visible()
        {
            GetJson().ContainsKey("visible").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_margin()
        {
            legend.Margin = new ChartSpacing(20);
            GetJson().ContainsKey("margin").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_default_margin()
        {
            GetJson().ContainsKey("margin").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_padding()
        {
            legend.Padding = new ChartSpacing(20);
            GetJson().ContainsKey("padding").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_default_padding()
        {
            GetJson().ContainsKey("padding").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_border()
        {
            legend.Border.Color = "red";
            legend.Border.Width = 1;
            legend.Border.DashType = ChartDashType.Dot;
            ((Dictionary<string, object>)GetJson()["border"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson()["border"])["color"].ShouldEqual("red");
            ((Dictionary<string, object>)GetJson()["border"])["dashType"].ShouldEqual("dot");
        }

        [Fact]
        public void Does_not_serialize_default_border()
        {
            GetJson().ContainsKey("border").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return legend.CreateSerializer().Serialize();
        }

        [Fact]
        public void Serializes_width()
        {
            legend.Width = 100;
            GetJson()["width"].ShouldEqual(100);
        }

        [Fact]
        public void Does_not_serialize_default_width()
        {
            GetJson().ContainsKey("width").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_height()
        {
            legend.Height = 100;
            GetJson()["height"].ShouldEqual(100);
        }

        [Fact]
        public void Does_not_serialize_default_height()
        {
            GetJson().ContainsKey("height").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_orientation()
        {
            legend.Orientation = ChartLegendOrientation.Horizontal;
            GetJson()["orientation"].ShouldEqual("horizontal");
        }

        [Fact]
        public void Does_not_serialize_default_orientation()
        {
            GetJson().ContainsKey("orientation").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_Reverse()
        {
            legend.Reverse = true;
            GetJson()["reverse"].ShouldEqual(true);
        }

        [Fact]
        public void Does_not_serialize_default_reverse()
        {
            GetJson().ContainsKey("reverse").ShouldBeFalse();
        }
    }
}