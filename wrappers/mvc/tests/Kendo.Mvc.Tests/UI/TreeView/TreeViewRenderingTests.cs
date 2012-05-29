namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.UI;
    using Kendo.Mvc.UI;
    using Moq;
    using Xunit;

    public class TreeViewRenderingTests
    {
        private readonly TreeView treeView;
        private readonly Mock<ITreeViewHtmlBuilder> builder;

        public TreeViewRenderingTests()
        {
            Mock<TextWriter> textWriter = new Mock<TextWriter>();
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(textWriter.Object);

            var list = new List<IHtmlNode>();
            list.Add(new HtmlElement("div"));

            var rootTag = new Mock<IHtmlNode>();
            rootTag.SetupGet(t => t.Children).Returns(() => list);

            var itemTag = new Mock<IHtmlNode>();
            itemTag.SetupGet(t => t.Children).Returns(() => list);
            itemTag.Setup(t => t.AppendTo(It.IsAny<IHtmlNode>())).Returns(() => itemTag.Object);

            builder = new Mock<ITreeViewHtmlBuilder>();
            builder.Setup(r => r.TreeViewTag()).Returns(() => rootTag.Object);
            builder.Setup(r => r.ItemTag(It.IsAny<TreeViewItem>(), It.IsAny<bool>())).Returns(() => itemTag.Object);
            builder.Setup(r => r.ItemInnerContent(It.IsAny<TreeViewItem>())).Returns(() => new Mock<IHtmlNode>().Object);
            builder.Setup(r => r.ItemHiddenInputValue(It.IsAny<TreeViewItem>())).Returns(() => new Mock<IHtmlNode>().Object);
            builder.Setup(r => r.ItemContentTag(It.IsAny<TreeViewItem>())).Returns(() => new Mock<IHtmlNode>().Object);
            builder.Setup(r => r.ChildrenTag(It.IsAny<TreeViewItem>())).Returns(() => new Mock<IHtmlNode>().Object);

            treeView = TreeViewTestHelper.CreateTreeView(writer.Object, builder.Object);
            treeView.Name = "TreeView";
        }

        [Fact]
        public void Render_should_call_ItemContentTag_if_Content_is_not_null()
        {
            treeView.Items.Add(new TreeViewItem { Text = "Item1" });
            treeView.Items[0].Content = () => { };

            treeView.Render();

            builder.Verify();
        }

        [Fact]
        public void Render_should_call_ItemContentTag_if_Html_is_not_null()
        {
            treeView.Items.Add(new TreeViewItem { Text = "Item1" });
            treeView.Items[0].Html = "Html";

            treeView.Render();

            builder.Verify();
        }
    }
}
