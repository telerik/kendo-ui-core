namespace Kendo.Mvc.UI.Tests
{

    using Kendo.Mvc.UI.Html;
    using Moq;
    using System;
    using System.IO;
    using Xunit;

    public class NumericTextBoxRenderingTests
    {
        private readonly NumericTextBoxHtmlBuilder<double> renderer;
        private readonly NumericTextBox<double> input;
        private readonly Mock<TextWriter> writer;

        public NumericTextBoxRenderingTests()
        {
            input = NumericTextBoxTestHelper.CreateInput<double>();
            input.Name = "NumericTextBox";

            renderer = new NumericTextBoxHtmlBuilder<double>(input);
            writer = new Mock<TextWriter>();
        }

        [Fact]
        public void Renderer_outputs_input_element()
        {
            var tag = renderer.Build();

            tag.TagName.ShouldEqual("input");
        }

        [Fact]
        public void Renderer_outputs_html_attributes()
        {
            input.HtmlAttributes.Add("readonly", "readonly");
            var tag = renderer.Build();

            tag.Attribute("readonly").ShouldEqual("readonly");
        }

        [Fact]
        public void Renderer_outputs_name_attaribute()
        {
            input.Name = "NumericTextBox";

            var tag = renderer.Build();

            tag.Attribute("name").ShouldEqual("NumericTextBox");
        }

        [Fact]
        public void Renderer_outputs_sanitized_id()
        {
            input.Name = "NumericTextBox?";

            var tag = renderer.Build();

            tag.Attribute("id").ShouldEqual("NumericTextBox_");
        }

        [Fact]
        public void Renderer_outputs_input_type_number()
        {
            var tag = renderer.Build();

            tag.Attribute("type").ShouldEqual("number");
        }

        [Fact]
        public void Renderer_outputs_input_with_k_input_class()
        {
            var tag = renderer.Build();

            tag.Attribute("class").ShouldEqual(UIPrimitives.Input);
        }

        [Fact]
        public void Renderer_outputs_input_with_min_attribute()
        {
            input.Min = 10;

            var tag = renderer.Build();

            tag.Attribute("min").ShouldEqual("10");
        }

        [Fact]
        public void Renderer_outputs_input_with_max_attribute()
        {
            input.Max = 10;

            var tag = renderer.Build();

            tag.Attribute("max").ShouldEqual("10");
        }

        [Fact]
        public void Renderer_outputs_input_with_step_attribute()
        {
            input.Step = 0.1;

            var tag = renderer.Build();

            Convert.ToDouble(tag.Attribute("step")).ShouldEqual(0.1);
        }

        [Fact]
        public void ObjectWriter_appends_format_property()
        {
            var format = "c";
            input.Format = format;

            NumericTextBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("format", format)).Verifiable();

            input.WriteInitializationScript(writer.Object);

            NumericTextBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("format", format));
        }

        [Fact]
        public void ObjectWriter_appends_culture_property()
        {
            var culture = "en-US";
            input.Culture = culture;

            NumericTextBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("culture", culture)).Verifiable();

            input.WriteInitializationScript(writer.Object);

            NumericTextBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("culture", culture));
        }

        [Fact]
        public void ObjectWriter_appends_placeholder_property()
        {
            var placeholder = "en-US";
            input.Placeholder = placeholder;

            NumericTextBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("placeholder", placeholder)).Verifiable();

            input.WriteInitializationScript(writer.Object);

            NumericTextBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("placeholder", placeholder));
        }

        [Fact]
        public void ObjectWriter_appends_spinners_property()
        {
            var spinners = false;
            input.Spinners = spinners;

            NumericTextBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("spinners", spinners, true)).Verifiable();

            input.WriteInitializationScript(writer.Object);

            NumericTextBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("spinners", spinners, true));
        }

        [Fact]
        public void ObjectWriter_appends_decimals_property()
        {
            int? decimals = 2;
            input.Decimals = decimals;

            NumericTextBoxTestHelper.clientSideObjectWriter.Setup(w => w.Append("decimals", decimals)).Verifiable();

            input.WriteInitializationScript(writer.Object);

            NumericTextBoxTestHelper.clientSideObjectWriter.Verify(w => w.Append("decimals", decimals));
        }

        [Fact]
        public void ObjectWriter_appends_spin_event_handler()
        {
            input.ClientEvents.OnSpin.HandlerName = "spin";

            NumericTextBoxTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("spin", input.ClientEvents.OnSpin)).Verifiable();

            input.WriteInitializationScript(writer.Object);

            NumericTextBoxTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("spin", input.ClientEvents.OnSpin));
        }

        [Fact]
        public void ObjectWriter_appends_change_event_handler()
        {
            input.ClientEvents.OnChange.HandlerName = "change";

            NumericTextBoxTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("change", input.ClientEvents.OnChange)).Verifiable();

            input.WriteInitializationScript(writer.Object);

            NumericTextBoxTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("change", input.ClientEvents.OnChange));
        }
    }
}