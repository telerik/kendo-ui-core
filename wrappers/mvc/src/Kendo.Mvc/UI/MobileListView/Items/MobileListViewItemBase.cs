namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;   
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;

    public interface IItemsContainer<T> 
        where T : class
    {
        IList<T> Items
        {
            get;            
        }
    }
   
    public abstract class MobileListViewItemBase : LinkedObjectBase<MobileListViewItemBase>, IHideObjectMembers, IHtmlAttributesContainer
    {
        public MobileListViewItemBase()
        {
            HtmlAttributes = new RouteValueDictionary();            
            Content = new HtmlTemplate();
        }

        public IDictionary<string, object> HtmlAttributes
        {
            get;
            private set;
        }        

        public HtmlTemplate Content
        {
            get;
            private set;
        }

        public string Icon
        {
            get;
            set;
        }

        public abstract void WriteHtml(IHtmlNode parent); 
     
        protected virtual IHtmlNode CreateElement()
        {
            var li = new HtmlElement("li")
                            .Attributes(HtmlAttributes);

            if (Icon.HasValue())
            {
                li.Attribute("data-icon", Icon);
            }

            return li;
        }

        protected virtual void AddContent(IHtmlNode html)
        {
            var content = new TextNode(string.Empty);

            Content.Apply(html);            

            html.Children.Add(content);
        }
    }   
}
