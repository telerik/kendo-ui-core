namespace Kendo.Mvc.UI.Fluent.Tests
{
    using Kendo.Mvc.UI;
    using Xunit;

    public class CustomDataSourceBuilderBaseTests
    {
         private readonly DataSource dataSource;
         private readonly CustomDataSourceBuilderBaseDouble builder;

        public CustomDataSourceBuilderBaseTests()
        {
            dataSource = new DataSource();
            builder = new CustomDataSourceBuilderBaseDouble(dataSource, TestHelper.CreateViewContext(), new UrlGenerator());
        }

        [Fact]
        public void AutoSync_sets_corresponding_property()
        {
            builder.AutoSync(true);
            dataSource.AutoSync.ShouldBeTrue();
        }

        [Fact]
        public void Batch_sets_corresponding_property()
        {
            builder.Batch(true);
            dataSource.Batch.ShouldBeTrue();
        }

        [Fact]
        public void Events_sets_corresponding_property()
        {
            builder.Events(e => e.Change("change"));
            dataSource.Events.Count.ShouldEqual(1);
        }

        [Fact]
        public void Page_sets_corresponding_property()
        {
            builder.Page(5);
            dataSource.Page.ShouldEqual(5);
        }

        [Fact]
        public void PageSize_sets_corresponding_property()
        {
            builder.PageSize(5);
            dataSource.PageSize.ShouldEqual(5);
        }

        [Fact]
        public void ServerOperation_builder_overload_sets_corresponding_property()
        {
            builder.ServerPaging(true);
            dataSource.ServerPaging.ShouldBeTrue();
        }

        [Fact]
        public void Total_sets_corresponding_property()
        {
            builder.Total(5);
            dataSource.Total.ShouldEqual(5);
        }

        [Fact]
        public void ServerOperations_are_false_by_default()
        {
            dataSource.ServerPaging.ShouldBeFalse();
            dataSource.ServerFiltering.ShouldBeFalse();
            dataSource.ServerSorting.ShouldBeFalse();
            dataSource.ServerGrouping.ShouldBeFalse();
            dataSource.ServerAggregates.ShouldBeFalse();
        }
    }
}
