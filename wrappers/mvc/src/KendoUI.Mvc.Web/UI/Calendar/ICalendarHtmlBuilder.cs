// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
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