namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Linq.Expressions;
    using Kendo.Mvc.UI;
    using Xunit;
    using System.Web.Mvc;
    using System.Collections;


    public class GridColumnSerializerTests
    {
        private static IDictionary<string, object> JsonForBoundColumn<T, TValue>(Expression<Func<T, TValue>> expression)
            where T : class
        {
            return JsonForBoundColumn(expression, delegate { });
        }

        private static IDictionary<string, object> JsonForBoundColumn<T, TValue>(Expression<Func<T, TValue>> expression, Action<GridBoundColumn<T, TValue>> configure)
            where T : class
        {
            var column = new GridBoundColumn<T, TValue>(GridTestHelper.CreateGrid<T>(), expression);
            configure(column);
            return column.CreateSerializer().Serialize();
        }

        private static IDictionary<string, object> JsonForTemplateColumn<T>(Action<T> action)
            where T : class
        {
            return new GridTemplateColumn<T>(GridTestHelper.CreateGrid<T>(), action).CreateSerializer().Serialize();
        }

        private static IDictionary<string, object> JsonForActionColumn<T>(Action<GridActionColumn<T>> configure)
            where T : class
        {
            var column = new GridActionColumn<T>(GridTestHelper.CreateGrid<T>());
            configure(column);
            return column.CreateSerializer().Serialize();
        }

        private static IDictionary<string, object> JsonForForeignKeyColumn<T, TValue>(Expression<Func<T, TValue>> expression, SelectList data, Action<GridForeignKeyColumn<T, TValue>> configure)
            where T : class
        {
            var column = new GridForeignKeyColumn<T, TValue>(GridTestHelper.CreateGrid<T>(), expression, data);
            configure(column);
            return column.CreateSerializer().Serialize();
        }

        [Fact]
        public void Should_serialize_member_for_bound_column()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id);

            Assert.Equal("Id", result["member"]);
        }        
        
        
        [Fact]
        public void Should_serialize_encoded_if_false_for_bound_column()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id, c => c.Encoded = false);

            Assert.Equal(false, result["encoded"]);
        }

        [Fact]
        public void Should_not_serialize_member_for_template_column()
        {
            var result = JsonForTemplateColumn((Customer c) => { });
            Assert.False(result.ContainsKey("member"));
        }
        
        [Fact]
        public void Should_serialize_client_template_for_template_column()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Ajax.Enabled = true;
            var column = new GridTemplateColumn<Customer>(grid, delegate { });

            column.ClientTemplate = "<#= Id #>";

            var result = column.CreateSerializer().Serialize();

            Assert.Equal("<#= Id #>", result["template"]);
        }

        [Fact]
        public void Should_serialize_type_for_bound_column()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id);
            Assert.Equal("Number", result["type"]);
        }

        [Fact]
        public void Should_not_serialize_type_for_template_column()
        {
            var result = JsonForTemplateColumn((Customer c) => { });
            Assert.False(result.ContainsKey("type"));
        }

        [Fact]
        public void Should_serialize_title_of_bound_column()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id);
            Assert.Equal("Id", result["title"]);
        }

        [Fact]
        public void Should_serialize_format_if_not_empty()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id, c => c.Format = "{0}");

            Assert.Equal("{0}", result["format"]);
        }

        [Fact]
        public void Should_not_serialize_format_if_empty()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id);

            Assert.False(result.ContainsKey("format"));
        }

        [Fact]
        public void Should_serialize_readonly_if_set()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id, c => c.ReadOnly = true);

            Assert.Equal(true, result["readonly"]);
        }

        [Fact]
        public void Should_not_serialize_readonly_if_not_set()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id);

            Assert.False(result.ContainsKey("readonly"));
        }
    
        [Fact]
        public void Should_serialize_groupable_if_grouping_disabled()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id, c => c.Groupable = false);

            Assert.Equal(false, result["groupable"]);
        }

        [Fact]
        public void Should_not_serialize_groupable_if_grouping_enabled()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id);

            Assert.False(result.ContainsKey("groupable"));
        }

        [Fact]
        public void Should_serialize_html_attributes()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id, c => c.HtmlAttributes.Add("class", "test"));

            Assert.Equal(" class=\"test\"", result["attr"]);
        }

        [Fact]
        public void Should_not_serialize_html_attributes_if_they_are_empty()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id);

            Assert.False(result.ContainsKey("attr"));
        }

        [Fact]
        public void Should_serialize_filters()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            ((IGridBindingContext)grid).FilterDescriptors.Add(new CompositeFilterDescriptor
            {
                LogicalOperator = FilterCompositionLogicalOperator.And,
                FilterDescriptors =
                {
                    new FilterDescriptor
                    {
                        Member = "Id",
                        Operator = FilterOperator.IsEqualTo,
                        Value = 1
                    },
                    new FilterDescriptor
                    {
                        Member = "Id",
                        Operator = FilterOperator.IsGreaterThan,
                        Value = 1
                    }
                }
            });

            var column = new GridBoundColumn<Customer, int>(grid, c => c.Id);
            var result = column.CreateSerializer().Serialize();

            var filters = ((IList<IDictionary<string, object>>)result["filters"]);

            Assert.Equal(filters[0]["logic"], "and");
            var innerFilters = ((IList<IDictionary<string, object>>)filters[0]["filters"]);
            Assert.Equal("eq", innerFilters[0]["operator"]);
            Assert.Equal(1, innerFilters[0]["value"]);

            Assert.Equal("gt", innerFilters[1]["operator"]);
            Assert.Equal(1, innerFilters[1]["value"]);
        }

        [Fact]
        public void Should_not_serialize_filters_if_not_any()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id);
            Assert.False(result.ContainsKey("filters"));
        }

        [Fact]
        public void Should_serialize_or_filter()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            ((IGridBindingContext)grid).FilterDescriptors.Add(new CompositeFilterDescriptor
            {
                LogicalOperator = FilterCompositionLogicalOperator.Or,
                FilterDescriptors =
                {
                    new FilterDescriptor
                    {
                        Member = "Id",
                        Operator = FilterOperator.IsEqualTo,
                        Value = 1
                    },
                    new FilterDescriptor
                    {
                        Member = "Id",
                        Operator = FilterOperator.IsGreaterThan,
                        Value = 1
                    }
                }
            });

            var column = new GridBoundColumn<Customer, int>(grid, c => c.Id);
            var result = column.CreateSerializer().Serialize();

            var filters = ((IList<IDictionary<string, object>>)result["filters"]);

            Assert.Equal(filters[0]["logic"], "or");
            var innerFilters = ((IList<IDictionary<string, object>>)filters[0]["filters"]);
            Assert.Equal("eq", innerFilters[0]["operator"]);
            Assert.Equal(1, innerFilters[0]["value"]);

            Assert.Equal("gt", innerFilters[1]["operator"]);
            Assert.Equal(1, innerFilters[1]["value"]);
        }

        [Fact]
        public void Should_serialize_editor_html()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Editing.Enabled = true;
            grid.Ajax.Enabled = true;

            var result = new GridBoundColumn<Customer, int>(grid, c => c.Id).CreateSerializer().Serialize();

            Assert.True(result.ContainsKey("editor"));
        }

        [Fact]
        public void Should_not_serialize_editor_html_if_editing_is_not_enabled()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id);
            Assert.False(result.ContainsKey("editor"));
        }

        [Fact]
        public void Should_not_serialize_editor_html_in_server_binding_mode()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Editing.Enabled = true;

            var result = new GridBoundColumn<Customer, int>(grid, c => c.Id).CreateSerializer().Serialize();

            Assert.False(result.ContainsKey("editor"));
        }

        [Fact]
        public void Should_serialize_action_commands_name()
        {
            var result = JsonForActionColumn<Customer>(c =>
            {
                c.Commands.Add(new GridDeleteActionCommand());
                c.Commands.Add(new GridEditActionCommand());
                c.Commands.Add(new GridSelectActionCommand());
            });

            var commands = (IList<IDictionary<string, object>>)result["commands"];

            Assert.Equal("delete", commands[0]["name"]);
            Assert.Equal("edit", commands[1]["name"]);
            Assert.Equal("select", commands[2]["name"]);
        }

        [Fact]
        public void Should_serialize_action_commands_attributes()
        {
            var result = JsonForActionColumn<Customer>(c =>
            {
                c.Commands.Add(new GridDeleteActionCommand
                    {
                        HtmlAttributes = 
                        { 
                            {"class","test"}
                        }
                    });
            });

            var commands = (IList<IDictionary<string, object>>)result["commands"];

            Assert.Equal("delete", commands[0]["name"]);
            Assert.Equal(" class=\"test\"", commands[0]["attr"]);
        }

        [Fact]
        public void Should_not_serialize_action_commands_attributes_if_empty()
        {
            var result = JsonForActionColumn<Customer>(c => c.Commands.Add(new GridDeleteActionCommand()));

            var commands = (IList<IDictionary<string, object>>)result["commands"];

            Assert.Equal("delete", commands[0]["name"]);
            Assert.False(commands[0].ContainsKey("attr"));
        }

        [Fact]
        public void Should_serialize_client_template()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Ajax.Enabled = true;
            var result = new GridBoundColumn<Customer, int>(grid, c => c.Id)
            {
                ClientTemplate = "<#= Id #>"
            }
            .CreateSerializer()
            .Serialize();

            Assert.Equal("<#= Id #>", result["template"]);
        }

        [Fact]
        public void Should_not_serialize_client_template_if_not_set()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Ajax.Enabled = true;

            var result = new GridBoundColumn<Customer, int>(grid, c => c.Id).CreateSerializer().Serialize();

            Assert.False(result.ContainsKey("template"));
        }

        [Fact]
        public void Should_serialize_values_for_enum_columns()
        {
            var result = JsonForBoundColumn((Customer c) => c.Gender);
            var values = (IDictionary<string, object>)result["values"];
            Assert.Equal(Gender.Female, values["Female"]);
            Assert.Equal(Gender.Male, values["Male"]);
        }

        [Fact]
        public void Should_not_serialize_values_for_other_types_than_enum()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id);
            Assert.False(result.ContainsKey("values"));
        }

        [Fact]
        public void Should_serialize_order_if_sorted()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            ((IGridBindingContext)grid).SortDescriptors.Add(new SortDescriptor
            {
                Member = "Id",
                SortDirection = System.ComponentModel.ListSortDirection.Descending
            });

            var column = new GridBoundColumn<Customer, int>(grid, c => c.Id);
            var result = column.CreateSerializer().Serialize();

            Assert.Equal("desc", result["order"]);
        }

        [Fact]
        public void Should_not_serialize_order_if_not_sorted()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id);
            Assert.False(result.ContainsKey("order"));
        }

        [Fact]
        public void Should_serialize_hidden_if_set()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id, c => c.Hidden = true);

            result["hidden"].ShouldEqual(true);
        }

        [Fact]
        public void Should_not_serialize_hidden_if_not_set()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id, c => c.Hidden = false);

            result.ContainsKey("hidden").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_includeInContextMenu_if_not_set()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id);

            result.ContainsKey("includeInContextMenu").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_includeInContextMenu_if_set_to_true()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id, c => c.IncludeInContextMenu = true);

            result.ContainsKey("includeInContextMenu").ShouldBeFalse();
        }

        [Fact]
        public void Should_serialize_includeInContextMenu_if_set_to_false()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id, c => c.IncludeInContextMenu = false);

            result.ContainsKey("includeInContextMenu").ShouldBeTrue();
        }

        [Fact]
        public void Should_serialize_select_list()
        {
            var result = JsonForForeignKeyColumn((Customer c) => c.Id, new SelectList(new[] { new { Key = 1, Value = 2 }, new { Key = 3, Value = 4 } }), c => c.Grid.DataBinding.Ajax.Enabled = true);

            result.ContainsKey("data").ShouldBeTrue();
            ((IEnumerable)result["data"]).ShouldNotBeEmpty();
        }

        [Fact]
        public void Should_not_serialize_select_list_when_server_binding()
        {
            var result = JsonForForeignKeyColumn((Customer c) => c.Id, new SelectList(new[] { new { Key = 1, Value = 2 }, new { Key = 3, Value = 4 } }), c => c.Grid.DataBinding.Server.Enabled = true);            
            result.ContainsKey("data").ShouldBeFalse();            
        }

        [Fact]
        public void Should_serialize_width_if_hidden_and_has_width_set()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id, c => { c.Hidden = true; c.Width = "100px"; });

            result["width"].ShouldBeSameAs("100px");
        }

        [Fact]
        public void Should_not_serialize_width_if_not_hidden()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id, c => { c.Hidden = false; c.Width = "100px"; });

            result.ContainsKey("width").ShouldBeFalse();
        }

        [Fact]
        public void Should_not_serialize_width_if_width_not_set()
        {
            var result = JsonForBoundColumn((Customer c) => c.Id, c => { c.Hidden = true; });

            result.ContainsKey("width").ShouldBeFalse();
        }
    }
}
