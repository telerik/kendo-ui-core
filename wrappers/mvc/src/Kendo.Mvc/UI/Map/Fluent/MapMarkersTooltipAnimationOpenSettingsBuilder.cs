namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MapMarkersTooltipAnimationOpenSettings settings.
    /// </summary>
    public class MapMarkersTooltipAnimationOpenSettingsBuilder: IHideObjectMembers
    {
        private readonly MapMarkersTooltipAnimationOpenSettings container;

        public MapMarkersTooltipAnimationOpenSettingsBuilder(MapMarkersTooltipAnimationOpenSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Effect to be used for opening of the Tooltip.
        /// </summary>
        /// <param name="value">The value that configures the effects.</param>
        public MapMarkersTooltipAnimationOpenSettingsBuilder Effects(string value)
        {
            container.Effects = value;

            return this;
        }
        
        /// <summary>
        /// Defines the animation duration.
        /// </summary>
        /// <param name="value">The value that configures the duration.</param>
        public MapMarkersTooltipAnimationOpenSettingsBuilder Duration(double value)
        {
            container.Duration = value;

            return this;
        }
        
        //<< Fields
    }
}

