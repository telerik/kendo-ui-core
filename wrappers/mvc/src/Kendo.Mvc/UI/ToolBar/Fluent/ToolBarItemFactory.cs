namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo ToolBar for ASP.NET MVC
    /// </summary>
    public class ToolBarItemFactory : IHideObjectMembers
    {
        private readonly List<ToolBarItem> container;

        public ToolBarItemFactory(List<ToolBarItem> container)
        {
            this.container = container;
        }

        public virtual ToolBarItemBuilder Add()
        {
            var item = new ToolBarItem();

            container.Add(item);

            return new ToolBarItemBuilder(item);
        }
    }
}

