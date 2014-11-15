namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;
    using System.Linq;

    public class PivotDataSourceMeasureBuilderTests
    {
        private readonly PivotDataSourceMeasure measure;
        private readonly PivotDataSourceMeasureBuilder builder;

        public PivotDataSourceMeasureBuilderTests()
        {
            measure = new PivotDataSourceMeasure();
            builder = new PivotDataSourceMeasureBuilder(measure);
        }

        [Fact]
        public void Axis_should_return_builder()
        {
            builder.Axis(PivotDataSourceMeasureAxis.Columns).ShouldBeSameAs(builder);
        }

        [Fact]
        public void Axis_sets_the_corresponding_property()
        {
            PivotDataSourceMeasureAxis axisValue = PivotDataSourceMeasureAxis.Rows;
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

            Assert.Equal(measure.Values.Count(), 2);
            Assert.Equal(values[0], measure.Values.ToList()[0].Name);
            Assert.Equal(values[1], measure.Values.ToList()[1].Name);
        }
    }
}
