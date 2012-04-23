namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Moq;
    using Telerik.Web.Mvc.Infrastructure;
    using Xunit;

    public class GridDataRowBuilderTests
    {
        private GridDataRowBuilder builder;
        private Mock<IGridDataCellBuilder> dataCellBuilder;
        
        public GridDataRowBuilderTests()
        {
            dataCellBuilder = new Mock<IGridDataCellBuilder>();
            dataCellBuilder.Setup(d => d.CreateCell(It.IsAny<object>())).Returns(new HtmlElement("td"));
            builder = new GridDataRowBuilder(null, new[] { dataCellBuilder.Object });
        }
        
        [Fact]
        public void Should_create_cells()
        {
            var td = new HtmlElement("td");
            
            dataCellBuilder.Setup(d => d.CreateCell(It.IsAny<object>())).Returns(td);

            var tr = builder.CreateRow();
            tr.Children[0].ShouldBeSameAs(td);
        }

        [Fact]
        public void Should_return_tr()
        {
            var tr = builder.CreateRow();
            tr.TagName.ShouldEqual("tr");
        }
    }
}
