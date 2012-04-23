

namespace KendoUI.Mvc.UI
{
    using System;
    using System.Globalization;
    using System.Web.Mvc;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;

    public class DateTimePickerHtmlBuilder : IDateTimePickerHtmlBuilder
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
            IHtmlNode wrapper = new HtmlElement("div")
                                .Attributes(Component.HtmlAttributes)
                                .PrependClass(UIPrimitives.Widget, "t-datetimepicker");

            IHtmlNode innerWrapper = new HtmlElement("div")
                                    .AddClass("t-picker-wrap")
                                    .AppendTo(wrapper);

            InputTag().AppendTo(innerWrapper);

            IHtmlNode buttonsWrapper = new HtmlElement("span").AddClass("t-select");

            CalendarButtonTag().AppendTo(buttonsWrapper);

            TimeButtonTag().AppendTo(buttonsWrapper);

            buttonsWrapper.AppendTo(innerWrapper);

            return wrapper;
        }

        public IHtmlNode InputTag()
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
                   .Attributes(new { id = Component.Id, name = Component.Name, type = "text" })
                   .Attributes(Component.InputHtmlAttributes)
                   .Attributes(Component.GetUnobtrusiveValidationAttributes())
                   .ToggleClass("input-validation-error", !Component.IsValid())
                   .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                   .ToggleAttribute("value", value, value.HasValue())
                   .PrependClass(UIPrimitives.Input);
        }

        public IHtmlNode CalendarButtonTag()
        {
            return new HtmlElement("span")
                   .AddClass(UIPrimitives.Icon, "t-icon-calendar")
                   .Attribute("title", Component.CalendarButtonTitle)
                   .Html(Component.CalendarButtonTitle);
        }

        public IHtmlNode TimeButtonTag()
        {
            return new HtmlElement("span")
                   .AddClass(UIPrimitives.Icon, "t-icon-clock")
                   .Attribute("title", Component.TimeButtonTitle)
                   .Html(Component.TimeButtonTitle);
        }
    }
}