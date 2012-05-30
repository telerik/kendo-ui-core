namespace Kendo.Mvc.UI.Html
{
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;

    public class GridInLineEditRowBuilder : IGridRowBuilder
    {
        private readonly IEnumerable<IGridDataCellBuilder> cellBuilders;
        private readonly object dataItem;
        private readonly IGridTableBuilder tableBuilder;
        private readonly IGridFormBuilder formBuilder;

        private readonly int colspan;

        public GridInLineEditRowBuilder(IGridTableBuilder tableBuilder, IGridFormBuilder formBuilder, 
            int colspan, object dataItem, IEnumerable<IGridDataCellBuilder> cellBuilders)
        {
            this.colspan = colspan;
            this.formBuilder = formBuilder;
            this.tableBuilder = tableBuilder;
            this.dataItem = dataItem;
            this.cellBuilders = cellBuilders;
        }

        public IHtmlNode CreateRow()
        {
            var tr = new HtmlElement("tr");

            var td = new HtmlElement("td")
                            .Attribute("colspan", colspan.ToString())
                            .AddClass(UIPrimitives.Grid.EditingContainer);
            
            td.AppendTo(tr);

            var form = formBuilder.CreateForm();

            form.AppendTo(td);
            
            AppendEditor(form);

            return tr;
        }

        private void AppendEditor(IHtmlNode container)
        {
            var table = tableBuilder.CreateTable();
            
            table.AppendTo(container);

            var tr = new HtmlElement("tr");
            tr.AppendTo(table);

            foreach (var cellBuilder in cellBuilders)
            {
                var td = cellBuilder.CreateCell(dataItem);
                td.AppendTo(tr);
            }
        }

    }
}