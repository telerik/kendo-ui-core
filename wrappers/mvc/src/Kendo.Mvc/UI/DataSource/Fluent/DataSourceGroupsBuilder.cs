using System;
using Kendo.Mvc.Infrastructure;
namespace Kendo.Mvc.UI.Fluent
{
    public class DataSourceGroupsBuilder<TModel> : IHideObjectMembers 
        where TModel : class
    {
        private readonly DataSource dataSource;

        public DataSourceGroupsBuilder(DataSource dataSource)
        {
            this.dataSource = dataSource;
        }

        public DataSourceGroupsBuilder<TModel> GroupBy(Action<DataSourceGroupDescriptorFactory<TModel>> configurator)
        {
            Guard.IsNotNull(configurator, "configurator");

            configurator(new DataSourceGroupDescriptorFactory<TModel>(dataSource.Groups));

            return this;
        }
    }
}
