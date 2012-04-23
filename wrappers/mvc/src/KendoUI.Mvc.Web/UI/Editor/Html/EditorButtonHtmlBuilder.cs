// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using Telerik.Web.Mvc.Infrastructure;
    
    public class EditorButtonHtmlBuilder : HtmlBuilderBase
    {
        private readonly EditorButton button;

        public EditorButtonHtmlBuilder(EditorButton button)
        {
            this.button = button;
        }

        protected override IHtmlNode BuildCore()
        {
            var li = new HtmlElement("li")
                    .AddClass(UIPrimitives.Editor.ToolbarButton);

            var a = new HtmlElement("a")
                    .Attribute("href", "#")
                    .AddClass(UIPrimitives.Editor.ToolIcon)
                    .AddClass(button.CssClass)
                    .Text(button.Text);

            a.AppendTo(li);
            
            return li;
        }
    }
}
