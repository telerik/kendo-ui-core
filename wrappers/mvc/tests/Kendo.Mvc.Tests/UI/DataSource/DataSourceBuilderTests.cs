namespace Kendo.Mvc.Tests
{
    using Xunit;
    using Kendo.Mvc.UI;
    using Kendo.Mvc.UI.Fluent;
    using Moq;

    public class DataSourceBuilderTests
    {
        private DataSource dataSource;
        private DataSourceBuilder<TestObject> builder;

        public DataSourceBuilderTests()
        {
            dataSource = new DataSource();
            builder = new DataSourceBuilder<TestObject>(dataSource, TestHelper.CreateViewContext(), new Mock<IUrlGenerator>().Object);
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

        [Fact]
        public void OrderBy_adds_sort_expressions() 
        {
            builder.Sort(sort => sort.Add(f => f.ID).Descending());

            dataSource.OrderBy.Count.ShouldEqual(1);
            dataSource.OrderBy[0].Member.ShouldEqual("ID");
            dataSource.OrderBy[0].SortDirection.ShouldEqual(System.ComponentModel.ListSortDirection.Descending);
        }

        [Fact]
        public void OrderBy_adds_multiple_sort_expressions()
        {
            builder.Sort(sort => {
                sort.Add(f => f.ID).Descending();
                sort.Add(f => f.Text);
            });

            dataSource.OrderBy.Count.ShouldEqual(2);
            dataSource.OrderBy[0].Member.ShouldEqual("ID");
            dataSource.OrderBy[0].SortDirection.ShouldEqual(System.ComponentModel.ListSortDirection.Descending);

            dataSource.OrderBy[1].Member.ShouldEqual("Text");
            dataSource.OrderBy[1].SortDirection.ShouldEqual(System.ComponentModel.ListSortDirection.Ascending);
        }

        [Fact]
        public void Group_adds_group_expressions()
        {
            builder.Group(groups =>
            {
                groups.Add(f => f.ID);
                groups.AddDescending(f => f.Text);
            });

            dataSource.Groups.Count.ShouldEqual(2);
            dataSource.Groups[0].Member.ShouldEqual("ID");            
            dataSource.Groups[0].SortDirection.ShouldEqual(System.ComponentModel.ListSortDirection.Ascending);

            dataSource.Groups[1].Member.ShouldEqual("Text");            
            dataSource.Groups[1].SortDirection.ShouldEqual(System.ComponentModel.ListSortDirection.Descending);
        }
    }
}
