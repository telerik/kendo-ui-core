using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;

namespace Kendo.Mvc.Infrastructure
{
    public class JavaScriptInitializer : IJavaScriptInitializer
    {
        private static readonly Regex EscapeRegex = new Regex(@"([;&,\.\+\*~'\:\""\!\^\$\[\]\(\)\|\/])", RegexOptions.Compiled);

        public virtual string Initialize(string id, string name, IDictionary<string, object> options)
        {
            var output = new StringBuilder();

            //Escape meta characters: http://api.jquery.com/category/selectors/
            id = EscapeRegex.Replace(id, @"\\$1");

            output.Append("jQuery(function(){jQuery(\"#")
                .Append(id)
                .Append("\").kendo")
                .Append(name)
                .Append("(");
                  
            Serialize(output, options);

            output.Append(");});");

            return output.ToString();
        }

        public virtual string Serialize(IDictionary<string, object> value)
        {
            var output = new StringBuilder();

            Serialize(output, value);

            return output.ToString();
        }

        public virtual IJavaScriptSerializer CreateSerializer()
        {
            return new DefaultJavaScriptSerializer();
        }

        public virtual void Serialize(StringBuilder output, IDictionary<string, object> @object)
        {
            output.Append("{");

            foreach (var keyValuePair in @object)
            {
                output.Append(keyValuePair.Key)
                    .Append(":");

                var value = keyValuePair.Value;

                var @string = value as string;

                if (@string != null)
                {
                    output.Append(HttpUtility.JavaScriptStringEncode(@string, true));
                    continue;
                }

                var @dictionary = value as IDictionary<string, object>;

                if (@dictionary != null)
                {
                    output.Append(Serialize(@dictionary));
                    continue;
                }

                var enumerable = value as IEnumerable;

                if (enumerable != null)
                {
                    var serializer = CreateSerializer();
                    output.Append(serializer.Serialize(enumerable));
                    continue;
                }

                if (value is int)
                {
                    output.Append((int)value);
                    continue;
                }

                throw new NotSupportedException("Cannot serialize objects of type " + value.GetType());
            }

            output.Append("}");
        }
    }
}