

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;

    public interface IEditorListTool : IEditorTool
    {
        IList<DropDownItem> Items { get; }
        string Identifier { get; }
    }
}
