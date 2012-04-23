// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

using Telerik.Web.Mvc.Infrastructure;

namespace Telerik.Web.Mvc.UI.Html
{
    public class EditorCustomToolHtmlBuilder : HtmlBuilderBase
    {
        private readonly EditorCustomTool tool;

        public EditorCustomToolHtmlBuilder(EditorCustomTool tool)
        {
            this.tool = tool;
        }
        
        protected override IHtmlNode BuildCore()
        {
            var li = new HtmlElement("li");

            if (tool.Template.HasValue())
            {
                li.AddClass(UIPrimitives.Editor.Custom);

                tool.Template.Apply(li);
            }
            else
            {
                li.AddClass(UIPrimitives.Editor.ToolbarButton);
                var a = new HtmlElement("a")
                        .Attributes(tool.HtmlAttributes)
                        .Attribute("href", "#")
                        .AddClass(UIPrimitives.Editor.ToolIcon);

                a.AppendTo(li);
            }

            return li;
        }
    }
}
