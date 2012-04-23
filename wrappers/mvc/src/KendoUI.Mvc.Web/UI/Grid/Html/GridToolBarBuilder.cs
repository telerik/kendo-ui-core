// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    using Telerik.Web.Mvc.Infrastructure;
    
    public class GridToolBarBuilder : IGridToolBarBuilder
    {
        public IHtmlNode CreateToolBar(IEnumerable<IGridButtonBuilder> buttonBuilders)
        {
            return CreateWrapper(toolBar => 
            {
                foreach (var buttonBuilder in buttonBuilders)
                {
                    var button = buttonBuilder.Create(null);
                    button.AppendTo(toolBar);
                }
            });
        }

        public IHtmlNode CreateToolBar(HtmlTemplate template)
        {
            return CreateWrapper(template.Apply);
        }

        private IHtmlNode CreateWrapper(Action<IHtmlNode> appendContent)
        {
            var toolbar = new HtmlElement("div").AddClass(UIPrimitives.ToolBar, UIPrimitives.Grid.ToolBar);
            
            appendContent(toolbar);

            return toolbar;
        }
    }
}