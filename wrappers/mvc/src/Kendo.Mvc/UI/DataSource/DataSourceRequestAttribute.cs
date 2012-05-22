using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI
{
    public class DataSourceRequestAttribute : CustomModelBinderAttribute
    {
        public string Prefix { get; set; }

        public override IModelBinder GetBinder()
        {
            return new DataSourceRequestModelBinder() { Prefix = Prefix };
        }
    }
}