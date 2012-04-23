// (c) Copyright Telerik Corp. 
// This source is subject to the Microsoft Public License. 
// See http://www.microsoft.com/opensource/licenses.mspx#Ms-PL. 
// All other rights reserved.

namespace Telerik.Web.Mvc.Tests
{
    using System;
    using System.Collections.Generic;

    using Extensions;

    using Xunit;

    public class LinkedObjectCollectionTests
    {
        private readonly LinkedObjectTestDouble _parent;
        private readonly LinkedObjectCollection<LinkedObjectTestDouble> _list;

        public LinkedObjectCollectionTests()
        {
            _parent = new LinkedObjectTestDouble();
            _list = new LinkedObjectCollection<LinkedObjectTestDouble>(_parent);
        }

        [Fact]
        public void Parent_should_be_same_which_is_passed_in_constructor()
        {
            Assert.Same(_parent, _list.Parent);
        }

        [Fact]
        public void Count_should_be_zero_when_new_instance_is_created()
        {
            Assert.Equal(0, _list.Count);
        }

        [Fact]
        public void IsReadOnly_should_be_always_false()
        {
            Assert.False(_list.IsReadOnly);
        }

        [Fact]
        public void Indexer_set_should_throw_exception_when_index_is_out_of_range()
        {
            Assert.Throws<ArgumentOutOfRangeException>(()=> _list[1] = new LinkedObjectTestDouble());
        }

        [Fact]
        public void Indexer_set_should_properly_rebuild_the_chain()
        {
            LinkedObjectTestDouble obj1 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj2 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj3 = new LinkedObjectTestDouble();

            _list.AddRange(new[] { obj1, obj2, obj3 });

            LinkedObjectTestDouble obj = new LinkedObjectTestDouble();

            _list[1] = obj;

            Assert.Null(obj1.PreviousSibling);
            Assert.Same(obj, obj1.NextSibling);

            Assert.Same(obj1, obj.PreviousSibling);
            Assert.Same(obj3, obj.NextSibling);

            Assert.Same(obj, obj3.PreviousSibling);
            Assert.Null(obj3.NextSibling);
        }

        [Fact]
        public void Index_set_should_set_parent()
        {
            LinkedObjectTestDouble obj1 = new LinkedObjectTestDouble();
            _list.Add(obj1);

            LinkedObjectTestDouble obj2 = new LinkedObjectTestDouble();

            _list[0] = obj2;

            Assert.Same(_parent, obj2.Parent);
        }

        [Fact]
        public void Index_set_should_cleanup_previous_item()
        {
            LinkedObjectTestDouble obj1 = new LinkedObjectTestDouble();
            _list.Add(obj1);

            LinkedObjectTestDouble obj2 = new LinkedObjectTestDouble();

            _list[0] = obj2;

            Assert.Null(obj1.Parent);
            Assert.Null(obj1.PreviousSibling);
            Assert.Null(obj1.NextSibling);
        }

        [Fact]
        public void Indexer_get_should_return_correct_object()
        {
            LinkedObjectTestDouble dummy = new LinkedObjectTestDouble();

            _list.Add(dummy);

            Assert.Same(dummy, _list[0]);
        }

        [Fact]
        public void Add_should_increase_collection()
        {
            _list.Add(new LinkedObjectTestDouble());

            Assert.Equal(1, _list.Count);
        }

        [Fact]
        public void Add_should_set_parent()
        {
            LinkedObjectTestDouble dummy = new LinkedObjectTestDouble();

            _list.Add(dummy);

            Assert.Same(_parent, dummy.Parent);
        }

        [Fact]
        public void Add_should_maintain_proper_chain()
        {
            LinkedObjectTestDouble obj1 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj2 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj3 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj4 = new LinkedObjectTestDouble();

            _list.Add(obj1);
            _list.Add(obj2);
            _list.Add(obj3);
            _list.Add(obj4);

            Assert.Null(obj1.PreviousSibling);
            Assert.Same(obj2, obj1.NextSibling);

            Assert.Same(obj1, obj2.PreviousSibling);
            Assert.Same(obj3, obj2.NextSibling);

            Assert.Same(obj2, obj3.PreviousSibling);
            Assert.Same(obj4, obj3.NextSibling);

            Assert.Same(obj3, obj4.PreviousSibling);
            Assert.Null(obj4.NextSibling);
        }

