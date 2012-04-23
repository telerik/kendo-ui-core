namespace KendoUI.Mvc.UI
{
    using System.Linq;
    using System.Web.Mvc;
    using KendoUI.Mvc.Extensions;
    using KendoUI.Mvc.Infrastructure;
    using System.Web;

    public class DropDownListHtmlBuilder : IDropDownHtmlBuilder
    {
        public DropDownListHtmlBuilder(IDropDownRenderable component)
        {
            this.Component = component;
        }

        public IDropDownRenderable Component
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            IHtmlNode root = new HtmlElement("div")
                                .Attributes(Component.HtmlAttributes)
                                .PrependClass(UIPrimitives.Widget, "t-dropdown", UIPrimitives.Header)
                                .ToggleClass("t-state-disabled", !Component.Enabled)
                                .ToggleClass("input-validation-error", !Component.IsValid());

            this.InnerContentTag().AppendTo(root);
            
            this.HiddenInputTag().AppendTo(root);

            return root;
        }

        public IHtmlNode InnerContentTag()
        {
            IHtmlNode root = new HtmlElement("div").AddClass("t-dropdown-wrap", UIPrimitives.DefaultState);

            string text = "&nbsp;";
            var items = Component.Items;
            int selectedIndex = Component.SelectedIndex;

            if (items.Count > 0 && !(string.IsNullOrEmpty(items[selectedIndex].Text) || items[selectedIndex].Text.Trim().Length == 0)) 
            {
                text = items[selectedIndex].Text;
                
                if (Component.Encoded) {
                    text = HttpUtility.HtmlEncode(text);
                }
            }          

            new HtmlElement("span")
                .AddClass("t-input")
                .Html(text)
                .AppendTo(root);

            IHtmlNode link = new HtmlElement("span").AddClass("t-select");

            new HtmlElement("span")
                .AddClass(UIPrimitives.Icon, "t-arrow-down")
                .Html("select")
                .AppendTo(link);

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

            if (Component.Items.Any())
            {
                DropDownItem selectedItem = Component.Items[Component.SelectedIndex];
                input.Attribute("value", selectedItem.Value != null ? selectedItem.Value : selectedItem.Text);
            }

            if (Component.Name.HasValue())
            {
                input.Attributes(Component.GetUnobtrusiveValidationAttributes())
                     .Attributes(new
                     {
                         name = Component.GetName(string.Empty),
                         id = Component.Id
                     })
                     .Attributes(Component.HiddenInputHtmlAttributes);
            }

            return input;
        }
    }
}
