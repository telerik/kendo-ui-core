namespace Telerik.Web.Mvc.UI.Tests.Grid
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
            grid.DataSource = new[] { customer };

            grid.Columns.Add(new GridBoundColumn<Customer, int>(grid, c => c.Id));
            grid.Columns.Add(new GridBoundColumn<Customer, string>(grid, c => c.Name));
        }

        [Fact]
        public void Should_throw_when_editing_enabled_but_no_data_keys_set()
        {
            grid.Editing.Enabled = true;

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_when_selection_enabled_but_no_data_keys_set()
        {
            grid.Selection.Enabled = true;

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_data_binding_is_not_configured_for_edit_command_ajax()
        {
            ConfigureEditing(g =>
            {
                g.Ajax.Enabled = true;
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
                g.Ajax.Enabled = true;
                grid.Columns.Add(new GridActionColumn<Customer>(grid)
                {
                    Commands =
                    {
                        new GridDeleteActionCommand()
                    }
                });
            });
        }

        [Fact]
        public void Should_throw_if_data_binding_is_not_configured_for_insert_command_ajax()
        {
            ConfigureEditing(g =>
            {
                g.Ajax.Enabled = true;
                g.ToolBar.Commands.Add(new GridToolBarInsertCommand<Customer>());
            });
        }

        [Fact]
        public void Should_throw_if_data_binding_is_not_configured_for_edit_command_web_service()
        {
            ConfigureEditing(g =>
            {
                g.WebService.Enabled = true;
                g.WebService.Select.Url = "#";
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
        public void Should_throw_if_data_binding_is_not_configured_for_insert_command_web_service()
        {
            ConfigureEditing(g =>
            {
                g.WebService.Enabled = true;
                g.WebService.Select.Url = "#";
                g.ToolBar.Commands.Add(new GridToolBarInsertCommand<Customer>());
            });
        }

        [Fact]
        public void Should_throw_if_data_binding_is_not_configured_for_delete_command_web_service()
        {
            ConfigureEditing(g =>
            {
                g.WebService.Enabled = true;
                g.WebService.Select.Url = "#";
                grid.Columns.Add(new GridActionColumn<Customer>(grid)
                {
                    Commands =
                    {
                        new GridDeleteActionCommand()
                    }
                });
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
                g.ToolBar.Commands.Add(new GridToolBarInsertCommand<Customer>());
            });
        }

        private void ConfigureEditing(Action<Grid<Customer>> configurator)
        {
            grid.Editing.Enabled = true;
            grid.DataKeys.Add(new GridDataKey<Customer, int>(c => c.Id));

            configurator(grid);

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_when_both_ajax_and_web_service_are_enabled()
        {
            grid.Ajax.Enabled = grid.WebService.Enabled = true;

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_when_using_templates_and_ajax()
        {
            grid.Ajax.Enabled = true;
            grid.Columns[0].Template = delegate { };

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Shound_not_throw_when_both_server_and_client_templates_are_set()
        {
            grid.Ajax.Enabled = true;
            grid.Columns[0].Template = delegate { };
            ((IGridBoundColumn)grid.Columns[0]).ClientTemplate = "<#= #>";

            Assert.DoesNotThrow(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_when_using_template_columns_and_ajax()
        {
            grid.Ajax.Enabled = true;
            grid.Columns.Add(new GridTemplateColumn<Customer>(grid, delegate { }));

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Shound_not_throw_for_template_column_with_client_template_set()
        {
            grid.Ajax.Enabled = true;

            grid.Columns.Add(new GridTemplateColumn<Customer>(grid, delegate { })
            {
                ClientTemplate = "<#= #>"
            });

            Assert.DoesNotThrow(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_when_using_templates_and_web_service()
        {
            grid.WebService.Enabled = true;
            grid.Columns[0].Template = delegate { };

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_web_service_url_is_not_set()
        {
            grid.WebService.Enabled = true;
            Assert.Throws<ArgumentException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_grid_rtl_class_is_set()
        {
            grid.HtmlAttributes["class"] = "t-grid-rtl";
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_not_throw_if_binding_mode_is_server_and_server_detailView_template_is_used()
        {
            grid.Server.Enabled = true;

            grid.DetailView = new GridDetailView<Customer>();
            grid.DetailView.Template.Html = "foo";
            Assert.DoesNotThrow(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_binding_mode_is_ajax_and_server_detailView_template_is_used()
        {
            grid.Ajax.Enabled = true;

            grid.DetailView = new GridDetailView<Customer>(); 
            grid.DetailView.Template.Html = "foo";            
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_not_throw_if_binding_mode_is_ajax_and_server_detailView_template_is_used_and_client_template_is_set()
        {
            grid.Ajax.Enabled = true;

            grid.DetailView = new GridDetailView<Customer>();
            grid.DetailView.Template.Html = "foo";
            grid.DetailView.ClientTemplate = "bar";
            Assert.DoesNotThrow(() => grid.VerifySettings());
        }
        [Fact]
        public void Should_throw_when_using_page_on_scroll_and_paging_disabled()
        {            
            grid.Paging.Enabled = false;
            grid.Paging.PageOnScroll = true;

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_when_using_page_on_scroll_and_scrolling_disabled()
        {
            grid.Paging.Enabled = true;
            grid.Paging.PageOnScroll = true;
            grid.Scrolling.Enabled = false;

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_when_using_page_on_scroll_and_server()
        {
            grid.Server.Enabled = true;
            grid.Paging.Enabled = true;
            grid.Paging.PageOnScroll = true;

            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_not_throw_when_using_page_on_scroll_and_ajax()
        {
            grid.Ajax.Enabled = true;
            grid.Paging.Enabled = true;
            grid.Paging.PageOnScroll = true;
            grid.Scrolling.Enabled = true;

            Assert.DoesNotThrow(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_not_throw_when_using_page_on_scroll_and_webservice()
        {
            grid.WebService.Enabled = true;
            grid.WebService.Select.Url = "some url";
            grid.Paging.Enabled = true;
            grid.Paging.PageOnScroll = true;
            grid.Scrolling.Enabled = true;

            Assert.DoesNotThrow(() => grid.VerifySettings());
        }

#if MVC2 || MVC3

        [Fact]
        public void Should_throw_if_bound_to_data_row_view_column_editor_template_is_set_and_in_inLine_mode()
        {
            var dataRowViewGrid = GridTestHelper.CreateGrid<System.Data.DataRowView>();

            dataRowViewGrid.Editing.Mode = GridEditMode.InLine;
            dataRowViewGrid.Columns.Add(new GridBoundColumn<System.Data.DataRowView, object>(dataRowViewGrid, c => c) { EditorTemplateName = "sometemplate" });

            dataRowViewGrid.Editing.Enabled = true;
            Assert.Throws<NotSupportedException>(() => dataRowViewGrid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_in_cell_mode_is_enabled_and_server_binding_is_used()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.DataKeys.Add(new GridDataKey<Customer, int>(c => c.Id));
            grid.Editing.Enabled = true;
            grid.Editing.Mode = GridEditMode.InCell;
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_in_cell_mode_is_enabled_client_row_template_is_set()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.DataKeys.Add(new GridDataKey<Customer, int>(c => c.Id));
            grid.DataBinding.Ajax.Enabled = true;
            grid.Editing.Enabled = true;
            grid.Editing.Mode = GridEditMode.InCell;
            grid.ClientRowTemplate = "foo";
            Assert.Throws<NotSupportedException>(() => grid.VerifySettings());
        }

        [Fact]
        public void Should_throw_if_submitChanges_button_is_present_and_edit_mode_is_not_in_cell()
        {
            ConfigureEditing(g =>
            {
                g.ToolBar.Commands.Add(new GridToolBarSubmitChangesCommand<Customer>());
            });
        }
        
        [Fact]
        public void Should_not_throw_if_in_cell_mode_and_add_command_is_defined_and_insert_setting_is_not_specified()
        {
            grid.Editing.Enabled = true;
            grid.Editing.Mode = GridEditMode.InCell;
            grid.Ajax.Enabled = true;
            grid.DataKeys.Add(new GridDataKey<Customer, int>(c => c.Id));
            grid.ToolBar.Commands.Add(new GridToolBarInsertCommand<Customer>());

            Assert.DoesNotThrow(() => grid.VerifySettings());
        }        
        
        [Fact]
        public void Should_not_throw_if_in_cell_mode_and_delete_command_is_defined_and_delete_setting_is_not_specified()
        {
            grid.Editing.Enabled = true;
            grid.Editing.Mode = GridEditMode.InCell;
            grid.Ajax.Enabled = true;
            grid.DataKeys.Add(new GridDataKey<Customer, int>(c => c.Id));
            grid.Columns.Add(new GridActionColumn<Customer>(grid)
            {
                Commands =
                    {
                        new GridDeleteActionCommand()
                    }
            });

            Assert.DoesNotThrow(() => grid.VerifySettings());
        }
#endif
    }
}
