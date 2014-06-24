namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Represents an item from Kendo Menu for ASP.NET MVC
    /// </summary>
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

        public bool Separator
        {
            get;
            set;
        }
    }
}