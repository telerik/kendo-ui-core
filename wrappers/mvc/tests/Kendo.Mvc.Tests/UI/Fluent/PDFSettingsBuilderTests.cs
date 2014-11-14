namespace Kendo.Mvc.UI.Html.Tests
{
    using Moq;
    using Kendo.Mvc.Infrastructure;
    using Xunit;
    using Kendo.Mvc.UI.Fluent;

    public class PDFSettingsBuilderTests
    {
        private PDFSettingsBuilder builder;
        private PDFSettings pdf;

        public PDFSettingsBuilderTests()
        {
            pdf = new PDFSettings();
            builder = new PDFSettingsBuilder(pdf);
        }

        [Fact]
        public void ForceProxy_sets_forceProxy()
        {
            builder.ForceProxy(true);
            pdf.ForceProxy.ShouldBeTrue();
        }

        [Fact]
        public void ForceProxy_returns_builder()
        {
            builder.ForceProxy(true).ShouldEqual(builder);
        }

        [Fact]
        public void ProxyURL_sets_ProxyURL()
        {
            builder.ProxyURL("Foo");
            pdf.ProxyURL.ShouldEqual("Foo");
        }

        [Fact]
        public void ProxyURL_returns_builder()
        {
            builder.ProxyURL("Foo").ShouldEqual(builder);
        }
    }
}
