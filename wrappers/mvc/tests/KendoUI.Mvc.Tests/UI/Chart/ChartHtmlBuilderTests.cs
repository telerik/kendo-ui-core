namespace Telerik.Web.Mvc.UI.Html.Tests
{
    using Telerik.Web.Mvc.UI.Tests;
    using Telerik.Web.Mvc.UI.Tests.Chart;
    using Xunit;

    public class ChartHtmlBuilderTests
    {
        private readonly Chart<SalesData> chart;
        private readonly ChartHtmlBuilder<SalesData> builder;

        public ChartHtmlBuilderTests()
        {
            chart = ChartTestHelper.CreateChart<SalesData>();
            builder = new ChartHtmlBuilder<SalesData>(chart);
        }

        [Fact]
        public void CreateChart_should_output_wrapper_div()
        {
            var tag = builder.CreateChart();
            tag.TagName.ShouldEqual("div");
        }

        [Fact]
        public void CreateChart_should_set_CSS_classes()
        {
            const string css = "t-widget t-chart";

            IHtmlNode tag = builder.CreateChart();

            tag.Attribute("class").ShouldEqual(css);
        }

        [Fact]
        public void CreateChart_should_render_html_attributes()
        {
            chart.HtmlAttributes.Add("title", "genericChart");

            IHtmlNode tag = builder.CreateChart();

            tag.Attribute("title").ShouldEqual("genericChart");
        }
    }
}
