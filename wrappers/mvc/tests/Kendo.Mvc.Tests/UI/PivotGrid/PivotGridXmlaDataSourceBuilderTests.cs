namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class PivotGridXmlaDataSourceBuilderTests
    {
        private readonly PivotGridDataSource dataSource;
        private readonly PivotGridXmlaDataSourceBuilder builder;

        public PivotGridXmlaDataSourceBuilderTests()
        {
            dataSource = new PivotGridDataSource();
            builder = new PivotGridXmlaDataSourceBuilder(dataSource, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void Transport_should_return_builder()
        {
            builder.Transport(r => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Schema_Data_is_empty_string()
        {
            Assert.Equal(dataSource.Schema.Data, "");
        }

        [Fact]
        public void Schema_Total_is_empty_string()
        {
            Assert.Equal(dataSource.Schema.Total, "");
        }

        [Fact]
        public void Schema_Errors_is_empty_string()
        {
            Assert.Equal(dataSource.Schema.Errors, "");
        }

        [Fact]
        public void Events_should_configure_the_events()
        {
            builder.Events(e => e.RequestStart("OnRequestStart"));
            dataSource.Events.ContainsKey("requestStart").ShouldBeTrue();
        }

        [Fact]
        public void Events_should_return_builder()
        {
            builder.Events(e => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Columns_should_return_builder()
        {
            builder.Columns(c => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Rows_should_return_builder()
        {
            builder.Rows(r => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Measures_should_return_builder()
        {
            builder.Measures(m => { }).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Measures_should_configure_measures_options()
        {
            builder.Measures(m => m.Axis(PivotGridDataSourceMeasureAxis.Rows));
            dataSource.Measure.Axis.ShouldEqual(PivotGridDataSourceMeasureAxis.Rows);
        }
    }   
}
