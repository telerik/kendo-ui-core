namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using Xunit;

    public class DataSourceServerOperationBuilderTests
    {
        private readonly DataSource dataSource;
        private readonly DataSourceServerOperationBuilder builder;

        public DataSourceServerOperationBuilderTests()
        {
            dataSource = new DataSource();
            builder = new DataSourceServerOperationBuilder(dataSource);
        }

        [Fact]
        public void ServerPaging_should_set_corresponding_property()
        {
            builder.ServerPaging(true);

            dataSource.ServerPaging.ShouldBeTrue();
        }

        [Fact]
        public void ServerSorting_should_set_corresponding_property()
        {
            builder.ServerSorting(true);

            dataSource.ServerSorting.ShouldBeTrue();
        }

        [Fact]
        public void ServerGrouping_should_set_corresponding_property()
        {
            builder.ServerGrouping(true);

            dataSource.ServerGrouping.ShouldBeTrue();
        }

        [Fact]
        public void ServerFiltering_should_set_corresponding_property()
        {
            builder.ServerFiltering(true);

            dataSource.ServerFiltering.ShouldBeTrue();
        }

        [Fact]
        public void ServerAggregates_should_set_corresponding_property()
        {
            builder.ServerAggregates(true);

            dataSource.ServerAggregates.ShouldBeTrue();
        }

    }
}
