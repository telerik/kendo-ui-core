namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo MobileTabStrip for ASP.NET MVC
    /// </summary>
    public class MobileTabStripItemFactory : IHideObjectMembers
    {
        private readonly List<MobileTabStripItem> container;

        public MobileTabStripItemFactory(List<MobileTabStripItem> container)
        {
            this.container = container;
        }

        public virtual MobileTabStripItemBuilder Add()
        {
            var item = new MobileTabStripItem();

            container.Add(item);

            return new MobileTabStripItemBuilder(item);
        }
    }
}

