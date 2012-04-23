// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.Infrastructure;
    
    public class GridFilterCellDecorator : IGridCellBuilderDecorator
    {
        private readonly bool filtered;
        private readonly string filterText;

        public GridFilterCellDecorator(bool filtered, string filterText)
        {
            this.filtered = filtered;
            this.filterText = filterText;
        }

        public void Decorate(IHtmlNode td)
        {
            var wrapper = new HtmlElement("div")
                .AddClass("t-grid-filter", "t-state-default")
                .ToggleClass("t-active-filter", filtered);

            wrapper.AppendTo(td);

            var icon = new HtmlElement("span").AddClass("t-icon", "t-filter").Text(filterText);
            
            icon.AppendTo(wrapper);
        }
    }
}
