// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Moq;
    using Xunit;

    public class GridDetailRowBuilderDecoratorTests
    {
        private readonly GridDetailRowBuilderDecorator decorator;

        public GridDetailRowBuilderDecoratorTests()
        {
            decorator = new GridDetailRowBuilderDecorator();
        }

        [Fact]
        public void Should_not_decorate_empty_row_builders()
        {
            decorator.ShouldDecorate(new GridItem {Type = GridItemType.EmptyRow}).ShouldBeFalse();
        }

        [Fact]
        public void Should_not_decorate_group_row_builder()
        {
            decorator.ShouldDecorate(new GridItem { Type = GridItemType.GroupRow }).ShouldBeFalse();
        }

        [Fact]
        public void Should_not_decorate_if_grid_does_not_have_detail_view()
        {
            var gridItem = new GridItem { Type = GridItemType.DataRow };
            decorator.Decorate(new Mock<IGridRowBuilder>().Object, gridItem, false);
            decorator.ShouldDecorate(gridItem).ShouldBeFalse();
        }

        [Fact]
        public void Should_decorate_if_grid_does_has_detail_view()
        {
            var gridItem = new GridItem { Type = GridItemType.DataRow };
            decorator.Decorate(new Mock<IGridRowBuilder>().Object, gridItem, true);
            decorator.ShouldDecorate(gridItem).ShouldBeTrue();
        }

        [Fact]
        public void Should_insert_as_first_cell_if_not_groups()
        {
            var gridItem = new GridItem { Type = GridItemType.DataRow };
            var builder = new Mock<IGridRowBuilder>();
            builder.Setup(b => b.CreateRow()).Returns(new HtmlElement("tr"));
            decorator.Decorate(builder.Object, gridItem, true);
            var node = decorator.CreateRow();
            node.Children.Count.ShouldEqual(1);
        }

        [Fact]
        public void Should_insert_cell_after_group_cell_if_grouped()
        {
            var gridItem = new GridItem { Type = GridItemType.DataRow, GroupLevel = 1 };
            var builder = new Mock<IGridRowBuilder>();            
            var container = new HtmlElement("tr");
            new HtmlElement("td").AppendTo(container);
            builder.Setup(b => b.CreateRow()).Returns(container);

            decorator.Decorate(builder.Object, gridItem, true);
            var node = decorator.CreateRow();
            node.Children.Count.ShouldEqual(2);
            node.Children[1].Attribute("class").ShouldEqual(UIPrimitives.Grid.HierarchyCell);
        }
    }
}