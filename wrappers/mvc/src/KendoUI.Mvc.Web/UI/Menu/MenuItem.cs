namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;

    public class MenuItem : NavigationItem<MenuItem>, INavigationItemContainer<MenuItem>
    {
        public MenuItem()
        {
            Items = new LinkedObjectCollection<MenuItem>(this);
        }

        public IList<MenuItem> Items
        {
            get;
            private set;
        }
    }
}