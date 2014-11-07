namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent API for configuring the GanttResourcesSettings settings.
    /// </summary>
    public class GanttResourcesSettingsBuilder: IHideObjectMembers
    {
        private readonly GanttResourcesSettings container;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        public GanttResourcesSettingsBuilder(GanttResourcesSettings settings, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            container = settings;
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
        }

        //>> Fields
        
        /// <summary>
        /// The field of the resource data item containing the format of the resource value, which could be assigned to a gantt task.
		/// The data item format value could be any valid kendo format.
        /// </summary>
        /// <param name="value">The value that configures the dataformatfield.</param>
        public GanttResourcesSettingsBuilder DataFormatField(string value)
        {
            container.DataFormatField = value;

            return this;
        }
        
        /// <summary>
        /// The field of the resource data item which contains the resource color.
        /// </summary>
        /// <param name="value">The value that configures the datacolorfield.</param>
        public GanttResourcesSettingsBuilder DataColorField(string value)
        {
            container.DataColorField = value;

            return this;
        }
        
        /// <summary>
        /// The data source which contains resource data items.  Can be a JavaScript object which represents a valid data source configuration, a JavaScript array or an existing kendo.data.DataSource
		/// instance.If the dataSource option is set to a JavaScript object or array the widget will initialize a new kendo.data.DataSource instance using that value as data source configuration.If the dataSource option is an existing kendo.data.DataSource instance the widget will use that instance and will not initialize a new one.
        /// </summary>
        /// <param name="value">The value that configures the datasource.</param>
        public GanttResourcesSettingsBuilder DataSource(Action<ReadOnlyAjaxDataSourceBuilder<object>> configurator)
        {
            configurator(new ReadOnlyAjaxDataSourceBuilder<object>(container.DataSource, this.viewContext, this.urlGenerator));

            return this;
        }
        
        /// <summary>
        /// The field of the resource data item which represents the resource text.
        /// </summary>
        /// <param name="value">The value that configures the datatextfield.</param>
        public GanttResourcesSettingsBuilder DataTextField(string value)
        {
            container.DataTextField = value;

            return this;
        }
        
        /// <summary>
        /// The field of the gantt task which contains the assigned resource objects.
        /// </summary>
        /// <param name="value">The value that configures the field.</param>
        public GanttResourcesSettingsBuilder Field(string value)
        {
            container.Field = value;

            return this;
        }

        //<< Fields

        /// <summary>
        /// Binds the gantt resources to a list of objects
        /// </summary>
        /// <param name="dataSource">The dataSource</param>
        public GanttResourcesSettingsBuilder BindTo(IEnumerable dataSource)
        {
            container.DataSource.Data = dataSource;

            return this;
        }
    }
}

