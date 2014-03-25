namespace Kendo.Mvc.UI.Tests
{
    using System.Collections.Generic;
    using Kendo.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartBoxPlotSeriesSerializerTests
    {
        protected ChartBoxPlotSeries<BoxPlotData, decimal, string> series;

        public ChartBoxPlotSeriesSerializerTests()
        {
            var chart = ChartTestHelper.CreateChart<BoxPlotData>();
            chart.Data = BoxPlotDataBuilder.GetCollection();
            series = new ChartBoxPlotSeries<BoxPlotData, decimal, string>(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper, s => s.Mean, s => s.Outliers, null, null, null);
        }

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

        [Fact]
        public void Type_serializes_type()
        {
            GetJson(series)["type"].ShouldEqual("boxPlot");
        }

        [Fact]
        public void Serializes_aggregates()
        {
            series.Aggregates.Lower = ChartSeriesAggregate.Max;
            series.Aggregates.Q1 = ChartSeriesAggregate.Max;
            series.Aggregates.Median = ChartSeriesAggregate.Max;
            series.Aggregates.Q3 = ChartSeriesAggregate.Max;
            series.Aggregates.Upper = ChartSeriesAggregate.Max;
            series.Aggregates.Mean = ChartSeriesAggregate.Max;
            series.Aggregates.Outliers = ChartSeriesAggregate.Max;

            ((Dictionary<string, object>)GetJson(series)["aggregate"])["lower"].ShouldEqual("max");
            ((Dictionary<string, object>)GetJson(series)["aggregate"])["q1"].ShouldEqual("max");
            ((Dictionary<string, object>)GetJson(series)["aggregate"])["median"].ShouldEqual("max");
            ((Dictionary<string, object>)GetJson(series)["aggregate"])["q3"].ShouldEqual("max");
            ((Dictionary<string, object>)GetJson(series)["aggregate"])["upper"].ShouldEqual("max");
            ((Dictionary<string, object>)GetJson(series)["aggregate"])["mean"].ShouldEqual("max");
            ((Dictionary<string, object>)GetJson(series)["aggregate"])["outliers"].ShouldEqual("max");
        }

        [Fact]
        public void Should_not_serialize_default_aggregates()
        {
            GetJson(series).ContainsKey("aggregate").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_aggregate_handler()
        {
            series.AggregateHandler = new ClientHandlerDescriptor { HandlerName = "Foo" };
            GetJson(series)["aggregate"].ShouldEqual(series.AggregateHandler);
        }

        [Fact]
        public void Should_prefer_aggregate_handler_over_aggregate()
        {
            series.Aggregates.Mean = ChartSeriesAggregate.Max;
            series.AggregateHandler = new ClientHandlerDescriptor { HandlerName = "Foo" };
            GetJson(series)["aggregate"].ShouldEqual(series.AggregateHandler);
        }

        [Fact]
        public void Serializes_border()
        {
            series.Border.Color = "red";
            series.Border.Width = 1;
            series.Border.DashType = ChartDashType.Dot;
            ((Dictionary<string, object>)GetJson(series)["border"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson(series)["border"])["color"].ShouldEqual("red");
            ((Dictionary<string, object>)GetJson(series)["border"])["dashType"].ShouldEqual("dot");
        }

        [Fact]
        public void Does_not_serialize_default_border()
        {
            GetJson(series).ContainsKey("border").ShouldBeFalse();
        }

        [Fact]
        public void Line_serializes_line()
        {
            series.Line.Color = "red";
            series.Line.Width = 1;
            series.Line.DashType = ChartDashType.Dot;
            ((Dictionary<string, object>)GetJson(series)["line"])["width"].ShouldEqual(1);
            ((Dictionary<string, object>)GetJson(series)["line"])["color"].ShouldEqual("red");
            ((Dictionary<string, object>)GetJson(series)["line"])["dashType"].ShouldEqual("dot");
        }

        [Fact]
        public void Does_not_serialize_default_line()
        {
            GetJson(series).ContainsKey("line").ShouldBeFalse();
        }

        [Fact]
        public void Serializes_color()
        {
            series.Color = "Blue";
            GetJson(series)["color"].ShouldEqual("Blue");
        }

        [Fact]
        public void Does_not_serialize_default_color()
        {
            GetJson(series).ContainsKey("color").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_lower_field()
        {
            series.LowerMember = "x";
            GetJson(series)["lowerField"].ShouldEqual("x");
        }

        [Fact]
        public void Should_not_serialize_default_open_field()
        {
            series.LowerMember = null;
            GetJson(series).ContainsKey("lowerField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_q1_field()
        {
            series.Q1Member = "x";
            GetJson(series)["q1Field"].ShouldEqual("x");
        }

        [Fact]
        public void Should_not_serialize_default_q1_field()
        {
            series.Q1Member = null;
            GetJson(series).ContainsKey("q1Field").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_median_field()
        {
            series.MedianMember = "x";
            GetJson(series)["medianField"].ShouldEqual("x");
        }

        [Fact]
        public void Should_not_serialize_default_median_field()
        {
            series.MedianMember = null;
            GetJson(series).ContainsKey("medianField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_q3_field()
        {
            series.Q3Member = "x";
            GetJson(series)["q3Field"].ShouldEqual("x");
        }

        [Fact]
        public void Should_not_serialize_default_q3_field()
        {
            series.Q3Member = null;
            GetJson(series).ContainsKey("q3Field").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_upper_field()
        {
            series.UpperMember = "x";
            GetJson(series)["upperField"].ShouldEqual("x");
        }

        [Fact]
        public void Should_not_serialize_default_upper_field()
        {
            series.UpperMember = null;
            GetJson(series).ContainsKey("upperField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_mean_field()
        {
            series.MeanMember = "x";
            GetJson(series)["meanField"].ShouldEqual("x");
        }

        [Fact]
        public void Should_not_serialize_default_mean_field()
        {
            series.MeanMember = null;
            GetJson(series).ContainsKey("meanField").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_outliers_field()
        {
            series.OutliersMember = "x";
            GetJson(series)["outliersField"].ShouldEqual("x");
        }

        [Fact]
        public void Should_not_serialize_default_outliers_field()
        {
            series.OutliersMember = null;
            GetJson(series).ContainsKey("outliersField").ShouldBeFalse();
        }

        [Fact]
        public void Gap_serializes_gap()
        {
            series.Gap = 1;
            GetJson(series)["gap"].ShouldEqual(1.0);
        }

        [Fact]
        public void Should_not_seriale_default_gap()
        {
            GetJson(series).ContainsKey("gap").ShouldBeFalse();
        }

        [Fact]
        public void Spacing_serializes_Spacing()
        {
            series.Spacing = 1;
            GetJson(series)["spacing"].ShouldEqual(1.0);
        }

        [Fact]
        public void Spacing_not_seriale_default_spacing()
        {
            GetJson(series).ContainsKey("spacing").ShouldBeFalse();
        }

        [Fact]
        public void Spacing_serializes_spacing()
        {
            series.Spacing = 1;
            GetJson(series)["spacing"].ShouldEqual(1.0);
        }

        [Fact]
        public void Spacing_should_not_seriale_default_spacing()
        {
            GetJson(series).ContainsKey("spacing").ShouldBeFalse();
        }

        protected static IDictionary<string, object> GetJson(IChartBoxPlotSeries series)
        {
            return series.CreateSerializer().Serialize();
        }
    }
}
