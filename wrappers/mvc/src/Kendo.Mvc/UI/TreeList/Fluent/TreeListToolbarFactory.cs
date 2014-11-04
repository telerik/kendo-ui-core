namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo TreeList for ASP.NET MVC
    /// </summary>
    public class TreeListToolbarFactory<T> : IHideObjectMembers where T : class
    {
        private readonly List<TreeListToolbar> container;

        public TreeListToolbarFactory(List<TreeListToolbar> container)
        {
            this.container = container;
        }

        public virtual TreeListToolbarBuilder<T> Add()
        {
            var item = new TreeListToolbar();

            container.Add(item);

            return new TreeListToolbarBuilder<T>(item);
        }
    }
}