        [Fact]
        public void Clear_should_empty_the_collection()
        {
            _list.AddRange(new[] { new LinkedObjectTestDouble(), new LinkedObjectTestDouble() });

            _list.Clear();

            Assert.Empty(_list);
        }

        [Fact]
        public void Contains_should_return_true_when_specified_item_exists()
        {
            LinkedObjectTestDouble dummy = new LinkedObjectTestDouble();

            _list.Add(dummy);

            Assert.True(_list.Contains(dummy));
        }

        [Fact]
        public void CopyTo_should_copy_correct_items()
        {
            _list.AddRange(new[] { new LinkedObjectTestDouble(), new LinkedObjectTestDouble() });

            LinkedObjectTestDouble[] array = new LinkedObjectTestDouble[2];

            _list.CopyTo(array, 0);

            array.Each(item => Assert.True(_list.Contains(item)));
        }

        [Fact]
        public void GetEnumerator_should_return_correct_iterator()
        {
            _list.Add(new LinkedObjectTestDouble());

            IEnumerator<LinkedObjectTestDouble> iterator = _list.GetEnumerator();

            bool iterated = false;

            while(iterator.MoveNext())
            {
                iterated = true;
                break;
            }

            Assert.True(iterated);
        }

        [Fact]
        public void IndexOf_should_return_correct_index_when_item_exists()
        {
            LinkedObjectTestDouble dummy = new LinkedObjectTestDouble();

            _list.Add(dummy);

            Assert.Equal(0, _list.IndexOf(dummy));
        }

        [Fact]
        public void IndexOf_should_return_correct_index_when_item_does_not_exist()
        {
            LinkedObjectTestDouble dummy = new LinkedObjectTestDouble();

            _list.Add(dummy);

            Assert.Equal(-1, _list.IndexOf(new LinkedObjectTestDouble()));
        }

        [Fact]
        public void Insert_should_increase_the_collection()
        {
            _list.Insert(0, new LinkedObjectTestDouble());

            Assert.Equal(1, _list.Count);
        }

        [Fact]
        public void Insert_should_set_parent()
        {
            LinkedObjectTestDouble dummy = new LinkedObjectTestDouble();

            _list.Insert(0, dummy);

            Assert.Same(_parent, dummy.Parent);
        }

