namespace Kendo.Mvc.UI.Tests
{
    using System;
    using System.IO;
    using System.Web;
    using System.Web.Mvc;

    using Moq;
    using Xunit;
    using Kendo.Mvc.Infrastructure;

    public class WidgetBaseExtensionsTests
    {
        private readonly ViewContext viewContext;
        private readonly Mock<HttpContextBase> httpContext;
        private readonly Mock<IJavaScriptInitializer> javaScriptInitializer;

        private readonly WidgetBaseTestDouble baseComponent;

        public WidgetBaseExtensionsTests()
        {
            httpContext = TestHelper.CreateMockedHttpContext();
            viewContext = new ViewContext { HttpContext = httpContext.Object, Writer = TextWriter.Null };
            javaScriptInitializer = new Mock<IJavaScriptInitializer>();

            baseComponent = new WidgetBaseTestDouble(viewContext, javaScriptInitializer.Object);
        }

        [Fact]
        public void SanitizeId_escapes_invalid_characters()
        {
            baseComponent.SanitizeId("Name1?").ShouldEqual("Name1_");
        }

        [Fact]
        public void SanitizeId_returns_empty_string_if_name_is_empty()
        {
            baseComponent.SanitizeId("").ShouldEqual("");
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
        public void SanitizeId_replaces_brackets()
        {
            baseComponent.SanitizeId("Name[0].Property").ShouldEqual("Name_0__Property");
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

        [Fact]
        public void SanitizeId_does_not_allow_points()
        {
            baseComponent.SanitizeId("Name.Name1?#= test.test1 #").ShouldEqual("Name_Name1_#= test.test1 #");
        }
    }
}