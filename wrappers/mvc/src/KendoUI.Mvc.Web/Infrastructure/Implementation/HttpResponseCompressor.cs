// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System.IO.Compression;
    using System.Web;

    /// <summary>
    /// Encapsulates the HTTP intrinsic object that compress the response
    /// </summary>
    public class HttpResponseCompressor : IHttpResponseCompressor
    {
        /// <summary>
        /// Compresses the response.
        /// </summary>
        /// <param name="context">The context.</param>
        public void Compress(HttpContextBase context)
        {
            Guard.IsNotNull(context, "context");

            string acceptEncoding;

            if (CanCompress(context, out acceptEncoding))
            {
                HttpResponseBase response = context.Response;

                if (acceptEncoding.Contains("GZIP"))
                {
                    response.AppendHeader("Content-encoding", "gzip");
                    response.Filter = new GZipStream(response.Filter, CompressionMode.Compress);
                }
                else if (acceptEncoding.Contains("DEFLATE"))
                {
                    response.AppendHeader("Content-encoding", "deflate");
                    response.Filter = new DeflateStream(response.Filter, CompressionMode.Compress);
                }
            }
        }

        private static bool CanCompress(HttpContextBase context, out string encoding)
        {
            encoding = (context.Request.Headers["Accept-Encoding"] ?? string.Empty).ToUpperInvariant();
            bool ie6 = (context.Request.Browser.MajorVersion < 7) && context.Request.Browser.IsBrowser("IE");

            return !ie6 && (encoding.Contains("GZIP") || encoding.Contains("DEFLATE"));
        }
    }
}