// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    /// <summary>
    /// Container of scriptable component.
    /// </summary>
    public interface IScriptableComponentContainer
    {
        /// <summary>
        /// Registers the specified component.
        /// </summary>
        /// <param name="component">The component.</param>
        void Register(IScriptableComponent component);
    }
}