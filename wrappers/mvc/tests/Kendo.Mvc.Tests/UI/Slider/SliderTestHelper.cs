namespace Kendo.Mvc.UI.Tests
{
    using System;
    using Moq;
    using Kendo.Mvc.UI.Html;
    using System.Web.Mvc;
    using System.IO;
    using System.Web.UI;
    using Kendo.Mvc.Infrastructure;

    public class SliderTestHelper
    {
        public static Slider<T> CreateSlider<T>(ISliderHtmlBuilder builder, ViewContext viewContext) where T : struct, IComparable
        {
            builder = builder ?? new Mock<ISliderHtmlBuilder>().Object;

            var httpContext = TestHelper.CreateMockedHttpContext();
            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            var builderFactory = new Mock<ISliderHtmlBuilderFactory>();
            builderFactory.Setup(f => f.Create(It.IsAny<SliderRenderingData>())).Returns(builder);

            var writerFactory = new Mock<IClientSideObjectWriterFactory>();
            var objectWriter = new Mock<IClientSideObjectWriter>();

            viewContext = viewContext ?? TestHelper.CreateViewContext();
            writerFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(objectWriter.Object);

            var component = new Slider<T>(viewContext, new JavaScriptInitializer(), builderFactory.Object);           

            return component;
        }

        public static RangeSlider<T> CreateRangeSlider<T>(IRangeSliderHtmlBuilder builder, ViewContext viewContext) where T : struct, IComparable
        {
            builder = builder ?? new Mock<IRangeSliderHtmlBuilder>().Object;

            var httpContext = TestHelper.CreateMockedHttpContext();
            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            var builderFactory = new Mock<IRangeSliderHtmlBuilderFactory>();
            builderFactory.Setup(f => f.Create(It.IsAny<RangeSliderRenderingData>())).Returns(builder);

            var writerFactory = new Mock<IClientSideObjectWriterFactory>();
            var objectWriter = new Mock<IClientSideObjectWriter>();

            viewContext = viewContext ?? TestHelper.CreateViewContext();
            writerFactory.Setup(c => c.Create(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<TextWriter>())).Returns(objectWriter.Object);

            var component = new RangeSlider<T>(viewContext, new JavaScriptInitializer(), builderFactory.Object);

            return component;
        }
    }
}