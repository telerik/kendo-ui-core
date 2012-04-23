// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Fluent
{
    public class GridToolBarCommandBuilder<T> : GridToolBarCommandBuilderBase<T, GridToolBarCommandBase<T>, GridToolBarCommandBuilder<T>> where T : class
    {
        public GridToolBarCommandBuilder(GridToolBarCommandBase<T> command)
            : base(command)
        {
        }
    }
}