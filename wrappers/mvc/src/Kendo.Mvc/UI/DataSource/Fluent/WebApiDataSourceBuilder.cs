using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> WebApi create/update/destroy operation bindings.
    /// </summary>
    public class WebApiDataSourceBuilder<TModel> : WebApiDataSourceBuilderBase<TModel, WebApiDataSourceBuilder<TModel>>, IHideObjectMembers
        where TModel : class
    {
        public WebApiDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Configures the URL for Update operation.
        /// </summary>        
        public WebApiDataSourceBuilder<TModel> Update(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Update, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Update operation.
        /// </summary>
        /// <param name="url">Absolute or relative URL for the operation</param>
        public WebApiDataSourceBuilder<TModel> Update(string url)
        {
            dataSource.Transport.Update.Url = url; 

            return this;
        }

        /// <summary>
        /// Configures the URL for Create operation.
        /// </summary> 
        public WebApiDataSourceBuilder<TModel> Create(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Create, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller, action and routeValues for Create operation.
        /// </summary>
        /// <param name="url">Absolute or relative URL for the operation</param>
        public WebApiDataSourceBuilder<TModel> Create(string url)
        {
            dataSource.Transport.Create.Url = url;

            return this;
        }

        /// <summary>
        /// Configures the URL for Destroy operation.
        /// </summary> 
        public WebApiDataSourceBuilder<TModel> Destroy(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Destroy, viewContext, urlGenerator));

            return this;
        }

        /// <summary>
        /// Sets controller and action for Destroy operation.
        /// </summary>
        /// <param name="url">Absolute or relative URL for the operation</param>    
        public WebApiDataSourceBuilder<TModel> Destroy(string url)
        {
            dataSource.Transport.Destroy.Url = url;

            return this;
        }


        /// <summary>
        /// Determines if data source would automatically sync any changes to its data items. By default changes are not automatically sync-ed.
        /// </summary>
        /// <param name="enabled">If true changes will be automatically synced, otherwise false.</param>        
        public virtual WebApiDataSourceBuilder<TModel> AutoSync(bool enabled)
        {
            dataSource.AutoSync= enabled;

            return this;
        }
    }
}
