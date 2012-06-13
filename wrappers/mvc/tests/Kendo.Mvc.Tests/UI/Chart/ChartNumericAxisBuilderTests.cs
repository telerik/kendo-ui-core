namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartNumericAxisBuilderTests
        : ChartAxisBuilderBaseTests<IChartNumericAxis, double, ChartNumericAxisBuilder>
    {
        public ChartNumericAxisBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            axis = new ChartNumericAxis<SalesData>(chart);
            builder = new ChartNumericAxisBuilder(axis);
        }

        [Fact]
        public void Min_should_set_Min()
        {
            builder.Min(10);
            axis.Min.ShouldEqual(10);
        }

        [Fact]
        public void Min_should_return_builder()
        {
            builder.Min(10).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Max_should_set_Max()
        {
            builder.Max(10);
            axis.Max.ShouldEqual(10);
        }

        [Fact]
        public void Max_should_return_builder()
        {
            builder.Max(10).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MajorUnit_should_set_MajorUnit()
        {
            builder.MajorUnit(10);
            axis.MajorUnit.ShouldEqual(10);
        }

        [Fact]
        public void MajorUnit_should_return_builder()
        {
            builder.MajorUnit(10).ShouldBeSameAs(builder);
        }

        [Fact]
        public void AxisCrossingValue_should_set_single_value()
        {
            builder.AxisCrossingValue(42);
            axis.AxisCrossingValues.ShouldEqual(new double[] { 42 });
        }

        [Fact]
        public void AxisCrossingValue_should_return_builder()
        {
            builder.AxisCrossingValue(42).ShouldBeSameAs(builder);
        }

        [Fact]
        public void AxisCrossingValue_should_set_multiple_values_from_params()
        {
            builder.AxisCrossingValue(42, 43);
            axis.AxisCrossingValues.ShouldEqual(new double[] { 42, 43 });
        }

        [Fact]
        public void AxisCrossingValue_overload_with_params_should_return_builder()
        {
            builder.AxisCrossingValue(42, 43).ShouldBeSameAs(builder);
        }

        [Fact]
        public void AxisCrossingValue_should_set_multiple_values_from_enumerable()
        {
            builder.AxisCrossingValue(new double[] { 42, 43 });
            axis.AxisCrossingValues.ShouldEqual(new double[] { 42, 43 });
        }

        [Fact]
        public void AxisCrossingValue_overload_with_enumerable_should_return_builder()
        {
            builder.AxisCrossingValue(new double[] { 42, 43 }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void PlotBands_should_set_PlotBands()
        {
            builder.PlotBands(pb => pb.Add().Color("Color").From(1.1).To(2.0).Opacity(0.5));
            axis.PlotBands[0].Color.ShouldEqual("Color");
            axis.PlotBands[0].From.ShouldEqual(1.1);
            axis.PlotBands[0].To.ShouldEqual(2.0);
            axis.PlotBands[0].Opacity.ShouldEqual(0.5);
        }
    }
}