        [Fact]
        public void Insert_should_throw_exception_when_index_is_out_of_range()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => _list.Insert(1, new LinkedObjectTestDouble()));
        }

        [Fact]
        public void Insert_in_the_begining_should_properly_rebuild_the_chain()
        {
            LinkedObjectTestDouble obj1 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj2 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj3 = new LinkedObjectTestDouble();

            _list.AddRange(new[] { obj1, obj2, obj3 });

            LinkedObjectTestDouble obj = new LinkedObjectTestDouble();

            _list.Insert(0, obj);

            Assert.Null(obj.PreviousSibling);
            Assert.Same(obj1, obj.NextSibling);

            Assert.Same(obj, obj1.PreviousSibling);
            Assert.Same(obj2, obj1.NextSibling);

            Assert.Same(obj1, obj2.PreviousSibling);
            Assert.Same(obj3, obj2.NextSibling);

            Assert.Same(obj2, obj3.PreviousSibling);
            Assert.Null(obj3.NextSibling);
        }

        [Fact]
        public void Insert_in_the_middle_should_properly_rebuild_the_chain()
        {
            LinkedObjectTestDouble obj1 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj2 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj3 = new LinkedObjectTestDouble();

            _list.AddRange(new[] { obj1, obj2, obj3 });

            LinkedObjectTestDouble obj = new LinkedObjectTestDouble();

            _list.Insert(1, obj);

            Assert.Null(obj1.PreviousSibling);
            Assert.Same(obj, obj1.NextSibling);

            Assert.Same(obj1, obj.PreviousSibling);
            Assert.Same(obj2, obj.NextSibling);

            Assert.Same(obj, obj2.PreviousSibling);
            Assert.Same(obj3, obj2.NextSibling);

            Assert.Same(obj2, obj3.PreviousSibling);
            Assert.Null(obj3.NextSibling);
        }

        [Fact]
        public void Insert_in_the_end_should_properly_rebuild_the_chain()
        {
            LinkedObjectTestDouble obj1 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj2 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj3 = new LinkedObjectTestDouble();

            _list.AddRange(new[] { obj1, obj2, obj3 });

            LinkedObjectTestDouble obj = new LinkedObjectTestDouble();

            _list.Insert(3, obj);

            Assert.Null(obj1.PreviousSibling);
            Assert.Same(obj2, obj1.NextSibling);

            Assert.Same(obj1, obj2.PreviousSibling);
            Assert.Same(obj3, obj2.NextSibling);

            Assert.Same(obj2, obj3.PreviousSibling);
            Assert.Same(obj, obj3.NextSibling);

            Assert.Same(obj3, obj.PreviousSibling);
            Assert.Null(obj.NextSibling);
        }

        [Fact]
        public void Remove_should_return_true_when_item_removed()
        {
            LinkedObjectTestDouble dummy = new LinkedObjectTestDouble();

            _list.Add(dummy);

            Assert.True(_list.Remove(dummy));
        }

        [Fact]
        public void Remove_should_return_false_when_item_is_not_removed()
        {
            LinkedObjectTestDouble dummy = new LinkedObjectTestDouble();

            _list.Add(dummy);

            Assert.False(_list.Remove(new LinkedObjectTestDouble()));
        }

        [Fact]
        public void RemoveAt_should_throw_exception_when_index_is_out_of_range()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => _list.RemoveAt(2));
        }

        [Fact]
        public void RemoveAt_should_decrease_the_collection()
        {
            LinkedObjectTestDouble obj1 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj2 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj3 = new LinkedObjectTestDouble();

            _list.AddRange(new[] { obj1, obj2, obj3 });
            _list.RemoveAt(1);

            Assert.Equal(2, _list.Count);
        }

        [Fact]
        public void RemoveAt_at_the_begining_should_properly_rebuild_the_chain()
        {
            LinkedObjectTestDouble obj1 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj2 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj3 = new LinkedObjectTestDouble();

            _list.AddRange(new[] { obj1, obj2, obj3 });

            _list.RemoveAt(0);

            Assert.Null(obj2.PreviousSibling);
            Assert.Same(obj3, obj2.NextSibling);
            Assert.Same(obj2, obj3.PreviousSibling);
            Assert.Null(obj3.NextSibling);
        }

        [Fact]
        public void RemoveAt_at_the_middle_should_properly_rebuild_the_chain()
        {
            LinkedObjectTestDouble obj1 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj2 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj3 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj4 = new LinkedObjectTestDouble();

            _list.AddRange(new[] { obj1, obj2, obj3, obj4 });

            _list.RemoveAt(1);

            Assert.Null(obj1.PreviousSibling);
            Assert.Same(obj3, obj1.NextSibling);

            Assert.Same(obj1, obj3.PreviousSibling);
            Assert.Same(obj4, obj3.NextSibling);

            Assert.Same(obj3, obj4.PreviousSibling);
            Assert.Null(obj4.NextSibling);
        }

        [Fact]
        public void RemoveAt_at_the_end_should_properly_rebuild_the_chain()
        {
            LinkedObjectTestDouble obj1 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj2 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj3 = new LinkedObjectTestDouble();

            _list.AddRange(new[] { obj1, obj2, obj3 });

            _list.RemoveAt(2);

            Assert.Null(obj1.PreviousSibling);
            Assert.Same(obj2, obj1.NextSibling);

            Assert.Same(obj1, obj2.PreviousSibling);
            Assert.Null(obj2.NextSibling);
        }

        [Fact]
        public void RemoveAt_should_cleanup_the_removed_item()
        {
            LinkedObjectTestDouble obj1 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj2 = new LinkedObjectTestDouble();
            LinkedObjectTestDouble obj3 = new LinkedObjectTestDouble();

            _list.AddRange(new[] { obj1, obj2, obj3 });

            _list.RemoveAt(1);

            Assert.Null(obj2.Parent);
            Assert.Null(obj2.PreviousSibling);
            Assert.Null(obj2.NextSibling);
        }
    }

    public class LinkedObjectTestDouble : LinkedObjectBase<LinkedObjectTestDouble>
    {
    }
}