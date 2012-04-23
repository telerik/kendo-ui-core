// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.Web;
    using System.Web.Mvc;
    using System.Web.Routing;

    using Extensions;

    /// <summary>
    /// Class used to resolve relative path for virtual path.
    /// </summary>
    public class UrlResolver : IUrlResolver
    {
        /// <summary>
        /// Returns the relative path for the specified virtual path.
        /// </summary>
        /// <param name="url">The URL.</param>
        /// <returns></returns>
        public string Resolve(string url)
        {
            HttpContextBase httpContext = new HttpContextWrapper(HttpContext.Current);
            RequestContext requestContext = httpContext.RequestContext();
            UrlHelper helper = new UrlHelper(requestContext);

            string query;

            url = StripQuery(url, out query);

            return helper.Content(url) + query;
        }

        private static string StripQuery(string path, out string query)
        {
            int queryIndex = path.IndexOf('?');

            if (queryIndex >= 0)
            {
                query = path.Substring(queryIndex);

                return path.Substring(0, queryIndex);
            }

            query = null;

            return path;
        }
    }
}