namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Represents an item from Kendo ContextMenu for ASP.NET MVC
    /// </summary>
    public class ContextMenuItem : NavigationItem<ContextMenuItem>, INavigationItemContainer<ContextMenuItem>
    {
        public ContextMenuItem()
        {
            Items = new LinkedObjectCollection<ContextMenuItem>(this);
        }

        public IList<ContextMenuItem> Items
        {
            get;
            private set;
        }

        public bool Separator
        {
            get;
            set;
        }

    }
}