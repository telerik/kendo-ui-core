// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;

    public static class CalendarExtension
    {
        public static DateTime DetermineFocusedDate(this Calendar calendar)
        {
            DateTime focusedDate = DateTime.Today;
            if (calendar.Value.HasValue) {
                focusedDate = calendar.Value.Value;
            }

            if (calendar.MinDate > focusedDate) 
            {
                focusedDate = calendar.MinDate;
            }
            else if (calendar.MaxDate < focusedDate) 
            {
                focusedDate = calendar.MaxDate;
            }

            return focusedDate;
        }
    }
}
