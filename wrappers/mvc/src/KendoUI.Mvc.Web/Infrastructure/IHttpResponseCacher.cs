// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System;
    using System.Web;

    /// <summary>
    /// Defines members that must be implemented for cache the http response
    /// </summary>
    public interface IHttpResponseCacher
    {
        /// <summary>
        /// Caches the response for the specified duration.
        /// </summary>
        /// <param name="context">The context.</param>
        /// <param name="duration">The duration.</param>
        void Cache(HttpContextBase context, TimeSpan duration);
    }
}