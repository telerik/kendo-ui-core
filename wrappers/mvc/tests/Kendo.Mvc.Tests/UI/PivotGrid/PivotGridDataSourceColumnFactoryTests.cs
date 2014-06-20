namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System.Collections.Generic;
    using System.Linq;  
    using Xunit;

    public class PivotGridDataSourceColumnFactoryTests
    {
        private readonly List<PivotGridDataSourceColumn> columns;
        private readonly PivotGridDataSourceColumnFactory builder;

        public PivotGridDataSourceColumnFactoryTests()
        {
            columns = new List<PivotGridDataSourceColumn>();
            builder = new PivotGridDataSourceColumnFactory(columns);
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
