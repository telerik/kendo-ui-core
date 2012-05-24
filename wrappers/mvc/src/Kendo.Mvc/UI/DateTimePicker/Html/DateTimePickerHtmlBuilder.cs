namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.Extensions;
    
    using System;
    using System.Globalization;
    using System.Web.Mvc;

    public class DateTimePickerHtmlBuilder
    {
        public DateTimePickerHtmlBuilder(DateTimePicker component)
        {
            Component = component;
        }

        public DateTimePicker Component
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
                        value = date.Value.ToString(CultureInfo.CurrentCulture.DateTimeFormat);
                    }
                    else
                    {
                        value = date.Value.ToString(Component.Format);
                    }
                }
            }

            return new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(new { name = Component.Name, id = Component.Id, type = "datetime" })
                   .Attributes(Component.HtmlAttributes)
                   .ToggleAttribute("value", value, value.HasValue())
                   .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                   .Attributes(Component.GetUnobtrusiveValidationAttributes())
                   .ToggleClass("input-validation-error", !Component.IsValid())
                   .PrependClass(UIPrimitives.Input);
        }
    }
}