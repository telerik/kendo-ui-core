namespace Telerik.Web.Mvc.UI.UnitTest
{
    using Infrastructure;

    using Moq;
    using Xunit;

    using System.IO;
    using System.Collections.Generic;

    public class PercentInputRenderingTests
    {
        private readonly PercentInput input;
        private readonly Mock<ITextBoxBaseHtmlBuilder> tagBuilder;
        private readonly Mock<IHtmlNode> rootTag;
        Mock<TextWriter> textWriter;

        public PercentInputRenderingTests()
        {
            textWriter = new Mock<TextWriter>();

            tagBuilder = new Mock<ITextBoxBaseHtmlBuilder>();
            rootTag = new Mock<IHtmlNode>();
            rootTag.SetupGet(t => t.Children).Returns(() => new List<IHtmlNode>());

            input = InputTestHelper.CreatePercentInput(tagBuilder.Object);
            input.Name = "PercentInput";
        }

        [Fact]
        public void Render_should_output_DatePicker_start()
        {
            tagBuilder.Setup(t => t.Build("t-percentinput")).Returns(rootTag.Object).Verifiable();

            input.Render();

            tagBuilder.Verify();
        }


        [Fact]
        public void Render_should_output_Input()
        {
            tagBuilder.Setup(t => t.Build("t-percentinput")).Returns(rootTag.Object);

            tagBuilder.Setup(r => r.InputTag()).Verifiable();

            input.Render();

            tagBuilder.Verify();
        }

        [Fact]
        public void Render_should_output_Buttons()
        {
            input.Spinners = true;

            tagBuilder.Setup(t => t.Build("t-percentinput")).Returns(rootTag.Object);

            tagBuilder.Setup(r => r.UpButtonTag()).Verifiable();
            tagBuilder.Setup(r => r.DownButtonTag()).Verifiable();

            input.Render();

            tagBuilder.VerifyAll();
        }

        [Fact]
        public void Render_should_not_output_Buttons_if_spinner_is_false()
        {
            input.Spinners = false;

            tagBuilder.Setup(t => t.Build("t-percentinput")).Returns(rootTag.Object);

            tagBuilder.Setup(r => r.UpButtonTag()).Verifiable();
            tagBuilder.Setup(r => r.DownButtonTag()).Verifiable();

            input.Render();

            tagBuilder.Verify(r => r.UpButtonTag(), Times.Never());
            tagBuilder.Verify(r => r.DownButtonTag(), Times.Never());
        }

        [Fact]
        public void ObjectWriter_should_call_objectWriter_complete_method()
        {
            InputTestHelper.clientSideObjectWriter.Setup(w => w.Complete());

            input.WriteInitializationScript(textWriter.Object);

            InputTestHelper.clientSideObjectWriter.Verify(w => w.Complete());
        }

        [Fact]
        public void ObjectWriter_should_append_SelectedValue_property()
        {
            double? value = 10;

            input.Value = value;

            InputTestHelper.clientSideObjectWriter.Setup(w => w.Append("value", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            InputTestHelper.clientSideObjectWriter.Verify(w => w.Append("value", value));
        }

        [Fact]
        public void ObjectWriter_should_append_IncrementStep_property()
        {
            double value = 1;

            input.IncrementStep = value;

            InputTestHelper.clientSideObjectWriter.Setup(w => w.Append("step", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            InputTestHelper.clientSideObjectWriter.Verify(w => w.Append("step", value));
        }

        [Fact]
        public void ObjectWriter_should_append_MinValue_property()
        {
            double value = 10;

            input.MinValue = value;

            InputTestHelper.clientSideObjectWriter.Setup(w => w.Append("minValue", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            InputTestHelper.clientSideObjectWriter.Verify(w => w.Append("minValue", value));
        }

        [Fact]
        public void ObjectWriter_should_append_MaxValue_property()
        {
            double value = 10;

            input.MaxValue = value;

            InputTestHelper.clientSideObjectWriter.Setup(w => w.Append("maxValue", value)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            InputTestHelper.clientSideObjectWriter.Verify(w => w.Append("maxValue", value));
        }

        [Fact]
        public void ObjectWriter_should_append_Load_property_of_clientEvents()
        {
            input.ClientEvents.OnLoad = () => { };

            InputTestHelper.clientSideObjectWriter.Setup(w => w.Append("onLoad", input.ClientEvents.OnLoad)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            InputTestHelper.clientSideObjectWriter.Verify(w => w.Append("onLoad", input.ClientEvents.OnLoad));
        }

        [Fact]
        public void ObjectWriter_should_append_Select_property_of_clientEvents()
        {
            input.ClientEvents.OnChange = () => { };

            InputTestHelper.clientSideObjectWriter.Setup(w => w.Append("onChange", input.ClientEvents.OnChange)).Verifiable();

            input.WriteInitializationScript(textWriter.Object);

            InputTestHelper.clientSideObjectWriter.Verify(w => w.Append("onChange", input.ClientEvents.OnChange));
        }
    }
}
