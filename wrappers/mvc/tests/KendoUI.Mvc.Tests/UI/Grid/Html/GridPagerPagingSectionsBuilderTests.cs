// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Infrastructure;
    using Moq;
    using Xunit;

    public class GridPagerPagingSectionsBuilderTests
    {
        [Fact]
        public void Should_add_first_and_prev_button_to_container()
        {
            var buttonFactory = new Mock<IGridPagerButtonFactory>();

            var button = new HtmlElement("a");
            buttonFactory.Setup(
                f => f.CreateButton(GridPagerButtonType.Icon, It.IsAny<string>(), It.IsAny<bool>(), It.IsAny<string>()))
                .Returns(button);

            var builder = new GridPagerPagingSectionsBuilder(buttonFactory.Object, new GridPagerNumericSectionBuilder(buttonFactory.Object), new GridPagerInputSectionBuilder(), new GridPagerPageSizeSection());

            var sections = builder.CreateSections(new GridPagerData
                                                     {
                                                         Style = GridPagerStyles.NextPrevious,
                                                         UrlBuilder = new Mock<IGridUrlBuilder>().Object
                                                     });

            sections.Children[0].ShouldBeSameAs(button);
            sections.Children[0].ShouldBeSameAs(button);
        }
    }
}