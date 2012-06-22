using System;
using System.Linq;
using System.Collections.Generic;

namespace Kendo.Mvc.UI
{
    public class EditorListTool : IEditorTool
    {
        public string Name { get; set; }

        public IList<DropDownListItem> Items { get; private set; }

        public EditorListTool(string name) : this (name, new List<DropDownListItem>())
        {
        }

        public EditorListTool(string name, IList<DropDownListItem> items)
        {
            Name = name;
            Items = items;
        }
    }
}