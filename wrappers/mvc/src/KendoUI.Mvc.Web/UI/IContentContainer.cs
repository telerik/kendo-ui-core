// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections.Generic;

    /// <summary>
    /// Defines whether one navigation item can have content output immediately
    /// </summary>
    public interface IContentContainer
    {
        /// <summary>
        /// The HtmlAttributes which will be added to the wrapper of the content.
        /// </summary>
        IDictionary<string, object> ContentHtmlAttributes
        {
            get;
        }

        /// <summary>
        /// The action which will output the content.
        /// </summary>
        Action Content
        {
            get;
            set;
        }
    }
}