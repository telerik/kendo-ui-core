namespace Kendo.Mvc.UI.Fluent
{
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
        /// If set to true the user can create new events. Creating is enabled by default.
        /// </summary>
        /// <param name="create">The create</param>
        public SchedulerViewEditableSettingsBuilder Create(bool create)
        {
            container.Create = create;

            return this;
        }

        /// <summary>
        /// If set to true the user can delete events from the view by clicking the "destroy" button. Deleting is enabled by default.
        /// </summary>
        /// <param name="destroy">The destroy</param>
        public SchedulerViewEditableSettingsBuilder Destroy(bool destroy)
        {
            container.Destroy = destroy;

            return this;
        }


        /// <summary>
        /// If set to true the user can update events. Updating is enabled by default.
        /// </summary>
        /// <param name="update">The update</param>
        public SchedulerViewEditableSettingsBuilder Update(bool update)
        {
            container.Update = update;

            return this;
        }
    }
}
