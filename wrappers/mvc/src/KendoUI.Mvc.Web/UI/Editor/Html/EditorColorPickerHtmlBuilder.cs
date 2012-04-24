namespace KendoUI.Mvc.UI.Html
{
    using KendoUI.Mvc.Infrastructure;

    public class EditorColorPickerHtmlBuilder : HtmlBuilderBase
    {
        private EditorColorPicker colorPicker;

        public EditorColorPickerHtmlBuilder(EditorColorPicker colorPicker)
        {
            this.colorPicker = colorPicker;
        }

        public new IHtmlNode Build()
        {
            IHtmlNode root =
                new HtmlElement("div")
                    .Attributes(colorPicker.HtmlAttributes)
                    .PrependClass(UIPrimitives.Widget, "t-colorpicker", UIPrimitives.Header);

            IHtmlNode tool = new HtmlElement("span")
                .AddClass(UIPrimitives.Editor.ToolIcon)
                .AppendTo(root);

            new HtmlElement("span")
                .AddClass("t-selected-color")
                .AppendTo(tool);

            new HtmlElement("span")
                .AddClass(UIPrimitives.Icon, "t-arrow-down")
                .AppendTo(root);

            return root;
        }

        protected override IHtmlNode BuildCore()
        {
            var li = new HtmlElement("li")
                    .AddClass(UIPrimitives.Editor.ToolbarColorPicker);

            IHtmlNode rootTag = Build();

            rootTag.AppendTo(li);

            return li;
        }
    }
}
