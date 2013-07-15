namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartPlotBandsFactoryTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartNumericAxis<SalesData> axis;
        private readonly ChartAxisPlotBandsFactory<IChartAxis<double>, double> factory;

        public ChartPlotBandsFactoryTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            axis = new ChartNumericAxis<SalesData>(chart);
            factory = new ChartAxisPlotBandsFactory<IChartAxis<double>, double>(axis);
        }

        [Fact]
        public void Add_returns_ChartPlotBandsBuilder()
        {
            var builder = factory.Add();
            axis.PlotBands.Count.ShouldEqual(1);
            builder.ShouldBeType<ChartPlotBandsBuilder>();
        }

        [Fact]
        public void Add_should_create_ChartPlotBand()
        {
            var builder = factory.Add();
            axis.PlotBands.Count.ShouldEqual(1);
        }

        [Fact]
        public void Add_should_set_From()
        {
            var builder = factory.Add(1, 2, "red");
            axis.PlotBands[0].From.ShouldEqual(1);
        }

        [Fact]
        public void Add_should_set_To()
        {
            var builder = factory.Add(1, 2, "red");
            axis.PlotBands[0].To.ShouldEqual(2);
        }

        [Fact]
        public void Add_should_set_Color()
        {
            var builder = factory.Add(1, 2, "red");
            axis.PlotBands[0].Color.ShouldEqual("red");
        }
    }
}
