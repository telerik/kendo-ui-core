namespace Kendo.Mvc.UI.Html.Tests
{
    using System.Collections.Generic;
    using Infrastructure;
    using Moq;
    using Xunit;

    public class GridHeaderRowBuilderTests
    {
        [Fact]
        public void Should_execute_child_rowbuilders()
        {
            var rowBuilder = new Mock<IGridRowBuilder>();

            rowBuilder.Setup(b => b.CreateRow()).Returns(new HtmlElement("tr"));

            var rowBuilders = new[] { rowBuilder.Object, rowBuilder.Object };

            var row = new GridHeaderRowBuilder(rowBuilders).CreateRow();

            row.Children.Count.ShouldEqual(2);
        }

        [Fact]
        public void Should_render_fragment()
        {
            var builder = new GridHeaderRowBuilder(new List<IGridRowBuilder>());
            var tr = builder.CreateRow();
            tr.ShouldBeType<HtmlFragment>();
        }
    }
}