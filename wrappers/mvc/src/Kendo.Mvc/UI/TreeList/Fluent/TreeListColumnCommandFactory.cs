namespace Kendo.Mvc.UI.Fluent
{
    using System.Web.Mvc;
    using System.Collections.Generic;

    /// <summary>
    /// Defines the fluent API for adding items to Kendo Column for ASP.NET MVC
    /// </summary>
    public class TreeListColumnCommandFactory<T> : IHideObjectMembers where T : class
    {
        private readonly List<TreeListColumnCommand> container;

        public TreeListColumnCommandFactory(List<TreeListColumnCommand> container)
        {
            this.container = container;
        }

        //>> Factory methods
        
        /// <summary>
        /// Adds an item for a custom action.
        /// </summary>
        public virtual TreeListColumnCommandBuilder<T> Custom()
        {
            var item = new TreeListColumnCommand();

            container.Add(item);

            return new TreeListColumnCommandBuilder<T>(item);
        }

        /// <summary>
        /// Adds an item for the edit action.
        /// </summary>
        public virtual TreeListColumnCommandBuilder<T> Edit()
        {
            var item = new TreeListColumnCommand() { Name = "edit" };

            container.Add(item);

            return new TreeListColumnCommandBuilder<T>(item);
        }

        /// <summary>
        /// Adds an item for the createChild action.
        /// </summary>
        public virtual TreeListColumnCommandBuilder<T> CreateChild()
        {
            var item = new TreeListColumnCommand() { Name = "createChild" };

            container.Add(item);

            return new TreeListColumnCommandBuilder<T>(item);
        }

        /// <summary>
        /// Adds an item for the destroy action.
        /// </summary>
        public virtual TreeListColumnCommandBuilder<T> Destroy()
        {
            var item = new TreeListColumnCommand() { Name = "destroy" };

            container.Add(item);

            return new TreeListColumnCommandBuilder<T>(item);
        }
        //<< Factory methods
    }
}

