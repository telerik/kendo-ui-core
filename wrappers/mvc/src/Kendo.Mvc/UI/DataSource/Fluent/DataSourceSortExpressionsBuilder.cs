namespace Kendo.Mvc.UI.Fluent
{    
    using System;
    using Kendo.Mvc.Infrastructure;

    public class DataSourceOrderByBuilder<TModel> : IHideObjectMembers
        where TModel : class
    {
        private readonly DataSource dataSource;

        public DataSourceOrderByBuilder(DataSource dataSource)
        {
            this.dataSource = dataSource;
        }

        /// <summary>
        /// Configures the initial sort order.
        /// </summary>
        /// <param name="configurator">The configurator.</param>
        /// <returns></returns>
        public virtual DataSourceOrderByBuilder<TModel> OrderBy(Action<DataSourceSortDescriptorFactory<TModel>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new DataSourceSortDescriptorFactory<TModel>(dataSource.OrderBy));

            return this;
        }
    }
}
