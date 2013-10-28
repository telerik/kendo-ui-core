namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

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

        //>> Fields
        
        /// <summary>
        /// The configuration of the map layers.
		/// The layer type is determined by the value of the type field.
        /// </summary>
        /// <param name="configurator">The action that configures the layer.</param>
        public MapLayerBuilder Layer(Action<MapLayerBuilder> configurator)
        {
            configurator(new MapLayerBuilder(container.Layer));
            return this;
        }
        
        //<< Fields

        
        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MapLayerBuilder HtmlAttributes(object attributes)
        {
            return HtmlAttributes(attributes.ToDictionary());
        }

        /// <summary>
        /// Sets the HTML attributes.
        /// </summary>
        /// <param name="attributes">The HTML attributes.</param>
        /// <returns></returns>
        public virtual MapLayerBuilder HtmlAttributes(IDictionary<string, object> attributes)
        {

            container.HtmlAttributes.Clear();
            container.HtmlAttributes.Merge(attributes);

            return this;
        }
        
    }
}

