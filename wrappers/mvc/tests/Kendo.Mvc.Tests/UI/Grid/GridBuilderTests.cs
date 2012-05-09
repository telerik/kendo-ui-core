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
            grid = GridTestHelper.CreateGrid<Customer>(writer.Object, null);
            builder = new GridBuilder<Customer>(grid);
        }

        [Fact]
        public void Pager_enables_paging()
        {
            builder.Pageable();

            Assert.True(grid.Paging.Enabled);
        }
        
        [Fact]
        public void Pager_throws_when_action_is_null()
        {
            Assert.Throws<ArgumentNullException>(() => builder.Pageable(null));
        }

        [Fact]
        public void BindTo_sets_the_data_source()
        {
            IEnumerable<Customer> customers = new [] { new Customer()};
            builder.BindTo(customers);

            Assert.Same(customers, grid.DataSource);
        }

        [Fact]
        public void BindTo_sets_the_data_source_as_GridCustomGroupingWrapper_of_model_type_if_non_generic_enumerable_is_assigned()
        {
            builder.BindTo(new object[0]);

            Assert.IsType<GridCustomGroupingWrapper<Customer>>(grid.DataSource);
        }

        [Fact]
        public void Columns_builds_the_columns_of_the_grid()
        {
            builder.Columns(columns => columns.Bound(c => c.Id));

            Assert.Equal(1, grid.Columns.Count);
        }

        [Fact]
        public void Columns_throws_if_null_supplied_as_argument()
        {
            Assert.Throws<ArgumentNullException>(() => builder.Columns((Action<GridColumnFactory<Customer>>)null));
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
            Assert.Equal(GridSortMode.SingleColumn, grid.Sorting.SortMode);
        }

        [Fact]
        public void Sortable_sets_the_allow_unsort()
        {
            builder.Sortable();
            Assert.Equal(true, grid.Sorting.AllowUnsort);
        }

        [Fact]
        public void Sortable_sets_the_allow_unsort_to_false()
        {
            builder.Sortable(sortable => sortable.AllowUnsort(false));
            Assert.Equal(false, grid.Sorting.AllowUnsort);
        }

        [Fact]
        public void Should_add_data_keys()
        {
            Expression<Func<Customer, int>> expression = c => c.Id;

            builder.DataKeys(keys => keys.Add(expression).RouteKey("customerId"));

            Assert.Same(expression, ((GridDataKey<Customer, int>)grid.DataKeys[0]).Expression);
            Assert.Same("customerId", grid.DataKeys[0].RouteKey);
        }


        [Fact]
        public void Should_add_data_key_by_name()
        {
            const string expectedRouteValue = "CustomerId";
            const string expectedFieldName = "Id";

            builder.DataKeys(keys => keys.Add(expectedFieldName).RouteKey(expectedRouteValue));
                
            var firstDataKey = (GridDataKey<Customer, int>)grid.DataKeys[0];
            firstDataKey.RouteKey.ShouldEqual(expectedRouteValue);
            firstDataKey.Expression.ShouldNotBeNull();
            firstDataKey.Name.ShouldEqual(expectedFieldName);
        }

        [Fact]
        public void Should_add_data_key_by_name_if_bound_to_DataRowViews()
        {
            var dataRowViewGrid = GridTestHelper.CreateGrid<DataRowView>();
            var dataRowViewBuilder = new GridBuilder<DataRowView>(dataRowViewGrid);

            const string expectedRouteValue = "CustomerId";
            const string expectedFieldName = "Id";

            dataRowViewBuilder.DataKeys(keys => keys.Add(expectedFieldName).RouteKey(expectedRouteValue));
            var firstDataKey = dataRowViewGrid.DataKeys[0];

            firstDataKey.RouteKey.ShouldEqual(expectedRouteValue);
            firstDataKey.Name.ShouldEqual(expectedFieldName);
        }
    }
}