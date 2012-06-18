namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.Data;
    using System.Linq;
    using Xunit;

    public class GridColumnGeneratorTests
    {
        private GridColumnGenerator<Customer> generator;

        public GridColumnGeneratorTests()
        {
            generator = new GridColumnGenerator<Customer>(GridTestHelper.CreateGrid<Customer>());
        }

        [Fact]
        public void Should_create_bound_column_from_column_settings()
        {
            var columnSettings = new GridColumnSettings<Customer>
            {
                Member = "Name"
            };

            var column = (GridBoundColumn<Customer, string>)generator.CreateColumn(columnSettings);
            Assert.Equal("Name", column.Member);
        }
        
        [Fact]
        public void Should_set_bound_column_properties()
        {
            var settings = new GridColumnSettings<Customer>
            {
                Member = "Name",
                Sortable = false,
                ClientTemplate = "foo",
                Encoded = false,
                Filterable = false,
                Format = "{0}",
                Groupable = false,
                HeaderHtmlAttributes = { },
                //TODO: Implement hidden Columns
                //Hidden = true,
                
                HtmlAttributes = { },
                ReadOnly = true,
                Title = "foo",
                Visible = false,
                Width = "100"
            };

            var column = (GridBoundColumn<Customer, string>)generator.CreateColumn(settings);
            Assert.Equal(column.Sortable, settings.Sortable);
            Assert.Equal(column.ClientTemplate, settings.ClientTemplate);
            Assert.Equal(column.Encoded, settings.Encoded);
            Assert.Equal(column.Filterable, settings.Filterable);
            Assert.Equal(column.Format, settings.Format);
            Assert.Equal(column.Groupable, settings.Groupable);            
            Assert.Equal(column.HeaderHtmlAttributes, settings.HeaderHtmlAttributes);

            //TODO: Implement hidden columns
            //Assert.Equal(column.Hidden, settings.Hidden);
            
            Assert.Equal(column.HtmlAttributes, settings.HtmlAttributes);
           // Assert.Equal(column.ReadOnly, settings.ReadOnly);
            Assert.Equal(column.Title, settings.Title);
            
            Assert.Equal(column.Visible, settings.Visible);
            Assert.Equal(column.Width, settings.Width);
        }

        [Fact]
        public void Should_set_type_when_bound_to_dataTable()
        {
            const string firstColumnName = "Column1";
            const string secondColumnName = "Column2";

            var dataTable = new DataTable();
            dataTable.Columns.Add(firstColumnName, typeof(int));
            dataTable.Columns.Add(secondColumnName, typeof(DateTime));

            var grid = GridTestHelper.CreateGrid<DataRowView>();

            var settings = new GridColumnSettings
            {
                Member = firstColumnName,
                MemberType = typeof(int)
            };

            var dataTableColumnGenerator = new GridColumnGenerator<DataRowView>(grid);

            var column = (IGridBoundColumn)dataTableColumnGenerator.CreateColumn(settings);
            column.MemberType.ShouldEqual(typeof(int));
        }

        [Fact]
        public void Member_should_set_title()
        {
            var settings = new GridColumnSettings<Customer>
            {
                Member = "Name"
            };

            var column = (GridBoundColumn<Customer, string>)generator.CreateColumn(settings);
            Assert.Equal(column.Title, "Name");
        }
        
        [Fact]
        public void Should_set_template()
        {
            var settings = new GridColumnSettings<Customer>
            {
                Member = "Name",
                Template = delegate { }
            };

            var column = (GridBoundColumn<Customer, string>)generator.CreateColumn(settings);
            Assert.Equal(column.Template, settings.Template);
        }

        [Fact]
        public void Should_create_columns_from_DataTable()
        {
            const string firstColumnName = "Column1";
            const string secondColumnName = "Column2";

            var dataTable = new DataTable();
            dataTable.Columns.Add(firstColumnName, typeof(int));
            dataTable.Columns.Add(secondColumnName, typeof(DateTime));

            var grid = GridTestHelper.CreateGrid<DataRowView>();
            grid.DataSource.Data = dataTable.WrapAsEnumerable();
            var dataTableColumnGenerator = new GridColumnGenerator<DataRowView>(grid);

            var columns = dataTableColumnGenerator.GetColumns();

            Assert.Equal(2, columns.Count());
            Assert.Equal(firstColumnName, columns.ElementAt(0).Member);            
            Assert.Equal(secondColumnName, columns.ElementAt(1).Member);
        }

        [Fact]
        public void Should_return_empty_collection_if_null_DataTable_is_provided()
        {
            DataTable dataTable = null;

            var grid = GridTestHelper.CreateGrid<DataRowView>();
            grid.DataSource.Data = dataTable.WrapAsEnumerable();
            var dataTableColumnGenerator = new GridColumnGenerator<DataRowView>(grid);
            Assert.Empty(dataTableColumnGenerator.GetColumns());
        }

        [Fact]
        public void Should_generate_columns_for_properties_of_nullable_bindable_type()
        {
            var grid = GridTestHelper.CreateGrid<NullableFoo>();
            grid.DataSource.Data = Enumerable.Empty<NullableFoo>();
            var columnGenerator = new GridColumnGenerator<NullableFoo>(grid);
            var generatedColumns = columnGenerator.GetColumns();

            generatedColumns.Count().ShouldEqual(1);
            generatedColumns.First().Member.ShouldEqual("Bar");
        }
        [Fact]
        public void Should_generate_columns_in_the_specified_order()
        {
            var grid = GridTestHelper.CreateGrid<ColumnOrder>();
            grid.DataSource.Data = Enumerable.Empty<ColumnOrder>();

            var columnGenerator = new GridColumnGenerator<ColumnOrder>(grid);
            var columns = columnGenerator.GetColumns();

            columns.First().Member.ShouldEqual("Bar");
            columns.Last().Member.ShouldEqual("Foo");
        }

        private class ColumnOrder
        {
            [Display(Order=1)]
            public string Foo { get; set; }
            [Display(Order=0)]
            public string Bar { get; set; }
        }
        private class NullableFoo
        {
            public int? Bar { get; set; }
            public NonBindableValueType? NonBindableValueType { get; set; }
        }

        private struct NonBindableValueType
        {
        }
    }
}
