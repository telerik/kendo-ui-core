// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Linq;
    using System.Web.Script.Serialization;
    using System.Runtime.Serialization;
    
    public class Group : IGroup
    {        
        private ReadOnlyCollection<IGroup> subgroups;

        /// <summary>
        /// Gets a value indicating whether this instance has any sub groups.
        /// </summary>
        /// <value>
        /// 	<c>true</c> if this instance has sub groups; otherwise, <c>false</c>.
        /// </value>
        public bool HasSubgroups { get; set; }

        /// <summary>
        /// Gets the number of items in this group.
        /// </summary>
        /// <value>The items count.</value>

        [ScriptIgnore]
        public int ItemCount { get; set; }

        /// <summary>
        /// Gets the subgroups, if <see cref="HasSubgroups"/> is true, otherwise empty collection.
        /// </summary>
        /// <value>The subgroups.</value>
        [IgnoreDataMember]
        public ReadOnlyCollection<IGroup> Subgroups
        {
            get
            {
                if (this.subgroups == null)
                {
                    this.InitializeSubgroups();
                }
                return this.subgroups;
            }
        }

        private void InitializeSubgroups()
        {
            List<IGroup> subgroupsList = new List<IGroup>();

            if (this.HasSubgroups)
            {
                subgroupsList.AddRange(this.Items.OfType<IGroup>());
            }

            this.subgroups = new ReadOnlyCollection<IGroup>(subgroupsList);
        }

        /// <summary>
        /// Gets the items in this groups.
        /// </summary>
        /// <value>The items in this group.</value>
        public IEnumerable Items { get; set; }

        /// <summary>
        /// Gets the key for this group.
        /// </summary>
        /// <value>The key for this group.</value>
        public object Key { get; set; }
    }
}