namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the ContextMenuAnimationSettings settings.
    /// </summary>
    public class ContextMenuAnimationSettingsBuilder: IHideObjectMembers
    {
        private readonly ContextMenuAnimationSettings container;

        public ContextMenuAnimationSettingsBuilder(ContextMenuAnimationSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The animation that will be used when closing sub menus.
        /// </summary>
        /// <param name="configurator">The action that configures the close.</param>
        public ContextMenuAnimationSettingsBuilder Close(Action<ContextMenuAnimationCloseSettingsBuilder> configurator)
        {
            configurator(new ContextMenuAnimationCloseSettingsBuilder(container.Close));
            return this;
        }
        
        /// <summary>
        /// The animation that will be used when opening sub menus.
        /// </summary>
        /// <param name="configurator">The action that configures the open.</param>
        public ContextMenuAnimationSettingsBuilder Open(Action<ContextMenuAnimationOpenSettingsBuilder> configurator)
        {
            configurator(new ContextMenuAnimationOpenSettingsBuilder(container.Open));
            return this;
        }
        
        //<< Fields
    }
}

