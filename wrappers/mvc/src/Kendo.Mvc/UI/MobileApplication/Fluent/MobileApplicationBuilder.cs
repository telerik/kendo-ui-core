namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;

    public class MobileApplicationBuilder: WidgetBuilderBase<MobileApplication, MobileApplicationBuilder>, IHideObjectMembers
    {
        private readonly MobileApplication container;
        /// <summary>
        /// Initializes a new instance of the <see cref="MobileApplication"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public MobileApplicationBuilder(MobileApplication component)
            : base(component)
        {
            container = component;
        }

        //>> Fields
        
        /// <summary>
        /// Whether to hide the browser address bar. Supported only in iPhone and iPod. Doesn't affect standalone mode as there the address bar is always hidden.
        /// </summary>
        /// <param name="value">The value that configures the hideaddressbar.</param>
        public MobileApplicationBuilder HideAddressBar(bool value)
        {
            container.HideAddressBar = value;

            return this;
        }
        
        /// <summary>
        /// Whether to update the document title.
        /// </summary>
        /// <param name="value">The value that configures the updatedocumenttitle.</param>
        public MobileApplicationBuilder UpdateDocumentTitle(bool value)
        {
            container.UpdateDocumentTitle = value;

            return this;
        }
        
        /// <summary>
        /// The id of the initial mobile View to display.
        /// </summary>
        /// <param name="value">The value that configures the initial.</param>
        public MobileApplicationBuilder Initial(string value)
        {
            container.Initial = value;

            return this;
        }
        
        /// <summary>
        /// The id of the default Application Layout.
        /// </summary>
        /// <param name="value">The value that configures the layout.</param>
        public MobileApplicationBuilder Layout(string value)
        {
            container.Layout = value;

            return this;
        }
        
        /// <summary>
        /// The text displayed in the loading popup. Setting this value to false will disable the loading popup.Note: The text should be wrapped inside <h1> tag.
        /// </summary>
        /// <param name="value">The value that configures the loading.</param>
        public MobileApplicationBuilder Loading(string value)
        {
            container.Loading = value;

            return this;
        }
        
        /// <summary>
        /// Which platform look to force on the application. Can be one of "ios", "android", "blackberry".
        /// </summary>
        /// <param name="value">The value that configures the platform.</param>
        public MobileApplicationBuilder Platform(string value)
        {
            container.Platform = value;

            return this;
        }
        
        /// <summary>
        /// If set to true, the application will not use ajax to load remote views.
        /// </summary>
        /// <param name="value">The value that configures the servernavigation.</param>
        public MobileApplicationBuilder ServerNavigation(bool value)
        {
            container.ServerNavigation = value;

            return this;
        }
        
        /// <summary>
        /// The default View transition.
        /// </summary>
        /// <param name="value">The value that configures the transition.</param>
        public MobileApplicationBuilder Transition(string value)
        {
            container.Transition = value;

            return this;
        }
        
        //<< Fields


        
    }
}

