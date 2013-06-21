namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Web.Mvc;
    using System.Collections;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerViewBaseBuilder"/>.
    /// </summary>
    public class SchedulerViewBaseBuilder<T> : ISchedulerViewBuilder
        where T : class, ISchedulerView
    {
        protected readonly T resource;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerViewDayBuilder"/> class.
        /// </summary>
        /// <param name="resource">The resource.</param>
        /// 
        public SchedulerViewBaseBuilder(T resource)
        {
            this.resource = resource;
        }

        /// <summary>
        /// Sets the title option.
        /// </summary>
        /// <param name="title">The title.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder Title(string title)
        {
            resource.Title = title;

            return this;
        }

        /// <summary>
        /// Sets the startTime option.
        /// </summary>
        /// <param name="starTime">The startTime.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder StartTime(DateTime startTime)
        {
            resource.StartTime = startTime;

            return this;
        }

        /// <summary>
        /// Sets the endTime option.
        /// </summary>
        /// <param name="endTime">The endTime.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder EndTime(DateTime endTime)
        {
            resource.EndTime = endTime;

            return this;
        }

        /// <summary>
        /// Sets the editable settings option.
        /// </summary>
        /// <param name="editableSettings">The editable settings.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder Editable(Action<SchedulerViewEditableSettingsBuilder> configurator)
        {
            resource.Editable = new SchedulerViewEditableSettings();

            configurator(new SchedulerViewEditableSettingsBuilder(resource.Editable));

            return this;
        }

        /// <summary>
        /// Enable or disable the editable option.
        /// </summary>
        /// <param name="isEditable">The enable or disable the editable option.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder Editable(bool isEditable)
        {
            resource.Editable = new SchedulerViewEditableSettings();

            resource.Editable.Enable = isEditable;

            return this;
        }

        /// <summary>
        /// Sets the eventTemplate option.
        /// </summary>
        /// <param name="eventTemplate">The eventTemplate.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder EventTemplate(string eventTemplate)
        {
            resource.EventTemplate = eventTemplate;

            return this;
        }

        /// <summary>
        /// Sets the selectedDateFormat option.
        /// </summary>
        /// <param name="selectedDateFormat">The selectedDateFormat.</param>
        /// <example>
        /// <code lang="CS">
        ///  //TODO: CODE EXAMPLE
        /// </code>
        /// </example>
        public ISchedulerViewBuilder SelectedDateFormat(string selectedDateFormat)
        {
            resource.SelectedDateFormat = selectedDateFormat;

            return this;
        }
    }

}
