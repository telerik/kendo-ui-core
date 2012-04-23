namespace Telerik.Web.Mvc.UI.Tests
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

#if MVC2 || MVC3
        [Fact]
        public void Should_not_serialize_default_item_if_server_binding()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Editing.Enabled = true;
            grid.Server.Enabled = true;

            var result = grid.Editing.Serialize();
            result.ContainsKey("defaultDataItem").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_default_item_if_ajax_binding()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Editing.Enabled = true;
            grid.Ajax.Enabled = true;

            var result = grid.Editing.Serialize();
            result.ContainsKey("defaultDataItem").ShouldBeTrue();
        }
#endif
    }
}
