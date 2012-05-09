namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartValueAxisFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartValueAxisFactory<SalesData> factory;

        public ChartValueAxisFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            factory = new ChartValueAxisFactory<SalesData>(chart, chart.ValueAxes);
        }

        [Fact]
        public void Numeric_should_create_ChartNumericAxis()
        {
            var builder = factory.Numeric();
            builder.Axis.ShouldBeType<ChartNumericAxis<SalesData>>();
        }

        [Fact]
        public void Numeric_should_configure_default_axis()
        {
            var builder = factory.Numeric();
            builder.Axis.ShouldBeSameAs(chart.ValueAxes[0]);
        }

        [Fact]
        public void Numeric_should_set_Name()
        {
            var builder = factory.Numeric("Secondary");
            builder.Axis.Name.ShouldEqual("Secondary");
        }

        [Fact]
        public void Numeric_should_append_axis()
        {
            factory.Numeric();
            var builder = factory.Numeric("Secondary");
            builder.Axis.ShouldBeSameAs(chart.ValueAxes[1]);
        }
    }
}
