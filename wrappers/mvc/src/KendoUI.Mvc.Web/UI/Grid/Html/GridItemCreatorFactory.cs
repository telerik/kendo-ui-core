// (c) Copyright 2002-2009 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI.Html
{
    public class GridItemCreatorFactory : IGridItemCreatorFactory
    {
        public IGridItemCreator Create(IGridDataKeyStore dataKeyData, IGridItemCreatorData creatorData)
        {
            var comparer = new GridDataKeyComparer(dataKeyData.DataKeyGetters, dataKeyData.CurrentDataKeyValues);

            return new GridItemCreator(comparer, creatorData);
        }
    }
}