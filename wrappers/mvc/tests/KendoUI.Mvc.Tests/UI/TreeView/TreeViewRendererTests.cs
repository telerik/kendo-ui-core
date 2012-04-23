namespace Telerik.Web.Mvc.UI.Tests
{
    using System.IO;
    using System.Linq;
    using System.Web.UI;
    using Infrastructure;
    using Moq;
    using Xunit;

    public class TreeViewRendererTests
    {
        private TreeView treeView;
        private TreeViewItem item;
        private Mock<HtmlTextWriter> writer;
        private TreeViewHtmlBuilder builder;

        public TreeViewRendererTests()
        {
            writer = new Mock<HtmlTextWriter>(TextWriter.Null);

            treeView = TreeViewTestHelper.CreateTreeView(writer.Object, null, null);
            treeView.Name = "TreeView1";

            item = new TreeViewItem();
            item.Visible = true;

            builder = new TreeViewHtmlBuilder(treeView, new Mock<IActionMethodCache>().Object);
        }

        [Fact]
        public void Should_render_div_wrapper()
        {
            IHtmlNode tag = builder.TreeViewTag();

            Assert.Equal("div", tag.TagName);
            Assert.Equal(treeView.Id, tag.Attribute("id"));
            Assert.Equal("t-widget t-treeview t-reset", tag.Attribute("class"));
        }

        [Fact]
        public void Should_render_encoded_text()
        {
            const string text = "<span>";
            item.Text = text;

            IHtmlNode tag = builder.ItemInnerContent(item).Children.Last();
            Assert.Equal("&lt;span&gt;", tag.InnerHtml);
        }

        [Fact]
        public void Should_render_image() 
        {
            item.ImageUrl = "#";

            IHtmlNode tag = builder.ItemInnerContent(item).Children[0];

            Assert.Equal("img", tag.TagName);
            Assert.Equal("#", tag.Attribute("src"));
        }

        [Fact]
        public void Links_should_render_class()
        {
            item.Url = "http://google.com/";

            IHtmlNode tag = builder.ItemInnerContent(item);

            Assert.Equal("t-link t-in", tag.Attribute("class"));
        }
    }
}
