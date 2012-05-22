namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.UI;
    using Moq;
    using Kendo.Mvc.UI;
    using Xunit;
    using Kendo.Mvc.Infrastructure;

    public class TreeViewRenderingTests
    {
        private readonly TreeView treeView;
        private readonly Mock<ITreeViewHtmlBuilder> builder;
        private readonly Mock<IClientSideObjectWriter> objectWriter;

        public TreeViewRenderingTests()
        {
            Mock<TextWriter> textWriter = new Mock<TextWriter>();
            Mock<HtmlTextWriter> writer = new Mock<HtmlTextWriter>(textWriter.Object);
            objectWriter = new Mock<IClientSideObjectWriter>();

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

            treeView = TreeViewTestHelper.CreateTreeView(writer.Object, builder.Object, objectWriter.Object);
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

        [Fact]
        public void ObjectWriter_should_call_objectWriter_start_method()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            objectWriter.Setup(w => w.Start());

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_call_objectWriter_complete_method()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            objectWriter.Setup(w => w.Complete());

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_ShowCheckBox_property()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ShowCheckBox = true;

            objectWriter.Setup(w => w.Append("showCheckBox", treeView.ShowCheckBox)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_dragAndDrop_with_true_value()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.DragAndDrop = true;

            objectWriter.Setup(w => w.Append("dragAndDrop", true)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_Expand_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnExpand.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("expand", treeView.ClientEvents.OnExpand)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_Collapse_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnCollapse.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("collapse", treeView.ClientEvents.OnCollapse)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_Select_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnSelect.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("select", treeView.ClientEvents.OnSelect)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_NodeDragStart_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnDragStart.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("dragstart", treeView.ClientEvents.OnDragStart)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_NodeDragging_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnDrag.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("drag", treeView.ClientEvents.OnDrag)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_NodeDragCancelled_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnDragCancelled.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("dragcancelled", treeView.ClientEvents.OnDragCancelled)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_NodeDrop_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnDrop.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("drop", treeView.ClientEvents.OnDrop)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_NodeDropped_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnDragEnd.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("dragend", treeView.ClientEvents.OnDragEnd)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }
    }
}
