namespace Kendo.Mvc.UI.Html
{
    using System.Collections.Generic;
    
    public class GridRowBuilder : IGridRowBuilder
    {
        private readonly IEnumerable<IGridCellBuilder> cellBuilders;

        public GridRowBuilder(IEnumerable<IGridCellBuilder> cellBuilders)
        {
            this.cellBuilders = cellBuilders;
        }

        public virtual IHtmlNode CreateRow()
        {
            var tr = new HtmlElement("tr");
            
            foreach (var cellBuilder in cellBuilders)
	        {
                var th = cellBuilder.CreateCell();

                th.AppendTo(tr);
	        }
            
            return tr;
        }
    }
}
