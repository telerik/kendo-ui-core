namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    public class SchedulerAjaxDataSourceBuilder<TModel> : AjaxDataSourceBuilderBase<TModel, SchedulerAjaxDataSourceBuilder<TModel>>, IHideObjectMembers
         where TModel : class
    {
        public SchedulerAjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

#if !MVC3
        /// <summary>
        /// Use it to configure WebApi binding.
        /// </summary>        
        public SchedulerWebApiDataSourceBuilder<TModel> WebApi()
        {
            dataSource.Type = DataSourceType.WebApi;

            return new SchedulerWebApiDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }
#endif
        /// <summary>
        /// Use it to configure Custom binding.
        /// </summary>
        public SchedulerCustomDataSourceBuilder<TModel> Custom()
        {
            dataSource.Type = DataSourceType.Custom;
            dataSource.Schema.Model = new ModelDescriptor(typeof(TModel));

            return new SchedulerCustomDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }

        /// <summary>
        /// Use it to configure SignalR binding.
        /// </summary>
        public SchedulerSignalRDataSourceBuilder<TModel> SignalR()
        {
            dataSource.Type = DataSourceType.Custom;
            dataSource.Schema.Model = new ModelDescriptor(typeof(TModel));

            return new SchedulerSignalRDataSourceBuilder<TModel>(dataSource);
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public SchedulerAjaxDataSourceBuilder<TModel> Model(Action<DataSourceSchedulerModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceSchedulerModelDescriptorFactory<TModel>((SchedulerModelDescriptor)dataSource.Schema.Model));

            return (SchedulerAjaxDataSourceBuilder<TModel>)this;
        }

        /// <summary>
        /// Configures the initial filter.
        /// </summary>
        public override SchedulerAjaxDataSourceBuilder<TModel> Filter(Action<DataSourceFilterDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceSchedulerFilterDescriptorFactory<TModel>(dataSource.Filters));

            return this;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override SchedulerAjaxDataSourceBuilder<TModel> Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {
            throw new MethodAccessException("Sort method is not available for Scheduler DataSource.");
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override SchedulerAjaxDataSourceBuilder<TModel> Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {
            throw new MethodAccessException("Group method is not available for Scheduler DataSource.");
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override SchedulerAjaxDataSourceBuilder<TModel> Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {
            throw new MethodAccessException("Aggregates method is not available for Scheduler DataSource.");
        }

        /// <summary>
        /// Configures the URL for Update operation.
        /// </summary>        
        public SchedulerAjaxDataSourceBuilder<TModel> Update(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Update, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Update operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        public SchedulerAjaxDataSourceBuilder<TModel> Update(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Update, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Update operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public SchedulerAjaxDataSourceBuilder<TModel> Update(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Update, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Configures the URL for Create operation.
        /// </summary> 
        public SchedulerAjaxDataSourceBuilder<TModel> Create(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Create, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Create operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public SchedulerAjaxDataSourceBuilder<TModel> Create(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Create, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Create operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public SchedulerAjaxDataSourceBuilder<TModel> Create(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Create, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Configures the URL for Destroy operation.
        /// </summary> 
        public SchedulerAjaxDataSourceBuilder<TModel> Destroy(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Destroy, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Destroy operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public SchedulerAjaxDataSourceBuilder<TModel> Destroy(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Destroy, actionName, controllerName, null);

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Destroy operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public SchedulerAjaxDataSourceBuilder<TModel> Destroy(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Destroy, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Determines if modifications will be sent to the server in batches or as individually requests.
        /// </summary>
        /// <param name="enabled">If true changes will be batched, otherwise false.</param>        
        public SchedulerAjaxDataSourceBuilder<TModel> Batch(bool enabled)
        {
            dataSource.Batch = enabled;

            return this;
        }

        /// <summary>
        /// Determines if data source would automatically sync any changes to its data items. By default changes are not automatically sync-ed.
        /// </summary>
        /// <param name="enabled">If true changes will be automatically synced, otherwise false.</param>        
        public SchedulerAjaxDataSourceBuilder<TModel> AutoSync(bool enabled)
        {
            dataSource.AutoSync = enabled;

            return this;
        }
    }
}
