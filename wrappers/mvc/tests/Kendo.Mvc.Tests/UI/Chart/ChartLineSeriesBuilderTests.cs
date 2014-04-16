namespace Kendo.Mvc.UI.Tests.Chart
{
    using System;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public class ChartLineSeriesBuilderTests
    {
        protected IChartLineSeries series;
        protected ChartLineSeriesBuilder<SalesData> builder;
        private readonly Func<object, object> nullFunc;

        public ChartLineSeriesBuilderTests()
        {
            var chart = ChartTestHelper.CreateChart<SalesData>();
            series = new ChartLineSeries<SalesData, decimal>(s => s.RepSales);
            builder = new ChartLineSeriesBuilder<SalesData>(series);
            nullFunc = (o) => null;
        }

        [Fact]
        public void Name_should_set_name()
        {
            builder.Name("Series");
            series.Name.ShouldEqual("Series");
        }

        [Fact]
        public void Opacity_should_set_opacity()
        {
            builder.Opacity(0.5);
            series.Opacity.ShouldEqual(0.5);
        }

        [Fact]
        public void Opacity_should_return_builder()
        {
            builder.Opacity(0.5).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Color_should_set_color()
        {
            builder.Color("Blue");
            series.Color.ShouldEqual("Blue");
        }

        [Fact]
        public void Color_should_return_builder()
        {
            builder.Color("Blue").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Color_field_should_set_color_member()
        {
            builder.ColorField("Color");
            series.ColorMember.ShouldEqual("Color");
        }

        [Fact]
        public void Color_field_should_return_builder()
        {
            builder.ColorField("Color").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Tooltip_should_set_visibility()
        {
            builder.Tooltip(true);
            series.Tooltip.Visible.Value.ShouldBeTrue();
        }

        [Fact]
        public void Tooltip_should_return_builder()
        {
            builder.Tooltip(true).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Tooltip_with_builder_should_configure_tooltip()
        {
            builder.Tooltip(tooltip => { tooltip.Visible(true); });
            series.Tooltip.Visible.Value.ShouldBeTrue();
        }

        [Fact]
        public void Tooltip_with_builder_should_return_builder()
        {
            builder.Tooltip(legend => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Axis_should_set_axisName()
        {
            builder.Axis("Secondary");
            series.Axis.ShouldEqual("Secondary");
        }

        [Fact]
        public void Axis_should_return_builder()
        {
            builder.Axis("Secondary").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Stack_should_set_Stacked()
        {
            builder.Stack(true);
            series.Stacked.Value.ShouldBeTrue();
        }

        [Fact]
        public void Aggregate_should_set_Aggregate()
        {
            builder.Aggregate(ChartSeriesAggregate.Max);
            series.Aggregate.ShouldEqual(ChartSeriesAggregate.Max);
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
        public void Width_should_set_width()
        {
            builder.Width(1);
            series.Width.ShouldEqual(1);
        }

        [Fact]
        public void Labels_should_set_labels_visibility()
        {
            builder.Labels(true);
            series.Labels.Visible.ShouldEqual(true);
        }

        [Fact]
        public void Labels_should_return_builder()
        {
            builder.Labels(labels => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Markers_should_set_markers_visibility()
        {
            builder.Markers(true);
            series.Markers.Visible.ShouldEqual(true);
        }

        [Fact]
        public void Markers_should_return_builder()
        {
            builder.Markers(labels => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void DashType_should_set_dash_type()
        {
            builder.DashType(ChartDashType.Dash);
            series.DashType.ShouldEqual(ChartDashType.Dash);
        }

        [Fact]
        public void MissingValues_should_set_missingValues()
        {
            builder.MissingValues(ChartLineMissingValues.Interpolate);
            series.MissingValues.ShouldEqual(ChartLineMissingValues.Interpolate);
        }

        [Fact]
        public void Style_should_set_style()
        {
            builder.Style(ChartLineStyle.Step);
            series.Style.ShouldEqual(ChartLineStyle.Step);
        }

        [Fact]
        public void Style_should_return_builder()
        {
            builder.Style(ChartLineStyle.Smooth).ShouldBeSameAs(builder);
        }

        [Fact]
        public void ErrorBars_should_configure_errorBars()
        {
            builder.ErrorBars(e=> e.Value(1.1).Color("Red"));
            series.ErrorBars.Value.ShouldEqual(1.1);
            series.ErrorBars.Color.ShouldEqual("Red");
        }

        [Fact]
        public void ErrorBars_should_return_builder()
        {
            builder.ErrorBars(e=> e.Value(1)).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Field_should_set_member()
        {
            builder.Field("Value");
            series.Member.ShouldEqual("Value");
        }

        [Fact]
        public void Field_should_return_builder()
        {
            builder.Field("Value").ShouldBeSameAs(builder);
        }

        [Fact]
        public void CategoryField_should_set_category_member()
        {
            builder.CategoryField("Category");
            series.CategoryMember.ShouldEqual("Category");
        }

        [Fact]
        public void CategoryField_should_return_builder()
        {
            builder.CategoryField("Category").ShouldBeSameAs(builder);
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
