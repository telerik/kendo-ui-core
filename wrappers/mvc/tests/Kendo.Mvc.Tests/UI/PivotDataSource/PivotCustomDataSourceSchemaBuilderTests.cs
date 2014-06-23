namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class PivotCustomDataSourceSchemaBuilderTests
    {
        private readonly PivotDataSourceSchema schema;
        private readonly PivotCustomDataSourceSchemaBuilder builder;

        public PivotCustomDataSourceSchemaBuilderTests()
        {
            schema = new PivotDataSourceSchema();
            builder = new PivotCustomDataSourceSchemaBuilder(schema);
        }

        [Fact]
        public void Axes_should_return_builder()
        {
            builder.Axes("Axes").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Axes_should_configure_corresponding_property()
        {
            string axes = "Axes";
            builder.Axes(axes);
            Assert.Equal(schema.Axes, axes);
        }

        [Fact]
        public void Cubes_should_return_builder()
        {
            builder.Cubes("Cubes").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Cubes_should_configure_corresponding_property()
        {
            string cubes = "Cubes";
            builder.Cubes(cubes);
            Assert.Equal(schema.Cubes, cubes);
        }

        [Fact]
        public void Catalogs_should_return_builder()
        {
            builder.Catalogs("Catalogs").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Catalogs_should_configure_corresponding_property()
        {
            string catalogs = "Catalogs";
            builder.Catalogs(catalogs);
            Assert.Equal(schema.Catalogs, catalogs);
        }

        [Fact]
        public void Measures_should_return_builder()
        {
            builder.Measures("Measures").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Measures_should_configure_corresponding_property()
        {
            string measures = "Measures";
            builder.Measures(measures);
            Assert.Equal(schema.Measures, measures);
        }

        [Fact]
        public void Dimensions_should_return_builder()
        {
            builder.Dimensions("Dimensions").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Dimensions_should_configure_corresponding_property()
        {
            string dimensions = "Dimensions";
            builder.Dimensions(dimensions);
            Assert.Equal(schema.Dimensions, dimensions);
        }

        [Fact]
        public void Hierarchies_should_return_builder()
        {
            builder.Hierarchies("Hierarchies").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Hierarchies_should_configure_corresponding_property()
        {
            string hierarchies = "Hierarchies";
            builder.Hierarchies(hierarchies);
            Assert.Equal(schema.Hierarchies, hierarchies);
        }

        [Fact]
        public void Levels_should_return_builder()
        {
            builder.Levels("Levels").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Levels_should_configure_corresponding_property()
        {
            string Levels = "Levels";
            builder.Levels(Levels);
            Assert.Equal(schema.Levels, Levels);
        }

        [Fact]
        public void Type_should_return_builder()
        {
            builder.Levels("Type").ShouldBeSameAs(builder);
        }

        [Fact]
        public void Type_should_configure_corresponding_property()
        {
            string Type = "Type";
            builder.Type(Type);
            Assert.Equal(schema.Type, Type);
        }
    }
}
