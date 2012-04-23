// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;
    using System.Web;

    internal class HttpResponseCacher : IHttpResponseCacher
    {
        public void Cache(HttpContextBase context, TimeSpan duration)
        {
            if ((duration > TimeSpan.Zero) || !context.IsDebuggingEnabled)
            {
                HttpCachePolicyBase cache = context.Response.Cache;

                cache.SetCacheability(HttpCacheability.Public);
                cache.SetOmitVaryStar(true);
                cache.SetExpires(context.Timestamp.Add(duration));
                cache.SetMaxAge(duration);
                cache.SetValidUntilExpires(true);
                cache.SetLastModified(context.Timestamp);
                cache.SetLastModifiedFromFileDependencies();
                cache.SetRevalidation(HttpCacheRevalidation.AllCaches);
            }
        }
    }
}