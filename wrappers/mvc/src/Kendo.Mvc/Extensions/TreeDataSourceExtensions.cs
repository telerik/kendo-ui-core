namespace Kendo.Mvc.Extensions
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Reflection;
    using Infrastructure.Implementation.Expressions;
    using Kendo.Mvc;
    using Kendo.Mvc.Infrastructure;

    /// <summary>
    /// Provides extension methods to process TreeDataSourceRequest.
    /// </summary>
    public static class TreeDataSourceExtensions
    {        
        internal static IEnumerable<AggregateResult> AggregateForLevel<TModel, T1, T2>(this IEnumerable data,
            IQueryable allData,
            List<AggregateDescriptor> aggregates,
            Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector)
        {
            var e = Expression.Parameter(typeof(TModel), "item");
            var queryable = allData.Where(Expression.Lambda(CreateOrExpression(data, idSelector, e), e));

            return queryable.AggregateForLevel(allData, aggregates, idSelector, parentIDSelector);
        }

        internal static Expression CreateOrExpression<TModel, T1>(IEnumerable data, Expression<Func<TModel, T1>> idSelector, Expression e)
        {
            var fn = idSelector.Compile();
            Expression expr = null;
            var left = ExpressionFactory.MakeMemberAccess(e, idSelector.MemberWithoutInstance());

            foreach (TModel item in data)
            {
                if (expr != null)
                {
                    expr = Expression.Or(Expression.Equal(left, Expression.Constant(fn.Invoke(item))), expr);
                }
                else
                {
                    expr = Expression.Equal(left, Expression.Constant(fn.Invoke(item)));
                }                                
            }

            return expr;
        }

        internal static IEnumerable<AggregateResult> AggregateForLevel<TModel, T1, T2>(this IQueryable data, 
            IQueryable allData, 
            List<AggregateDescriptor> aggregates, 
            Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector)
        {
            data = data.ChildrenRecursive(allData, idSelector, parentIDSelector);

            return data.Aggregate(aggregates.SelectMany(a => a.Aggregates));                               
        }


        internal static IQueryable ChildrenRecursive<TModel, T1, T2>(this IQueryable roots,
            IQueryable allData,
            Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector)
        {
            var children = roots.Children(allData, idSelector, parentIDSelector);
            var any = AnyMethod(typeof(TModel));

            if ((bool)any.Invoke(null, new[] { children }))
            {
                return roots.Union(children.ChildrenRecursive(allData, idSelector, parentIDSelector));
            }

            return roots;
        }

        internal static IQueryable Children<TModel, T1, T2>(this IQueryable roots,
            IQueryable allData,
            Expression<Func<TModel, T1>> idSelector,
            Expression<Func<TModel, T2>> parentIDSelector)
        {
            var elementType = allData.ElementType;

            var allParam = Expression.Parameter(elementType, "allItem");
            var rootParam = Expression.Parameter(elementType, "rootItem");
            
            var matchesParentID = ExpressionFactory.MakeMemberAccess(rootParam, idSelector.MemberWithoutInstance());

            var allID = ExpressionFactory.MakeMemberAccess(allParam, parentIDSelector.MemberWithoutInstance());
            allID = Expression.Convert(allID, matchesParentID.Type);

            BinaryExpression comparison = Expression.Equal(matchesParentID, allID);

            var whereLambda = Expression.Lambda(comparison, allParam);
            var whereCall =
                Expression.Call(
                    typeof(Queryable),
                    "Where",
                    new[] { elementType },
                    allData.Expression,
                    Expression.Quote(whereLambda));

            var selectManyLambda = Expression.Lambda(typeof(Func<TModel, IEnumerable<TModel>>), whereCall, rootParam);
            
            var selectManyCall =
                    Expression.Call(
                        typeof(Queryable),
                        "SelectMany",
                        new Type[] { 
                            elementType,
                            elementType
                        },
                        new Expression[] {
                            roots.Expression,
                            Expression.Quote(selectManyLambda)
                        });

            return allData.Provider.CreateQuery(selectManyCall);
        }

        private static MethodInfo anyMethod = typeof(Queryable).GetMethods().First(method => method.Name == "Any" && method.GetParameters().Length == 1);
        private static MethodInfo AnyMethod(Type type)
        {            
            return anyMethod.MakeGenericMethod(type);                  
        }

        internal static IQueryable ParentsRecursive<TModel>(this IQueryable matches,
            IQueryable allData,
            LambdaExpression idSelector,
            LambdaExpression parentIDSelector)
        {
            var parents = matches.Parents(allData, idSelector, parentIDSelector);
            var any = AnyMethod(matches.ElementType);

            if ((bool)any.Invoke(null, new[] { parents }))
            {
                parents = parents.Union(parents.ParentsRecursive<TModel>(allData, idSelector, parentIDSelector));
            }

            return matches.Union(parents);
        }

        internal static IQueryable Parents(this IQueryable matches,
            IQueryable allData,
            LambdaExpression idSelector,
            LambdaExpression parentIDSelector)
        {
            var elementType = allData.ElementType;

            var allParam = Expression.Parameter(elementType, "allItem");
            var matchesParam = Expression.Parameter(elementType, "matchedItem");

            var allID = ExpressionFactory.MakeMemberAccess(allParam, idSelector.MemberWithoutInstance());

            var matchesParentID = ExpressionFactory.MakeMemberAccess(matchesParam, parentIDSelector.MemberWithoutInstance());
            matchesParentID = Expression.Convert(matchesParentID, allID.Type);

            BinaryExpression comparison = Expression.Equal(matchesParentID, allID);

            var anyLambda = Expression.Lambda(comparison, matchesParam);
            var anyCall =
                Expression.Call(
                    typeof(Queryable),
                    "Any",
                    new[] { elementType },
                    matches.Expression,
                    Expression.Quote(anyLambda));

            var whereLambda = Expression.Lambda(anyCall, allParam);
            var whereCall =
                    Expression.Call(
                        typeof(Queryable),
                        "Where",
                        new[] { elementType },
                        allData.Expression,
                        Expression.Quote(whereLambda));

            return allData.Provider.CreateQuery(whereCall);
        }        
    }
}
