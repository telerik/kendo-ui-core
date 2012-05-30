namespace Kendo.Mvc.UI.Html
{
    public class GridTemplateCellBuilder<T> : GridDataCellBuilderBase
        where T : class
    {
        private readonly HtmlTemplate<T> template;

        public GridTemplateCellBuilder(HtmlTemplate<T> template)
        {
            this.template = template;
        }

        protected override void AppendCellContent(IHtmlNode td, object dataItem)
        {
            template.Apply((T)dataItem, td);
        }
    }
}