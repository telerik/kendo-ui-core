// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.
namespace Telerik.Web.Mvc.Infrastructure
{
    using System;
    using System.Collections.Generic;

    public class FluentDictionary
    {
        private readonly IDictionary<string, object> dictionary;

        internal FluentDictionary(IDictionary<string,object> dictionary)
        {
            this.dictionary = dictionary;
        }

        public static FluentDictionary For(IDictionary<string, object> dictionary)
        {
            return new FluentDictionary(dictionary);
        }

        public FluentDictionary Add<T>(string key, T value)
        {
            dictionary[key] = value;
            return this;
        }

        public FluentDictionary Add<T>(string key, T value, T defaultValue)
            where T : IComparable
        {
            if (value != null && value.CompareTo(defaultValue) != 0)
            {
                dictionary[key] = value;
            }

            return this;
        }

        public FluentDictionary Add<T>(string key, T value, Func<bool> condition)
        {
            if (condition())
            {
                dictionary[key] = value;
            }

            return this;
        }
    }
}
