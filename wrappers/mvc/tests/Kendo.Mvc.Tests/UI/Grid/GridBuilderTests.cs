namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System;
    using System.Collections.Generic;
    using System.Data;
    using System.IO;
    using System.Linq.Expressions;
    using System.Web.UI;
    using Moq;
    using UI.Tests;
    using UI;
    using Xunit;

    public class GridBuilderTests
    {
        private readonly Grid<Customer> grid;
        private readonly GridBuilder<Customer> builder;

        public GridBuilderTests()
        {
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(TextWriter.Null);
            grid = GridTestHelper.CreateGrid<Customer>(writer.Object);
            builder = new GridBuilder<Customer>(grid);
        }

        [Fact]
        public void Pager_enables_paging()
        {
            builder.Pageable();

            Assert.True(grid.Pageable.Enabled);
        }
      
        [Fact]
        public void BindTo_sets_the_data_source()
        {
            IEnumerable<Customer> customers = new [] { new Customer()};
            builder.BindTo(customers);

            Assert.Same(customers, grid.DataSource.Data);
        }

        [Fact]
        public void BindTo_sets_the_data_source_as_GridCustomGroupingWrapper_of_model_type_if_non_generic_enumerable_is_assigned()
        {
            builder.BindTo(new object[0]);

            Assert.IsType<CustomGroupingWrapper<Customer>>(grid.DataSource.Data);
        }

        [Fact]
        public void Columns_builds_the_columns_of_the_grid()
        {
            builder.Columns(columns => columns.Bound(c => c.Id));

            Assert.Equal(1, grid.Columns.Count);
        }

        [Fact]
        public void ProcessDataSource_sets_the_corresponding_property()
        {
            builder.EnableCustomBinding(false);

            Assert.Equal(false, grid.EnableCustomBinding);
        }

        [Fact]
        public void PrefixUrlParameters_sets_the_corresponding_property()
        {
            builder.PrefixUrlParameters(false);
            Assert.Equal(false, grid.PrefixUrlParameters);
        }

        [Fact]
        public void Sortable_sets_the_corresponding_property()
        {
            builder.Sortable();
            Assert.Equal(GridSortMode.SingleColumn, grid.Sortable.SortMode);
        }

        [Fact]
        public void Sortable_sets_the_allow_unsort()
        {
            builder.Sortable();
            Assert.Equal(true, grid.Sortable.AllowUnsort);
        }

        [Fact]
        public void Sortable_sets_the_allow_unsort_to_false()
        {
            builder.Sortable(sortable => sortable.AllowUnsort(false));
            Assert.Equal(false, grid.Sortable.AllowUnsort);
        }

        [Fact]
        public void ColumnResizeHandleWidth_sets_the_column_resize_handle_width()
        {
            var newWidth = 5;

            builder.ColumnResizeHandleWidth(newWidth);
            Assert.Equal(newWidth, grid.ColumnResizeHandleWidth);
        }
    }
}