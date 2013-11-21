namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapMarkersTooltipAnimationSettings settings.
    /// </summary>
    public class MapMarkersTooltipAnimationSettingsBuilder: IHideObjectMembers
    {
        private readonly MapMarkersTooltipAnimationSettings container;

        public MapMarkersTooltipAnimationSettingsBuilder(MapMarkersTooltipAnimationSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The animation that will be used when a Tooltip closes.
        /// </summary>
        /// <param name="configurator">The action that configures the close.</param>
        public MapMarkersTooltipAnimationSettingsBuilder Close(Action<MapMarkersTooltipAnimationCloseSettingsBuilder> configurator)
        {
            configurator(new MapMarkersTooltipAnimationCloseSettingsBuilder(container.Close));
            return this;
        }
        
        /// <summary>
        /// The animation that will be used when a Tooltip opens.
        /// </summary>
        /// <param name="configurator">The action that configures the open.</param>
        public MapMarkersTooltipAnimationSettingsBuilder Open(Action<MapMarkersTooltipAnimationOpenSettingsBuilder> configurator)
        {
            configurator(new MapMarkersTooltipAnimationOpenSettingsBuilder(container.Open));
            return this;
        }
        
        //<< Fields
    }
}

