namespace Kendo.Mvc.UI
{
    public class PivotGridHtmlBuilder<TModel>
        where TModel : class
    {
        public PivotGridHtmlBuilder(PivotGrid<TModel> pivotGrid)
        {
            PivotGrid = pivotGrid;
        }

        public PivotGrid<TModel> PivotGrid
        {
            get;
            private set;
        }

        public IHtmlNode Build()
        {
            return new HtmlElement("div")
                            .Attribute("id", PivotGrid.Id)
                            .Attributes(PivotGrid.HtmlAttributes)
                            .PrependClass(UIPrimitives.Widget, "k-grid");
        }
    }
}
