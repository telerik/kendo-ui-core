// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Infrastructure;
    using Moq;
    using Xunit;

    public class GridPagerNumericSectionBuilderTests
    {
        private readonly Mock<IGridPagerButtonFactory> buttonFactory;
        private readonly GridPagerNumericSectionBuilder builder;

        public GridPagerNumericSectionBuilderTests()
        {
            buttonFactory = new Mock<IGridPagerButtonFactory>();
            builder = new GridPagerNumericSectionBuilder(buttonFactory.Object);
            buttonFactory
               .Setup(f => f.CreateButton(It.IsAny<GridPagerButtonType>(), It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<string>()))
               .Returns(new HtmlElement("a"));
        }

        [Fact]
        public void Should_render_div()
        {
            var urlBuilder = new Mock<IGridUrlBuilder>();
            var container = builder.Create(urlBuilder.Object, 0, 10);

            container.TagName.ShouldEqual("div");
            container.Attribute("class").ShouldContain("t-numeric");
        }

        [Fact]
        public void Should_render_button_for_page_index()
        {
            const int currentPage = 0;
            const int pageCount = 10;
            var urlBuilder = new Mock<IGridUrlBuilder>();

            builder.Create(urlBuilder.Object, currentPage, pageCount);

            buttonFactory.Verify(
                f => f.CreateButton(It.IsAny<GridPagerButtonType>(), It.IsInRange("1", "9", Range.Inclusive),
                               It.IsAny<bool>(), It.IsAny<string>()), Times.Exactly(pageCount));
        }
    }
}