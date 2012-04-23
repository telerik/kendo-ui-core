// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System;
    
    public interface ICache
    {
        T Get<T>(string key, Func<T> defaultValueFactory);
        void Insert<T>(string key, T value);
        bool TryGetValue<T>(string key, out T value);
    }
}
