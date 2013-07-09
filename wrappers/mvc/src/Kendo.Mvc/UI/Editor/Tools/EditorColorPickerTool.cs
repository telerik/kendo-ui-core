using System;
using System.Linq;
using System.Collections.Generic;

namespace Kendo.Mvc.UI
{
    public class EditorColorPickerTool : IEditorTool
    {
        public string Name { get; set; }

        public ColorPickerPalette Palette { get; set; }

        public IEnumerable<string> PaletteColors { get; set; }

        public EditorColorPickerTool(string name)
        {
            Name = name;
            Palette = ColorPickerPalette.WebSafe;
        }
    }
}