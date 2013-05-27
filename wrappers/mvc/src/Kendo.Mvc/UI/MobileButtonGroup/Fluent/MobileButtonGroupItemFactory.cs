namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo MobileButtonGroup for ASP.NET MVC
    /// </summary>
    public class MobileButtonGroupItemFactory : IHideObjectMembers
    {
        private readonly List<MobileButtonGroupItem> container;

        public MobileButtonGroupItemFactory(List<MobileButtonGroupItem> container)
        {
            this.container = container;
        }

        public virtual MobileButtonGroupItemBuilder Add()
        {
            var item = new MobileButtonGroupItem();

            container.Add(item);

            return new MobileButtonGroupItemBuilder(item);
        }
    }
}

