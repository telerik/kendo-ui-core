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

        [Fact]
        public void Should_serialize_create_at_if_bottom()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Editable.Enabled = true;
            grid.Editable.CreateAt = GridInsertRowPosition.Bottom;

            var result = grid.Editable.ToJson();
            result.ContainsKey("createAt").ShouldBeTrue();
            result["createAt"].ShouldEqual("bottom");
        }

        [Fact]
        public void Should_not_serialize_create_at_if_top()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Editable.Enabled = true;           

            var result = grid.Editable.ToJson();

            result.ContainsKey("createAt").ShouldBeFalse();
        }
    }
}
