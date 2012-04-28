namespace KendoUI.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using KendoUI.Mvc.UI;
    using Xunit;

    public class ChartTooltipSerializerTests
    {
        private readonly ChartTooltip chartTooltip;

        public ChartTooltipSerializerTests()
        {
            chartTooltip = new ChartTooltip();
        }

        [Fact]
        public void Serializes_font()
        {
            chartTooltip.Font = "Font";
            GetJson()["font"].ShouldEqual("Font");
        }

        [Fact]
        public void Does_not_serialize_default_font()
        {
            GetJson().ContainsKey("font").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_visible_with_true()
        {
            chartTooltip.Visible = true;
            GetJson()["visible"].ShouldEqual(true);
        }

        [Fact]
        public void Serializes_visible_with_false()
        {
            chartTooltip.Visible = false;
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
            chartTooltip.Background = "Red";
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
            chartTooltip.Format = "{0:C}";
            GetJson()["format"].ShouldEqual("{0:C}");
        }

        [Fact]
        public void Does_not_serialize_default_format()
        {
            GetJson().ContainsKey("format").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_template()
        {
            chartTooltip.Template = "${value}";
            GetJson()["template"].ShouldEqual("${value}");
        }

        [Fact]
        public void Does_not_serialize_default_template()
        {
            GetJson().ContainsKey("template").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_color()
        {
            chartTooltip.Color = "Red";
            GetJson()["color"].ShouldEqual("Red");
        }

        [Fact]
        public void Does_not_serialize_default_color()
        {
            GetJson().ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_border()
        {
            chartTooltip.Border.Color = "red";
            chartTooltip.Border.Width = 1;
            chartTooltip.Border.DashType = ChartDashType.Dot;
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
            chartTooltip.Padding = new ChartSpacing(40);

            GetJson().ContainsKey("padding").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_default_padding()
        {
            GetJson().ContainsKey("padding").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_Opacity()
        {
            chartTooltip.Opacity = 0.5;
            GetJson()["opacity"].ShouldEqual(0.5);
        }

        [Fact]
        public void Does_not_serialize_default_Opacity()
        {
            GetJson().ContainsKey("opacity").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return chartTooltip.CreateSerializer().Serialize();
        }
    }
}