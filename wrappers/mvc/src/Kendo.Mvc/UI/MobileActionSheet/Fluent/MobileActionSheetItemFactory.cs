namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo MobileActionSheet for ASP.NET MVC
    /// </summary>
    public class MobileActionSheetItemFactory : IHideObjectMembers
    {
        private readonly List<MobileActionSheetItem> container;

        public MobileActionSheetItemFactory(List<MobileActionSheetItem> container)
        {
            this.container = container;
        }

        public virtual MobileActionSheetItemBuilder Add()
        {
            var item = new MobileActionSheetItem();

            container.Add(item);

            return new MobileActionSheetItemBuilder(item);
        }
    }
}

