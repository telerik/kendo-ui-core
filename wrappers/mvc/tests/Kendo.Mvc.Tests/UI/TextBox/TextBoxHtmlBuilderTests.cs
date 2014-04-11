namespace Kendo.Mvc.UI.Tests
{
    using Kendo.Mvc.UI.Tests.Chart;
    using System;
    using Xunit;

    public class TextBoxHtmlBuilderTests
    {
        private readonly TextBox<string> textBox;
        private readonly TextBoxHtmlBuilder<string> builder;

        public TextBoxHtmlBuilderTests()
        {
            textBox = TextBoxTestHelper<string>.CreateTextBox();
            textBox.Name = "TestName";
            builder = new TextBoxHtmlBuilder<string>(textBox);
        }

        [Fact]
        public void Build_should_output_wrapper_input()
        {
            var tag = builder.Build();
            tag.TagName.ShouldEqual("input");
        }

        [Fact]
        public void Build_should_set_id()
        {
            string name = "Product";
            textBox.Name = name;
            IHtmlNode tag = (IHtmlNode)builder.Build();

            tag.Attribute("id").ShouldEqual(name);
        }

        [Fact]
        public void Build_should_set_name()
        {
            string name = "Product";
            textBox.Name = name;
            IHtmlNode tag = (IHtmlNode)builder.Build();

            tag.Attribute("name").ShouldEqual(name);
        }

        [Fact]
        public void Build_should_set_CSS_class()
        {
            IHtmlNode tag = (IHtmlNode)builder.Build();

            tag.Attribute("class").ShouldEqual("k-textbox");
        }

        [Fact]
        public void Build_should_render_html_attributes()
        {
            string text = "genericTextBox";
            textBox.HtmlAttributes.Add("title", text);

            IHtmlNode tag = builder.Build();

            tag.Attribute("title").ShouldEqual(text);
        }

        [Fact]
        public void Build_should_render_disabled()
        {
            textBox.Enabled = false;

            IHtmlNode tag = builder.Build();

            tag.Attribute("disabled").ShouldEqual("disabled");
        }

        [Fact]
        public void Build_should_render_value()
        {
            string value = "someValue";
            textBox.Value = value;

            IHtmlNode tag = builder.Build();

            tag.Attribute("value").ShouldEqual(value);
        }

        [Fact]
        public void Build_should_format_int_value()
        {
            TextBox<int> customTextBox = TextBoxTestHelper<int>.CreateTextBox();
            customTextBox.Name = "TestName";
            TextBoxHtmlBuilder<int> customBuilder = new TextBoxHtmlBuilder<int>(customTextBox);

            int testValue = 98;
            customTextBox.Value = testValue;
            customTextBox.Format = "{0:c}";

            IHtmlNode tag = customBuilder.Build();

            tag.Attribute("value").ShouldEqual(string.Format(customTextBox.Format, testValue));
        }

        [Fact]
        public void Build_should_format_date_value()
        {
            TextBox<DateTime> customTextBox = TextBoxTestHelper<DateTime>.CreateTextBox();
            customTextBox.Name = "TestName";
            TextBoxHtmlBuilder<DateTime> customBuilder = new TextBoxHtmlBuilder<DateTime>(customTextBox);

            DateTime testValue = new DateTime();
            customTextBox.Value = testValue;
            customTextBox.Format = "{0:d}";

            IHtmlNode tag = customBuilder.Build();

            tag.Attribute("value").ShouldEqual(string.Format(customTextBox.Format, testValue));
        }
    }
}
