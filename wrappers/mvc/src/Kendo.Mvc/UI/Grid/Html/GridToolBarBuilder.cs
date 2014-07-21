namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;
    using Kendo.Mvc.Infrastructure;
    
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
            var toolbar = new HtmlElement("div").AddClass(UIPrimitives.Header, UIPrimitives.Grid.ToolBar);
            
            appendContent(toolbar);

            return toolbar;
        }
    }
}