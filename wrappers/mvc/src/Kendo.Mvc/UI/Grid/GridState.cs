namespace Kendo.Mvc
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
