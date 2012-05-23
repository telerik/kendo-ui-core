namespace Kendo.Mvc.UI
{
    using System.Linq;
    using System.Web.Mvc;
    using Kendo.Mvc.Extensions;

    public class ComboBoxHtmlBuilder
    {
        public ComboBoxHtmlBuilder(ComboBox component)
        {
            this.Component = component;
        }

        public ComboBox Component
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            IHtmlNode input = new HtmlElement("input", TagRenderMode.SelfClosing);

            string value = Component.GetValue<string>(Component.Value);
            
            //if (Component.Items.Any())
            //{
            //    if (string.IsNullOrEmpty(value) && Component.SelectedIndex != -1)
            //    {
            //        DropDownItem selectedItem = Component.Items[Component.SelectedIndex];
            //        value = selectedItem.Value != null ? selectedItem.Value : selectedItem.Text;
            //    }
            //}

            //else if (Component.Name.HasValue() && Component.ViewContext.ViewData.ModelState.ContainsKey(Component.Name))
            //{
            //    value = Component.GetValue<string>(null);
            //}

            //if (Component.Name.HasValue()) {
            //    string name = Component.GetName(string.Empty);

            //    input.Attributes(Component.GetUnobtrusiveValidationAttributes())
            //         .Attributes(new 
            //         { 
            //             id = Component.Id,
            //             name = name
            //         });
            //}

            input.Attributes(Component.GetUnobtrusiveValidationAttributes())
                 .Attributes(new
                 {
                     id = Component.Id,
                     name = Component.Name
                 });

            input.ToggleAttribute("value", value, value.HasValue())
                 .ToggleAttribute("disabled", "disabled", !Component.Enabled)
                 .Attributes(Component.HtmlAttributes);
            
            //get rendering from NumericTextBox... it is nicer

            return input;
        }
    }
}