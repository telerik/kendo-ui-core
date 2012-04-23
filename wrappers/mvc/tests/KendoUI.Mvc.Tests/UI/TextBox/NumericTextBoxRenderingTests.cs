namespace Telerik.Web.Mvc.UI.Tests
{

    using System;
    using System.Collections.Generic;
    using System.IO;
    using Moq;
    using Xunit;

    public class NumericTextBoxRenderingTests
    {
        private readonly NumericTextBox<double> input;
        private readonly Mock<ITextBoxBaseHtmlBuilder> tagBuilder;
        private readonly Mock<IHtmlNode> rootTag;
        Mock<TextWriter> textWriter;

        public NumericTextBoxRenderingTests()
        {
            textWriter = new Mock<TextWriter>();

            tagBuilder = new Mock<ITextBoxBaseHtmlBuilder>();
            rootTag = new Mock<IHtmlNode>();
            rootTag.SetupGet(t => t.Children).Returns(() => new List<IHtmlNode>());

            tagBuilder.Setup(t => t.Build("t-numerictextbox")).Returns(rootTag.Object);

            input = TextBoxBaseTestHelper.CreateNumericTextBox<double>(tagBuilder.Object);
            input.Name = "NumericTextBox";
        }

        [Fact]
        public void Render_should_output_DatePicker_start()
        {
            tagBuilder.Setup(t => t.Build("t-numerictextbox")).Returns(rootTag.Object).Verifiable();

            input.Render();

            tagBuilder.Verify();
        }

        [Fact]
        public void Render_should_output_Input()
        {
            tagBuilder.Setup(t => t.Build("t-numerictextbox")).Returns(rootTag.Object);

            tagBuilder.Setup(r => r.InputTag()).Verifiable();

            input.Render();

            tagBuilder.Verify();
        }

        [Fact]
        public void Render_should_output_Buttons()
        {
            input.Spinners = true;

            tagBuilder.Setup(t => t.Build("t-numerictextbox")).Returns(rootTag.Object);

            tagBuilder.Setup(r => r.UpButtonTag()).Verifiable();
            tagBuilder.Setup(r => r.DownButtonTag()).Verifiable();

            input.Render();

            tagBuilder.VerifyAll();
        }

        [Fact]
        public void Render_should_not_output_Buttons_if_spinner_is_false()
        {
            input.Spinners = false;

            tagBuilder.Setup(t => t.Build("t-numerictextbox")).Returns(rootTag.Object);

            tagBuilder.Setup(r => r.UpButtonTag()).Verifiable();
            tagBuilder.Setup(r => r.DownButtonTag()).Verifiable();

            input.Render();

            tagBuilder.Verify(r => r.UpButtonTag(), Times.Never());
            tagBuilder.Verify(r => r.DownButtonTag(), Times.Never());
        }

        [Fact]
        public void Render_should_throw_exception_if_NegativePattern_index_is_incorrect() 
        {
            input.NegativePatternIndex = 6;

            Assert.Throws<IndexOutOfRangeException>(() => input.Render());
        }

        [Fact]
        public void ObjectWriter_should_call_objectWriter_complete_method()
        {
            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.Complete());

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.Complete());
        }

        [Fact]
        public void ObjectWriter_should_append_SelectedValue_property()
        {
            double? value = 10.0;

            input.Value = value;

            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.AppendObject("val", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.AppendObject("val", value));
        }

        [Fact]
        public void ObjectWriter_should_append_IncrementStep_property()
        {
            double value = 1;

            input.IncrementStep = value;

            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.AppendObject("step", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.AppendObject("step", value));
        }

        [Fact]
        public void ObjectWriter_should_append_MinValue_property()
        {
            double value = 10;

            input.MinValue = value;

            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.AppendObject("minValue", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.AppendObject("minValue", value));
        }

        [Fact]
        public void ObjectWriter_should_append_MaxValue_property()
        {
            double value = 10;

            input.MaxValue = value;

            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.AppendObject("maxValue", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.AppendObject("maxValue", value));
        }

        [Fact]
        public void ObjectWriter_should_append_DecimalDigits_property()
        {
            int value = 1;

            input.DecimalDigits = value;

            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.Append("digits", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.Append("digits", value));
        }

        [Fact]
        public void ObjectWriter_should_append_DecimalSeparator_property()
        {
            const string value = ".";

            input.DecimalSeparator = value;

            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.Append("separator", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.Append("separator", value));
        }

        [Fact]
        public void ObjectWriter_should_append_DecimalGroupSeparator_property()
        {
            const string value = ",";

            input.NumberGroupSeparator = value;

            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.AppendNullableString("groupSeparator", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.AppendNullableString("groupSeparator", value));
        }

        [Fact]
        public void ObjectWriter_should_append_DecimalGroupSize_property()
        {
            const int value = 3;

            input.NumberGroupSize = value;

            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.Append("groupSize", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.Append("groupSize", value));
        }

        [Fact]
        public void ObjectWriter_should_append_NegativePatternIndex_property()
        {
            const int value = 1;

            input.NegativePatternIndex = value;

            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.Append("negative", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.Append("negative", value));
        }

        public void ObjectWriter_should_append_WaterMarkText_property()
        {
            const string value = "Enter value";

            input.EmptyMessage = value;

            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.Append("text", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.Append("text", value));
        }

        [Fact]
        public void ObjectWriter_should_append_TextBox_type()
        {
            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.Append("type", "numeric")).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.Append("type", "numeric"));
        }

        [Fact]
        public void ObjectWriter_should_append_Load_property_of_clientEvents()
        {
            input.ClientEvents.OnLoad.CodeBlock = () => { };

            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onLoad", input.ClientEvents.OnLoad)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onLoad", input.ClientEvents.OnLoad));
        }

        [Fact]
        public void ObjectWriter_should_append_Select_property_of_clientEvents()
        {
            input.ClientEvents.OnChange.CodeBlock = () => { };

            TextBoxBaseTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onChange", input.ClientEvents.OnChange)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            TextBoxBaseTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onChange", input.ClientEvents.OnChange));
        }

        [Fact]
        public void Render_should_not_throw_exception_if_value_is_equal_to_maxValue()
        {
            double value = 10;

            input.Value = value;
            input.MaxValue = value;

            Assert.DoesNotThrow(() => input.Render());
        }

        [Fact]
        public void Render_should_not_throw_exception_if_value_is_equal_to_minValue()
        {
            double value = 10;

            input.Value = value;
            input.MinValue = value;
            input.MaxValue = 100;

            Assert.DoesNotThrow(() => input.Render());
        }

        [Fact]
        public void Render_not_should_throw_exception_if_value_is_bigger_then_minValue_and_less_then_maxValue()
        {
            input.Value = 10;
            input.MinValue = 11;
            input.MaxValue = 100;

            Assert.DoesNotThrow(() => input.Render());

            input.Value = 101;
            input.MinValue = 11;
            input.MaxValue = 100;

            Assert.DoesNotThrow(() => input.Render());
        }

        [Fact]
        public void Render_should_not_throw_exception_if_value_is_null_and_we_have_minValue_and_maxValue()
        {
            input.Value = null;
            input.MinValue = 11;
            input.MaxValue = 100;

            Assert.DoesNotThrow(() => input.Render());
        }
    }
}