namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    public class FilterableAjaxDataSourceBuilder<TModel, TDataSourceBuilder> : AjaxDataSourceBuilderBase<TModel, TDataSourceBuilder>, IHideObjectMembers
         where TModel : class
         where TDataSourceBuilder: FilterableAjaxDataSourceBuilder<TModel, TDataSourceBuilder>
    {
        public FilterableAjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

#if !MVC3
        /// <summary>
        /// Use it to configure WebApi binding.
        /// </summary>        
        public FilterableWebApiDataSourceBuilder<TModel> WebApi()
        {
            dataSource.Type = DataSourceType.WebApi;

            return new FilterableWebApiDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }
#endif
        /// <summary>
        /// Use it to configure Custom binding.
        /// </summary>
        public FilterableCustomDataSourceBuilder<TModel> Custom()
        {
            dataSource.Type = DataSourceType.Custom;
            dataSource.Schema.Model = new ModelDescriptor(typeof(TModel));

            return new FilterableCustomDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }

        /// <summary>
        /// Use it to configure SignalR binding.
        /// </summary>
        public FilterableSignalRDataSourceBuilder<TModel> SignalR()
        {
            dataSource.Type = DataSourceType.Custom;
            dataSource.Schema.Model = new ModelDescriptor(typeof(TModel));

            return new FilterableSignalRDataSourceBuilder<TModel>(dataSource);
        }

        /// <summary>
        /// Configures the initial filter.
        /// </summary>
        public override TDataSourceBuilder Filter(Action<DataSourceFilterDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceSchedulerFilterDescriptorFactory<TModel>(dataSource.Filters));

            return (TDataSourceBuilder)this;
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override TDataSourceBuilder Sort(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {
            throw new MethodAccessException("Sort method is not available for Scheduler DataSource.");
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override TDataSourceBuilder Group(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {
            throw new MethodAccessException("Group method is not available for Scheduler DataSource.");
        }

        [EditorBrowsable(EditorBrowsableState.Never)]
        public override TDataSourceBuilder Aggregates(Action<DataSourceAggregateDescriptorFactory<TModel>> aggregates)
        {
            throw new MethodAccessException("Aggregates method is not available for Scheduler DataSource.");
        }

        /// <summary>
        /// Configures the URL for Update operation.
        /// </summary>        
        public TDataSourceBuilder Update(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Update, viewContext, urlGenerator));

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets controller and action for Update operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        public TDataSourceBuilder Update(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Update, actionName, controllerName, null);

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Update operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public TDataSourceBuilder Update(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Update, actionName, controllerName, routeValues);

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Configures the URL for Create operation.
        /// </summary> 
        public TDataSourceBuilder Create(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Create, viewContext, urlGenerator));

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets controller and action for Create operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public TDataSourceBuilder Create(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Create, actionName, controllerName, null);

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Create operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public TDataSourceBuilder Create(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Create, actionName, controllerName, routeValues);

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Configures the URL for Destroy operation.
        /// </summary> 
        public TDataSourceBuilder Destroy(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Destroy, viewContext, urlGenerator));

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets controller and action for Destroy operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public TDataSourceBuilder Destroy(string actionName, string controllerName)
        {
            SetOperationUrl(dataSource.Transport.Destroy, actionName, controllerName, null);

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Destroy operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        /// <param name="routeValues">Route values</param>
        public TDataSourceBuilder Destroy(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Destroy, actionName, controllerName, routeValues);

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Determines if modifications will be sent to the server in batches or as individually requests.
        /// </summary>
        /// <param name="enabled">If true changes will be batched, otherwise false.</param>        
        public TDataSourceBuilder Batch(bool enabled)
        {
            dataSource.Batch = enabled;

            return (TDataSourceBuilder)this;
        }

        /// <summary>
        /// Determines if data source would automatically sync any changes to its data items. By default changes are not automatically sync-ed.
        /// </summary>
        /// <param name="enabled">If true changes will be automatically synced, otherwise false.</param>        
        public TDataSourceBuilder AutoSync(bool enabled)
        {
            dataSource.AutoSync = enabled;

            return (TDataSourceBuilder)this;
        }
    }
}