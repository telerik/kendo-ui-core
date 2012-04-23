// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.Infrastructure.Implementation
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
