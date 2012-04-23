// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;

    /// <summary>
    /// Represents a client-side event of a view component
    /// </summary>
    public class ClientEvent
    {
        /// <summary>
        /// An action that renders the code of the client-side handler upon execution.
        /// </summary>
        [Obsolete("Use CodeBlock in place of InlineCode. This property will be removed in future versions.")]
        public Action InlineCode { get; set; }

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
    }
}