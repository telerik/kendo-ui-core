namespace Telerik.Web.Mvc.Tests.TabStrip
{

    using System;
    using System.Web.Mvc;
    using Moq;
    using Telerik.Web.Mvc.UI;
    using Xunit;

    public class TabStripItemBuilderTests
    {
        private readonly TabStripItem _item;
        private readonly TabStripItemBuilder _builder;

        public TabStripItemBuilderTests()
        {
            Mock<ViewContext> viewContext = new Mock<ViewContext>();

            _item = new TabStripItem();
            _builder = new TabStripItemBuilder(_item, viewContext.Object);
        }

        [Fact]
        public void ToItem_should_return_internal_item()
        {
            Assert.Same(_item, _builder.ToItem());
        }

        [Fact]
        public void Should_be_able_to_set_html_attributes()
        {
            _builder.HtmlAttributes(new { @class = "foo" });

            Assert.Equal("foo", _item.HtmlAttributes["class"]);
        }

        [Fact]
        public void Should_be_able_to_set_text()
        {
            _builder.Text("Test Tab Item");

            Assert.Equal("Test Tab Item", _item.Text);
        }

        [Fact]
        public void LoadContentFrom_should_set_contentUrl_of_item()
        {
            const string value = "test";

            _builder.LoadContentFrom(value);

            Assert.Equal(value, _item.ContentUrl);
        }

        [Fact]
        public void LoadContentFrom_should_return_TBuilder_object()
        {
            const string value = "test";

            var returnedBuilder = _builder.LoadContentFrom(value);

            Assert.IsType(typeof(TabStripItemBuilder), returnedBuilder);
        }
    }
}