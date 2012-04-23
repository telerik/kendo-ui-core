

namespace KendoUI.Mvc.UI.Html.Tests
{
    using Infrastructure;
    using Moq;
    using Xunit;

    public class GridPagerSectionsBuilderTests
    {

        [Fact]
        public void Should_create_div()
        {
            var pagingSectionBuilder = new Mock<IGridPagerPagingSectionsBuilder>();
            pagingSectionBuilder.Setup(ps => ps.CreateSections(It.IsAny<GridPagerData>())).Returns(new HtmlElement("div"));

            var builder = new GridPagerSectionsBuilder(pagingSectionBuilder.Object);
            var pagerSection = new GridPagerData();

            var div = builder.CreateSections(pagerSection);

            div.TagName.ShouldEqual("div");
            div.Attribute("class").ShouldEqual("t-pager t-reset");
        }
    }
}