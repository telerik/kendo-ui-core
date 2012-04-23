// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.Infrastructure;

    public class GridFormButtonBuilder : GridButtonBuilder
    {
        public override IHtmlNode Create(object dataItem)
        {
            var form = new HtmlElement("form")
                        .AddClass(UIPrimitives.Grid.ActionForm)
                        .Attribute("method", "post")
                        .Attribute("action", Url(dataItem));

            var div = new HtmlElement("div");
            
            div.AppendTo(form);
            
            var button = base.Create(dataItem);
            
            button.AppendTo(div);

            return form;
        }
    }
}