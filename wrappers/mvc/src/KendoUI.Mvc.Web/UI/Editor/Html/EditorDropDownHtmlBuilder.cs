// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.Infrastructure;
    
    public class EditorDropDownHtmlBuilder : HtmlBuilderBase
    {
        private readonly EditorDropDown dropDown;

        public EditorDropDownHtmlBuilder(EditorDropDown dropDown)
        {
            this.dropDown = dropDown;
        }

        protected override IHtmlNode BuildCore()
        {
            var li = new HtmlElement("li")
                    .AddClass("t-editor-dropdown");

            var builder = new DropDownListHtmlBuilder(dropDown);

            IHtmlNode rootTag = builder.Build();

            rootTag.AppendTo(li);
            
            return li;
        }
    }
}