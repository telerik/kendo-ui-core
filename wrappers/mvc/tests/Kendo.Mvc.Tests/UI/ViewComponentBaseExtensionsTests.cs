namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.IO;
    using System.Web;
    using System.Web.Mvc;

    using Moq;
    using Xunit;
    using Kendo.Mvc.Infrastructure;

    public class ViewComponentBaseExtensionsTests
    {
        private readonly ViewContext viewContext;
        private readonly Mock<HttpContextBase> httpContext;
        private readonly Mock<IJavaScriptInitializer> javaScriptInitializer;

        private readonly ViewComponentBaseTestDouble baseComponent;

        public ViewComponentBaseExtensionsTests()
        {
            httpContext = TestHelper.CreateMockedHttpContext();
            viewContext = new ViewContext { HttpContext = httpContext.Object, Writer = TextWriter.Null };
            javaScriptInitializer = new Mock<IJavaScriptInitializer>();

            baseComponent = new ViewComponentBaseTestDouble(viewContext, javaScriptInitializer.Object);
        }

        [Fact]
        public void SanitizeId_escapes_invalid_characters()
        {
            baseComponent.SanitizeId("Name1?").ShouldEqual("Name1_");
        }

        [Fact]
        public void SanitizeId_returns_null_if_name_is_empty()
        {
            baseComponent.SanitizeId("").ShouldEqual(null);
        }

        [Fact]
        public void SanitizeId_allows_client_template_syntax()
        {
            baseComponent.SanitizeId("Name?#= test #").ShouldEqual("Name_#= test #");
        }
    }
}