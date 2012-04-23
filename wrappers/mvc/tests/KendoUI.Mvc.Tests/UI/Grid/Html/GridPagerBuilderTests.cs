// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Infrastructure;
    using Moq;
    using Xunit;

    public class GridPagerBuilderTests
    {
        private readonly GridPagerBuilder builder;
        private readonly Mock<IGridPagerSectionsBuilder> pagerSectionBuilder;
        private readonly Mock<IGridPagerRefreshBuilder> refreshSectionBuilder;
        private readonly Mock<IGridPagerStatusBuilder> statusBuilder;

        public GridPagerBuilderTests()
        {
            pagerSectionBuilder = new Mock<IGridPagerSectionsBuilder>();
            pagerSectionBuilder.Setup(ps => ps.CreateSections(It.IsAny<GridPagerData>())).Returns(new HtmlElement("div"));

            refreshSectionBuilder = new Mock<IGridPagerRefreshBuilder>();
            refreshSectionBuilder.Setup(rs => rs.Create(It.IsAny<string>(), It.IsAny<string>())).Returns(new HtmlElement("div"));

            statusBuilder = new Mock<IGridPagerStatusBuilder>();
            statusBuilder.Setup(rs => rs.Create(It.IsAny<GridPagerData>())).Returns(new HtmlElement("div"));

            builder = new GridPagerBuilder(pagerSectionBuilder.Object, refreshSectionBuilder.Object, statusBuilder.Object);
        }

        [Fact]
        public void Should_add_pager_if_pager_is_enabled()
        {
            var pagerSection = new GridPagerData
                                       {
                                           UrlBuilder = new Mock<IGridUrlBuilder>().Object
                                       };
            builder.Create(pagerSection);

            pagerSectionBuilder.Verify(ps => ps.CreateSections(pagerSection), Times.Once());
        }

        [Fact]
        public void Should_add_status()
        {
            var pagerSection = new GridPagerData
                                   {
                                       UrlBuilder = new Mock<IGridUrlBuilder>().Object
                                   };
            builder.Create(pagerSection);

            statusBuilder.Verify(ps => ps.Create(pagerSection), Times.Once());
        }
    }
}