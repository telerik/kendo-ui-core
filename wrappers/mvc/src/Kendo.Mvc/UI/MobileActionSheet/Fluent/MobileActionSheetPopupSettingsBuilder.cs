namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    public class MobileActionSheetPopupSettingsBuilder: IHideObjectMembers
    {
        private readonly MobileActionSheetPopupSettings container;

        public MobileActionSheetPopupSettingsBuilder(MobileActionSheetPopupSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The direction to which the popup will expand, relative to the target that opened it
        /// </summary>
        /// <param name="value">The value that configures the direction.</param>
        public MobileActionSheetPopupSettingsBuilder Direction(MobileActionSheetPopupDirection value)
        {
            container.Direction = value;

            return this;
        }
        
        /// <summary>
        /// The height of the popup in pixels.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public MobileActionSheetPopupSettingsBuilder Height(string value)
        {
            container.Height = value;

            return this;
        }
        
        /// <summary>
        /// The width of the popup in pixels
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public MobileActionSheetPopupSettingsBuilder Width(string value)
        {
            container.Width = value;

            return this;
        }
        
        //<< Fields

        /// <summary>
        /// The height of the popup in pixels.
        /// </summary>
        /// <param name="value">The value that configures the height.</param>
        public MobileActionSheetPopupSettingsBuilder Height(int value)
        {
            container.Height = value + "px";

            return this;
        }

        /// <summary>
        /// The width of the popup in pixels
        /// </summary>
        /// <param name="value">The value that configures the width.</param>
        public MobileActionSheetPopupSettingsBuilder Width(int value)
        {
            container.Width = value + "px";

            return this;
        }
    }
}

