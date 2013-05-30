namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo MobileScrollView for ASP.NET MVC
    /// </summary>
    public class MobileScrollViewItemFactory : IHideObjectMembers
    {
        private readonly List<MobileScrollViewItem> container;

        public MobileScrollViewItemFactory(List<MobileScrollViewItem> container)
        {
            this.container = container;
        }

        public virtual MobileScrollViewItemBuilder Add()
        {
            var item = new MobileScrollViewItem();

            container.Add(item);

            return new MobileScrollViewItemBuilder(item);
        }
    }
}

