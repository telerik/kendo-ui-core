namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    
    using System;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using System.Collections.Generic;

    public static class WidgetExtensions
    {
        public static string GetValue<T>(this IWidget instance, T value)
        {
            return instance.GetValue<T>(instance.Name, value);
        }

        public static string GetValue<T>(this IWidget instance, string name, T value)
        {
            ModelState state;
            string formattedValue = string.Empty;
            ViewDataDictionary viewData = instance.ViewData;

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

        public static bool IsValid(this IWidget instance)
        {
            if (instance.ViewContext != null)
            {
                return instance.ViewData.ModelState.IsValidField(instance.Name ?? string.Empty);
            }
            return true;
        }

        public static IDictionary<string, object> GetUnobtrusiveValidationAttributes(this IWidget instance)
        {
            if (instance.ViewContext.UnobtrusiveJavaScriptEnabled && instance.ViewData.ModelMetadata != null)
            {
                var name = instance.Name;
                var htmlHelper = new HtmlHelper(instance.ViewContext, new WidgetViewDataContainer { ViewData = instance.ViewData });
                var metadata = instance.ModelMetadata ?? ModelMetadata.FromStringExpression(name, instance.ViewData);

                return htmlHelper.GetUnobtrusiveValidationAttributes(name, metadata);
            }

            return null;
        }

        public static string SanitizeId(this IWidget instance, string id)
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return string.Empty;
            }
            
            StringBuilder builder = new StringBuilder(id.Length);
            int startSharpIndex = id.IndexOf("#");
            int endSharpIndex = id.LastIndexOf("#");

            if (endSharpIndex > startSharpIndex)
            {
                ReplaceInvalidCharacters(id.Substring(0, startSharpIndex), builder);
                builder.Append(id.Substring(startSharpIndex, endSharpIndex - startSharpIndex + 1));
                ReplaceInvalidCharacters(id.Substring(endSharpIndex + 1), builder);
            }
            else
            {
                ReplaceInvalidCharacters(id, builder);
            }

            return builder.ToString();
        }

        private static void ReplaceInvalidCharacters(string part, StringBuilder builder)
        {
            for (int i = 0; i < part.Length; i++)
            {
                char character = part[i];
                if (IsValidCharacter(character))
                {
                    builder.Append(character);
                }
                else
                {
                    builder.Append(HtmlHelper.IdAttributeDotReplacement);
                }
            }
        }

        private static bool IsValidCharacter(char c) 
        {
            if (c == '?' || c == '!' || c == '#' || c == '.')
            {
                return false;
            }

            return true;
        }

        class WidgetViewDataContainer : IViewDataContainer
        {
            public ViewDataDictionary ViewData
            {
                get;
                set;
            }
        }
    }
}
