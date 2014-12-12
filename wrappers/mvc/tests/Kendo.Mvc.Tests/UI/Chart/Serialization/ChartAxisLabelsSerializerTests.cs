namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Xunit;

    public class ChartAxisLabelsSerializerTests
    {
        private readonly ChartAxisLabels labels;

        public ChartAxisLabelsSerializerTests()
        {
            labels = new ChartAxisLabels();
        }

        [Fact]
        public void Serializes_font()
        {
            labels.Font = "Font";
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
            labels.Template = "<# customerID #>";
            GetJson()["template"].ShouldEqual("<# customerID #>");
        }

        [Fact]
        public void Does_not_serialize_default_template()
        {
            GetJson().ContainsKey("template").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_rotation()
        {
            labels.Rotation = 20;
            GetJson()["rotation"].ShouldEqual(20.0);
        }

        [Fact]
        public void Does_not_serialize_default_rotation()
        {
            GetJson().ContainsKey("rotation").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_visible()
        {
            labels.Visible = true;
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
            labels.Background = "Red";
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
            labels.Format = "{0:C}";
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
            labels.Color = "Red";
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
            labels.ColorHandler = clientHandler;
            GetJson()["color"].ShouldBeSameAs(clientHandler);
        }

        [Fact]
        public void Serializes_color_handler_if_both_color_and_color_handler_are_set()
        {
            var clientHandler = new ClientHandlerDescriptor();
            labels.Color = "red";
            labels.ColorHandler = clientHandler;
            GetJson()["color"].ShouldBeSameAs(clientHandler);
        }

        [Fact]
        public void Serializes_margin()
        {
            labels.Margin = new ChartSpacing(20);
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
            labels.Border.Color = "red";
            labels.Border.Width = 1;
            labels.Border.DashType = ChartDashType.Dot;
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
            labels.Padding = new ChartSpacing(40);

            GetJson().ContainsKey("padding").ShouldBeTrue();
        }

        [Fact]
        public void Does_not_serialize_default_padding()
        {
            GetJson().ContainsKey("padding").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_Mirror_if_not_set()
        {
            GetJson().ContainsKey("mirror").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Mirror_if_set()
        {
            labels.Mirror = true;

            GetJson().ContainsKey("mirror").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_Step_if_not_set()
        {
            GetJson().ContainsKey("step").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Step_if_set()
        {
            labels.Step = 2;

            GetJson().ContainsKey("step").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_Skip_if_not_set()
        {
            GetJson().ContainsKey("skip").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Skip_if_set()
        {
            labels.Skip = 2;

            GetJson().ContainsKey("skip").ShouldBeTrue();
        }

        [Fact]
        public void Serializes_Opacity()
        {
            labels.Opacity = 0.5;
            GetJson()["opacity"].ShouldEqual(0.5);
        }

        [Fact]
        public void Does_not_serialize_default_Opacity()
        {
            GetJson().ContainsKey("opacity").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_culture()
        {
            labels.Culture = new System.Globalization.CultureInfo("es-ES");
            GetJson()["culture"].ShouldEqual("es-ES");
        }

        [Fact]
        public void Does_not_serialize_default_culture()
        {
            GetJson().ContainsKey("culture").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_date_formats()
        {
            labels.DateFormats.Hours = "test";
            GetJson().ContainsKey("dateFormats");
        }

        [Fact]
        public void Does_not_serialize_default_date_formats()
        {
            GetJson().ContainsKey("dateFormats").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return labels.CreateSerializer().Serialize();
        }
    }
}