// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    /// <exclude/>
    /// <excludetoc/>
    internal interface IGridCustomGroupingWrapper
    {
        IEnumerable GroupedEnumerable { get; }
    }

    /// <exclude/>
    /// <excludetoc/>
    /// <summary>
    /// Simple wrapper used to trick the Grid's generic DataSource when custom binding is used
    /// </summary>
    /// <typeparam name="T"></typeparam>
    internal class GridCustomGroupingWrapper<T> : IEnumerable<T>, IGridCustomGroupingWrapper
    {
        public virtual IEnumerable GroupedEnumerable { get; private set; }

        public GridCustomGroupingWrapper(IEnumerable groupedEnumerable)
        {
            GroupedEnumerable = groupedEnumerable;
        }

        #region IEnumerable<T> Members

        public IEnumerator<T> GetEnumerator()
        {            
            throw new InvalidOperationException(Resources.TextResource.YouCannotCallBindToWithoutCustomBinding);            
        }

        #endregion

        #region IEnumerable Members

        System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        #endregion        
    }
}
