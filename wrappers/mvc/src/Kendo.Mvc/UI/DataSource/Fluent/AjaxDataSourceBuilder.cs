using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> AJAX create/update/destroy operation bindings.
    /// </summary>
    public class AjaxDataSourceBuilder<TModel> : AjaxDataSourceBuilderBase<TModel, AjaxDataSourceBuilder<TModel>>, IHideObjectMembers
        where TModel : class
    {
        public AjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Configures the URL for Update operation.
        /// </summary>        
        public AjaxDataSourceBuilder<TModel> Update(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Update, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Update operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>        
        public AjaxDataSourceBuilder<TModel> Update(string actionName, string controllerName)
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
        public AjaxDataSourceBuilder<TModel> Update(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Update, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Configures the URL for Create operation.
        /// </summary> 
        public AjaxDataSourceBuilder<TModel> Create(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Create, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Create operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public AjaxDataSourceBuilder<TModel> Create(string actionName, string controllerName)
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
        public AjaxDataSourceBuilder<TModel> Create(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Create, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Configures the URL for Destroy operation.
        /// </summary> 
        public AjaxDataSourceBuilder<TModel> Destroy(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Destroy, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Destroy operation.
        /// </summary>
        /// <param name="actionName">Action name</param>
        /// <param name="controllerName">Controller Name</param>                
        public AjaxDataSourceBuilder<TModel> Destroy(string actionName, string controllerName)
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
        public AjaxDataSourceBuilder<TModel> Destroy(string actionName, string controllerName, object routeValues)
        {
            SetOperationUrl(dataSource.Transport.Destroy, actionName, controllerName, routeValues);

            return this;
        }

        /// <summary>
        /// Determines if modifications will be sent to the server in batches or as individually requests.
        /// </summary>
        /// <param name="enabled">If true changes will be batched, otherwise false.</param>        
        public virtual AjaxDataSourceBuilder<TModel> Batch(bool enabled)
        {
            dataSource.Batch = enabled;

            return this;
        }
    }
}
