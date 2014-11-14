namespace Kendo.Mvc.UI.Fluent
{
    using System.Collections.Generic;
    using System.Collections;
    using System;
    using Kendo.Mvc.Extensions;

    /// <summary>
    /// Defines the fluent API for configuring the TreeListMessagesSettings settings.
    /// </summary>
    public class TreeListMessagesSettingsBuilder<T>: IHideObjectMembers where T : class
    {
        private readonly TreeListMessagesSettings container;

        public TreeListMessagesSettingsBuilder(TreeListMessagesSettings settings)
        {
            container = settings;
        }

        //>> Fields
        
        /// <summary>
        /// Defines the text of "No records to display" message when the widget does not show any items.
        /// </summary>
        /// <param name="value">The value that configures the norows.</param>
        public TreeListMessagesSettingsBuilder<T> NoRows(string value)
        {
            container.NoRows = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of "Loading..." message when the widget loads its root-level items.
        /// </summary>
        /// <param name="value">The value that configures the loading.</param>
        public TreeListMessagesSettingsBuilder<T> Loading(string value)
        {
            container.Loading = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of "Request failed." message when the widget fails to load its root-level items.
        /// </summary>
        /// <param name="value">The value that configures the requestfailed.</param>
        public TreeListMessagesSettingsBuilder<T> RequestFailed(string value)
        {
            container.RequestFailed = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text of "Retry" message assigned to the button that tries to load root-level items again.
        /// </summary>
        /// <param name="value">The value that configures the retry.</param>
        public TreeListMessagesSettingsBuilder<T> Retry(string value)
        {
            container.Retry = value;

            return this;
        }
        
        /// <summary>
        /// Defines the text for the command buttons used across the widget.
        /// </summary>
        /// <param name="configurator">The action that configures the commands.</param>
        public TreeListMessagesSettingsBuilder<T> Commands(Action<TreeListMessagesCommandsSettingsBuilder<T>> configurator)
        {
            configurator(new TreeListMessagesCommandsSettingsBuilder<T>(container.Commands));
            return this;
        }
        
        //<< Fields
    }
}

