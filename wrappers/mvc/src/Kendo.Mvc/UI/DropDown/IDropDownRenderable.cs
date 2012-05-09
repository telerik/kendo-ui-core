namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    public interface IDropDownRenderable : IViewComponent, IHtmlAttributesContainer
    {
        IList<DropDownItem> Items { get; }

        IDictionary<string, object> HiddenInputHtmlAttributes { get; }

        int SelectedIndex { get; set; }

        string Value { get; set; }

        bool Enabled { get; }

        bool Encoded { get; set; }
    }
}