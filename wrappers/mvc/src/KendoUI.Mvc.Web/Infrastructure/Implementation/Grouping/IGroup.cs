// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System.Collections;
    using System.Collections.ObjectModel;

    public interface IGroup
    {
        /// <summary>
        /// Gets the key for this group.
        /// </summary>
        /// <value>The key for this group.</value>
        object Key { get; }

        /// <summary>
        /// Gets the items in this groups.
        /// </summary>
        /// <value>The items in this group.</value>
        IEnumerable Items { get; }

        /// <summary>
        /// Gets a value indicating whether this instance has sub groups.
        /// </summary>
        /// <value>
        /// 	<c>true</c> if this instance has sub groups; otherwise, <c>false</c>.
        /// </value>
        bool HasSubgroups { get; }

        /// <summary>
        /// Gets the <see cref="Items"/> count.
        /// </summary>
        /// <value>The <see cref="Items"/> count.</value>
        int ItemCount { get; }

        /// <summary>
        /// Gets the subgroups, if <see cref="HasSubgroups"/> is true, otherwise empty collection.
        /// </summary>
        /// <value>The subgroups.</value>
        ReadOnlyCollection<IGroup> Subgroups { get; }
    }
}