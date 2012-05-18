using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI
{
    public class DataSourceRequestAttribute : CustomModelBinderAttribute
    {
        public override IModelBinder GetBinder()
        {
            return new DataSourceRequestModelBinder();
        }
    }
}