#if MVC2 || MVC3
namespace Telerik.Web.Mvc.UI.Fluent.Tests
{
    using System;
    using Moq;
    using Mvc.Tests;
    using Xunit;
    using Telerik.Web.Mvc.UI.Tests;

    public class GridEditingSettingsBuilderTests
    {
        private readonly GridEditingSettings<Customer> settings;
        private readonly GridEditingSettingsBuilder<Customer> builder;

        public GridEditingSettingsBuilderTests()
        {
            settings = new GridEditingSettings<Customer>(new Mock<IGrid>().Object);
            builder = new GridEditingSettingsBuilder<Customer>(settings);
        }

        [Fact]
        public void Should_set_editor_template_name()
        {
            const string templateName = "myEditorTemplate";

            builder.TemplateName(templateName);

            settings.TemplateName.ShouldEqual(templateName);
        }

        [Fact]
        public void Should_throw_if_editor_template_name_is_empty()
        {
            Assert.Throws<ArgumentException>(() => builder.TemplateName(string.Empty));
        }

        [Fact]
        public void FormHtmlAttributes_sets_the_html_attributes_of_the_editing_settings()
        {
            builder.FormHtmlAttributes(new { @class = "test" });
            Assert.Equal("test", settings.FormHtmlAttributes["class"]);
        }

        [Fact]
        public void HtmlAttributes_throws_if_null_passed_as_argument()
        {
            Assert.Throws<ArgumentNullException>(() => builder.FormHtmlAttributes(null));
        }

    }
}
#endif