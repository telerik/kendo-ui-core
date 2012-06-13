namespace Kendo.Mvc.UI.Tests.Chart
{
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;

    public abstract class ChartAxisBuilderBaseTests<TAxis, TValue, TAxisBuilder>
        where TAxis : IChartAxis<TValue>
        where TAxisBuilder : ChartAxisBuilderBase<TAxis, TValue, TAxisBuilder>
        where TValue : struct
    {
        protected TAxis axis;
        protected TAxisBuilder builder;

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
    }
}