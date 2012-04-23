// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Extensions
{
    using System;
    using System.Web;

    /// <summary>
    /// Contains extension methods of <see cref="HttpRequestBase"/>.
    /// </summary>
    public static class HttpRequestBaseExtensions
    {
        /// <summary>
        /// Get the Application root path.
        /// </summary>
        /// <param name="instance">The instance.</param>
        /// <returns></returns>
        public static string ApplicationRoot(this HttpRequestBase instance)
        {
            string applicationPath = instance.Url.GetLeftPart(UriPartial.Authority) + instance.ApplicationPath;

            // Remove the last /
            if (applicationPath.EndsWith("/", StringComparison.Ordinal))
            {
                applicationPath = applicationPath.Substring(0, applicationPath.Length - 1);
            }

            return applicationPath;
        }

        /// <summary>
        /// Determines whether this instance can compress the specified instance.
        /// </summary>
        /// <param name="instance">The instance.</param>
        /// <returns>
        /// 	<c>true</c> if this instance can compress the specified instance; otherwise, <c>false</c>.
        /// </returns>
        public static bool CanCompress(this HttpRequestBase instance)
        {
            string encoding = (instance.Headers["Accept-Encoding"] ?? string.Empty).ToUpperInvariant();
            bool ie6 = (instance.Browser.MajorVersion < 7) && instance.Browser.IsBrowser("IE");

            return !ie6 && (encoding.Contains("GZIP") || encoding.Contains("DEFLATE"));
        }
    }
}