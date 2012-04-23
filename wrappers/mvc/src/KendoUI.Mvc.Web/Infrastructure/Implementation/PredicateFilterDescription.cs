// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation
{
    using System;

    internal class PredicateFilterDescription : FilterDescription
    {
        private readonly Delegate predicate;

        public PredicateFilterDescription(Delegate predicate)
        {
            this.predicate = predicate;
        }

        public override bool SatisfiesFilter(object dataItem)
        {
            return (bool) this.predicate.DynamicInvoke(dataItem);
        }
    }
}