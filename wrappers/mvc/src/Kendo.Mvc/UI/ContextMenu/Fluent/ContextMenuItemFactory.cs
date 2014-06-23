namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo ContextMenu for ASP.NET MVC
    /// </summary>
    public class ContextMenuItemFactory : IHideObjectMembers
    {
        private readonly List<ContextMenuItem> container;

        public ContextMenuItemFactory(List<ContextMenuItem> container)
        {
            this.container = container;
        }

        public virtual ContextMenuItemBuilder Add()
        {
            var item = new ContextMenuItem();

            container.Add(item);

            return new ContextMenuItemBuilder(item);
        }
    }
}

