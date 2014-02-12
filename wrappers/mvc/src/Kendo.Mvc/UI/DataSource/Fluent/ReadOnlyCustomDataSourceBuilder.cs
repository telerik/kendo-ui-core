namespace Kendo.Mvc.UI.Fluent
{
    using System;
    using System.Web.Mvc;

    public class ReadOnlyCustomDataSourceBuilder : CustomDataSourceBuilderBase<ReadOnlyCustomDataSourceBuilder>
    {
        public ReadOnlyCustomDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        { 
        }

        /// <summary>
        /// Configures the transport of the DataSource
        /// </summary>                
        public ReadOnlyCustomDataSourceBuilder Transport(Action<ReadOnlyCustomDataSourceTransportBuilder> configurator)
        {
            configurator(new ReadOnlyCustomDataSourceTransportBuilder(dataSource.Transport, viewContext, urlGenerator));

            return this;
        }

        //Include model builder
    }
}
