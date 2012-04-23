namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class ChartLineLabelSerializerTests
    {
        private readonly ChartPointLabels lineLabels;

        public ChartLineLabelSerializerTests()
        {
            lineLabels = new ChartPointLabels();
        }

        [Fact]
        public void Serializes_font()
        {
            lineLabels.Font = "Font";
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
            lineLabels.Template = "<# customerID #>";
            GetJson()["template"].ShouldEqual("<# customerID #>");
        }

        [Fact]
        public void Does_not_serialize_default_template()
        {
            GetJson().ContainsKey("template").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_position()
        {
            lineLabels.Position = ChartPointLabelsPosition.Left;
            GetJson()["position"].ShouldEqual("left");
        }

        [Fact]
        public void Does_not_serialize_default_position()
        {
            GetJson().ContainsKey("position").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_visible()
        {
            lineLabels.Visible = true;
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
            lineLabels.Background = "Red";
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
            lineLabels.Format = "{0:C}";
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
            lineLabels.Color = "Red";
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
            lineLabels.Margin = new ChartSpacing(20);
            GetJson().ContainsKey("margin").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_default_margin()
        {
            GetJson().ContainsKey("margin").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_Opacity()
        {
            lineLabels.Opacity = 0.5;
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
            lineLabels.Rotation = 20;
            GetJson()["rotation"].ShouldEqual(20.0);
        }

        [Fact]
        public void Does_not_serialize_default_rotation()
        {
            GetJson().ContainsKey("rotation").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_border()
        {
            lineLabels.Border.Color = "red";
            lineLabels.Border.Width = 1;
            lineLabels.Border.DashType = ChartDashType.Dot;
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
            lineLabels.Padding = new ChartSpacing(40);

            GetJson().ContainsKey("padding").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_default_padding()
        {
            GetJson().ContainsKey("padding").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return lineLabels.CreateSerializer().Serialize();
        }
    }
}