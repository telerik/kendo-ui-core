namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Globalization;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;

    public class TimePickerHtmlBuilder
    {
        public TimePickerHtmlBuilder(TimePicker component)
        {
            Component = component;
        }

        public TimePicker Component
        {
            get;
            private set;
        }      

        public IHtmlNode Build()
        {
            Func<object, DateTime?> converter = val =>
            {
                DateTime parsedDate;
                if (DateTime.TryParse(val.ToString(), CultureInfo.CurrentCulture.DateTimeFormat, System.Globalization.DateTimeStyles.None, out parsedDate))
                {
                    return parsedDate.AsNullable();
                }
                return null;
            };
            
            string value = Component.GetAttemptedValue();
            if (value == null)
            {
                DateTime? date = Component.GetValue(converter);
                if (date != null)
                {
                    if (string.IsNullOrEmpty(Component.Format))
                    {
                        value = date.Value.ToShortTimeString();
                    }
                    else
                    {
                        value = date.Value.ToString(Component.Format);
                    }
                }
            }

            return new HtmlElement("input", TagRenderMode.SelfClosing)
                .Attributes(new { id = Component.Id, name = Component.Name, type = "time" })
                .Attributes(Component.HtmlAttributes)
                .Attributes(Component.GetUnobtrusiveValidationAttributes())
                .ToggleClass("input-validation-error", !Component.IsValid())
                .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                .ToggleAttribute("value", value, value.HasValue())
                .PrependClass(UIPrimitives.Input);
        }
    }
}