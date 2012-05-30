namespace Kendo.Mvc
{
    using System;
    using Kendo.Mvc.Extensions;
    /// <summary>
    /// Represents a client-side event of a view component
    /// </summary>
    public class ClientEvent
    {
        /// <summary>
        /// An action that renders the code of the client-side handler upon execution.
        /// </summary>
        public Action CodeBlock { get; set; }

        /// <summary>
        /// A function that returns the code of the client-side handler.
        /// </summary>
        public Func<object, object> InlineCodeBlock { get; set; }

        /// <summary>
        /// The name of the client-side handler function.
        /// </summary>
        public string HandlerName { get; set; }

        public bool HasValue()
        {
            return HandlerName.HasValue() || InlineCodeBlock != null;
        }
    }
}