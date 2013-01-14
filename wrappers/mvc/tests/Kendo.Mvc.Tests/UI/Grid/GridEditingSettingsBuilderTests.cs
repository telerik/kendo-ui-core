namespace Kendo.Mvc.UI.Fluent.Tests
{
    using System;
    using Moq;
    using Mvc.Tests;
    using Xunit;
    using Kendo.Mvc.UI.Tests;
    using System.Web.Mvc;

    public class GridEditingSettingsBuilderTests
    {
        private readonly GridEditableSettings<Customer> settings;
        private readonly GridEditingSettingsBuilder<Customer> builder;

        public GridEditingSettingsBuilderTests()
        {
            settings = new GridEditableSettings<Customer>(new Mock<IGrid>().Object);
            settings.PopUp = WindowTestHelper.CreateWindow(null);
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
        public void Insert_row_position_should_be_top()
        {            
            settings.CreateAt.ShouldEqual(GridInsertRowPosition.Top);
        }

        [Fact]
        public void Should_set_insert_row_position()
        {
            builder.CreateAt(GridInsertRowPosition.Bottom);

            settings.CreateAt.ShouldEqual(GridInsertRowPosition.Bottom);
        }

        //TODO: Implement edit form attributes
        //[Fact]
        //public void FormHtmlAttributes_sets_the_html_attributes_of_the_editing_settings()
        //{
        //    builder.FormHtmlAttributes(new { @class = "test" });
        //    Assert.Equal("test", settings.FormHtmlAttributes["class"]);
        //}
        //TODO: Implement edit form attributes
        //[Fact]
        //public void HtmlAttributes_throws_if_null_passed_as_argument()
        //{
        //    Assert.Throws<ArgumentNullException>(() => builder.FormHtmlAttributes(null));
        //}

    }
}