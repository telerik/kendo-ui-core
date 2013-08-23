namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class ChartAreaSerializerTests
    {
        private readonly ChartArea chartArea;

        public ChartAreaSerializerTests()
        {
            chartArea = new ChartArea();
        }

        [Fact]
        public void Serializes_background()
        {
            chartArea.Background = "Red";
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
            chartArea.Margin = new ChartSpacing(20);
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
            chartArea.Border.Color = "red";
            chartArea.Border.Width = 1;
            chartArea.Border.DashType = ChartDashType.Dot;
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
            return chartArea.CreateSerializer().Serialize();
        }

        [Fact]
        public void Serializes_width()
        {
            chartArea.Width = 4;
            GetJson()["width"].ShouldEqual(4);
        }

        [Fact]
        public void Does_not_serialize_default_width()
        {
            GetJson().ContainsKey("width").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_height()
        {
            chartArea.Height = 4;
            GetJson()["height"].ShouldEqual(4);
        }

        [Fact]
        public void Does_not_serialize_default_height()
        {
            GetJson().ContainsKey("height").ShouldBeFalse();
        }
    }
}