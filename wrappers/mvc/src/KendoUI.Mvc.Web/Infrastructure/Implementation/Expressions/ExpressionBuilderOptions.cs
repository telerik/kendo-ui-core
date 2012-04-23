// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
{
    internal class ExpressionBuilderOptions
    {
        /// <summary>
        /// Gets or sets a value indicating whether member access expression used
        /// by this builder should be lifted to null. The default value is true;
        /// </summary>
        /// <value>
        /// 	<c>true</c> if member access should be lifted to null; otherwise, <c>false</c>.
        /// </value>
        public bool LiftMemberAccessToNull { get; set; }

        public ExpressionBuilderOptions()
        {
            this.LiftMemberAccessToNull = true;
        }

        public void CopyFrom(ExpressionBuilderOptions other)
        {
            this.LiftMemberAccessToNull = other.LiftMemberAccessToNull;
        }
    }
}
