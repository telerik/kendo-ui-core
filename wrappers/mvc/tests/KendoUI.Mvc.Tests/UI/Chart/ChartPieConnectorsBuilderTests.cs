namespace Telerik.Web.Mvc.UI.Tests.Chart
{
    using Telerik.Web.Mvc.UI;
    using Telerik.Web.Mvc.UI.Fluent;
    using Xunit;

    public class ChartPieConnectorsBuilderTests
    {
        private readonly ChartPieConnectors connectors;
        private readonly ChartPieConnectorsBuilder builder;

        public ChartPieConnectorsBuilderTests()
        {
            connectors = new ChartPieConnectors();
            builder = new ChartPieConnectorsBuilder(connectors);
        }

        [Fact]
        public void Width_sets_Width()
        {
            builder.Width(5);
            connectors.Width.ShouldEqual(5);
        }

        [Fact]
        public void Color_sets_Color()
        {
            builder.Color("Color");
            connectors.Color.ShouldEqual("Color");
        }

        [Fact]
        public void Padding_sets_Padding()
        {
            builder.Padding(5);
            connectors.Padding.ShouldEqual(5);
        }
    }
}