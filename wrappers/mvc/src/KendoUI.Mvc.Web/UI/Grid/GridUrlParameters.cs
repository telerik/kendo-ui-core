// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections.Generic;

    public static class GridUrlParameters
    {
        public static string Aggregates
        {
            get;
            set;
        }
        
        public static string Filter { get; set; }
        public static string CurrentPage { get; set; }
        public static string PageSize { get; set; }
        public static string OrderBy { get; set; }
        public static string GroupBy { get; set; }
        public static string Mode { get; set; }
        
        static GridUrlParameters()
        {
            OrderBy = "orderBy";
            GroupBy = "groupBy";
            CurrentPage = "page";
            PageSize = "size";
            Filter = "filter";
            Mode = "mode";
            Aggregates = "aggregates";
        }

        public static IDictionary<string, string> ToDictionary(string prefix)
        {
            IDictionary<string, string> result = new Dictionary<string, string>();

            result["groupBy"] = prefix + GroupBy;
            result["orderBy"] = prefix + OrderBy;
            result["page"] = prefix + CurrentPage;
            result["size"] = prefix + PageSize;
            result["filter"] = prefix + Filter;
            result["mode"] = prefix + Mode;

            return result;
        }
    }
}