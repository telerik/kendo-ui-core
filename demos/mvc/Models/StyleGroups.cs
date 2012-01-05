using System;
using System.Collections.Generic;
using System.Linq;

namespace Kendo.Models
{
    public static class StyleGroups
    {
        public static readonly IList<string> All = new string[]
        {
#if DEBUG
            "kendo.common.css",
            "kendo.default.css",
            "mobile/kendo.mobile.common.css"
#else
            "kendo.common.min.css",
            "kendo.default.min.css",
            "mobile/kendo.mobile.common.min.css"
#endif
        };
    }
}
