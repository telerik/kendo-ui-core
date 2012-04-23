// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.Infrastructure;
    
    public class GridScrollingHtmlBuilder : GridHtmlBuilder
    {
        public GridScrollingHtmlBuilder(IGridFunctionalSectionBuilder functionalSectionBuilder, IGridDataSectionBuilder dataSectionBuilder, 
            IGridTableBulderFactory tableBuilderFactory) : base (functionalSectionBuilder, dataSectionBuilder, tableBuilderFactory)
        {
        }

        protected override void AppendData(IHtmlNode div, GridRenderingData renderingData)
        {
            AppendHeader(div,renderingData);

            var content = CreateContent(renderingData);

            content.AppendTo(div);

            AppendFooter(div, renderingData);
        }

        protected override IHtmlNode CreateFooter(GridRenderingData renderingData)
        {
            var div = new HtmlElement("div").AddClass("t-grid-footer");
            
            var wrapper = new HtmlElement("div").AddClass("t-grid-footer-wrap");
            wrapper.AppendTo(div);

            var table = CreateTable(renderingData);
            table.AppendTo(wrapper);

            var tfoot = DataSectionBuilder.CreateFooter(renderingData);
            tfoot.AppendTo(table);

            return div;
        }

        protected override IHtmlNode CreateHeader(GridRenderingData renderingData)
        {
            var header = new HtmlElement("div").AddClass("t-grid-header");

            var headerWrapper = new HtmlElement("div").AddClass("t-grid-header-wrap");

            headerWrapper.AppendTo(header);

            var table = CreateTable(renderingData);

            table.AppendTo(headerWrapper);

            var thead = DataSectionBuilder.CreateHeader(renderingData);

            thead.AppendTo(table);

            return header;
        }

        protected virtual IHtmlNode CreateContent(GridRenderingData renderingData)
        {
            var content = new HtmlElement("div").AddClass(UIPrimitives.Grid.ScrollableContent)
                                            .Css("height", renderingData.ScrollingHeight);

            var table = CreateContentTable(renderingData);

            table.AppendTo(content);
            
            return content;
        }

        protected virtual IHtmlNode CreateContentTable(GridRenderingData renderingData)
        {
            var table = CreateTable(renderingData);
            
            var tbody = CreateBody(renderingData);

            tbody.AppendTo(table);

            return table;
        }
    }
}
