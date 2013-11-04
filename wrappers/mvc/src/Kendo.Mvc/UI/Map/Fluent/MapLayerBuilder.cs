namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;
using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayer settings.
    /// </summary>
    public class MapLayerBuilder: IHideObjectMembers
    {
        private readonly MapLayer container;

        public MapLayerBuilder(MapLayer settings)
        {
            container = settings;
        }

        /// <summary>
        /// Configures the data source of the map layer.
        /// </summary>
        /// <param name="configurator">The configuration of the data source.</param>
        /// <returns></returns>
        public MapLayerBuilder DataSource(Action<MapLayerDataSourceBuilder> configurator)
        {
            configurator(new MapLayerDataSourceBuilder(container.DataSource, null, null));

            return this;
        }

        //>> Fields
        
        /// <summary>
        /// If set to false the layer will not bind to the data source during initialization. In this case data binding will occur when the change event of the
		/// data source is fired. By default the widget will bind to the data source specified in the configuration.
        /// </summary>
        /// <param name="value">The value that configures the autobind.</param>
        public MapLayerBuilder AutoBind(bool value)
        {
            container.AutoBind = value;

            return this;
        }
        
        /// <summary>
        /// The copyright message for the layer.
        /// </summary>
        /// <param name="value">The value that configures the copyright.</param>
        public MapLayerBuilder Copyright(string value)
        {
            container.Copyright = value;

            return this;
        }
        
        /// <summary>
        /// The default style for shapes.
        /// </summary>
        /// <param name="configurator">The action that configures the style.</param>
        public MapLayerBuilder Style(Action<MapLayerStyleSettingsBuilder> configurator)
        {
            configurator(new MapLayerStyleSettingsBuilder(container.Style));
            return this;
        }
        
        /// <summary>
        /// The URL template for tile layers. Template variables:
        /// </summary>
        /// <param name="value">The value that configures the urltemplateid.</param>
        public MapLayerBuilder UrlTemplateId(string value)
        {
            container.UrlTemplateId = value;

            return this;
        }
        
        /// <summary>
        /// The layer type. Supported types are "tile" and "shape".
        /// </summary>
        /// <param name="value">The value that configures the type.</param>
        public MapLayerBuilder Type(MapLayerType value)
        {
            container.Type = value;

            return this;
        }
        
        //<< Fields
    }
}

