namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class PivotAjaxDataSourceSchemaBuilderTests
    {
        private readonly PivotDataSourceSchema schema;
        private readonly PivotAjaxDataSourceSchemaBuilder<object> builder;

        public PivotAjaxDataSourceSchemaBuilderTests()
        {
            schema = new PivotDataSourceSchema();
            builder = new PivotAjaxDataSourceSchemaBuilder<object>(schema);
        }

        [Fact]
        public void Cube_should_return_builder()
        {
            builder.Cube(r => { }).ShouldBeSameAs(builder);
        }
    }
}
