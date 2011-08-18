// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace CultureGenerator
{
    using System.Globalization;
    using System.Collections.Generic;
    using System.Web.Script.Serialization;
    
    public static class GlobalizationInfo
    {
        static string[] numberNegativePatterns = new string[] { "(n)", "-n", "- n", "n-", "n -" };

        static string[] currencyPositivePatterns = new string[] { "$n", "n$", "$ n", "n $" };
        static string[] currencyNegativePatterns = new string[] { "($n)", "-$n", "$-n", "$n-", "(n$)", "-n$", "n-$", "n$-", "-n $", "-$ n", "n $-", "$ n-", "$ -n", "n- $", "($ n)", "(n $)" };

        static string[] percentPositivePatterns = new string[] { "n %", "n%", "%n", "% n" };
        static string[] percentNegativePatterns = new string[] { "-n %", "-n%", "-%n", "%-n", "%n-", "n-%", "n%-", "-% n", "n %-", "% n-", "% -n", "n- %" };

        private static IDictionary<string, object> BuildFlatDictionary(CultureInfo cultureInfo)
        {
            NumberFormatInfo numberFormats = cultureInfo.NumberFormat;
            DateTimeFormatInfo dateTimeFormats = cultureInfo.DateTimeFormat;

            IDictionary<string, object> globalization = new Dictionary<string, object>();

            globalization["Name"] = cultureInfo.Name;
            
            //number info
            globalization["NumberPattern"] = new string[] { numberNegativePatterns[cultureInfo.NumberFormat.NumberNegativePattern] };
            globalization["NumberDecimalDigits"] = cultureInfo.NumberFormat.NumberDecimalDigits;
            globalization["NumberGroupSeparator"] = numberFormats.NumberGroupSeparator;
            globalization["NumberDecimalSeparator"] = numberFormats.NumberDecimalSeparator;
            globalization["NumberGroupSizes"] = numberFormats.NumberGroupSizes;

            //percent info
            globalization["PercentPattern"] = new string[] { percentNegativePatterns[cultureInfo.NumberFormat.PercentNegativePattern], percentPositivePatterns[cultureInfo.NumberFormat.PercentPositivePattern] };
            globalization["PercentDecimalDigits"] = cultureInfo.NumberFormat.PercentDecimalDigits;
            globalization["PercentGroupSeparator"] = numberFormats.PercentGroupSeparator;
            globalization["PercentDecimalSeparator"] = numberFormats.PercentDecimalSeparator;
            globalization["PercentGroupSizes"] = numberFormats.PercentGroupSizes;
            globalization["PercentSymbol"] = numberFormats.PercentSymbol;

            //currency info
            globalization["CurrencyPattern"] = new string[] { currencyNegativePatterns[cultureInfo.NumberFormat.CurrencyNegativePattern], currencyPositivePatterns[cultureInfo.NumberFormat.CurrencyPositivePattern] };
            globalization["CurrencyDecimalDigits"] = cultureInfo.NumberFormat.CurrencyDecimalDigits;
            globalization["CurrencyGroupSeparator"] = numberFormats.CurrencyGroupSeparator;
            globalization["CurrencyDecimalSeparator"] = numberFormats.CurrencyDecimalSeparator;
            globalization["CurrencyGroupSizes"] = numberFormats.CurrencyGroupSizes;
            globalization["CurrencySymbol"] = numberFormats.CurrencySymbol;

            //standard calendar info
            globalization["DayNames"] = dateTimeFormats.DayNames;
            globalization["AbbreviatedDayNames"] = dateTimeFormats.AbbreviatedDayNames;
            globalization["ShortestDayNames"] = dateTimeFormats.ShortestDayNames;

            globalization["MonthNames"] = dateTimeFormats.MonthNames;
            globalization["AbbreviatedMonthNames"] = dateTimeFormats.AbbreviatedMonthNames;

            globalization["d"] = dateTimeFormats.ShortDatePattern;
            globalization["D"] = dateTimeFormats.LongDatePattern;
            globalization["F"] = dateTimeFormats.FullDateTimePattern;
            globalization["g"] = dateTimeFormats.ShortDatePattern + " " + dateTimeFormats.ShortTimePattern;
            globalization["G"] = dateTimeFormats.ShortDatePattern + " " + dateTimeFormats.LongTimePattern;
            globalization["m"] = dateTimeFormats.MonthDayPattern;
            globalization["M"] = dateTimeFormats.MonthDayPattern;
            globalization["s"] = dateTimeFormats.SortableDateTimePattern;
            globalization["t"] = dateTimeFormats.ShortTimePattern;
            globalization["T"] = dateTimeFormats.LongTimePattern;
            globalization["u"] = dateTimeFormats.UniversalSortableDateTimePattern;
            globalization["y"] = dateTimeFormats.YearMonthPattern;
            globalization["Y"] = dateTimeFormats.YearMonthPattern;

            var am = dateTimeFormats.AMDesignator;
            var pm = dateTimeFormats.PMDesignator;

            globalization["AM"] = string.IsNullOrEmpty(am) ? new string[] { am } : new string[] { am, am.ToLower(cultureInfo), am.ToUpper(cultureInfo) };
            globalization["PM"] = string.IsNullOrEmpty(pm) ? new string[] { am } : new string[] { pm, pm.ToLower(cultureInfo), pm.ToUpper(cultureInfo) };
            globalization["DateSeparator"] = dateTimeFormats.DateSeparator;
            globalization["TimeSeparator"] = dateTimeFormats.TimeSeparator;

            return globalization;
        }

        public static string Format(this CultureInfo cultureInfo, string culturePattern) 
        {
            var serializer = new JavaScriptSerializer();
            var cultureDictionary = BuildFlatDictionary(cultureInfo);
            
            foreach (KeyValuePair<string, object> pair in cultureDictionary)
            {
                var key = pair.Key;
                var value = pair.Value;

                culturePattern = culturePattern.Replace("{{" + key + "}}", value is System.Array ? serializer.Serialize(value) : System.Convert.ToString(value, cultureInfo));
            }

            return culturePattern;
        }
    }
}