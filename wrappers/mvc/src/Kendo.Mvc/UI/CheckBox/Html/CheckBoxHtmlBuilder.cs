namespace Kendo.Mvc.UI
{
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;

    public class CheckBoxHtmlBuilder
    {
        public CheckBoxHtmlBuilder(CheckBox checkBox)
        {
            Component = checkBox;
        }

        public CheckBox Component
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            var fragment = new HtmlFragment();

            Checkbox().AppendTo(fragment);
            Label().AppendTo(fragment);
            HiddenInput().AppendTo(fragment);

            return fragment;
        }

        public IHtmlNode Checkbox()
        {
            string value = "";
            ModelState state;

            if (Component.ViewData.ModelState.TryGetValue(Component.Name, out state) && state.Value != null)
            {
                Component.Value = false;
                value = state.Value.ConvertTo(typeof(string), null) as string;
            }
            else
            {
                value = Component.GetValue(Component.Name, Component.Value);
            }

            return new HtmlElement("input", TagRenderMode.SelfClosing)
                        .Attributes(new {
                            name = Component.Name,
                            id = Component.Id,
                            type = "checkbox",
                            value = "true",
                            @class = "k-checkbox"
                        })
                        .ToggleAttribute("checked", "checked", Component.Checked)
                        .Attributes(Component.GetUnobtrusiveValidationAttributes())
                        .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                        .Attributes(Component.HtmlAttributes)
                        .ToggleClass("input-validation-error", !Component.IsValid());
        }

        public IHtmlNode Label()
        {
            return new HtmlElement("label")
                        .Attributes(new
                        {
                            @for = Component.Id,
                            @class = "k-checkbox-label"
                        })
                        .Text(Component.Label);
            
        }

        public IHtmlNode HiddenInput()
        {
            return new HtmlElement("input", TagRenderMode.SelfClosing)
                .Attributes(new
                {
                    name = Component.Name,
                    value = "false",
                    type = "hidden"
                });
        }
    }
}