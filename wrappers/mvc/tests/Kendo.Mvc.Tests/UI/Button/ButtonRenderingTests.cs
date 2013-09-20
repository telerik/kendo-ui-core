namespace Kendo.Mvc.UI.Tests
{
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using Kendo.Mvc.UI.Html;

    public class ButtonRenderingTests
    {
        private readonly Button Button;
        private readonly Mock<ButtonHtmlBuilder> tagBuilder;
        private readonly Mock<IHtmlNode> rootTag;
        private readonly Mock<IHtmlNode> headerTag;
        Mock<TextWriter> textWriter;

        public ButtonRenderingTests()
        {
            textWriter = new Mock<TextWriter>();

            tagBuilder = new Mock<ButtonHtmlBuilder>();
            rootTag = new Mock<IHtmlNode>();
            rootTag.SetupGet(t => t.Children).Returns(() => new List<IHtmlNode>());
            
            headerTag = new Mock<IHtmlNode>();
            headerTag.SetupGet(t => t.Children).Returns(() => new List<IHtmlNode>());
            headerTag.Setup(t => t.AppendTo(It.IsAny<IHtmlNode>())).Returns(headerTag.Object);

            tagBuilder.Setup(t => t.ButtonTag()).Returns(rootTag.Object);

            Button = ButtonTestHelper.CreateButton(tagBuilder.Object);
            Button.Name = "Button";
        }
    }
}
