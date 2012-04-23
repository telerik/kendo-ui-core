namespace Telerik.Web.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public class PlotAreaSerializerTests
    {
        private readonly PlotArea plotArea;

        public PlotAreaSerializerTests()
        {
            plotArea = new PlotArea();
        }

        [Fact]
        public void Serializes_background()
        {
            plotArea.Background = "Red";
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
            plotArea.Margin = new ChartSpacing(20);
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
            plotArea.Border.Color = "red";
            plotArea.Border.Width = 1;
            plotArea.Border.DashType = ChartDashType.Dot;
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
            return plotArea.CreateSerializer().Serialize();
        }
    }
}