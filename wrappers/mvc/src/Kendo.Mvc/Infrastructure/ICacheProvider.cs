namespace Kendo.Mvc.Infrastructure
{
    using System.Web.Caching;
    
    public interface ICacheProvider
    {
        object Get(string key);
        void Insert(string key, object value);
        void Insert(string key, object value, CacheItemRemovedCallback cacheItemRemovedCallback, params string[] fileDependencies);
    }
}
