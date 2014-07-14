namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class PivotAjaxDataSourceSchemaCubeDimensionBuilderTests
    {
        private readonly PivotDataSourceSchemaDimensionDescriptor dimension;
        private readonly PivotAjaxDataSourceSchemaCubeDimensionBuilder builder;

        public PivotAjaxDataSourceSchemaCubeDimensionBuilderTests()
        {
            dimension = new PivotDataSourceSchemaDimensionDescriptor();
            builder = new PivotAjaxDataSourceSchemaCubeDimensionBuilder(dimension);
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

            dimension.Caption.ShouldBeSameAs(captionValue);
        }
    }
}
