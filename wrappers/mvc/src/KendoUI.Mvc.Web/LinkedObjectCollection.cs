// (c) Copyright 2002-2010 Telerik 
// This source is subject to the GNU General Public License, version 2
// See http://www.gnu.org/licenses/gpl-2.0.html. 
// All other rights reserved.

namespace Telerik.Web.Mvc
{
    using System;
    using System.Collections;
    using System.Collections.Generic;

    using Infrastructure;

    /// <summary>
    /// Defines methods to manipulate generic link object collections.
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class LinkedObjectCollection<T> : IList<T> where T : LinkedObjectBase<T>
    {
        private readonly IList<T> innerList = new List<T>();

        /// <summary>
        /// Initializes a new instance of the <see cref="LinkedObjectCollection&lt;T&gt;"/> class.
        /// </summary>
        /// <param name="parent">The parent.</param>
        public LinkedObjectCollection(T parent)
        {
            Parent = parent;
        }

        /// <summary>
        /// Gets or sets the T object that is the parent of the current node.
        /// </summary>
        /// <value>The parent.</value>
        public T Parent
        {
            get;
            protected set;
        }

        /// <summary>
        /// Gets the number of elements contained in the <see cref="T:System.Collections.Generic.ICollection`1"/>.
        /// </summary>
        /// <value></value>
        /// <returns>The number of elements contained in the <see cref="T:System.Collections.Generic.ICollection`1"/>.</returns>
        public int Count
        {
            get
            {
                return innerList.Count;
            }
        }

        /// <summary>
        /// Gets a value indicating whether the <see cref="T:System.Collections.Generic.ICollection`1"/> is read-only.
        /// </summary>
        /// <value></value>
        /// <returns>true if the <see cref="T:System.Collections.Generic.ICollection`1"/> is read-only; otherwise, false.</returns>
        public bool IsReadOnly
        {
            get
            {
                return innerList.IsReadOnly;
            }
        }

        /// <summary>
        /// Gets or sets the <see cref="T"/> at the specified index.
        /// </summary>
        /// <value></value>
        public T this[int index]
        {
            get
            {
                return innerList[index];
            }

            set
            {
                if ((index < 0) || (index >= innerList.Count))
                {
                    throw new ArgumentOutOfRangeException("index");
                }

                Guard.IsNotNull(value, "value");

                T previousObject = null;
                T nextObject = null;

                if (index > 0)
                {
                    previousObject = innerList[index - 1];
                    previousObject.NextSibling = value;
                }

                if (index + 1 < innerList.Count)
                {
                    nextObject = innerList[index + 1];
                    nextObject.PreviousSibling = value;
                }

                value.Parent = Parent;
                value.PreviousSibling = previousObject;
                value.NextSibling = nextObject;

                Cleanup(index);

                innerList[index] = value;
            }
        }

        /// <summary>
        /// Adds an item to the <see cref="T:System.Collections.Generic.ICollection`1"/>.
        /// </summary>
        /// <param name="item">The object to add to the <see cref="T:System.Collections.Generic.ICollection`1"/>.</param>
        /// <exception cref="T:System.NotSupportedException">The <see cref="T:System.Collections.Generic.ICollection`1"/> is read-only.</exception>
        public void Add(T item)
        {
            Guard.IsNotNull(item, "item");

            item.Parent = Parent;

            if (innerList.Count > 0)
            {
                T previousObject = innerList[innerList.Count - 1];

                previousObject.NextSibling = item;
                item.PreviousSibling = previousObject;
            }

            innerList.Add(item);
        }

        /// <summary>
        /// Removes all items from the <see cref="T:System.Collections.Generic.ICollection`1"/>.
        /// </summary>
        /// <exception cref="T:System.NotSupportedException">The <see cref="T:System.Collections.Generic.ICollection`1"/> is read-only. </exception>
        public void Clear()
        {
            foreach (T item in innerList)
            {
                Cleanup(item);
            }

            innerList.Clear();
        }

        /// <summary>
        /// Determines whether the <see cref="T:System.Collections.Generic.ICollection`1"/> contains a specific value.
        /// </summary>
        /// <param name="item">The object to locate in the <see cref="T:System.Collections.Generic.ICollection`1"/>.</param>
        /// <returns>
        /// true if <paramref name="item"/> is found in the <see cref="T:System.Collections.Generic.ICollection`1"/>; otherwise, false.
        /// </returns>
        public bool Contains(T item)
        {
            return innerList.Contains(item);
        }

        /// <summary>
        /// Copies the elements of the <see cref="T:System.Collections.Generic.ICollection`1"/> to an <see cref="T:System.Array"/>, starting at a particular <see cref="T:System.Array"/> index.
        /// </summary>
        /// <param name="array">The one-dimensional <see cref="T:System.Array"/> that is the destination of the elements copied from <see cref="T:System.Collections.Generic.ICollection`1"/>. The <see cref="T:System.Array"/> must have zero-based indexing.</param>
        /// <param name="arrayIndex">The zero-based index in <paramref name="array"/> at which copying begins.</param>
        /// <exception cref="T:System.ArgumentNullException">
        /// <paramref name="array"/> is null.
        /// </exception>
        /// <exception cref="T:System.ArgumentOutOfRangeException">
        /// <paramref name="arrayIndex"/> is less than 0.
        /// </exception>
        /// <exception cref="T:System.ArgumentException">
        /// <paramref name="array"/> is multidimensional.
        /// -or-
        /// <paramref name="arrayIndex"/> is equal to or greater than the length of <paramref name="array"/>.
        /// -or-
        /// The number of elements in the source <see cref="T:System.Collections.Generic.ICollection`1"/> is greater than the available space from <paramref name="arrayIndex"/> to the end of the destination <paramref name="array"/>.
        /// -or-
        /// Type <paramref name="T"/> cannot be cast automatically to the type of the destination <paramref name="array"/>.
        /// </exception>
        public void CopyTo(T[] array, int arrayIndex)
        {
            innerList.CopyTo(array, arrayIndex);
        }

        /// <summary>
        /// Returns an enumerator that iterates through the collection.
        /// </summary>
        /// <returns>
        /// A <see cref="T:System.Collections.Generic.IEnumerator`1"/> that can be used to iterate through the collection.
        /// </returns>
        public IEnumerator<T> GetEnumerator()
        {
            return innerList.GetEnumerator();
        }

        /// <summary>
        /// Determines the index of a specific item in the <see cref="T:System.Collections.Generic.IList`1"/>.
        /// </summary>
        /// <param name="item">The object to locate in the <see cref="T:System.Collections.Generic.IList`1"/>.</param>
        /// <returns>
        /// The index of <paramref name="item"/> if found in the list; otherwise, -1.
        /// </returns>
        public int IndexOf(T item)
        {
            return innerList.IndexOf(item);
        }

        /// <summary>
        /// Inserts an item to the <see cref="T:System.Collections.Generic.IList`1"/> at the specified index.
        /// </summary>
        /// <param name="index">The zero-based index at which <paramref name="item"/> should be inserted.</param>
        /// <param name="item">The object to insert into the <see cref="T:System.Collections.Generic.IList`1"/>.</param>
        /// <exception cref="T:System.ArgumentOutOfRangeException">
        /// <paramref name="index"/> is not a valid index in the <see cref="T:System.Collections.Generic.IList`1"/>.</exception>
        /// <exception cref="T:System.NotSupportedException">The <see cref="T:System.Collections.Generic.IList`1"/> is read-only.</exception>
        public void Insert(int index, T item)
        {
            if ((index < 0) || (index > innerList.Count))
            {
                throw new ArgumentOutOfRangeException("index");
            }

            Guard.IsNotNull(item, "item");

            if (index == innerList.Count)
            {
                Add(item);
            }
            else
            {
                item.Parent = Parent;

                T previousObject = null;

                if (index > 0)
                {
                    previousObject = innerList[index - 1];
                    previousObject.NextSibling = item;
                }

                T oldObject = innerList[index];
                oldObject.PreviousSibling = item;

                item.PreviousSibling = previousObject;
                item.NextSibling = oldObject;

                innerList.Insert(index, item);
            }
        }

        /// <summary>
        /// Removes the first occurrence of a specific object from the <see cref="T:System.Collections.Generic.ICollection`1"/>.
        /// </summary>
        /// <param name="item">The object to remove from the <see cref="T:System.Collections.Generic.ICollection`1"/>.</param>
        /// <returns>
        /// true if <paramref name="item"/> was successfully removed from the <see cref="T:System.Collections.Generic.ICollection`1"/>; otherwise, false. This method also returns false if <paramref name="item"/> is not found in the original <see cref="T:System.Collections.Generic.ICollection`1"/>.
        /// </returns>
        /// <exception cref="T:System.NotSupportedException">The <see cref="T:System.Collections.Generic.ICollection`1"/> is read-only.</exception>
        public bool Remove(T item)
        {
            int index = IndexOf(item);

            if (index > -1)
            {
                RemoveAt(index);

                return true;
            }

            return false;
        }

        /// <summary>
        /// Removes the <see cref="T:System.Collections.Generic.IList`1"/> item at the specified index.
        /// </summary>
        /// <param name="index">The zero-based index of the item to remove.</param>
        /// <exception cref="T:System.ArgumentOutOfRangeException">
        /// <paramref name="index"/> is not a valid index in the <see cref="T:System.Collections.Generic.IList`1"/>.</exception>
        /// <exception cref="T:System.NotSupportedException">The <see cref="T:System.Collections.Generic.IList`1"/> is read-only.</exception>
        public void RemoveAt(int index)
        {
            if ((index < 0) || (index >= innerList.Count))
            {
                throw new ArgumentOutOfRangeException("index");
            }

            T previousNode = null;
            T nextNode = null;

            if (index > 0)
            {
                previousNode = innerList[index - 1];
            }

            if (index + 1 < innerList.Count)
            {
                nextNode = innerList[index + 1];
            }

            if (previousNode != null)
            {
                previousNode.NextSibling = nextNode;
            }

            if (nextNode != null)
            {
                nextNode.PreviousSibling = previousNode;
            }

            Cleanup(index);

            innerList.RemoveAt(index);
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }

        private static void Cleanup(T item)
        {
            item.PreviousSibling = null;
            item.NextSibling = null;
            item.Parent = null;
        }

        private void Cleanup(int index)
        {
            if (innerList.Count > 0)
            {
                if ((index > -1) && (index < innerList.Count))
                {
                    Cleanup(innerList[index]);
                }
            }
        }
    }
}