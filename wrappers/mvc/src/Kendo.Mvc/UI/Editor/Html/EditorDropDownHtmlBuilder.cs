namespace Kendo.Mvc.UI.Html
{
    using Kendo.Mvc.Infrastructure;
    
    public class EditorDropDownHtmlBuilder : HtmlBuilderBase
    {
        private readonly EditorDropDown dropDown;

        public EditorDropDownHtmlBuilder(EditorDropDown dropDown)
        {
            this.dropDown = dropDown;
        }

        protected override IHtmlNode BuildCore()
        {
            var li = new HtmlElement("li")
                    .AddClass("t-editor-dropdown");

            //var builder = new DropDownListHtmlBuilder(dropDown);

            IHtmlNode rootTag = null; // builder.Build();

            rootTag.AppendTo(li);
            
            return li;
        }
    }
}