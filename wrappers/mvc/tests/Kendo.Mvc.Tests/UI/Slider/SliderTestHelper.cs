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

            viewContext = viewContext ?? TestHelper.CreateViewContext();

            var component = new Slider<T>(viewContext, new JavaScriptInitializer(), new ViewDataDictionary());           

            return component;
        }

        public static RangeSlider<T> CreateRangeSlider<T>(IRangeSliderHtmlBuilder builder, ViewContext viewContext) where T : struct, IComparable
        {
            builder = builder ?? new Mock<IRangeSliderHtmlBuilder>().Object;

            var httpContext = TestHelper.CreateMockedHttpContext();
            httpContext.Setup(c => c.Request.Browser.CreateHtmlTextWriter(It.IsAny<TextWriter>())).Returns(new HtmlTextWriter(TextWriter.Null));

            viewContext = viewContext ?? TestHelper.CreateViewContext();

            var component = new RangeSlider<T>(viewContext, new JavaScriptInitializer(), new ViewDataDictionary());

            return component;
        }
    }
}