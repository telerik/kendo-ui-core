namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Xunit;

    public class PivotDataSourceRowBuilderTests
    {
        private readonly PivotDataSourceRow row;
        private readonly PivotDataSourceRowBuilder builder;

        public PivotDataSourceRowBuilderTests()
        {
            row = new PivotDataSourceRow();
            builder = new PivotDataSourceRowBuilder(row);
        }

        [Fact]
        public void Row_expand_sets_the_corresponding_property()
        {
            bool isExpanded = true;
            builder.Expand(isExpanded);

            Assert.Equal(isExpanded, row.Expand);
        }

        [Fact]
        public void Row_expand_should_return_builder()
        {
            builder.Expand(true).ShouldBeSameAs(builder);
        }
    }
}
