namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class PivotGridDataSourceMeasureBuilderTests
    {
        private readonly PivotGridDataSourceMeasure measure;
        private readonly PivotGridDataSourceMeasureBuilder builder;

        public PivotGridDataSourceMeasureBuilderTests()
        {
            measure = new PivotGridDataSourceMeasure();
            builder = new PivotGridDataSourceMeasureBuilder(measure);
        }

        [Fact]
        public void Axis_should_return_builder()
        {
            builder.Axis(PivotGridDataSourceMeasureAxis.Columns).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Axis_sets_the_corresponding_property()
        {
            PivotGridDataSourceMeasureAxis axisValue = PivotGridDataSourceMeasureAxis.Rows;
            builder.Axis(axisValue);

            Assert.Equal(axisValue, measure.Axis);
        }

        [Fact]
        public void Values_should_return_builder()
        {
            builder.Values(new string[] {"test"}).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Values_sets_the_corresponding_property()
        {
            var values = new string[] { "test", "test2" };
            builder.Values(values);

            Assert.Equal(values, measure.Values);
        }
    }
}
