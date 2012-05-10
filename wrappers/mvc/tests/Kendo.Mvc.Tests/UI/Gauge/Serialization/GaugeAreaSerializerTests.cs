namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class GaugeAreaSerializerTests
    {
        private readonly GaugeArea gaugeArea;

        public GaugeAreaSerializerTests()
        {
            gaugeArea = new GaugeArea();
        }

        [Fact]
        public void Serializes_background()
        {
            gaugeArea.Background = "Red";
            GetJson()["background"].ShouldEqual("Red");
        }

        [Fact]
        public void Does_not_serialize_default_background()
        {
            GetJson().ContainsKey("background").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_margin()
        {
            gaugeArea.Margin = new ChartSpacing(20);
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
            gaugeArea.Border.Color = "red";
            gaugeArea.Border.Width = 1;
            gaugeArea.Border.DashType = ChartDashType.Dot;
            ((Dictionary<string, object>)GetJson()["border"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson()["border"])["color"].ShouldEqual("red");
            ((Dictionary<string, object>)GetJson()["border"])["dashType"].ShouldEqual("dot");
        }

        [Fact]
        public void Does_not_serialize_default_border()
        {
            GetJson().ContainsKey("border").ShouldBeFalse();
        }

        private IDictionary<string, object> GetJson()
        {
            return gaugeArea.CreateSerializer().Serialize();
        }
    }
}