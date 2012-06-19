namespace Kendo.Mvc.UI.Tests
{
    using Xunit;

    public class GridEditingSettingsTests
    {
        [Fact]
        public void Should_serialize_confirm_delete_if_true()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Editable.Enabled = true;            

            var result = grid.Editable.ToJson();
            result.ContainsKey("confirmation").ShouldBeTrue();
        }

        [Fact]
        public void Should_not_serialize_confirm_delete_if_false()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Editable.Enabled = true;

            grid.Editable.DisplayDeleteConfirmation = false;

            var result = grid.Editable.ToJson();

            result.ContainsKey("confirmation").ShouldBeFalse();
        }       
    }
}
