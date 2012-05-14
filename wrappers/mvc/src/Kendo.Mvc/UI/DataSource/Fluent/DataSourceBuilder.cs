using System;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    public class DataSourceBuilder : IHideObjectMembers
    {
        private readonly DataSource dataSource;

        public DataSourceBuilder(DataSource dataSource)
        {
            this.dataSource = dataSource;
        }

        public DataSourceBuilder Read(Action<CrudOperationBuilder> configurator)
        {
            configurator(new CrudOperationBuilder(dataSource.Transport.Read));

            return this;
        }
    }
}
