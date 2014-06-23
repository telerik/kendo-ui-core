namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class PivotDataSourceColumnBuilderTests
    {
        private readonly PivotDataSourceColumn column;
        private readonly PivotDataSourceColumnBuilder builder;

        public PivotDataSourceColumnBuilderTests()
        {
            column = new PivotDataSourceColumn();
            builder = new PivotDataSourceColumnBuilder(column);
        }

        [Fact]
        public void Column_expand_sets_the_corresponding_property()
        {
            bool isExpanded = true;
            builder.Expand(isExpanded);

            Assert.Equal(isExpanded, column.Expand);
        }

        [Fact]
        public void Column_expand_should_return_builder()
        {
            builder.Expand(true).ShouldBeSameAs(builder);
        }
    }
}
