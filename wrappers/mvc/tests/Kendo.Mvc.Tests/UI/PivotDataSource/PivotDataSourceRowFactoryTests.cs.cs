namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System.Collections.Generic;
    using System.Linq;
    using Xunit;

    public class PivotDataSourceRowFactoryTests
    {
        private readonly List<PivotDataSourceRow> rows;
        private readonly PivotDataSourceRowFactory factory;

        public PivotDataSourceRowFactoryTests()
        {
            rows = new List<PivotDataSourceRow>();
            factory = new PivotDataSourceRowFactory(rows);
        }

        [Fact]
        public void Add_method_creates_row_with_specified_name()
        {
            string rowName = "newRow";
            factory.Add(rowName);

            Assert.Equal(rows.ElementAt(0).Name, rowName);
        }
    }
}
