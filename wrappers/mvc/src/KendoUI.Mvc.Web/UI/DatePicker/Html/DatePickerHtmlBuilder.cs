// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using System.Globalization;
    using System.Web.Mvc;
    using Telerik.Web.Mvc.Extensions;
    using Telerik.Web.Mvc.UI;

    public class DatePickerHtmlBuilder : IDatePickerHtmlBuilder
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
            IHtmlNode wrapper = new HtmlElement("div")
                                .Attributes(Component.HtmlAttributes)
                                .PrependClass(UIPrimitives.Widget, "t-datepicker")
                                .ToggleClass("t-state-disabled", !Component.Enabled);

            IHtmlNode innerWrapper = new HtmlElement("div")
                                    .AddClass("t-picker-wrap")
                                    .AppendTo(wrapper);

            InputTag().AppendTo(innerWrapper);

            if (Component.ShowButton)
                ButtonTag().AppendTo(innerWrapper);

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
                date = date != DateTime.MinValue ? date : null;

                if (date != null)
                {
                    if (string.IsNullOrEmpty(Component.Format))
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
                   .Attributes(new { name = Component.Name, id = Component.Id, type = "text" })
                   .ToggleAttribute("value", value, value.HasValue())
                   .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                   .Attributes(Component.InputHtmlAttributes)
                   .Attributes(Component.GetUnobtrusiveValidationAttributes())
                   .ToggleClass("input-validation-error", !Component.IsValid())
                   .PrependClass(UIPrimitives.Input);
        }

        public IHtmlNode ButtonTag()
        {
            IHtmlNode wrapper = new HtmlElement("span")
                                .AddClass("t-select");

            new HtmlElement("span")
                .AddClass(UIPrimitives.Icon, "t-icon-calendar")
                .Attribute("title", Component.ButtonTitle)
                .Html(Component.ButtonTitle)
                .AppendTo(wrapper);

            return wrapper;
        }
    }
}
