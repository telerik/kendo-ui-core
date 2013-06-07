namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;   
    using System.Web.Routing;
    using Kendo.Mvc.Extensions;
   
    public class MobileListViewItem : MobileListViewItemBase, IItemsContainer<MobileListViewItemBase>
    {
        public MobileListViewItem() 
            : base()
        {
            Items = new List<MobileListViewItemBase>();            
        }

        public IList<MobileListViewItemBase> Items
        {
            get;
            private set;
        }

        public override void WriteHtml(IHtmlNode parent)
        {
            var li = CreateElement();

            AddContent(li);

            if (Items.Count > 0)
            {
                var ul = new HtmlElement("ul");

                Items.Each(item => item.WriteHtml(ul));

                li.Children.Add(ul);
            }

            parent.Children.Add(li);
        }
    }    
}
