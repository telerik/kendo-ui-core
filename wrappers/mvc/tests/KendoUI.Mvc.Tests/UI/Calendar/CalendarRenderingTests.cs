namespace Telerik.Web.Mvc.UI.Tests
{
    using Moq;
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Threading;
    using Xunit;

    public class CalendarRenderingTests: IDisposable
    {
        private readonly Calendar calendar;
        private readonly Mock<ICalendarHtmlBuilder> tagBuilder;
        private readonly Mock<IHtmlNode> rootTag;
        System.Globalization.CultureInfo currentCulture;

        public CalendarRenderingTests()
        {
            currentCulture = System.Globalization.CultureInfo.CurrentCulture;

            Thread.CurrentThread.CurrentCulture = System.Globalization.CultureInfo.InvariantCulture;
            Thread.CurrentThread.CurrentUICulture = System.Globalization.CultureInfo.InvariantCulture;

            tagBuilder = new Mock<ICalendarHtmlBuilder>();
            rootTag = new Mock<IHtmlNode>();
            rootTag.SetupGet(t => t.Children).Returns(() => new List<IHtmlNode>());

            calendar = CalendarTestHelper.CreateCalendar(tagBuilder.Object);
            calendar.Name = "Calendar";
        }

        public void Dispose()
        {
            Thread.CurrentThread.CurrentCulture = Thread.CurrentThread.CurrentUICulture = currentCulture;
        }

        [Fact]
        public void Render_should_output_Calendar_start_only_once()
        {
            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.ContentTag()).Returns(new HtmlElement("table"));
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody"));
            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr"));
            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), It.IsAny<DateTime?>(), It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td"));

            calendar.Render();

            tagBuilder.Verify();
        }

        [Fact]
        public void Render_should_output_Content_tag()
        {
            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody"));
            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr"));
            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), It.IsAny<DateTime?>(), It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td"));

            tagBuilder.Setup(r => r.ContentTag()).Returns(new HtmlElement("table")).Verifiable();

            calendar.Render();

            tagBuilder.Verify();
        }

        [Fact]
        public void Render_should_output_Header_Start_once()
        {
            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.ContentTag()).Returns(new HtmlElement("table"));
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody"));
            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr"));
            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), It.IsAny<DateTime?>(), It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td"));

            tagBuilder.Setup(r => r.HeaderTag()).Returns(new HtmlElement("thead")).Verifiable();

            calendar.Render();

            tagBuilder.Verify();
        }

        [Fact]
        public void Render_should_output_Header_day_seven_times()
        {
            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.ContentTag()).Returns(new HtmlElement("table"));
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody"));
            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr"));
            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), It.IsAny<DateTime?>(), It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td"));

            tagBuilder.Setup(r => r.HeaderCellTag(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).Verifiable();

            calendar.Render();

            tagBuilder.Verify(r => r.HeaderCellTag(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>()), Times.Exactly(7));
        }

        [Fact]
        public void Render_should_output_Month_Body_Start_once()
        {
            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.ContentTag()).Returns(new HtmlElement("table"));
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr"));
            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), It.IsAny<DateTime?>(), It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td"));

            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody")).Verifiable();

            calendar.Render();

            tagBuilder.Verify();
        }

        [Fact]
        public void Render_should_output_Month_Row_Start_once()
        {
            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.ContentTag()).Returns(new HtmlElement("table"));
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody"));
            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), It.IsAny<DateTime?>(), It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td"));

            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr")).Verifiable();

            calendar.Render();

            tagBuilder.Verify();
        }

        [Fact]
        public void Render_should_output_42_days()
        {
            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.ContentTag()).Returns(new HtmlElement("table"));
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody"));
            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr"));

            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), It.IsAny<DateTime?>(), It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td")).Verifiable();

            calendar.Render();

            tagBuilder.Verify(t => t.CellTag(It.IsAny<DateTime>(), It.IsAny<DateTime?>(), It.IsAny<string>(), It.IsAny<bool>()), Times.Exactly(42));

        }

        [Fact]
        public void Render_should_call_objectWriter_start_method()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            CalendarTestHelper.clientSideObjectWriter.Setup(ow => ow.Start()).Verifiable();

            calendar.WriteInitializationScript(writer.Object);

            CalendarTestHelper.clientSideObjectWriter.Verify(ow => ow.Start());
        }

        [Fact]
        public void ObjectWriter_should_call_objectWriter_complete_method()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            CalendarTestHelper.clientSideObjectWriter.Setup(w => w.Complete());

            calendar.WriteInitializationScript(writer.Object);

            CalendarTestHelper.clientSideObjectWriter.Verify(w => w.Complete());
        }

        [Fact]
        public void ObjectWriter_should_append_Load_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            calendar.ClientEvents.OnLoad.CodeBlock = () => { };

            CalendarTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onLoad", calendar.ClientEvents.OnLoad)).Verifiable();

            calendar.WriteInitializationScript(writer.Object);

            CalendarTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onLoad", calendar.ClientEvents.OnLoad));
        }

        [Fact]
        public void ObjectWriter_should_append_OnChange_property_of_clientEvents()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            calendar.ClientEvents.OnChange.CodeBlock = () => { };

            CalendarTestHelper.clientSideObjectWriter.Setup(w => w.AppendClientEvent("onChange", calendar.ClientEvents.OnChange)).Verifiable();

            calendar.WriteInitializationScript(writer.Object);

            CalendarTestHelper.clientSideObjectWriter.Verify(w => w.AppendClientEvent("onChange", calendar.ClientEvents.OnChange));
        }

        [Fact]
        public void ObjectWriter_should_append_SelectedDate_property()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            DateTime? date = new DateTime(2000, 12, 20);

            calendar.Value = date;

            CalendarTestHelper.clientSideObjectWriter.Setup(w => w.AppendDateOnly("selectedDate", date)).Verifiable();

            calendar.WriteInitializationScript(writer.Object);

            CalendarTestHelper.clientSideObjectWriter.Verify(w => w.AppendDateOnly("selectedDate", date));
        }

        [Fact]
        public void ObjectWriter_should_append_MinDate_property()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            DateTime date = new DateTime(1900, 12, 20);

            calendar.MinDate = date;

            CalendarTestHelper.clientSideObjectWriter.Setup(w => w.AppendDateOnly("minDate", date)).Verifiable();

            calendar.WriteInitializationScript(writer.Object);

            CalendarTestHelper.clientSideObjectWriter.Verify(w => w.AppendDateOnly("minDate", date));
        }

        [Fact]
        public void ObjectWriter_should_append_MaxDate_property()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            DateTime date = new DateTime(2100, 12, 20);

            calendar.MaxDate = date;

            CalendarTestHelper.clientSideObjectWriter.Setup(w => w.AppendDateOnly("maxDate", date)).Verifiable();

            calendar.WriteInitializationScript(writer.Object);

            CalendarTestHelper.clientSideObjectWriter.Verify(w => w.AppendDateOnly("maxDate", date));
        }

        [Fact]
        public void ObjectWriter_should_append_Selection_dates_property()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            IList<DateTime> dates = new List<DateTime> { new DateTime(2100, 12, 20) };

            calendar.SelectionSettings.Dates = dates;

            CalendarTestHelper.clientSideObjectWriter.Setup(w => w.AppendDatesOnly("dates", dates)).Verifiable();

            calendar.WriteInitializationScript(writer.Object);

            CalendarTestHelper.clientSideObjectWriter.Verify(w => w.AppendDatesOnly("dates", dates));
        }

        [Fact]
        public void ObjectWriter_should_append_Selection_URL_property()
        {
            Mock<TextWriter> writer = new Mock<TextWriter>();

            CalendarTestHelper.clientSideObjectWriter.Setup(w => w.Append("urlFormat", It.IsAny<string>())).Verifiable();

            calendar.WriteInitializationScript(writer.Object);

            CalendarTestHelper.clientSideObjectWriter.Verify(w => w.Append("urlFormat", It.IsAny<string>()));
        }

        [Fact]
        public void Render_should_not_throw_exception_if_selectedDate_is_out_of_limits()
        {
            calendar.MinDate = DateTime.Now.AddMonths(1);
            calendar.Value = DateTime.Now;

            Assert.DoesNotThrow(() => calendar.VerifySettings());
        }

        [Fact]
        public void Render_should_not_throw_exception_if_selectedDate_is_null()
        {
            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.ContentTag()).Returns(new HtmlElement("table"));
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody"));
            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr"));
            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), calendar.Value, It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td"));

            calendar.MinDate = DateTime.Now.AddMonths(-1);
            calendar.Value = null;

            Assert.DoesNotThrow(() => calendar.Render());
        }

        [Fact]
        public void Render_should_throw_exception_if_minDate_is_bigger_than_maxDate()
        {
            DateTime date = DateTime.Now;
            calendar.MaxDate = date;
            calendar.MinDate = date.AddMonths(1);

            Assert.Throws<ArgumentException>(() => calendar.VerifySettings());
        }

        [Fact]
        public void MaxDate_should_set_throw_exception_if_less_than_minDate()
        {
            DateTime date = DateTime.Now;
            calendar.MinDate = date;
            calendar.MaxDate = date.AddMonths(-1);

            Assert.Throws <ArgumentException>(() => calendar.VerifySettings());
        }


        [Fact]
        public void Render_should_not_throw_exception_if_value_is_equal_to_maxDate()
        {
            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.ContentTag()).Returns(new HtmlElement("table"));
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody"));
            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr"));
            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), It.IsAny<DateTime?>(), It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td"));

            rootTag.Setup(tag => tag.WriteTo(It.IsAny<TextWriter>())).Verifiable();

            DateTime date = DateTime.Today;
            calendar.Value = date;
            calendar.MaxDate = date;

            Assert.DoesNotThrow(() => calendar.Render());
        }

        [Fact]
        public void Render_should_not_throw_exception_if_value_is_equal_to_minDate()
        {
            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.ContentTag()).Returns(new HtmlElement("table"));
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody"));
            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr"));
            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), It.IsAny<DateTime?>(), It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td"));

            rootTag.Setup(tag => tag.WriteTo(It.IsAny<TextWriter>())).Verifiable();

            DateTime date = DateTime.Today;
            calendar.Value = date;
            calendar.MinDate = date;

            Assert.DoesNotThrow(() => calendar.Render());
        }

        [Fact]
        public void rootTag_should_call_writeTo_method() 
        {
            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.ContentTag()).Returns(new HtmlElement("table"));
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody"));
            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr"));
            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), calendar.Value, It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td"));

            rootTag.Setup(tag=>tag.WriteTo(It.IsAny<TextWriter>())).Verifiable();

            calendar.Render();

            rootTag.Verify();
        }

        [Fact]
        public void CellTag_should_start_rendering_month_view_from_25_07_2010() 
        {
            calendar.Value = new DateTime(2010, 8, 1);

            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.ContentTag()).Returns(new HtmlElement("table"));
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody"));
            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr"));
            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), It.IsAny<DateTime?>(), It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td")).Verifiable();
            
            calendar.Render();

            tagBuilder.Verify(t => t.CellTag(new DateTime(2010, 7, 25), calendar.Value,It.IsAny<string>(), It.IsAny<bool>()), Times.Once());
        }

        [Fact]
        public void CellTag_should_start_rendering_month_view_from_31_8_2011()
        {
            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo("sl-SI");
            Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo("sl");

            calendar.Value = new DateTime(2011, 8, 31);

            tagBuilder.Setup(t => t.Build()).Returns(rootTag.Object);
            tagBuilder.Setup(t => t.ContentTag()).Returns(new HtmlElement("table"));
            tagBuilder.Setup(t => t.HeaderTag()).Returns(new HtmlElement("thead"));
            tagBuilder.Setup(t => t.MonthTag()).Returns(new HtmlElement("tbody"));
            tagBuilder.Setup(t => t.RowTag()).Returns(new HtmlElement("tr"));
            tagBuilder.Setup(t => t.CellTag(It.IsAny<DateTime>(), It.IsAny<DateTime?>(), It.IsAny<string>(), It.IsAny<bool>())).Returns(new HtmlElement("td")).Verifiable();

            calendar.Render();

            tagBuilder.Verify(t => t.CellTag(new DateTime(2011, 7, 25), calendar.Value, It.IsAny<string>(), It.IsAny<bool>()), Times.Once());
        }
    }
}
