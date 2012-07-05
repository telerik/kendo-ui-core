namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Xunit;

    public abstract class ChartSeriesSerializerBaseTests<TSeries>
        where TSeries : IChartSeries
    {
        protected TSeries series;

        [Fact]
        public void Serializes_name()
        {
            series.Name = "SeriesA";
            GetJson(series)["name"].ShouldEqual("SeriesA");
        }

        [Fact]
        public void Should_not_serialize_empty_name()
        {
            series.Name = string.Empty;
            GetJson(series).ContainsKey("name").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_groupNameTemplate()
        {
            series.GroupNameTemplate = "#= series.name #";
            GetJson(series)["groupNameTemplate"].ShouldEqual("#= series.name #");
        }

        [Fact]
        public void Should_not_serialize_empty_groupNameTemplate()
        {
            series.GroupNameTemplate = string.Empty;
            GetJson(series).ContainsKey("groupNameTemplate").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_opacity()
        {
            series.Opacity = 0.5;
            GetJson(series)["opacity"].ShouldEqual(0.5);
        }

        [Fact]
        public void Should_not_serialize_default_opacity()
        {
            GetJson(series).ContainsKey("opacity").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_axis()
        {
            series.Axis = "Axis";
            GetJson(series)["axis"].ShouldEqual("Axis");
        }

        [Fact]
        public void Should_not_serialize_empty_axis()
        {
            series.Axis = string.Empty;
            GetJson(series).ContainsKey("axis").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_Tooltip()
        {
            series.Tooltip.Visible = true;
            GetJson(series).ContainsKey("tooltip").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_default_tooltip()
        {
            GetJson(series).ContainsKey("tooltip").ShouldBeFalse();
        }

        protected static IDictionary<string, object> GetJson(IChartSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}