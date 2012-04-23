// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace KendoUI.Mvc.UI.Html
{
    using System.Collections.Generic;
    using System.Linq;
    using KendoUI.Mvc.UI;

    public class GridDataSectionBuilder : IGridDataSectionBuilder
    {
        private readonly IGridRowBuilderFactory rowBuilderFactory;
        private readonly IGridItemCreatorFactory itemCreatorFactory;

        public GridDataSectionBuilder(IGridRowBuilderFactory rowBuilderFactory, IGridItemCreatorFactory itemCreatorFactory)
        {
            this.itemCreatorFactory = itemCreatorFactory;
            this.rowBuilderFactory = rowBuilderFactory;
        }

        public IHtmlNode CreateBody(GridRenderingData renderingData)
        {
            var enumerator = new GridDataSourceEnumerator(renderingData.DataSource, itemCreatorFactory.Create(renderingData.DataKeyStore, renderingData), renderingData.InsertRowPosition);

            var rowBuilders = enumerator.Select(item => rowBuilderFactory.CreateBuilder(renderingData, item));

            return CreateBody(rowBuilders);
        }

        protected virtual IHtmlNode CreateBody(IEnumerable<IGridRowBuilder> rowBuilders)
        {
            var tbody = new HtmlElement("tbody");

            foreach (var builder in rowBuilders)
            {
                var tr = builder.CreateRow();

                tr.AppendTo(tbody);
            }

            return tbody;
        }
        
        public IHtmlNode CreateHeader(GridRenderingData data)
        {
            var builder = rowBuilderFactory.CreateHeaderBuilder(data);

            return builder.CreateRow();
        }

        public IHtmlNode CreateFooter(GridRenderingData data)
        {
            var builder = rowBuilderFactory.CreateFooterBuilder(data);
            var tr = builder.CreateRow(); 

            tr.AddClass(UIPrimitives.Grid.FooterTemplateRow);
            return tr;
        }
    }
}