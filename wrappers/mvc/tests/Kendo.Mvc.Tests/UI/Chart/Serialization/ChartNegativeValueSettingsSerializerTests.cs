namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Xunit;

    public class ChartNegativeValueSettingsSerializerTests
    {
        private readonly ChartNegativeValueSettings negativeValues;

        public ChartNegativeValueSettingsSerializerTests()
        {
            negativeValues = new ChartNegativeValueSettings();
        }

        [Fact]
        public void Serializes_visible()
        {
            negativeValues.Visible = true;
            GetJson()["visible"].ShouldEqual(true);
        }

        [Fact]
        public void Does_not_serialize_visible_by_default()
        {
            GetJson().ContainsKey("visible").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_color()
        {
            negativeValues.Color = "Red";
            GetJson()["color"].ShouldEqual("Red");
        }

        [Fact]
        public void Does_not_serialize_color_by_default()
        {
            GetJson().ContainsKey("color").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return negativeValues.CreateSerializer().Serialize();
        }
    }
}