namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Web.Mvc;

    public class GanttDataSourceBuilder<TModel> : FilterableAjaxDataSourceBuilder<TModel, GanttDataSourceBuilder<TModel>>
         where TModel : class
    {
        public GanttDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
        }

        /// <summary>
        /// Configures Model properties
        /// </summary>
        public GanttDataSourceBuilder<TModel> Model(Action<GanttModelDescriptorFactory<TModel>> configurator)
        {
            configurator(new GanttModelDescriptorFactory<TModel>((GanttModelDescriptor)dataSource.Schema.Model));

            return this;
        }
    }
}
