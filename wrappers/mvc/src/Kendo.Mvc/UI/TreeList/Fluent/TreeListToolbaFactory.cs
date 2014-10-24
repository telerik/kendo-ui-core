namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo TreeList for ASP.NET MVC
    /// </summary>
    public class TreeListToolbaFactory : IHideObjectMembers
    {
        private readonly List<TreeListToolba> container;

        public TreeListToolbaFactory(List<TreeListToolba> container)
        {
            this.container = container;
        }

        public virtual TreeListToolbaBuilder Add()
        {
            var item = new TreeListToolba();

            container.Add(item);

            return new TreeListToolbaBuilder(item);
        }
    }
}

