

namespace KendoUI.Mvc.UI.Html
{
    using Infrastructure;
    
    public class EditorSelectBoxHtmlBuilder : HtmlBuilderBase
    {
        private readonly EditorSelectBox selectBox;

        public EditorSelectBoxHtmlBuilder(EditorSelectBox selectBox)
        {
            this.selectBox = selectBox;
        }

        public new IHtmlNode Build()
        {
            return new HtmlElement("div")
                    .Attributes(selectBox.HtmlAttributes)
                    .PrependClass("t-selectbox", UIPrimitives.Header);
        }

        protected override IHtmlNode BuildCore()
        {
            var li = new HtmlElement("li")
                    .AddClass("t-editor-selectbox");


            IHtmlNode rootTag = Build();

            this.InnerContentTag().AppendTo(rootTag);

            rootTag.AppendTo(li);

            return li;
        }

        private IHtmlNode InnerContentTag() 
        {
            IHtmlNode root = new HtmlElement("div").AddClass("t-dropdown-wrap", UIPrimitives.DefaultState);

            var items = selectBox.Items;
            string text = items.Count > 0 && !(string.IsNullOrEmpty(items[0].Text) || items[0].Text.Trim().Length == 0) ? items[0].Text : "&nbsp;";

            new HtmlElement("span")
                .AddClass("t-input")
                .Html(text)
                .AppendTo(root);

            IHtmlNode link = new HtmlElement("span").AddClass("t-select");

            new HtmlElement("span")
                .AddClass(UIPrimitives.Icon, "t-arrow-down")
                .Html("select")
                .AppendTo(link);

            link.AppendTo(root);

            return root;
        }
    }
}
