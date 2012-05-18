namespace Kendo.Mvc.UI.Tests.Grid
{
    using System;
    using System.Linq;
    using Fluent;
    using Infrastructure.Implementation;
    using Xunit;

    public class GridBoundColumnBuilderTests
    {
        private readonly GridBoundColumn<Customer, int> column;
        private readonly GridBoundColumnBuilder<Customer> builder;
        
        public GridBoundColumnBuilderTests()
        {
            column = new GridBoundColumn<Customer, int>(GridTestHelper.CreateGrid<Customer>(), c=>c.Id);
            builder = new GridBoundColumnBuilder<Customer>(column);
        }

        [Fact]
        public void Header_text_sets_the_header_text_of_the_column()
        {
            builder.Title("Header");

            Assert.Equal("Header", column.Title);
        }

        [Fact]
        public void HeaderHtmlAttributes_sets_the_header_attributes_of_the_column()
        {
            builder.HeaderHtmlAttributes(new { @class="test" });

            Assert.Equal("test", column.HeaderHtmlAttributes["class"]);
        }

        [Fact]
        public void FooterHtmlAttributes_throws_if_null_passed_as_argument()
        {
            Assert.Throws<ArgumentNullException>(() => builder.FooterHtmlAttributes(null));
        }

        [Fact]
        public void FooterHtmlAttributes_sets_the_header_attributes_of_the_column()
        {
            builder.FooterHtmlAttributes(new { @class = "test" });

            Assert.Equal("test", column.FooterHtmlAttributes["class"]);
        }

        [Fact]
        public void HeaderHtmlAttributes_throws_if_null_passed_as_argument()
        {
            Assert.Throws<ArgumentNullException>(() => builder.HeaderHtmlAttributes(null));
        }

        [Fact]
        public void Format_sets_the_format_string_of_the_column()
        {
            builder.Format("{0}");
            Assert.Equal("{0}", column.Format);
        }

        [Fact]
        public void Sortable_sets_the_sortable_of_the_column()
        {
            builder.Sortable(false);

            Assert.False(column.Sortable);
        }

        [Fact]
        public void Encoded_sets_the_encoded_property()
        {
            builder.Encoded(false);
            Assert.False(column.Encoded);
        }

        [Fact]
        public void HtmlAttributes_sets_the_html_attributes_of_the_column()
        {
            builder.HtmlAttributes(new { @class = "test" });

            Assert.Equal("test", column.HtmlAttributes["class"]);
        }

        [Fact]
        public void HtmlAttributes_throws_if_null_passed_as_argument()
        {
            Assert.Throws<ArgumentNullException>(() => builder.HtmlAttributes(null));
        }

        [Fact]
        public void Template_sets_the_template_of_the_column()
        {
            Action<Customer> template = c => { };
            builder.Template(template);

            Assert.Same(template, column.Template);
        }

        [Fact]
        public void Filterable_sets_the_filterable_property()
        {
            builder.Filterable(false);
            Assert.False(column.Filterable);
        }

        [Fact]
        public void IncludeInContextMenu_default_value()
        {            
            Assert.True(column.IncludeInContextMenu);
        }

        [Fact]
        public void IncludeInContextMenu_sets_the_IncludeInContextMenu_property()
        {
            builder.IncludeInContextMenu(false);
            Assert.False(column.IncludeInContextMenu);
        }

        [Fact]
        public void Should_be_able_to_set_title_to_empty_string()
        {
            builder.Title("");
            Assert.Equal("", builder.Column.Title);
        }

        [Fact]
        public void Should_set_header_template()
        {
            Action template = () => { };

            builder.HeaderTemplate(template);

            column.HeaderTemplate.HasValue().ShouldBeTrue();
        }

        [Fact]
        public void Should_throw_if_null_is_passed_as_header_template()
        {
            Assert.Throws<ArgumentNullException>(() => builder.HeaderTemplate((Action) null));

            Assert.Throws<ArgumentNullException>(() => builder.HeaderTemplate((Func<object,object>)null));

            Assert.Throws<ArgumentException>(() => builder.HeaderTemplate((string)null));
            Assert.Throws<ArgumentException>(() => builder.HeaderTemplate(String.Empty));
        }

        [Fact]
        public void Header_template_should_return_not_null_column_builder()
        {
            builder.HeaderTemplate(() => { }).ShouldNotBeNull();
            builder.HeaderTemplate("my_template").ShouldNotBeNull();
            builder.HeaderTemplate(t => t).ShouldNotBeNull();
        }

        [Fact]
        public void Should_set_header_template_from_string()
        {
            const string expectedValue = "my_template";
            builder.HeaderTemplate(expectedValue);
            column.HeaderTemplate.HasValue().ShouldBeTrue();
        }

        [Fact]
        public void Should_set_header_template_for_razor()
        {
            Func<object, object> template = t => t;
            builder.HeaderTemplate(template);

            column.HeaderTemplate.HasValue().ShouldBeTrue();
        }
        
        [Fact]
        public void Should_set_footer_template()
        {
            Action template = () => { };

            builder.FooterTemplate(template);

            column.FooterTemplate.HasValue().ShouldBeTrue();
        }

        [Fact]
        public void Should_throw_if_null_is_passed_as_footer_template()
        {
            Assert.Throws<ArgumentNullException>(() => builder.FooterTemplate((Action)null));

            Assert.Throws<ArgumentNullException>(() => builder.FooterTemplate((Func<object, object>)null));

            Assert.Throws<ArgumentException>(() => builder.FooterTemplate((string)null));
            Assert.Throws<ArgumentException>(() => builder.FooterTemplate(String.Empty));
        }

        [Fact]
        public void Footer_template_should_return_not_null_column_builder()
        {
            builder.FooterTemplate(() => { }).ShouldNotBeNull();
            builder.FooterTemplate("my_template").ShouldNotBeNull();
            builder.FooterTemplate(t => t).ShouldNotBeNull();
        }

        [Fact]
        public void Should_set_footer_template_from_string()
        {
            const string expectedValue = "my_template";
            builder.FooterTemplate(expectedValue);
            column.FooterTemplate.HasValue().ShouldBeTrue();
        }

        [Fact]
        public void Should_set_footer_template_for_razor()
        {
            Func<object, object> template = t => t;
            builder.FooterTemplate(template);

            column.FooterTemplate.HasValue().ShouldBeTrue();
        }       

        [Fact]
        public void Should_set_editor_template_name()
        {
            const string expectedValue = "SomeEditorName";
            builder.EditorTemplateName(expectedValue);

            column.EditorTemplateName.ShouldEqual(expectedValue);
        }

        [Fact]
        public void Should_throw_if_editor_template_name_is_empty()
        {
            Assert.Throws<ArgumentException>(() => builder.EditorTemplateName(string.Empty));
        }
    }
}
