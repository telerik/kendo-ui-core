// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    using System;
    using System.ComponentModel;
    using System.Linq;
    using System.Linq.Expressions;

    using Extensions;
    using Infrastructure;
    using Resources;

    public class GridSortDescriptorFactory<TModel> : IHideObjectMembers
        where TModel : class
    {
        public GridSortDescriptorFactory(GridSortSettings settings)
        {
            Guard.IsNotNull(settings, "settings");

            Settings = settings;
        }

        protected GridSortSettings Settings { get; private set; }

        public virtual GridSortDescriptorBuilder Add<TValue>(Expression<Func<TModel, TValue>> expression)
        {
            return Add(new SortDescriptor
            {
                Member = expression.MemberWithoutInstance(),
                SortDirection = ListSortDirection.Ascending
            });
        }

        public virtual GridSortDescriptorBuilder Add(string memberName)
        {
            return Add(new SortDescriptor
            {
                Member = memberName,
                SortDirection = ListSortDirection.Ascending
            });
        }

        private GridSortDescriptorBuilder Add(SortDescriptor descriptor)
        {
            if (Settings.SortMode == GridSortMode.SingleColumn && Settings.OrderBy.Any())
            {
                throw new InvalidOperationException(TextResource.YouCannotAddMoreThanOnceColumnWhenSortModeIsSetToSingle);
            }
            
            Settings.OrderBy.Add(descriptor);

            return new GridSortDescriptorBuilder(descriptor);
        }
    }
}