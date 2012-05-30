namespace Kendo.Mvc.Extensions
{
    using System.Collections.Generic;
    using Infrastructure;

    public static class CollectionExtensions
    {
        public static void AddRange<T>(this ICollection<T> instance, IEnumerable<T> collection)
        {

            foreach (T item in collection)
            {
                instance.Add(item);
            }
        }
    }
}