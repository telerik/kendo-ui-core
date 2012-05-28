using System;
using System.Collections;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using Kendo.Mvc.Extensions;
using System.Web.Script.Serialization;

namespace Kendo.Mvc.Infrastructure
{
    public class JavaScriptInitializer : IJavaScriptInitializer
    {
        //Escape meta characters: http://api.jquery.com/category/selectors/
        private static readonly Regex EscapeRegex = new Regex(@"([;&,\.\+\*~'\:\""\!\^\$\[\]\(\)\|\/])", RegexOptions.Compiled);

        public virtual string Initialize(string id, string name, IDictionary<string, object> options)
        {
            return new StringBuilder().Append("jQuery(function(){jQuery(\"\\#")
                .Append(EscapeRegex.Replace(id, @"\\$1"))
                .Append("\").kendo")
                .Append(name)
                .Append("(")
                .Append(Serialize(options))
                .Append(");});")
                .ToString();
        }

        public virtual IJavaScriptSerializer CreateSerializer()
        {
            return new DefaultJavaScriptSerializer();
        }

        public virtual string Serialize( IDictionary<string, object> @object)
        {
            var output = new StringBuilder();

            output.Append("{");

            foreach (var keyValuePair in @object)
            {
                output.Append(",")
                      .Append(keyValuePair.Key)
                      .Append(":");

                var value = keyValuePair.Value;

                var @string = value as string;

                if (@string != null)
                {
                    output.Append(HttpUtility.JavaScriptStringEncode(@string, true));

                    continue;
                }

                var dictionary = value as IDictionary<string, object>;

                if (dictionary != null)
                {
                    output.Append(Serialize(dictionary));

                    continue;
                }

                var enumerable = value as IEnumerable;

                if (enumerable != null)
                {
                    var serializer = CreateSerializer();

                    output.Append(serializer.Serialize(enumerable));

                    continue;
                }

                if (value is bool)
                {
                    AppendBoolean(output, (bool)value);

                    continue;
                }

                if (value is DateTime)
                {
                    AppendDate(output, (DateTime)value);

                    continue;
                }

                if (value is int)
                {
                    output.Append((int)value);

                    continue;
                }

                if (value is double)
                {
                    output.Append(((double)value).ToString("r", CultureInfo.InvariantCulture));

                    continue;
                }

                if (value is float)
                {
                    output.Append(((float)value).ToString("r", CultureInfo.InvariantCulture));                    

                    continue;
                }                

                if (value == null)
                {
                    output.Append("null");

                    continue;
                }

                if (value.GetType().IsPrimitive || value is decimal)
                {
                    AppendConvertible(output, value);
                    continue;
                }

                var @event = value as ClientEvent;

                if (@event != null)
                {
                    AppendEvent(output, @event);

                    continue;
                }

                if (value is Enum)
                {
                    output.Append(HttpUtility.JavaScriptStringEncode(value.ToString().ToLower(), true));

                    continue;
                }

                throw new NotSupportedException("Cannot serialize objects of type " + value.GetType());
            }

            if (output.Length >= 2)
            {
                output.Remove(1, 1); // Remove the first comma
            }

            output.Append("}");

            return output.ToString();
        }

        private void AppendBoolean(StringBuilder output, bool value)
        {
            if (value)
            {
                output.Append("true");
            }
            else
            {
                output.Append("false");
            }
        }

        private void AppendEvent(StringBuilder output, ClientEvent value)
        {
            if (value.HandlerName.HasValue())
            {
                output.Append(value.HandlerName);
            }
            else if (value.InlineCodeBlock != null)
            {
                output.Append(value.InlineCodeBlock(value));
            }
        }

        private void AppendDate(StringBuilder output, DateTime value)
        {
            output.Append("new Date(")
                  .Append(value.Year)
                  .Append(",")
                  .Append(value.Month - 1)
                  .Append(",")
                  .Append(value.Day)
                  .Append(",")
                  .Append(value.Hour)
                  .Append(",")
                  .Append(value.Minute)
                  .Append(",")
                  .Append(value.Second)
                  .Append(",")
                  .Append(value.Millisecond)
                  .Append(")");
        }

        private void AppendConvertible(StringBuilder output, object value)
        {            
            var convertible = value as IConvertible;

            if (convertible != null)
            {
                output.Append(convertible.ToString(CultureInfo.InvariantCulture));
            }
        }
    }
}