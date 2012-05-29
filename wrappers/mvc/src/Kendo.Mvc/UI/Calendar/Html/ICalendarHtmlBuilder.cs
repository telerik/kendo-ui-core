namespace Kendo.Mvc.UI
{
    using System;

    public interface ICalendarHtmlBuilder
    {
        IHtmlNode Build();

        IHtmlNode ContentTag();

        IHtmlNode HeaderTag();

        IHtmlNode HeaderCellTag(string dayName, string abbreviatedDayName, string shortestDayName);

        IHtmlNode MonthTag();

        IHtmlNode RowTag();

        IHtmlNode CellTag(DateTime currentDay, DateTime? selectedDate, string urlFormat, bool isOtherMonth);
    }
}