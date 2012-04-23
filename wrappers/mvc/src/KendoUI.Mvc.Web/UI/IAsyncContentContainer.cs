// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Defines whether one navigation item can have content loaded asynchroniously.
    /// </summary>
    public interface IAsyncContentContainer
    {
        /// <summary>
        /// Url, which will be used as a destination for the Ajax request.
        /// </summary>
        string ContentUrl
        {
            get;
            set;
        }
    }
}