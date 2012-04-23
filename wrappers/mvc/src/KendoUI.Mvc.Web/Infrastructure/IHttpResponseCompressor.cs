// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System.Web;

    /// <summary>
    /// Defines members that a class must implement in order to compress the response.
    /// </summary>
    public interface IHttpResponseCompressor
    {
        /// <summary>
        /// Compresses the response.
        /// </summary>
        /// <param name="context">The context.</param>
        void Compress(HttpContextBase context);
    }
}