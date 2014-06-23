namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Item for ASP.NET MVC
    /// </summary>
    public class ToolBarItemButtonFactory : IHideObjectMembers
    {
        private readonly List<ToolBarItemButton> container;

        public ToolBarItemButtonFactory(List<ToolBarItemButton> container)
        {
            this.container = container;
        }

        public virtual ToolBarItemButtonBuilder Add()
        {
            var item = new ToolBarItemButton();

            container.Add(item);

            return new ToolBarItemButtonBuilder(item);
        }
    }
}

