namespace Kendo.Mvc.UI.Html.Tests
{
    using Moq;
    using Kendo.Mvc.Infrastructure;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class PDFSettingsBuilderTests
    {
        private PDFSettingsBuilder builder;
        private PDFSettings excel;

        public PDFSettingsBuilderTests()
        {
            excel = new PDFSettings();
            builder = new PDFSettingsBuilder(excel);
        }

        [Fact]
        public void ForceProxy_sets_forceProxy()
        {
            builder.ForceProxy(true);
            excel.ForceProxy.ShouldBeTrue();
        }

        [Fact]
        public void ForceProxy_returns_builder()
        {
            builder.ForceProxy(true).ShouldEqual(builder);
        }
    }
}
