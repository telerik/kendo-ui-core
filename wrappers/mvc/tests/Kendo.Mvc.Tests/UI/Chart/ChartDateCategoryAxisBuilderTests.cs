namespace Kendo.Mvc.UI.Tests.Chart
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartDateCategoryAxisBuilderTests
    {
        protected IChartCategoryAxis axis;
        protected ChartDateCategoryAxisBuilder<SalesData> builder;

        public ChartDateCategoryAxisBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            axis = new ChartCategoryAxis<SalesData>(chart);
            chart.CategoryAxis = axis;
            chart.Data = SalesDataBuilder.GetCollection();
            builder = new ChartDateCategoryAxisBuilder<SalesData>(chart);
        }

        [Fact]
        public void MajorGridLines_should_return_builder()
        {
            builder.MajorGridLines(lines => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MajorGridLines_should_set_Visible()
        {
            builder.MajorGridLines(1, "green", ChartDashType.Dot);
            axis.MajorGridLines.Visible.ShouldEqual(true);
        }

        [Fact]
        public void MajorGridLines_should_set_Width()
        {
            builder.MajorGridLines(1, "green", ChartDashType.Dot);
            axis.MajorGridLines.Width.ShouldEqual(1);
        }

        [Fact]
        public void MajorGridLines_should_set_Color()
        {
            builder.MajorGridLines(1, "green", ChartDashType.Dot);
            axis.MajorGridLines.Color.ShouldEqual("green");
        }

        [Fact]
        public void MajorGridLines_should_set_DashType()
        {
            builder.MajorGridLines(1, "green", ChartDashType.Dot);
            axis.MajorGridLines.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void MinorGridLines_should_return_builder()
        {
            builder.MinorGridLines(lines => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void MinorGridLines_should_set_Visible()
        {
            builder.MinorGridLines(1, "green", ChartDashType.Dot);
            axis.MinorGridLines.Visible.ShouldEqual(true);
        }

        [Fact]
        public void MinorGridLines_should_set_Width()
        {
            builder.MinorGridLines(1, "green", ChartDashType.Dot);
            axis.MinorGridLines.Width.ShouldEqual(1);
        }

        [Fact]
        public void MinorGridLines_should_set_Color()
        {
            builder.MinorGridLines(1, "green", ChartDashType.Dot);
            axis.MinorGridLines.Color.ShouldEqual("green");
        }

        [Fact]
        public void MinorGridLines_should_set_DashType()
        {
            builder.MinorGridLines(1, "green", ChartDashType.Dot);
            axis.MinorGridLines.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Line_should_return_builder()
        {
            builder.Line(line => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Line_should_set_Visible()
        {
            builder.Line(1, "green", ChartDashType.Dot);
            axis.Line.Visible.ShouldEqual(true);
        }

        [Fact]
        public void Line_should_set_Width()
        {
            builder.Line(1, "green", ChartDashType.Dot);
            axis.Line.Width.ShouldEqual(1);
        }

        [Fact]
        public void Line_should_set_Color()
        {
            builder.Line(1, "green", ChartDashType.Dot);
            axis.Line.Color.ShouldEqual("green");
        }

        [Fact]
        public void Line_should_set_DashType()
        {
            builder.Line(1, "green", ChartDashType.Dot);
            axis.Line.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Labels_should_set_Labels()
        {
            builder.Labels(true);
            axis.Labels.Visible.ShouldEqual(true);
        }

        [Fact]
        public void Labels_should_return_builder()
        {
            builder.Labels(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void PlotBands_should_return_builder()
        {
            builder.PlotBands(pb => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Title_should_set_title_text()
        {
            builder.Title("Title");
            axis.Title.Text.ShouldEqual("Title");
        }

        [Fact]
        public void Title_should_return_builder()
        {
            builder.Title(t => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Color_should_set_color()
        {
            builder.Color("#f00");
            axis.Color.ShouldEqual("#f00");
        }

        [Fact]
        public void Color_should_return_builder()
        {
            builder.Color("#f00").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Reverse_should_set_reverse()
        {
            builder.Reverse(true);
            axis.Reverse.ShouldEqual(true);
        }

        [Fact]
        public void Reverse_should_return_builder()
        {
            builder.Reverse(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Categories_should_bind_categories_with_expression()
        {
            builder.Categories(s => s.Date);

            AssertCategories(new DateTime?[] { DateTime.Parse("2010/08/01"), null, DateTime.Parse("2010/09/01") });
        }

        [Fact]
        public void Categories_set_member_field_with_expression()
        {
            builder.Container.Data = null;
            builder.Categories(s => s.Date);
            builder.Container.Data = SalesDataBuilder.GetCollection();

            axis.Member.ShouldEqual("Date");
        }

        [Fact]
        public void Categories_should_set_categories_from_date_list()
        {
            var a = DateTime.Parse("2012/05/29");
            var b = DateTime.Parse("2012/05/30");

            builder.Categories(a, b);

            AssertCategories(new DateTime[] { a, b});
        }

        [Fact]
        public void BaseUnit_should_set_base_unit()
        {
            builder.BaseUnit(ChartAxisBaseUnit.Days);
            axis.BaseUnit.ShouldEqual(ChartAxisBaseUnit.Days);
        }

        [Fact]
        public void BaseUnit_should_return_builder()
        {
            builder.BaseUnit(ChartAxisBaseUnit.Days).ShouldBeSameAs(builder);
        }

        [Fact]
        public void BaseUnitStep_should_set_base_unit()
        {
            builder.BaseUnitStep(1);
            axis.BaseUnitStep.ShouldEqual(1);
        }

        [Fact]
        public void BaseUnitStep_should_return_builder()
        {
            builder.BaseUnitStep(1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void RoundToBaseUnit_should_set_flag()
        {
            builder.RoundToBaseUnit(false);
            axis.RoundToBaseUnit.ShouldEqual(false);
        }

        [Fact]
        public void RoundToBaseUnit_should_return_builder()
        {
            builder.RoundToBaseUnit(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void AutoBaseUnitSteps_should_return_builder()
        {
            builder.AutoBaseUnitSteps(steps => steps.Minutes(1, 2)).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Justify_should_set_justified()
        {
            builder.Justify(false);
            axis.Justified.ShouldEqual(false);
        }

        [Fact]
        public void Justify_should_set_justified_to_true()
        {
            builder.Justify();
            axis.Justified.ShouldEqual(true);
        }

        [Fact]
        public void Justify_should_return_builder()
        {
            builder.Justify(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Min_should_set_min_date()
        {
            var min = DateTime.Parse("2012/01/01");
            builder.Min(min);
            axis.Min.ShouldEqual(min);
        }

        [Fact]
        public void Min_should_return_builder()
        {
            builder.Min(DateTime.Parse("2012/01/01")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Max_should_set_max_date()
        {
            var max = DateTime.Parse("2012/01/01");
            builder.Max(max);
            axis.Max.ShouldEqual(max);
        }

        [Fact]
        public void Max_should_return_builder()
        {
            builder.Max(DateTime.Parse("2012/01/01")).ShouldBeSameAs(builder);
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
            builder.PlotBands(pb => pb.Add().Color("Color").From(1).To(2).Opacity(0.5));
            axis.PlotBands[0].Color.ShouldEqual("Color");
            axis.PlotBands[0].From.ShouldEqual(1);
            axis.PlotBands[0].To.ShouldEqual(2);
            axis.PlotBands[0].Opacity.ShouldEqual(0.5);
        }

        private void AssertCategories<T>(IEnumerable<T> categories)
        {
            var expectedCategories = new Queue<T>();
            foreach (var category in categories)
            {
                expectedCategories.Enqueue(category);
            }

            var categoryStrings = builder.Axis.Categories;
            foreach (T category in categoryStrings)
            {
                category.ShouldEqual<T>(expectedCategories.Dequeue());
            }
        }
    }
}
