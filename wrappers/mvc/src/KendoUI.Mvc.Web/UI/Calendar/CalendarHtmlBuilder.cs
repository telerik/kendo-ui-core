// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using Extensions;

    public class CalendarHtmlBuilder : ICalendarHtmlBuilder
    {
        public CalendarHtmlBuilder(Calendar calendar)
        {
            Calendar = calendar;
        }

        public Calendar Calendar
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            IHtmlNode div = new HtmlElement("div")
                            .Attributes(Calendar.HtmlAttributes)
                            .Attribute("id", Calendar.Id)
                            .PrependClass(UIPrimitives.Widget, "t-calendar");

            IHtmlNode headerDiv = new HtmlElement("div")
                                  .AddClass(UIPrimitives.Header);

            IHtmlNode span = new HtmlElement("span")
                             .Text(Calendar.DetermineFocusedDate().ToString("MMMM yyyy"));

            headerDiv.Children.Add(span);

            div.Children.Add(headerDiv);

            return div;
        }

        public IHtmlNode ContentTag()
        {
            return new HtmlElement("table")
                   .AddClass(UIPrimitives.Content)
                   .Attributes(new { summary = "calendar widget", cellspacing = "0" });
        }

        public IHtmlNode HeaderTag()
        {
            return new HtmlElement("thead");
        }

        public IHtmlNode HeaderCellTag(string dayName, string abbreviatedDayName, string shortestDayName)
        {
            return new HtmlElement("th")
                   .Attributes(new { scope = "col", title = dayName })
                   .Attribute("abbr", abbreviatedDayName)
                   .Text(shortestDayName);
        }

        public IHtmlNode MonthTag()
        {
            return new HtmlElement("tbody");
        }

        public IHtmlNode RowTag()
        {
            return new HtmlElement("tr");
        }

        public IHtmlNode CellTag(DateTime currentDay, DateTime? selectedDate, string urlFormat, bool isOtherMonth)
        {
            IHtmlNode cell = new HtmlElement("td");

            if (isOtherMonth)
            {
                cell.AddClass("t-other-month");
            }
            else if (selectedDate.HasValue && IsInRange(selectedDate.Value) && currentDay.Day == selectedDate.Value.Day)
            {
                cell.AddClass(UIPrimitives.SelectedState);
            }

            if (IsInRange(currentDay))
            {
                var href = GetUrl(currentDay, urlFormat);

                IHtmlNode link = new HtmlElement("a")
                                 .AddClass(UIPrimitives.Link + (href != "#" ? " t-action-link" : string.Empty))
                                 .Attribute("href", href)
                                 .Attribute("title", currentDay.ToLongDateString())
                                 .Text(currentDay.Day.ToString());

                cell.Children.Add(link);
            }
            else
            {
                cell.Html("&nbsp;");
            }

            return cell;
        }

        private bool IsInRange(DateTime date)
        {
            return Calendar.MinDate <= date && date <= Calendar.MaxDate;
        }

        private string GetUrl(DateTime day, string urlFormat)
        {
            string url = "#";
            if (urlFormat.HasValue())
            {
                if (Calendar.SelectionSettings.Dates.Count > 0)
                {
                    if (Calendar.SelectionSettings.Dates.Contains(day))
                    {
                        url = urlFormat.FormatWith(day);
                    }
                    else
                    {
                        url = "#";
                    }
                }
                else
                {
                    url = urlFormat.FormatWith(day);
                }
            }
            return url;
        }
    }
}
