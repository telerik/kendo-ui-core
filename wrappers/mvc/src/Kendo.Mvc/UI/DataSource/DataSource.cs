using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.Infrastructure;

namespace Kendo.Mvc.UI
{
    public class DataSource : JsonObject
    {
        public DataSource()
        {
            Transport = new Transport();

            Filters = new List<IFilterDescriptor>();
            OrderBy = new List<SortDescriptor>();
            Groups = new List<GroupDescriptor>();
            Aggregates = new List<AggregateDescriptor>();

            Schema = new DataSourceSchema();
            Type = DataSourceType.Server;

            ServerPaging = ServerSorting = ServerGrouping = ServerFiltering = ServerAggregates = true;
        }

        public int TotalPages { get; set; }
        public int Page { get; set; }
        public int Total { get; set; }
        public DataSourceSchema Schema { get; private set; }

        protected override void Serialize(IDictionary<string, object> json)
        {
            if (Transport.Read.Url == null)
            {
                // If Url is not set assume the current url (used in server binding)
                Transport.Read.Url = "";
            }

            var transport = Transport.ToJson();

            if (transport.Keys.Any())
            {
                json["transport"] = transport;
            }

            if (PageSize > 0)
            {
                json["pageSize"] = PageSize;
                json["page"] = Page;
                json["total"] = Total;
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
                json["group"] = Groups.ToJson();
            }

            if (Aggregates.Any())
            {
                json["aggregate"] = Aggregates.SelectMany(agg => agg.Aggregates.ToJson());
            }

            if (Filters.Any() || ServerFiltering)
            {
                json["filter"] = Filters.OfType<FilterDescriptorBase>().ToJson();                
            }

            if (ModelType != null)
            {
                Schema.Model = new ModelDescriptor(ModelType);
            }

            json["schema"] = Schema.ToJson();
        }       

        public Type ModelType 
        { 
            get; 
            set; 
        }

        public DataSourceType Type
        {
            get;
            set;
        }

        public IList<IFilterDescriptor> Filters
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

        public IEnumerable Data
        {
            get;
            set;
        }

        public IEnumerable<AggregateResult> AggregateResults
        {
            get;
            set;
        }

        public void Process(DataSourceRequest request, bool processData)        
        {
            if (request.Sorts == null)
            {
                request.Sorts = OrderBy;
            }
            else if (request.Sorts.Any())
            {
                OrderBy.Clear();
                OrderBy.AddRange(request.Sorts);
            }
            else
            {
                OrderBy.Clear();                
            }

            if (request.PageSize == 0)
            {
                request.PageSize = PageSize;
            }

            if (request.Groups == null)
            {
                request.Groups = Groups;
            }
            else if (request.Groups.Any())
            {
                Groups.Clear();
                Groups.AddRange(request.Groups);
            }
            else
            {
                Groups.Clear();
            }

            if (request.Filters == null)
            {
                request.Filters = Filters;
            }
            else if (request.Filters.Any())
            {
                Filters.Clear();
                Filters.AddRange(request.Filters);
            }
            else
            {
                Filters.Clear();
            }

            if (!request.Aggregates.Any())
            {
                request.Aggregates = Aggregates;
            }
            else if (request.Aggregates.Any())
            {
                Aggregates.Clear();
                Aggregates.AddRange(request.Aggregates);
            }
            else
            {
                Aggregates.Clear();
            }

            if (Groups.Any() && Aggregates.Any())
            {
                Groups.Each(g => g.AggregateFunctions.AddRange(Aggregates.SelectMany(a => a.Aggregates)));
            }

            if (Data != null)
            {
                if (processData)
                {
                    var result = Data.AsQueryable().ToDataSource(request);

                    Data = result.Data;
                    Total = result.Total;
                
                    AggregateResults = result.AggregateResults;                
                }
                else
                {
                    var wrapper = Data as IGridCustomGroupingWrapper;
                    if (wrapper != null)
                    {
                        Data = wrapper.GroupedEnumerable.AsGenericEnumerable();
                    }
                }
            }

            Page = request.Page;

            if (Total == 0 || PageSize == 0)
            {
                TotalPages = 1;
            }
            else
            {
                TotalPages = (Total + PageSize - 1) / PageSize;
            }
        }
    }
}