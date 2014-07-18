namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the TreeViewMessagesSettings settings.
    /// </summary>
    public class TreeViewMessagesSettingsBuilder: IHideObjectMembers
    {
        private readonly TreeViewMessagesSettings container;

        public TreeViewMessagesSettingsBuilder(TreeViewMessagesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// The text message shown while the root level items are loading.
        /// </summary>
        /// <param name="value">The value that configures the loading.</param>
        public TreeViewMessagesSettingsBuilder Loading(string value)
        {
            container.Loading = value;

            return this;
        }
        
        /// <summary>
        /// The text message shown in the retry button.
        /// </summary>
        /// <param name="value">The value that configures the retry.</param>
        public TreeViewMessagesSettingsBuilder Retry(string value)
        {
            container.Retry = value;

            return this;
        }
        
        /// <summary>
        /// The text message shown when an error occurs while fetching the content.
        /// </summary>
        /// <param name="value">The value that configures the requestfailed.</param>
        public TreeViewMessagesSettingsBuilder RequestFailed(string value)
        {
            container.RequestFailed = value;

            return this;
        }
        
        //<< Fields
    }
}

