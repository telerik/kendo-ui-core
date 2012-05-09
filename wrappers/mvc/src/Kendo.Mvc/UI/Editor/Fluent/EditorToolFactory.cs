namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    
    public class EditorToolFactory : IHideObjectMembers
    {
        private readonly EditorToolGroup group;

        public EditorToolFactory(EditorToolGroup group)
        {
            this.group = group;
        }

        public EditorToolFactory Custom(Action<EditorCustomToolBuilder> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");
            var tool = new EditorCustomTool();
            configurator(new EditorCustomToolBuilder(tool));
            group.Tools.Add(tool);
            
            return this;
        }

        public EditorToolFactory Clear()
        {
            group.Tools.Clear();

            return this;
        }

        public EditorToolFactory Bold()
        {
            return Button("Bold");
        }

        public EditorToolFactory Italic()
        {
            return Button("Italic");
        }

        public EditorToolFactory Underline()
        {
            return Button("Underline");
        }

        public EditorToolFactory Strikethrough()
        {
            return Button("Strikethrough");
        }

        public EditorToolFactory Superscript()
        {
            return Button("Superscript");
        }

        public EditorToolFactory Subscript()
        {
            return Button("Subscript");
        }

        public EditorToolFactory Separator()
        {
            group.Tools.Add(new EditorSeparator());

            return this;
        }

        public EditorToolFactory Break()
        {
            group.Tools.Add(new EditorBreak());

            return this;
        }

        public EditorToolFactory JustifyLeft()
        {
            return Button("JustifyLeft");
        }

        public EditorToolFactory JustifyRight()
        {
            return Button("JustifyRight");
        }

        public EditorToolFactory JustifyCenter()
        {
            return Button("JustifyCenter");
        }

        public EditorToolFactory JustifyFull()
        {
            return Button("JustifyFull");
        }

        public EditorToolFactory InsertUnorderedList()
        {
            return Button("InsertUnorderedList");
        }

        public EditorToolFactory Indent()
        {
            return Button("Indent");
        }

        public EditorToolFactory Outdent()
        {
            return Button("Outdent");
        }

        public EditorToolFactory InsertOrderedList()
        {
            return Button("InsertOrderedList");
        }
        
        public EditorToolFactory InsertImage()
        {
            return Button("InsertImage");
        }

        public EditorToolFactory CreateLink()
        {
            return Button("CreateLink");
        }

        public EditorToolFactory Unlink()
        {
            return Button("Unlink");
        }

        public EditorToolFactory FontName()
        {
            return ComboBox("FontName", EditorDefaultOptions.FontName);
        }

        public EditorToolFactory FontName(Action<EditorDropDownItemBuilder> configurator)
        {
            var items = new List<DropDownItem>();
            var builder = new EditorDropDownItemBuilder(items);

            configurator(builder);

            return ComboBox("FontName", items);
        }

        public EditorToolFactory FontSize()
        {
            return ComboBox("FontSize", EditorDefaultOptions.FontSize);
        }

        public EditorToolFactory FontSize(Action<EditorDropDownItemBuilder> configurator)
        {
            var items = new List<DropDownItem>();
            
            var builder = new EditorDropDownItemBuilder(items);

            configurator(builder);

            return ComboBox("FontSize", items);
        }

        public EditorToolFactory FormatBlock()
        {
            return SelectBox("FormatBlock", EditorDefaultOptions.FormatBlock);
        }

        public EditorToolFactory FormatBlock(Action<EditorDropDownItemBuilder> configurator)
        {
            var items = new List<DropDownItem>();
            
            var builder = new EditorDropDownItemBuilder(items);

            configurator(builder);

            return DropDown("FormatBlock", items);
        }

        public EditorToolFactory Snippets(Action<EditorSnippetBuilder> configurator)
        {
            var items = new List<DropDownItem>();
            
            var builder = new EditorSnippetBuilder(items, DI.Current.Resolve<IVirtualPathProvider>());

            configurator(builder);

            return SelectBox("InsertHtml", items);
        }
        
        public EditorToolFactory Styles(Action<EditorDropDownItemBuilder> configurator)
        {
            var items = new List<DropDownItem>();

            var builder = new EditorDropDownItemBuilder(items);

            configurator(builder);

            return SelectBox("Style", items);
        }

        public EditorToolFactory FontColor()
        {
            return ColorPicker("ForeColor");
        }

        public EditorToolFactory BackColor()
        {
            return ColorPicker("BackColor");
        }

        private EditorToolFactory Button(string text)
        {
            group.Tools.Add(new EditorButton(text));

            return this;
        }

        private EditorToolFactory ComboBox(string identifier, IList<DropDownItem> items)
        {
            group.Tools.Add(new EditorComboBox(identifier, items, group.Editor.ViewContext));

            return this;
        }

        private EditorToolFactory DropDown(string identifier, IList<DropDownItem> items)
        {
            group.Tools.Add(new EditorDropDown(identifier, items));

            return this;
        }

        private EditorToolFactory SelectBox(string identifier, IList<DropDownItem> items)
        {
            group.Tools.Add(new EditorSelectBox(identifier, items));

            return this;
        }

        private EditorToolFactory ColorPicker(string identifier)
        {
            group.Tools.Add(new EditorColorPicker(identifier));

            return this;
        }
    }
}