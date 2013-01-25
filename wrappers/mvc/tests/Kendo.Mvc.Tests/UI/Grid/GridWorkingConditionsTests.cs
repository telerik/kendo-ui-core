namespace Kendo.Mvc.UI.Tests.Grid
{

    using System;
    using Xunit;

    public class GridWorkingConditionsTests
    {
        private readonly Grid<Customer> grid;
        private readonly Customer customer;

        public GridWorkingConditionsTests()
        {
            grid = GridTestHelper.CreateGrid<Customer>();

            customer = new Customer { Id = 1, Name = "John Doe" };
            grid.DataSource.Data = new[] { customer };

            grid.Columns.Add(new GridBoundColumn<Customer, int>(grid, c => c.Id));
            grid.Columns.Add(new GridBoundColumn<Customer, string>(grid, c => c.Name));
        }

        [Fact]
        public void Should_throw_when_editing_enabled_but_no_data_keys_set()
        {
            grid.Editable.Enabled = true;

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_when_selection_enabled_but_no_data_keys_set()
        {
            grid.Selectable.Enabled = true;

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_data_binding_is_not_configured_for_edit_command_ajax()
        {
            ConfigureEditing(g =>
            {
                g.DataSource.Type = DataSourceType.Ajax;
                grid.Columns.Add(new GridActionColumn<Customer>(grid)
                {
                    Commands =
                    {
                        new GridEditActionCommand()
                    }
                });
            });
        }

        [Fact]
        public void Should_throw_if_data_binding_is_not_configured_for_delete_command_ajax()
        {
            ConfigureEditing(g =>
            {
                g.DataSource.Type = DataSourceType.Ajax;
                grid.Columns.Add(new GridActionColumn<Customer>(grid)
                {
                    Commands =
                    {
                        new GridDestroyActionCommand()
                    }
                });
            });
        }

        [Fact]
        public void Should_throw_if_data_binding_is_not_configured_for_insert_command_ajax()
        {
            ConfigureEditing(g =>
            {
                g.DataSource.Type = DataSourceType.Ajax;
                g.ToolBar.Commands.Add(new GridToolBarCreateCommand<Customer>());
            });
        }        

        [Fact]
        public void Should_throw_if_data_binding_is_not_configured_for_edit_command_server()
        {
            ConfigureEditing(g =>
            {
                grid.Columns.Add(new GridActionColumn<Customer>(grid)
                {
                    Commands =
                    {
                        new GridEditActionCommand()
                    }
                });
            });
        }

        [Fact]
        public void Should_throw_if_data_binding_is_not_configured_for_delete_command_server()
        {
            ConfigureEditing(g =>
            {
                g.Columns.Add(new GridActionColumn<Customer>(grid)
                {
                    Commands =
                    {
                        new GridEditActionCommand()
                    }
                });
            });
        }

        [Fact]
        public void Should_throw_if_data_binding_is_not_configured_for_insert_command_server()
        {
            ConfigureEditing(g =>
            {
                g.ToolBar.Commands.Add(new GridToolBarCreateCommand<Customer>());
            });
        }

        private void ConfigureEditing(Action<Grid<Customer>> configurator)
        {
            grid.Editable.Enabled = true;
            grid.DataKeys.Add(new GridDataKey<Customer, int>(c => c.Id));

            configurator(grid);

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }        

        [Fact]
        public void Should_throw_when_using_templates_and_ajax()
        {
            grid.DataSource.Type = DataSourceType.Ajax;
            grid.Columns[0].Template = delegate { };

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Shound_not_throw_when_both_server_and_client_templates_are_set()
        {
            grid.DataSource.Type = DataSourceType.Ajax;
            grid.Columns[0].Template = delegate { };
            ((IGridBoundColumn)grid.Columns[0]).ClientTemplate = "<#= #>";

            Assert.DoesNotThrow(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_when_using_template_columns_and_ajax()
        {
            grid.DataSource.Type = DataSourceType.Ajax;
            grid.Columns.Add(new GridTemplateColumn<Customer>(grid, delegate { }));

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Shound_not_throw_for_template_column_with_client_template_set()
        {
            grid.DataSource.Type = DataSourceType.Ajax;

            grid.Columns.Add(new GridTemplateColumn<Customer>(grid, delegate { })
            {
                ClientTemplate = "<#= #>"
            });

            Assert.DoesNotThrow(() => grid.VerifySettings());
        }        

        [Fact]
        public void Should_throw_if_grid_rtl_class_is_set()
        {
            grid.HtmlAttributes["class"] = "k-grid-rtl";
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_not_throw_if_binding_mode_is_server_and_server_detailView_template_is_used()
        {
            grid.DataSource.Type = DataSourceType.Server;
            
            grid.DetailTemplate.Html = "foo";
            Assert.DoesNotThrow(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_binding_mode_is_server_and_virtual_scrolling_is_enabled()
        {
            grid.DataSource.Type = DataSourceType.Server;

            grid.Scrollable.Enabled = true;
            grid.Scrollable.Virtual = true;
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_binding_mode_is_ajax_and_server_detailView_template_is_used()
        {
            grid.DataSource.Type = DataSourceType.Ajax;
            
            grid.DetailTemplate.Html = "foo";            
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_not_throw_if_binding_mode_is_ajax_and_server_detailView_template_is_used_and_client_template_is_set()
        {
            grid.DataSource.Type = DataSourceType.Ajax;
           
            grid.DetailTemplate.Html = "foo";
            grid.ClientDetailTemplateId = "bar";
            Assert.DoesNotThrow(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_bound_to_data_row_view_column_editor_template_is_set_and_in_inLine_mode()
        {
            var dataRowViewGrid = GridTestHelper.CreateGrid<System.Data.DataRowView>();

            dataRowViewGrid.Editable.Mode = GridEditMode.InLine;
            dataRowViewGrid.Columns.Add(new GridBoundColumn<System.Data.DataRowView, object>(dataRowViewGrid, c => c) { EditorTemplateName = "sometemplate" });

            dataRowViewGrid.Editable.Enabled = true;
            Assert.Throws<NotSupportedException>(() => dataRowViewGrid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_in_cell_mode_is_enabled_and_server_binding_is_used()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.DataKeys.Add(new GridDataKey<Customer, int>(c => c.Id));
            grid.Editable.Enabled = true;
            grid.Editable.Mode = GridEditMode.InCell;
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_in_cell_mode_is_enabled_client_row_template_is_set()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.DataKeys.Add(new GridDataKey<Customer, int>(c => c.Id));
            grid.DataSource.Type = DataSourceType.Ajax;
            grid.Editable.Enabled = true;
            grid.Editable.Mode = GridEditMode.InCell;
            grid.ClientRowTemplate = "foo";
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_custom_command_rounting_and_ajax_binding_is_set()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();            
            grid.DataSource.Type = DataSourceType.Ajax;
            var column = new GridActionColumn<Customer>(grid);
            var command = new GridCustomActionCommand<Customer>();
            command.RouteName = "foo";
            column.Commands.Add(command);
            grid.Columns.Add(column);
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_submitChanges_button_is_present_and_edit_mode_is_not_in_cell()
        {
            ConfigureEditing(g =>
            {
                g.ToolBar.Commands.Add(new GridToolBarSaveCommand<Customer>());
            });
        }
        
        [Fact]
        public void Should_not_throw_if_in_cell_mode_and_add_command_is_defined_and_insert_setting_is_not_specified()
        {
            grid.Editable.Enabled = true;
            grid.Editable.Mode = GridEditMode.InCell;
            grid.DataSource.Type = DataSourceType.Ajax;
            grid.DataKeys.Add(new GridDataKey<Customer, int>(c => c.Id));
            grid.ToolBar.Commands.Add(new GridToolBarCreateCommand<Customer>());

            Assert.DoesNotThrow(() => grid.VerifySettings());
        }        
        
        [Fact]
        public void Should_not_throw_if_in_cell_mode_and_delete_command_is_defined_and_delete_setting_is_not_specified()
        {
            grid.Editable.Enabled = true;
            grid.Editable.Mode = GridEditMode.InCell;
            grid.DataSource.Type = DataSourceType.Ajax;
            grid.DataKeys.Add(new GridDataKey<Customer, int>(c => c.Id));
            grid.Columns.Add(new GridActionColumn<Customer>(grid)
            {
                Commands =
                    {
                        new GridDestroyActionCommand()
                    }
            });

            Assert.DoesNotThrow(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_autobind_is_set_with_server_binding()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.DataSource.Type = DataSourceType.Server;
            grid.AutoBind = true;
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_autobind_is_set_with_initial_ajax_binding()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.DataSource.Data = new Customer[] { new Customer() };
            grid.DataSource.Type = DataSourceType.Ajax;
            grid.AutoBind = false;
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_not_throw_if_autobind_is_set_and_no_data_is_supplied_ajax_binding()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.DataSource.Data = new Customer[] { new Customer() };
            grid.DataSource.Type = DataSourceType.Ajax;
            grid.AutoBind = false;
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }
    }
}
