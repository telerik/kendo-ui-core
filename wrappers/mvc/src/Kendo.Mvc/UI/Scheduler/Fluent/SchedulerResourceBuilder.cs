namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Collections;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="SchedulerResource"/>.
    /// </summary>
    public class SchedulerResourceBuilder<TModel>
        where TModel : class, ISchedulerEvent
    {

        private readonly SchedulerResource<TModel> resource;
        private readonly ViewContext viewContext;
        private readonly IUrlGenerator urlGenerator;

        /// <summary>
        /// Initializes a new instance of the <see cref="SchedulerResourceBuilder"/> class.
        /// </summary>
        /// <param name="resource">The resource.</param>
        /// 
        public SchedulerResourceBuilder(SchedulerResource<TModel> resource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.resource = resource;
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
        }

        /// <summary>
        /// The user friendly title of the resource displayed in the scheduler edit form. If not set the value of the field option is used.
        /// </summary>
        /// <param name="title">The title</param>
        public SchedulerResourceBuilder<TModel> Title(string title)
        {
            resource.Title = title;

            return this;
        }

        /// <summary>
        /// If set to true the scheduler event can be assigned multiple instances of the resource. The scheduler event field specified via the field option will contain an array of resources. By default only one resource instance can be assigned to an event.
        /// </summary>
        /// <param name="isMultiple">The isMultiple</param>
        public SchedulerResourceBuilder<TModel> Multiple(bool isMultiple)
        {
            resource.Multiple = isMultiple;

            return this;
        }

        /// <summary>
        /// Binds the scheduler resource to a list of objects
        /// </summary>
        /// <param name="dataSource">The dataSource</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Views(views =&gt;
        ///     {
        ///         views.DayView();
        ///         views.AgendaView();
        ///     })
        ///     .Resources(resource =&gt;
        ///     {
        ///         resource.Add(m =&gt; m.OwnerID)
        ///             .Title(&quot;Owner&quot;)
        ///             .Multiple(true)
        ///             .DataTextField(&quot;Text&quot;)
        ///             .DataValueField(&quot;Value&quot;)
        ///             .BindTo(new[] { 
        ///                 new { Text = &quot;Alex&quot;, Value = 1, color = &quot;red&quot; } ,
        ///                 new { Text = &quot;Bob&quot;, Value = 1, color = &quot;green&quot; } ,
        ///                 new { Text = &quot;Charlie&quot;, Value = 1, color = &quot;blue&quot; } 
        ///             });
        ///     })
        ///     .DataSource(d =&gt; d
        ///         .Model(m =&gt; m.Id(f =&gt; f.TaskID))
        ///             .Read(&quot;Read&quot;, &quot;Scheduler&quot;)
        ///             .Create(&quot;Create&quot;, &quot;Scheduler&quot;)
        ///             .Destroy(&quot;Destroy&quot;, &quot;Scheduler&quot;)
        ///             .Update(&quot;Update&quot;, &quot;Scheduler&quot;)
        ///     )
        /// )
        /// </code>
        /// </example>
        public SchedulerResourceBuilder<TModel> BindTo(IEnumerable dataSource)
        {
            resource.DataSource.Data = dataSource;

            return this;
        }

        /// <summary>
        /// The field of the resource data item which represents the resource value. The resource value is used to link a scheduler event with a resource.
        /// </summary>
        /// <param name="field">The field</param>
        public SchedulerResourceBuilder<TModel> DataValueField(string field)
        {
            resource.DataValueField = field;

            return this;
        }


        /// <summary>
        /// The field of the resource data item which represents the resource text.
        /// </summary>
        /// <param name="field">The field</param>
        public SchedulerResourceBuilder<TModel> DataTextField(string field)
        {
            resource.DataTextField = field;

            return this;
        }

        /// <summary>
        /// The field of the resource data item which contains the resource color.
        /// </summary>
        /// <param name="field">The field</param>
        public SchedulerResourceBuilder<TModel> DataColorField(string field)
        {
            resource.DataColorField = field;

            return this;
        }

        /// <summary>
        /// Set to false if the scheduler event field specified via the field option contains a resource data item. By default the scheduler expects that field to contain a primitive value (string, number) which corresponds to the "value" of the resource (specified via dataValueField).
        /// </summary>
        /// <param name="valuePrimitive">The valuePrimitive</param>
        public SchedulerResourceBuilder<TModel> ValuePrimitive(bool valuePrimitive)
        {
            resource.ValuePrimitive = valuePrimitive;

            return this;
        }

        /// <summary>
        /// Configures the DataSource options.
        /// </summary>
        /// <param name="configurator">The DataSource configurator action.</param>
        /// <example>
        /// <code lang="Razor">
        /// @(Html.Kendo().Scheduler&lt;Kendo.Mvc.Examples.Models.Scheduler.Task&gt;()
        ///     .Name(&quot;scheduler&quot;)
        ///     .Date(new DateTime(2013, 6, 13))
        ///     .Views(views =&gt;
        ///     {
        ///         views.DayView();
        ///         views.AgendaView();
        ///     })
        ///     .Resources(resource =&gt;
        ///     {
        ///         resource.Add(m =&gt; m.OwnerID)
        ///             .Title(&quot;Owner&quot;)
        ///             .Multiple(true)
        ///             .DataTextField(&quot;Text&quot;)
        ///             .DataValueField(&quot;Value&quot;)
        ///             .DataSource(d =&gt; d.Read(&quot;Attendies&quot;, &quot;Scheduler&quot;));
        ///     })
        ///     .DataSource(d =&gt; d
        ///         .Model(m =&gt; m.Id(f =&gt; f.TaskID))
        ///             .Read(&quot;Read&quot;, &quot;Scheduler&quot;)
        ///             .Create(&quot;Create&quot;, &quot;Scheduler&quot;)
        ///             .Destroy(&quot;Destroy&quot;, &quot;Scheduler&quot;)
        ///             .Update(&quot;Update&quot;, &quot;Scheduler&quot;)
        ///     )
        /// )
        /// </code>
        /// </example>
        public SchedulerResourceBuilder<TModel> DataSource(Action<ReadOnlyDataSourceBuilder> configurator)
        {
            configurator(new ReadOnlyDataSourceBuilder(resource.DataSource, this.viewContext, this.urlGenerator));

            return this;
        }

    }
}
