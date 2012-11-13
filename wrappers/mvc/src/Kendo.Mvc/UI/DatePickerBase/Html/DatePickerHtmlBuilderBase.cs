namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Globalization;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.UI;

    public class DatePickerHtmlBuilderBase
    {
        public DatePickerHtmlBuilderBase(IPicker picker, string inputType)
        {
            Component = picker;

            InputType = inputType ?? "date";
        }

        public IPicker Component
        {
            get;
            private set;
        }

        public string InputType 
        { 
            get; 
            private set; 
        }
        
        public IHtmlNode Build()
        {
            Func<object, DateTime?> converter = val => 
            {
                DateTime parsedDate;            

                if (DateTime.TryParse(val.ToString(), Component.CultureInfo.DateTimeFormat, System.Globalization.DateTimeStyles.None, out parsedDate))
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
                    value = date.Value.ToString(Component.Format, Component.CultureInfo);
                }
            }

            return new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(new { name = Component.Name, id = Component.Id, type = InputType })
                   .Attributes(Component.HtmlAttributes)
                   .Attributes(Component.GetUnobtrusiveValidationAttributes())
                   .ToggleAttribute("value", value, value.HasValue())
                   .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                   .ToggleClass("input-validation-error", !Component.IsValid())
                   .PrependClass(UIPrimitives.Input);
        }
    }
}
