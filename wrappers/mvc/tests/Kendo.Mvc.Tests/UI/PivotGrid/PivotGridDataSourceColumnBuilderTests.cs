namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class PivotGridDataSourceColumnBuilderTests
    {
        private readonly PivotGridDataSourceColumn column;
        private readonly PivotGridDataSourceColumnBuilder builder;

        public PivotGridDataSourceColumnBuilderTests()
        {
            column = new PivotGridDataSourceColumn();
            builder = new PivotGridDataSourceColumnBuilder(column);
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
