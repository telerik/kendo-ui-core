namespace Kendo.Mvc.Infrastructure
{
    using System;
    
    public interface ICache
    {
        T Get<T>(string key, Func<T> defaultValueFactory);
        void Insert<T>(string key, T value);
        bool TryGetValue<T>(string key, out T value);
    }
}
