namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Globalization;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;

    public class DatePickerHtmlBuilder
    {
        public DatePickerHtmlBuilder(DatePicker datePicker)
        {
            Component = datePicker;
        }

        public DatePicker Component
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
                date = date != DateTime.MinValue ? date : null;

                if (date != null)
                {
                    if (string.IsNullOrWhiteSpace(Component.Format))
                    {
                        value = date.Value.ToShortDateString();
                    }
                    else
                    {
                        value = date.Value.ToString(Component.Format);
                    }
                }
            }

            return new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(new { name = Component.Name, id = Component.Id, type = "date" })
                   .ToggleAttribute("value", value, value.HasValue())
                   .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                   .Attributes(Component.GetUnobtrusiveValidationAttributes())
                   .ToggleClass("input-validation-error", !Component.IsValid())
                   .PrependClass(UIPrimitives.Input);
        }
    }
}
