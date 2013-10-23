using System;
using System.Linq;

namespace Kendo.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for configuring the column menu messages.
    /// </summary>
    public class ColumnMenuMessagesBuilder : IHideObjectMembers
    {
        private readonly ColumnMenuMessages messages;

        public ColumnMenuMessagesBuilder(ColumnMenuMessages messages)
        {
            this.messages = messages;
        }

        /// <summary>
        /// Sets the text displayed for filter menu option.
        /// </summary>
        /// <param name="message">The message</param>        
        public ColumnMenuMessagesBuilder Filter(string message)
        {
            messages.Filter = message;

            return this;
        }

        /// <summary>
        /// Sets the text displayed for columns menu option.
        /// </summary>
        /// <param name="message">The message</param>        
        public ColumnMenuMessagesBuilder Columns(string message)
        {
            messages.Columns = message;

            return this;
        }

        /// <summary>
        /// Sets the text displayed for sort ascending menu option.
        /// </summary>
        /// <param name="message">The message</param>        
        public ColumnMenuMessagesBuilder SortAscending(string message)
        {
            messages.SortAscending = message;

            return this;
        }

        /// <summary>
        /// Sets the text displayed for sort descending menu option.
        /// </summary>
        /// <param name="message">The message</param>        
        public ColumnMenuMessagesBuilder SortDescending(string message)
        {
            messages.SortDescending = message;

            return this;
        }

        /// <summary>
        /// Sets the text displayed for done menu button.
        /// </summary>
        /// <param name="message">The message</param>        
        public ColumnMenuMessagesBuilder Done(string message)
        {
            messages.Done = message;

            return this;
        }

        /// <summary>
        /// Sets the text displayed for menu header.
        /// </summary>
        /// <param name="message">The message</param>        
        public ColumnMenuMessagesBuilder ColumnSettings(string message)
        {
            messages.ColumnSettings = message;

            return this;
        }
    }
}