namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using System;
    using Xunit;

    public class ChartRangeBarSeriesBuilderTests
    {
        protected IChartRangeBarSeries series;
        protected ChartRangeBarSeriesBuilder<SalesData> builder;
        protected readonly Func<object, object> nullFunc;

        public ChartRangeBarSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            series = new ChartRangeBarSeries<SalesData, decimal, string>(m => m.RepSalesLow, m => m.RepSalesHigh, null);
            builder = new ChartRangeBarSeriesBuilder<SalesData>(series);
            nullFunc = (o) => null;
        }

        [Fact]
        public void FromFieldExpression_should_set_fromField()
        {
            series.FromField.ShouldEqual("RepSalesLow");
        }

        [Fact]
        public void ToFieldExpression_should_set_toField()
        {
            series.FromField.ShouldEqual("RepSalesHigh");
        }
    }
}
