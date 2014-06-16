namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System.Collections.Generic;
    using System.Linq;
    using Xunit;

    public class PivotGridDataSourceRowFactoryTests
    {
        private readonly List<PivotGridDataSourceRow> rows;
        private readonly PivotGridDataSourceRowFactory factory;

        public PivotGridDataSourceRowFactoryTests()
        {
            rows = new List<PivotGridDataSourceRow>();
            factory = new PivotGridDataSourceRowFactory(rows);
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
