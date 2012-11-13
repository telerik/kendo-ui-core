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
            "web/kendo.common.less",
            "web/kendo.rtl.css",
            "web/kendo.default.less",
            "dataviz/kendo.dataviz.css",
            "dataviz/kendo.dataviz.default.css"
#else
            "kendo.common.min.css",
            "kendo.rtl.min.css",
            "kendo.default.min.css",
            "kendo.dataviz.min.css",
            "kendo.dataviz.default.min.css"
#endif
        };

        public static readonly IList<string> Simulator = new string[]
        {
#if DEBUG
            "web/kendo.common.less",
            "web/kendo.black.less"
#else
            "kendo.common.min.css",
            "kendo.black.min.css"
#endif
        };

        public static readonly IList<string> Mobile = new string[]
        {
#if DEBUG
            "web/kendo.common.less",
            "web/kendo.default.less",
            "mobile/kendo.mobile.all.less"
#else
            "kendo.common.min.css",
            "kendo.default.min.css",
            "kendo.mobile.all.min.css"
#endif
        };
    }
}
