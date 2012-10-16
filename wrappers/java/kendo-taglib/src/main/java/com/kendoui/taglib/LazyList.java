package com.kendoui.taglib;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

public class LazyList<T> implements List<T>{
    private final List<T> list;
    private final Factory<T> factory;

    public LazyList(Factory<T> factory) {
        this.list = new ArrayList<T>();
        this.factory = factory;
    }
    
    @Override
    public boolean add(T e) {
        return list.add(e);
    }

    @Override
    public void add(int index, T element) {
        list.add(index, element);
    }

    @Override
    public boolean addAll(Collection<? extends T> c) {
        return list.addAll(c);
    }

    @Override
    public boolean addAll(int index, Collection<? extends T> c) {
        return list.addAll(index, c);
    }

    @Override
    public void clear() {
        list.clear();
    }

    @Override
    public boolean contains(Object o) {
        return list.contains(o);
    }

    @Override
    public boolean containsAll(Collection<?> c) {
        return list.containsAll(c);
    }

    @Override
    public T get(int index) {
        int size = this.list.size();

        T element = null;
        if (index < size) {
            element = this.list.get(index);
            if (element == null) {
                element = this.factory.create();
                this.list.set(index, element);
            }
        } else {
            for (int x = size; x < index; x++) {
                this.list.add(null);
            }
            element = this.factory.create();
            this.list.add(element);
        }
        
        return element;
    }

    @Override
    public int indexOf(Object o) {
        return list.indexOf(o);
    }

    @Override
    public boolean isEmpty() {
        return list.isEmpty();
    }

    @Override
    public Iterator<T> iterator() {
        return list.iterator();
    }

    @Override
    public int lastIndexOf(Object o) {
        return list.lastIndexOf(o);
    }

    @Override
    public ListIterator<T> listIterator() {
        return list.listIterator();
    }

    @Override
    public ListIterator<T> listIterator(int index) {
        return list.listIterator(index);
    }

    @Override
    public boolean remove(Object o) {
        return list.remove(o);
    }

    @Override
    public T remove(int index) {
        return list.remove(index);
    }

    @Override
    public boolean removeAll(Collection<?> c) {
        return list.removeAll(c);
    }

    @Override
    public boolean retainAll(Collection<?> c) {
        return list.retainAll(c);
    }

    @Override
    public T set(int index, T element) {
        return list.set(index, element);
    }

    @Override
    public int size() {
        return list.size();
    }

    @Override
    public List<T> subList(int fromIndex, int toIndex) {
        return list.subList(fromIndex, toIndex);
    }

    @Override
    public Object[] toArray() {
        return list.toArray();
    }

    @SuppressWarnings("hiding")
    @Override
    public <T> T[] toArray(T[] a) {
        return list.toArray(a);
    }
    
}
