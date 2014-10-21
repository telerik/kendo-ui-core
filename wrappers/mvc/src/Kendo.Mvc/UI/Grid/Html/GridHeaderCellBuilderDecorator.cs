namespace Kendo.Mvc.UI.Html
{
    public class GridHeaderCellBuilderDecorator : IGridCellBuilderDecorator
    {
        private int rowSpan;
        private int dataIndex;

        public GridHeaderCellBuilderDecorator(int rowSpan, int dataIndex)
        {
            this.rowSpan = rowSpan;
            this.dataIndex = dataIndex;
        }

        public void Decorate(IHtmlNode td)
        {
            if (rowSpan > 1)
            {
                td.Attribute("rowSpan", rowSpan.ToString());
            }
            if (dataIndex > -1)
            {
                td.Attribute("data-index", dataIndex.ToString(), true);
            }
        }
    }
}
