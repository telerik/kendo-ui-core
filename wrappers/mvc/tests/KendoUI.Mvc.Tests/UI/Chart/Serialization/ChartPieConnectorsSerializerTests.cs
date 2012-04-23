namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class ChartPieConnectorSerializerTests
    {
        private readonly ChartPieConnectors pieConnectors;

        public ChartPieConnectorSerializerTests()
        {
            pieConnectors = new ChartPieConnectors();
        }

        [Fact]
        public void Serializes_width()
        {
            pieConnectors.Width = 2;
            GetJson()["width"].ShouldEqual(2);
        }

        [Fact]
        public void Does_not_serialize_default_width()
        {
            GetJson().ContainsKey("width").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_color()
        {
            pieConnectors.Color = "Color";
            GetJson()["color"].ShouldEqual("Color");
        }

        [Fact]
        public void Does_not_serialize_default_color()
        {
            GetJson().ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_padding()
        {
            pieConnectors.Padding = 5;
            GetJson()["padding"].ShouldEqual(5);
        }

        [Fact]
        public void Does_not_serialize_default_padding()
        {
            GetJson().ContainsKey("align").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return pieConnectors.CreateSerializer().Serialize();
        }
    }
}