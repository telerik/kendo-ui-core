// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Web.Mvc;
    using System.Collections.Generic;
    
    using Telerik.Web.Mvc.Extensions;

    internal static class ViewComponentExtensions
    {
        public static string GetValue<T>(this IViewComponent instance, T value)
        {
            return instance.GetValue<T>(instance.Name, value);
        }

        public static string GetValue<T>(this IViewComponent instance, string name, T value)
        {
            ModelState state;
            string formattedValue = string.Empty;
            ViewDataDictionary viewData = instance.ViewContext.ViewData;

            object valueFromViewData = name.HasValue() ? viewData.Eval(name) : null;

            if (name.HasValue() && viewData.ModelState.TryGetValue(name, out state) && (state.Value != null))
            {
                formattedValue = state.Value.AttemptedValue;
                if (viewData.ModelState.IsValidField(name))
                {
                    formattedValue = "{0}".FormatWith(state.Value.ConvertTo(typeof(T), state.Value.Culture));
                }
            }
            else if (value != null)
            {
                formattedValue = "{0}".FormatWith(value);
            }
            else if (valueFromViewData != null && valueFromViewData.GetType().IsPredefinedType())
            {
                formattedValue = "{0}".FormatWith(valueFromViewData);
            }

            return formattedValue;
        }

        public static string GetValueFromViewDataByName(this IViewComponent instance)
        {
            string result = instance.ViewContext.Controller.ValueOf<string>(instance.Name);
            if (result.HasValue())
            {
                return result;
            }

            object value = instance.ViewContext.ViewData.Eval(instance.Name);
            return value != null && value.GetType().IsPredefinedType() ? Convert.ToString(value) : string.Empty;
        }

        public static bool IsValid(this IViewComponent instance)
        {
            if (instance.ViewContext != null)
            {
                return instance.ViewContext.ViewData.ModelState.IsValidField(instance.Name ?? string.Empty);
            }
            return true;
        }

        public static IDictionary<string, object> GetUnobtrusiveValidationAttributes(this IViewComponent instance)
        {    
#if MVC3
            var viewContext = instance.ViewContext;

            if (viewContext.UnobtrusiveJavaScriptEnabled)
            {
                var name = instance.Name;
                var viewData = viewContext.ViewData;
                var htmlPrefix = viewData.TemplateInfo.HtmlFieldPrefix;

                if (name.HasValue() && htmlPrefix.HasValue() && name != htmlPrefix && name.StartsWith(htmlPrefix, StringComparison.Ordinal))
                {
                    name = name.Substring(htmlPrefix.Length + 1);
                }

                var metadata = ModelMetadata.FromStringExpression(name, viewData);
                var htmlHelper = new HtmlHelper(viewContext, new ViewComponentViewDataContainer { ViewData = viewData });

                if (metadata.ContainerType == null)
                {
                    metadata = viewContext.ViewData.ModelMetadata;
                }

                return htmlHelper.GetUnobtrusiveValidationAttributes(name, metadata);
            }
#endif
            return null;
        }
    }

    internal class ViewComponentViewDataContainer : IViewDataContainer 
    {
        public ViewDataDictionary ViewData
        {
            get;
            set;
        }
    }
}
