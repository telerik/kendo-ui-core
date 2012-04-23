namespace Telerik.Web.Mvc.UI.Tests.Grid
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Html;
    using Xunit;

    public class GridBoundColumnTests
    {
        public class Product
        {
            public string Name
            {
                get;
                set;
            }

            public Category Category
            {
                get;
                set;
            }

            public IList<Category> Categories
            {
                get;
                set;
            }

            public Category[] CategoriesArray
            {
                get;
                set;
            }
        }

        public class Category
        {
            public string Name
            {
                get;
                set;
            }

            public User Owner
            {
                get;
                set;
            }
        }

        public class User
        {
            [DisplayName("UserName")]
            [DisplayFormat(DataFormatString="{0}")]
            [ReadOnly(true)]
            public string Name
            {
                get;
                set;
            }

            public bool Active
            {
                get;
                set;
            }
        }

        [Fact]
        public void Should_return_sortable_header_builder_if_sortable()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Sorting.Enabled = true;
            var column = new GridBoundColumn<Customer, int>(grid, c => c.Id);
            column.Settings.Sortable = true;
            column.CreateHeaderBuilder().ShouldBeType<GridSortableHeaderCellBuilder>();
        }

        [Fact]
        public void Should_return_decorated_header_builder_if_filtarable()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            grid.Filtering.Enabled = true;
            var column = new GridBoundColumn<Customer, int>(grid, c => c.Id);
            column.Settings.Filterable = true;

            var headerBuilder = column.CreateHeaderBuilder();
            headerBuilder.Decorators.OfType<GridFilterCellDecorator>().Any().ShouldBeTrue();
        }

        [Fact]
        public void Should_return_decorated_header_builder_if_hidden()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            var column = new GridBoundColumn<Customer, int>(grid, c => c.Id);
            column.Hidden = true;

            var headerBuilder = column.CreateHeaderBuilder();
            headerBuilder.Decorators.OfType<GridHiddenCellBuilderDecorator>().Any().ShouldBeTrue();
        }

        [Fact]
        public void HeaderText_should_be_extracted_from_expression()
        {
            var column = new GridBoundColumn<Customer, int>(GridTestHelper.CreateGrid<Customer>(), c => c.Id);

            Assert.Equal("Id", column.Title);
        }

        [Fact]
        public void Name_should_be_extracted_from_expression()
        {
            var column = new GridBoundColumn<Customer, int>(GridTestHelper.CreateGrid<Customer>(), c => c.Id);
            Assert.Equal("Id", column.Member);
        }

        [Fact]
        public void Name_should_be_equal_to_member_when_complex_member_expression_is_supplied()
        {
            var column = new GridBoundColumn<Customer, int>(GridTestHelper.CreateGrid<Customer>(), c => c.RegisterAt.Day);

            Assert.Equal("RegisterAt.Day", column.Member);
        }

        [Fact]
        public void Name_should_be_extracted_correctly_from_nested_expression()
        {
            var column = new GridBoundColumn<Product, string>(GridTestHelper.CreateGrid<Product>(), p => p.Category.Owner.Name);

            Assert.Equal("Category.Owner.Name", column.Member);
        }
#if MVC2 || MVC3
        [Fact]
        public void Name_should_be_extracted_correctly_from_indexer_expression()
        {
            var column = new GridBoundColumn<Product, string>(GridTestHelper.CreateGrid<Product>(), p => p.Categories[0].Owner.Name);

            Assert.Equal("Categories[0].Owner.Name", column.Member);
        }

        [Fact]
        public void Name_should_be_extracted_correctly_from_indexer_expression_with_bound_argument()
        {
            var argument = 0;

            var column = new GridBoundColumn<Product, string>(GridTestHelper.CreateGrid<Product>(), p => p.Categories[argument].Owner.Name);

            Assert.Equal("Categories[0].Owner.Name", column.Member);
        }

        [Fact]
        public void Name_should_be_extracted_correctly_from_array_access()
        {
            var column = new GridBoundColumn<Product, string>(GridTestHelper.CreateGrid<Product>(), p => p.CategoriesArray[0].Owner.Name);

            Assert.Equal("CategoriesArray[0].Owner.Name", column.Member);
        }

