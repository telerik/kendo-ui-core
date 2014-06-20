namespace Kendo.Mvc.UI
{
    public class PivotGridHtmlBuilder
    {
        public PivotGridHtmlBuilder(PivotGrid pivotGrid)
        {
            PivotGrid = pivotGrid;
        }

        public PivotGrid PivotGrid
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
