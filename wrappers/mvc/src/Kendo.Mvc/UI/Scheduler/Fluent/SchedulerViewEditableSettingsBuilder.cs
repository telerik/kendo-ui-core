namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewEditableSettings"/>.
    /// </summary>
    public class SchedulerViewEditableSettingsBuilder
    {
        private readonly SchedulerViewEditableSettings container;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerViewEditableSettingsBuilder"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public SchedulerViewEditableSettingsBuilder(SchedulerViewEditableSettings container)
        {
            this.container = container;
        }

        /// <summary>
        /// Sets the create option.
        /// </summary>
        /// <param name="create">The create.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public SchedulerViewEditableSettingsBuilder Create(bool create)
        {
            container.Create = create;

            return this;
        }

        /// <summary>
        /// Sets the destroy option.
        /// </summary>
        /// <param name="destroy">The destroy.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public SchedulerViewEditableSettingsBuilder Destroy(bool destroy)
        {
            container.Destroy = destroy;

            return this;
        }

        /// <summary>
        /// Sets the update option.
        /// </summary>
        /// <param name="update">The update.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public SchedulerViewEditableSettingsBuilder Update(bool update)
        {
            container.Update = update;

            return this;
        }
    }
}
