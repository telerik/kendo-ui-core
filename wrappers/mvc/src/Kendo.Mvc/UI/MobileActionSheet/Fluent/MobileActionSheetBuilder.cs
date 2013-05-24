namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    public class MobileActionSheetBuilder: WidgetBuilderBase<MobileActionSheet, MobileActionSheetBuilder>, IHideObjectMembers
    {
        private readonly MobileActionSheet container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileActionSheet"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileActionSheetBuilder(MobileActionSheet component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// The text of the cancel button.
        /// </summary>
        /// <param name="value">The value that configures the cancel.</param>
        public MobileActionSheetBuilder Cancel(string value)
        {
            container.Cancel = value;

            return this;
        }
        
        /// <summary>
        /// Specifies the title of the actionsheet
        /// </summary>
        /// <param name="value">The value that configures the title.</param>
        public MobileActionSheetBuilder Title(string value)
        {
            container.Title = value;

            return this;
        }
        
        /// <summary>
        /// The popup configuration options (tablet only)
        /// </summary>
        /// <param name="configurator">The action that configures the popup.</param>
        public MobileActionSheetBuilder Popup(Action<MobileActionSheetPopupSettingsBuilder> configurator)
        {
            configurator(new MobileActionSheetPopupSettingsBuilder(container.Popup));
            return this;
        }
        
        /// <summary>
        /// Contains the items of the actionsheet widget
        /// </summary>
        /// <param name="configurator">The action that configures the items.</param>
        public MobileActionSheetBuilder Items(Action<MobileActionSheetItemFactory> configurator)
        {
            configurator(new MobileActionSheetItemFactory(container.Items));
            return this;
        }
        
        //<< Fields


        
        /// <summary>
        /// Configures the client-side events.
        /// </summary>
        /// <param name="configurator">The client events action.</param>
        /// <example>
        /// <code lang="CS">
        ///  &lt;%= Html.Kendo().MobileActionSheet()
        ///             .Name("MobileActionSheet")
        ///             .Events(events => events
        ///                 .Open("onOpen")
        ///             )
        /// %&gt;
        /// </code>
        /// </example>
        public MobileActionSheetBuilder Events(Action<MobileActionSheetEventBuilder> configurator)
        {

            configurator(new MobileActionSheetEventBuilder(Component.Events));

            return this;
        }
        
    }
}

