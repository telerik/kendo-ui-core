namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo TreeList for ASP.NET MVC
    /// </summary>
    public class TreeListColumnFactory<T> : IHideObjectMembers where T : class
    {
        private readonly List<TreeListColumn> container;

        public TreeListColumnFactory(List<TreeListColumn> container)
        {
            this.container = container;
        }

        public virtual TreeListColumnBuilder<T> Add()
        {
            var item = new TreeListColumn();

            container.Add(item);

            return new TreeListColumnBuilder<T>(item);
        }
    }
}

