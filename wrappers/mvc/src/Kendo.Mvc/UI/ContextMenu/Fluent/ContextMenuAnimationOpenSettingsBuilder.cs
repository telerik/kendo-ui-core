namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the ContextMenuAnimationOpenSettings settings.
    /// </summary>
    public class ContextMenuAnimationOpenSettingsBuilder: IHideObjectMembers
    {
        private readonly ContextMenuAnimationOpenSettings container;

        public ContextMenuAnimationOpenSettingsBuilder(ContextMenuAnimationOpenSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Effect to be used when opening the popup.
        /// </summary>
        /// <param name="value">The value that configures the effects.</param>
        public ContextMenuAnimationOpenSettingsBuilder Effects(string value)
        {
            container.Effects = value;

            return this;
        }
        
        /// <summary>
        /// Defines the open animation duration in milliseconds.
        /// </summary>
        /// <param name="value">The value that configures the duration.</param>
        public ContextMenuAnimationOpenSettingsBuilder Duration(double value)
        {
            container.Duration = value;

            return this;
        }
        
        //<< Fields
    }
}

