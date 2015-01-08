namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo Gantt for ASP.NET MVC.
    /// </summary>
    /// <typeparam name="TTaskModel">The type of the task data item</typeparam>
    /// <typeparam name="TDependenciesModel">The type of the dependency data item</typeparam>
    public class GanttBuilder<TTaskModel, TDependenciesModel> : WidgetBuilderBase<Gantt<TTaskModel, TDependenciesModel>, GanttBuilder<TTaskModel, TDependenciesModel>>
        where TTaskModel : class, IGanttTask
        where TDependenciesModel : class, IGanttDependency
    {
        private readonly Gantt<TTaskModel, TDependenciesModel> container;
        /// <summary>
        /// Initializes a new instance of the <see cref="Gantt"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public GanttBuilder(Gantt<TTaskModel, TDependenciesModel> component)
            : base(component)
        {
            container = component;
        }

        /// <summary>
        /// Configures the DataSource options.
        /// </summary>
        /// <param name="configurator">The DataSource configurator action.</param>
        /// <example>
        /// <code lang="Razor">
        ///  @(Html.Kendo().Gantt&lt;TaskViewModel, DependencyViewModel&gt;()
        ///     .Name("Gantt")
        ///     .DataSource(source =&gt;
        ///     {
        ///         source.Read(read =&gt;
        ///         {
        ///             read.Action("Read", "Gantt");
        ///         });
        ///     })
        /// )
        /// </code>
        /// </example>
        public GanttBuilder<TTaskModel, TDependenciesModel> DataSource(Action<GanttDataSourceBuilder<TTaskModel>> configurator)
        {
            configurator(new GanttDataSourceBuilder<TTaskModel>(Component.DataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }

        /// <summary>
        /// Configures the dependencies DataSource options.
        /// </summary>
        /// <param name="configurator">The DataSource configurator action.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Gantt&lt;TaskViewModel, DependencyViewModel&gt;()
        ///     .Name("Gantt")
        ///     .DependenciesDataSource(source =&gt;
        ///     {
        ///         source.Read(read =&gt;
        ///         {
        ///             read.Action("Read", "Gantt");
        ///         });
        ///     })
        ///  )
        /// </code>
        /// </example>
        public GanttBuilder<TTaskModel, TDependenciesModel> DependenciesDataSource(Action<GanttDependenciesDataSourceBuilder<TDependenciesModel>> configurator)
        {
            configurator(new GanttDependenciesDataSourceBuilder<TDependenciesModel>(Component.DependenciesDataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }

        /// <summary>
        /// The configuration of the gantt columns. An array of JavaScript objects or strings. A JavaScript objects are interpreted as column configurations. Strings are interpreted as the
        /// field to which the column is bound. The gantt will create a column for every item of the array.
        /// </summary>
        /// <param name="configurator">The action that configures the columns.</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> Columns(Action<GanttColumnFactory<TTaskModel, TDependenciesModel>> configurator)
        {
            configurator(new GanttColumnFactory<TTaskModel, TDependenciesModel>(container));
            return this;
        }

        //>> Fields
        
        /// <summary>
        /// The configuration of the assignments of the gantt resources. An assignment is a one-to-one mapping between a gantt task and a gantt resource containing the number of units for which a resource is assigned to a task.
        /// </summary>
        /// <param name="configurator">The action that configures the assignments.</param>
        public GanttBuilder<TTaskModel, TDependenciesModel> Assignments<TAssingmentModel>(Action<GanttAssignmentsSettingsBuilder<TAssingmentModel>> configurator)
            where TAssingmentModel : class
        {
            container.Assignments.DataSource.Schema.Model = new ModelDescriptor(typeof(TAssingmentModel));

            configurator(new GanttAssignmentsSettingsBuilder<TAssingmentModel>(container.Assignments, this.Component.ViewContext, this.Component.UrlGenerator));
            return this;
        }
        
        /// <summary>
        /// If set to false the widget will not bind to the data source during initialization. In this case data binding will occur when the change event of the
		/// data source is fired. By default the widget will bind to the data source specified in the configuration.
        /// </summary>
        /// <param name="value">The value that configures the autobind.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> AutoBind(bool value)
        {
            container.AutoBind = value;

            return this;
        }
        
        /// <summary>
        /// If set to false the user won't be able to create, modify or delete tasks and dependencies.
        /// </summary>
        public GanttBuilder<TTaskModel,TDependenciesModel> Editable()
        {
            return Editable(true);
        }

        
        /// <summary>
        /// If set to false the "current time" marker of the Gantt would not be displayed.
        /// </summary>
        /// <param name="configurator">The action that configures the currenttimemarker.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> CurrentTimeMarker(Action<GanttCurrentTimeMarkerSettingsBuilder> configurator)
        {
            container.CurrentTimeMarker.Enabled = true;
            
            configurator(new GanttCurrentTimeMarkerSettingsBuilder(container.CurrentTimeMarker));
            return this;
        }
        

        /// <summary>
        /// If set to false the user won't be able to create, modify or delete tasks and dependencies.
        /// </summary>
        /// <param name="enabled">Enables or disables the editable option.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Editable(bool enabled)
        {
            container.Editable.Enabled = enabled;
            return this;
        }

        
        /// <summary>
        /// If set to false the user won't be able to create, modify or delete tasks and dependencies.
        /// </summary>
        /// <param name="configurator">The action that configures the editable.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Editable(Action<GanttEditableSettingsBuilder> configurator)
        {
            container.Editable.Enabled = true;
            
            configurator(new GanttEditableSettingsBuilder(container.Editable));
            return this;
        }
        
        /// <summary>
        /// If set to true the user could navigate the widget using the keyboard. By default keyboard navigation is disabled.
        /// </summary>
        /// <param name="value">The value that configures the navigatable.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Navigatable(bool value)
        {
            container.Navigatable = value;

            return this;
        }
        
        /// <summary>
        /// Sets the start of the work day.
        /// </summary>
        /// <param name="value">The value that configures the workdaystart.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> WorkDayStart(DateTime value)
        {
            container.WorkDayStart = value;

            return this;
        }
        
        /// <summary>
        /// Sets the end of the work day.
        /// </summary>
        /// <param name="value">The value that configures the workdayend.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> WorkDayEnd(DateTime value)
        {
            container.WorkDayEnd = value;

            return this;
        }
        
        /// <summary>
        /// The start of working week (index based).
        /// </summary>
        /// <param name="value">The value that configures the workweekstart.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> WorkWeekStart(double value)
        {
            container.WorkWeekStart = value;

            return this;
        }
        
        /// <summary>
        /// The end of working week (index based).
        /// </summary>
        /// <param name="value">The value that configures the workweekend.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> WorkWeekEnd(double value)
        {
            container.WorkWeekEnd = value;

            return this;
        }
        
        /// <summary>
        /// The span of an hour slot.
        /// </summary>
        /// <param name="value">The value that configures the hourspan.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> HourSpan(double value)
        {
            container.HourSpan = value;

            return this;
        }
        
        /// <summary>
        /// If set to true the Gantt will snap tasks to the nearest slot during dragging (resizing or moving). Set it to false to allow free moving and resizing of tasks.
        /// </summary>
        /// <param name="value">The value that configures the snap.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Snap(bool value)
        {
            container.Snap = value;

            return this;
        }
        
        /// <summary>
        /// The height of the widget. Numeric values are treated as pixels.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Height(double value)
        {
            container.Height = value;

            return this;
        }
        
        /// <summary>
        /// The width of the task list. Numeric values are treated as pixels.
        /// </summary>
        /// <param name="value">The value that configures the listwidth.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> ListWidth(string value)
        {
            container.ListWidth = value;

            return this;
        }
        
        /// <summary>
        /// The configuration of the Gantt messages. Use this option to customize or localize the Gantt messages.
        /// </summary>
        /// <param name="configurator">The action that configures the messages.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Messages(Action<GanttMessagesSettingsBuilder> configurator)
        {
            configurator(new GanttMessagesSettingsBuilder(container.Messages));
            return this;
        }
        
        /// <summary>
        /// Configures the Kendo UI Gantt PDF export settings.
        /// </summary>
        /// <param name="configurator">The action that configures the pdf.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Pdf(Action<GanttPdfSettingsBuilder> configurator)
        {
            configurator(new GanttPdfSettingsBuilder(container.Pdf));
            return this;
        }
        
        /// <summary>
        /// If set to false the user won't be able to select tasks in the Gantt. By default selection is enabled and triggers the change event.
        /// </summary>
        /// <param name="value">The value that configures the selectable.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Selectable(bool value)
        {
            container.Selectable = value;

            return this;
        }
        
        /// <summary>
        /// If set to false, Gantt views will show all days of the week. By default the views display only business days.
        /// </summary>
        /// <param name="value">The value that configures the showworkdays.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> ShowWorkDays(bool value)
        {
            container.ShowWorkDays = value;

            return this;
        }
        
        /// <summary>
        /// If set to false, the day view will show all hours of the day. By default the view displays only business hours.
        /// </summary>
        /// <param name="value">The value that configures the showworkhours.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> ShowWorkHours(bool value)
        {
            container.ShowWorkHours = value;

            return this;
        }
        
        /// <summary>
        /// If a String value is assigned to the toolbar configuration option, it will be treated as a single string template for the whole Gantt Toolbar,
		/// and the string value will be passed as an argument to a kendo.template() function.If a Function value is assigned (it may be a kendo.template() function call or a generic function reference), then the return value of the function will be used to render the Gantt Toolbar contents.If an Array value is assigned, it will be treated as the list of commands displayed in the Gantt Toolbar. Commands can be custom or built-in ("append", "pdf").The "append" command adds a new task to the gantt.The "pdf" command exports the gantt in PDF format.
        /// </summary>
        /// <param name="configurator">The action that configures the toolbar.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Toolbar(Action<GanttToolbarFactory> configurator)
        {
            configurator(new GanttToolbarFactory(container.Toolbar));
            return this;
        }
        
        /// <summary>
        /// The task tooltip configuration options.
        /// </summary>
        /// <param name="configurator">The action that configures the tooltip.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Tooltip(Action<GanttTooltipSettingsBuilder> configurator)
        {
            configurator(new GanttTooltipSettingsBuilder(container.Tooltip));
            return this;
        }
        
        /// <summary>
        /// The views displayed by the Gantt and their configuration. The array items can be either objects specifying the view configuration or strings representing the view types (assuming default configuration).
		/// By default the Kendo UI Gantt widget displays "day", "week", and "month" views.
        /// </summary>
        /// <param name="configurator">The action that configures the views.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Views(Action<GanttViewFactory> configurator)
        {
            configurator(new GanttViewFactory(container.Views));
            return this;
        }
        
        /// <summary>
        /// The configuration of the gantt resource(s). A gantt resource is optional metadata that can be associated
		/// with a gantt task.
        /// </summary>
        /// <param name="configurator">The action that configures the resources.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Resources(Action<GanttResourcesSettingsBuilder> configurator)
        {
            configurator(new GanttResourcesSettingsBuilder(container.Resources, this.Component.ViewContext, this.Component.UrlGenerator));
            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Gantt()
        ///     .Name("Gantt")
        ///     .Events(events => events
        ///         .DataBinding("onDataBinding")
        ///     )
        /// )
        /// </code>
        /// </example>
        public GanttBuilder<TTaskModel, TDependenciesModel> Events(Action<GanttEventBuilder> configurator)
        {
            configurator(new GanttEventBuilder(Component.Events));

            return this;
        }
        
    }
}

