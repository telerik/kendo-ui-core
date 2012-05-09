namespace Kendo.Mvc.UI
{
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
using System.Collections.Generic;
    
    public class ComboBoxHtmlBuilder : IDropDownHtmlBuilder
    {
        public ComboBoxHtmlBuilder(IComboBoxRenderable component)
        {
            this.Component = component;
        }

        public IComboBoxRenderable Component
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            IHtmlNode root = new HtmlElement("div")
                            .Attributes(Component.HtmlAttributes)
                            .PrependClass(UIPrimitives.Widget, "t-combobox", UIPrimitives.Header)
                            .ToggleClass("t-state-disabled", !Component.Enabled);

            this.InnerContentTag().AppendTo(root);
            this.HiddenInputTag().AppendTo(root);

            return root;
        }

        public IHtmlNode InnerContentTag()
        {
            IHtmlNode root = new HtmlElement("div").AddClass("t-dropdown-wrap t-state-default");

            IHtmlNode input = new HtmlElement("input", TagRenderMode.SelfClosing)
                              .Attributes(new { type = "text"})
                              .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                              .ToggleClass("input-validation-error", !Component.IsValid())
                              .PrependClass(UIPrimitives.Input)
                              .AppendTo(root);

            string name = string.Empty;
            if (Component.Name.HasValue())
            {
                name = Component.GetName("-input");
            }

            string text = Component.GetValue<string>(Component.Value);
            if (!Component.Items.Any())
            {
                text = Component.GetValue<string>(name, null);
                if (string.IsNullOrEmpty(text))
                {
                    try
                    {
                        text = Component.ViewContext.Controller.ValueOf<string>(name);
                    }
                    catch (System.Web.HttpRequestValidationException)
                    {
                        text = string.Empty;
                    }
                }
            }
            else if (Component.SelectedIndex != -1)
            {                
                text = Component.Items[Component.SelectedIndex].Text;
                if (Component.Encoded)
                {
                    text = System.Web.HttpUtility.HtmlDecode(text);
                }
            }

            input.Attribute("id", Component.Id + "-input")
                 .ToggleAttribute("name", name, name.HasValue())
                 .ToggleAttribute("value", text, text.HasValue())
                 .Attributes(Component.InputHtmlAttributes);

            IHtmlNode link = new HtmlElement("span").AddClass("t-select", UIPrimitives.Header);

            new HtmlElement("span").AddClass(UIPrimitives.Icon, "t-arrow-down").Html("select").AppendTo(link);

            link.AppendTo(root);

            return root;
        }

        public IHtmlNode HiddenInputTag()
        {
            IHtmlNode input = new HtmlElement("input", TagRenderMode.SelfClosing)
                              .Attributes(new 
                              { 
                                  type = "text", 
                                  style = "display:none" 
                              });

            string value = Component.GetValue<string>(Component.Value);
            if (Component.Items.Any())
            {
                if (string.IsNullOrEmpty(value) && Component.SelectedIndex != -1)
                {
                    DropDownItem selectedItem = Component.Items[Component.SelectedIndex];
                    value = selectedItem.Value != null ? selectedItem.Value : selectedItem.Text;
                }
            }
            else if (Component.Name.HasValue() && Component.ViewContext.ViewData.ModelState.ContainsKey(Component.Name))
            {
                value = Component.GetValue<string>(null);
            }

            if (Component.Name.HasValue()) {
                string name = Component.GetName(string.Empty);

                input.Attributes(Component.GetUnobtrusiveValidationAttributes())
                     .Attributes(new 
                     { 
                         id = Component.Id,
                         name = name
                     });
            }

            input.ToggleAttribute("value", value, value.HasValue())
                 .Attributes(Component.HiddenInputHtmlAttributes);
            
            return input;
        }
    }
}