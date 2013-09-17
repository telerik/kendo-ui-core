using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Kendo.Mvc.Examples
{
    public class ModelBinderConfig
    {
        public static void RegisterModelBinders(System.Web.Mvc.ModelBinderDictionary modelBinders)
        {
            modelBinders.Add(typeof(decimal), new CultureAwareDecimalModelBinder());
            modelBinders.Add(typeof(DateTime), new CultureAwareDateTimeModelBinder());
        }
    }
}