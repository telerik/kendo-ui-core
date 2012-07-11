namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Menu for ASP.NET MVC
    /// </summary>
    public class MenuItemFactory : IHideObjectMembers
    {
        private readonly INavigationItemContainer<MenuItem> container;
        private readonly ViewContext viewContext;

        public MenuItemFactory(INavigationItemContainer<MenuItem> container, ViewContext viewContext)
        {

            this.container = container;
            this.viewContext = viewContext;
        }

        public MenuItemBuilder Add()
        {
            MenuItem item = new MenuItem();

            container.Items.Add(item);

            return new MenuItemBuilder(item, viewContext);
        }
    }
}