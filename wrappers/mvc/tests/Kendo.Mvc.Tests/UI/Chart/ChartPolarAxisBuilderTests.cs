namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartPolarAxisBuilderTests
    {
        protected IChartNumericAxis axis;
        protected ChartPolarAxisBuilder builder;

        public ChartPolarAxisBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            axis = new ChartNumericAxis<SalesData>(chart);
            builder = new ChartPolarAxisBuilder(axis);
        }

        [Fact]
        public void StartAngle_should_set_StartAngle()
        {
            builder.StartAngle(10);
            axis.StartAngle.ShouldEqual(10);
        }

        [Fact]
        public void StartAngle_should_return_builder()
        {
            builder.StartAngle(10).ShouldBeSameAs(builder);
        }
    }
}
