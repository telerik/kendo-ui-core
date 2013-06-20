namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;   
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
   
    public class MobileListViewLinkItem : MobileListViewItemBase
    {
        public MobileListViewLinkItem()
            : base()
        {
            LinkHtmlAttributes = new RouteValueDictionary();
        }

        public IDictionary<string, object> LinkHtmlAttributes
        {
            get;
            private set;
        }        

        public string Target
        {
            get;
            set;
        }

        public string ActionsheetContext
        {
            get;
            set;
        }

        public string Url
        {
            get;
            set;
        }

        public MobileButtonRel Rel
        {
            get;
            set;
        }

        public override void WriteHtml(IHtmlNode parent)
        {
            var li = CreateElement();

            li.Children.Add(CreateLink());

            parent.Children.Add(li);
        }

        protected virtual IHtmlNode CreateLink()
        {
            var link = new HtmlElement("a");

            AddContent(link);
            AddAttributes(link);

            return link;
        }

        protected virtual void AddAttributes(IHtmlNode link)
        {
            if (Url.HasValue())
            {
                link.Attribute("href", Url);
            }

            if (Target.HasValue())
            {
                link.Attribute("data-target", Target);
            }            

            if (Rel != MobileButtonRel.None)
            {
                link.Attribute("data-rel", Rel.ToString().ToLower());

                if (Rel == MobileButtonRel.ActionSheet)
                {
                    link.Attribute("data-actionsheet-context", ActionsheetContext);
                }
            }

            link.Attributes(LinkHtmlAttributes);
        }
    }
}
