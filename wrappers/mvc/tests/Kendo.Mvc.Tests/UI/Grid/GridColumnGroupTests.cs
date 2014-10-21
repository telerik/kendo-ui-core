namespace Kendo.Mvc.UI.Tests
{
    using System.Linq;
    using System.Web;
    using Moq;
    using Xunit;

    public class GridColumnGroupTests
    {
        private readonly Grid<Customer> grid;
        private readonly Mock<GridColumnGroup<Customer>> column;

        public GridColumnGroupTests()
        {
            grid = GridTestHelper.CreateGrid<Customer>();
            column = new Mock<GridColumnGroup<Customer>>(grid)
            {
                CallBase = true
            };
        }

        [Fact]
        public void Should_render_colspan_matching_the_child_column_count()
        {
            column.Object.Columns.Add(new Mock<GridColumnBase<Customer>>(grid) { CallBase = true }.Object);
            column.Object.Columns.Add(new Mock<GridColumnBase<Customer>>(grid) { CallBase = true }.Object);

            var cell = column.Object.CreateHeaderBuilder().CreateCell();

            cell.Attributes().ContainsKey("colSpan").ShouldBeTrue();
            cell.Attribute("colSpan").ShouldEqual("2");
        }
        
        [Fact]
        public void Should_render_colspan_matching_the_leaf_column_count()
        {
            column.Object.Columns.Add(new Mock<GridColumnBase<Customer>>(grid) { CallBase = true }.Object);
            var child = new GridColumnGroup<Customer>(grid);
            column.Object.Columns.Add(child);
            child.Columns.Add(new Mock<GridColumnBase<Customer>>(grid) { CallBase = true }.Object);
            child.Columns.Add(new Mock<GridColumnBase<Customer>>(grid) { CallBase = true }.Object);

            var cell = column.Object.CreateHeaderBuilder().CreateCell();

            cell.Attributes().ContainsKey("colSpan").ShouldBeTrue();
            cell.Attribute("colSpan").ShouldEqual("3");
        }
    }
}