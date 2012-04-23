// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{


    /// <summary>
    /// Defines the fluent interface for configuring the <see cref="IntegerTextBox"/> component.
    /// </summary>
    public class IntegerTextBoxBuilder : TextBoxBuilderBase<int, IntegerTextBox, IntegerTextBoxBuilder>
    {
        /// Initializes a new instance of the <see cref="IntegerTextBoxBuilder"/> class.
        /// </summary>
        /// <param name="component">The component.</param>
        public IntegerTextBoxBuilder(IntegerTextBox component)
            : base(component)
        { }
    }
}