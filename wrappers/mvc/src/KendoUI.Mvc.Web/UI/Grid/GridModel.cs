// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Data;
    using Telerik.Web.Mvc.UI;

    public interface IGridModel
    {
        int Total
        {
            get;
        }
        
        IEnumerable Data
        {
            get;
        }

        object Aggregates
        {
            get;
        }
    }

    public class GridModel : IGridModel
    {
        public GridModel()
        {

        }

        public GridModel(IEnumerable data)
        {
            Data = data;
        }

        public GridModel(DataTable data)
        {
            Data = data.WrapAsEnumerable();
        }

        public IEnumerable Data
        {
            get;
            set;
        }

        public int Total
        {
            get;
            set;
        }

        public object Aggregates
        {
            get;
            set;
        } 
    }

    public class GridModel<T> : IGridModel
    {
        public GridModel()
        {

        }

        public GridModel(IEnumerable<T> data)
        {
            Data = data;
        }

        public IEnumerable<T> Data
        {
            get;
            set;
        }

        public int Total
        {
            get;
            set;
        }

        IEnumerable IGridModel.Data
        {
            get 
            {
                return Data;
            }
        }


        public object Aggregates
        {
            get;
            set;
        }
        
    }
}