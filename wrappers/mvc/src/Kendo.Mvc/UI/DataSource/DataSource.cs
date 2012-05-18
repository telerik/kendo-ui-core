using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.Extensions;

namespace Kendo.Mvc.UI
{
    public class DataSource : JsonObject
    {
        public DataSource()
        {
            Transport = new Transport();

            Filters = new List<CompositeFilterDescriptor>();
            OrderBy = new List<SortDescriptor>();
            Groups = new List<GroupDescriptor>();
            Aggregates = new List<AggregateDescriptor>();
        }

        protected override void Serialize(IDictionary<string, object> json)
        {
            var transport = Transport.ToJson();

            if (transport.Keys.Any())
            {
                json["transport"] = transport;
            }

            if (PageSize > 0)
            {
                json["pageSize"] = PageSize;
            }

            if (ServerPaging)
            {
                json["serverPaging"] = ServerPaging;
            }

            if (ServerSorting)
            {
                json["serverSorting"] = ServerSorting;
            }

            if (ServerFiltering)
            {
                json["serverFiltering"] = ServerFiltering;
            }

            if (ServerGrouping)
            {
                json["serverGrouping"] = ServerGrouping;
            }

            if (ServerAggregates)
            {
                json["serverAggregates"] = ServerAggregates;
            }

            json["type"] = "aspnetmvc-" + Type.ToString().ToLower();

            if (OrderBy.Any())
            {
                json["sort"] = OrderBy.ToJson();
            }

            if (Groups.Any())
            {
                if (Aggregates.Any())
                {
                    Groups.Each(g => g.AggregateFunctions.AddRange(Aggregates.SelectMany(a => a.Aggregates)));                 
                }

                json["group"] = Groups.ToJson();
            }

            if (Aggregates.Any())
            {
                json["aggregates"] = Aggregates.SelectMany(agg => agg.Aggregates.ToJson()); ;    
            }

            if (Filters.Any())
            {
                json["filters"] = Filters.ToJson();
                
            }
        }        

        public DataSourceType Type
        {
            get;
            set;
        }

        public IList<CompositeFilterDescriptor> Filters
        {
            get;
            private set;
        }

        public IList<SortDescriptor> OrderBy
        {
            get;
            private set;
        }

        public IList<GroupDescriptor> Groups
        {
            get;
            private set;
        }

        public IList<AggregateDescriptor> Aggregates
        {
            get;
            private set;
        }

        public int PageSize 
        { 
            get; 
            set; 
        }

        public bool ServerPaging
        {
            get;
            set;
        }

        public bool ServerSorting
        {
            get;
            set;
        }

        public bool ServerFiltering
        {
            get;
            set;
        }

        public bool ServerGrouping
        {
            get;
            set;
        }

        public bool ServerAggregates
        {
            get;
            set;
        }

        public Transport Transport
        {
            get;
            private set;
        }
    }
}