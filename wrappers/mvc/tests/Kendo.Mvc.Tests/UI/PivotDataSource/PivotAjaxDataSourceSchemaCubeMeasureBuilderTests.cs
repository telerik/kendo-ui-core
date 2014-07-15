namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class PivotAjaxDataSourceSchemaCubeMeasureBuilderTests
    {

        private readonly PivotDataSourceSchemaMeasureDescriptor measure;
        private readonly PivotAjaxDataSourceSchemaCubeMeasureBuilder<object> builder;

        public PivotAjaxDataSourceSchemaCubeMeasureBuilderTests()
        {
            measure = new PivotDataSourceSchemaMeasureDescriptor();
            builder = new PivotAjaxDataSourceSchemaCubeMeasureBuilder<object>(measure);
        }

        [Fact]
        public void Caption_should_return_builder()
        {
            builder.Caption("Caption").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Caption_should_configure_corresponding_option()
        {
            string captionValue = "caption test";
            builder.Caption(captionValue);

            measure.Caption.ShouldBeSameAs(captionValue);
        }

        [Fact]
        public void Field_should_return_builder()
        {
            builder.Field("Field").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Field_should_configure_corresponding_option()
        {
            string fieldValue = "FieldName";
            builder.Field(fieldValue);

            measure.Field.ShouldBeSameAs(fieldValue);
        }

        [Fact]
        public void Format_should_return_builder()
        {
            builder.Format("{0}").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Format_should_configure_corresponding_option()
        {
            string formatValue = "{0}";
            builder.Format(formatValue);

            measure.Format.ShouldBeSameAs(formatValue);
        }

        [Fact]
        public void Aggregate_should_return_builder()
        {
            builder.Aggregate("aggregate").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Aggregate_should_configure_corresponding_option()
        {
            string aggregateValue = "aggregateFunction";
            builder.Aggregate(aggregateValue);

            measure.Aggregate.HandlerName.ShouldBeSameAs(aggregateValue);
        }
    }
}
