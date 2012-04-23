namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Web.Mvc;
    using Moq;
    using Xunit;


    public class DatePickerRenderingTests
    {
        private readonly DatePicker datePicker;
        private readonly Mock<IDatePickerHtmlBuilder> tagBuilder;
        private readonly Mock<IHtmlNode> rootTag;
        Mock<TextWriter> textWriter;
        ViewContext viewContext;

        public DatePickerRenderingTests()
        {
            viewContext = TestHelper.CreateViewContext();

            textWriter = new Mock<TextWriter>();
            
            tagBuilder = new Mock<IDatePickerHtmlBuilder>();
            rootTag = new Mock<IHtmlNode>();
            rootTag.SetupGet(t => t.Children).Returns(() => new List<IHtmlNode>());

            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);

            datePicker = DatePickerTestHelper.CreateDatePicker(tagBuilder.Object, viewContext);
            datePicker.Name = "DatePicker";
        }
#if MVC2 || MVC3
        [Fact]
        public void If_Name_is_not_set_it_should_be_get_from_TemplateInfo()
        {
            DatePicker datePicker2 = DatePickerTestHelper.CreateDatePicker(tagBuilder.Object, viewContext);

            const string htmlFieldPrefix = "TestPrefix";
            viewContext.ViewData.TemplateInfo.HtmlFieldPrefix = htmlFieldPrefix;

            Assert.DoesNotThrow(() => datePicker2.Render());
            Assert.Equal(htmlFieldPrefix, datePicker2.Name);
        }
#endif

        [Fact]
        public void Render_should_call_objectWriter_start_method()
        {
            DatePickerTestHelper.clientSideObjectWriter.Setup(ow => ow.Start()).Verifiable();

            datePicker.WriteInitializationScript(textWriter.Object);

            DatePickerTestHelper.clientSideObjectWriter.Verify(ow => ow.Start());
        }

        [Fact]
        public void ObjectWriter_should_call_objectWriter_complete_method()
        {
            DatePickerTestHelper.clientSideObjectWriter.Setup(w => w.Complete());

            datePicker.WriteInitializationScript(textWriter.Object);

            DatePickerTestHelper.clientSideObjectWriter.Verify(w => w.Complete());
        }

        [Fact]
        public void ObjectWriter_should_append_Load_property_of_clientEvents()
        {
            datePicker.ClientEvents.OnLoad.CodeBlock = () => { };

            DatePickerTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onLoad", datePicker.ClientEvents.OnLoad)).Verifiable();

            datePicker.WriteInitializationScript(textWriter.Object);

            DatePickerTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onLoad", datePicker.ClientEvents.OnLoad));
        }

        [Fact]
        public void ObjectWriter_should_append_Select_property_of_clientEvents()
        {
            datePicker.ClientEvents.OnChange.CodeBlock = () => { };

            DatePickerTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onChange", datePicker.ClientEvents.OnChange)).Verifiable();

            datePicker.WriteInitializationScript(textWriter.Object);

            DatePickerTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onChange", datePicker.ClientEvents.OnChange));
        }

        [Fact]
        public void ObjectWriter_should_append_PopUpOpen_property_of_clientEvents()
        {
            datePicker.ClientEvents.OnOpen.CodeBlock = () => { };

            DatePickerTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onOpen", datePicker.ClientEvents.OnOpen)).Verifiable();

            datePicker.WriteInitializationScript(textWriter.Object);

            DatePickerTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onOpen", datePicker.ClientEvents.OnOpen));
        }

        [Fact]
        public void ObjectWriter_should_append_PopUpClose_property_of_clientEvents()
        {
            datePicker.ClientEvents.OnClose.CodeBlock = () => { };

            DatePickerTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onClose", datePicker.ClientEvents.OnClose)).Verifiable();

            datePicker.WriteInitializationScript(textWriter.Object);

            DatePickerTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onClose", datePicker.ClientEvents.OnClose));
        }

        [Fact]
        public void ObjectWriter_should_append_DateFormat_property()
        {            
            datePicker.Format = "dd/MM/yyyy";

            DatePickerTestHelper.clientSideObjectWriter.Setup(w => w.Append("format", "dd/MM/yyyy")).Verifiable();

            datePicker.WriteInitializationScript(textWriter.Object);

            DatePickerTestHelper.clientSideObjectWriter.Verify(w => w.Append("format", "dd/MM/yyyy"));
        }

        [Fact]
        public void ObjectWriter_should_append_SelectedDate_property()
        {
            DateTime? date = new DateTime(2000, 12, 20);

            datePicker.Value = date;

            DatePickerTestHelper.clientSideObjectWriter.Setup(w => w.AppendDateOnly("selectedValue", date)).Verifiable();

            datePicker.WriteInitializationScript(textWriter.Object);

            DatePickerTestHelper.clientSideObjectWriter.Verify(w => w.AppendDateOnly("selectedValue", date));
        }

        [Fact]
        public void ObjectWriter_should_append_MinDate_property()
        {
            DateTime date = new DateTime(1900, 12, 20);

            datePicker.MinValue = date;

            DatePickerTestHelper.clientSideObjectWriter.Setup(w => w.AppendDateOnly("minValue", date)).Verifiable();

            datePicker.WriteInitializationScript(textWriter.Object);

            DatePickerTestHelper.clientSideObjectWriter.Verify(w => w.AppendDateOnly("minValue", date));
        }

        [Fact]
        public void ObjectWriter_should_append_MaxDate_property()
        {
            DateTime date = new DateTime(2100, 12, 20);

            datePicker.MaxValue = date;

            DatePickerTestHelper.clientSideObjectWriter.Setup(w => w.AppendDateOnly("maxValue", date)).Verifiable();

            datePicker.WriteInitializationScript(textWriter.Object);

            DatePickerTestHelper.clientSideObjectWriter.Verify(w => w.AppendDateOnly("maxValue", date));
        }

        [Fact]
        public void Render_should_not_throw_exception_if_selectedDate_is_out_of_limits() 
        {
            datePicker.MinValue = DateTime.Now.AddMonths(1);
            datePicker.Value = DateTime.Now;

            Assert.DoesNotThrow(() => datePicker.Render());
        }

        [Fact]
        public void Render_should_throw_exception_if_minDate_is_bigger_than_maxDate()
        {
            DateTime date = DateTime.Now;
            datePicker.MaxValue = date;
            datePicker.MinValue = date.AddMonths(1);

            Assert.Throws(typeof(ArgumentException), () => datePicker.Render());
        }

        [Fact]
        public void Render_should_not_throw_exception_if_value_is_equal_to_maxDate() 
        {
            DateTime date = DateTime.Today;
            datePicker.Value = date;
            datePicker.MaxValue = date;

            Assert.DoesNotThrow(() => datePicker.Render());
        }

        [Fact]
        public void Render_should_not_throw_exception_if_value_is_equal_to_minDate()
        {
            DateTime date = DateTime.Today;
            datePicker.Value = date;
            datePicker.MinValue = date;

            Assert.DoesNotThrow(() => datePicker.Render());
        }

        [Fact]
        public void MinDate_should_set_throw_exception_if_less_than_minDate()
        {
            DateTime date = DateTime.Now;
            datePicker.MinValue = date;
            datePicker.MaxValue = date.AddMonths(-1);

            Assert.Throws(typeof(ArgumentException), () => datePicker.Render());
        }
    }
}