// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System.Collections.Generic;
    using Infrastructure;
    using Moq;
    using Xunit;

    public class GridRowBuilderTests
    {
        [Fact]
        public void Should_render_table_row_if_no_scrolling()
        {
            var builder = new GridRowBuilder(new List<IGridCellBuilder>());
            var tr = builder.CreateRow();
            tr.TagName.ShouldEqual("tr");
        }

        [Fact]
        public void Should_call_cell_buiders()
        {
            var cellBuilder = new Mock<IGridCellBuilder>();
            cellBuilder.Setup(b => b.CreateCell()).Returns(new HtmlElement("td")).AtMost(2);

            var cellBuilders = new[] { cellBuilder.Object, cellBuilder.Object };

            new GridRowBuilder(cellBuilders).CreateRow();

            cellBuilder.Verify();
        }
       
        [Fact]
        public void Should_append_child_builder_content_to_the_build_node()
        {
            var cellBuilder = new Mock<IGridCellBuilder>();
            cellBuilder.Setup(b => b.CreateCell()).Returns(new HtmlElement("td"));

            var cellBuilders = new[] { cellBuilder.Object, cellBuilder.Object };

            var row = new GridRowBuilder(cellBuilders).CreateRow();

            row.Children.Count.ShouldEqual(2);
        }
    }
}