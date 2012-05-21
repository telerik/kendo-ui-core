namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class GaugeRadialPointerSerializerTests
    {
        private readonly GaugeRadialPointer pointer;

        public GaugeRadialPointerSerializerTests()
        {
            pointer = new GaugeRadialPointer();
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

        private IDictionary<string, object> GetJson()
        {
            return pointer.CreateSerializer().Serialize();
        }
    }
}