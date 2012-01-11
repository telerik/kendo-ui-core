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
            "kendo.default.less"
#else
            "kendo.common.min.css",
            "kendo.default.min.css",
#endif
        };

        public static readonly IList<string> Mobile = new string[]
        {
#if DEBUG
            "kendo.common.css",
            "kendo.default.less",
            "mobile/common.less",
            "mobile/android4.less",
            "mobile/blackberry.less",
            "mobile/icons.less",
            "mobile/ios.less",
            "mobile/meego.less"
#else
            "kendo.common.min.css",
            "kendo.default.min.css",
            "mobile/kendo.mobile.common.min.css"
#endif
        };
    }
}
