// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;
    using System.Text.RegularExpressions;
    using System.Web.Script.Serialization;
    using Telerik.Web.Mvc.Extensions;

    public static class GridDetailViewExtensions
    {
        public static void SerializeTo<T>(this IGridDetailView<T> detailView, string key, IClientSideObjectWriter objectWriter)
            where T : class
        {
            if (detailView.ClientTemplate.HasValue())
            {
                var json = new Dictionary<string, object>();
                json["template"] = Regex.Replace(detailView.ClientTemplate, @"data-val-regex-pattern=\\""(.*?)\\""", (Match match) =>
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
                                             
                objectWriter.AppendObject(key, json);
            }
        }
    }
}
