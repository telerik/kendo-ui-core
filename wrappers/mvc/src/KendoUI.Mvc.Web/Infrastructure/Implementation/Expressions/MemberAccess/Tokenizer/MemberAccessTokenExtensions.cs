// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Collections.Generic;
    using System.Globalization;
    using System.Linq;
    using System.Linq.Expressions;
    using System.Reflection;

    using Extensions;

    internal static class MemberAccessTokenExtensions
    {
        /// <exception cref="ArgumentException">
        /// Invalid name for property or field; or indexer with the specified arguments.
        /// </exception>
        public static Expression CreateMemberAccessExpression(this IMemberAccessToken token, Expression instance)
        {
            var memberInfo = token.GetMemberInfoForType(instance.Type);

            if (memberInfo == null)
            {
                throw new ArgumentException(FormatInvalidTokenErrorMessage(token, instance.Type));
            }

            var indexerToken = token as IndexerToken;
            if (indexerToken != null)
            {
                var arguments = indexerToken.GetIndexerArguments();
                return Expression.Call(instance, (MethodInfo) memberInfo, arguments);
            }

            // Property or field
            return Expression.MakeMemberAccess(instance, memberInfo);
        }

        private static string FormatInvalidTokenErrorMessage(IMemberAccessToken token, Type type)
        {
            string memberName;
            string memberType;

            PropertyToken propertyToken = token as PropertyToken;
            if (propertyToken != null)
            {
                memberType = "property or field";
                memberName = propertyToken.PropertyName;
            }
            else
            {
                memberType = "indexer with arguments";

                var argumentsAsString = ((IndexerToken) token).Arguments.Where(a => a != null).Select(a => a.ToString());
                memberName = string.Join(",", argumentsAsString.ToArray());
            }

            return string.Format(CultureInfo.CurrentCulture, "Invalid {0} - '{1}' for type: {2}", memberType, memberName, type.GetTypeName());
        }

        private static IEnumerable<Expression> GetIndexerArguments(this IndexerToken indexerToken)
        {
            return indexerToken.Arguments.Select(a => (Expression) Expression.Constant(a));
        }

        /// <exception cref="InvalidOperationException"><c>InvalidOperationException</c>.</exception>
        private static MemberInfo GetMemberInfoForType(this IMemberAccessToken token, Type targetType)
        {
            PropertyToken propertyToken = token as PropertyToken;
            if (propertyToken != null)
            {
                return GetMemberInfoFromPropertyToken(propertyToken, targetType);
            }

            IndexerToken indexerToken = token as IndexerToken;
            if (indexerToken != null)
            {
                return GetMemberInfoFromIndexerToken(indexerToken, targetType);
            }

            throw new InvalidOperationException(token.GetType().GetTypeName() + " is not supported");
        }

        private static MemberInfo GetMemberInfoFromPropertyToken(PropertyToken token, Type targetType)
        {
            return targetType.FindPropertyOrField(token.PropertyName);
        }

        private static MemberInfo GetMemberInfoFromIndexerToken(IndexerToken token, Type targetType)
        {
            PropertyInfo indexerPropertyInfo = targetType.GetIndexerPropertyInfo(token.Arguments.Select(a => a.GetType()).ToArray());
            if (indexerPropertyInfo != null)
            {
                return indexerPropertyInfo.GetGetMethod();
                
            }

            return null;
        }
    }
}