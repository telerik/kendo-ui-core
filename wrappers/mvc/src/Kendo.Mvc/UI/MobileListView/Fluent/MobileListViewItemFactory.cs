namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo MobileListView for ASP.NET MVC
    /// </summary>
    public class MobileListViewItemFactory : IHideObjectMembers
    {
        private readonly IList<MobileListViewItemBase> container;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        public MobileListViewItemFactory(IList<MobileListViewItemBase> container, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.container = container;
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
        }

        public MobileListViewItemBuilder Add()
        {
            var item = new MobileListViewItem();

            container.Add(item);

            return new MobileListViewItemBuilder(item, viewContext, urlGenerator);
        }

        public MobileListViewLinkItemBuilder AddLink()
        {
            var item = new MobileListViewLinkItem();

            container.Add(item);

            return new MobileListViewLinkItemBuilder(item, viewContext, urlGenerator);
        }
    }
}