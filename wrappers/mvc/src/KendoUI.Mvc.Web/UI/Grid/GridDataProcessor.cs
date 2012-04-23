// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.UI
{
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;

    using Extensions;
    using Infrastructure;

    public class GridDataProcessor
    {
        private readonly IGridBindingContext bindingContext;

        private bool dataSourceIsProcessed;
        private int totalCount;
        private IEnumerable processedDataSource;
        private IList<SortDescriptor> sortDescriptors;
        private IList<IFilterDescriptor> filterDescriptors;
        private IList<GroupDescriptor> groupDescriptors;
        private IEnumerable<AggregateResult> aggregatesResults;
        private IEnumerable<AggregateDescriptor> aggregateDescriptors; 
        
        private bool aggregatesAreCalculated;

        public GridDataProcessor(IGridBindingContext bindingContext)
        {
            Guard.IsNotNull(bindingContext, "bindingContext");

            this.bindingContext = bindingContext;
            aggregatesResults = Enumerable.Empty<AggregateResult>();
        }

        public int Total
        {
            get
            {
                EnsureDataSourceIsProcessed();
                return totalCount;
            }
        }

        public IList<SortDescriptor> SortDescriptors
        {
            get
            {
                if (sortDescriptors == null)
                {
                    var sortExpression = bindingContext.GetGridParameter<string>(GridUrlParameters.OrderBy);

                    if (sortExpression != null)
                    {
                        sortDescriptors = GridDescriptorSerializer.Deserialize<SortDescriptor>(sortExpression);
                    }

                    if (sortDescriptors == null)
                    {
                        sortDescriptors = bindingContext.SortDescriptors;
                    }
                }

                return sortDescriptors;
            }
        }

        public virtual IList<GroupDescriptor> GroupDescriptors
        {
            get
            {
                if (groupDescriptors == null)
                {
                    var groupExpression = bindingContext.GetGridParameter<string>(GridUrlParameters.GroupBy);
                    
                    if (groupExpression != null)
                    {
                        groupDescriptors = GridDescriptorSerializer.Deserialize<GroupDescriptor>(groupExpression);
                    }

                    if (groupDescriptors == null)
                    {
                        groupDescriptors = bindingContext.GroupDescriptors;
                    }
                }

                return groupDescriptors;
            }
        }

        public IList<IFilterDescriptor> FilterDescriptors
        {
            get
            {
                if (filterDescriptors == null)
                {
                    var filterExpression = bindingContext.GetGridParameter<string>(GridUrlParameters.Filter);

                    if (filterExpression != null)
                    {
                        filterDescriptors = FilterDescriptorFactory.Create(filterExpression);
                    }

                    if (filterDescriptors == null)
                    {
                        filterDescriptors = bindingContext.FilterDescriptors.Cast<IFilterDescriptor>().ToList();
                    }
                }

                return filterDescriptors;
            }
        }

        public int PageCount
        {
            get
            {
                EnsureDataSourceIsProcessed();

                var pageSize = PageSize;

                if ((totalCount == 0) || (pageSize == 0))
                {
                    return 1;
                }

                return (totalCount + pageSize - 1)/pageSize;
            }
        }

        public IEnumerable ProcessedDataSource
        {
            get
            {
                EnsureDataSourceIsProcessed();

                return processedDataSource;
            }
        }

        public int CurrentPage
        {
            get
            {
                return bindingContext.GetGridParameter<int?>(GridUrlParameters.CurrentPage) ?? bindingContext.CurrentPage;
            }
        }

        public int PageSize
        {
            get
            {
                return bindingContext.GetGridParameter<int?>(GridUrlParameters.PageSize) ?? bindingContext.PageSize;
            }
        }

        protected IEnumerable<AggregateFunction> Aggregates
        {
            get 
            {
                if (aggregateDescriptors == null)
                {
                    var aggregates = bindingContext.GetGridParameter<string>(GridUrlParameters.Aggregates);

                    if (aggregates != null)
                    {
                        aggregateDescriptors = GridDescriptorSerializer.Deserialize<AggregateDescriptor>(aggregates); 
                    }

                    if (aggregateDescriptors == null)
                    {
                        aggregateDescriptors = bindingContext.Aggregates;
                    }
                }
                return aggregateDescriptors.SelectMany(aggregate => aggregate.Aggregates);
            }
        }

        public IEnumerable<AggregateResult> AggregatesResults
        {
            get
            {
                CalculateAggregates();
                return aggregatesResults;
            }
        }

        private void CalculateAggregates()
        {
            if (aggregatesAreCalculated || bindingContext.EnableCustomBinding)
            {
                return;
            }

            if (bindingContext.DataSource == null)
            {
                aggregatesAreCalculated = true;
                return;
            }

            if (Aggregates.Any())
            {
                var dataSource = GetCustomDataSource(bindingContext.DataSource).AsQueryable();

                var source = dataSource;
                if (FilterDescriptors.Any())
                {
                    source = dataSource.Where(FilterDescriptors);
                }
                aggregatesResults = source.Aggregate(Aggregates);
                aggregatesAreCalculated = true;
            }
        }

        private void EnsureDataSourceIsProcessed()
        {
            if (dataSourceIsProcessed)
            {
                return;
            }

            if (bindingContext.DataSource == null)
            {
                dataSourceIsProcessed = true;
                return;
            }

            if (!bindingContext.EnableCustomBinding)
            {
                GridModel model;

                if (GroupDescriptors.Any() && Aggregates.Any())
                {
                    GroupDescriptors.Each(g => g.AggregateFunctions.AddRange(Aggregates));
                }

                var dataTableEnumerable = bindingContext.DataSource as GridDataTableWrapper;
                if (dataTableEnumerable != null)
                {
                    model = dataTableEnumerable.ToGridModel(CurrentPage, PageSize, SortDescriptors, FilterDescriptors, GroupDescriptors);                    
                }
                else
                {
                    var dataSource = bindingContext.DataSource.AsQueryable();
                    model = dataSource.ToGridModel(CurrentPage, PageSize, SortDescriptors, FilterDescriptors, GroupDescriptors);
                }

                totalCount = model.Total;
                processedDataSource = model.Data.AsGenericEnumerable();
            }
            else
            {
                processedDataSource = GetCustomDataSource(bindingContext.DataSource);
                totalCount = bindingContext.Total;
            }

            dataSourceIsProcessed = true;
        }

        private IEnumerable GetCustomDataSource(IEnumerable dataSource)
        {
            var customDataSourceWrapper = dataSource as IGridCustomGroupingWrapper;
            if (customDataSourceWrapper != null)
            {
                return customDataSourceWrapper.GroupedEnumerable.AsGenericEnumerable().AsQueryable();
            }
            return dataSource;            
        }
    }
}
