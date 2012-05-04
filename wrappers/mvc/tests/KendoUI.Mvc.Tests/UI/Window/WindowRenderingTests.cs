namespace KendoUI.Mvc.UI.Tests
{
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.IO;

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

            window = WindowTestHelper.CreateWindow(tagBuilder.Object);
            window.Name = "Window";
        }
    }
}
