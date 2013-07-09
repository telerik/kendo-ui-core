namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Extensions;
    
    public class EditorCustomTemplateToolBuilder : IHideObjectMembers
    {
        private readonly EditorCustomTemplateTool tool;

        public EditorCustomTemplateToolBuilder(EditorCustomTemplateTool tool)
        {
            this.tool = tool;
        }

        public EditorCustomTemplateToolBuilder Template(string value)
        {
            tool.Template = value;
            return this;
        }
    }

    public class EditorCustomButtonToolBuilder : IHideObjectMembers
    {
        private readonly EditorCustomButtonTool tool;

        public EditorCustomButtonToolBuilder(EditorCustomButtonTool tool)
        {
            this.tool = tool;
        }

        public EditorCustomButtonToolBuilder Name(string value)
        {
            tool.Name = value;
            return this;
        }

        public EditorCustomButtonToolBuilder Exec(Func<object, object> handler)
        {
            tool.Exec.TemplateDelegate = handler;

            return this;
        }

        public EditorCustomButtonToolBuilder Exec(string handler)
        {
            tool.Exec.HandlerName = handler;

            return this;
        }

        public EditorCustomButtonToolBuilder ToolTip(string value)
        {
            tool.ToolTip = value;
            return this;
        }
    }

    public class EditorColorPickerToolBuilder : IHideObjectMembers
    {
        private readonly EditorColorPickerTool tool;

        public EditorColorPickerToolBuilder(EditorColorPickerTool tool)
        {
            this.tool = tool;
        }

        /// <summary>
        /// Sets the range of colors that the user can pick from.
        /// </summary>
        /// <param name="palette">A list of colors.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Palette(new List&lt;string&gt; { "#ff0000", "#00ff00", "#0000ff" })
        /// %&gt;
        /// </code>
        /// </example>
        public EditorColorPickerToolBuilder Palette(IEnumerable<string> palette)
        {
            tool.PaletteColors = palette;
            tool.Palette = ColorPickerPalette.None;

            return this;
        }

        /// <summary>
        /// Sets the range of colors that the user can pick from.
        /// </summary>
        /// <param name="palette">One of the preset palettes of colors</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().ColorPicker()
        ///             .Name("ColorPicker")
        ///             .Palette(ColorPickerPalette.WebSafe)
        /// %&gt;
        /// </code>
        /// </example>
        public EditorColorPickerToolBuilder Palette(ColorPickerPalette palette)
        {
            tool.PaletteColors = null;
            tool.Palette = palette;

            return this;
        }
    }

}