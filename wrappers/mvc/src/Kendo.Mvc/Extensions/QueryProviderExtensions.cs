namespace Kendo.Mvc.Extensions
{
    using System.Linq;

    internal static class QueryProviderExtensions
    {
        public static bool IsEntityFrameworkProvider(this IQueryProvider provider)
        {
            return provider.GetType().FullName == "System.Data.Objects.ELinq.ObjectQueryProvider" || 
                provider.GetType().FullName.StartsWith("System.Data.Entity.Internal.Linq");
        }

        public static bool IsLinqToObjectsProvider(this IQueryProvider provider)
        {
            return provider.GetType().FullName.Contains("EnumerableQuery");
        }
    }
}