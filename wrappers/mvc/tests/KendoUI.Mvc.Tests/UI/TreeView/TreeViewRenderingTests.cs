namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.UI;
    using Moq;
    using Telerik.Web.Mvc.UI;
    using Xunit;
    using Telerik.Web.Mvc.Infrastructure;

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
        public void ObjectWriter_should_append_DropTargets_if_they_exists_and_the_dragAndDrop_is_enabled()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.DragAndDrop.Enabled = true;
            treeView.DragAndDrop.DropTargets = "fake drop targets";

            objectWriter.Setup(w => w.AppendObject("dragAndDrop", It.IsAny<IDictionary<string,string>>())).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_dragAndDrop_with_true_value()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.DragAndDrop.Enabled = true;

            objectWriter.Setup(w => w.Append("dragAndDrop", true)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_ajax_if_ajax_enabled()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.Ajax.Enabled = true;

            objectWriter.Setup(w => w.AppendObject("ajax", It.IsAny<IDictionary<string, string>>())).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_contentUrl_if_ws_enabled()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.WebService.Enabled = true;
            treeView.WebService.Select.Url = "fake url";

            objectWriter.Setup(w => w.AppendObject("ws", It.IsAny<IDictionary<string, string>>())).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_Expand_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnExpand.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("onExpand", treeView.ClientEvents.OnExpand)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_Collapse_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnCollapse.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("onCollapse", treeView.ClientEvents.OnCollapse)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_Select_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnSelect.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("onSelect", treeView.ClientEvents.OnSelect)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_Error_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnError.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("onError", treeView.ClientEvents.OnError)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_Load_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnLoad.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("onLoad", treeView.ClientEvents.OnLoad)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_NodeDragStart_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnNodeDragStart.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("onNodeDragStart", treeView.ClientEvents.OnNodeDragStart)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_NodeDragging_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnNodeDragging.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("onNodeDragging", treeView.ClientEvents.OnNodeDragging)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_NodeDragCancelled_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnNodeDragCancelled.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("onNodeDragCancelled", treeView.ClientEvents.OnNodeDragCancelled)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_NodeDrop_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnNodeDrop.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("onNodeDrop", treeView.ClientEvents.OnNodeDrop)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_NodeDropped_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnNodeDropped.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("onNodeDropped", treeView.ClientEvents.OnNodeDropped)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_DataBinding_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnDataBinding.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("onDataBinding", treeView.ClientEvents.OnDataBinding)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void ObjectWriter_should_append_DataBound_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            treeView.ClientEvents.OnDataBound.CodeBlock = () => { };

            objectWriter.Setup(w => w.AppendClientEvent("onDataBound", treeView.ClientEvents.OnDataBound)).Verifiable();

            treeView.WriteInitializationScript(writer.Object);

            objectWriter.VerifyAll();
        }

        [Fact]
        public void Render_should_throw_exception_if_ajax_and_ws_are_enabled()
        {
            treeView.WebService.Enabled = true;
            treeView.Ajax.Enabled = true;

            Assert.Throws(typeof(NotSupportedException), () => { treeView.Render(); });
        }

        [Fact]
        public void Render_should_throw_exception_if_ws_is_enabled_and_url_is_not_set()
        {
            treeView.WebService.Enabled = true;
            treeView.WebService.Select.Url = string.Empty;

            Assert.Throws(typeof(ArgumentException), () => { treeView.Render(); });
        }

        [Fact]
        public void Render_should_add_dragAndDrop_js_file_if_dragAndDrop_is_enabled()
        {
            treeView.DragAndDrop.Enabled = true;

            treeView.Render();

            Assert.True(treeView.ScriptFileNames.IndexOf("telerik.draganddrop.js") != -1);
        }
    }
}
