// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using System.Collections.Generic;
    using Moq;
    using Xunit;

    public class GridFunctionalSectionBuilderTests
    {
        private readonly GridFunctionalSectionBuilder sectionBuilder;
        private readonly Mock<IGridPagerBuilder> pagerBuilder;
        private readonly Mock<IGridGroupHeaderBuilder> groupHeaderBuilder;
        private readonly Mock<IGridToolBarBuilder> toolBarBuilder;

        public GridFunctionalSectionBuilderTests()
        {
            pagerBuilder = new Mock<IGridPagerBuilder>();
            groupHeaderBuilder = new Mock<IGridGroupHeaderBuilder>();
            toolBarBuilder = new Mock<IGridToolBarBuilder>();
            sectionBuilder = new GridFunctionalSectionBuilder(pagerBuilder.Object, groupHeaderBuilder.Object, toolBarBuilder.Object);
        }

        [Fact]
        public void Should_append_template_if_both_commands_and_template_is_defined()
        {
            var template = new HtmlTemplate {Html = "aaaa"};
            var toolBarData = new GridToolBarData
                                      {
                                          Commands = new[] {new Mock<IGridActionCommand>().Object},
                                          Template = template
                                      };

            sectionBuilder.CreateToolBar(toolBarData);

            toolBarBuilder.Verify(tb => tb.CreateToolBar(template), Times.Once());
            toolBarBuilder.Verify(tb => tb.CreateToolBar(It.IsAny<IEnumerable<IGridButtonBuilder>>()),Times.Never());
        }
    }
}