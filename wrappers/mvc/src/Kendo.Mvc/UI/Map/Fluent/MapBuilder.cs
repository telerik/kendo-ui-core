namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using System.Web.Mvc;

    /// <summary>
    /// Defines the fluent API for configuring the Kendo Map for ASP.NET MVC.
    /// </summary>
    public class MapBuilder: WidgetBuilderBase<Map, MapBuilder>, IHideObjectMembers
    {
        private readonly Map container;

        /// <summary>
        /// Initializes a new instance of the <see cref="Map"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MapBuilder(Map component)
            : base(component)
        {
            container = component;
        }

        /// <summary>
        /// Configures the center of the map.
        /// </summary>
        /// <param name="latitude">The latitude</param>
        /// <param name="longtitude">The longtitude</param>
        public MapBuilder Center(double latitude, double longtitude)
        {
            container.Center = new[] { latitude, longtitude };

            return this;
        }

        //>> Fields
        
        /// <summary>
        /// The configuration of built-in map controls.
        /// </summary>
        /// <param name="configurator">The action that configures the controls.</param>
        public MapBuilder Controls(Action<MapControlsSettingsBuilder> configurator)
        {
            configurator(new MapControlsSettingsBuilder(container.Controls));
            return this;
        }
        
        /// <summary>
        /// The default configuration for map layers by type.
        /// </summary>
        /// <param name="configurator">The action that configures the layerdefaults.</param>
        public MapBuilder LayerDefaults(Action<MapLayerDefaultsSettingsBuilder> configurator)
        {
            configurator(new MapLayerDefaultsSettingsBuilder(container.LayerDefaults));
            return this;
        }
        
        /// <summary>
        /// The configuration of the map layers.
		/// The layer type is determined by the value of the type field.
        /// </summary>
        /// <param name="configurator">The action that configures the layers.</param>
        public MapBuilder Layers(Action<MapLayerFactory> configurator)
        {
            configurator(new MapLayerFactory(container.Layers, container.ViewContext, container.UrlGenerator));
            return this;
        }

        /// <summary>
        /// The configuration of the map markers.
        /// </summary>
        /// <param name="configurator">The action that configures the markers.</param>
        public MapBuilder Markers(Action<MapMarkerFactory> configurator)
        {
            configurator(new MapMarkerFactory(container));
            return this;
        }
        
        /// <summary>
        /// The default options for all markers.
        /// </summary>
        /// <param name="configurator">The action that configures the markerdefaults.</param>
        public MapBuilder MarkerDefaults(Action<MapMarkerDefaultsSettingsBuilder> configurator)
        {
            configurator(new MapMarkerDefaultsSettingsBuilder(container.MarkerDefaults));
            return this;
        }
        
        /// <summary>
        /// The minimum zoom level.
		/// Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).
        /// </summary>
        /// <param name="value">The value that configures the minzoom.</param>
        public MapBuilder MinZoom(double value)
        {
            container.MinZoom = value;

            return this;
        }
        
        /// <summary>
        /// The maximum zoom level.
		/// Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).
        /// </summary>
        /// <param name="value">The value that configures the maxzoom.</param>
        public MapBuilder MaxZoom(double value)
        {
            container.MaxZoom = value;

            return this;
        }
        
        /// <summary>
        /// The size of the map in pixels at zoom level 0.
        /// </summary>
        /// <param name="value">The value that configures the minsize.</param>
        public MapBuilder MinSize(double value)
        {
            container.MinSize = value;

            return this;
        }
        
        /// <summary>
        /// Specifies whether the map should wrap around the east-west edges.
        /// </summary>
        /// <param name="value">The value that configures the wraparound.</param>
        public MapBuilder Wraparound(bool value)
        {
            container.Wraparound = value;

            return this;
        }
        
        /// <summary>
        /// The initial zoom level.Typical web maps use zoom levels from 0 (whole world) to 19 (sub-meter features).The map size is derived from the zoom level and minScale options: size = (2 ^ zoom) * minSize
        /// </summary>
        /// <param name="value">The value that configures the zoom.</param>
        public MapBuilder Zoom(double value)
        {
            container.Zoom = value;

            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().Map()
        ///             .Name("Map")
        ///             .Events(events => events
        ///                 .Click("onClick")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MapBuilder Events(Action<MapEventBuilder> configurator)
        {

            configurator(new MapEventBuilder(Component.Events));

            return this;
        }
        
    }
}

