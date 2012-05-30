namespace Kendo.Mvc.Infrastructure.Implementation
{
    using System;

    internal class NoCache : ICache
    {
        public T Get<T>(string key, Func<T> defaultValueFactory)
        {
            return defaultValueFactory();
        }

        public void Insert<T>(string key, T value)
        {
        }

        public bool TryGetValue<T>(string key, out T value)
        {
            value = default(T);
            return false;
        }
    }
}
