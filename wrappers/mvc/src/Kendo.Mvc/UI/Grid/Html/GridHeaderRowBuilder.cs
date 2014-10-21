namespace Kendo.Mvc.UI.Html
{
    using System.Collections.Generic;

    public class GridHeaderRowBuilder : IGridRowBuilder
    {
        protected readonly IEnumerable<IGridRowBuilder> rowBuilders;

        public GridHeaderRowBuilder(IEnumerable<IGridRowBuilder> rowBuilders)
        {
            this.rowBuilders = rowBuilders;
        }

        public IHtmlNode CreateRow()
        {
            var container = new HtmlFragment();
            foreach (var builder in rowBuilders)
            {
                builder.CreateRow().AppendTo(container);
            }

            return container;
        }
    }
}
