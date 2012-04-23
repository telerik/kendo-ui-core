// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Extensions
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Collections.ObjectModel;
    using System.Diagnostics.CodeAnalysis;
    using System.Linq;
    
    public static class EnumerableExtensions
    {
        class GenericEnumerable<T> : IEnumerable<T>
        {
            private readonly IEnumerable source;

            /// <summary>
            /// Initializes a new instance of the <see cref="GenericEnumerable{T}"/> class.
            /// </summary>
            /// <param name="source">The source.</param>
            public GenericEnumerable(IEnumerable source)
            {
                this.source = source;
            }

            IEnumerator IEnumerable.GetEnumerator()
            {
                return this.source.GetEnumerator();
            }

            IEnumerator<T> IEnumerable<T>.GetEnumerator()
            {
                foreach (T item in this.source)
                {
                    yield return item;
                }
            }
        }

        public static void Each<T>(this IEnumerable<T> instance, Action<T, int> action)
        {
            int index = 0;
            foreach (T item in instance)
                action(item, index ++);
        }

        /// <summary>
        /// Executes the provided delegate for each item.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="instance">The instance.</param>
        /// <param name="action">The action to be applied.</param>
        public static void Each<T>(this IEnumerable<T> instance, Action<T> action)
        {
            foreach (T item in instance)
            {
                action(item);
            }
        }

        [SuppressMessage("Microsoft.Design", "CA1031:DoNotCatchGeneralExceptionTypes")]
        internal static IEnumerable AsGenericEnumerable(this IEnumerable source)
        {
            Type elementType = typeof(Object);

            Type type = source.GetType().FindGenericType(typeof(IEnumerable<>));
            if ( type != null )
            {
                return source;
            }

            IEnumerator enumerator = source.GetEnumerator();

            while (enumerator.MoveNext())
            {
                if (enumerator.Current != null)
                {
                    elementType = enumerator.Current.GetType();
                    try
                    {
                        enumerator.Reset();
                    }
                    catch
                    {
                    }
                    break;
                }
            }

            Type genericType = typeof(GenericEnumerable<>).MakeGenericType(elementType);
        	object[] constructorParameters = new object[] { source };

        	return (IEnumerable) Activator.CreateInstance(genericType, constructorParameters);
        }

        internal static int IndexOf(this IEnumerable source, object item)
        {
            int index = 0;
            foreach (object i in source)
            {
                if (Equals(i, item))
                {
                    return index;
                }

                index++;
            }

            return -1;
        }

        /// <exception cref="ArgumentOutOfRangeException"><c>index</c> is out of range.</exception>
        internal static object ElementAt(this IEnumerable source, int index)
        {
            if (index < 0)
            {
                throw new ArgumentOutOfRangeException("index");
            }

            var list = source as IList;
            if (list != null && list.Count > 0)
            {
                return list[index];
            }

            foreach (var item in source)
            {
                if ( index == 0 )
                {
                    return item;
                }

                index--;
            }

            return null;
        }

        //Source: http://work.j832.com/2008/01/selectrecursive-if-3rd-times-charm-4th.html
        public static IEnumerable<TSource> SelectRecursive<TSource>(this IEnumerable<TSource> source, 
            Func<TSource, IEnumerable<TSource>> recursiveSelector)
        {
            Stack<IEnumerator<TSource>> stack = new Stack<IEnumerator<TSource>>();
            stack.Push(source.GetEnumerator());

            try
            {
                while (stack.Count > 0)
                {
                    if (stack.Peek().MoveNext())
                    {
                        TSource current = stack.Peek().Current;

                        yield return current;

                        IEnumerable<TSource> children = recursiveSelector(current);
                        if (children != null)
                        {
                            stack.Push(children.GetEnumerator());
                        }
                    }
                    else
                    {
                        stack.Pop().Dispose();
                    }
                }
            }
            finally
            {
                while (stack.Count > 0)
                {
                    stack.Pop().Dispose();
                }
            }
        }

        /// <exception cref="ArgumentNullException"><c>first</c> is null.</exception>
        /// <exception cref="ArgumentNullException"><c>second</c> is null.</exception>
        /// <exception cref="ArgumentNullException"><c>resultSelector</c> is null.</exception>
        public static IEnumerable<TResult> Consolidate<TFirst, TSecond, TResult> (
            this IEnumerable<TFirst> first, IEnumerable<TSecond> second, Func<TFirst, TSecond, TResult> resultSelector)
        {
            if (first == null) throw new ArgumentNullException("first");
            if (second == null) throw new ArgumentNullException("second");
            if (resultSelector == null) throw new ArgumentNullException("resultSelector");

            return ZipIterator(first, second, resultSelector);
        }

        private static IEnumerable<TResult> ZipIterator<TFirst, TSecond, TResult>(
            IEnumerable<TFirst> first, IEnumerable<TSecond> second, Func<TFirst, TSecond, TResult> resultSelector)
        {
            using (IEnumerator<TFirst> e1 = first.GetEnumerator())
            using (IEnumerator<TSecond> e2 = second.GetEnumerator())
                while (e1.MoveNext() && e2.MoveNext())
                    yield return resultSelector(e1.Current, e2.Current);
        }

        public static ReadOnlyCollection<T> ToReadOnlyCollection<T>(this IEnumerable<T> sequence)
        {
            if (sequence == null)
            {
                return DefaultReadOnlyCollection<T>.Empty;
            }
            ReadOnlyCollection<T> onlys = sequence as ReadOnlyCollection<T>;
            if (onlys != null)
            {
                return onlys;
            }
            return new ReadOnlyCollection<T>(sequence.ToArray());
        }

        private static class DefaultReadOnlyCollection<T>
        {
            private static ReadOnlyCollection<T> defaultCollection;

            internal static ReadOnlyCollection<T> Empty
            {
                get
                {
                    if (defaultCollection == null)
                    {
                        defaultCollection = new ReadOnlyCollection<T>(new T[0]);
                    }
                    return defaultCollection;
                }
            }
        }
    }
}