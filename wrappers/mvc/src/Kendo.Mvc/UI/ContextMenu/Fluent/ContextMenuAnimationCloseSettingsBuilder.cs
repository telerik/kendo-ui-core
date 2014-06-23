namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the ContextMenuAnimationCloseSettings settings.
    /// </summary>
    public class ContextMenuAnimationCloseSettingsBuilder: IHideObjectMembers
    {
        private readonly ContextMenuAnimationCloseSettings container;

        public ContextMenuAnimationCloseSettingsBuilder(ContextMenuAnimationCloseSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Effect to be used when closing the popup.
        /// </summary>
        /// <param name="value">The value that configures the effects.</param>
        public ContextMenuAnimationCloseSettingsBuilder Effects(string value)
        {
            container.Effects = value;

            return this;
        }
        
        /// <summary>
        /// Defines the close animation duration in milliseconds.
        /// </summary>
        /// <param name="value">The value that configures the duration.</param>
        public ContextMenuAnimationCloseSettingsBuilder Duration(double value)
        {
            container.Duration = value;

            return this;
        }
        
        //<< Fields
    }
}

