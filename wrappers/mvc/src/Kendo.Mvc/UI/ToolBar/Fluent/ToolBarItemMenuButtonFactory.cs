namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Item for ASP.NET MVC
    /// </summary>
    public class ToolBarItemMenuButtonFactory : IHideObjectMembers
    {
        private readonly List<ToolBarItemMenuButton> container;

        public ToolBarItemMenuButtonFactory(List<ToolBarItemMenuButton> container)
        {
            this.container = container;
        }

        public virtual ToolBarItemMenuButtonBuilder Add()
        {
            var item = new ToolBarItemMenuButton();

            container.Add(item);

            return new ToolBarItemMenuButtonBuilder(item);
        }
    }
}

