namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo Gantt for ASP.NET MVC.
    /// </summary>
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
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Gantt&lt;Task&gt;()
        ///             .Name("Gantt")
        ///             .DataSource(source =&gt;
        ///             {
        ///                 source.Read(read =&gt;
        ///                 {
        ///                     read.Action("Read", "Gantt");
        ///                 });
        ///             })
        /// %&gt;
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
        /// <code lang="ASPX">
        ///  &lt;%= Html.Kendo().Gantt&lt;Task&gt;()
        ///             .Name("Gantt")
        ///             .DependenciesDataSource(source =&gt;
        ///             {
        ///                 source.Read(read =&gt;
        ///                 {
        ///                     read.Action("Read", "Gantt");
        ///                 });
        ///             })
        /// %&gt;
        /// </code>
        /// </example>
        public GanttBuilder<TTaskModel, TDependenciesModel> DependenciesDataSource(Action<GanttDependenciesDataSourceBuilder<TDependenciesModel>> configurator)
        {
            configurator(new GanttDependenciesDataSourceBuilder<TDependenciesModel>(Component.DependenciesDataSource, this.Component.ViewContext, this.Component.UrlGenerator));

            return this;
        }

        //>> Fields
        
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
        /// The configuration of the gantt columns. An array of JavaScript objects or strings. A JavaScript objects are interpreted as column configurations. Strings are interpreted as the
		/// field to which the column is bound. The gantt will create a column for every item of the array.
        /// </summary>
        /// <param name="configurator">The action that configures the columns.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Columns(Action<GanttColumnFactory<TTaskModel, TDependenciesModel>> configurator)
        {
            configurator(new GanttColumnFactory<TTaskModel, TDependenciesModel>(container));
            return this;
        }
        
        /// <summary>
        /// If set to true the user would be able to create new tasks and modify or delete existing ones.
        /// </summary>
        /// <param name="value">The value that configures the editable.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Editable(bool value)
        {
            container.Editable = value;

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
        /// If true, tasks snap to time slots, otherwise tasks can have arbitrary duration.
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
        /// The configuration of the gantt messages. Use this option to customize or localize the gantt messages.
        /// </summary>
        /// <param name="configurator">The action that configures the messages.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Messages(Action<GanttMessagesSettingsBuilder> configurator)
        {
            configurator(new GanttMessagesSettingsBuilder(container.Messages));
            return this;
        }
        
        /// <summary>
        /// If set to true the user would be able to select tasks in the gantt. This triggers the change event.
        /// </summary>
        /// <param name="value">The value that configures the selectable.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Selectable(bool value)
        {
            container.Selectable = value;

            return this;
        }
        
        /// <summary>
        /// If set to false, the week and month views will show all days of the week. By default these views display only business days.
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
        /// The views displayed by the gantt and their configuration. The array items can be either objects specifying the view configuration or strings representing the view types (assuming default configuration).
		/// By default the Kendo UI Gantt widget displays the "day" and "week" views.
        /// </summary>
        /// <param name="configurator">The action that configures the views.</param>
        public GanttBuilder<TTaskModel,TDependenciesModel> Views(Action<GanttViewFactory> configurator)
        {
            configurator(new GanttViewFactory(container.Views));
            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Gantt()
        ///             .Name("Gantt")
        ///             .Events(events => events
        ///                 .DataBinding("onDataBinding")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public GanttBuilder<TTaskModel, TDependenciesModel> Events(Action<GanttEventBuilder> configurator)
        {

            configurator(new GanttEventBuilder(Component.Events));

            return this;
        }
        
    }
}

