namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    public class MobilePopOverPopupSettingsBuilder: IHideObjectMembers
    {
        private readonly MobilePopOverPopupSettings container;

        public MobilePopOverPopupSettingsBuilder(MobilePopOverPopupSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The height of the popup in pixels.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public MobilePopOverPopupSettingsBuilder Height(string value)
        {
            container.Height = value;

            return this;
        }
        
        /// <summary>
        /// The width of the popup in pixels
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public MobilePopOverPopupSettingsBuilder Width(string value)
        {
            container.Width = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// The height of the popup in pixels.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public MobilePopOverPopupSettingsBuilder Height(int value)
        {
            container.Height = value + "px";

            return this;
        }

        /// <summary>
        /// The width of the popup in pixels
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public MobilePopOverPopupSettingsBuilder Width(int value)
        {
            container.Width = value + "px";

            return this;
        }

        /// <summary>
        /// The direction to which the popup will expand, relative to the target that opened it
        /// </summary>
        /// <param name="value">The value that configures the direction.</param>
        public MobilePopOverPopupSettingsBuilder Direction(MobilePopupDirection value)
        {
            container.Direction = value;

            return this;
        }
    }
}

