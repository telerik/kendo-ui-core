namespace Kendo.Mvc.UI
{
    using System.Collections.Generic;

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