#endif

        [Fact]
        public void Type_should_be_set()
        {
            var column = new GridBoundColumn<Customer, int>(GridTestHelper.CreateGrid<Customer>(), c => c.Id);
            Assert.Equal(typeof(int), column.MemberType);
        }

        [Fact]
        public void Throws_on_invalid_expression()
        {
            Assert.Throws<InvalidOperationException>(() => new GridBoundColumn<Customer, string>(GridTestHelper.CreateGrid<Customer>(), c => c.Id.ToString()));
        }

        [Fact]
        public void ClientTemplate_sanitized()
        {
            var column = new GridBoundColumn<User, string>(GridTestHelper.CreateGrid<User>(), u => u.Name);

            column.ClientTemplate = "&lt;#= Name #>";
            Assert.Equal("<#= Name #>", column.ClientTemplate);
        }

        [Fact]
        public void Should_create_template_builder_if_template_is_set()
        {
            var column = new GridBoundColumn<User, bool>(GridTestHelper.CreateGrid<User>(), u => u.Active);
            column.Template = delegate { };
            column.CreateDisplayBuilder(null).ShouldBeType<GridTemplateCellBuilder<User>>();
        }

        [Fact]
        public void Should_create_template_builder_if_inline_template_is_set()
        {
            var column = new GridBoundColumn<User, bool>(GridTestHelper.CreateGrid<User>(), u => u.Active);
            column.InlineTemplate = delegate { return null; };
            column.CreateDisplayBuilder(null).ShouldBeType<GridTemplateCellBuilder<User>>();
        }

        [Fact]
        public void Should_throw_if_method_call()
        {
            Assert.Throws<InvalidOperationException>(() => new GridBoundColumn<User, string>(GridTestHelper.CreateGrid<User>(), u => u.Active.ToString()));
        }
        
        [Fact]
        public void Should_support_parameter_expression()
        {
            new GridBoundColumn<User, User>(GridTestHelper.CreateGrid<User>(), u => u);
        }

        [Fact]
        public void Should_add_attributes_if_hidden()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            var column = new GridBoundColumn<Customer, int>(grid, c => c.Id);
            column.Hidden = true;

            ((string)column.HtmlAttributes["style"]).ShouldContain("display:none;");
        }

        [Fact]
        public void Should_remove_attributes_if_hidden_is_set_to_false()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            var column = new GridBoundColumn<Customer, int>(grid, c => c.Id);
            column.Hidden = true;
            column.Hidden = false;
            ((string)column.HtmlAttributes["style"]).ShouldNotContain("display:none;width:0;");
        }

        [Fact]
        public void Should_not_add_attributes_if_hidden_is_set_to_false()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();
            var column = new GridBoundColumn<Customer, int>(grid, c => c.Id);         
            column.Hidden = false;
            column.HtmlAttributes.ContainsKey("style").ShouldBeFalse();
        }

#if MVC2 || MVC3
        [Fact]
        public void Readonly_is_populated_from_metadata()
        {
            var column = new GridBoundColumn<User, string>(GridTestHelper.CreateGrid<User>(), u => u.Name);

            Assert.Equal(true, column.ReadOnly);
        }

        [Fact]
        public void Should_create_displayfor_builder()
        {
            var column = new GridBoundColumn<User, bool>(GridTestHelper.CreateGrid<User>(), u => u.Active);
            var builder = column.CreateDisplayBuilder(null);

            builder.ShouldBeType<GridDisplayForCellBuilder<User, bool>>();
        }

        [Fact]
        public void Should_create_editor_builder_when_in_edit_mode()
        {
            var column = new GridBoundColumn<User, bool>(GridTestHelper.CreateGrid<User>(), u => u.Active);

            column.CreateEditBuilder(null).ShouldBeType<GridEditorForCellBuilder<User, bool>>();
        }

        [Fact]
        public void Should_create_editor_builder_when_in_insert_mode()
        {
            var column = new GridBoundColumn<User, bool>(GridTestHelper.CreateGrid<User>(), u => u.Active);

            column.CreateInsertBuilder(null).ShouldBeType<GridEditorForCellBuilder<User, bool>>();
        }

        [Fact]
        public void Should_return_display_builder_if_readonly()
        {
            var column = new GridBoundColumn<User, bool>(GridTestHelper.CreateGrid<User>(), u => u.Active);
            column.ReadOnly = true;

            column.CreateEditBuilder(null).ShouldBeType<GridDisplayForCellBuilder<User, bool>>();
        }

        [Fact]
        public void Should_not_use_display_for_if_format_is_set()
        {
            var column = new GridBoundColumn<User, bool>(GridTestHelper.CreateGrid<User>(), u => u.Active);
            column.Format = "{0}";
            var builder = column.CreateDisplayBuilder(null);
            builder.ShouldBeType<GridDataCellBuilder<User, bool>>();
        }

        [Fact]
        public void Should_not_use_display_for_if_encoded_is_false()
        {
            var column = new GridBoundColumn<User, bool>(GridTestHelper.CreateGrid<User>(), u => u.Active);
            column.Encoded = false;
            var builder = column.CreateDisplayBuilder(null);
            builder.ShouldBeType<GridDataCellBuilder<User, bool>>();
        }

        [Fact]
        public void Should_create_display_builder_if_column_is_readonly()
        {
            var column = new GridBoundColumn<User, bool>(GridTestHelper.CreateGrid<User>(), u => u.Active);
            column.ReadOnly = true;

            var builder = column.CreateEditBuilder(null);
            builder.ShouldBeType<GridDisplayForCellBuilder<User, bool>>();
        }        
        
        [Fact]
        public void Should_create_edit_builder_if_column_is_readonly()
        {
            var column = new GridBoundColumn<User, bool>(GridTestHelper.CreateGrid<User>(), u => u.Active);

            var builder = column.CreateEditBuilder(null);
            builder.ShouldBeType<GridEditorForCellBuilder<User, bool>>();
        }
#endif
    }

}