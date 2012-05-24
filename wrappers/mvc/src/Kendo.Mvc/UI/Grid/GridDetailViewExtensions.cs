namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;
    using System.Text.RegularExpressions;
    using System.Web.Script.Serialization;
    using Kendo.Mvc.Extensions;

    public static class GridDetailViewExtensions
    {        
        public static string Serialize<T>(this IGridDetailView<T> detailView)
            where T : class
        {
            var json = string.Empty;

            if (detailView.ClientTemplate.HasValue())
            {
                json = Regex.Replace(detailView.ClientTemplate, @"data-val-regex-pattern=\\""(.*?)\\""", (Match match) =>
                {
                    return @"data-val-regex-pattern=\\""" + new JavaScriptSerializer().Serialize(match.Groups[1].Value).Trim('"') + @"\\""";
                })
                                        .Replace("%", "%25")
                                        .Replace("\\\\\\\"", "%5c%5c%22")
                                        .Replace("\\\"", "%5c%5c%22")
                                        .Replace("\"", "%22")
                                        .Replace("'", "%27")
                                        .Replace("\\'", "%27")
                                        .Replace("<", "%3c")
                                        .Replace(">", "%3e")
                                        .Replace("\\u003c", "%3c")
                                        .Replace("\\u003e", "%3e")
                                        .Replace("\\r", "%0d")
                                        .Replace("\r", "%0d")
                                        .Replace("\n", "%0A")
                                        .Replace("\\n", "%0A")
                                        .Replace("\t", "%09")
                                        .Replace("\\t", "%09");                                
            }

            return json;
        }
    }
}
