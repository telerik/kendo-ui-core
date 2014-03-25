namespace Kendo.Mvc.UI.Tests.Chart
{
    using System;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartBoxPlotSeriesBuilderTests
    {
        private IChartBoxPlotSeries series;
        private ChartBoxPlotSeriesBuilder<BoxPlotData> builder;
        private readonly Func<object, object> nullFunc;

        public ChartBoxPlotSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<BoxPlotData>();
            series = new ChartBoxPlotSeries<BoxPlotData, decimal, string>(s => s.Lower, s => s.Q1, s => s.Median, s => s.Q3, s => s.Upper, s => s.Mean, s => s.Outliers, null, null, null);
            builder = new ChartBoxPlotSeriesBuilder<BoxPlotData>(series);
            nullFunc = (o) => null;
        }

        [Fact]
        public void Aggregate_should_set_Aggregate()
        {
            builder.Aggregate(ChartSeriesAggregate.Max);
            series.Aggregates.Lower.ShouldEqual(ChartSeriesAggregate.Max);
        }

        [Fact]
        public void Aggregate_should_return_builder()
        {
            builder.Aggregate(ChartSeriesAggregate.Max).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Aggregate_should_set_Aggregate_handler_name()
        {
            builder.Aggregate("foo");
            series.AggregateHandler.HandlerName.ShouldEqual("foo");
        }

        [Fact]
        public void Aggregate_handler_name_should_return_builder()
        {
            builder.Aggregate("foo").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Aggregate_should_set_Aggregate_template()
        {
            builder.Aggregate(nullFunc);
            series.AggregateHandler.TemplateDelegate.ShouldEqual(nullFunc);
        }

        [Fact]
        public void Aggregate_template_should_return_builder()
        {
            builder.Aggregate(nullFunc).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Gap_should_set_gap()
        {
            builder.Gap(1);
            series.Gap.ShouldEqual(1);
        }

        [Fact]
        public void Spacing_should_set_spacing()
        {
            builder.Spacing(1);
            series.Spacing.ShouldEqual(1);
        }

        [Fact]
        public void Border_sets_border_properties()
        {
            builder.Border(1, "red", ChartDashType.Dot);
            series.Border.Color.ShouldEqual("red");
            series.Border.Width.ShouldEqual(1);
            series.Border.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Line_sets_line_properties()
        {
            builder.Line(1, "red", ChartDashType.Dot);
            series.Line.Color.ShouldEqual("red");
            series.Line.Width.ShouldEqual(1);
            series.Line.DashType.ShouldEqual(ChartDashType.Dot);
        }

        [Fact]
        public void Line_should_set_line_width()
        {
            builder.Line(1);
            series.Line.Width.ShouldEqual(1);
        }

        [Fact]
        public void Line_should_return_builder()
        {
            builder.Line(1).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Line_color_should_set_line_width_and_color()
        {
            builder.Line(1, "red");
            series.Line.Color.ShouldEqual("red");
            series.Line.Width.ShouldEqual(1);
        }

        [Fact]
        public void Line_color_should_return_builder()
        {
            builder.Line(1, "red").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Line_builder_should_configure_line()
        {
            builder.Line(l => l.Color("red")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Line_builder_should_return_builder()
        {
            builder.Line(l => l.Color("red")).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Highlight_with_builder_should_configure_series()
        {
            builder.Highlight(s => { s.Visible(false); });
            series.Highlight.Visible.ShouldEqual(false);
        }

        [Fact]
        public void Highlight_with_builder_should_return_builder()
        {
            builder.Highlight(series => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void LowerField_should_set_open_member()
        {
            builder.LowerField("Lower");
            series.LowerMember.ShouldEqual("Lower");
        }

        [Fact]
        public void LowerField_should_return_builder()
        {
            builder.LowerField("Lower").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Q1Field_should_set_open_member()
        {
            builder.Q1Field("Q1");
            series.Q1Member.ShouldEqual("Q1");
        }

        [Fact]
        public void Q1Field_should_return_builder()
        {
            builder.Q1Field("Q1").ShouldBeSameAs(builder);
        }

        [Fact]
        public void MedianField_should_set_open_member()
        {
            builder.MedianField("Median");
            series.MedianMember.ShouldEqual("Median");
        }

        [Fact]
        public void MedianField_should_return_builder()
        {
            builder.MedianField("Median").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Q3Field_should_set_open_member()
        {
            builder.Q3Field("Q3");
            series.Q3Member.ShouldEqual("Q3");
        }

        [Fact]
        public void Q3Field_should_return_builder()
        {
            builder.Q3Field("Q3").ShouldBeSameAs(builder);
        }

        [Fact]
        public void UpperField_should_set_open_member()
        {
            builder.UpperField("Upper");
            series.UpperMember.ShouldEqual("Upper");
        }

        [Fact]
        public void UpperField_should_return_builder()
        {
            builder.UpperField("Upper").ShouldBeSameAs(builder);
        }

        [Fact]
        public void MeanField_should_set_open_member()
        {
            builder.MeanField("Mean");
            series.MeanMember.ShouldEqual("Mean");
        }

        [Fact]
        public void MeanField_should_return_builder()
        {
            builder.MeanField("Mean").ShouldBeSameAs(builder);
        }

        [Fact]
        public void OutliersField_should_set_open_member()
        {
            builder.OutliersField("Outliers");
            series.OutliersMember.ShouldEqual("Outliers");
        }

        [Fact]
        public void OutliersField_should_return_builder()
        {
            builder.OutliersField("Outliers").ShouldBeSameAs(builder);
        }

        [Fact]
        public void ColorField_should_set_color_member()
        {
            builder.ColorField("Color");
            series.ColorMember.ShouldEqual("Color");
        }

        [Fact]
        public void ColorField_should_return_builder()
        {
            builder.ColorField("Color").ShouldBeSameAs(builder);
        }

        [Fact]
        public void NoteTextField_should_set_note_text_member()
        {
            builder.NoteTextField("NoteText");
            series.NoteTextMember.ShouldEqual("NoteText");
        }

        [Fact]
        public void NoteTextField_should_return_builder()
        {
            builder.NoteTextField("NoteText").ShouldBeSameAs(builder);
        }
    }
}