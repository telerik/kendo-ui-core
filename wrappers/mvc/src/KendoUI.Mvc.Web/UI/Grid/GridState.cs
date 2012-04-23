// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc
{
    using System.Runtime.Serialization;

    [DataContract]
    public class GridState
    {
        [DataMember]
        private int page;

        public int Page
        {
            get 
            { 
                return page; 
            }
            set 
            { 
                page = value; 
            }
        }

        [DataMember]
        private int size;

        public int Size
        {
            get 
            { 
                return size; 
            }
            set 
            { 
                size = value; 
            }
        }

        [DataMember]
        private string orderBy;

        public string OrderBy
        {
            get 
            { 
                return orderBy; 
            }
            set 
            { 
                orderBy = value; 
            }
        }

        [DataMember]
        private string groupBy;

        public string GroupBy
        {
            get
            {
                return groupBy;
            }
            set
            {
                groupBy = value;
            }
        }

        [DataMember]
        private string filter;

        public string Filter
        {
            get 
            {
                return filter; 
            }
            set 
            { 
                filter = value; 
            }
        }
    }
}
