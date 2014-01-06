namespace Kendo.Mvc.UI
{
    using System;
    using System.Linq;
    using System.Collections.Generic;
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;
    using Kendo.Mvc.Infrastructure;

    public class MapMarkerTooltip : Tooltip
    {
        public MapMarkerTooltip(ViewContext viewContext, IJavaScriptInitializer javaScriptInitializer, ViewDataDictionary viewData)
            : base(viewContext, javaScriptInitializer, viewData)
        {
        }

        public string Template { get; set; }

        public override IDictionary<string, object> ToJson()
        {
            var result = base.ToJson();

            if (Template.HasValue())
            {
                result["template"] = Template;
            }

            return result;
        }
    }
}
