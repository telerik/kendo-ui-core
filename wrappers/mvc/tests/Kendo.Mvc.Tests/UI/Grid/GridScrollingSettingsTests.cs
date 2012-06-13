namespace Kendo.Mvc.UI.Tests
{
    using Xunit;

    public class GridScrollingSettingsTests
    {
        [Fact]
        public void Should_serialize_virtual_if_set()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Scrolling.Enabled = true;
            grid.Scrolling.Virtual = true;

            var result = grid.Scrolling.ToJson();
            result.ContainsKey("virtual").ShouldBeTrue();
        }

        [Fact]
        public void Should__not_serialize_virtual_if_not_set()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Scrolling.Enabled = true;
            grid.Scrolling.Virtual = false;

            var result = grid.Scrolling.ToJson();
            result.ContainsKey("virtual").ShouldBeFalse();
        }   
    }
}
