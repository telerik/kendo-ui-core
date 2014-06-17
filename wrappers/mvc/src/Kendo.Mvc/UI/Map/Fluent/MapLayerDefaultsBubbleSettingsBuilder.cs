namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapLayerDefaultsBubbleSettings settings.
    /// </summary>
    public class MapLayerDefaultsBubbleSettingsBuilder: IHideObjectMembers
    {
        private readonly MapLayerDefaultsBubbleSettings container;

        public MapLayerDefaultsBubbleSettingsBuilder(MapLayerDefaultsBubbleSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The attribution for all bubble layers.
        /// </summary>
        /// <param name="value">The value that configures the attribution.</param>
        public MapLayerDefaultsBubbleSettingsBuilder Attribution(string value)
        {
            container.Attribution = value;

            return this;
        }
        
        /// <summary>
        /// The the opacity of all bubble layers.
        /// </summary>
        /// <param name="value">The value that configures the opacity.</param>
        public MapLayerDefaultsBubbleSettingsBuilder Opacity(double value)
        {
            container.Opacity = value;

            return this;
        }
        
        /// <summary>
        /// The maximum symbol size for bubble layer symbols.
        /// </summary>
        /// <param name="value">The value that configures the maxsize.</param>
        public MapLayerDefaultsBubbleSettingsBuilder MaxSize(double value)
        {
            container.MaxSize = value;

            return this;
        }
        
        /// <summary>
        /// The minimum symbol size for bubble layer symbols.
        /// </summary>
        /// <param name="value">The value that configures the minsize.</param>
        public MapLayerDefaultsBubbleSettingsBuilder MinSize(double value)
        {
            container.MinSize = value;

            return this;
        }
        
        /// <summary>
        /// The default style for bubble layer symbols.
        /// </summary>
        /// <param name="configurator">The action that configures the style.</param>
        public MapLayerDefaultsBubbleSettingsBuilder Style(Action<MapLayerDefaultsBubbleStyleSettingsBuilder> configurator)
        {
            configurator(new MapLayerDefaultsBubbleStyleSettingsBuilder(container.Style));
            return this;
        }
        
        /// <summary>
        /// The bubble layer symbol type. Supported symbols are "circle" and "square".
        /// </summary>
        /// <param name="value">The value that configures the symbol.</param>
        public MapLayerDefaultsBubbleSettingsBuilder Symbol(MapSymbol value)
        {
            container.Symbol = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// The bubble layer symbol type. The "circle" and "square" symbols are predefined.
        /// </summary>
        /// <param name="value">The value that configures the symbol.</param>
        public MapLayerDefaultsBubbleSettingsBuilder Symbol(string symbol)
        {
            container.SymbolName = symbol;

            return this;
        }

        /// <summary>
        /// A client-side function to invoke that will draw the symbol.
        /// </summary>
        /// <param name="handler">The name of the JavaScript function that will draw the symbol.</param>
        public MapLayerDefaultsBubbleSettingsBuilder SymbolHandler(string handler)
        {
            container.SymbolHandler = new ClientHandlerDescriptor { HandlerName = handler };

            return this;
        }
    }
}

