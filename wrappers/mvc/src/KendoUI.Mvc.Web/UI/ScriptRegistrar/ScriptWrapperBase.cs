// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Defines members that a class must implement in order to act as wrapper for script,
    /// </summary>
    public abstract class ScriptWrapperBase
    {
        /// <summary>
        /// Gets the on page load start.
        /// </summary>
        /// <value>The on page load start.</value>
        public abstract string OnPageLoadStart
        {
            get;
        }

        /// <summary>
        /// Gets the on page load end.
        /// </summary>
        /// <value>The on page load end.</value>
        public abstract string OnPageLoadEnd
        {
            get;
        }

        /// <summary>
        /// Gets the on page unload start.
        /// </summary>
        /// <value>The on page unload start.</value>
        public abstract string OnPageUnloadStart
        {
            get;
        }

        /// <summary>
        /// Gets the on page unload end.
        /// </summary>
        /// <value>The on page unload end.</value>
        public abstract string OnPageUnloadEnd
        {
            get;
        }
    }
}