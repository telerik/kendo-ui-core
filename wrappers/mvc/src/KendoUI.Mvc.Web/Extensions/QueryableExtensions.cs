// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Extensions
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.ComponentModel;
    using System.Linq;
    using System.Linq.Expressions;
    using Infrastructure.Implementation.Expressions;
    using Telerik.Web.Mvc;
    using Telerik.Web.Mvc.Infrastructure;
    using Telerik.Web.Mvc.Infrastructure.Implementation;
    using Telerik.Web.Mvc.UI;

    public static class QueryableExtensions
    {
        public static GridModel ToGridModel(this IQueryable queryable, int page, int pageSize, string orderBy, string groupBy, string filter)
        {
            GridCommand command = GridCommand.Parse(page, pageSize, orderBy, groupBy, filter);

            return queryable.ToGridModel(page, pageSize, command.SortDescriptors, command.FilterDescriptors, command.GroupDescriptors);
        }

        public static GridModel ToGridModel(this IQueryable queryable, GridState state)
        {
            return queryable.ToGridModel(state.Page, state.Size, state.OrderBy, state.GroupBy, state.Filter);
        }

        internal static GridModel ToGridModel(this GridDataTableWrapper enumerable, int page, int pageSize, IList<SortDescriptor> sortDescriptors, IEnumerable<IFilterDescriptor> filterDescriptors,
            IEnumerable<GroupDescriptor> groupDescriptors)
        {
            if (filterDescriptors.Any())
            {
                var dataTable = enumerable.Table;
                filterDescriptors.SelectMemberDescriptors()
                    .Each(f => f.MemberType = GetFieldByTypeFromDataColumn(dataTable, f.Member));
            }

            if (groupDescriptors.Any())
            {
                var dataTable = enumerable.Table;
                groupDescriptors.Each(g => g.MemberType = GetFieldByTypeFromDataColumn(dataTable, g.Member));
            }

            return enumerable.AsQueryable().ToGridModel(page, pageSize, sortDescriptors, filterDescriptors, groupDescriptors);
        }

        private static Type GetFieldByTypeFromDataColumn(System.Data.DataTable dataTable, string memberName)
        {
            return dataTable.Columns.Contains(memberName) ? dataTable.Columns[memberName].DataType : null;
        }

        public static GridModel ToGridModel(this IQueryable queryable, int page, int pageSize, IList<SortDescriptor> sortDescriptors, IEnumerable<IFilterDescriptor> filterDescriptors,
            IEnumerable<GroupDescriptor> groupDescriptors)
        {
            IQueryable data = queryable;

#if MVC3
            if (queryable.ElementType.IsDynamicObject())
            {
                var firstItem = queryable.Cast<object>().FirstOrDefault();
                if (firstItem != null)
                {
                    if (filterDescriptors.Any())
                    {
                        filterDescriptors.SetMemberTypeFrom(firstItem);
                    }

                    if (groupDescriptors.Any())
                    {
                        groupDescriptors.SetMemberTypeFrom(firstItem);
                    }
                }
            }
#endif

            if (filterDescriptors.Any())
            {
                data = data.Where(filterDescriptors);
            }

            GridModel result = new GridModel();

            result.Total = data.Count();
            IList<SortDescriptor> temporarySortDescriptors = new List<SortDescriptor>();

            if (!sortDescriptors.Any() && queryable.Provider.IsEntityFrameworkProvider())
            {
                // The Entity Framework provider demands OrderBy before calling Skip.
                SortDescriptor sortDescriptor = new SortDescriptor
                {
                    Member = queryable.ElementType.FirstSortableProperty()
                };
                sortDescriptors.Add(sortDescriptor);
                temporarySortDescriptors.Add(sortDescriptor);
            }

            if (groupDescriptors.Any())
            {
                groupDescriptors.Reverse().Each(groupDescriptor =>
                {
                    SortDescriptor sortDescriptor = new SortDescriptor
                    {
                        Member = groupDescriptor.Member,
                        SortDirection = groupDescriptor.SortDirection
                    };
                    
                    sortDescriptors.Insert(0, sortDescriptor);
                    temporarySortDescriptors.Add(sortDescriptor);
                });
            }
            
            if (sortDescriptors.Any())
            {
                data = data.Sort(sortDescriptors);
            }

            var notPagedData = data;

            data = data.Page(page - 1, pageSize);

            if (groupDescriptors.Any())
            {
                data = data.GroupBy(notPagedData, groupDescriptors);
            }
            
            result.Data = data;

            temporarySortDescriptors.Each(sortDescriptor => sortDescriptors.Remove(sortDescriptor));

            return result;
        }
        
        private static IQueryable CallQueryableMethod(this IQueryable source, string methodName, LambdaExpression selector)
        {
            IQueryable query = source.Provider.CreateQuery(
                Expression.Call(
                    typeof(Queryable),
                    methodName,
                    new[] { source.ElementType, selector.Body.Type },
                    source.Expression,
                    Expression.Quote(selector)));

            return query;
        }

        /// <summary>
        /// Sorts the elements of a sequence using the specified sort descriptors.
        /// </summary>
        /// <param name="source">A sequence of values to sort.</param>
        /// <param name="sortDescriptors">The sort descriptors used for sorting.</param>
        /// <returns>
        /// An <see cref="IQueryable" /> whose elements are sorted according to a <paramref name="sortDescriptors"/>.
        /// </returns>
        public static IQueryable Sort(this IQueryable source, IEnumerable<SortDescriptor> sortDescriptors)
        {
            var builder = new SortDescriptorCollectionExpressionBuilder(source, sortDescriptors);
            return builder.Sort();
        }

        /// <summary>
        /// Pages through the elements of a sequence until the specified 
        /// <paramref name="pageIndex"/> using <paramref name="pageSize"/>.
        /// </summary>
        /// <param name="source">A sequence of values to page.</param>
        /// <param name="pageIndex">Index of the page.</param>
        /// <param name="pageSize">Size of the page.</param>
        /// <returns>
        /// An <see cref="IQueryable" /> whose elements are at the specified <paramref name="pageIndex"/>.
        /// </returns>
        public static IQueryable Page(this IQueryable source, int pageIndex, int pageSize)
        {
            IQueryable query = source;

            if (pageIndex > 0)
            {
                query = query.Skip(pageIndex * pageSize);
            }

            if (pageSize > 0)
            {
                query = query.Take(pageSize);
            }

            return query;
        }

        /// <summary>
        /// Projects each element of a sequence into a new form.
        /// </summary>
        /// <returns>
        /// An <see cref="IQueryable" /> whose elements are the result of invoking a 
        /// projection selector on each element of <paramref name="source" />.
        /// </returns>
        /// <param name="source"> A sequence of values to project. </param>
        /// <param name="selector"> A projection function to apply to each element. </param>
        public static IQueryable Select(this IQueryable source, LambdaExpression selector)
        {
            return source.CallQueryableMethod("Select", selector);
        }

        /// <summary>
        /// Groups the elements of a sequence according to a specified key selector function.
        /// </summary>
        /// <param name="source"> An <see cref="IQueryable" /> whose elements to group.</param>
        /// <param name="keySelector"> A function to extract the key for each element.</param>
        /// <returns>
        /// An <see cref="IQueryable"/> with <see cref="IGrouping{TKey,TElement}"/> items, 
        /// whose elements contains a sequence of objects and a key.
        /// </returns>
        public static IQueryable GroupBy(this IQueryable source, LambdaExpression keySelector)
        {
            return source.CallQueryableMethod("GroupBy", keySelector);
        }

        /// <summary>
        /// Sorts the elements of a sequence in ascending order according to a key.
        /// </summary>
        /// <returns>
        /// An <see cref="IQueryable" /> whose elements are sorted according to a key.
        /// </returns>
        /// <param name="source">
        /// A sequence of values to order.
        /// </param>
        /// <param name="keySelector">
        /// A function to extract a key from an element.
        /// </param>
        public static IQueryable OrderBy(this IQueryable source, LambdaExpression keySelector)
        {
            return source.CallQueryableMethod("OrderBy", keySelector);
        }

        /// <summary>
        /// Sorts the elements of a sequence in descending order according to a key.
        /// </summary>
        /// <returns>
        /// An <see cref="IQueryable" /> whose elements are sorted in descending order according to a key.
        /// </returns>
        /// <param name="source">
        /// A sequence of values to order.
        /// </param>
        /// <param name="keySelector">
        /// A function to extract a key from an element.
        /// </param>
        public static IQueryable OrderByDescending(this IQueryable source, LambdaExpression keySelector)
        {
            return source.CallQueryableMethod("OrderByDescending", keySelector);
        }

        /// <summary>
        /// Calls <see cref="OrderBy(System.Linq.IQueryable,System.Linq.Expressions.LambdaExpression)"/> 
        /// or <see cref="OrderByDescending"/> depending on the <paramref name="sortDirection"/>.
        /// </summary>
        /// <param name="source">The source.</param>
        /// <param name="keySelector">The key selector.</param>
        /// <param name="sortDirection">The sort direction.</param>
        /// <returns>
        /// An <see cref="IQueryable" /> whose elements are sorted according to a key.
        /// </returns>
        public static IQueryable OrderBy(this IQueryable source, LambdaExpression keySelector, ListSortDirection? sortDirection)
        {
            if (sortDirection.HasValue)
            {
                if (sortDirection.Value == ListSortDirection.Ascending)
                {
                    return source.OrderBy(keySelector);
                }

                return source.OrderByDescending(keySelector);
            }

            return source;
        }

        /// <summary>
        /// Groups the elements of a sequence according to a specified <paramref name="groupDescriptors"/>.
        /// </summary>
        /// <param name="source"> An <see cref="IQueryable" /> whose elements to group. </param>
        /// <param name="groupDescriptors">The group descriptors used for grouping.</param>
        /// <returns>
        /// An <see cref="IQueryable"/> with <see cref="IGroup"/> items, 
        /// whose elements contains a sequence of objects and a key.
        /// </returns>
        public static IQueryable GroupBy(this IQueryable source, IEnumerable<GroupDescriptor> groupDescriptors)
        {
            return source.GroupBy(source, groupDescriptors);
        }

        public static IQueryable GroupBy(this IQueryable source, IQueryable notPagedData, IEnumerable<GroupDescriptor> groupDescriptors)
        {
            var builder = new GroupDescriptorCollectionExpressionBuilder(source, groupDescriptors, notPagedData);
            builder.Options.LiftMemberAccessToNull = source.Provider.IsLinqToObjectsProvider();
            return builder.CreateQuery();
        }

        /// <summary>
        /// Calculates the results of given aggregates functions on a sequence of elements.
        /// </summary>
        /// <param name="source"> An <see cref="IQueryable" /> whose elements will 
        /// be used for aggregate calculation.</param>
        /// <param name="aggregateFunctions">The aggregate functions.</param>
        /// <returns>Collection of <see cref="AggregateResult"/>s calculated for each function.</returns>
        public static AggregateResultCollection Aggregate(this IQueryable source, IEnumerable<AggregateFunction> aggregateFunctions)
        {
            var functions = aggregateFunctions.ToList();

            if (functions.Count > 0)
            {
                var builder = new QueryableAggregatesExpressionBuilder(source, functions);
                builder.Options.LiftMemberAccessToNull = source.Provider.IsLinqToObjectsProvider();
                var groups = builder.CreateQuery();

                foreach (AggregateFunctionsGroup group in groups)
                {
                    return group.GetAggregateResults(functions);
                }
            }

            return new AggregateResultCollection();
        }

        /// <summary> 
        /// Filters a sequence of values based on a predicate. 
        /// </summary>
        /// <returns>
        /// An <see cref="IQueryable" /> that contains elements from the input sequence 
        /// that satisfy the condition specified by <paramref name="predicate" />.
        /// </returns>
        /// <param name="source"> An <see cref="IQueryable" /> to filter.</param>
        /// <param name="predicate"> A function to test each element for a condition.</param>
        public static IQueryable Where(this IQueryable source, Expression predicate)
        {
            return source.Provider.CreateQuery(
               Expression.Call(
                   typeof(Queryable),
                   "Where",
                   new[] { source.ElementType },
                   source.Expression,
                   Expression.Quote(predicate)));
        }

        /// <summary> 
        /// Filters a sequence of values based on a collection of <see cref="IFilterDescriptor"/>. 
        /// </summary>
        /// <param name="source">The source.</param>
        /// <param name="filterDescriptors">The filter descriptors.</param>
        /// <returns>
        /// An <see cref="IQueryable" /> that contains elements from the input sequence 
        /// that satisfy the conditions specified by each filter descriptor in <paramref name="filterDescriptors" />.
        /// </returns>
        public static IQueryable Where(this IQueryable source, IEnumerable<IFilterDescriptor> filterDescriptors)
        {
            if (filterDescriptors.Any())
            {
                var parameterExpression = Expression.Parameter(source.ElementType, "item");

                var expressionBuilder = new FilterDescriptorCollectionExpressionBuilder(parameterExpression, filterDescriptors);
                expressionBuilder.Options.LiftMemberAccessToNull = source.Provider.IsLinqToObjectsProvider();
                var predicate = expressionBuilder.CreateFilterExpression();
                return source.Where(predicate);
            }

            return source;
        }

        internal static IQueryable SelectDistinct(this IQueryable source, Type propertyType, string propertyName)
        {
            var builder = ExpressionBuilderFactory.MemberAccess(source, propertyType, propertyName);

            LambdaExpression lambda = builder.CreateLambdaExpression();

            var queryable = source.Select(lambda);

            queryable = queryable.Provider.CreateQuery(
                Expression.Call(
                    typeof(Queryable),
                    "Distinct",
                    new[] { lambda.Body.Type },
                    queryable.Expression));

            return queryable;
        }

        internal static IQueryable Ordered(this IQueryable source)
        {
            var builder = new IdentityExpressionBuilder(source.ElementType);
            var lambda = builder.CreateLambdaExpression();

            return source.OrderBy(lambda);
        }

        /// <summary>
        /// Returns a specified number of contiguous elements from the start of a sequence.
        /// </summary>
        /// <returns>
        /// An <see cref="IQueryable" /> that contains the specified number 
        /// of elements from the start of <paramref name="source" />.
        /// </returns>
        /// <param name="source"> The sequence to return elements from.</param>
        /// <param name="count"> The number of elements to return. </param>
        /// <exception cref="ArgumentNullException"><paramref name="source" /> is null. </exception>
        public static IQueryable Take(this IQueryable source, int count)
        {
            if (source == null) throw new ArgumentNullException("source");
            return source.Provider.CreateQuery(
                Expression.Call(
                    typeof(Queryable), "Take",
                    new Type[] { source.ElementType },
                    source.Expression, Expression.Constant(count)));
        }

        /// <summary>
        /// Bypasses a specified number of elements in a sequence 
        /// and then returns the remaining elements.
        /// </summary>
        /// <returns>
        /// An <see cref="IQueryable" /> that contains elements that occur 
        /// after the specified index in the input sequence.
        /// </returns>
        /// <param name="source">
        /// An <see cref="IQueryable" /> to return elements from.
        /// </param>
        /// <param name="count">
        /// The number of elements to skip before returning the remaining elements.
        /// </param>
        /// <exception cref="ArgumentNullException"> <paramref name="source" /> is null.</exception>
        public static IQueryable Skip(this IQueryable source, int count)
        {
            if (source == null) throw new ArgumentNullException("source");
            return source.Provider.CreateQuery(
                Expression.Call(
                    typeof(Queryable), "Skip",
                    new Type[] { source.ElementType },
                    source.Expression, Expression.Constant(count)));
        }

        /// <summary> Returns the number of elements in a sequence.</summary>
        /// <returns> The number of elements in the input sequence.</returns>
        /// <param name="source">
        /// The <see cref="IQueryable" /> that contains the elements to be counted.
        /// </param>
        /// <exception cref="ArgumentNullException"> <paramref name="source" /> is null.</exception>
        public static int Count(this IQueryable source)
        {
            if (source == null) throw new ArgumentNullException("source");
            return source.Provider.Execute<int>(
                Expression.Call(
                    typeof(Queryable), "Count",
                    new Type[] { source.ElementType }, source.Expression));
        }

        /// <summary> Returns the element at a specified index in a sequence.</summary>
        /// <returns> The element at the specified position in <paramref name="source" />.</returns>
        /// <param name="source"> An <see cref="IQueryable" /> to return an element from.</param>
        /// <param name="index"> The zero-based index of the element to retrieve.</param>
        /// <exception cref="ArgumentNullException"> <paramref name="source" /> is null.</exception>
        /// <exception cref="ArgumentOutOfRangeException"> <paramref name="index" /> is less than zero.</exception>
        public static object ElementAt(this IQueryable source, int index)
        {
            if (source == null) throw new ArgumentNullException("source");
            if (index < 0) throw new ArgumentOutOfRangeException("index");

            return source.Provider.Execute(
                Expression.Call(
                    typeof(Queryable),
                    "ElementAt",
                    new Type[] { source.ElementType },
                    source.Expression,
                    Expression.Constant(index)));
        }

        /// <summary>
        /// Creates a <see cref="IList{T}" /> from an <see cref="IQueryable" /> where T is <see cref="IQueryable.ElementType"/>.
        /// </summary>
        /// <returns>
        /// A <see cref="List{T}" /> that contains elements from the input sequence.
        /// </returns>
        /// <param name="source">
        /// The <see cref="IQueryable" /> to create a <see cref="List{T}" /> from.
        /// </param>
        /// <exception cref="ArgumentNullException"> 
        /// <paramref name="source" /> is null.
        /// </exception>
        public static IList ToIList(this IQueryable source)
        {
            if (source == null) throw new ArgumentNullException("source");

            var list = (IList)Activator.CreateInstance(typeof(List<>).MakeGenericType(source.ElementType));

            foreach (var item in source)
            {
                list.Add(item);
            }

            return list;
        }

        internal static bool IsBindableType(Type type)
        {
            if ((!type.IsPrimitive &&
                (type != typeof(string))) &&
                (type != typeof(DateTime)) &&
                (type != typeof(TimeSpan)) &&
                (type != typeof(decimal)) &&
                (type != typeof(Guid)) &&
                (!type.IsEnum))
            {
                return type.IsValueType &&
                    type.IsGenericType &&
                    type.GetGenericArguments().Length == 1 &&
                        IsBindableType(type.GetGenericArguments()[0]);
            }

            return true;
        }
    }
}
