namespace Kendo.Mvc.UI
{
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;
    using Kendo.Mvc.Infrastructure;
    using System.Web;

    public class DropDownListHtmlBuilder
    {
        public DropDownListHtmlBuilder(DropDownList component)
        {
            this.Component = component;
        }

        public DropDownList Component
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            IHtmlNode input = new HtmlElement("input", TagRenderMode.SelfClosing)
                    .Attributes(new
                    {
                        type = "text"
                    });

            //if (Component.Items.Any())
            //{
            //    DropDownItem selectedItem = Component.Items[Component.SelectedIndex];
            //    input.Attribute("value", selectedItem.Value != null ? selectedItem.Value : selectedItem.Text);
            //}

            if (Component.Name.HasValue())
            {
                input.Attributes(Component.GetUnobtrusiveValidationAttributes())
                     .Attributes(new
                     {
                         name = Component.Name, //Component.GetName(string.Empty),
                         id = Component.Id
                     })
                     .Attributes(Component.HtmlAttributes);
            }

            return input;
        }
    }
}
