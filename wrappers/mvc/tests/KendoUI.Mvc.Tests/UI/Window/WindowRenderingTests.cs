namespace KendoUI.Mvc.UI.Tests
{
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using Xunit;

    public class WindowRenderingTests
    {
        private readonly Window window;
        private readonly Mock<IWindowHtmlBuilder> tagBuilder;
        private readonly Mock<IHtmlNode> rootTag;
        private readonly Mock<IHtmlNode> headerTag;
        Mock<TextWriter> textWriter;

        public WindowRenderingTests()
        {
            textWriter = new Mock<TextWriter>();

            tagBuilder = new Mock<IWindowHtmlBuilder>();
            rootTag = new Mock<IHtmlNode>();
            rootTag.SetupGet(t => t.Children).Returns(() => new List<IHtmlNode>());
            
            headerTag = new Mock<IHtmlNode>();
            headerTag.SetupGet(t => t.Children).Returns(() => new List<IHtmlNode>());
            headerTag.Setup(t => t.AppendTo(It.IsAny<IHtmlNode>())).Returns(headerTag.Object);

            tagBuilder.Setup(t => t.WindowTag()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.HeaderTag()).Returns(headerTag.Object);

            window = WindowTestHelper.CreateWindow(tagBuilder.Object);
            window.Name = "Window";
        }

        [Fact]
        public void Render_should_output_Window_start()
        {
            tagBuilder.Setup(r => r.HeaderTag()).Returns(headerTag.Object);
            tagBuilder.Setup(r => r.TitleTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonContainerTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonTag(It.IsAny<IWindowButton>())).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ContentTag()).Returns(new Mock<IHtmlNode>().Object);
            rootTag.Setup(tag => tag.WriteTo(It.IsAny<TextWriter>())).Verifiable();

            tagBuilder.Setup(t => t.WindowTag()).Returns(rootTag.Object).Verifiable();

            window.Render();

            tagBuilder.Verify(t => t.WindowTag());
        }

        [Fact]
        public void Render_should_output_HeaderTag()
        {

            tagBuilder.Setup(t => t.WindowTag()).Returns(rootTag.Object);
            tagBuilder.Setup(r => r.TitleTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonContainerTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonTag(It.IsAny<IWindowButton>())).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ContentTag()).Returns(new Mock<IHtmlNode>().Object);
            rootTag.Setup(tag => tag.WriteTo(It.IsAny<TextWriter>())).Verifiable();

            tagBuilder.Setup(r => r.HeaderTag()).Returns(headerTag.Object).Verifiable();

            window.Render();

            tagBuilder.Verify();
        }

        [Fact]
        public void Render_should_not_output_Icon_if_path_is_not_set()
        {
            tagBuilder.Setup(t => t.WindowTag()).Returns(rootTag.Object);
            tagBuilder.Setup(r => r.HeaderTag()).Returns(headerTag.Object);
            tagBuilder.Setup(r => r.TitleTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonContainerTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonTag(It.IsAny<IWindowButton>())).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ContentTag()).Returns(new Mock<IHtmlNode>().Object);
            rootTag.Setup(tag => tag.WriteTo(It.IsAny<TextWriter>())).Verifiable();

            tagBuilder.Setup(r => r.IconTag()).Verifiable();

            window.Render();

            tagBuilder.Verify(r => r.IconTag(), Times.Never());
        }

        [Fact]
        public void Render_should_output_window_title() 
        {
            tagBuilder.Setup(t => t.WindowTag()).Returns(rootTag.Object);
            tagBuilder.Setup(r => r.HeaderTag()).Returns(headerTag.Object);
            tagBuilder.Setup(r => r.TitleTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonContainerTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonTag(It.IsAny<IWindowButton>())).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ContentTag()).Returns(new Mock<IHtmlNode>().Object);
            rootTag.Setup(tag => tag.WriteTo(It.IsAny<TextWriter>())).Verifiable();

            tagBuilder.Setup(r => r.TitleTag()).Returns(new Mock<IHtmlNode>().Object).Verifiable();

            window.Render();

            tagBuilder.Verify();
        }

        [Fact]
        public void Render_should_output_two_buttons()
        {
            tagBuilder.Setup(t => t.WindowTag()).Returns(rootTag.Object);
            tagBuilder.Setup(r => r.HeaderTag()).Returns(headerTag.Object);
            tagBuilder.Setup(r => r.TitleTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ContentTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonContainerTag()).Returns(new Mock<IHtmlNode>().Object);
            rootTag.Setup(tag => tag.WriteTo(It.IsAny<TextWriter>())).Verifiable();

            window.Buttons.Container.Clear();

            window.Buttons.Container.Add(new HeaderButton());
            window.Buttons.Container.Add(new HeaderButton());

            tagBuilder.Setup(r => r.ButtonTag(It.IsAny<IWindowButton>())).Returns(new Mock<IHtmlNode>().Object).Verifiable();

            window.Render();

            tagBuilder.Verify(r => r.ButtonTag(It.IsAny<IWindowButton>()), Times.Exactly(2));
        }

        [Fact]
        public void Render_should_output_content_of_the_window()
        {
            tagBuilder.Setup(t => t.WindowTag()).Returns(rootTag.Object);
            tagBuilder.Setup(r => r.HeaderTag()).Returns(headerTag.Object);
            tagBuilder.Setup(r => r.TitleTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonContainerTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonTag(It.IsAny<IWindowButton>())).Returns(new Mock<IHtmlNode>().Object);

            tagBuilder.Setup(r => r.ContentTag()).Returns(new Mock<IHtmlNode>().Object).Verifiable();

            window.Render();

            tagBuilder.Verify();
        }

        [Fact]
        public void Render_should_output_windowTag_content() 
        {
            tagBuilder.Setup(t => t.WindowTag()).Returns(rootTag.Object);
            tagBuilder.Setup(r => r.HeaderTag()).Returns(headerTag.Object);
            tagBuilder.Setup(r => r.TitleTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonContainerTag()).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ButtonTag(It.IsAny<IWindowButton>())).Returns(new Mock<IHtmlNode>().Object);
            tagBuilder.Setup(r => r.ContentTag()).Returns(new Mock<IHtmlNode>().Object);

            rootTag.Setup(tag => tag.WriteTo(It.IsAny<TextWriter>())).Verifiable();

            window.Render();

            rootTag.Verify();
        }

        [Fact]
        public void Render_should_call_objectWriter_start_method()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            WindowTestHelper.clientSideObjectWriter.Setup(ow => ow.Start()).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(ow => ow.Start());
        }

        [Fact]
        public void Render_should_throw_exception_if_minwidth_is_bigger_than_maxwidth() 
        {
            window.ResizingSettings.MinWidth = 200;
            window.ResizingSettings.MaxWidth = 100;

            Assert.Throws<ArgumentException>(() => window.VerifySettings());
        }

        [Fact]
        public void Render_should_throw_exceptio_if_minheight_is_bigger_than_maxheight()
        {
            window.ResizingSettings.MinHeight = 200;
            window.ResizingSettings.MaxHeight = 100;

            Assert.Throws<ArgumentException>(() => window.VerifySettings());
        }

        [Fact]
        public void ObjectWriter_should_call_objectWriter_complete_method()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.Complete());

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.Complete());
        }

        [Fact]
        public void ObjectWriter_should_append_Close_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            window.ClientEvents.OnClose.CodeBlock = () => { };

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onClose", window.ClientEvents.OnClose)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onClose", window.ClientEvents.OnClose));
        }

        [Fact]
        public void ObjectWriter_should_append_Error_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            window.ClientEvents.OnError.CodeBlock = () => { };

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onError", window.ClientEvents.OnError)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onError", window.ClientEvents.OnError));
        }

        [Fact]
        public void ObjectWriter_should_append_Load_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            window.ClientEvents.OnLoad.CodeBlock = () => { };

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onLoad", window.ClientEvents.OnLoad)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onLoad", window.ClientEvents.OnLoad));
        }

        [Fact]
        public void ObjectWriter_should_append_Open_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            window.ClientEvents.OnOpen.CodeBlock = () => { };

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onOpen", window.ClientEvents.OnOpen)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onOpen", window.ClientEvents.OnOpen));
        }

        [Fact]
        public void ObjectWriter_should_append_Resize_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            window.ClientEvents.OnResize.CodeBlock = () => { };

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onResize", window.ClientEvents.OnResize)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onResize", window.ClientEvents.OnResize));
        }

        [Fact]
        public void ObjectWriter_should_append_Modal_property()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.Append("modal", window.Modal)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.Append("modal", window.Modal));
        }

        [Fact]
        public void ObjectWriter_should_append_ContentUrl_property()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.Append("contentUrl", window.ContentUrl)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.Append("contentUrl", window.ContentUrl));
        }

        [Fact]
        public void ObjectWriter_should_append_AllowDragging_property()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.Append("draggable", window.Draggable)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.Append("draggable", window.Draggable));
        }

        [Fact]
        public void ObjectWriter_should_append_Resizing_enabled_property()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.Append("resizable", window.ResizingSettings.Enabled)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.Append("resizable", window.ResizingSettings.Enabled));
        }

        [Fact]
        public void ObjectWriter_should_append_MinWidth_property_If_Resizing_enabled()
        {
            window.ResizingSettings.Enabled = true;
            window.ResizingSettings.MinWidth = 0;

            Mock<TextWriter> writer = new Mock<TextWriter>();

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.Append("minWidth", window.ResizingSettings.MinWidth)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.Append("minWidth", window.ResizingSettings.MinWidth));
        }

        [Fact]
        public void ObjectWriter_should_append_MaxWidth_property_If_Resizing_enabled()
        {
            window.ResizingSettings.Enabled = true;
            window.ResizingSettings.MaxWidth = 200;

            Mock<TextWriter> writer = new Mock<TextWriter>();

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.Append("maxWidth", window.ResizingSettings.MaxWidth)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.Append("maxWidth", window.ResizingSettings.MaxWidth));
        }

        [Fact]
        public void ObjectWriter_should_append_MinHeight_property_If_Resizing_enabled()
        {
            window.ResizingSettings.Enabled = true;
            window.ResizingSettings.MinHeight = 0;

            Mock<TextWriter> writer = new Mock<TextWriter>();

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.Append("minHeight", window.ResizingSettings.MinHeight)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.Append("minHeight", window.ResizingSettings.MinHeight));
        }

        [Fact]
        public void ObjectWriter_should_append_MaxHeight_property_If_Resizing_enabled()
        {
            window.ResizingSettings.Enabled = true;
            window.ResizingSettings.MaxHeight = 200;

            Mock<TextWriter> writer = new Mock<TextWriter>();

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.Append("maxHeight", window.ResizingSettings.MaxHeight)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.Append("maxHeight", window.ResizingSettings.MaxHeight));
        }

        [Fact]
        public void ObjectWriter_should_append_Refresh_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            window.ClientEvents.OnRefresh.CodeBlock = () => { };

            WindowTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onRefresh", window.ClientEvents.OnRefresh)).Verifiable();

            window.WriteInitializationScript(writer.Object);

            WindowTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onRefresh", window.ClientEvents.OnRefresh));
        }
    }
}
