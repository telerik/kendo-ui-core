// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System.Globalization;
    using System.Collections.Generic;
    
    public class GlobalizationInfo
    {
        private readonly IDictionary<string, object> globalization = new Dictionary<string, object>();
        
        public GlobalizationInfo(CultureInfo cultureInfo)
        {
            DateTimeFormatInfo dateTimeFormats = cultureInfo.DateTimeFormat;
            NumberFormatInfo numberFormats = cultureInfo.NumberFormat;

            globalization["shortDate"] = dateTimeFormats.ShortDatePattern;
            globalization["longDate"] = dateTimeFormats.LongDatePattern;
            globalization["longTime"] = dateTimeFormats.LongTimePattern;
            globalization["shortTime"] = dateTimeFormats.ShortTimePattern;
            globalization["fullDateTime"] = dateTimeFormats.FullDateTimePattern;
            globalization["sortableDateTime"] = dateTimeFormats.SortableDateTimePattern;
            globalization["universalSortableDateTime"] = dateTimeFormats.UniversalSortableDateTimePattern;
            globalization["generalDateShortTime"] = dateTimeFormats.ShortDatePattern + " " + dateTimeFormats.ShortTimePattern;
            globalization["generalDateTime"] = dateTimeFormats.ShortDatePattern + " " + dateTimeFormats.LongTimePattern;
            globalization["monthDay"] = dateTimeFormats.MonthDayPattern;
            globalization["monthYear"] = dateTimeFormats.YearMonthPattern;
            globalization["days"] = dateTimeFormats.DayNames;
            globalization["abbrDays"] = dateTimeFormats.AbbreviatedDayNames;
            globalization["shortestDays"] = dateTimeFormats.ShortestDayNames;
            globalization["abbrMonths"] = dateTimeFormats.AbbreviatedMonthNames;
            globalization["months"] = dateTimeFormats.MonthNames;
            globalization["am"] = dateTimeFormats.AMDesignator;
            globalization["pm"] = dateTimeFormats.PMDesignator;
            globalization["dateSeparator"] = dateTimeFormats.DateSeparator;
            globalization["timeSeparator"] = dateTimeFormats.TimeSeparator;
            globalization["firstDayOfWeek"] = (int)dateTimeFormats.FirstDayOfWeek;

            globalization["currencydecimaldigits"] = numberFormats.CurrencyDecimalDigits;
            globalization["currencydecimalseparator"] = numberFormats.CurrencyDecimalSeparator;
            globalization["currencygroupseparator"] = numberFormats.CurrencyGroupSeparator;
            globalization["currencygroupsize"] = numberFormats.CurrencyGroupSizes[0];
            globalization["currencynegative"] = numberFormats.CurrencyNegativePattern;
            globalization["currencypositive"] = numberFormats.CurrencyPositivePattern;
            globalization["currencysymbol"] = numberFormats.CurrencySymbol;

            globalization["numericdecimaldigits"] = numberFormats.NumberDecimalDigits;
            globalization["numericdecimalseparator"] = numberFormats.NumberDecimalSeparator;
            globalization["numericgroupseparator"] = numberFormats.NumberGroupSeparator;
            globalization["numericgroupsize"] = numberFormats.NumberGroupSizes[0];
            globalization["numericnegative"] = numberFormats.NumberNegativePattern;

            globalization["percentdecimaldigits"] = numberFormats.PercentDecimalDigits;
            globalization["percentdecimalseparator"] = numberFormats.PercentDecimalSeparator;
            globalization["percentgroupseparator"] = numberFormats.PercentGroupSeparator;
            globalization["percentgroupsize"] = numberFormats.PercentGroupSizes[0];
            globalization["percentnegative"] = numberFormats.PercentNegativePattern;
            globalization["percentpositive"] = numberFormats.PercentPositivePattern;
            globalization["percentsymbol"] = numberFormats.PercentSymbol;
        }

        public IDictionary<string, object> ToDictionary()
        {
            return globalization;
        }
    }
}