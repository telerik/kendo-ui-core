namespace KendoUI.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class LinearGaugePointerSerializerTests
    {
        private readonly LinearGaugePointer pointer;

        public LinearGaugePointerSerializerTests()
        {
            pointer = new LinearGaugePointer();
        }

        [Fact]
        public void Serializes_color()
        {
            pointer.Color = "Color";
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
            pointer.Opacity = 0.33;
            GetJson()["opacity"].ShouldEqual(0.33);
        }

        [Fact]
        public void Does_not_serialize_default_opacity()
        {
            GetJson().ContainsKey("opacity").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_margin()
        {
            pointer.Margin = new ChartSpacing(20);
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
            pointer.Border.Color = "red";
            pointer.Border.Width = 1;
            ((Dictionary<string, object>)GetJson()["border"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson()["border"])["color"].ShouldEqual("red");
        }

        [Fact]
        public void Does_not_serialize_default_border()
        {
            GetJson().ContainsKey("border").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_shape()
        {
            pointer.Shape = LinearGaugePointerShape.Arrow;
            GetJson()["shape"].ShouldEqual("arrow");
        }

        [Fact]
        public void Does_not_serialize_default_Shape()
        {
            GetJson().ContainsKey("shape").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_size()
        {
            pointer.Size = 3.3;
            GetJson()["size"].ShouldEqual(3.3);
        }

        [Fact]
        public void Does_not_serialize_default_size()
        {
            GetJson().ContainsKey("size").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_value()
        {
            pointer.Value = 3.3;
            GetJson()["value"].ShouldEqual(3.3);
        }

        [Fact]
        public void Does_not_serialize_default_value()
        {
            GetJson().ContainsKey("value").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_vertical()
        {
            pointer.Vertical = false;
            GetJson()["vertical"].ShouldEqual(false);
        }

        [Fact]
        public void Does_not_serialize_default_vertical()
        {
            GetJson().ContainsKey("vertical").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return pointer.CreateSerializer().Serialize();
        }
    }
}