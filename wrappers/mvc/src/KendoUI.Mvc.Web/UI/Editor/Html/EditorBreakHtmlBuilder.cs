// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.Infrastructure;
    
    public class EditorBreakHtmlBuilder : HtmlBuilderBase
    {
        private readonly EditorBreak breakSeparator;

        public EditorBreakHtmlBuilder(EditorBreak breakSeparator)
        {
            this.breakSeparator = breakSeparator;
        }

        protected override IHtmlNode BuildCore()
        {
            return new HtmlElement("li")
                    .AddClass("t-break");
        }
    }
}
