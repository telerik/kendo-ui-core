using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    public class MapLayerDataSourceBuilder : ReadOnlyAjaxDataSourceBuilder<object>
    {
        public MapLayerDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
            : base(dataSource, viewContext, urlGenerator)
        {
            dataSource.Schema.Data = "";
            dataSource.Schema.Total = "";
            dataSource.Schema.Errors = "";
        }

        public GeoJsonDataSourceBuilder GeoJson()
        {
            dataSource.Type = DataSourceType.GeoJson;
            return new GeoJsonDataSourceBuilder(dataSource, viewContext, urlGenerator);
        }
    }
}
