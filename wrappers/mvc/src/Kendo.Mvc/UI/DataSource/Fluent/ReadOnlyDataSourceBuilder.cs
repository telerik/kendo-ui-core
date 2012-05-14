using System;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    public class ReadOnlyDataSourceBuilder : IHideObjectMembers
    {
        private readonly DataSource dataSource;

        public ReadOnlyDataSourceBuilder(DataSource dataSource)
        {
            this.dataSource = dataSource;
        }
    }
}
