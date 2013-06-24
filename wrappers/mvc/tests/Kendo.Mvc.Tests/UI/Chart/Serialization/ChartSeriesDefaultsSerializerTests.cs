namespace Kendo.Mvc.UI.Tests
{
    using System.Collections;
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartSeriesDefaultsSerializerTests
    {
        private readonly ChartSeriesDefaults<SalesData> seriesDefaults;

        public ChartSeriesDefaultsSerializerTests()
        {
            seriesDefaults = new ChartSeriesDefaults<SalesData>();
        }

        [Fact]
        public void Serializes_bar_defaults()
        {
            seriesDefaults.Bar.Stacked = true;
            GetJson(seriesDefaults).ContainsKey("bar");
        }

        [Fact]
        public void Serializes_column_defaults()
        {
            seriesDefaults.Column.Stacked = true;
            GetJson(seriesDefaults).ContainsKey("column");
        }

        [Fact]
        public void Serializes_area_defaults()
        {
            seriesDefaults.Area.Stacked = true;
            GetJson(seriesDefaults).ContainsKey("area");
        }

        [Fact]
        public void Serializes_verticalArea_defaults()
        {
            seriesDefaults.VerticalArea.Stacked = true;
            GetJson(seriesDefaults).ContainsKey("verticalArea");
        }

        [Fact]
        public void Serializes_line_defaults()
        {
            seriesDefaults.Line.Stacked = true;
            GetJson(seriesDefaults).ContainsKey("area");
        }

        [Fact]
        public void Serializes_verticalLine_defaults()
        {
            seriesDefaults.VerticalLine.Stacked = true;
            GetJson(seriesDefaults).ContainsKey("verticalLine");
        }

        [Fact]
        public void Serializes_pie_defaults()
        {
            seriesDefaults.Pie.StartAngle = 45;
            GetJson(seriesDefaults).ContainsKey("pie");
        }

        [Fact]
        public void Serializes_scatter_defaults()
        {
            seriesDefaults.Scatter.Opacity = 0.5;
            GetJson(seriesDefaults).ContainsKey("scatter");
        }

        [Fact]
        public void Serializes_scatterLine_defaults()
        {
            seriesDefaults.ScatterLine.Opacity = 0.5;
            GetJson(seriesDefaults).ContainsKey("scatterLine");
        }

        [Fact]
        public void Strips_type_from_bar_defaults()
        {
            seriesDefaults.Bar.Stacked = true;
            var barData = GetJson(seriesDefaults)["bar"];
            ((IDictionary<string, object>) barData).ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Strips_type_from_column_defaults()
        {
            seriesDefaults.Column.Stacked = true;
            var barData = GetJson(seriesDefaults)["column"];
            ((IDictionary<string, object>)barData).ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Strips_type_from_area_defaults()
        {
            seriesDefaults.Area.Stacked = true;
            var areaData = GetJson(seriesDefaults)["area"];
            ((IDictionary<string, object>)areaData).ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Strips_type_from_vertical_area_defaults()
        {
            seriesDefaults.VerticalArea.Stacked = true;
            var areaData = GetJson(seriesDefaults)["verticalArea"];
            ((IDictionary<string, object>)areaData).ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Strips_type_from_line_defaults()
        {
            seriesDefaults.Line.Stacked = true;
            var lineData = GetJson(seriesDefaults)["line"];
            ((IDictionary<string, object>)lineData).ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Strips_type_from_vertical_line_defaults()
        {
            seriesDefaults.VerticalLine.Stacked = true;
            var lineData = GetJson(seriesDefaults)["verticalLine"];
            ((IDictionary<string, object>)lineData).ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Strips_type_from_pie_defaults()
        {
            seriesDefaults.Pie.StartAngle = 45;
            var pieData = GetJson(seriesDefaults)["pie"];
            ((IDictionary<string, object>)pieData).ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Strips_type_from_donut_defaults()
        {
            seriesDefaults.Donut.StartAngle = 45;
            var pieData = GetJson(seriesDefaults)["donut"];
            ((IDictionary<string, object>)pieData).ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Strips_type_from_scatter_defaults()
        {
            seriesDefaults.Scatter.Opacity = 0.5;
            var scatterData = GetJson(seriesDefaults)["scatter"];
            ((IDictionary<string, object>)scatterData).ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Strips_type_from_scatterLine_defaults()
        {
            seriesDefaults.ScatterLine.Opacity = 0.5;
            var scatterLineData = GetJson(seriesDefaults)["scatterLine"];
            ((IDictionary<string, object>)scatterLineData).ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_radarArea_defaults()
        {
            seriesDefaults.RadarArea.Stacked = true;
            GetJson(seriesDefaults).ContainsKey("radarArea");
        }

        [Fact]
        public void Strips_type_from_radarArea_defaults()
        {
            seriesDefaults.RadarArea.Stacked = true;
            var radarAreaData = GetJson(seriesDefaults)["radarArea"];
            ((IDictionary<string, object>)radarAreaData).ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_radarColumn_defaults()
        {
            seriesDefaults.RadarColumn.Stacked = true;
            GetJson(seriesDefaults).ContainsKey("radarColumn");
        }

        [Fact]
        public void Strips_type_from_radarColumn_defaults()
        {
            seriesDefaults.RadarColumn.Stacked = true;
            var radarColumnData = GetJson(seriesDefaults)["radarColumn"];
            ((IDictionary<string, object>)radarColumnData).ContainsKey("type").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_radarLine_defaults()
        {
            seriesDefaults.RadarLine.Stacked = true;
            GetJson(seriesDefaults).ContainsKey("radarLine");
        }

        [Fact]
        public void Strips_type_from_radarLine_defaults()
        {
            seriesDefaults.RadarLine.Stacked = true;
            var radarLineData = GetJson(seriesDefaults)["radarLine"];
            ((IDictionary<string, object>)radarLineData).ContainsKey("type").ShouldBeFalse();
        }

        private static IDictionary<string, object> GetJson(IChartSeriesDefaults seriesDefaults)
        {
            return seriesDefaults.CreateSerializer().Serialize();
        }
    }
}