namespace Kendo.Mvc.UI.Html.Tests
{
    using Kendo.Mvc.UI.Tests;
    using Xunit;
    using Kendo.Mvc.Infrastructure;
    using Moq;

    public class SparklineHtmlBuilderTests
    {
        private readonly Sparkline<object> sparkline;
        private readonly SparklineHtmlBuilder<object> builder;

        public SparklineHtmlBuilderTests()
        {
            var urlGeneratorMock = new Mock<IUrlGenerator>(); 
            var viewContext = TestHelper.CreateViewContext();
            sparkline = new Sparkline<object>(viewContext, new JavaScriptInitializer(), urlGeneratorMock.Object);
            builder = new SparklineHtmlBuilder<object>(sparkline);
        }

        [Fact]
        public void CreateSparkline_should_output_wrapper_div()
        {
            var tag = builder.CreateSparkline();
            tag.TagName.ShouldEqual("span");
        }

        [Fact]
        public void CreateSparkline_should_set_CSS_classes()
        {
            IHtmlNode tag = builder.CreateSparkline();

            tag.Attribute("class").ShouldEqual("k-sparkline");
        }

        [Fact]
        public void CreateSparkline_should_render_html_attributes()
        {
            sparkline.HtmlAttributes.Add("title", "genericSparkline");

            IHtmlNode tag = builder.CreateSparkline();

            tag.Attribute("title").ShouldEqual("genericSparkline");
        }
    }
}
