// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System.Linq;
    using Html;
    using Infrastructure;
    using Moq;
    using Xunit;

    public class GridGroupRowBuilderDecoratorTests
    {
        private readonly GridGroupRowBuilderDecorator decorator;

        public GridGroupRowBuilderDecoratorTests()
        {
            decorator = new GridGroupRowBuilderDecorator();
        }

        [Fact]
        public void Should_decorate_builder_if_group_item()
        {
            decorator.ShouldDecorate(new GridItem { Type = GridItemType.GroupRow }).ShouldBeTrue();
        }

        [Fact]
        public void Should_not_decorate_empty_row()
        {
            decorator.ShouldDecorate(new GridItem { Type = GridItemType.EmptyRow }).ShouldBeFalse();
        }

        [Fact]
        public void Should_add_cells_equal_to_group_level()
        {
            const int groupLevel = 3;

            var rowBuilder = new Mock<IGridRowBuilder>();
            rowBuilder.Setup(r => r.CreateRow()).Returns(() => new HtmlElement("tr"));
            decorator.Decorate(rowBuilder.Object, new GridItem {Type = GridItemType.GroupRow, GroupLevel = groupLevel}, false);
            decorator.CreateRow().Children.Count.ShouldEqual(groupLevel);
        }

        [Fact]
        public void Should_add_css_class_to_the_added_childs_cells()
        {
            const int groupLevel = 3;

            var rowBuilder = new Mock<IGridRowBuilder>();
            rowBuilder.Setup(r => r.CreateRow()).Returns(() => new HtmlElement("tr"));
            decorator.Decorate(rowBuilder.Object, new GridItem { Type = GridItemType.GroupRow, GroupLevel = groupLevel }, false);

            decorator.CreateRow()
                     .Children.All(n => n.Attribute("class").Contains(UIPrimitives.Grid.GroupCell))
                     .ShouldBeTrue();
        }
    }
}