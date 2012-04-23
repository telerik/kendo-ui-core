namespace Telerik.Web.Mvc.UI.Tests
{
    using System;
    using System.Collections.Generic;
    using Xunit;

    public class CalendarHtmlBuilderTests
    {
        private ICalendarHtmlBuilder renderer;
        private Calendar calendar;

        public CalendarHtmlBuilderTests()
        {
            calendar = CalendarTestHelper.CreateCalendar(null);
            calendar.Name = "Calendar";
            renderer = new CalendarHtmlBuilder(calendar);
        }

        [Fact]
        public void Build_should_render_Div_tag() 
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal(tag.TagName, "div");
        }

        [Fact]
        public void Build_should_render_classes()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal(UIPrimitives.Widget.ToString() + " " + "t-calendar", tag.Attribute("class"));
        }

        [Fact]
        public void Build_should_render_id_attribute()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal(calendar.Id, tag.Attribute("id"));
        }

        [Fact]
        public void Build_should_render_html_attribute()
        {
            calendar.HtmlAttributes.Add("title", "calendar");

            IHtmlNode tag = renderer.Build();

            Assert.Equal("calendar", tag.Attribute("title"));
        }

        [Fact]
        public void Build_should_render_header_div()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal("div", tag.Children[0].TagName);
        }

        [Fact]
        public void NavigationTag_should_render_class()
        {
            IHtmlNode tag = renderer.Build();

            Assert.Equal(UIPrimitives.Header, tag.Children[0].Attribute("class"));
        }

        [Fact]
        public void ContentTag_should_render_table_with_html_attributes()
        {
            IHtmlNode tag = renderer.ContentTag();

            Assert.Equal("table", tag.TagName);
            Assert.Equal(UIPrimitives.Content, tag.Attribute("class"));
            Assert.Equal("calendar widget", tag.Attribute("summary"));
            Assert.Equal("0", tag.Attribute("cellspacing"));
        }

        [Fact]
        public void HeaderTag_should_render_thead()
        {
            IHtmlNode tag = renderer.HeaderTag();

            Assert.Equal("thead", tag.TagName);
        }

        [Fact]
        public void HeaderCellTag_should_render_th_with_htmlAttributes_and_day_name()
        {
            const string dayName = "Wednesday";
            const string abbreviatedDayName = "Wen";
            const string shortestDayName = "We";

            IHtmlNode tag = renderer.HeaderCellTag(dayName, abbreviatedDayName, shortestDayName);

            Assert.Equal("th", tag.TagName);
            Assert.Equal("col", tag.Attribute("scope"));
            Assert.Equal(dayName, tag.Attribute("title"));
            Assert.Equal(abbreviatedDayName, tag.Attribute("abbr"));
            Assert.Equal(shortestDayName, tag.InnerHtml);
        }

        [Fact]
        public void MonthTag_should_render_tbody_tag()
        {
            IHtmlNode tag = renderer.MonthTag();

            Assert.Equal("tbody", tag.TagName);
        }

        [Fact]
        public void RowTag_should_render_tr_tag()
        {
            IHtmlNode tag = renderer.RowTag();

            Assert.Equal("tr", tag.TagName);
        }

        [Fact]
        public void CellTag_should_render_td_tag()
        {
            IHtmlNode tag = renderer.CellTag(DateTime.Today, calendar.Value, string.Empty, false);

            Assert.Equal("td", tag.TagName);
        }

        [Fact]
        public void CellTag_should_render_other_month_class_if_isOtherMonth_is_true()
        {
            IHtmlNode tag = renderer.CellTag(DateTime.Today, calendar.Value, string.Empty, true);

            Assert.Equal("t-other-month", tag.Attribute("class"));
        }

        [Fact]
        public void CellTag_should_render_selected_state_class_current_date_is_selected_and_it_not_from_other_month()
        {
            calendar.Value = DateTime.Today;

            IHtmlNode tag = renderer.CellTag(DateTime.Today, calendar.Value, string.Empty, false);

            Assert.Equal(UIPrimitives.SelectedState, tag.Attribute("class"));
        }

        [Fact]
        public void CellTag_should_render_space_if_it_is_out_of_range() 
        {
            calendar.MaxDate = DateTime.Today.AddMonths(-1);

            IHtmlNode tag = renderer.CellTag(DateTime.Today, calendar.Value, string.Empty, false);

            Assert.Equal("&nbsp;", tag.InnerHtml);
        }

        [Fact]
        public void CellTag_should_render_day_if_it_is_in_range_and_no_URL_format()
        {
            IHtmlNode tag = renderer.CellTag(DateTime.Today, calendar.Value, string.Empty, false);

            Assert.Equal(DateTime.Today.Day.ToString(), tag.Children[0].InnerHtml);
        }

        [Fact]
        public void CellTag_should_render_title_attribute_with_today_Long_Date_String()
        {
            IHtmlNode tag = renderer.CellTag(DateTime.Today, calendar.Value, string.Empty, false);

            Assert.Equal(DateTime.Today.ToLongDateString(), tag.Children[0].Attribute("title"));
        }

        [Fact]
        public void CellTag_should_render_day_with_ds_href_if_no_urlFormat()
        {
            IHtmlNode tag = renderer.CellTag(DateTime.Today, calendar.Value, string.Empty, false);

            Assert.Equal("#", tag.Children[0].Attribute("href"));
            Assert.Equal(UIPrimitives.Link, tag.Children[0].Attribute("class"));
        }

        [Fact]
        public void CellTag_should_render_link_with_selection_url_and_formated_date_if_urlFormat_is_not_null()
        {
            DateTime day = DateTime.Today;
            const string urlFormat = "app/controller/action/{0}";
            calendar.SelectionSettings.Dates = new List<DateTime>();

            IHtmlNode tag = renderer.CellTag(day, calendar.Value, urlFormat, false);

            Assert.Equal(string.Format(urlFormat, day.ToString()), tag.Children[0].Attribute("href"));
        }

        [Fact]
        public void CellTag_should_render_navigate_link_if_date_is_in_dates_and_urlFormat_is_passed()
        {
            DateTime day = DateTime.Today;
            const string urlFormat = "app/controller/action/{0}";
            calendar.SelectionSettings.Dates = new List<DateTime> { new DateTime(2005, 5, 10), day, new DateTime(2000, 10, 10) };

            IHtmlNode tag = renderer.CellTag(day, calendar.Value, urlFormat, false);

            Assert.Equal(string.Format(urlFormat, day.ToString()), tag.Children[0].Attribute("href"));
        }

        [Fact]
        public void CellTag_should_render_navigate_link_with_ds_if_date_is_not_in_dates_and_urlFormat_is_passed()
        {
            DateTime day = DateTime.Today;
            const string urlFormat = "app/controller/action/{0}";
            calendar.SelectionSettings.Dates = new List<DateTime> { new DateTime(2005, 5, 10), day, new DateTime(2000, 10, 10) };

            IHtmlNode tag = renderer.CellTag(new DateTime(2000, 5, 10), calendar.Value, urlFormat, false);

            Assert.Equal("#", tag.Children[0].Attribute("href"));
        }
    }
}
