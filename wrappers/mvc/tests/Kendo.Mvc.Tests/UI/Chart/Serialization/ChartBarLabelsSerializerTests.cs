namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Xunit;

    public class ChartBarLabelsSerializerTests
    {
        private readonly ChartBarLabels barLabels;

        public ChartBarLabelsSerializerTests()
        {
            barLabels = new ChartBarLabels();
        }

        [Fact]
        public void Serializes_font()
        {
            barLabels.Font = "Font";
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
            barLabels.Template = "<# customerID #>";
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
            barLabels.Position = ChartBarLabelsPosition.InsideEnd;
            GetJson()["position"].ShouldEqual("insideEnd");
        }

        [Fact]
        public void Does_not_serialize_default_position()
        {
            GetJson().ContainsKey("position").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_visible()
        {
            barLabels.Visible = true;
            GetJson()["visible"].ShouldEqual(true);
        }

        [Fact]
        public void Serializes_visible_default_value()
        {
            barLabels.Visible = false;
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
            barLabels.Background = "Red";
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
            barLabels.Format = "{0:C}";
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
            barLabels.Color = "Red";
            GetJson()["color"].ShouldEqual("Red");
        }

        [Fact]
        public void Does_not_serialize_default_color()
        {
            GetJson().ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_color_handler()
        {
            var clientHandler = new ClientHandlerDescriptor();
            barLabels.ColorHandler = clientHandler;
            GetJson()["color"].ShouldBeSameAs(clientHandler);
        }

        [Fact]
        public void Serializes_color_handler_if_both_color_and_color_handler_are_set()
        {
            var clientHandler = new ClientHandlerDescriptor();
            barLabels.Color = "red";
            barLabels.ColorHandler = clientHandler;
            GetJson()["color"].ShouldBeSameAs(clientHandler);
        }

        [Fact]
        public void Serializes_margin()
        {
            barLabels.Margin = new ChartSpacing(20);
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
            barLabels.Opacity = 0.5;
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
            barLabels.Rotation = 20;
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
            barLabels.Border.Color = "red";
            barLabels.Border.Width = 1;
            barLabels.Border.DashType = ChartDashType.Dot;
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
            barLabels.Padding = new ChartSpacing(40);

            GetJson().ContainsKey("padding").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_default_padding()
        {
            GetJson().ContainsKey("padding").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return barLabels.CreateSerializer().Serialize();
        }
    }
}