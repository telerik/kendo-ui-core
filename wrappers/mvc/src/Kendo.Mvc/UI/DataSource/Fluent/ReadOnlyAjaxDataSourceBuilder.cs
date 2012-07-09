using System;
using System.Linq;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    public class ReadOnlyAjaxDataSourceBuilder<TModel> : AjaxDataSourceBuilderBase<TModel, ReadOnlyAjaxDataSourceBuilder<TModel>>
        where TModel : class
    {
        public ReadOnlyAjaxDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator) 
            : base(dataSource, viewContext, urlGenerator)
        {
        }
    }

 
}
