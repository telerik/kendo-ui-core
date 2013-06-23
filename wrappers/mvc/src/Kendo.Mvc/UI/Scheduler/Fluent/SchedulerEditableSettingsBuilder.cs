namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerEditableSettings"/>.
    /// </summary>
    public class SchedulerEditableSettingsBuilder
    {
        private readonly SchedulerEditableSettings container;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerViewEditableSettingsBuilder"/> class.
        /// </summary>
        /// <param name="container">The container.</param>
        public SchedulerEditableSettingsBuilder(SchedulerEditableSettings container)
        {
            this.container = container;
        }

        /// <summary>
        /// If set to true the user can create new events. Creating is enabled by default.
        /// </summary>
        /// <param name="create">The create</param>
        public SchedulerEditableSettingsBuilder Create(bool create)
        {
            container.Create = create;

            return this;
        }

        /// <summary>
        /// If set to true the user can delete events from the view by clicking the "destroy" button. Deleting is enabled by default.
        /// </summary>
        /// <param name="destroy">The destroy</param>
        public SchedulerEditableSettingsBuilder Destroy(bool destroy)
        {
            container.Destroy = destroy;

            return this;
        }

        /// <summary>
        /// If set to true the user can update events. Updating is enabled by default.
        /// </summary>
        /// <param name="update">The update</param>
        public SchedulerEditableSettingsBuilder Update(bool update)
        {
            container.Update = update;

            return this;
        }

        /// <summary>
        /// The template which renders the editor.
        /// </summary>
        /// <param name="template">The template</param>
        public SchedulerEditableSettingsBuilder Template(string template)
        {
            container.Template = template;

            return this;
        }

        /// <summary>
        /// The Id of the template which renders the editor.
        /// </summary>
        /// <param name="templateId">The templateId</param>
        public SchedulerEditableSettingsBuilder TemplateId(string templateId)
        {
            container.TemplateId = templateId;

            return this;
        }

        /// <summary>
        /// The text which the scheduler will display in a confirmation dialog when the user clicks the "destroy" button.
        /// </summary>
        /// <param name="message">The message</param>
        public SchedulerEditableSettingsBuilder Confirmation(string message)
        {
            container.Confirmation = message;

            return this;
        }

        /// <summary>
        /// If set to true the scheduler will display a confirmation dialog when the user clicks the "destroy" button. Confirmation dialog is enabled by default.
        /// </summary>
        /// <param name="enable">The confirmation.</param>
        /// <example>
        public SchedulerEditableSettingsBuilder Confirmation(bool enable)
        {
            container.DisplayDeleteConfirmation = enable;

            return this;
        }

    }
}
