namespace Telerik.Web.Mvc.UI.Fluent.Tests
{
    using Telerik.Web.Mvc.UI.Tests;
    using Xunit;
#if MVC2 || MVC3
    public class GridActionCommandFactoryTests
    {
        internal static GridActionColumn<Customer> column;

        public GridActionCommandFactoryTests()
        {
            column = new GridActionColumn<Customer>(GridTestHelper.CreateGrid<Customer>());
        }

        private static GridActionCommandFactory<Customer> Factory()
        {
            return new GridActionCommandFactory<Customer>(column);
        }

        [Fact]
        public void Edit_command_should_EditCommand_to_commands_collection_of_the_column() 
        {
            column.Commands.Clear();
            
            Factory().Edit();

            var command = column.Commands[0];

            Assert.NotNull(command as GridEditActionCommand);
        }

        [Fact]
        public void Edit_command_should_enable_editing()
        {
            column.Grid.Editing.Enabled = false;

            Factory().Edit();

            Assert.True(column.Grid.Editing.Enabled);
        }

        [Fact]
        public void Delete_command_should_DeleteCommand_to_commands_collection_of_the_column()
        {
            column.Commands.Clear();

            Factory().Delete();

            var command = column.Commands[0];

            Assert.NotNull(command as GridDeleteActionCommand);
        }

        [Fact]
        public void Delete_command_should_enable_editing()
        {
            column.Grid.Editing.Enabled = false;

            Factory().Delete();

            Assert.True(column.Grid.Editing.Enabled);
        }
    }
#endif
}
