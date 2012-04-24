namespace KendoUI.Mvc.Infrastructure
{
    using System;
    using System.Collections;
    using System.Linq;
    using KendoUI.Mvc.Extensions;
    
    internal static class QueryableFactory
    {
        /// <exception cref="ArgumentNullException"><c>source</c> is null.</exception>
        internal static IQueryable CreateQueryable(IEnumerable source)
        {
            if (source == null)
            {
                throw new ArgumentNullException("source");
            }

            IQueryable queryable = source as IQueryable;

            if (queryable != null)
            {
                return queryable;
            }

            IEnumerable genericEnumerableSource = source.AsGenericEnumerable();
            return genericEnumerableSource.AsQueryable();
        }
    }
}