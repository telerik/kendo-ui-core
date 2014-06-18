namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    public class GanttDependenciesDataSourceBuilder<TModel> : FilterableAjaxDataSourceBuilder<TModel, GanttDependenciesDataSourceBuilder<TModel>>
         where TModel : class
    {
        public GanttDependenciesDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public GanttDependenciesDataSourceBuilder<TModel> Model(Action<GanttDependenciesModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new GanttDependenciesModelDescriptorFactory<TModel>((GanttDependenciesModelDescriptor)dataSource.Schema.Model));

            return this;
        }
    }
}
