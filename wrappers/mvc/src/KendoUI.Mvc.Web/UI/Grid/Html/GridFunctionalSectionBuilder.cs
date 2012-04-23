// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.UI;
    using System.Linq;

    public class GridFunctionalSectionBuilder : IGridFunctionalSectionBuilder
    {
        private readonly IGridPagerBuilder pagerBuilder;

        private readonly IGridGroupHeaderBuilder groupHeaderBuilder;

        private readonly IGridToolBarBuilder toolBarBuilder;

        public GridFunctionalSectionBuilder(IGridPagerBuilder pagerBuilder, 
            IGridGroupHeaderBuilder groupHeaderBuilder, 
            IGridToolBarBuilder toolBarBuilder)
        {
            this.toolBarBuilder = toolBarBuilder;
            this.groupHeaderBuilder = groupHeaderBuilder;
            this.pagerBuilder = pagerBuilder;
        }

        public IHtmlNode CreateToolBar(GridToolBarData toolBarData)
        {
            if (toolBarData.Template.HasValue())
            {
                return toolBarBuilder.CreateToolBar(toolBarData.Template);
            }

            return toolBarBuilder.CreateToolBar(toolBarData.Commands.SelectMany(command => command.CreateDisplayButtons(toolBarData.Localization, toolBarData.UrlBuilder, null)));
        }
        
        public IHtmlNode CreateGroupHeader(GridGroupingData groupingData)
        {
            return groupHeaderBuilder.CreateGroupHeader(groupingData);
        }
        
        public IHtmlNode CreatePager(GridPagerData pagerData)
        {
            return pagerBuilder.Create(pagerData);
        }
        
        public IHtmlNode CreateRefreshButton(GridPagerData pagerData)
        {
            return pagerBuilder.CreateRefreshButton(pagerData);
        }
    }
}
