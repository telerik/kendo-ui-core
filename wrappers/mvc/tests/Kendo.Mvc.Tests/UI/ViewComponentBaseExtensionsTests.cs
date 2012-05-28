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

        [Fact]
        public void SanitizeId_allows_ternary_in_client_template()
        {
            baseComponent.SanitizeId("Name?#= test ? test : '2' #").ShouldEqual("Name_#= test ? test : '2' #");
        }

        [Fact]
        public void SanitizeId_replaces_sharps()
        {
            baseComponent.SanitizeId("Name?#").ShouldEqual("Name__");
        }

        [Fact]
        public void SanitizeId_does_not_replace_client_template_if_it_is_in_the_begining()
        {
            baseComponent.SanitizeId("#:#Name?").ShouldEqual("#:#Name_");
        }
    }
}