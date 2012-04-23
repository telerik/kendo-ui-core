// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System;
    using Infrastructure;
    using Moq;
    using Xunit;

    public class GridMasterRowBuilderDecoratorTests
    {
        private readonly GridMasterRowBuilderDecorator decorator;

        public GridMasterRowBuilderDecoratorTests()
        {
            decorator = new GridMasterRowBuilderDecorator();
        }

        [Fact]
        public void Should_decorate_row_builder_if_item_is_master_row()
        {
            decorator.ShouldDecorate(new GridItem {State = GridItemStates.Master}).ShouldBeTrue();
            decorator.ShouldDecorate(new GridItem { State = GridItemStates.Master, Type = GridItemType.EditRow }).ShouldBeTrue();
        }

        [Fact]
        public void Should_not_decorate_row_builder_if_item_is_default_row()
        {
            decorator.ShouldDecorate(new GridItem { State = GridItemStates.Default }).ShouldBeFalse();
            decorator.ShouldDecorate(new GridItem { State = GridItemStates.Master, Type = GridItemType.DetailRow}).ShouldBeFalse();
            decorator.ShouldDecorate(new GridItem { State = GridItemStates.Master, Type = GridItemType.EmptyRow }).ShouldBeFalse();
            decorator.ShouldDecorate(new GridItem { State = GridItemStates.Master, Type = GridItemType.GroupRow }).ShouldBeFalse();
        }

        [Fact]
        public void Should_add_css_class_to_node()
        {
            var rowBuilder = new Mock<IGridRowBuilder>();
            var tr = new HtmlElement("tr");
            rowBuilder.Setup(b => b.CreateRow()).Returns(tr);
            decorator.Decorate(rowBuilder.Object, new GridItem { State = GridItemStates.Master }, false);

            decorator.CreateRow().Attribute("class").ShouldContain("t-master-row");
        }
    }
}