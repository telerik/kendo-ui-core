// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System;
    using System.Collections;
    using System.Linq;
    using Telerik.Web.Mvc.Extensions;
    
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