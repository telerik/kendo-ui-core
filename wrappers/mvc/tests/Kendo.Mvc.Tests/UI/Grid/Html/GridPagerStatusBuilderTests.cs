namespace Kendo.Mvc.UI.Html.Tests
{
    using Xunit;

    public class GridPagerStatusBuilderTests
    {
        [Fact]
        public void Should_create_div()
        {
            var builder = new GridPagerStatusBuilder();

            var div = builder.Create(new GridPagerData
                                        {
                                            DisplayingItemsText = "Displaying items {0} - {0} of {0}"
                                        });

            Assert.Equal("div", div.TagName);
            Assert.Equal("t-status-text", div.Attribute("class"));
            Assert.Equal("Displaying items 0 - 0 of 0", div.InnerHtml);
        }
    }
}