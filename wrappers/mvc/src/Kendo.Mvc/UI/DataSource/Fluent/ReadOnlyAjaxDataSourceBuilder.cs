using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent API for configuring a readon-only AJAX data source.
    /// </summary>
    /// <typeparam name="TModel"></typeparam>
    public class ReadOnlyAjaxDataSourceBuilder<TModel> : AjaxDataSourceBuilderBase<TModel, ReadOnlyAjaxDataSourceBuilder<TModel>>
        where TModel : class
    {
        public ReadOnlyAjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator) 
            : base(dataSource, viewContext, urlGenerator)
        {
        }

#if !MVC3
        /// <summary>
        /// Use it to configure WebApi binding.
        /// </summary>
        public ReadOnlyWebApiDataSourceBuilder<TModel> WebApi()
        {
            dataSource.Type = DataSourceType.WebApi;

            return new ReadOnlyWebApiDataSourceBuilder<TModel>(dataSource, viewContext, urlGenerator);
        }
#endif

        /// <summary>
        /// Use it to configure Custom binding.
        /// </summary>
        public ReadOnlyCustomDataSourceBuilder Custom()
        {
            dataSource.Type = DataSourceType.Custom;

            return new ReadOnlyCustomDataSourceBuilder(dataSource, viewContext, urlGenerator);
        }

        /// <summary>
        /// Use it to configure SignalR binding.
        /// </summary>
        public ReadOnlySignalRDataSourceBuilder SignalR()
        {
            dataSource.Type = DataSourceType.Custom;

            return new ReadOnlySignalRDataSourceBuilder(dataSource);
        }
    }
}
