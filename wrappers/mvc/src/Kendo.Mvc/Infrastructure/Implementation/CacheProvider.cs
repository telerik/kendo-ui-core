namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System.Linq;
    using System.Web;
    using System.Web.Caching;
    using Extensions;
    
    internal class CacheProvider : ICacheProvider
    {
        public object Get(string key)
        {
            return HttpRuntime.Cache[key];
        }
        
        public void Insert(string key, object value)
        {
            if (key.HasValue() && value != null)
            {
                HttpRuntime.Cache.Insert(key, value);
            }
        }

        public void Insert(string key, object value, CacheItemRemovedCallback cacheItemRemovedCallback, params string[] fileDependencies)
        {
            if (key.HasValue() && value != null)
            {
                HttpRuntime.Cache.Insert(key, value, fileDependencies.Any() ? new CacheDependency(fileDependencies) : null,
                    System.Web.Caching.Cache.NoAbsoluteExpiration, System.Web.Caching.Cache.NoSlidingExpiration,
                    CacheItemPriority.Normal, cacheItemRemovedCallback);
            }
        }
    }
}
