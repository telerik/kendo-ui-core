// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Wrap the script for the jQuery ready/unload events.
    /// </summary>
    public class ScriptWrapper : ScriptWrapperBase
    {
        /// <summary>
        /// Gets the on page load start.
        /// </summary>
        /// <value>The on page load start.</value>
        public override string OnPageLoadStart
        {
            get
            {
                return "jQuery(document).ready(function(){";
            }
        }

        /// <summary>
        /// Gets the on page load end.
        /// </summary>
        /// <value>The on page load end.</value>
        public override string OnPageLoadEnd
        {
            get
            {
                return "});";
            }
        }

        /// <summary>
        /// Gets the on page unload start.
        /// </summary>
        /// <value>The on page unload start.</value>
        public override string OnPageUnloadStart
        {
            get
            {
                return "jQuery(window).unload(function(){";
            }
        }

        /// <summary>
        /// Gets the on page unload end.
        /// </summary>
        /// <value>The on page unload end.</value>
        public override string OnPageUnloadEnd
        {
            get
            {
                return "});";
            }
        }
    }
}