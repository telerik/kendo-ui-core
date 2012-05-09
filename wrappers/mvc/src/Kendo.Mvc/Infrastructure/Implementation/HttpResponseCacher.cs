namespace Kendo.Mvc.Infrastructure.Implementation
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