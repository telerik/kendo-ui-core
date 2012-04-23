

namespace KendoUI.Mvc.UI
{
    using System.Collections.Generic;

    /// <summary>
    /// Defines which objects can have child items.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface INavigationItemContainer<T> where T : NavigationItem<T>
    {
        /// <summary>
        /// Child items collection.
        /// </summary>
        IList<T> Items
        {
            get;
        }
    }
}