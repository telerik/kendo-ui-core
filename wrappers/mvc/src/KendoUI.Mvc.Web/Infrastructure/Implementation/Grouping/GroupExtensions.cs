// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    
    using Extensions;

    internal static class GroupExtensions
    {
        public static int LeafIndexOf(this IGroup group, object item)
        {
            if (!group.HasSubgroups)
            {
                return group.Items.IndexOf(item);
            }

            return group.Subgroups.LeafIndexOf(item);
        }

        public static int LeafIndexOf(this IEnumerable<IGroup> groups, object item)
        {
            int currentIndex = 0;

            foreach (var group in groups)
            {
                var indexAtGroup = group.LeafIndexOf(item);

                if (indexAtGroup >= 0)
                {
                    return currentIndex + indexAtGroup;
                }

                currentIndex += group.ItemCount;
            }

            return -1;
        }

        public static IEnumerable Leaves(this IEnumerable<IGroup> groups)
        {
            foreach (var group in groups)
            {
                foreach (var item in group.Leaves())
                {
                    yield return item;
                }
            }
        }

        public static IEnumerable Leaves(this IGroup group)
        {
            if (!group.HasSubgroups)
            {
                return group.Items;
            }

            return group.Subgroups.Leaves();
        }

        public static int LeavesCount(this IEnumerable<IGroup> groups)
        {
            return groups.Sum(g => g.HasSubgroups ? g.Subgroups.LeavesCount() : g.ItemCount);
        }

        internal static int GroupUniqueKey(this IEnumerable<IGroup> groups, IGroup group)
        {
            var parents = GetParentsAndSelf(groups, group);

            return GetGroupSequenceUniqueKey(parents);
        }

        /// <summary>
        /// Calculates unique int for given group in a group sequence, 
        /// taking into account groups order, each group key and groups' count.
        /// </summary>
        private static int GetGroupSequenceUniqueKey(IEnumerable<IGroup> groups)
        {
            int key = 0;
            bool isFirst = true;

            unchecked
            {
                foreach (var group in groups)
                {
                    int hashCode = GetGroupKeyHashCode(group);
                    if (isFirst)
                    {
                        isFirst = false;
                        key = hashCode * 397;
                    }
                    else
                    {
                        key = key ^ hashCode;
                    }
                }

                key = key ^ groups.Count();
            }

            return key;
        }

        private static int GetGroupKeyHashCode(IGroup group)
        {
            if (group.Key != null)
            {
                return group.Key.GetHashCode();
            }

            return 0;
        }

        internal static IList<IGroup> GetParentsAndSelf(this IEnumerable<IGroup> groups, IGroup targetGroup)
        {
            foreach (var group in groups)
            {
                var parents = GetParentsAndSelfRecursive(new List<IGroup> { group }, targetGroup);
                if (parents.Count > 0)
                {
                    return parents;
                }
            }

            return new List<IGroup>();
        }

        private static IList<IGroup> GetParentsAndSelfRecursive(IList<IGroup> parents, IGroup targetGroup)
        {
            var last = parents.Last();
            if (last == targetGroup)
            {
                return parents;
            }

            if (last.HasSubgroups)
            {
                foreach (var childGroup in last.Subgroups)
                {
                    parents.Add(childGroup);
                    var childParents = GetParentsAndSelfRecursive(parents, targetGroup);
                    if (childParents.Count > 0)
                    {
                        return childParents;
                    }
                    parents.Remove(childGroup);
                }
            }

            return new List<IGroup>();
        }
    }
}