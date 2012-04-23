namespace Telerik.Web.Mvc.UI.Tests
{
    using System.IO;
    using System.Web;
    using System.Web.Mvc;
    using System.Web.UI;


    using Moq;
    using UI;

    public static class TextBoxBaseTestHelper
    {
        public static Mock<IClientSideObjectWriter> clientSideObjectWriter;

        public static TextBoxBase<T> CreateInput<T>(ITextBoxBaseHtmlBuilder renderer, ViewContext viewContext) where T : struct
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            Mock<ITextBoxBaseHtmlBuilderFactory<T>> inputRendererFactory = new Mock<ITextBoxBaseHtmlBuilderFactory<T>>();

            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();
            clientSideObjectWriter = new Mock<IClientSideObjectWriter>();

            viewContext = viewContext ?? TestHelper.CreateViewContext();

            clientSideObjectWriterFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(clientSideObjectWriter.Object);

            TextBoxBase<T> input = new TextBoxBase<T>(viewContext, clientSideObjectWriterFactory.Object, inputRendererFactory.Object);

            renderer = renderer ?? new TextBoxBaseHtmlBuilder<T>(input);
            inputRendererFactory.Setup(f => f.Create(It.IsAny<TextBoxBase<T>>())).Returns(renderer);

            return input;
        }

        public static IntegerTextBox CreateIntegerTextBox(ITextBoxBaseHtmlBuilder renderer)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            Mock<ITextBoxBaseHtmlBuilderFactory<int>> inputRendererFactory = new Mock<ITextBoxBaseHtmlBuilderFactory<int>>();

            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();
            clientSideObjectWriter = new Mock<IClientSideObjectWriter>();

            ViewContext viewContext = TestHelper.CreateViewContext();

            clientSideObjectWriterFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(clientSideObjectWriter.Object);

            IntegerTextBox input = new IntegerTextBox(viewContext, clientSideObjectWriterFactory.Object, inputRendererFactory.Object);

            renderer = renderer ?? new TextBoxBaseHtmlBuilder<int>(input);
            inputRendererFactory.Setup(f => f.Create(It.IsAny<IntegerTextBox>())).Returns(renderer);

            return input;
        }

        public static NumericTextBox<T> CreateNumericTextBox<T>(ITextBoxBaseHtmlBuilder renderer) where T : struct
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            Mock<ITextBoxBaseHtmlBuilderFactory<T>> inputRendererFactory = new Mock<ITextBoxBaseHtmlBuilderFactory<T>>();

            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();
            clientSideObjectWriter = new Mock<IClientSideObjectWriter>();

            ViewContext viewContext = TestHelper.CreateViewContext();

            clientSideObjectWriterFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(clientSideObjectWriter.Object);

            NumericTextBox<T> input = new NumericTextBox<T>(viewContext, clientSideObjectWriterFactory.Object, inputRendererFactory.Object);

            renderer = renderer ?? new TextBoxBaseHtmlBuilder<T>(input);
            inputRendererFactory.Setup(f => f.Create(It.IsAny<NumericTextBox<T>>())).Returns(renderer);

            return input;
        }

        public static PercentTextBox CreatePercentTextBox(ITextBoxBaseHtmlBuilder renderer)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            Mock<ITextBoxBaseHtmlBuilderFactory<double>> inputRendererFactory = new Mock<ITextBoxBaseHtmlBuilderFactory<double>>();

            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();
            clientSideObjectWriter = new Mock<IClientSideObjectWriter>();

            ViewContext viewContext = TestHelper.CreateViewContext();

            clientSideObjectWriterFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(clientSideObjectWriter.Object);

            PercentTextBox input = new PercentTextBox(viewContext, clientSideObjectWriterFactory.Object, inputRendererFactory.Object);

            renderer = renderer ?? new TextBoxBaseHtmlBuilder<double>(input);
            inputRendererFactory.Setup(f => f.Create(It.IsAny<PercentTextBox>())).Returns(renderer);

            return input;
        }

        public static CurrencyTextBox CreateCurrencyTextBox(ITextBoxBaseHtmlBuilder renderer)
        {
            Mock<HttpContextBase> httpContext = TestHelper.CreateMockedHttpContext();

            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            Mock<ITextBoxBaseHtmlBuilderFactory<decimal>> inputRendererFactory = new Mock<ITextBoxBaseHtmlBuilderFactory<decimal>>();

            Mock<IClientSideObjectWriterFactory> clientSideObjectWriterFactory = new Mock<IClientSideObjectWriterFactory>();
            clientSideObjectWriter = new Mock<IClientSideObjectWriter>();

            ViewContext viewContext = TestHelper.CreateViewContext();

            clientSideObjectWriterFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(clientSideObjectWriter.Object);

            CurrencyTextBox input = new CurrencyTextBox(viewContext, clientSideObjectWriterFactory.Object, inputRendererFactory.Object);

            renderer = renderer ?? new TextBoxBaseHtmlBuilder<decimal>(input);
            inputRendererFactory.Setup(f => f.Create(It.IsAny<CurrencyTextBox>())).Returns(renderer);

            return input;
        }
    }
}