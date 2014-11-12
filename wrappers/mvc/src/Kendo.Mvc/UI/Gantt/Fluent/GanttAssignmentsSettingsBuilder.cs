namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent API for configuring the GanttAssignmentsSettings settings.
    /// </summary>
    public class GanttAssignmentsSettingsBuilder<TAssingmentModel>: IHideObjectMembers
        where TAssingmentModel : class
    {
        private readonly GanttAssignmentsSettings container;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        public GanttAssignmentsSettingsBuilder(GanttAssignmentsSettings settings, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            container = settings;
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
        }

        //>> Fields
        
        /// <summary>
        /// The data source which contains assignment data items.  Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing kendo.data.DataSource
		/// instance.If the dataSource option is set to a JavaScript object or array the widget will initialize a new kendo.data.DataSource instance using that value as data source configuration.If the dataSource option is an existing kendo.data.DataSource instance the widget will use that instance and will not initialize a new one.
        /// </summary>
        /// <param name="value">The value that configures the datasource.</param>
        public GanttAssignmentsSettingsBuilder<TAssingmentModel> DataSource(Action<GanttAssignmentsDataSourceBuilder<TAssingmentModel>> configurator)
        {
            configurator(new GanttAssignmentsDataSourceBuilder<TAssingmentModel>(container.DataSource, this.viewContext, this.urlGenerator));

            return this;
        }
        
        /// <summary>
        /// The field of the assignment data item which represents the resource id.
        /// </summary>
        /// <param name="value">The value that configures the dataresourceidfield.</param>
        public GanttAssignmentsSettingsBuilder<TAssingmentModel> DataResourceIdField(string value)
        {
            container.DataResourceIdField = value;

            return this;
        }
        
        /// <summary>
        /// The field of the assignment data item which represents the task id.
        /// </summary>
        /// <param name="value">The value that configures the datataskidfield.</param>
        public GanttAssignmentsSettingsBuilder<TAssingmentModel> DataTaskIdField(string value)
        {
            container.DataTaskIdField = value;

            return this;
        }
        
        /// <summary>
        /// The field of the assignment data item which represents the amount of the assigned resource.
        /// </summary>
        /// <param name="value">The value that configures the datavaluefield.</param>
        public GanttAssignmentsSettingsBuilder<TAssingmentModel> DataValueField(string value)
        {
            container.DataValueField = value;

            return this;
        }

        //<< Fields

        /// <summary>
        /// Binds the gantt assignments to a list of objects
        /// </summary>
        /// <param name="dataSource">The dataSource</param>
        public GanttAssignmentsSettingsBuilder<TAssingmentModel> BindTo(IEnumerable dataSource)
        {
            container.DataSource.Data = dataSource;

            return this;
        }
    }
}

