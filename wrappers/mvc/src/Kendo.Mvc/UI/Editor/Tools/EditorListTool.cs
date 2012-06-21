using System;
using System.Linq;
using System.Collections.Generic;

namespace Kendo.Mvc.UI
{
    public class EditorListTool : IEditorTool
    {
        public string Name { get; set; }
        public IList<DropDownListItem> Items { get; set; }

        public EditorListTool(string name)
        {
            Name = name;
        }

        public EditorListTool(string name, IList<DropDownListItem> items)
        {
            Name = name;
            Items = items;
        }
    }
}