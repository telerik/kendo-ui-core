namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class PivotGridDataSourceTransportConnectionBuilderTests
    {
        private readonly PivotGridTransportConnection connection;
        private readonly PivotGridDataSourceTransportConnectionBuilder builder;

        public PivotGridDataSourceTransportConnectionBuilderTests()
        {
            connection = new PivotGridTransportConnection();
            builder = new PivotGridDataSourceTransportConnectionBuilder(connection);
        }

        [Fact]
        public void Cube_should_return_builder()
        {
            builder.Cube("cubeName").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Cube_sets_the_corresponding_property()
        {
            string cubeName = "cubeName";

            builder.Cube(cubeName);
            Assert.Equal(connection.Cube, cubeName);
        }

        [Fact]
        public void Catalog_should_return_builder()
        {
            builder.Catalog("cubeName").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Catalog_sets_the_corresponding_property()
        {
            string catalogName = "cubeName";

            builder.Catalog(catalogName);
            Assert.Equal(connection.Catalog, catalogName);
        }
    }
}
