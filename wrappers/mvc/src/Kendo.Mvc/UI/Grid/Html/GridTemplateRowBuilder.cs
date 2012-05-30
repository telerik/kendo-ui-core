using System;

namespace Kendo.Mvc.UI.Html
{
    public class GridTemplateRowBuilder : IGridRowBuilder
    {
        private readonly Action<IHtmlNode> template;

        private readonly int colspan;

        public GridTemplateRowBuilder(Action<IHtmlNode> template, int colspan)
        {
            this.colspan = colspan;
            this.template = template;
        }

        public IHtmlNode CreateRow()
        {
            var tr = new HtmlElement("tr");
            var td = new HtmlElement("td");

            td.Attribute("colspan", colspan.ToString());

            template(td);

            td.AppendTo(tr);

            return tr;
        }
    }
}
