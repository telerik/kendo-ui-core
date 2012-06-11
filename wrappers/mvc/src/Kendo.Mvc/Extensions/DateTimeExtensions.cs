using System;
using System.Globalization;

namespace Kendo.Mvc.Extensions
{
    internal static class DateTimeExtensions
    {
        public static string ToJavaScriptString(this DateTime? date)
        {
            return date.HasValue ?
                date.Value.ToString("yyyy/MM/dd HH:mm:ss", CultureInfo.InvariantCulture) :
                string.Empty;
        }

        public static string ToJavaScriptString(this DateTime date)
        {
            return new Nullable<DateTime>(date).ToJavaScriptString();
        }
    }
}
