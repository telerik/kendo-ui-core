namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class ChartPieLabelSerializerTests
    {
        private readonly ChartPieLabels pieLabels;

        public ChartPieLabelSerializerTests()
        {
            pieLabels = new ChartPieLabels();
        }

        [Fact]
        public void Serializes_font()
        {
            pieLabels.Font = "Font";
            GetJson()["font"].ShouldEqual("Font");
        }

        [Fact]
        public void Does_not_serialize_default_font()
        {
            GetJson().ContainsKey("font").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_template()
        {
            pieLabels.Template = "<# customerID #>";
            GetJson()["template"].ShouldEqual("<# customerID #>");
        }

        [Fact]
        public void Does_not_serialize_default_template()
        {
            GetJson().ContainsKey("template").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_align()
        {
            pieLabels.Align = ChartPieLabelsAlign.Column;
            GetJson()["align"].ShouldEqual("column");
        }

        [Fact]
        public void Does_not_serialize_default_align()
        {
            GetJson().ContainsKey("align").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_visible()
        {
            pieLabels.Visible = true;
            GetJson()["visible"].ShouldEqual(true);
        }

        [Fact]
        public void Does_not_serialize_default_visible()
        {
            GetJson().ContainsKey("visible").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_background()
        {
            pieLabels.Background = "Red";
            GetJson()["background"].ShouldEqual("Red");
        }

        [Fact]
        public void Does_not_serialize_default_background()
        {
            GetJson().ContainsKey("background").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_format()
        {
            pieLabels.Format = "{0:C}";
            GetJson()["format"].ShouldEqual("{0:C}");
        }

        [Fact]
        public void Does_not_serialize_default_format()
        {
            GetJson().ContainsKey("format").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_color()
        {
            pieLabels.Color = "Red";
            GetJson()["color"].ShouldEqual("Red");
        }

        [Fact]
        public void Does_not_serialize_default_color()
        {
            GetJson().ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_margin()
        {
            pieLabels.Margin = new ChartSpacing(20);
            GetJson().ContainsKey("margin").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_default_margin()
        {
            GetJson().ContainsKey("margin").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_border()
        {
            pieLabels.Border.Color = "red";
            pieLabels.Border.Width = 1;
            pieLabels.Border.DashType = ChartDashType.Dot;
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
        public void Serializes_padding()
        {
            pieLabels.Padding = new ChartSpacing(40);
            GetJson().ContainsKey("padding").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_default_padding()
        {
            GetJson().ContainsKey("padding").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_distance()
        {
            pieLabels.Distance = 10;
            GetJson()["distance"].ShouldEqual(10);
        }

        [Fact]
        public void Does_not_serialize_default_distance()
        {
            GetJson().ContainsKey("distance").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_Opacity()
        {
            pieLabels.Opacity = 0.5;
            GetJson()["opacity"].ShouldEqual(0.5);
        }

        [Fact]
        public void Does_not_serialize_default_Opacity()
        {
            GetJson().ContainsKey("opacity").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_rotation()
        {
            pieLabels.Rotation = 20;
            GetJson()["rotation"].ShouldEqual(20.0);
        }

        [Fact]
        public void Does_not_serialize_default_rotation()
        {
            GetJson().ContainsKey("rotation").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_position()
        {
            pieLabels.Position = ChartPieLabelsPosition.Center;
            GetJson()["position"].ShouldEqual("center");
        }

        [Fact]
        public void Does_not_serialize_default_position()
        {
            GetJson().ContainsKey("position").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return pieLabels.CreateSerializer().Serialize();
        }
    }
}