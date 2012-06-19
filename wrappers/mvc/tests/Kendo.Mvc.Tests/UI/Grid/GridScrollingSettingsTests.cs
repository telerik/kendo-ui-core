namespace Kendo.Mvc.UI.Tests
{
    using Xunit;

    public class GridScrollingSettingsTests
    {
        [Fact]
        public void Should_serialize_virtual_if_set()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Scrollable.Enabled = true;
            grid.Scrollable.Virtual = true;

            var result = grid.Scrollable.ToJson();
            result.ContainsKey("virtual").ShouldBeTrue();
        }

        [Fact]
        public void Should__not_serialize_virtual_if_not_set()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Scrollable.Enabled = true;
            grid.Scrollable.Virtual = false;

            var result = grid.Scrollable.ToJson();
            result.ContainsKey("virtual").ShouldBeFalse();
        }   
    }
}
