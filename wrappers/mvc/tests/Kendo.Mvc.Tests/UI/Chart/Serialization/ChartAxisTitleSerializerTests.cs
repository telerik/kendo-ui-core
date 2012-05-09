namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class ChartAxisTitleSerializerTests
    {
        private readonly ChartAxisTitle title;

        public ChartAxisTitleSerializerTests()
        {
            title = new ChartAxisTitle();
        }

        [Fact]
        public void Serializes_text()
        {
            title.Text = "Text";
            GetJson()["text"].ShouldEqual("Text");
        }

        [Fact]
        public void Does_not_serialize_empty_text()
        {
            GetJson().ContainsKey("text").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_font()
        {
            title.Font = "Font";
            GetJson()["font"].ShouldEqual("Font");
        }

        [Fact]
        public void Does_not_serialize_default_font()
        {
            GetJson().ContainsKey("font").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_background()
        {
            title.Background = "Background";
            GetJson()["background"].ShouldEqual("Background");
        }

        [Fact]
        public void Does_not_serialize_default_background()
        {
            GetJson().ContainsKey("background").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_color()
        {
            title.Color = "Color";
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
            title.Opacity = 0.33;
            GetJson()["opacity"].ShouldEqual(0.33);
        }

        [Fact]
        public void Does_not_serialize_default_opacity()
        {
            GetJson().ContainsKey("opacity").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_position()
        {
            title.Position = ChartAxisTitlePosition.Bottom;
            GetJson()["position"].ShouldEqual("bottom");
        }

        [Fact]
        public void Does_not_serialize_default_position()
        {
            GetJson().ContainsKey("position").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_margin()
        {
            title.Margin = new ChartSpacing(20);
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
            title.Padding = new ChartSpacing(40);

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
            title.Border.Color = "red";
            title.Border.Width = 1;
            ((Dictionary<string, object>)GetJson()["border"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson()["border"])["color"].ShouldEqual("red");
        }

        [Fact]
        public void Does_not_serialize_default_border()
        {
            GetJson().ContainsKey("border").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return title.CreateSerializer().Serialize();
        }
    }
}