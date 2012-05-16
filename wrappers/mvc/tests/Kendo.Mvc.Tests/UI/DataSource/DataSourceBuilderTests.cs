namespace Kendo.Mvc.Tests
{
    using Xunit;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Moq;

    public class DataSourceBuilderTests
    {
        private DataSource dataSource;
        private DataSourceBuilder builder;

        public DataSourceBuilderTests()
        {
            dataSource = new DataSource();
            builder = new DataSourceBuilder(dataSource, TestHelper.CreateViewContext(), new Mock<IUrlGenerator>().Object);
        }

        [Fact]
        public void PageSize_is_set_to_DataSource()
        {
            builder.PageSize(42);
            dataSource.PageSize.ShouldEqual(42);
        }

        [Fact]
        public void ServerPaging_is_set_to_DataSource()
        {
            builder.ServerPaging();
            dataSource.ServerPaging.ShouldBeTrue();
        }

        [Fact]
        public void ServerPaging_is_set_to_DataSource_if_set()
        {
            builder.ServerPaging(true);
            dataSource.ServerPaging.ShouldBeTrue();
        }

        [Fact]
        public void ServerSorting_is_set_to_DataSource()
        {
            builder.ServerSorting();
            dataSource.ServerSorting.ShouldBeTrue();
        }

        [Fact]
        public void ServerSorting_is_set_to_DataSource_if_set()
        {
            builder.ServerSorting(true);
            dataSource.ServerSorting.ShouldBeTrue();
        }

        [Fact]
        public void ServerFiltering_is_set_to_DataSource()
        {
            builder.ServerFiltering();
            dataSource.ServerFiltering.ShouldBeTrue();
        }

        [Fact]
        public void ServerFiltering_is_set_to_DataSource_if_set()
        {
            builder.ServerFiltering(true);
            dataSource.ServerFiltering.ShouldBeTrue();
        }
    }
}
