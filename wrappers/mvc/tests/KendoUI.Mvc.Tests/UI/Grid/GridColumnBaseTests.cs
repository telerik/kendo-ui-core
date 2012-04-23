namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System.Linq;
    using Telerik.Web.Mvc.UI.Html;
    using Xunit;
    
    public class GridColumnBaseTests
    {
        private readonly Grid<Customer> grid;
        private readonly Mock<GridColumnBase<Customer>> column;

        public GridColumnBaseTests()
        {
            grid = GridTestHelper.CreateGrid<Customer>();
            column = new Mock<GridColumnBase<Customer>>(grid)
            {
                CallBase = true
            };
        }

        [Fact]
        public void Should_set_header_title()
        {
            const string title = "title";

            column.Setup(c => c.Title).Returns(title);

            var cell = column.Object.CreateHeaderBuilder().CreateCell();
            var span = GetSpan(cell);
            span.InnerHtml.ShouldEqual(title);
        }

        [Fact]
        public void Should_not_encode_html_in_title()
        {
            const string title = "<strong>Title</strong>";
            
            column.SetupGet(c => c.Title).Returns(title);

            var cell = column.Object.CreateHeaderBuilder().CreateCell();
            var span = GetSpan(cell);
            span.InnerHtml.ShouldEqual(title);
        }

        [Fact]
        public void Should_set_nbsp_if_title_is_null()
        {
            string title = null;
            
            column.SetupGet(c => c.Title).Returns(title);

            var cell = column.Object.CreateHeaderBuilder().CreateCell();
            var span = GetSpan(cell);
            span.InnerHtml.ShouldEqual("&nbsp;");
        }

        [Fact]
        public void Should_set_nbsp_if_title_is_empty_string()
        {
            string title = string.Empty;
            
            column.SetupGet(c => c.Title).Returns(title);

            var cell = column.Object.CreateHeaderBuilder().CreateCell();
            var span = GetSpan(cell);
            span.InnerHtml.ShouldEqual("&nbsp;");
        }

        [Fact]
        public void Should_create_hidden_column_decorator_when_hidden()
        {
            var grid = GridTestHelper.CreateGrid<Customer>();

            var column = new Mock<GridColumnBase<Customer>>(grid)
            {
                CallBase = true
            };

            column.Object.Hidden = true;

            grid.Columns.Add(column.Object);

            var builder = column.Object.CreateDisplayBuilder(new Mock<IGridHtmlHelper>().Object);

            builder.Decorators.OfType<GridHiddenCellBuilderDecorator>().Count().ShouldEqual(1);
        }

        private IHtmlNode GetSpan(IHtmlNode cell)
        {
            return cell.Children[0];
        }
    }
}