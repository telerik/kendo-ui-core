namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapMarkerDefaultsTooltipAnimationSettings settings.
    /// </summary>
    public class MapMarkerDefaultsTooltipAnimationSettingsBuilder: IHideObjectMembers
    {
        private readonly MapMarkerDefaultsTooltipAnimationSettings container;

        public MapMarkerDefaultsTooltipAnimationSettingsBuilder(MapMarkerDefaultsTooltipAnimationSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The animation that will be used when a Tooltip closes.
        /// </summary>
        /// <param name="configurator">The action that configures the close.</param>
        public MapMarkerDefaultsTooltipAnimationSettingsBuilder Close(Action<MapMarkerDefaultsTooltipAnimationCloseSettingsBuilder> configurator)
        {
            configurator(new MapMarkerDefaultsTooltipAnimationCloseSettingsBuilder(container.Close));
            return this;
        }
        
        /// <summary>
        /// The animation that will be used when a Tooltip opens.
        /// </summary>
        /// <param name="configurator">The action that configures the open.</param>
        public MapMarkerDefaultsTooltipAnimationSettingsBuilder Open(Action<MapMarkerDefaultsTooltipAnimationOpenSettingsBuilder> configurator)
        {
            configurator(new MapMarkerDefaultsTooltipAnimationOpenSettingsBuilder(container.Open));
            return this;
        }
        
        //<< Fields
    }
}

