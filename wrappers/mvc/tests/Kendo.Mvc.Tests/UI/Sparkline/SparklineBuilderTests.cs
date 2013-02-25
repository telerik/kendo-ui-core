namespace Kendo.Mvc.UI.Tests.Sparkline
{
    using System;
    using System.Linq;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Xunit;
    using Kendo.Mvc.Infrastructure;
    using Moq;
    using System.Collections.Generic;

    public class SparklineBuilderTests
    {
        private readonly Sparkline<object> sparkline;
        private readonly SparklineBuilder<object> builder;

        public SparklineBuilderTests()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>();
            var viewContext = TestHelper.CreateViewContext();
            sparkline = new Sparkline<object>(viewContext, new JavaScriptInitializer(), urlGeneratorMock.Object);
            builder = new SparklineBuilder<object>(sparkline);
        }

        [Fact]
        public void Data_should_wrap_data()
        {
            builder.Data(new int[] { 1, 2, 3, 4 });
            Assert.True(sparkline.Data is IEnumerable<object>);
        }

        [Fact]
        public void Data_should_return_builder()
        {
            builder.Data(new int[] { 1, 2, 3, 4 }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Type_should_set_data()
        {
            builder.Type(SparklineType.Bullet);
            sparkline.Type.ShouldEqual(SparklineType.Bullet);
        }

        [Fact]
        public void Type_should_return_builder()
        {
            builder.Type(SparklineType.Bullet).ShouldBeSameAs(builder);
        }

        [Fact]
        public void PointWidth_should_set_data()
        {
            builder.PointWidth(4);
            sparkline.PointWidth.ShouldEqual(4);
        }

        [Fact]
        public void PointWidth_should_return_builder()
        {
            builder.PointWidth(4).ShouldBeSameAs(builder);
        }

        [Fact]
        public void ClientEvents_should_set_events()
        {
            Action<ChartEventBuilder> clientEventsAction = eventBuilder => eventBuilder.DataBinding("dataBinding");
            builder.Events(clientEventsAction);
            ((ClientHandlerDescriptor)sparkline.Events["dataBinding"]).HandlerName.ShouldEqual("dataBinding");
        }

        [Fact]
        public void ClientEvents_should_return_builder()
        {
            builder.Events(eventBuilder => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Theme_should_set_Theme()
        {
            builder.Theme("Telerik");
            sparkline.Theme.ShouldEqual("Telerik");
        }

        [Fact]
        public void Theme_should_return_builder()
        {
            builder.Theme("").ShouldBeSameAs(builder);
        }

        [Fact]
        public void ChartArea_with_builder_should_return_builder()
        {
            builder.ChartArea(sparklineArea => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Series_should_return_builder()
        {
            builder.Series(series => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void SeriesDefaults_should_return_builder()
        {
            builder.SeriesDefaults(seriesDefaults => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void CategoryAxis_return_builder()
        {
            builder.CategoryAxis(axis => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void DataSource_return_builder()
        {
            builder.DataSource(dataSource => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void AutoBind_should_set_AutoBind()
        {
            builder.AutoBind(false);
            sparkline.AutoBind.ShouldEqual(false);
        }

        [Fact]
        public void AutoBind_should_return_builder()
        {
            builder.AutoBind(false).ShouldBeSameAs(builder);
        }

        [Fact]
        public void SeriesColors_should_return_builder()
        {
            builder.SeriesColors(new string[] { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void SeriesColors_should_set_seriesColors()
        {
            var colors = new string[] { "red" };
            builder.SeriesColors(colors);

            builder.Component.SeriesColors.ShouldBeSameAs(colors);
        }

        [Fact]
        public void SeriesColors_should_set_seriesColors_from_params()
        {
            builder.SeriesColors("red");

            builder.Component.SeriesColors.First().ShouldEqual("red");
        }

        [Fact]
        public void Tooltip_should_set_visibility()
        {
            builder.Tooltip(true);
            sparkline.Tooltip.Visible.Value.ShouldBeTrue();
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
            sparkline.Tooltip.Visible.Value.ShouldBeTrue();
        }

        [Fact]
        public void Tooltip_with_builder_should_return_builder()
        {
            builder.Tooltip(legend => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Transitions_should_set_Transitions()
        {
            builder.Transitions(false);
            sparkline.Transitions.ShouldEqual(false);
        }

        [Fact]
        public void Transitions_should_return_builder()
        {
            builder.Transitions(false).ShouldBeSameAs(builder);
        }

    }
}