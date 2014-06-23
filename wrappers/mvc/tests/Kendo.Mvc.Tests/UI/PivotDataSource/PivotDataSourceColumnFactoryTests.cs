namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System.Collections.Generic;
    using System.Linq;  
    using Xunit;

    public class PivotDataSourceColumnFactoryTests
    {
        private readonly List<PivotDataSourceColumn> columns;
        private readonly PivotDataSourceColumnFactory builder;

        public PivotDataSourceColumnFactoryTests()
        {
            columns = new List<PivotDataSourceColumn>();
            builder = new PivotDataSourceColumnFactory(columns);
        }

        [Fact]
        public void Add_method_creates_column_with_specified_name()
        {
            string columnName = "newColumn";
            builder.Add(columnName);

            Assert.Equal(columns.ElementAt(0).Name, columnName);
        }
    }
}
