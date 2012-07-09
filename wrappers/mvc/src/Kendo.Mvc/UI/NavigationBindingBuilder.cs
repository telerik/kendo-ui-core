namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;

    public class NavigationBindingBuilder<TNavigationItem, TParent> 
        where TNavigationItem : NavigationItem<TNavigationItem>
        where TParent : class
    {
        private NavigationBinding<TNavigationItem, TParent> item;

        public NavigationBindingBuilder(NavigationBinding<TNavigationItem, TParent> item)
        {
            this.item = item;
        }

        public NavigationBindingBuilder<TNavigationItem, TParent> Children(Func<TParent, IEnumerable> children) 
        {
            item.Children = children;

            return this;
        }

        public NavigationBindingBuilder<TNavigationItem, TParent> ItemDataBound(Action<TNavigationItem, TParent> itemDataBound) 
        {
            item.ItemDataBound = itemDataBound;

            return this;
        }
    }
}
