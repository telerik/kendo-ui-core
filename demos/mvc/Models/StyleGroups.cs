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
            "web/kendo.common.css",
            "web/kendo.default.less"
#else
            "kendo.common.min.css",
            "kendo.default.min.css",
#endif
        };

        public static readonly IList<string> Mobile = new string[]
        {
#if DEBUG
            "web/kendo.common.css",
            "web/kendo.default.less",
            "mobile/kendo.mobile.all.less"
#else
            "web/kendo.common.css",
            "kendo.default.min.css",
            "kendo.mobile.all.min.css"
#endif
        };
    }
}
