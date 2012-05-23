namespace Kendo.Mvc.UI.Tests
{
    using Xunit;

    public class GridEditingSettingsTests
    {
        [Fact]
        public void Should_serialize_confirm_delete_if_false()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Editing.Enabled = true;
            grid.Editing.DisplayDeleteConfirmation = false;

            var result = grid.Editing.Serialize();
            Assert.Equal(false, result["confirmDelete"]);
        }

        [Fact]
        public void Should_not_serialize_confirm_delete_if_true()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Editing.Enabled = true;

            var result = grid.Editing.Serialize();
            Assert.False(result.ContainsKey("confirmDelete"));
        }       
    }
}
