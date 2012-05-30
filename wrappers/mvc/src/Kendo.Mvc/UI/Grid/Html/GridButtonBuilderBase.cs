namespace Kendo.Mvc.UI.Html
{
    using System;
    using System.Collections.Generic;

    public abstract class GridButtonBuilderBase : IGridButtonBuilder
    {
        public GridButtonBuilderBase()
        {
            Decorators = new List<IGridButtonBuilderDecorator>();
        }

        public virtual IHtmlNode Create(object dataItem)
        {
            var button = new HtmlElement(ButtonTagName);
            
            ApplyButtonAttributes(button, dataItem);

            button.Attributes(HtmlAttributes)
                  .AddClass(CssClass);

            foreach (var decorator in Decorators)
            {
                decorator.Apply(button);
            }
            
            return button;
        }

        protected abstract string ButtonTagName
        {
            get;
        }

        protected virtual void ApplyButtonAttributes(IHtmlNode button, object dataItem)
        {

        }

        public string Text
        {
            get;
            set;
        }

        public Func<object, string> Url
        {
            get;
            set;
        }

        public IList<IGridButtonBuilderDecorator> Decorators
        {
            get;
            private set;
        }
        
        public IDictionary<string, object> HtmlAttributes
        {
            get;
            set;
        }
        
        public IDictionary<string, object> ImageHtmlAttributes
        {
            get;
            set;
        }

        public string CssClass
        {
            get;
            set;
        }        
        
        public string SpriteCssClass
        {
            get;
            set;
        }
    }
}