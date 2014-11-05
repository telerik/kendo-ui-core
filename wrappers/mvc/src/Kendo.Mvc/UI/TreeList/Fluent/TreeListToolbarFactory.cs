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

        //>> Factory methods
        
        /// <summary>
        /// Adds an item for a custom action.
        /// </summary>
        public virtual TreeListToolbarBuilder<T> Custom()
        {
            var item = new TreeListToolbar();

            container.Add(item);

            return new TreeListToolbarBuilder<T>(item);
        }

        /// <summary>
        /// Adds an item for the create action.
        /// </summary>
        public virtual TreeListToolbarBuilder<T> Create()
        {
            var item = new TreeListToolbar() { Name = "create" };

            container.Add(item);

            return new TreeListToolbarBuilder<T>(item);
        }

        /// <summary>
        /// Adds an item for the pdf action.
        /// </summary>
        public virtual TreeListToolbarBuilder<T> Pdf()
        {
            var item = new TreeListToolbar() { Name = "pdf" };

            container.Add(item);

            return new TreeListToolbarBuilder<T>(item);
        }

        /// <summary>
        /// Adds an item for the excel action.
        /// </summary>
        public virtual TreeListToolbarBuilder<T> Excel()
        {
            var item = new TreeListToolbar() { Name = "excel" };

            container.Add(item);

            return new TreeListToolbarBuilder<T>(item);
        }
        //<< Factory methods
    }
}

