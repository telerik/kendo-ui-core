// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;

    public class GridHeaderCellBuilder : IGridCellBuilder
    {
        private readonly Action<IHtmlNode> appendContent;

        private readonly IDictionary<string, object> htmlAttributes;

        private readonly bool hasTemplate;

        public GridHeaderCellBuilder(IDictionary<string, object> htmlAttributes, Action<IHtmlNode> appendContent, bool hasTemplate)
        {
            this.htmlAttributes = htmlAttributes;

            this.appendContent = appendContent;

            this.hasTemplate = hasTemplate;

            Decorators = new List<IGridCellBuilderDecorator>();
        }

        public GridHeaderCellBuilder(IDictionary<string, object> htmlAttributes, Action<IHtmlNode> appendContent)
        {
            this.htmlAttributes = htmlAttributes;
            
            this.appendContent = appendContent;

            this.hasTemplate = false;

            Decorators = new List<IGridCellBuilderDecorator>();
        }

        public virtual IHtmlNode CreateCell()
        {
            var th = CreateContainer();

            if (!hasTemplate)
            {
                var innerWrap = new HtmlElement("span").AddClass(UIPrimitives.Link);
                innerWrap.AppendTo(th);
                AppendContent(innerWrap);
            }
            else
            {
                AppendContent(th);
            }

            Decorate(th);

            return th;
        }

        public ICollection<IGridCellBuilderDecorator> Decorators
        {
            get;
            private set;
        }
        
        protected void AppendContent(IHtmlNode container)
        {
            appendContent(container);
        }
        
        protected IHtmlNode CreateContainer()
        {
            var th = new HtmlElement("th")
                    .Attribute("scope", "col")
                    .Attributes(htmlAttributes)
                    .PrependClass(UIPrimitives.Header);
            
            return th;
        }
        
        protected void Decorate(IHtmlNode th)
        {
            foreach (var decorator in Decorators)
            {
                decorator.Decorate(th);
            }
        }
    }
}