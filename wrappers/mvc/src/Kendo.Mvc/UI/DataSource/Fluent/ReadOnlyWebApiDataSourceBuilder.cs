using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>    
    /// Defines the fluent interface for configuring the <see cref="DataSource"/> options.
    /// </summary>
    /// <typeparam name="TModel"></typeparam>
    public class ReadOnlyWebApiDataSourceBuilder<TModel> : WebApiDataSourceBuilderBase<TModel, ReadOnlyWebApiDataSourceBuilder<TModel>>
        where TModel : class
    {
        public ReadOnlyWebApiDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator) 
            : base(dataSource, viewContext, urlGenerator)
        {
        }
    }
}
