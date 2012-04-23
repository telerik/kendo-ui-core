// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    /// <summary>
    /// 
    /// </summary>
    public class GridLinkButtonBuilder : GridButtonBuilderBase
    {
        protected override void ApplyButtonAttributes(IHtmlNode button, object dataItem)
        {
            button.Attribute("href", Url(dataItem));
        }

        protected override string ButtonTagName
        {
            get
            {
                return "a";
            }
        }
    }
}
