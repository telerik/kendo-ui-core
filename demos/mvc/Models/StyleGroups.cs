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
            "web/kendo.CURRENT_COMMON.less",
            "web/kendo.rtl.css",
            "web/kendo.CURRENT_THEME.less",
            "web/kendo.CURRENT_THEME.mobile.less",
            "dataviz/kendo.dataviz.less",
            "dataviz/kendo.dataviz.CURRENT_THEME.less"
#else
            "kendo.CURRENT_COMMON.min.css",
            "kendo.rtl.min.css",
            "kendo.CURRENT_THEME.min.css",
            "kendo.CURRENT_THEME.mobile.min.css",
            "kendo.dataviz.min.css",
            "kendo.dataviz.CURRENT_THEME.min.css"
#endif
        };

        public static readonly IList<string> Metro = new string[]
        {
#if DEBUG
            "web/kendo.common.less",
            "web/kendo.rtl.css",
            "web/kendo.metro.less",
            "dataviz/kendo.dataviz.less",
            "dataviz/kendo.dataviz.metro.less"
#else
            "kendo.common.min.css",
            "kendo.rtl.min.css",
            "kendo.metro.min.css",
            "kendo.dataviz.min.css",
            "kendo.dataviz.metro.min.css"
#endif
        };

        public static readonly IList<string> Simulator = new string[]
        {
#if DEBUG
            "web/kendo.common.less",
            "web/kendo.metroblack.less"
#else
            "kendo.common.min.css",
            "kendo.metroblack.min.css"
#endif
        };

        public static readonly IList<string> Mobile = new string[]
        {
#if DEBUG
            "web/kendo.CURRENT_COMMON.less",
            "web/kendo.CURRENT_THEME.less",
            "mobile/kendo.mobile.all.less",
            "dataviz/kendo.dataviz.less",
            "dataviz/kendo.dataviz.CURRENT_THEME.less"
#else
            "kendo.CURRENT_COMMON.min.css",
            "kendo.CURRENT_THEME.min.css",
            "kendo.mobile.all.min.css",
            "kendo.dataviz.min.css",
            "kendo.dataviz.CURRENT_THEME.min.css"
#endif
        };

        public static readonly IList<string> Bootstrap = new string[]
        {
#if DEBUG
            "web/kendo.common-bootstrap.less",
            "web/kendo.bootstrap.less",
            "dataviz/kendo.dataviz.less",
            "dataviz/kendo.dataviz.bootstrap.less"
#else
            "kendo.common-bootstrap.min.css",
            "kendo.bootstrap.min.css",
            "kendo.dataviz.min.css",
            "kendo.dataviz.bootstrap.min.css"
#endif
        };
    }
}
