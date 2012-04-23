// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{

    using Infrastructure;

    public class PanelBarHtmlBuilderFactory : INavigationComponentHtmlBuilderFactory<PanelBar, PanelBarItem>
    {
        private readonly IActionMethodCache actionMethodCache;

        public PanelBarHtmlBuilderFactory(IActionMethodCache actionMethodCache)
        {
            Guard.IsNotNull(actionMethodCache, "actionMethodCache");

            this.actionMethodCache = actionMethodCache;
        }

        public INavigationComponentHtmlBuilder<PanelBarItem> Create(PanelBar panelBar)
        {
            return new PanelBarHtmlBuilder(panelBar, actionMethodCache);
        }
    }
}