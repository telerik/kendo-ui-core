namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    public class TreeListAjaxDataSourceBuilder<TModel> : AjaxDataSourceBuilderBase<TModel, TreeListAjaxDataSourceBuilder<TModel>>, IHideObjectMembers
        where TModel : class        
    {
        public TreeListAjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public TreeListAjaxDataSourceBuilder<TModel> Model(Action<DataSourceTreeListModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new DataSourceTreeListModelDescriptorFactory<TModel>((TreeListModelDescriptor)dataSource.Schema.Model));

            return (TreeListAjaxDataSourceBuilder<TModel>)this;
        }

        /// <summary>
        /// Configures the URL for Update operation.
        /// </summary>        
        public TreeListAjaxDataSourceBuilder<TModel> Update(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Update, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Update operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        public TreeListAjaxDataSourceBuilder<TModel> Update(string actionName, string controllerName)
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
        public TreeListAjaxDataSourceBuilder<TModel> Update(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Update, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Configures the URL for Create operation.
        /// </summary> 
        public TreeListAjaxDataSourceBuilder<TModel> Create(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Create, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Create operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public TreeListAjaxDataSourceBuilder<TModel> Create(string actionName, string controllerName)
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
        public TreeListAjaxDataSourceBuilder<TModel> Create(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Create, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Configures the URL for Destroy operation.
        /// </summary> 
        public TreeListAjaxDataSourceBuilder<TModel> Destroy(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Destroy, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Destroy operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public TreeListAjaxDataSourceBuilder<TModel> Destroy(string actionName, string controllerName)
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
        public TreeListAjaxDataSourceBuilder<TModel> Destroy(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Destroy, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Determines if modifications will be sent to the server in batches or as individually requests.
        /// </summary>
        /// <param name="enabled">If true changes will be batched, otherwise false.</param>        
        public virtual TreeListAjaxDataSourceBuilder<TModel> Batch(bool enabled)
        {
            dataSource.Batch = enabled;

            return this;
        }

        /// <summary>
        /// Determines if data source would automatically sync any changes to its data items. By default changes are not automatically sync-ed.
        /// </summary>
        /// <param name="enabled">If true changes will be automatically synced, otherwise false.</param>        
        public virtual TreeListAjaxDataSourceBuilder<TModel> AutoSync(bool enabled)
        {
            dataSource.AutoSync = enabled;

            return this;
        }
    }
}
