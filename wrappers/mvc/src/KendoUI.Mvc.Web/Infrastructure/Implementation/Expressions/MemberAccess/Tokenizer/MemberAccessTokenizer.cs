// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Infrastructure.Implementation.Expressions
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    internal static class MemberAccessTokenizer
    {
        public static IEnumerable<IMemberAccessToken> GetTokens(string memberPath)
        {
            string[] members = memberPath.Split(new[] { '.', '[' }, StringSplitOptions.RemoveEmptyEntries);

            foreach (string member in members)
            {
                IndexerToken indexerToken;
                if (TryParseIndexerToken(member, out indexerToken))
                {
                    yield return indexerToken;
                }
                else
                {
                    yield return new PropertyToken(member);
                }
            }
        }

        private static bool TryParseIndexerToken(string member, out IndexerToken token)
        {
            token = null;

            if (!IsValidIndexer(member))
            {
                return false;
            }

            List<object> arguments = new List<object>();
            arguments.AddRange(ExtractIndexerArguments(member).Select(a => ConvertIndexerArgument(a)));

            token = new IndexerToken(arguments);

            return true;
        }

        private static bool IsValidIndexer(string member)
        {
            return member.EndsWith("]", StringComparison.Ordinal);
        }

        private static IEnumerable<string> ExtractIndexerArguments(string member)
        {
             var args = member.TrimEnd(']');
             foreach (var arg in args.Split(','))
             {
                 yield return arg;
             }
        }

        private static object ConvertIndexerArgument(string argument)
        {
            int argAsInt;
            if (int.TryParse(argument, out argAsInt))
            {
                return argAsInt;
            }

            if (argument.StartsWith("\"", StringComparison.Ordinal))
            {
                return argument.Trim('"');
            }

            if (argument.StartsWith("'", StringComparison.Ordinal))
            {
                var trimmedArg = argument.Trim('\'');
                if (trimmedArg.Length == 1)
                {
                    return trimmedArg[0];
                }

                return trimmedArg;
            }

            return argument;
        }
    }
}