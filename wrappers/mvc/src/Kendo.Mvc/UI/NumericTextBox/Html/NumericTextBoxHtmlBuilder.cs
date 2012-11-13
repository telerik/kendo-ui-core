namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;
    using System;
    using System.Web.Mvc;
    using System.Globalization;

    public class NumericTextBoxHtmlBuilder<T> where T : struct 
    {
        public NumericTextBoxHtmlBuilder(NumericTextBox<T> component)
        {
            Component = component;
        }

        public NumericTextBox<T> Component
        { 
            get; 
            private set; 
        }

        public IHtmlNode Build()
        {
            Func<object, T?> converter = val => 
            {
                return ((T)Convert.ChangeType(val, typeof(T))).AsNullable();
            };
            
            string value = Component.GetAttemptedValue();
            if (value == null)
            {
                T? result = Component.GetValue(converter);
                if (result != null)
                {
                    CultureInfo info = CultureInfo.CurrentCulture;

                    if (Component.Culture.HasValue())
                    {
                        info = new CultureInfo(Component.Culture);
                    }

                    value = string.Format(info, "{0}", result);
                }
            }
            
            return new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(new { name = Component.Name, id = Component.Id, type = "number" })
                   .Attributes(Component.HtmlAttributes)
                   .Attributes(Component.GetUnobtrusiveValidationAttributes())
                   .ToggleAttribute("value", value, value.HasValue())
                   .ToggleAttribute("min", "{0}".FormatWith(Component.Min), Component.Min.HasValue)
                   .ToggleAttribute("max", "{0}".FormatWith(Component.Max), Component.Max.HasValue)
                   .ToggleAttribute("step", "{0}".FormatWith(Component.Step), Component.Step.HasValue)
                   .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                   .ToggleClass("input-validation-error", !Component.IsValid())
                   .PrependClass(UIPrimitives.Input);
        }
    }
}
