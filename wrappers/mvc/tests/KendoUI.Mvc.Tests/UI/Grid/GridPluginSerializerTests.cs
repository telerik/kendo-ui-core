namespace Telerik.Web.Mvc.UI.Tests
{
    using Xunit;

    class GridPluginSerializerTests
    {
        [Fact]
        public void Should_serialize_grouping()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Grouping.Enabled = true;

            Assert.Contains("grouping", new GridPluginSerializer(grid).Serialize());
        }

        [Fact]
        public void Should_not_serialize_grouping_by_default()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            Assert.DoesNotContain("grouping", new GridPluginSerializer(grid).Serialize());
        }

        [Fact]
        public void Should_serialize_editing()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Editing.Enabled = true;

            Assert.Contains("editing", new GridPluginSerializer(grid).Serialize());
        }

        [Fact]
        public void Should_not_serialize_editing_by_default()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            Assert.DoesNotContain("editing", new GridPluginSerializer(grid).Serialize());
        }

        [Fact]
        public void Should_serialize_filtering()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Filtering.Enabled = true;

            Assert.Contains("filtering", new GridPluginSerializer(grid).Serialize());
        }

        [Fact]
        public void Should_not_serialize_filtering_by_default()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            Assert.DoesNotContain("filtering", new GridPluginSerializer(grid).Serialize());
        }
    }
}
