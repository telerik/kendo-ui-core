namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the MobilePopOverPaneSettings settings.
    /// </summary>
    public class MobilePopOverPaneSettingsBuilder: IHideObjectMembers
    {
        private readonly MobilePopOverPaneSettings container;

        public MobilePopOverPaneSettingsBuilder(MobilePopOverPaneSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The id of the initial mobile View to display.
        /// </summary>
        /// <param name="value">The value that configures the initial.</param>
        public MobilePopOverPaneSettingsBuilder Initial(string value)
        {
            container.Initial = value;

            return this;
        }
        
        /// <summary>
        /// The id of the default Pane Layout.
        /// </summary>
        /// <param name="value">The value that configures the layout.</param>
        public MobilePopOverPaneSettingsBuilder Layout(string value)
        {
            container.Layout = value;

            return this;
        }
        
        /// <summary>
        /// The text displayed in the loading popup. Setting this value to false will disable the loading popup.
        /// </summary>
        /// <param name="value">The value that configures the loading.</param>
        public MobilePopOverPaneSettingsBuilder Loading(string value)
        {
            container.Loading = value;

            return this;
        }
        
        /// <summary>
        /// The default View transition.
        /// </summary>
        /// <param name="value">The value that configures the transition.</param>
        public MobilePopOverPaneSettingsBuilder Transition(string value)
        {
            container.Transition = value;

            return this;
        }
        
        //<< Fields

        
    }
}

