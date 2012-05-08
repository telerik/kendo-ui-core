namespace KendoUI.Mvc.UI.Html
{
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.UI;
    using KendoUI.Mvc.UI.Html;
    using System;
    using System.Collections.Generic;
    using System.Web.Mvc;

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
                    value = "{0}".FormatWith(result);
                }
            }
            
            return new HtmlElement("input", TagRenderMode.SelfClosing)
                   .Attributes(new { name = Component.Name, id = Component.Id, type = "number" })
                   .ToggleAttribute("value", value, value.HasValue())
                   .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                   .Attributes(Component.InputHtmlAttributes)
                   .Attributes(GetUnobtrusiveValidationAttributes())
                   .ToggleClass("input-validation-error", !Component.IsValid());
                   //.PrependClass(UIPrimitives.Input);
        }

        public IDictionary<string, object> GetUnobtrusiveValidationAttributes()
        {
#if MVC3
            var viewContext = Component.ViewContext;
            if (viewContext.UnobtrusiveJavaScriptEnabled)
            {
                var name = Component.Name;
                var htmlPrefix = Component.ViewData.TemplateInfo.HtmlFieldPrefix;

                if (name.HasValue() && htmlPrefix.HasValue() && name != htmlPrefix && name.StartsWith(htmlPrefix, StringComparison.Ordinal))
                {
                    name = name.Substring(htmlPrefix.Length + 1);
                }

                var htmlHelper = new HtmlHelper(viewContext, new ViewComponentViewDataContainer { ViewData = Component.ViewData });

                return htmlHelper.GetUnobtrusiveValidationAttributes(name);
            }
#endif
            return null;
        }

        //public IHtmlNode UpButtonTag()
        //{
        //    string title = string.IsNullOrEmpty(Component.ButtonTitleUp) ? "Increase value" : Component.ButtonTitleUp;

        //    return new HtmlElement("a")
        //           .Attributes(new { href = "#", title = title, tabindex = "-1" })
        //           .AddClass(UIPrimitives.Link, UIPrimitives.Icon, "t-arrow-up")
        //           .Text("Increment");
        //}

        //public IHtmlNode DownButtonTag()
        //{
        //    string title = string.IsNullOrEmpty(Component.ButtonTitleDown) ? "Decrease value" : Component.ButtonTitleDown;

        //    return new HtmlElement("a")
        //           .Attributes(new { href = "#", title = title, tabindex = "-1" })
        //           .AddClass(UIPrimitives.Link, UIPrimitives.Icon, "t-arrow-down")
        //           .Text("Decrement");
        //}
    }
}
