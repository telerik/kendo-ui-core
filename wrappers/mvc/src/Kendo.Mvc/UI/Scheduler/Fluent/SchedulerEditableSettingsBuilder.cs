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
        /// Sets the create option.
        /// </summary>
        /// <param name="create">The create.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public SchedulerEditableSettingsBuilder Create(bool create)
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
        public SchedulerEditableSettingsBuilder Destroy(bool destroy)
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
        public SchedulerEditableSettingsBuilder Update(bool update)
        {
            container.Update = update;

            return this;
        }

        /// <summary>
        /// Sets the template option.
        /// </summary>
        /// <param name="template">The template.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public SchedulerEditableSettingsBuilder Template(string template)
        {
            container.Template = template;

            return this;
        }

        /// <summary>
        /// Sets the template option.
        /// </summary>
        /// <param name="templateId">The templateId.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public SchedulerEditableSettingsBuilder TemplateId(string templateId)
        {
            container.TemplateId = templateId;

            return this;
        }

        /// <summary>
        /// Sets the confirmation option.
        /// </summary>
        /// <param name="message">The confirmation.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public SchedulerEditableSettingsBuilder Confirmation(string message)
        {
            container.Confirmation = message;

            return this;
        }

        /// <summary>
        /// Sets the confirmation option.
        /// </summary>
        /// <param name="enable">The confirmation.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public SchedulerEditableSettingsBuilder Confirmation(bool enable)
        {
            container.DisplayDeleteConfirmation = enable;

            return this;
        }

    }
}
