// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.UI.Fluent
{
    /// <summary>
    /// Defines the fluent interface for building <see cref="DropDownListBindingSettingsBuilder"/>
    /// </summary>
    public class DropDownListBindingSettingsBuilder : DropDownBindingSettingsBuilder<DropDownListBindingSettingsBuilder>
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="DropDownListBindingSettingsBuilder"/> class.
        /// </summary>
        /// <param name="settings">The settings.</param>
        public DropDownListBindingSettingsBuilder(IDropDownBindingSettings settings)
            : base(settings)
        { }
    }
}
