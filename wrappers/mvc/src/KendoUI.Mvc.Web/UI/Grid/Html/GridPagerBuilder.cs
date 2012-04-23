// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    public class GridPagerBuilder : IGridPagerBuilder
    {
        private readonly IGridPagerSectionsBuilder pagerSections;
        private readonly IGridPagerRefreshBuilder refreshBuilder;
        private readonly IGridPagerStatusBuilder statusBuilder;

        public GridPagerBuilder(IGridPagerSectionsBuilder pagerSections, 
            IGridPagerRefreshBuilder refreshBuilder, IGridPagerStatusBuilder statusBuilder)
        {
            this.pagerSections = pagerSections;
            this.refreshBuilder = refreshBuilder;
            this.statusBuilder = statusBuilder;
        }

        public virtual IHtmlNode Create(GridPagerData section)
        {
            var fragment = new HtmlFragment();

            
            pagerSections.CreateSections(section).AppendTo(fragment);

            statusBuilder.Create(section).AppendTo(fragment);

            return fragment;
        }
        
        public IHtmlNode CreateRefreshButton(GridPagerData pagerData)
        {
            return refreshBuilder.Create(pagerData.UrlBuilder.SelectUrl(), pagerData.RefreshText);
        }
    }
}