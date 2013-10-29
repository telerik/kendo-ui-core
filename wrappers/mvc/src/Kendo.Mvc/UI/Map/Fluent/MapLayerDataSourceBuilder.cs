using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;

namespace Kendo.Mvc.UI.Fluent
{
    public class MapLayerDataSourceBuilder : IHideObjectMembers
    {
        private readonly DataSource dataSource;
        private readonly IUrlGenerator urlGenerator;
        private readonly ViewContext viewContext;

        public MapLayerDataSourceBuilder(DataSource dataSource, ViewContext viewContext, IUrlGenerator urlGenerator)
        {
            this.viewContext = viewContext;
            this.urlGenerator = urlGenerator;
            this.dataSource = dataSource;

            dataSource.Schema.Data = "";
            dataSource.Schema.Total = "";
            dataSource.Schema.Errors = "";
        }

        public GeoJsonDataSourceBuilder GeoJson()
        {
            return new GeoJsonDataSourceBuilder(dataSource, viewContext, urlGenerator);
        }
    }
}
