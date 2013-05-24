namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    public class MobileActionSheetItemBuilder: IHideObjectMembers
    {
        private readonly MobileActionSheetItem container;

        public MobileActionSheetItemBuilder(MobileActionSheetItem settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Specifies the name of the handler that will be executed when the item is clicked
        /// </summary>
        /// <param name="value">The value that configures the action.</param>
        public MobileActionSheetItemBuilder Action(string value)
        {
            container.Action = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the text of the item
        /// </summary>
        /// <param name="value">The value that configures the text.</param>
        public MobileActionSheetItemBuilder Text(string value)
        {
            container.Text = value;

            return this;
        }
        
        //<< Fields
    }
}

