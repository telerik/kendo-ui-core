namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;
    
    internal class Cache : ICache
    {
        private readonly ICacheProvider provider;
        private readonly string prefix;

        public Cache(string prefix, ICacheProvider provider)
        {
            this.provider = provider;
            this.prefix = prefix;
        }

        public T Get<T>(string key, Func<T> defaultValueFactory)
        {
            var value = provider.Get(Prefix(key));

            if (value == null)
            {
                var defaultValue = defaultValueFactory();

                Insert(key, defaultValue);

                return defaultValue;
            }

            return (T)value;
        }
        
        public void Insert<T>(string key, T value)
        {
            provider.Insert(Prefix(key), value);
        }
        
        public string Prefix(string key)
        {
            return prefix + "->" + key;
        }
        
        public bool TryGetValue<T>(string key, out T value)
        {
            object result = provider.Get(Prefix(key));
            
            if (result == null)
            {
                value = default(T);
                return false;
            }

            value = (T)result;
            
            return true;
        }
    }
}
