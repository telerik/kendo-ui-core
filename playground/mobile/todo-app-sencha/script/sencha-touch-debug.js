/*
    Copyright(c) 2010 Sencha Inc.
    licensing@sencha.com
    http://www.sencha.com/touchlicense
*/

if (typeof Ext === "undefined") {
    Ext = {};
}


Ext.apply = (function() {
    
    for(var key in {valueOf:1}) {
        return function(object, config, defaults) {
            
            if (defaults) {
                Ext.apply(object, defaults);
            }
            if (object && config && typeof config === 'object') {
                for (var key in config) {
                    object[key] = config[key];
                }
            }
            return object;
        };
    }
    return function(object, config, defaults) {
        
        if (defaults) {
            Ext.apply(object, defaults);
        }
        if (object && config && typeof config === 'object') {
            for (var key in config) {
                object[key] = config[key];
            }
            if (config.toString !== Object.prototype.toString) {
                object.toString = config.toString;
            }
            if (config.valueOf !== Object.prototype.valueOf) {
                object.valueOf = config.valueOf;
            }
        }
        return object;
    };
})();

Ext.apply(Ext, {
    platformVersion: '1.0',
    platformVersionDetail: {
        major: 1,
        minor: 0,
        patch: 3
    },
    userAgent: navigator.userAgent.toLowerCase(),
    cache: {},
    idSeed: 1000,
    BLANK_IMAGE_URL : 'data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
    isStrict: document.compatMode == "CSS1Compat",

    windowId: 'ext-window',
    documentId: 'ext-document',

    
    emptyFn : function() {},

    
    isSecure : /^https/i.test(window.location.protocol),

    
    isReady : false,

    
    enableGarbageCollector : true,

    
    enableListenerCollection : true,

    
    applyIf : function(object, config) {
        var property, undefined;

        if (object) {
            for (property in config) {
                if (object[property] === undefined) {
                    object[property] = config[property];
                }
            }
        }

        return object;
    },

    
    repaint : function() {
        var mask = Ext.getBody().createChild({
            cls: 'x-mask x-mask-transparent'
        });
        setTimeout(function() {
            mask.remove();
        }, 0);
    },

    
    id : function(el, prefix) {
        el = Ext.getDom(el) || {};
        if (el === document) {
            el.id = this.documentId;
        }
        else if (el === window) {
            el.id = this.windowId;
        }
        el.id = el.id || ((prefix || 'ext-gen') + (++Ext.idSeed));
        return el.id;
    },

    
    extend : function() {
        
        var inlineOverrides = function(o){
            for (var m in o) {
                if (!o.hasOwnProperty(m)) {
                    continue;
                }
                this[m] = o[m];
            }
        };

        var objectConstructor = Object.prototype.constructor;

        return function(subclass, superclass, overrides){
            
            if (Ext.isObject(superclass)) {
                overrides = superclass;
                superclass = subclass;
                subclass = overrides.constructor != objectConstructor
                    ? overrides.constructor
                    : function(){ superclass.apply(this, arguments); };
            }

            if (!superclass) {
                throw "Attempting to extend from a class which has not been loaded on the page.";
            }

            
            var F = function(){},
                subclassProto,
                superclassProto = superclass.prototype;

            F.prototype = superclassProto;
            subclassProto = subclass.prototype = new F();
            subclassProto.constructor = subclass;
            subclass.superclass = superclassProto;

            if(superclassProto.constructor == objectConstructor){
                superclassProto.constructor = superclass;
            }

            subclass.override = function(overrides){
                Ext.override(subclass, overrides);
            };

            subclassProto.superclass = subclassProto.supr = (function(){
                return superclassProto;
            });

            subclassProto.override = inlineOverrides;
            subclassProto.proto = subclassProto;

            subclass.override(overrides);
            subclass.extend = function(o) {
                return Ext.extend(subclass, o);
            };

            return subclass;
        };
    }(),

    
    override : function(origclass, overrides) {
        Ext.apply(origclass.prototype, overrides);
    },

    
    namespace : function() {
        var ln = arguments.length,
            i, value, split, x, xln, parts, object;

        for (i = 0; i < ln; i++) {
            value = arguments[i];
            parts = value.split(".");
            if (window.Ext) {
                object = window[parts[0]] = Object(window[parts[0]]);
            } else {
                object = arguments.callee.caller.arguments[0];
            }
            for (x = 1, xln = parts.length; x < xln; x++) {
                object = object[parts[x]] = Object(object[parts[x]]);
            }
        }
        return object;
    },

    
    urlEncode : function(o, pre) {
        var empty,
            buf = [],
            e = encodeURIComponent;

        Ext.iterate(o, function(key, item){
            empty = Ext.isEmpty(item);
            Ext.each(empty ? key : item, function(val){
                buf.push('&', e(key), '=', (!Ext.isEmpty(val) && (val != key || !empty)) ? (Ext.isDate(val) ? Ext.encode(val).replace(/"/g, '') : e(val)) : '');
            });
        });

        if(!pre){
            buf.shift();
            pre = '';
        }

        return pre + buf.join('');
    },

    
    urlDecode : function(string, overwrite) {
        if (Ext.isEmpty(string)) {
            return {};
        }

        var obj = {},
            pairs = string.split('&'),
            d = decodeURIComponent,
            name,
            value;

        Ext.each(pairs, function(pair) {
            pair = pair.split('=');
            name = d(pair[0]);
            value = d(pair[1]);
            obj[name] = overwrite || !obj[name] ? value : [].concat(obj[name]).concat(value);
        });

        return obj;
    },

    
    htmlEncode : function(value) {
        return Ext.util.Format.htmlEncode(value);
    },

    
    htmlDecode : function(value) {
         return Ext.util.Format.htmlDecode(value);
    },

    
    urlAppend : function(url, s) {
        if (!Ext.isEmpty(s)) {
            return url + (url.indexOf('?') === -1 ? '?' : '&') + s;
        }
        return url;
    },

    
     toArray : function(array, start, end) {
        return Array.prototype.slice.call(array, start || 0, end || array.length);
     },

     
     each : function(array, fn, scope) {
         if (Ext.isEmpty(array, true)) {
             return 0;
         }
         if (!Ext.isIterable(array) || Ext.isPrimitive(array)) {
             array = [array];
         }
         for (var i = 0, len = array.length; i < len; i++) {
             if (fn.call(scope || array[i], array[i], i, array) === false) {
                 return i;
             }
         }
         return true;
     },

     
     iterate : function(obj, fn, scope) {
         if (Ext.isEmpty(obj)) {
             return;
         }
         if (Ext.isIterable(obj)) {
             Ext.each(obj, fn, scope);
             return;
         }
         else if (Ext.isObject(obj)) {
             for (var prop in obj) {
                 if (obj.hasOwnProperty(prop)) {
                     if (fn.call(scope || obj, prop, obj[prop], obj) === false) {
                         return;
                     }
                 }
             }
         }
     },

    
    pluck : function(arr, prop) {
        var ret = [];
        Ext.each(arr, function(v) {
            ret.push(v[prop]);
        });
        return ret;
    },

    
    getBody : function() {
        return Ext.get(document.body || false);
    },

    
    getHead : function() {
        var head;

        return function() {
            if (head == undefined) {
                head = Ext.get(DOC.getElementsByTagName("head")[0]);
            }

            return head;
        };
    }(),

    
    getDoc : function() {
        return Ext.get(document);
    },

    
    getCmp : function(id) {
        return Ext.ComponentMgr.get(id);
    },

    
    getOrientation: function() {
        return window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
    },

    isIterable : function(v) {
        if (!v) {
            return false;
        }
        
        if (Ext.isArray(v) || v.callee) {
            return true;
        }
        
        if (/NodeList|HTMLCollection/.test(Object.prototype.toString.call(v))) {
            return true;
        }

        
        
        return ((typeof v.nextNode != 'undefined' || v.item) && Ext.isNumber(v.length)) || false;
    },

    
    num : function(v, defaultValue) {
        v = Number(Ext.isEmpty(v) || Ext.isArray(v) || typeof v == 'boolean' || (typeof v == 'string' && Ext.util.Format.trim(v).length == 0) ? NaN : v);
        return isNaN(v) ? defaultValue : v;
    },

    
    isEmpty : function(value, allowBlank) {
        var isNull       = value == null,
            emptyArray   = (Ext.isArray(value) && !value.length),
            blankAllowed = !allowBlank ? value === '' : false;

        return isNull || emptyArray || blankAllowed;
    },

    
    isArray : function(v) {
        return Object.prototype.toString.apply(v) === '[object Array]';
    },

    
    isDate : function(v) {
        return Object.prototype.toString.apply(v) === '[object Date]';
    },

    
    isObject : function(v) {
        return !!v && !v.tagName && Object.prototype.toString.call(v) === '[object Object]';
    },

    
    isPrimitive : function(v) {
        return Ext.isString(v) || Ext.isNumber(v) || Ext.isBoolean(v);
    },

    
    isFunction : function(v) {
        return Object.prototype.toString.apply(v) === '[object Function]';
    },

    
    isNumber : function(v) {
        return Object.prototype.toString.apply(v) === '[object Number]' && isFinite(v);
    },

    
    isString : function(v) {
        return typeof v === 'string';
    },

    
    isBoolean : function(v) {
        return Object.prototype.toString.apply(v) === '[object Boolean]';
    },

    
    isElement : function(v) {
        return v ? !!v.tagName : false;
    },

    
    isDefined : function(v){
        return typeof v !== 'undefined';
    },

    
    destroy : function() {
        var ln = arguments.length,
            i, arg;

        for (i = 0; i < ln; i++) {
            arg = arguments[i];
            if (arg) {
                if (Ext.isArray(arg)) {
                    this.destroy.apply(this, arg);
                }
                else if (Ext.isFunction(arg.destroy)) {
                    arg.destroy();
                }
                else if (arg.dom) {
                    arg.remove();
                }
            }
        }
    }
});


Ext.SSL_SECURE_URL = Ext.isSecure && 'about:blank';

Ext.ns = Ext.namespace;

Ext.ns(
    'Ext.util',
    'Ext.data',
    'Ext.list',
    'Ext.form',
    'Ext.menu',
    'Ext.state',
    'Ext.layout',
    'Ext.app',
    'Ext.ux',
    'Ext.plugins',
    'Ext.direct',
    'Ext.lib',
    'Ext.gesture'
);



Ext.util.Observable = Ext.extend(Object, {
    
    
    isObservable: true,

    constructor: function(config) {
        var me = this;

        Ext.apply(me, config);
        if (me.listeners) {
            me.on(me.listeners);
            delete me.listeners;
        }
        me.events = me.events || {};

        if (this.bubbleEvents) {
            this.enableBubble(this.bubbleEvents);
        }
    },

    
    eventOptionsRe : /^(?:scope|delay|buffer|single|stopEvent|preventDefault|stopPropagation|normalized|args|delegate|element|vertical|horizontal)$/,

    
    addManagedListener : function(item, ename, fn, scope, options) {
        var me = this,
            managedListeners = me.managedListeners = me.managedListeners || [],
            config;

        if (Ext.isObject(ename)) {
            options = ename;
            for (ename in options) {
                if (!options.hasOwnProperty(ename)) {
                    continue;
                }
                config = options[ename];
                if (!me.eventOptionsRe.test(ename)) {
                    me.addManagedListener(item, ename, config.fn || config, config.scope || options.scope, config.fn ? config : options);
                }
            }
        }
        else {
            managedListeners.push({
                item: item,
                ename: ename,
                fn: fn,
                scope: scope,
                options: options
            });

            item.on(ename, fn, scope, options);
        }
    },

    
     removeManagedListener : function(item, ename, fn, scope) {
        var me = this,
            o,
            config,
            managedListeners,
            managedListener,
            length,
            i;

        if (Ext.isObject(ename)) {
            o = ename;
            for (ename in o) {
                if (!o.hasOwnProperty(ename)) {
                    continue;
                }
                config = o[ename];
                if (!me.eventOptionsRe.test(ename)) {
                    me.removeManagedListener(item, ename, config.fn || config, config.scope || o.scope);
                }
            }
        }

        managedListeners = this.managedListeners ? this.managedListeners.slice() : [];
        length = managedListeners.length;

        for (i = 0; i < length; i++) {
            managedListener = managedListeners[i];
            if (managedListener.item === item && managedListener.ename === ename && (!fn || managedListener.fn === fn) && (!scope || managedListener.scope === scope)) {
                this.managedListeners.remove(managedListener);
                item.un(managedListener.ename, managedListener.fn, managedListener.scope);
            }
        }
    },

    
    fireEvent: function() {
        var me = this,
            a = Ext.toArray(arguments),
            ename = a[0].toLowerCase(),
            ret = true,
            ev = me.events[ename],
            queue = me.eventQueue,
            parent;

        if (me.eventsSuspended === true) {
            if (queue) {
                queue.push(a);
            }
            return false;
        }
        else if (ev && Ext.isObject(ev) && ev.bubble) {
            if (ev.fire.apply(ev, a.slice(1)) === false) {
                return false;
            }
            parent = me.getBubbleTarget && me.getBubbleTarget();
            if (parent && parent.isObservable) {
                if (!parent.events[ename] || !Ext.isObject(parent.events[ename]) || !parent.events[ename].bubble) {
                    parent.enableBubble(ename);
                }
                return parent.fireEvent.apply(parent, a);
            }
        }
        else if (ev && Ext.isObject(ev)) {
            a.shift();
            ret = ev.fire.apply(ev, a);
        }
        return ret;
    },

    
    addListener: function(ename, fn, scope, o) {
        var me = this,
            config,
            ev;

        if (Ext.isObject(ename)) {
            o = ename;
            for (ename in o) {
                if (!o.hasOwnProperty(ename)) {
                    continue;
                }
                config = o[ename];
                if (!me.eventOptionsRe.test(ename)) {
                    me.addListener(ename, config.fn || config, config.scope || o.scope, config.fn ? config : o);
                }
            }
        }
        else {
            ename = ename.toLowerCase();
            me.events[ename] = me.events[ename] || true;
            ev = me.events[ename] || true;
            if (Ext.isBoolean(ev)) {
                me.events[ename] = ev = new Ext.util.Event(me, ename);
            }
            ev.addListener(fn, scope, Ext.isObject(o) ? o: {});
        }
    },

    
    removeListener: function(ename, fn, scope) {
        var me = this,
            config,
            ev;

        if (Ext.isObject(ename)) {
            var o = ename;
            for (ename in o) {
                if (!o.hasOwnProperty(ename)) {
                    continue;
                }
                config = o[ename];
                if (!me.eventOptionsRe.test(ename)) {
                    me.removeListener(ename, config.fn || config, config.scope || o.scope);
                }
            }
        }
        else {
            ename = ename.toLowerCase();
            ev = me.events[ename];
            if (ev.isEvent) {
                ev.removeListener(fn, scope);
            }
        }
    },

    
    clearListeners: function() {
        var events = this.events,
            ev,
            key;

        for (key in events) {
            if (!events.hasOwnProperty(key)) {
                continue;
            }
            ev = events[key];
            if (ev.isEvent) {
                ev.clearListeners();
            }
        }

        this.clearManagedListeners();
    },

    purgeListeners : function() {
        console.warn('MixedCollection: purgeListeners has been deprecated. Please use clearListeners.');
        return this.clearListeners.apply(this, arguments);
    },

    
    clearManagedListeners : function() {
        var managedListeners = this.managedListeners || [],
            ln = managedListeners.length,
            i, managedListener;

        for (i = 0; i < ln; i++) {
            managedListener = managedListeners[i];
            managedListener.item.un(managedListener.ename, managedListener.fn, managedListener.scope);
        }

        this.managedListener = [];
    },

    purgeManagedListeners : function() {
        console.warn('MixedCollection: purgeManagedListeners has been deprecated. Please use clearManagedListeners.');
        return this.clearManagedListeners.apply(this, arguments);
    },

    
    addEvents: function(o) {
        var me = this;
            me.events = me.events || {};
        if (Ext.isString(o)) {
            var a = arguments,
            i = a.length;
            while (i--) {
                me.events[a[i]] = me.events[a[i]] || true;
            }
        } else {
            Ext.applyIf(me.events, o);
        }
    },

    
    hasListener: function(ename) {
        var e = this.events[ename];
        return e.isEvent === true && e.listeners.length > 0;
    },

    
    suspendEvents: function(queueSuspended) {
        this.eventsSuspended = true;
        if (queueSuspended && !this.eventQueue) {
            this.eventQueue = [];
        }
    },

    
    resumeEvents: function() {
        var me = this,
            queued = me.eventQueue || [];

        me.eventsSuspended = false;
        delete me.eventQueue;

        Ext.each(queued,
        function(e) {
            me.fireEvent.apply(me, e);
        });
    },

    
    relayEvents : function(origin, events, prefix) {
        prefix = prefix || '';
        var me = this,
            len = events.length,
            i, ename;

        function createHandler(ename){
            return function(){
                return me.fireEvent.apply(me, [prefix + ename].concat(Array.prototype.slice.call(arguments, 0, -1)));
            };
        }

        for(i = 0, len = events.length; i < len; i++){
            ename = events[i].substr(prefix.length);
            me.events[ename] = me.events[ename] || true;
            origin.on(ename, createHandler(ename), me);
        }
    },

    
    enableBubble: function(events) {
        var me = this;
        if (!Ext.isEmpty(events)) {
            events = Ext.isArray(events) ? events: Ext.toArray(arguments);
            Ext.each(events,
            function(ename) {
                ename = ename.toLowerCase();
                var ce = me.events[ename] || true;
                if (Ext.isBoolean(ce)) {
                    ce = new Ext.util.Event(me, ename);
                    me.events[ename] = ce;
                }
                ce.bubble = true;
            });
        }
    }
});

Ext.override(Ext.util.Observable, {
    
    on: Ext.util.Observable.prototype.addListener,
    
    un: Ext.util.Observable.prototype.removeListener,

    mon: Ext.util.Observable.prototype.addManagedListener,
    mun: Ext.util.Observable.prototype.removeManagedListener
});


Ext.util.Observable.releaseCapture = function(o) {
    o.fireEvent = Ext.util.Observable.prototype.fireEvent;
};


Ext.util.Observable.capture = function(o, fn, scope) {
    o.fireEvent = Ext.createInterceptor(o.fireEvent, fn, scope);
};


Ext.util.Observable.observe = function(cls, listeners) {
    if (cls) {
        if (!cls.isObservable) {
            Ext.applyIf(cls, new Ext.util.Observable());
            Ext.util.Observable.capture(cls.prototype, cls.fireEvent, cls);
        }
        if (typeof listeners == 'object') {
            cls.on(listeners);
        }
        return cls;
    }
};


Ext.util.Observable.observeClass = Ext.util.Observable.observe;

Ext.util.Event = Ext.extend(Object, (function() {
    function createBuffered(handler, listener, o, scope) {
        listener.task = new Ext.util.DelayedTask();
        return function() {
            listener.task.delay(o.buffer, handler, scope, Ext.toArray(arguments));
        };
    };

    function createDelayed(handler, listener, o, scope) {
        return function() {
            var task = new Ext.util.DelayedTask();
            if (!listener.tasks) {
                listener.tasks = [];
            }
            listener.tasks.push(task);
            task.delay(o.delay || 10, handler, scope, Ext.toArray(arguments));
        };
    };

    function createSingle(handler, listener, o, scope) {
        return function() {
            listener.ev.removeListener(listener.fn, scope);
            return handler.apply(scope, arguments);
        };
    };

    return {
        isEvent: true,

        constructor: function(observable, name) {
            this.name = name;
            this.observable = observable;
            this.listeners = [];
        },

        addListener: function(fn, scope, options) {
            var me = this,
                listener;
                scope = scope || me.observable;

            if (!me.isListening(fn, scope)) {
                listener = me.createListener(fn, scope, options);
                if (me.firing) {
                    
                    me.listeners = me.listeners.slice(0);
                }
                me.listeners.push(listener);
            }
        },

        createListener: function(fn, scope, o) {
            o = o || {};
            scope = scope || this.observable;

            var listener = {
                    fn: fn,
                    scope: scope,
                    o: o,
                    ev: this
                },
                handler = fn;

            if (o.delay) {
                handler = createDelayed(handler, listener, o, scope);
            }
            if (o.buffer) {
                handler = createBuffered(handler, listener, o, scope);
            }
            if (o.single) {
                handler = createSingle(handler, listener, o, scope);
            }

            listener.fireFn = handler;
            return listener;
        },

        findListener: function(fn, scope) {
            var listeners = this.listeners,
            i = listeners.length,
            listener,
            s;

            while (i--) {
                listener = listeners[i];
                if (listener) {
                    s = listener.scope;
                    if (listener.fn == fn && (s == scope || s == this.observable)) {
                        return i;
                    }
                }
            }

            return - 1;
        },

        isListening: function(fn, scope) {
            return this.findListener(fn, scope) !== -1;
        },

        removeListener: function(fn, scope) {
            var me = this,
                index,
                listener,
                k;
            index = me.findListener(fn, scope);
            if (index != -1) {
                listener = me.listeners[index];

                if (me.firing) {
                    me.listeners = me.listeners.slice(0);
                }

                
                if (listener.task) {
                    listener.task.cancel();
                    delete listener.task;
                }

                
                k = listener.tasks && listener.tasks.length;
                if (k) {
                    while (k--) {
                        listener.tasks[k].cancel();
                    }
                    delete listener.tasks;
                }

                
                me.listeners.splice(index, 1);
                return true;
            }

            return false;
        },

        
        clearListeners: function() {
            var listeners = this.listeners,
                i = listeners.length;

            while (i--) {
                this.removeListener(listeners[i].fn, listeners[i].scope);
            }
        },

        fire: function() {
            var me = this,
                listeners = me.listeners,
                count = listeners.length,
                i,
                args,
                listener;

            if (count > 0) {
                me.firing = true;
                for (i = 0; i < count; i++) {
                    listener = listeners[i];
                    args = arguments.length ? Array.prototype.slice.call(arguments, 0) : [];
                    if (listener.o) {
                        args.push(listener.o);
                    }
                    if (listener && listener.fireFn.apply(listener.scope || me.observable, args) === false) {
                        return (me.firing = false);
                    }
                }
            }
            me.firing = false;
            return true;
        }
    };
})());


Ext.util.Stateful = Ext.extend(Ext.util.Observable, {
    
    
    editing : false,
    
    
    dirty : false,
    
    
    persistanceProperty: 'data',
    
    constructor: function(config) {
        Ext.applyIf(this, {
            data: {}
        });        
        
        
        this.modified = {};
        
        this[this.persistanceProperty] = {};
        
        Ext.util.Stateful.superclass.constructor.call(this, config);
    },
    
    
    get: function(field) {
        return this[this.persistanceProperty][field];
    },
    
    
    set: function(fieldName, value) {
        var fields = this.fields,
            convertFields = [],
            field, key, i;
        
        
        if (arguments.length == 1 && Ext.isObject(fieldName)) {
            for (key in fieldName) {
                if (!fieldName.hasOwnProperty(key)) {
                    continue;
                }
                
                
                
                field = fields.get(key);
                if (field && field.convert !== field.type.convert) {
                    convertFields.push(key);
                    continue;
                }
                
                this.set(key, fieldName[key]);
            }
            
            for (i = 0; i < convertFields.length; i++) {
                field = convertFields[i];
                this.set(field, fieldName[field]);
            }
            
        } else {
            if (fields) {
                field = fields.get(fieldName);
                
                if (field && field.convert) {
                    value = field.convert(value, this);
                }
            }
            
            this[this.persistanceProperty][fieldName] = value;

            this.dirty = true;

            if (!this.editing) {
                this.afterEdit();
            }
        }
    },
    
    
    getChanges : function(){
        var modified = this.modified,
            changes  = {},
            field;
            
        for (field in modified) {
            if (modified.hasOwnProperty(field)){
                changes[field] = this[this.persistanceProperty][field];
            }
        }
        
        return changes;
    },
    
    
    isModified : function(fieldName) {
        return !!(this.modified && this.modified.hasOwnProperty(fieldName));
    },
    
    
    setDirty : function() {
        this.dirty = true;
        
        if (!this.modified) {
            this.modified = {};
        }
        
        this.fields.each(function(field) {
            this.modified[field.name] = this[this.persistanceProperty][field.name];
        }, this);
    },
    
    markDirty : function() {
        throw new Error("Stateful: markDirty has been deprecated. Please use setDirty.");
    },
    
    
    reject : function(silent) {
        var modified = this.modified,
            field;
            
        for (field in modified) {
            if (!modified.hasOwnProperty(field)) {
                continue;
            }
            if (typeof modified[field] != "function") {
                this[this.persistanceProperty][field] = modified[field];
            }
        }
        
        this.dirty = false;
        this.editing = false;
        delete this.modified;
        
        if (silent !== true) {
            this.afterReject();
        }
    },
    
    
    commit : function(silent) {
        this.dirty = false;
        this.editing = false;
        
        delete this.modified;
        
        if (silent !== true) {
            this.afterCommit();
        }
    },
    
    
    copy : function(newId) {
        return new this.constructor(Ext.apply({}, this[this.persistanceProperty]), newId || this.internalId);
    }
});

Ext.util.HashMap = Ext.extend(Ext.util.Observable, {
    constructor: function(config) {
        this.addEvents(
            
            'add',
            
            'clear',
            
            'remove',
            
            'replace'
        );
        
        Ext.util.HashMap.superclass.constructor.call(this, config);
        
        this.clear(true);
    },

    
    getCount: function() {
        return this.length;
    },
    
    
    getData: function(key, value) {
        
        if (value === undefined) {
            value = key;
            key = this.getKey(value);
        }
        
        return [key, value];
    },
    
    
    getKey: function(o) {
        return o.id;    
    },

    
    add: function(key, value) {
        var me = this,
            data;
            
        if (me.containsKey(key)) {
            throw new Error('This key already exists in the HashMap');
        }
        
        data = this.getData(key, value);
        key = data[0];
        value = data[1];
        me.map[key] = value;
        ++me.length;
        me.fireEvent('add', me, key, value);
        return value;
    },

    
    replace: function(key, value) {
        var me = this,
            map = me.map,
            old;
            
        if (!me.containsKey(key)) {
            me.add(key, value);
        }
        old = map[key];
        map[key] = value;
        me.fireEvent('replace', me, key, value, old);
        return value;
    },

    
    remove: function(o) {
        var key = this.findKey(o);
        if (key !== undefined) {
            return this.removeByKey(key);
        }
        return false;
    },

    
    removeByKey: function(key) {
        var me = this,
            value;
            
        if (me.containsKey(key)) {
            value = me.map[key];
            delete me.map[key];
            --me.length;
            me.fireEvent('remove', me, key, value);
            return true;
        }
        return false;
    },

    
    get: function(key) {
        return this.map[key];
    },

    
    clear: function( initial) {
        var me = this;
        me.map = {};
        me.length = 0;
        if (initial !== true) {
            me.fireEvent('clear', me);
        }
        return me;
    },

    
    containsKey: function(key) {
        return this.map[key] !== undefined;
    },

    
    contains: function(value) {
        return this.containsKey(this.findKey(value));
    },

    
    getKeys: function() {
        return this.getArray(true);
    },

    
    getValues: function() {
        return this.getArray(false);
    },

    
    getArray: function(isKey) {
        var arr = [],
            key,
            map = this.map;
        for (key in map) {
            if (map.hasOwnProperty(key)) {
                arr.push(isKey ? key: map[key]);
            }
        }
        return arr;
    },

    
    each: function(fn, scope) { 
        
        var items = Ext.apply({}, this.map),
            key,
            length = this.length;

        scope = scope || this;
        for (key in items) {
            if (items.hasOwnProperty(key)) {
                if (fn.call(scope, key, items[key], length) === false) {
                    break;
                }
            }
        }
        return this;
    },

    
    clone: function() {
        var hash = new Ext.util.HashMap(),
            map = this.map,
            key;
            
        hash.suspendEvents();
        for (key in map) {
            if (map.hasOwnProperty(key)) {
                hash.add(key, map[key]);
            }
        }
        hash.resumeEvents();
        return hash;
    },

    
    findKey: function(value) {
        var key,
            map = this.map;

        for (key in map) {
            if (map.hasOwnProperty(key) && map[key] === value) {
                return key;
            }
        }
        return undefined;
    }
});

Ext.util.MixedCollection = function(allowFunctions, keyFn) {
    this.items = [];
    this.map = {};
    this.keys = [];
    this.length = 0;
    this.addEvents(
        
        'clear',
        
        'add',
        
        'replace',
        
        'remove',
        'sort'
    );
    this.allowFunctions = allowFunctions === true;
    if (keyFn) {
        this.getKey = keyFn;
    }
    Ext.util.MixedCollection.superclass.constructor.call(this);
};

Ext.extend(Ext.util.MixedCollection, Ext.util.Observable, {

    
    allowFunctions : false,

    
    add : function(key, obj){
        var myObj = obj, myKey = key;
        if(arguments.length == 1){
            myObj = myKey;
            myKey = this.getKey(myObj);
        }
        if(typeof myKey != 'undefined' && myKey !== null){
            var old = this.map[myKey];
            if(typeof old != 'undefined'){
                return this.replace(myKey, myObj);
            }
            this.map[myKey] = myObj;
        }
        this.length++;
        this.items.push(myObj);
        this.keys.push(myKey);
        this.fireEvent('add', this.length-1, myObj, myKey);
        return myObj;
    },

    
    getKey : function(o){
         return o.id;
    },

    
    replace : function(key, o){
        if(arguments.length == 1){
            o = arguments[0];
            key = this.getKey(o);
        }
        var old = this.map[key];
        if(typeof key == 'undefined' || key === null || typeof old == 'undefined'){
             return this.add(key, o);
        }
        var index = this.indexOfKey(key);
        this.items[index] = o;
        this.map[key] = o;
        this.fireEvent('replace', key, old, o);
        return o;
    },

    
    addAll : function(objs){
        if(arguments.length > 1 || Ext.isArray(objs)){
            var args = arguments.length > 1 ? arguments : objs;
            for(var i = 0, len = args.length; i < len; i++){
                this.add(args[i]);
            }
        }else{
            for(var key in objs){
                if (!objs.hasOwnProperty(key)) {
                    continue;
                }
                if(this.allowFunctions || typeof objs[key] != 'function'){
                    this.add(key, objs[key]);
                }
            }
        }
    },

    
    each : function(fn, scope){
        var items = [].concat(this.items); 
        for(var i = 0, len = items.length; i < len; i++){
            if(fn.call(scope || items[i], items[i], i, len) === false){
                break;
            }
        }
    },

    
    eachKey : function(fn, scope){
        for(var i = 0, len = this.keys.length; i < len; i++){
            fn.call(scope || window, this.keys[i], this.items[i], i, len);
        }
    },

    
    findBy : function(fn, scope) {
        for(var i = 0, len = this.items.length; i < len; i++){
            if(fn.call(scope || window, this.items[i], this.keys[i])){
                return this.items[i];
            }
        }
        return null;
    },
    

    
    insert : function(index, key, obj){
        var myKey = key, myObj = obj;
        if(arguments.length == 2){
            myObj = myKey;
            myKey = this.getKey(myObj);
        }
        if(this.containsKey(myKey)){
            this.suspendEvents();
            this.removeByKey(myKey);
            this.resumeEvents();
        }
        if(index >= this.length){
            return this.add(myKey, myObj);
        }
        this.length++;
        this.items.splice(index, 0, myObj);
        if(typeof myKey != 'undefined' && myKey !== null){
            this.map[myKey] = myObj;
        }
        this.keys.splice(index, 0, myKey);
        this.fireEvent('add', index, myObj, myKey);
        return myObj;
    },

    
    remove : function(o){
        return this.removeAt(this.indexOf(o));
    },

    
    removeAll : function(items){
        Ext.each(items || [], function(item) {
            this.remove(item);
        }, this);

        return this;
    },

    
    removeAt : function(index){
        if(index < this.length && index >= 0){
            this.length--;
            var o = this.items[index];
            this.items.splice(index, 1);
            var key = this.keys[index];
            if(typeof key != 'undefined'){
                delete this.map[key];
            }
            this.keys.splice(index, 1);
            this.fireEvent('remove', o, key);
            return o;
        }
        return false;
    },

    
    removeByKey : function(key){
        return this.removeAt(this.indexOfKey(key));
    },
    
    removeKey : function() {
        console.warn('MixedCollection: removeKey has been deprecated. Please use removeByKey.');
        return this.removeByKey.apply(this, arguments);
    },

    
    getCount : function(){
        return this.length;
    },

    
    indexOf : function(o){
        return this.items.indexOf(o);
    },

    
    indexOfKey : function(key){
        return this.keys.indexOf(key);
    },

    
    get : function(key) {
        var mk = this.map[key],
            item = mk !== undefined ? mk : (typeof key == 'number') ? this.items[key] : undefined;
        return typeof item != 'function' || this.allowFunctions ? item : null; 
    },
    
    item : function() {
        console.warn('MixedCollection: item has been deprecated. Please use get.');
        return this.get.apply(this, arguments);
    },

    
    getAt : function(index) {
        return this.items[index];
    },

    itemAt : function() {
        console.warn('MixedCollection: itemAt has been deprecated. Please use getAt.');
        return this.getAt.apply(this, arguments);
    },
    
    
    getByKey : function(key) {
        return this.map[key];
    },

    key : function() {
        console.warn('MixedCollection: key has been deprecated. Please use getByKey.');
        return this.getByKey.apply(this, arguments);
    },
    
    
    contains : function(o){
        return this.indexOf(o) != -1;
    },

    
    containsKey : function(key){
        return typeof this.map[key] != 'undefined';
    },

    
    clear : function(){
        this.length = 0;
        this.items = [];
        this.keys = [];
        this.map = {};
        this.fireEvent('clear');
    },

    
    first : function() {
        return this.items[0];
    },

    
    last : function() {
        return this.items[this.length-1];
    },

    
    _sort : function(property, dir, fn){
        var i, len,
            dsc   = String(dir).toUpperCase() == 'DESC' ? -1 : 1,

            
            c     = [],
            keys  = this.keys,
            items = this.items;

        
        fn = fn || function(a, b) {
            return a - b;
        };

        
        for(i = 0, len = items.length; i < len; i++){
            c[c.length] = {
                key  : keys[i],
                value: items[i],
                index: i
            };
        }

        
        c.sort(function(a, b){
            var v = fn(a[property], b[property]) * dsc;
            if(v === 0){
                v = (a.index < b.index ? -1 : 1);
            }
            return v;
        });

        
        for(i = 0, len = c.length; i < len; i++){
            items[i] = c[i].value;
            keys[i]  = c[i].key;
        }

        this.fireEvent('sort', this);
    },

    
    sort : function(property, direction) {
        
        var sorters = property;
        
        
        if (Ext.isString(property)) {
            sorters = [new Ext.util.Sorter({
                property : property,
                direction: direction || "ASC"
            })];
        } else if (property instanceof Ext.util.Sorter) {
            sorters = [property];
        } else if (Ext.isObject(property)) {
            sorters = [new Ext.util.Sorter(property)];
        }
        
        var length = sorters.length;
        
        if (length == 0) {
            return;
        }
                
        
        var sorterFn = function(r1, r2) {
            var result = sorters[0].sort(r1, r2),
                length = sorters.length,
                i;
            
                
                for (i = 1; i < length; i++) {
                    result = result || sorters[i].sort.call(this, r1, r2);
                }                
           
            return result;
        };
        
        this.sortBy(sorterFn);
    },
    
    
    sortBy: function(sorterFn) {
        var items  = this.items,
            keys   = this.keys,
            length = items.length,
            temp   = [],
            i;
        
        
        for (i = 0; i < length; i++) {
            temp[i] = {
                key  : keys[i],
                value: items[i],
                index: i
            };
        }
        
        temp.sort(function(a, b) {
            var v = sorterFn(a.value, b.value);
            if (v === 0) {
                v = (a.index < b.index ? -1 : 1);
            }
            
            return v;
        });
        
        
        for (i = 0; i < length; i++) {
            items[i] = temp[i].value;
            keys[i]  = temp[i].key;
        }
        
        this.fireEvent('sort', this);
    },

    
    reorder: function(mapping) {
        this.suspendEvents();

        var items = this.items,
            index = 0,
            length = items.length,
            order = [],
            remaining = [],
            oldIndex;

        
        for (oldIndex in mapping) {
            order[mapping[oldIndex]] = items[oldIndex];
        }

        for (index = 0; index < length; index++) {
            if (mapping[index] == undefined) {
                remaining.push(items[index]);
            }
        }

        for (index = 0; index < length; index++) {
            if (order[index] == undefined) {
                order[index] = remaining.shift();
            }
        }

        this.clear();
        this.addAll(order);

        this.resumeEvents();
        this.fireEvent('sort', this);
    },

    
    sortByKey : function(dir, fn){
        this._sort('key', dir, fn || function(a, b){
            var v1 = String(a).toUpperCase(), v2 = String(b).toUpperCase();
            return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
        });
    },
    
    keySort : function() {
        console.warn('MixedCollection: keySort has been deprecated. Please use sortByKey.');
        return this.sortByKey.apply(this, arguments);
    },
    

    
    getRange : function(start, end){
        var items = this.items;
        if(items.length < 1){
            return [];
        }
        start = start || 0;
        end = Math.min(typeof end == 'undefined' ? this.length-1 : end, this.length-1);
        var i, r = [];
        if(start <= end){
            for(i = start; i <= end; i++) {
                r[r.length] = items[i];
            }
        }else{
            for(i = start; i >= end; i--) {
                r[r.length] = items[i];
            }
        }
        return r;
    },

    
    filter : function(property, value, anyMatch, caseSensitive) {
        var filters = [];
        
        
        if (Ext.isString(property)) {
            filters.push(new Ext.util.Filter({
                property     : property,
                value        : value,
                anyMatch     : anyMatch,
                caseSensitive: caseSensitive
            }));
        } else if (Ext.isArray(property) || property instanceof Ext.util.Filter) {
            filters = filters.concat(property);
        }
        
        
        
        var filterFn = function(record) {
            var isMatch = true,
                length = filters.length,
                i;

            for (i = 0; i < length; i++) {
                var filter = filters[i],
                    fn     = filter.filterFn,
                    scope  = filter.scope;

                isMatch = isMatch && fn.call(scope, record);
            }

            return isMatch;
        };
        
        return this.filterBy(filterFn);
    },

    
    filterBy : function(fn, scope) {
        var newMC  = new Ext.util.MixedCollection(),
            keys   = this.keys, 
            items  = this.items,
            length = items.length,
            i;
            
        newMC.getKey = this.getKey;
        
        for (i = 0; i < length; i++) {
            if (fn.call(scope||this, items[i], keys[i])) {
                newMC.add(keys[i], items[i]);
            }
        }
        
        return newMC;
    },

    
    findIndex : function(property, value, start, anyMatch, caseSensitive){
        if(Ext.isEmpty(value, false)){
            return -1;
        }
        value = this.createValueMatcher(value, anyMatch, caseSensitive);
        return this.findIndexBy(function(o){
            return o && value.test(o[property]);
        }, null, start);
    },

    
    findIndexBy : function(fn, scope, start){
        var k = this.keys, it = this.items;
        for(var i = (start||0), len = it.length; i < len; i++){
            if(fn.call(scope||this, it[i], k[i])){
                return i;
            }
        }
        return -1;
    },

    
    createValueMatcher : function(value, anyMatch, caseSensitive, exactMatch) {
        if (!value.exec) { 
            var er = Ext.util.Format.escapeRegex;
            value = String(value);

            if (anyMatch === true) {
                value = er(value);
            } else {
                value = '^' + er(value);
                if (exactMatch === true) {
                    value += '$';
                }
            }
            value = new RegExp(value, caseSensitive ? '' : 'i');
         }
         return value;
    },

    
    clone : function(){
        var r = new Ext.util.MixedCollection();
        var k = this.keys, it = this.items;
        for(var i = 0, len = it.length; i < len; i++){
            r.add(k[i], it[i]);
        }
        r.getKey = this.getKey;
        return r;
    }
});




Ext.AbstractManager = Ext.extend(Object, {
    typeName: 'type',

    constructor: function(config) {
        Ext.apply(this, config || {});

        
        this.all = new Ext.util.HashMap();

        this.types = {};
    },

    
    get : function(id) {
        return this.all.get(id);
    },

    
    register: function(item) {
        this.all.add(item);
    },

    
    unregister: function(item) {
        this.all.remove(item);
    },

    
    registerType : function(type, cls) {
        this.types[type] = cls;
        cls[this.typeName] = type;
    },

    
    isRegistered : function(type){
        return this.types[type] !== undefined;
    },

    
    create: function(config, defaultType) {
        var type        = config[this.typeName] || config.type || defaultType,
            Constructor = this.types[type];

        if (Constructor == undefined) {
            throw new Error(Ext.util.Format.format("The '{0}' type has not been registered with this manager", type));
        }

        return new Constructor(config);
    },

    
    onAvailable : function(id, fn, scope){
        var all = this.all;

        all.on("add", function(index, o){
            if (o.id == id) {
                fn.call(scope || o, o);
                all.un("add", fn, scope);
            }
        });
    },
    
    
    each: function(fn, scope){
        this.all.each(fn, scope || this);    
    },
    
    
    getCount: function(){
        return this.all.getCount();
    }
});


Ext.util.DelayedTask = function(fn, scope, args) {
    var me = this,
        id,
        call = function() {
            clearInterval(id);
            id = null;
            fn.apply(scope, args || []);
        };

    
    this.delay = function(delay, newFn, newScope, newArgs) {
        me.cancel();
        fn = newFn || fn;
        scope = newScope || scope;
        args = newArgs || args;
        id = setInterval(call, delay);
    };

    
    this.cancel = function(){
        if (id) {
            clearInterval(id);
            id = null;
        }
    };
};

Ext.util.GeoLocation = Ext.extend(Ext.util.Observable, {
    
    autoUpdate: true,

    
    
    latitude: null,
    
    longitude: null,
    
    accuracy: null,
    
    altitude: null,
    
    altitudeAccuracy: null,
    
    heading: null,
    
    speed: null,
    
    timestamp: null,

    
    
    allowHighAccuracy: false,
    
    
    timeout: Infinity,
    
    maximumAge: 0,
    
    setMaximumAge: function(maximumAge) {
        this.maximumAge = maximumAge;
        this.setAutoUpdate(this.autoUpdate);
    },
    
    setTimeout: function(timeout) {
        this.timeout = timeout;
        this.setAutoUpdate(this.autoUpdate);
    },
    
    setAllowHighAccuracy: function(allowHighAccuracy) {
        this.allowHighAccuracy = allowHighAccuracy;
        this.setAutoUpdate(this.autoUpdate);
    },
    

    
    provider : null,
    
    watchOperation : null,

    constructor : function(config) {
        Ext.apply(this, config);
        

        this.coords = this; //@deprecated


        if (Ext.supports.GeoLocation) {
            this.provider = this.provider || 
                (navigator.geolocation ? navigator.geolocation : 
                (window.google || {}).gears ? google.gears.factory.create('beta.geolocation') : null);           
        }
        
        this.addEvents(
            
            'update',
            
            'locationerror',
            
            'locationupdate'
        );

        Ext.util.GeoLocation.superclass.constructor.call(this);

        if(this.autoUpdate){
            var me = this;
            setTimeout(function(){
                me.setAutoUpdate(me.autoUpdate);
            }, 0);
        }
    },

    
    setAutoUpdate : function(autoUpdate) {
        if (this.watchOperation !== null) {
            this.provider.clearWatch(this.watchOperation);
            this.watchOperation = null;
        }
        if (!autoUpdate) {
            return true;
        }
        if (!Ext.supports.GeoLocation) {
            this.fireEvent('locationerror', this, false, false, true, null);
            return false;
        }
        try{
            this.watchOperation = this.provider.watchPosition(
                Ext.createDelegate(this.fireUpdate, this), 
                Ext.createDelegate(this.fireError, this), 
                this.parseOptions());
        }
        catch(e){
            this.autoUpdate = false;
            this.fireEvent('locationerror', this, false, false, true, e.message);
            return false;
        }
        return true;
    },

    
    updateLocation : function(callback, scope, positionOptions) {
        var me = this;

        var failFunction = function(message, error){
            if(error){
                me.fireError(error);
            }
            else{
                me.fireEvent('locationerror', me, false, false, true, message);
            }
            if(callback){
                callback.call(scope || me, null, me); 
            }
            me.fireEvent('update', false, me); 
        };

        if (!Ext.supports.GeoLocation) {
            setTimeout(function() {
                failFunction(null);
            }, 0);
            return;
        }

        try{
            this.provider.getCurrentPosition(
                
                function(position){
                    me.fireUpdate(position);
                    if(callback){
                        callback.call(scope || me, me, me); 
                    }
                    me.fireEvent('update', me, me); 
                },
                
                function(error){
                    failFunction(null, error);
                },
                positionOptions ? positionOptions : this.parseOptions());
        }
        catch(e){
            setTimeout(function(){
                failFunction(e.message);
            }, 0);
        }
    },

    
    fireUpdate: function(position){
        this.timestamp = position.timestamp;
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.accuracy = position.coords.accuracy;
        this.altitude = position.coords.altitude;
        this.altitudeAccuracy = position.coords.altitudeAccuracy;
        
        
        this.heading = typeof position.coords.heading == 'undefined' ? null : position.coords.heading;
        this.speed = typeof position.coords.speed == 'undefined' ? null : position.coords.speed;
        this.fireEvent('locationupdate', this);
    },
    fireError: function(error){
        this.fireEvent('locationerror', this,
            error.code == error.TIMEOUT, 
            error.code == error.PERMISSION_DENIED, 
            error.code == error.POSITION_UNAVAILABLE,
            error.message == undefined ? null : error.message);
    },
    parseOptions: function(){
        var ret = { 
            maximumAge: this.maximumAge, 
            allowHighAccuracy: this.allowHighAccuracy
        };
        
        if(this.timeout !== Infinity){
            ret.timeout = this.timeout;
        }
        return ret;
    },

    
    getLocation : function(callback, scope) {
        var me = this;
        if(this.latitude !== null){
            callback.call(scope || me, me, me);
        }
        else {
            me.updateLocation(callback, scope);
        }
    }
});

Ext.util.Region = Ext.extend(Object, {
    
    constructor : function(t, r, b, l) {
        var me = this;
        me.top = t;
        me[1] = t;
        me.right = r;
        me.bottom = b;
        me.left = l;
        me[0] = l;
    },

    
    contains : function(region) {
        var me = this;
        return (region.left >= me.left &&
                region.right <= me.right &&
                region.top >= me.top &&
                region.bottom <= me.bottom);

    },

    
    intersect : function(region) {
        var me = this,
            t = Math.max(me.top, region.top),
            r = Math.min(me.right, region.right),
            b = Math.min(me.bottom, region.bottom),
            l = Math.max(me.left, region.left);

        if (b > t && r > l) {
            return new Ext.util.Region(t, r, b, l);
        }
        else {
            return false;
        }
    },

    
    union : function(region) {
        var me = this,
            t = Math.min(me.top, region.top),
            r = Math.max(me.right, region.right),
            b = Math.max(me.bottom, region.bottom),
            l = Math.min(me.left, region.left);

        return new Ext.util.Region(t, r, b, l);
    },

    
    constrainTo : function(r) {
        var me = this,
            constrain = Ext.util.Numbers.constrain;
        me.top = constrain(me.top, r.top, r.bottom);
        me.bottom = constrain(me.bottom, r.top, r.bottom);
        me.left = constrain(me.left, r.left, r.right);
        me.right = constrain(me.right, r.left, r.right);
        return me;
    },

    
    adjust : function(t, r, b, l) {
        var me = this;
        me.top += t;
        me.left += l;
        me.right += r;
        me.bottom += b;
        return me;
    },

    
    getOutOfBoundOffset: function(axis, p) {
        if (!Ext.isObject(axis)) {
            if (axis == 'x') {
                return this.getOutOfBoundOffsetX(p);
            } else {
                return this.getOutOfBoundOffsetY(p);
            }
        } else {
            p = axis;
            var d = new Ext.util.Offset();
                d.x = this.getOutOfBoundOffsetX(p.x);
                d.y = this.getOutOfBoundOffsetY(p.y);
            return d;
        }

    },

    
    getOutOfBoundOffsetX: function(p) {
        if (p <= this.left) {
            return this.left - p;
        } else if (p >= this.right) {
            return this.right - p;
        }

        return 0;
    },

    
    getOutOfBoundOffsetY: function(p) {
        if (p <= this.top) {
            return this.top - p;
        } else if (p >= this.bottom) {
            return this.bottom - p;
        }

        return 0;
    },

    
    isOutOfBound: function(axis, p) {
        if (!Ext.isObject(axis)) {
            if (axis == 'x') {
                return this.isOutOfBoundX(p);
            } else {
                return this.isOutOfBoundY(p);
            }
        } else {
            p = axis;
            return (this.isOutOfBoundX(p.x) || this.isOutOfBoundY(p.y));
        }
    },

    
    isOutOfBoundX: function(p) {
        return (p < this.left || p > this.right);
    },

    
    isOutOfBoundY: function(p) {
        return (p < this.top || p > this.bottom);
    },

    
    restrict: function(axis, p, factor) {
        if (Ext.isObject(axis)) {
            var newP;

            factor = p;
            p = axis;

            if (p.copy) {
                newP = p.copy();
            }
            else {
                newP = {
                    x: p.x,
                    y: p.y
                };
            }

            newP.x = this.restrictX(p.x, factor);
            newP.y = this.restrictY(p.y, factor);
            return newP;
        } else {
            if (axis == 'x') {
                return this.restrictX(p, factor);
            } else {
                return this.restrictY(p, factor);
            }
        }
    },

    
    restrictX : function(p, factor) {
        if (!factor) {
            factor = 1;
        }

        if (p <= this.left) {
            p -= (p - this.left) * factor;
        }
        else if (p >= this.right) {
            p -= (p - this.right) * factor;
        }
        return p;
    },

    
    restrictY : function(p, factor) {
        if (!factor) {
            factor = 1;
        }

        if (p <= this.top) {
            p -= (p - this.top) * factor;
        }
        else if (p >= this.bottom) {
            p -= (p - this.bottom) * factor;
        }
        return p;
    },

    
    getSize: function() {
        return {
            width: this.right - this.left,
            height: this.bottom - this.top
        };
    },

    
    copy: function() {
        return new Ext.util.Region(this.top, this.right, this.bottom, this.left);
    },

    
    toString: function() {
        return "Region[" + this.top + "," + this.right + "," + this.bottom + "," + this.left + "]";
    },


    
    translateBy: function(offset) {
        this.left += offset.x;
        this.right += offset.x;
        this.top += offset.y;
        this.bottom += offset.y;

        return this;
    },

    
    round: function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);

        return this;
    },

    
    equals: function(region) {
        return (this.top == region.top && this.right == region.right && this.bottom == region.bottom && this.left == region.left)
    }
});


Ext.util.Region.getRegion = function(el) {
    return Ext.fly(el).getPageBox(true);
};


Ext.util.Region.from = function(o) {
    return new Ext.util.Region(o.top, o.right, o.bottom, o.left);
};


Ext.util.Point = Ext.extend(Object, {
    constructor: function(x, y) {
        this.x = (x != null && !isNaN(x)) ? x : 0;
        this.y = (y != null && !isNaN(y)) ? y : 0;

        return this;
    },

    
    copy: function() {
        return new Ext.util.Point(this.x, this.y);
    },

    
    copyFrom: function(p) {
        this.x = p.x;
        this.y = p.y;

        return this;
    },

    
    toString: function() {
        return "Point[" + this.x + "," + this.y + "]";
    },

    
    equals: function(p) {
        return (this.x == p.x && this.y == p.y);
    },

    
    isWithin: function(p, threshold) {
        if (!Ext.isObject(threshold)) {
            threshold = {x: threshold};
            threshold.y = threshold.x;
        }

        return (this.x <= p.x + threshold.x && this.x >= p.x - threshold.x &&
                this.y <= p.y + threshold.y && this.y >= p.y - threshold.y);
    },

    
    translate: function(x, y) {
        if (x != null && !isNaN(x))
            this.x += x;

        if (y != null && !isNaN(y))
            this.y += y;
    },

    
    roundedEquals: function(p) {
        return (Math.round(this.x) == Math.round(p.x) && Math.round(this.y) == Math.round(p.y));
    }
});


Ext.util.Point.fromEvent = function(e) {
    var a = (e.changedTouches && e.changedTouches.length > 0) ? e.changedTouches[0] : e;
    return new Ext.util.Point(a.pageX, a.pageY);
};
Ext.util.Offset = Ext.extend(Object, {
    constructor: function(x, y) {
        this.x = (x != null && !isNaN(x)) ? x : 0;
        this.y = (y != null && !isNaN(y)) ? y : 0;

        return this;
    },

    copy: function() {
        return new Ext.util.Offset(this.x, this.y);
    },

    copyFrom: function(p) {
        this.x = p.x;
        this.y = p.y;
    },

    toString: function() {
        return "Offset[" + this.x + "," + this.y + "]";
    },

    equals: function(offset) {
        if(!(offset instanceof Ext.util.Offset))
            throw new Error('offset must be an instance of Ext.util.Offset');

        return (this.x == offset.x && this.y == offset.y);
    },

    round: function(to) {
        if (!isNaN(to)) {
            var factor = Math.pow(10, to);
            this.x = Math.round(this.x * factor) / factor;
            this.y = Math.round(this.y * factor) / factor;
        } else {
            this.x = Math.round(this.x);
            this.y = Math.round(this.y);
        }
    },

    isZero: function() {
        return this.x == 0 && this.y == 0;
    }
});

Ext.util.Offset.fromObject = function(obj) {
    return new Ext.util.Offset(obj.x, obj.y);
};

Ext.Template = Ext.extend(Object, {
    constructor: function(html) {
        var me = this,
            args = arguments,
            buffer = [],
            value, i, length;
            
        me.initialConfig = {};

        if (Ext.isArray(html)) {
            html = html.join("");
        }
        else if (args.length > 1) {
            for (i = 0, length = args.length; i < length; i++) {
                value = args[i];
                if (typeof value == 'object') {
                    Ext.apply(me.initialConfig, value);
                    Ext.apply(me, value);
                } else {
                    buffer.push(value);
                }
            }
            html = buffer.join('');
        }

        
        me.html = html;
        
        if (me.compiled) {
            me.compile();
        }
    },
    isTemplate: true,  
    
    disableFormats: false,
    
    re: /\{([\w-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g,      
    
    applyTemplate: function(values) {
        var me = this,
            useFormat = me.disableFormats !== true,
            fm = Ext.util.Format,
            tpl = me;

        if (me.compiled) {
            return me.compiled(values);
        }
        function fn(m, name, format, args) {
            if (format && useFormat) {
                if (args) {
                    args = [values[name]].concat(new Function('return ['+ args +'];')());
                } else {
                    args = [values[name]];
                }
                if (format.substr(0, 5) == "this.") {
                    return tpl[format.substr(5)].apply(tpl, args);
                }
                else {
                    return fm[format].apply(fm, args);
                }
            }
            else {
                return values[name] !== undefined ? values[name] : "";
            }
        }
        return me.html.replace(me.re, fn);
    },

    
    set: function(html, compile) {
        var me = this;
        me.html = html;
        me.compiled = null;
        return compile ? me.compile() : me;
    },
    
    compileARe: /\\/g,
    compileBRe: /(\r\n|\n)/g,
    compileCRe: /'/g,
    /**
     * Compiles the template into an internal function, eliminating the RegEx overhead.
     * @return {Ext.Template} this
     * @hide repeat doc
     */
    compile: function() {
        var me = this,
            fm = Ext.util.Format,
            useFormat = me.disableFormats !== true,
            body, bodyReturn;

        function fn(m, name, format, args) {
            if (format && useFormat) {
                args = args ? ',' + args: "";
                if (format.substr(0, 5) != "this.") {
                    format = "fm." + format + '(';
                }
                else {
                    format = 'this.' + format.substr(5) + '(';
                }
            }
            else {
                args = '';
                format = "(values['" + name + "'] == undefined ? '' : ";
            }
            return "'," + format + "values['" + name + "']" + args + ") ,'";
        }

        bodyReturn = me.html.replace(me.compileARe, '\\\\').replace(me.compileBRe, '\\n').replace(me.compileCRe, "\\'").replace(me.re, fn);
        body = "this.compiled = function(values){ return ['" + bodyReturn + "'].join('');};";
        eval(body);
        return me;
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) as the first child of el.
     * @param {Mixed} el The context element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    insertFirst: function(el, values, returnElement) {
        return this.doInsert('afterBegin', el, values, returnElement);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) before el.
     * @param {Mixed} el The context element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    insertBefore: function(el, values, returnElement) {
        return this.doInsert('beforeBegin', el, values, returnElement);
    },

    /**
     * Applies the supplied values to the template and inserts the new node(s) after el.
     * @param {Mixed} el The context element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    insertAfter: function(el, values, returnElement) {
        return this.doInsert('afterEnd', el, values, returnElement);
    },

    /**
     * Applies the supplied <code>values</code> to the template and appends
     * the new node(s) to the specified <code>el</code>.
     * <p>For example usage {@link #Template see the constructor}.</p>
     * @param {Mixed} el The context element
     * @param {Object/Array} values
     * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
     * or an object (i.e. <code>{foo: 'bar'}</code>).
     * @param {Boolean} returnElement (optional) true to return an Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    append: function(el, values, returnElement) {
        return this.doInsert('beforeEnd', el, values, returnElement);
    },

    doInsert: function(where, el, values, returnEl) {
        el = Ext.getDom(el);
        var newNode = Ext.DomHelper.insertHtml(where, el, this.applyTemplate(values));
        return returnEl ? Ext.get(newNode, true) : newNode;
    },

    /**
     * Applies the supplied values to the template and overwrites the content of el with the new node(s).
     * @param {Mixed} el The context element
     * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @param {Boolean} returnElement (optional) true to return a Ext.Element (defaults to undefined)
     * @return {HTMLElement/Ext.Element} The new node or Element
     */
    overwrite: function(el, values, returnElement) {
        el = Ext.getDom(el);
        el.innerHTML = this.applyTemplate(values);
        return returnElement ? Ext.get(el.firstChild, true) : el.firstChild;
    }
});
/**
 * Alias for {@link #applyTemplate}
 * Returns an HTML fragment of this template with the specified <code>values</code> applied.
 * @param {Object/Array} values
 * The template values. Can be an array if the params are numeric (i.e. <code>{0}</code>)
 * or an object (i.e. <code>{foo: 'bar'}</code>).
 * @return {String} The HTML fragment
 * @member Ext.Template
 * @method apply
 */
Ext.Template.prototype.apply = Ext.Template.prototype.applyTemplate;

/**
 * Creates a template from the passed element's value (<i>display:none</i> textarea, preferred) or innerHTML.
 * @param {String/HTMLElement} el A DOM element or its id
 * @param {Object} config A configuration object
 * @return {Ext.Template} The created template
 * @static
 */
Ext.Template.from = function(el, config) {
    el = Ext.getDom(el);
    return new Ext.Template(el.value || el.innerHTML, config || '');
};

/**
 * @class Ext.XTemplate
 * @extends Ext.Template
 * <p>A template class that supports advanced functionality like:<div class="mdetail-params"><ul>
 * <li>Autofilling arrays using templates and sub-templates</li>
 * <li>Conditional processing with basic comparison operators</li>
 * <li>Basic math function support</li>
 * <li>Execute arbitrary inline code with special built-in template variables</li>
 * <li>Custom member functions</li>
 * <li>Many special tags and built-in operators that aren't defined as part of
 * the API, but are supported in the templates that can be created</li>
 * </ul></div></p>
 * <p>XTemplate provides the templating mechanism built into:<div class="mdetail-params"><ul>
 * <li>{@link Ext.DataView}</li>
 * </ul></div></p>
 *
 * The {@link Ext.Template} describes
 * the acceptable parameters to pass to the constructor. The following
 * examples demonstrate all of the supported features.</p>
 *
 * <div class="mdetail-params"><ul>
 *
 * <li><b><u>Sample Data</u></b>
 * <div class="sub-desc">
 * <p>This is the data object used for reference in each code example:</p>
 * <pre><code>
var data = {
name: 'Tommy Maintz',
title: 'Lead Developer',
company: 'Ext JS, Inc',
email: 'tommy@extjs.com',
address: '5 Cups Drive',
city: 'Palo Alto',
state: 'CA',
zip: '44102',
drinks: ['Coffee', 'Soda', 'Water'],
kids: [{
        name: 'Joshua',
        age:3
    },{
        name: 'Matthew',
        age:2
    },{
        name: 'Solomon',
        age:0
}]
};
 </code></pre>
 * </div>
 * </li>
 *
 *
 * <li><b><u>Auto filling of arrays</u></b>
 * <div class="sub-desc">
 * <p>The <b><tt>tpl</tt></b> tag and the <b><tt>for</tt></b> operator are used
 * to process the provided data object:
 * <ul>
 * <li>If the value specified in <tt>for</tt> is an array, it will auto-fill,
 * repeating the template block inside the <tt>tpl</tt> tag for each item in the
 * array.</li>
 * <li>If <tt>for="."</tt> is specified, the data object provided is examined.</li>
 * <li>While processing an array, the special variable <tt>{#}</tt>
 * will provide the current array index + 1 (starts at 1, not 0).</li>
 * </ul>
 * </p>
 * <pre><code>
&lt;tpl <b>for</b>=".">...&lt;/tpl>       // loop through array at root node
&lt;tpl <b>for</b>="foo">...&lt;/tpl>     // loop through array at foo node
&lt;tpl <b>for</b>="foo.bar">...&lt;/tpl> // loop through array at foo.bar node
 </code></pre>
 * Using the sample data above:
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Kids: ',
    '&lt;tpl <b>for</b>=".">',       // process the data.kids node
        '&lt;p>{#}. {name}&lt;/p>',  // use current array index to autonumber
    '&lt;/tpl>&lt;/p>'
);
tpl.overwrite(panel.body, data.kids); // pass the kids property of the data object
 </code></pre>
 * <p>An example illustrating how the <b><tt>for</tt></b> property can be leveraged
 * to access specified members of the provided data object to populate the template:</p>
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Name: {name}&lt;/p>',
    '&lt;p>Title: {title}&lt;/p>',
    '&lt;p>Company: {company}&lt;/p>',
    '&lt;p>Kids: ',
    '&lt;tpl <b>for="kids"</b>>',     // interrogate the kids property within the data
        '&lt;p>{name}&lt;/p>',
    '&lt;/tpl>&lt;/p>'
);
tpl.overwrite(panel.body, data);  // pass the root node of the data object
 </code></pre>
 * <p>Flat arrays that contain values (and not objects) can be auto-rendered
 * using the special <b><tt>{.}</tt></b> variable inside a loop.  This variable
 * will represent the value of the array at the current index:</p>
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>{name}\&#39;s favorite beverages:&lt;/p>',
    '&lt;tpl for="drinks">',
        '&lt;div> - {.}&lt;/div>',
    '&lt;/tpl>'
);
tpl.overwrite(panel.body, data);
 </code></pre>
 * <p>When processing a sub-template, for example while looping through a child array,
 * you can access the parent object's members via the <b><tt>parent</tt></b> object:</p>
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Name: {name}&lt;/p>',
    '&lt;p>Kids: ',
    '&lt;tpl for="kids">',
        '&lt;tpl if="age &amp;gt; 1">',
            '&lt;p>{name}&lt;/p>',
            '&lt;p>Dad: {<b>parent</b>.name}&lt;/p>',
        '&lt;/tpl>',
    '&lt;/tpl>&lt;/p>'
);
tpl.overwrite(panel.body, data);
 </code></pre>
 * </div>
 * </li>
 *
 *
 * <li><b><u>Conditional processing with basic comparison operators</u></b>
 * <div class="sub-desc">
 * <p>The <b><tt>tpl</tt></b> tag and the <b><tt>if</tt></b> operator are used
 * to provide conditional checks for deciding whether or not to render specific
 * parts of the template. Notes:<div class="sub-desc"><ul>
 * <li>Double quotes must be encoded if used within the conditional</li>
 * <li>There is no <tt>else</tt> operator &mdash; if needed, two opposite
 * <tt>if</tt> statements should be used.</li>
 * </ul></div>
 * <pre><code>
&lt;tpl if="age &gt; 1 &amp;&amp; age &lt; 10">Child&lt;/tpl>
&lt;tpl if="age >= 10 && age < 18">Teenager&lt;/tpl>
&lt;tpl <b>if</b>="this.isGirl(name)">...&lt;/tpl>
&lt;tpl <b>if</b>="id==\'download\'">...&lt;/tpl>
&lt;tpl <b>if</b>="needsIcon">&lt;img src="{icon}" class="{iconCls}"/>&lt;/tpl>
// no good:
&lt;tpl if="name == "Tommy"">Hello&lt;/tpl>
// encode &#34; if it is part of the condition, e.g.
&lt;tpl if="name == &#38;quot;Tommy&#38;quot;">Hello&lt;/tpl>
 * </code></pre>
 * Using the sample data above:
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Name: {name}&lt;/p>',
    '&lt;p>Kids: ',
    '&lt;tpl for="kids">',
        '&lt;tpl if="age &amp;gt; 1">',
            '&lt;p>{name}&lt;/p>',
        '&lt;/tpl>',
    '&lt;/tpl>&lt;/p>'
);
tpl.overwrite(panel.body, data);
 </code></pre>
 * </div>
 * </li>
 *
 *
 * <li><b><u>Basic math support</u></b>
 * <div class="sub-desc">
 * <p>The following basic math operators may be applied directly on numeric
 * data values:</p><pre>
 * + - * /
 * </pre>
 * For example:
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Name: {name}&lt;/p>',
    '&lt;p>Kids: ',
    '&lt;tpl for="kids">',
        '&lt;tpl if="age &amp;gt; 1">',  // <-- Note that the &gt; is encoded
            '&lt;p>{#}: {name}&lt;/p>',  // <-- Auto-number each item
            '&lt;p>In 5 Years: {age+5}&lt;/p>',  // <-- Basic math
            '&lt;p>Dad: {parent.name}&lt;/p>',
        '&lt;/tpl>',
    '&lt;/tpl>&lt;/p>'
);
tpl.overwrite(panel.body, data);
 </code></pre>
 * </div>
 * </li>
 *
 *
 * <li><b><u>Execute arbitrary inline code with special built-in template variables</u></b>
 * <div class="sub-desc">
 * <p>Anything between <code>{[ ... ]}</code> is considered code to be executed
 * in the scope of the template. There are some special variables available in that code:
 * <ul>
 * <li><b><tt>values</tt></b>: The values in the current scope. If you are using
 * scope changing sub-templates, you can change what <tt>values</tt> is.</li>
 * <li><b><tt>parent</tt></b>: The scope (values) of the ancestor template.</li>
 * <li><b><tt>xindex</tt></b>: If you are in a looping template, the index of the
 * loop you are in (1-based).</li>
 * <li><b><tt>xcount</tt></b>: If you are in a looping template, the total length
 * of the array you are looping.</li>
 * </ul>
 * This example demonstrates basic row striping using an inline code block and the
 * <tt>xindex</tt> variable:</p>
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Name: {name}&lt;/p>',
    '&lt;p>Company: {[values.company.toUpperCase() + ", " + values.title]}&lt;/p>',
    '&lt;p>Kids: ',
    '&lt;tpl for="kids">',
        '&lt;div class="{[xindex % 2 === 0 ? "even" : "odd"]}">',
        '{name}',
        '&lt;/div>',
    '&lt;/tpl>&lt;/p>'
 );
tpl.overwrite(panel.body, data);
 </code></pre>
 * </div>
 * </li>
 *
 * <li><b><u>Template member functions</u></b>
 * <div class="sub-desc">
 * <p>One or more member functions can be specified in a configuration
 * object passed into the XTemplate constructor for more complex processing:</p>
 * <pre><code>
var tpl = new Ext.XTemplate(
    '&lt;p>Name: {name}&lt;/p>',
    '&lt;p>Kids: ',
    '&lt;tpl for="kids">',
        '&lt;tpl if="this.isGirl(name)">',
            '&lt;p>Girl: {name} - {age}&lt;/p>',
        '&lt;/tpl>',
         // use opposite if statement to simulate 'else' processing:
        '&lt;tpl if="this.isGirl(name) == false">',
            '&lt;p>Boy: {name} - {age}&lt;/p>',
        '&lt;/tpl>',
        '&lt;tpl if="this.isBaby(age)">',
            '&lt;p>{name} is a baby!&lt;/p>',
        '&lt;/tpl>',
    '&lt;/tpl>&lt;/p>',
    {
        // XTemplate configuration:
        compiled: true,
        // member functions:
        isGirl: function(name){
           return name == 'Sara Grace';
        },
        isBaby: function(age){
           return age < 1;
        }
    }
);
tpl.overwrite(panel.body, data);
 </code></pre>
 * </div>
 * </li>
 *
 * </ul></div>
 *
 * @param {Mixed} config
 */

Ext.XTemplate = Ext.extend(Ext.Template, {
    argsRe: /<tpl\b[^>]*>((?:(?=([^<]+))\2|<(?!tpl\b[^>]*>))*?)<\/tpl>/,
    nameRe: /^<tpl\b[^>]*?for="(.*?)"/,
    ifRe: /^<tpl\b[^>]*?if="(.*?)"/,
    execRe: /^<tpl\b[^>]*?exec="(.*?)"/,
    constructor: function() {
        Ext.XTemplate.superclass.constructor.apply(this, arguments);

        var me = this,
            html = me.html,
            argsRe = me.argsRe,
            nameRe = me.nameRe,
            ifRe = me.ifRe,
            execRe = me.execRe,
            id = 0,
            tpls = [],
            VALUES = 'values',
            PARENT = 'parent',
            XINDEX = 'xindex',
            XCOUNT = 'xcount',
            RETURN = 'return ',
            WITHVALUES = 'with(values){ ',
            m, matchName, matchIf, matchExec, exp, fn, exec, name, i;

        html = ['<tpl>', html, '</tpl>'].join('');

        while ((m = html.match(argsRe))) {
            exp = null;
            fn = null;
            exec = null;
            matchName = m[0].match(nameRe);
            matchIf = m[0].match(ifRe);
            matchExec = m[0].match(execRe);

            exp = matchIf ? matchIf[1] : null;
            if (exp) {
                fn = new Function(VALUES, PARENT, XINDEX, XCOUNT, WITHVALUES + 'try{' + RETURN + Ext.util.Format.htmlDecode(exp) + ';}catch(e){return;}}');
            }

            exp = matchExec ? matchExec[1] : null;
            if (exp) {
                exec = new Function(VALUES, PARENT, XINDEX, XCOUNT, WITHVALUES + Ext.util.Format.htmlDecode(exp) + ';}');
            }
            
            name = matchName ? matchName[1] : null;
            if (name) {
                if (name === '.') {
                    name = VALUES;
                } else if (name === '..') {
                    name = PARENT;
                }
                name = new Function(VALUES, PARENT, 'try{' + WITHVALUES + RETURN + name + ';}}catch(e){return;}');
            }

            tpls.push({
                id: id,
                target: name,
                exec: exec,
                test: fn,
                body: m[1] || ''
            });

            html = html.replace(m[0], '{xtpl' + id + '}');
            id = id + 1;
        }

        for (i = tpls.length - 1; i >= 0; --i) {
            me.compileTpl(tpls[i]);
        }
        me.master = tpls[tpls.length - 1];
        me.tpls = tpls;
    },

    // @private
    applySubTemplate: function(id, values, parent, xindex, xcount) {
        var me = this, t = me.tpls[id];
        return t.compiled.call(me, values, parent, xindex, xcount);
    },
    /**
     * @cfg {RegExp} codeRe The regular expression used to match code variables (default: matches <tt>{[expression]}</tt>).
     */
    codeRe: /\{\[((?:\\\]|.|\n)*?)\]\}/g,

    re: /\{([\w-\.\#]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?(\s?[\+\-\*\/]\s?[\d\.\+\-\*\/\(\)]+)?\}/g,

    // @private
    compileTpl: function(tpl) {
        var fm = Ext.util.Format,
            me = this,
            useFormat = me.disableFormats !== true,
            body, bodyReturn, evaluatedFn;

        function fn(m, name, format, args, math) {
            var v;
            // name is what is inside the {}
            // Name begins with xtpl, use a Sub Template
            if (name.substr(0, 4) == 'xtpl') {
                return "',this.applySubTemplate(" + name.substr(4) + ", values, parent, xindex, xcount),'";
            }
            // name = "." - Just use the values object.
            if (name == '.') {
                v = 'typeof values == "string" ? values : ""';
            }

            // name = "#" - Use the xindex
            else if (name == '#') {
                v = 'xindex';
            }
            else if (name.substr(0, 7) == "parent.") {
                v = name;
            }
            // name has a . in it - Use object literal notation, starting from values
            else if (name.indexOf('.') != -1) {
                v = "values." + name;
            }

            // name is a property of values
            else {
                v = "values['" + name + "']";
            }
            if (math) {
                v = '(' + v + math + ')';
            }
            if (format && useFormat) {
                args = args ? ',' + args : "";
                if (format.substr(0, 5) != "this.") {
                    format = "fm." + format + '(';
                }
                else {
                    format = 'this.' + format.substr(5) + '(';
                }
            }
            else {
                args = '';
                format = "(" + v + " === undefined ? '' : ";
            }
            return "'," + format + v + args + "),'";
        }

        function codeFn(m, code) {
            // Single quotes get escaped when the template is compiled, however we want to undo this when running code.
            return "',(" + code.replace(me.compileARe, "'") + "),'";
        }
        
        bodyReturn = tpl.body.replace(me.compileBRe, '\\n').replace(me.compileCRe, "\\'").replace(me.re, fn).replace(me.codeRe, codeFn);
        body = "evaluatedFn = function(values, parent, xindex, xcount){return ['" + bodyReturn + "'].join('');};";
        eval(body);
                        
        tpl.compiled = function(values, parent, xindex, xcount) {
            var vs, 
                length,
                buffer,
                i;
                
            if (tpl.test && !tpl.test.call(me, values, parent, xindex, xcount)) {
                return '';
            } 
                           
            vs = tpl.target ? tpl.target.call(me, values, parent) : values;
            if (!vs) {
               return '';
            }
   
            parent = tpl.target ? values : parent;
            if (tpl.target && Ext.isArray(vs)) {
                buffer = [], length = vs.length;
                if (tpl.exec) {
                    for (i = 0; i < length; i++) {
                        buffer[buffer.length] = evaluatedFn.call(me, vs[i], parent, i + 1, length);
                        tpl.exec.call(me, vs[i], parent, i + 1, length);
                    }
                } else {
                    for (i = 0; i < length; i++) {
                        buffer[buffer.length] = evaluatedFn.call(me, vs[i], parent, i + 1, length);
                    }
                }
                return buffer.join('');
            }
                
            if (tpl.exec) {
                tpl.exec.call(me, vs, parent, xindex, xcount);
            }
            return evaluatedFn.call(me, vs, parent, xindex, xcount);
        }
                
        return this;
    },

    /**
     * Returns an HTML fragment of this template with the specified values applied.
     * @param {Object} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
     * @return {String} The HTML fragment
     */
    applyTemplate: function(values) {
        return this.master.compiled.call(this, values, {}, 1, 1);
    },

    /**
     * Compile the template to a function for optimized performance.  Recommended if the template will be used frequently.
     * @return {Function} The compiled function
     */
    compile: function() {
        return this;
    }
});
/**
 * Alias for {@link #applyTemplate}
 * Returns an HTML fragment of this template with the specified values applied.
 * @param {Object/Array} values The template values. Can be an array if your params are numeric (i.e. {0}) or an object (i.e. {foo: 'bar'})
 * @return {String} The HTML fragment
 * @member Ext.XTemplate
 * @method apply
 */
Ext.XTemplate.prototype.apply = Ext.XTemplate.prototype.applyTemplate;

/**
 * Creates a template from the passed element's value (<i>display:none</i> textarea, preferred) or innerHTML.
 * @param {String/HTMLElement} el A DOM element or its id
 * @return {Ext.Template} The created template
 * @static
 */
Ext.XTemplate.from = function(el, config) {
    el = Ext.getDom(el);
    return new Ext.XTemplate(el.value || el.innerHTML, config || {});
};



Ext.util.Sorter = Ext.extend(Object, {
    
    
    
    
    
    
    
    direction: "ASC",
    
    constructor: function(config) {
        Ext.apply(this, config);
        
        if (this.property == undefined && this.sorterFn == undefined) {
            throw "A Sorter requires either a property or a sorter function";
        }
        
        this.sort = this.createSortFunction(this.sorterFn || this.defaultSorterFn);
    },
    
    
    createSortFunction: function(sorterFn) {
        var me        = this,
            property  = me.property,
            direction = me.direction,
            modifier  = direction.toUpperCase() == "DESC" ? -1 : 1;
        
        
        
        return function(o1, o2) {
            return modifier * sorterFn.call(me, o1, o2);
        };
    },
    
    
    defaultSorterFn: function(o1, o2) {
        var v1 = this.getRoot(o1)[this.property],
            v2 = this.getRoot(o2)[this.property];

        return v1 > v2 ? 1 : (v1 < v2 ? -1 : 0);
    },
    
    
    getRoot: function(item) {
        return this.root == undefined ? item : item[this.root];
    }
});

Ext.util.Filter = Ext.extend(Object, {
    
    
    
    
    
    anyMatch: false,
    
    
    exactMatch: false,
    
    
    caseSensitive: false,
    
    
    
    constructor: function(config) {
        Ext.apply(this, config);
        
        
        
        this.filter = this.filter || this.filterFn;
        
        if (this.filter == undefined) {
            if (this.property == undefined || this.value == undefined) {
                
                
                
                
            } else {
                this.filter = this.createFilterFn();
            }
            
            this.filterFn = this.filter;
        }
    },
    
    
    createFilterFn: function() {
        var me       = this,
            matcher  = me.createValueMatcher(),
            property = me.property;
        
        return function(item) {
            return matcher.test(me.getRoot.call(me, item)[property]);
        };
    },
    
    
    getRoot: function(item) {
        return this.root == undefined ? item : item[this.root];
    },
    
    
    createValueMatcher : function() {
        var me            = this,
            value         = me.value,
            anyMatch      = me.anyMatch,
            exactMatch    = me.exactMatch,
            caseSensitive = me.caseSensitive,
            escapeRe      = Ext.util.Format.escapeRegex;
        
        if (!value.exec) { 
            value = String(value);

            if (anyMatch === true) {
                value = escapeRe(value);
            } else {
                value = '^' + escapeRe(value);
                if (exactMatch === true) {
                    value += '$';
                }
            }
            value = new RegExp(value, caseSensitive ? '' : 'i');
         }
         
         return value;
    }
});

Ext.util.Functions = {
    
    createInterceptor: function(origFn, newFn, scope, returnValue) { 
        var method = origFn;
        if (!Ext.isFunction(newFn)) {
            return origFn;
        }
        else {
            return function() {
                var me = this,
                    args = arguments;
                newFn.target = me;
                newFn.method = origFn;
                return (newFn.apply(scope || me || window, args) !== false) ?
                        origFn.apply(me || window, args) :
                        returnValue || null;
            };
        }
    },

    
    createDelegate: function(fn, obj, args, appendArgs) {
        if (!Ext.isFunction(fn)) {
            return fn;
        }
        return function() {
            var callArgs = args || arguments;
            if (appendArgs === true) {
                callArgs = Array.prototype.slice.call(arguments, 0);
                callArgs = callArgs.concat(args);
            }
            else if (Ext.isNumber(appendArgs)) {
                callArgs = Array.prototype.slice.call(arguments, 0);
                
                var applyArgs = [appendArgs, 0].concat(args);
                
                Array.prototype.splice.apply(callArgs, applyArgs);
                
            }
            return fn.apply(obj || window, callArgs);
        };
    },

    
    defer: function(fn, millis, obj, args, appendArgs) {
        fn = Ext.util.Functions.createDelegate(fn, obj, args, appendArgs);
        if (millis > 0) {
            return setTimeout(fn, millis);
        }
        fn();
        return 0;
    },


    
    createSequence: function(origFn, newFn, scope) {
        if (!Ext.isFunction(newFn)) {
            return origFn;
        }
        else {
            return function() {
                var retval = origFn.apply(this || window, arguments);
                newFn.apply(scope || this || window, arguments);
                return retval;
            };
        }
    }
};



Ext.defer = Ext.util.Functions.defer;



Ext.createInterceptor = Ext.util.Functions.createInterceptor;



Ext.createSequence = Ext.util.Functions.createSequence;


Ext.createDelegate = Ext.util.Functions.createDelegate;



Ext.util.Date = {
    
    getElapsed: function(dateA, dateB) {
        return Math.abs(dateA - (dateB || new Date));
    }
};


Ext.util.Numbers = {
    
    
    toFixedBroken: (0.9).toFixed() != 1,
    
    
    constrain : function(number, min, max) {
        number = parseFloat(number);
        if (!isNaN(min)) {
            number = Math.max(number, min);
        }
        if (!isNaN(max)) {
            number = Math.min(number, max);
        }
        return number;
    },
    
    
    toFixed : function(value, precision) {
        if(Ext.util.Numbers.toFixedBroken) {
            precision = precision || 0;
            var pow = Math.pow(10, precision);
            return Math.round(value * pow) / pow;
        }
        return value.toFixed(precision);
    }
};


Ext.util.Format = {
    defaultDateFormat: 'm/d/Y',
    escapeRe: /('|\\)/g,
    trimRe: /^[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+|[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u2028\u2029\u202f\u205f\u3000]+$/g,
    formatRe: /\{(\d+)\}/g,
    escapeRegexRe: /([-.*+?^${}()|[\]\/\\])/g,
    
    /**
     * Truncate a string and add an ellipsis ('...') to the end if it exceeds the specified length
     * @param {String} value The string to truncate
     * @param {Number} length The maximum length to allow before truncating
     * @param {Boolean} word True to try to find a common word break
     * @return {String} The converted text
     */
    ellipsis: function(value, len, word) {
        if (value && value.length > len) {
            if (word) {
                var vs = value.substr(0, len - 2),
                index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'));
                if (index != -1 && index >= (len - 15)) {
                    return vs.substr(0, index) + "...";
                }
            } 
            return value.substr(0, len - 3) + "...";
        }
        return value;
    },

    /**
     * Escapes the passed string for use in a regular expression
     * @param {String} str
     * @return {String}
     */
    escapeRegex : function(s) {
        return s.replace(Ext.util.Format.escapeRegexRe, "\\$1");
    },

    /**
     * Escapes the passed string for ' and \
     * @param {String} string The string to escape
     * @return {String} The escaped string
     * @static
     */
    escape : function(string) {
        return string.replace(Ext.util.Format.escapeRe, "\\$1");
    },

    
    toggle : function(string, value, other) {
        return string == value ? other : value;
    },

    
    trim : function(string) {
        return string.replace(Ext.util.Format.trimRe, "");
    },

    
    leftPad : function (val, size, ch) {
        var result = String(val);
        ch = ch || " ";
        while (result.length < size) {
            result = ch + result;
        }
        return result;
    },

    
    format : function (format) {
        var args = Ext.toArray(arguments, 1);
        return format.replace(Ext.util.Format.formatRe, function(m, i) {
            return args[i];
        });
    },

    
    htmlEncode: function(value) {
        return ! value ? value: String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
    },

    
    htmlDecode: function(value) {
        return ! value ? value: String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
    },

    
    date: function(v, format) {
        if (!v) {
            return "";
        }
        if (!Ext.isDate(v)) {
            v = new Date(Date.parse(v));
        }
        return v.dateFormat(format || Ext.util.Format.defaultDateFormat);
    }
};


Ext.LoadMask = Ext.extend(Ext.util.Observable, {
    

    
    msg : 'Loading...',
    
    msgCls : 'x-mask-loading',

    
    disabled: false,

    constructor : function(el, config) {
        this.el = Ext.get(el);
        Ext.apply(this, config);

        this.addEvents('show', 'hide');
        if (this.store) {
            this.bindStore(this.store, true);
        }
        Ext.LoadMask.superclass.constructor.call(this);
    },

    
    bindStore : function(store, initial) {
        if (!initial && this.store) {
            this.mun(this.store, {
                scope: this,
                beforeload: this.onBeforeLoad,
                load: this.onLoad,
                exception: this.onLoad
            });
            if(!store) {
                this.store = null;
            }
        }
        if (store) {
            store = Ext.StoreMgr.lookup(store);
            this.mon(store, {
                scope: this,
                beforeload: this.onBeforeLoad,
                load: this.onLoad,
                exception: this.onLoad
            });

        }
        this.store = store;
        if (store && store.isLoading()) {
            this.onBeforeLoad();
        }
    },

    
    disable : function() {
       this.disabled = true;
    },

    
    enable : function() {
        this.disabled = false;
    },

    
    isDisabled : function() {
        return this.disabled;
    },

    
    onLoad : function() {
        this.el.unmask();
        this.fireEvent('hide', this, this.el, this.store);
    },

    
    onBeforeLoad : function() {
        if (!this.disabled) {
            this.el.mask(Ext.LoadingSpinner + '<div class="x-loading-msg">' + this.msg + '</div>', this.msgCls, false);
            this.fireEvent('show', this, this.el, this.store);
        }
    },

    
    show: function() {
        this.onBeforeLoad();
    },

    
    hide: function() {
        this.onLoad();
    },

    
    destroy : function() {
        this.hide();
        this.clearListeners();
    }
});

Ext.LoadingSpinner = '<div class="x-loading-spinner"><span class="x-loading-top"></span><span class="x-loading-right"></span><span class="x-loading-bottom"></span><span class="x-loading-left"></span></div>';



Ext.applyIf(Array.prototype, {
    
    indexOf: function(o, from) {
        var len = this.length;
        from = from || 0;
        from += (from < 0) ? len: 0;
        for (; from < len; ++from) {
            if (this[from] === o) {
                return from;
            }
        }
        return - 1;
    },

    
    remove: function(o) {
        var index = this.indexOf(o);
        if (index != -1) {
            this.splice(index, 1);
        }
        return this;
    },

    contains: function(o) {
        return this.indexOf(o) !== -1;
    }
});


Ext.ComponentMgr = new Ext.AbstractManager({
    typeName: 'xtype',

    
    create : function(config, defaultType){
        if (config.isComponent) {
            return config;
        } else {
            var type = config.xtype || defaultType,
                Class = this.types[type];
            if (!Class) {
                throw "Attempting to create a component with an xtype that has not been registered: " + type
            }
            return new Class(config);
        }
        return config.render ? config : new (config);
    },

    registerType : function(type, cls) {
        this.types[type] = cls;
        cls[this.typeName] = type;
        cls.prototype[this.typeName] = type;
    }
});


Ext.reg = function() {
    return Ext.ComponentMgr.registerType.apply(Ext.ComponentMgr, arguments);
}; 


Ext.create = function() {
    return Ext.ComponentMgr.create.apply(Ext.ComponentMgr, arguments);
};


Ext.ComponentQuery = new function() {
    var cq = this,

        
        
        filterFnPattern = [
            'var r = [],',
                'i = 0,',
                'it = arguments[0],',
                'l = it.length,',
                'c;',
            'for (; i < l; i++) {',
                'c = it[i].{0};',
                'if (c) {',
                   'r.push(c);',
                '}',
            '}',
            'return r;'
        ].join(''),

        filterItems = function(items, operation) {
            
            
            
            return operation.method.apply(this, [ items ].concat(operation.args));
        },

        getItems = function(items, mode) {
            var result = [],
                i,
                ln = items.length,
                candidate,
                deep = mode != '>';
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                if (candidate.getRefItems) {
                    result = result.concat(candidate.getRefItems(deep));
                }
            }
            return result;
        },

        getAncestors = function(items) {
            var result = [],
                i,
                ln = items.length,
                candidate;
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                while (!!(candidate = candidate.ownerCt)) {
                    result.push(candidate);
                }
            }
            return result;
        },

        
        filterByXType = function(items, xtype, shallow) {
            if (xtype == '*') {
                return items.slice();
            }
            else {
                var result = [],
                    i,
                    ln = items.length,
                    candidate;
                for (i = 0; i < ln; i++) {
                    candidate = items[i];
                    if (candidate.isXType(xtype, shallow)) {
                        result.push(candidate);
                    }
                }
                return result;
            }
        },

        
        filterByClassName = function(items, className) {
            var result = [],
                i,
                ln = items.length,
                candidate;
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                if (candidate.el ? candidate.el.hasCls(className) : candidate.initCls().contains(className)) {
                    result.push(candidate);
                }
            }
            return result;
        },

        
        filterByAttribute = function(items, property, operator, value) {
            var result = [],
                i,
                ln = items.length,
                candidate;
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                if ((value === undefined) ? !!candidate[property] : (candidate[property] == value)) {
                    result.push(candidate);
                }
            }
            return result;
        },

        
        filterById = function(items, id) {
            var result = [],
                i,
                ln = items.length,
                candidate;
            for (i = 0; i < ln; i++) {
                candidate = items[i];
                if (candidate.getItemId() == id) {
                    result.push(candidate);
                }
            }
            return result;
        },

        
        filterByPseudo = function(items, name, value) {
            return cq.pseudos[name](items, value);
        },

        
        
        modeRe = /^(\s?([>\^])\s?|\s|$)/,

        
        
        tokenRe = /^(?:(#)?([\w-]+|\*)(?:\((true|false)\))?)|(?:\{([^\}]+)\})/,

        matchers = [{
            
            re: /^\.([\w-]+)(?:\((true|false)\))?/,
            method: filterByXType
        },{
            
            re: /^(?:[\[\{](?:@)?([\w-]+)\s?(?:(=|.=)\s?['"]?(.*?)["']?)?[\]\}])/,
            method: filterByAttribute
        }, {
            
            re: /^#([\w-]+)/,
            method: filterById
        }, {
            re: /^\:([\w-]+)(?:\(((?:[^\s>\/]*|.*?))\))?/,
            method: filterByPseudo
        }];

    
    cq.Query = Ext.extend(Object, {
        constructor: function(cfg) {
            cfg = cfg || {};
            Ext.apply(this, cfg);
        },

        execute : function(root) {
            var operations = this.operations,
                ln = operations.length,
                operation, i,
                workingItems;

            
            if (!root) {
                workingItems = Ext.ComponentMgr.all.items.slice();
            }

            
            
            for (i = 0; i < ln; i++) {
                operation = operations[i];

                
                
                
                
                
                
                if (operation.mode == '^') {
                    workingItems = getAncestors(workingItems || [root]);
                }
                else if (operation.mode) {
                    workingItems = getItems(workingItems || [root], operation.mode);
                }
                else {
                    workingItems = filterItems(workingItems || getItems([root]), operation);
                }

                
                
                if (i == ln -1) {
                    return workingItems;
                }
            }
            return [];
        },

        is: function(component) {
            var operations = this.operations,
                ln = operations.length,
                i,
                workingItems = Ext.isArray(component) ? component : [ component ];

            
            
            for (i = 0; i < ln && workingItems.length; i++) {
                workingItems = filterItems(workingItems, operations[i]);
            }
            return workingItems.length != 0;
        }
    });

    Ext.apply(this, {

        
        cache: {},

        
        pseudos: {},

        
        query: function(selector, root) {
            var selectors = selector.split(','),
                ln = selectors.length,
                i, query, results = [],
                noDupResults = [], dupMatcher = {}, resultsLn, cmp;

            for (i = 0; i < ln; i++) {
                selector = Ext.util.Format.trim(selectors[i]);
                query = this.cache[selector];
                if (!query) {
                    this.cache[selector] = query = this.parse(selector);
                }
                results = results.concat(query.execute(root));
            }

            
            
            if (ln > 1) {
                resultsLn = results.length;
                for (i = 0; i < resultsLn; i++) {
                    cmp = results[i];
                    if (!dupMatcher[cmp.id]) {
                        noDupResults.push(cmp);
                        dupMatcher[cmp.id] = true;
                    }
                }
                results = noDupResults;
            }
            return results;
        },

        
        is: function(component, selector) {
            if (!selector) {
                return true;
            }
            var query = this.cache[selector];
            if (!query) {
                this.cache[selector] = query = this.parse(selector);
            }
            return query.is(component);
        },

        parse: function(selector) {
            var operations = [],
                ln = matchers.length,
                lastSelector,
                tokenMatch,
                matchedChar,
                modeMatch,
                selectorMatch,
                args,
                i, matcher;

            
            
            
            while (selector && lastSelector != selector) {
                lastSelector = selector;

                
                tokenMatch = selector.match(tokenRe);

                if (tokenMatch) {
                    matchedChar = tokenMatch[1];

                    
                    if (matchedChar == '#') {
                        operations.push({
                            method: filterById,
                            args: [Ext.util.Format.trim(tokenMatch[2])]
                        });
                    }
                    
                    
                    else if (matchedChar == '.') {
                        operations.push({
                            method: filterByClassName,
                            args: [Ext.util.Format.trim(tokenMatch[2])]
                        });
                    }
                    
                    else if (tokenMatch[4]) {
                        operations.push({
                            method: new Function(Ext.util.Format.format(filterFnPattern, tokenMatch[4])),
                            args: []
                        });
                    }
                    
                    
                    else {
                        operations.push({
                            method: filterByXType,
                            args: [Ext.util.Format.trim(tokenMatch[2]), Boolean(tokenMatch[3])]
                        });
                    }

                    
                    selector = selector.replace(tokenMatch[0], '');
                }

                
                
                
                while (!(modeMatch = selector.match(modeRe))) {
                    
                    
                    for (i = 0; selector && i < ln; i++) {
                        matcher = matchers[i];
                        selectorMatch = selector.match(matcher.re);

                        
                        
                        
                        if (selectorMatch) {
                            operations.push({
                                method: matcher.method,
                                args: selectorMatch.splice(1)
                            });
                            selector = selector.replace(selectorMatch[0], '');
                            break; 
                        }
                        
                        if (i == (ln - 1)) {
                            throw "Invalid ComponentQuery selector: \"" + arguments[0] + "\"";
                        }
                    }
                }

                
                
                
                
                if (modeMatch[1]) { 
                    operations.push({
                        mode: modeMatch[2]||modeMatch[1]
                    });
                    selector = selector.replace(modeMatch[0], '');
                }
            }

            
            
            return new cq.Query({
                operations: operations
            });
        }
    });
};

Ext.PluginMgr = new Ext.AbstractManager({
    typeName: 'ptype',

    
    create : function(config, defaultType){
        var PluginCls = this.types[config.ptype || defaultType];
        if (PluginCls.init) {
            return PluginCls;
        } else {
            return new PluginCls(config);
        }
    },

    
    findByType: function(type, defaultsOnly) {
        var matches = [],
            types   = this.types;

        for (var name in types) {
            if (!types.hasOwnProperty(name)) {
                continue;
            }
            var item = types[name];

            if (item.type == type && (!defaultsOnly || (defaultsOnly === true && item.isDefault))) {
                matches.push(item);
            }
        }

        return matches;
    }
});


Ext.preg = function() {
    return Ext.PluginMgr.registerType.apply(Ext.PluginMgr, arguments);
};


Ext.EventManager = {
    optionsRe: /^(?:capture|scope|delay|buffer|single|stopEvent|disableLocking|preventDefault|stopPropagation|normalized|args|delegate|horizontal|vertical|dragThreshold|holdThreshold|doubleTapThreshold|cancelThreshold|singleTapThreshold|fireClickEvent)$/,
    touchRe: /^(?:pinch|pinchstart|pinchend|tap|singletap|doubletap|swipe|swipeleft|swiperight|drag|dragstart|dragend|touchdown|touchstart|touchmove|touchend|taphold|tapstart|tapcancel)$/i,

    
    addListener : function(element, eventName, fn, scope, o){
        
        if (Ext.isObject(eventName)) {
            this.handleListenerConfig(element, eventName);
            return;
        }

        var dom = Ext.getDom(element);

        
        if (!dom){
            throw "Error listening for \"" + eventName + '\". Element "' + element + '" doesn\'t exist.';
        }

        if (!fn) {
            throw 'Error listening for "' + eventName + '". No handler function specified';
        }

        var touch = this.touchRe.test(eventName);

        
        var wrap = this.createListenerWrap(dom, eventName, fn, scope, o, touch);

        
        this.getEventListenerCache(dom, eventName).push({
            fn: fn,
            wrap: wrap,
            scope: scope
        });

        if (touch) {
            Ext.gesture.Manager.addEventListener(dom, eventName, wrap, o);
        }
        else {
            
            o = o || {};
            dom.addEventListener(eventName, wrap, o.capture || false);
        }
    },

    
    removeListener : function(element, eventName, fn, scope) {
        
        if (Ext.isObject(eventName)) {
            this.handleListenerConfig(element, eventName, true);
            return;
        }

        var dom = Ext.getDom(element),
            cache = this.getEventListenerCache(dom, eventName),
            i = cache.length, j,
            listener, wrap, tasks;

        while (i--) {
            listener = cache[i];

            if (listener && (!fn || listener.fn == fn) && (!scope || listener.scope === scope)) {
                wrap = listener.wrap;

                
                if (wrap.task) {
                    clearTimeout(wrap.task);
                    delete wrap.task;
                }

                
                j = wrap.tasks && wrap.tasks.length;
                if (j) {
                    while (j--) {
                        clearTimeout(wrap.tasks[j]);
                    }
                    delete wrap.tasks;
                }

                if (this.touchRe.test(eventName)) {
                    Ext.gesture.Manager.removeEventListener(dom, eventName, wrap);
                }
                else {
                    
                    dom.removeEventListener(eventName, wrap, false);
                }

                
                cache.splice(i, 1);
            }
        }
    },

    
    removeAll : function(element){
        var dom = Ext.getDom(element),
            cache = this.getElementEventCache(dom),
            ev;

        for (ev in cache) {
            if (!cache.hasOwnProperty(ev)) {
                continue;
            }
            this.removeListener(dom, ev);
        }
        Ext.cache[dom.id].events = {};
    },

    purgeElement : function(element, recurse, eventName) {
        var dom = Ext.getDom(element),
            i = 0, len;

        if(eventName) {
            this.removeListener(dom, eventName);
        }
        else {
            this.removeAll(dom);
        }

        if(recurse && dom && dom.childNodes) {
            for(len = element.childNodes.length; i < len; i++) {
                this.purgeElement(element.childNodes[i], recurse, eventName);
            }
        }
    },

    handleListenerConfig : function(element, config, remove) {
        var key, value;

        
        for (key in config) {
            if (!config.hasOwnProperty(key)) {
                continue;
            }
            
            if (!this.optionsRe.test(key)) {
                value = config[key];
                
                
                if (Ext.isFunction(value)) {
                    
                    this[(remove ? 'remove' : 'add') + 'Listener'](element, key, value, config.scope, config);
                }
                
                else {
                    
                    this[(remove ? 'remove' : 'add') + 'Listener'](element, key, config.fn, config.scope, config);
                }
            }
        }
    },

    getId : function(element) {
        
        
        
        var skip = false,
            id;

        element = Ext.getDom(element);

        if (element === document || element === window) {
            skip = true;
        }

        id = Ext.id(element);

        if (!Ext.cache[id]){
            Ext.Element.addToCache(new Ext.Element(element), id);
            if(skip){
                Ext.cache[id].skipGarbageCollection = true;
            }
        }
        return id;
    },

    
    createListenerWrap : function(dom, ename, fn, scope, o, touch) {
        o = !Ext.isObject(o) ? {} : o;

        var f = ["if(!window.Ext) {return;}"];
        
        if (touch) {
            f.push('e = new Ext.TouchEventObjectImpl(e, args);');
        }
        else {
            if(o.buffer || o.delay) {
                f.push('e = new Ext.EventObjectImpl(e);');
            } else {
                f.push('e = Ext.EventObject.setEvent(e);');
            }
        }

        if (o.delegate) {
            f.push('var t = e.getTarget("' + o.delegate + '", this);');
            f.push('if(!t) {return;}');
        } else {
            f.push('var t = e.target;');
        }

        if (o.target) {
            f.push('if(e.target !== o.target) {return;}');
        }

        if(o.stopEvent) {
            f.push('e.stopEvent();');
        } else {
            if(o.preventDefault) {
                f.push('e.preventDefault();');
            }
            if(o.stopPropagation) {
                f.push('e.stopPropagation();');
            }
        }

        if(o.normalized === false) {
            f.push('e = e.browserEvent;');
        }

        if(o.buffer) {
            f.push('(wrap.task && clearTimeout(wrap.task));');
            f.push('wrap.task = setTimeout(function(){');
        }

        if(o.delay) {
            f.push('wrap.tasks = wrap.tasks || [];');
            f.push('wrap.tasks.push(setTimeout(function(){');
        }

        
        f.push('fn.call(scope || dom, e, t, o);');

        if(o.single) {
            f.push('Ext.EventManager.removeListener(dom, ename, fn, scope);');
        }

        if(o.delay) {
            f.push('}, ' + o.delay + '));');
        }

        if(o.buffer) {
            f.push('}, ' + o.buffer + ');');
        }

        var gen = new Function('e', 'o', 'fn', 'scope', 'ename', 'dom', 'wrap', 'args', f.join("\n"));

        return function(e, args) {
            gen.call(dom, e, o, fn, scope, ename, dom, arguments.callee, args);
        };
    },

    getEventListenerCache : function(element, eventName) {
        var eventCache = this.getElementEventCache(element);
        return eventCache[eventName] || (eventCache[eventName] = []);
    },

    getElementEventCache : function(element) {
        var elementCache = Ext.cache[this.getId(element)];
        return elementCache.events || (elementCache.events = {});
    },

    
    onDocumentReady : function(fn, scope, options){
        var me = this,
            readyEvent = me.readyEvent,
            intervalId;

        if(Ext.isReady){ 
            readyEvent || (readyEvent = new Ext.util.Event());
            readyEvent.addListener(fn, scope, options);
            readyEvent.fire();
            readyEvent.listeners = []; 
        }
        else {
            if(!readyEvent) {
                readyEvent = me.readyEvent = new Ext.util.Event();

                
                var fireReady = function() {
                    Ext.isReady = true;

                    
                    window.removeEventListener('load', arguments.callee, false);

                    
                    if (intervalId) {
                        clearInterval(intervalId);
                    }
                    
                    
                    
                    setTimeout(function() {
                        Ext.supports.init();
                        
                        Ext.gesture.Manager.init();
                        Ext.orientation = Ext.Element.getOrientation();
                                                
                        
                        readyEvent.fire({
                            orientation: Ext.orientation,
                            width: Ext.Element.getViewportWidth(),
                            height: Ext.Element.getViewportHeight()
                        });
                        readyEvent.listeners = [];                        
                    }, 50);
                };

                
                

                
                intervalId = setInterval(function(){
                    if(/loaded|complete/.test(document.readyState)) {
                        clearInterval(intervalId);
                        intervalId = null;
                        fireReady();
                    }
                }, 10);

                
                window.addEventListener('load', fireReady, false);
            }

            options = options || {};
            options.delay = options.delay || 1;
            readyEvent.addListener(fn, scope, options);
        }
    },

    
    onWindowResize : function(fn, scope, options) {
        var me = this,
            resizeEvent = me.resizeEvent;

        if(!resizeEvent){
            me.resizeEvent = resizeEvent = new Ext.util.Event();
            var onResize = function() {
                resizeEvent.fire(Ext.Element.getViewportWidth(), Ext.Element.getViewportHeight());
            };
            this.addListener(window, 'resize', onResize, this);
        }

        resizeEvent.addListener(fn, scope, options);
    },

    onOrientationChange : function(fn, scope, options) {
        var me = this,
            orientationEvent = me.orientationEvent;

        if (!orientationEvent) {
            me.orientationEvent = orientationEvent = new Ext.util.Event();
            
            var onOrientationChange = function(viewport, size) {
                Ext.orientation = Ext.Viewport.getOrientation();

                orientationEvent.fire(Ext.orientation, size.width, size.height);
            };

            Ext.Viewport.on('resize', onOrientationChange, this);
        }

        orientationEvent.addListener(fn, scope, options);
    },
    
    unOrientationChange : function(fn, scope, options) {
        var me = this,
            orientationEvent = me.orientationEvent;
        
        if (orientationEvent) {
            orientationEvent.removeListener(fn, scope, options);
        }
    }
};


Ext.EventManager.on = Ext.EventManager.addListener;


Ext.EventManager.un = Ext.EventManager.removeListener;


Ext.onReady = Ext.EventManager.onDocumentReady;

Ext.EventObjectImpl = Ext.extend(Object, {
    constructor : function(e) {
        if (e) {
            this.setEvent(e.browserEvent || e);
        }
    },

    
    setEvent : function(e){
        var me = this;
        if (e == me || (e && e.browserEvent)){ 
            return e;
        }
        me.browserEvent = e;
        if(e) {
            me.type = e.type;

            
            var node = e.target;
            me.target = node && node.nodeType == 3 ? node.parentNode : node;

            
            me.xy = [e.pageX, e.pageY];
            me.timestamp = e.timeStamp;
        } else {
            me.target = null;
            me.xy = [0, 0];
        }
        return me;
    },

    
    stopEvent : function(){
        this.stopPropagation();
        this.preventDefault();
    },

    
    preventDefault : function(){
        if(this.browserEvent) {
            this.browserEvent.preventDefault();
        }
    },

    
    stopPropagation : function() {
        if(this.browserEvent) {
            this.browserEvent.stopPropagation();
        }
    },

    
    getPageX : function(){
        return this.xy[0];
    },

    
    getPageY : function(){
        return this.xy[1];
    },

    
    getXY : function(){
        return this.xy;
    },

    
    getTarget : function(selector, maxDepth, returnEl) {
        return selector ? Ext.fly(this.target).findParent(selector, maxDepth, returnEl) : (returnEl ? Ext.get(this.target) : this.target);
    },

    getTime : function() {
        return this.timestamp;
    }
});


Ext.EventObject = new Ext.EventObjectImpl();

Ext.is = {
    init : function(navigator) {
        var platforms = this.platforms,
            ln = platforms.length,
            i, platform;

        navigator = navigator || window.navigator;

        for (i = 0; i < ln; i++) {
            platform = platforms[i];
            this[platform.identity] = platform.regex.test(navigator[platform.property]);
        }

        
        this.Desktop = this.Mac || this.Windows || (this.Linux && !this.Android);
        
        this.Tablet = this.iPad;
        
        this.Phone = !this.Desktop && !this.Tablet;
        
        this.iOS = this.iPhone || this.iPad || this.iPod;
        
        
        this.Standalone = !!window.navigator.standalone;
    },
    
    
    platforms: [{
        property: 'platform',
        regex: /iPhone/i,
        identity: 'iPhone'
    },
    
    
    {
        property: 'platform',
        regex: /iPod/i,
        identity: 'iPod'
    },
    
    
    {
        property: 'userAgent',
        regex: /iPad/i,
        identity: 'iPad'
    },
    
    
    {
        property: 'userAgent',
        regex: /Blackberry/i,
        identity: 'Blackberry'
    },
    
    
    {
        property: 'userAgent',
        regex: /Android/i,
        identity: 'Android'
    },
    
    
    {
        property: 'platform',
        regex: /Mac/i,
        identity: 'Mac'
    },
    
    
    {
        property: 'platform',
        regex: /Win/i,
        identity: 'Windows'
    },
    
    
    {
        property: 'platform',
        regex: /Linux/i,
        identity: 'Linux'
    }]
};

Ext.is.init();


Ext.supports = {
    init : function() {
        var doc = document,
            div = doc.createElement('div'),
            tests = this.tests,
            ln = tests.length,
            i, test;

        div.innerHTML = [
            '<div style="height:30px;width:50px;">',
                '<div style="height:20px;width:20px;"></div>',
            '</div>',
            '<div style="float:left; background-color:transparent;"></div>'
        ].join('');

        doc.body.appendChild(div);

        for (i = 0; i < ln; i++) {
            test = tests[i];
            this[test.identity] = test.fn.call(this, doc, div);
        }

        doc.body.removeChild(div);
    },

    
    OrientationChange: ((typeof window.orientation != 'undefined') && ('onorientationchange' in window)),
    
    
    DeviceMotion: ('ondevicemotion' in window),
    
    
    
    
    Touch: ('ontouchstart' in window) && (!Ext.is.Desktop),

    tests: [
        
        {
            identity: 'Transitions',
            fn: function(doc, div) {
                var prefix = [
                        'webkit',
                        'Moz',
                        'o',
                        'ms',
                        'khtml'
                    ],
                    TE = 'TransitionEnd',
                    transitionEndName = [
                        prefix[0] + TE,
                        'transitionend', 
                        prefix[2] + TE,
                        prefix[3] + TE,
                        prefix[4] + TE
                    ],
                    ln = prefix.length,
                    i = 0,
                    out = false;
                div = Ext.get(div);
                for (; i < ln; i++) {
                    if (div.getStyle(prefix[i] + "TransitionProperty")) {
                        Ext.supports.CSS3Prefix = prefix[i];
                        Ext.supports.CSS3TransitionEnd = transitionEndName[i];
                        out = true;
                        break;
                    }
                }
                return out;
            }
        },
        
        
        {
            identity: 'RightMargin',
            fn: function(doc, div, view) {
                view = doc.defaultView;
                return !(view && view.getComputedStyle(div.firstChild.firstChild, null).marginRight != '0px');
            }
        },
        
        
        {
            identity: 'TransparentColor',
            fn: function(doc, div, view) {
                view = doc.defaultView;
                return !(view && view.getComputedStyle(div.lastChild, null).backgroundColor != 'transparent');
            }
        },
        
        
        {
            identity: 'SVG',
            fn: function(doc) {
                return !!doc.createElementNS && !!doc.createElementNS( "http:/" + "/www.w3.org/2000/svg", "svg").createSVGRect;
            }
        },
    
        
        {
            identity: 'Canvas',
            fn: function(doc) {
                return !!doc.createElement('canvas').getContext;
            }
        },
        
        
        {
            identity: 'VML',
            fn: function(doc) {
                var d = doc.createElement("div");
                d.innerHTML = "<!--[if vml]><br><br><![endif]-->";
                return (d.childNodes.length == 2);
            }
        },
        
        
        {
            identity: 'Float',
            fn: function(doc, div) {
                return !!div.lastChild.style.cssFloat;
            }
        },
        
        
        {
            identity: 'AudioTag',
            fn: function(doc) {
                return !!doc.createElement('audio').canPlayType;
            }
        },
        
        
        {
            identity: 'History',
            fn: function() {
                return !!(window.history && history.pushState);
            }
        },
        
        
        {
            identity: 'CSS3DTransform',
            fn: function() {
                return (typeof WebKitCSSMatrix != 'undefined' && new WebKitCSSMatrix().hasOwnProperty('m41'));
            }
        },

		
        {
            identity: 'CSS3LinearGradient',
            fn: function(doc, div) {
                var property = 'background-image:',
                    webkit   = '-webkit-gradient(linear, left top, right bottom, from(black), to(white))',
                    w3c      = 'linear-gradient(left top, black, white)',
                    moz      = '-moz-' + w3c,
                    options  = [property + webkit, property + w3c, property + moz];
                
                div.style.cssText = options.join(';');
                
                return ("" + div.style.backgroundImage).indexOf('gradient') !== -1;
            }
        },
        
        
        {
            identity: 'CSS3BorderRadius',
            fn: function(doc, div) {
                var domPrefixes = ['borderRadius', 'BorderRadius', 'MozBorderRadius', 'WebkitBorderRadius', 'OBorderRadius', 'KhtmlBorderRadius'],
                    pass = false,
                    i;
                
                for (i = 0; i < domPrefixes.length; i++) {
                    if (document.body.style[domPrefixes[i]] !== undefined) {
                        return pass = true;
                    }
                }
                
                return pass;
            }
        },
        
        
        {
            identity: 'GeoLocation',
            fn: function() {
                return (typeof navigator != 'undefined' && typeof navigator.geolocation != 'undefined') || (typeof google != 'undefined' && typeof google.gears != 'undefined');
            }
        }
    ]
};



Ext.data.Batch = Ext.extend(Ext.util.Observable, {
    
    autoStart: false,
    
    
    current: -1,
    
    
    total: 0,
    
    
    isRunning: false,
    
    
    isComplete: false,
    
    
    hasException: false,
    
    
    pauseOnException: true,
    
    constructor: function(config) {                
        this.addEvents(
          
          'complete',
          
          
          'exception',
          
          
          'operationcomplete',
          
          
          'operation-complete'
        );
        
        Ext.data.Batch.superclass.constructor.call(this, config);
        
        
        this.operations = [];
    },
    
    
    add: function(operation) {
        this.total++;
        
        operation.setBatch(this);
        
        this.operations.push(operation);
    },
    
    
    start: function() {
        this.hasException = false;
        this.isRunning = true;
        
        this.runNextOperation();
    },
    
    
    runNextOperation: function() {
        this.runOperation(this.current + 1);
    },
    
    
    pause: function() {
        this.isRunning = false;
    },
    
    
    runOperation: function(index) {
        var operations = this.operations,
            operation  = operations[index];
        
        if (operation == undefined) {
            this.isRunning  = false;
            this.isComplete = true;
            this.fireEvent('complete', this, operations[operations.length - 1]);
        } else {
            this.current = index;
            
            var onProxyReturn = function(operation) {
                var hasException = operation.hasException();
                
                if (hasException) {
                    this.hasException = true;
                    this.fireEvent('exception', this, operation);
                } else {
                    
                    
                    this.fireEvent('operation-complete', this, operation);
                    
                    this.fireEvent('operationcomplete', this, operation);
                }

                if (hasException && this.pauseOnException) {
                    this.pause();
                } else {
                    operation.setCompleted();
                    
                    this.runNextOperation();
                }
            };
            
            operation.setStarted();
            
            this.proxy[operation.action](operation, onProxyReturn, this);
        }
    }
});

Ext.data.Model = Ext.extend(Ext.util.Stateful, {
    evented: false,
    isModel: true,
    
    
    phantom : false,
    
    
    idProperty: 'id',
    
    constructor: function(data, id) {
        data = data || {};
        
        
        this.internalId = (id || id === 0) ? id : Ext.data.Model.id(this);
        
        Ext.data.Model.superclass.constructor.apply(this);
        
        
        var fields = this.fields.items,
            length = fields.length,
            field, name, i;
        
        for (i = 0; i < length; i++) {
            field = fields[i];
            name  = field.name;
            
            if (data[name] == undefined) {
                data[name] = field.defaultValue;
            }
        }
        
        this.set(data);
        this.dirty = false;
        
        if (this.getId()) {
            this.phantom = false;
        }
        
        if (typeof this.init == 'function') {
            this.init();
        }
    },
    
    
    validate: function() {
        var errors      = new Ext.data.Errors(),
            validations = this.validations,
            validators  = Ext.data.validations,
            length, validation, field, valid, type, i;

        if (validations) {
            length = validations.length;
            
            for (i = 0; i < length; i++) {
                validation = validations[i];
                field = validation.field || validation.name;
                type  = validation.type;
                valid = validators[type](validation, this.get(field));
                
                if (!valid) {
                    errors.add({
                        field  : field,
                        message: validation.message || validators[type + 'Message']
                    });
                }
            }
        }
        
        return errors;
    },
    
    
    getProxy: function() {
        return this.constructor.proxy;
    },
    
    
    save: function(options) {
        var me     = this,
            action = me.phantom ? 'create' : 'update';
        
        options = options || {};
        
        Ext.apply(options, {
            records: [me],
            action : action
        });
        
        var operation  = new Ext.data.Operation(options),
            successFn  = options.success,
            failureFn  = options.failure,
            callbackFn = options.callback,
            scope      = options.scope,
            record;
        
        var callback = function(operation) {
            record = operation.getRecords()[0];
            
            if (operation.wasSuccessful()) {
                
                
                me.set(record.data);
                record.dirty = false;

                if (typeof successFn == 'function') {
                    successFn.call(scope, record, operation);
                }
            } else {
                if (typeof failureFn == 'function') {
                    failureFn.call(scope, record, operation);
                }
            }
            
            if (typeof callbackFn == 'function') {
                callbackFn.call(scope, record, operation);
            }
        };
        
        me.getProxy()[action](operation, callback, me);
        
        return me;
    },
    
    
    getId: function() {
        return this.get(this.idProperty);
    },
    
    
    setId: function(id) {
        this.set(this.idProperty, id);
    },
    
    
    join : function(store) {
        
        this.store = store;
    },
    
    
    unjoin: function(store) {
        delete this.store;
    },
    
    
    afterEdit : function() {
        this.callStore('afterEdit');
    },
    
    
    afterReject : function() {
        this.callStore("afterReject");
    },
    
    
    afterCommit: function() {
        this.callStore('afterCommit');
    },
    
    
    callStore: function(fn) {
        var store = this.store;
        
        if (store != undefined && typeof store[fn] == "function") {
            store[fn](this);
        }
    }
});

Ext.apply(Ext.data.Model, {
    
    setProxy: function(proxy) {
        
        proxy = Ext.data.ProxyMgr.create(proxy);
        
        proxy.setModel(this);
        this.proxy = proxy;
        
        return proxy;
    },
    
    
    load: function(id, config) {
        config = Ext.applyIf(config || {}, {
            action: 'read',
            id    : id
        });
        
        var operation  = new Ext.data.Operation(config),
            callbackFn = config.callback,
            successFn  = config.success,
            failureFn  = config.failure,
            scope      = config.scope,
            record, callback;
        
        callback = function(operation) {
            record = operation.getRecords()[0];
            
            if (operation.wasSuccessful()) {
                if (typeof successFn == 'function') {
                    successFn.call(scope, record, operation);
                }
            } else {
                if (typeof failureFn == 'function') {
                    failureFn.call(scope, record, operation);
                }
            }
            
            if (typeof callbackFn == 'function') {
                callbackFn.call(scope, record, operation);
            }
        };
        
        this.proxy.read(operation, callback, this);
    }
});


Ext.data.Model.id = function(rec) {
    rec.phantom = true;
    return [Ext.data.Model.PREFIX, '-', Ext.data.Model.AUTO_ID++].join('');
};



Ext.ns('Ext.data.Record');


Ext.data.Record.id = Ext.data.Model.id;


Ext.data.Model.PREFIX = 'ext-record';
Ext.data.Model.AUTO_ID = 1;
Ext.data.Model.EDIT = 'edit';
Ext.data.Model.REJECT = 'reject';
Ext.data.Model.COMMIT = 'commit';


Ext.data.Association = Ext.extend(Object, {
    
    
    
    
    
    primaryKey: 'id',
    
    constructor: function(config) {
        Ext.apply(this, config);
        
        var types           = Ext.ModelMgr.types,
            ownerName       = config.ownerModel,
            associatedName  = config.associatedModel,
            ownerModel      = types[ownerName],
            associatedModel = types[associatedName],
            ownerProto;
        
        if (ownerModel == undefined) {
            throw new Error("The configured ownerModel was not valid (you tried " + ownerName + ")");
        }
        
        if (associatedModel == undefined) {
            throw new Error("The configured associatedModel was not valid (you tried " + associatedName + ")");
        }
        
        this.ownerModel = ownerModel;
        this.associatedModel = associatedModel;
        
        
        
        
        
        Ext.applyIf(this, {
            ownerName : ownerName,
            associatedName: associatedName
        });
    }
});

Ext.data.HasManyAssociation = Ext.extend(Ext.data.Association, {
    
    
    
    
    
    
    
    
    constructor: function(config) {
        Ext.data.HasManyAssociation.superclass.constructor.apply(this, arguments);
        
        var ownerProto = this.ownerModel.prototype,
            name       = this.name;
        
        Ext.applyIf(this, {
            storeName : name + "Store",
            foreignKey: this.ownerName.toLowerCase() + "_id"
        });
        
        ownerProto[name] = this.createStore();
    },
    
    
    createStore: function() {
        var associatedModel = this.associatedModel,
            storeName       = this.storeName,
            foreignKey      = this.foreignKey,
            primaryKey      = this.primaryKey,
            filterProperty  = this.filterProperty,
            storeConfig     = this.storeConfig || {};
        
        return function() {
            var me = this,
                config, filter,
                modelDefaults = {};
                
            if (me[storeName] == undefined) {
                if (filterProperty) {
                    filter = {
                        property  : filterProperty,
                        value     : me.get(filterProperty),
                        exactMatch: true
                    };
                } else {
                    filter = {
                        property  : foreignKey,
                        value     : me.get(primaryKey),
                        exactMatch: true
                    };
                }
                
                modelDefaults[foreignKey] = me.get(primaryKey);
                
                config = Ext.apply({}, storeConfig, {
                    model        : associatedModel,
                    filters      : [filter],
                    remoteFilter : false,
                    modelDefaults: modelDefaults
                });
                
                me[storeName] = new Ext.data.Store(config);
            }
            
            return me[storeName];
        };
    }
});

Ext.data.BelongsToAssociation = Ext.extend(Ext.data.Association, {
    
    
    

    
    
    constructor: function(config) {
        Ext.data.BelongsToAssociation.superclass.constructor.apply(this, arguments);
        
        var me             = this,
            ownerProto     = me.ownerModel.prototype,
            associatedName = me.associatedName,
            getterName     = me.getterName || 'get' + associatedName,
            setterName     = me.setterName || 'set' + associatedName;

        Ext.applyIf(me, {
            name        : associatedName,
            foreignKey  : associatedName.toLowerCase() + "_id",
            instanceName: associatedName + 'BelongsToInstance'
        });
        
        ownerProto[getterName] = me.createGetter();
        ownerProto[setterName] = me.createSetter();
    },
    
    
    createSetter: function() {
        var me              = this,
            ownerModel      = me.ownerModel,
            associatedModel = me.associatedModel,
            foreignKey      = me.foreignKey,
            primaryKey      = me.primaryKey;
        
        
        return function(value, options, scope) {
            this.set(foreignKey, value);
            
            if (typeof options == 'function') {
                options = {
                    callback: options,
                    scope: scope || this
                };
            }
            
            if (Ext.isObject(options)) {
                return this.save(options);
            }
        };
    },
    
    
    createGetter: function() {
        var me              = this,
            ownerModel      = me.ownerModel,
            associatedName  = me.associatedName,
            associatedModel = me.associatedModel,
            foreignKey      = me.foreignKey,
            primaryKey      = me.primaryKey,
            instanceName    = me.instanceName;
        
        
        return function(options, scope) {
            options = options || {};
            
            var foreignKeyId = this.get(foreignKey),
                instance, callbackFn;
                
            if (this[instanceName] == undefined) {
                instance = Ext.ModelMgr.create({}, associatedName);
                instance.set(primaryKey, foreignKeyId);

                if (typeof options == 'function') {
                    options = {
                        callback: options,
                        scope: scope || this
                    };
                }
                
                associatedModel.load(foreignKeyId, options);
            } else {
                instance = this[instanceName];
                
                
                
                
                if (typeof options == 'function') {
                    options.call(scope || this, instance);
                }
                
                if (options.success) {
                    options.success.call(scope || this, instance);
                }
                
                if (options.callback) {
                    options.callback.call(scope || this, instance);
                }
                
                return instance;
            }
        };
    }
});

Ext.data.PolymorphicAssociation = Ext.extend(Ext.data.Association, {

    constructor: function(config) {
        Ext.data.PolymorphicAssociation.superclass.constructor.call(this, config);
        
        var ownerProto = this.ownerModel.prototype,
            name       = this.name;
        
        Ext.applyIf(this, {
            associationIdField: this.ownerName.toLowerCase() + "_id"
        });
        
        ownerProto[name] = this.createStore();
    },

    
    createStore: function() {
        var association           = this,
            ownerName             = this.ownerName,
            storeName             = this.name + "Store",
            associatedModel       = this.associatedModel,
            primaryKey            = this.primaryKey,
            associationIdField    = 'associated_id',
            associationModelField = 'associated_model';
        
        return function() {
            var me = this,
                modelDefaults = {},
                config, filters;
                
            if (me[storeName] == undefined) {
                filters = [
                    {
                        property  : associationIdField,
                        value     : me.get(primaryKey),
                        exactMatch: true
                    },
                    {
                        property  : associationModelField,
                        value     : ownerName,
                        exactMatch: true
                    }
                ];
                
                modelDefaults[associationIdField] = me.get(primaryKey);
                modelDefaults[associationModelField] = ownerName;
                
                config = Ext.apply({}, association.storeConfig || {}, {
                    model        : associatedModel,
                    filters      : filters,
                    remoteFilter : false,
                    modelDefaults: modelDefaults
                });
                
                me[storeName] = new Ext.data.Store(config);
            }
            
            return me[storeName];
        };
    }
});

Ext.data.validations = {
    
    
    presenceMessage: 'must be present',
    
    
    lengthMessage: 'is the wrong length',
    
    
    formatMessage: 'is the wrong format',
    
    
    inclusionMessage: 'is not included in the list of acceptable values',
    
    
    exclusionMessage: 'is not an acceptable value',
    
    
    presence: function(config, value) {
        if (value == undefined) {
            value = config;
        }
        
        return !!value;
    },
    
    
    length: function(config, value) {
        if (value == undefined) {
            return false;
        }
        
        var length = value.length,
            min    = config.min,
            max    = config.max;
        
        if ((min && length < min) || (max && length > max)) {
            return false;
        } else {
            return true;
        }
    },
    
    
    format: function(config, value) {
        return !!(config.matcher && config.matcher.test(value));
    },
    
    
    inclusion: function(config, value) {
        return config.list && config.list.indexOf(value) != -1;
    },
    
    
    exclusion: function(config, value) {
        return config.list && config.list.indexOf(value) == -1;
    }
};

Ext.data.Errors = Ext.extend(Ext.util.MixedCollection, {
    
    isValid: function() {
        return this.length == 0;
    },
    
    
    getByField: function(fieldName) {
        var errors = [],
            error, field, i;
            
        for (i = 0; i < this.length; i++) {
            error = this.items[i];
            
            if (error.field == fieldName) {
                errors.push(error);
            }
        }
        
        return errors;
    }
});


Ext.data.Field = Ext.extend(Object, {
    
    constructor : function(config) {
        if (Ext.isString(config)) {
            config = {name: config};
        }
        Ext.apply(this, config);
        
        var types = Ext.data.Types,
            st = this.sortType,
            t;

        if (this.type) {
            if (Ext.isString(this.type)) {
                this.type = types[this.type.toUpperCase()] || types.AUTO;
            }
        } else {
            this.type = types.AUTO;
        }

        
        if (Ext.isString(st)) {
            this.sortType = Ext.data.SortTypes[st];
        } else if(Ext.isEmpty(st)) {
            this.sortType = this.type.sortType;
        }

        if (!this.convert) {
            this.convert = this.type.convert;
        }
    },
    
    
    
    
    
    
    
    dateFormat: null,
    
    
    useNull: false,
    
    
    defaultValue: "",
    
    mapping: null,
    
    sortType : null,
    
    sortDir : "ASC",
    
    allowBlank : true
});


Ext.data.SortTypes = {
    
    none : function(s) {
        return s;
    },

    
    stripTagsRE : /<\/?[^>]+>/gi,

    
    asText : function(s) {
        return String(s).replace(this.stripTagsRE, "");
    },

    
    asUCText : function(s) {
        return String(s).toUpperCase().replace(this.stripTagsRE, "");
    },

    
    asUCString : function(s) {
        return String(s).toUpperCase();
    },

    
    asDate : function(s) {
        if(!s){
            return 0;
        }
        if(Ext.isDate(s)){
            return s.getTime();
        }
        return Date.parse(String(s));
    },

    
    asFloat : function(s) {
        var val = parseFloat(String(s).replace(/,/g, ""));
        return isNaN(val) ? 0 : val;
    },

    
    asInt : function(s) {
        var val = parseInt(String(s).replace(/,/g, ""), 10);
        return isNaN(val) ? 0 : val;
    }
};

Ext.data.Types = new function() {
    var st = Ext.data.SortTypes;
    
    Ext.apply(this, {
        
        stripRe: /[\$,%]/g,
        
        
        AUTO: {
            convert: function(v) {
                return v;
            },
            sortType: st.none,
            type: 'auto'
        },

        
        STRING: {
            convert: function(v) {
                return (v === undefined || v === null) ? '' : String(v);
            },
            sortType: st.asUCString,
            type: 'string'
        },

        
        INT: {
            convert: function(v) {
                return v !== undefined && v !== null && v !== '' ?
                    parseInt(String(v).replace(Ext.data.Types.stripRe, ''), 10) : (this.useNull ? null : 0);
            },
            sortType: st.none,
            type: 'int'
        },
        
        
        FLOAT: {
            convert: function(v) {
                return v !== undefined && v !== null && v !== '' ?
                    parseFloat(String(v).replace(Ext.data.Types.stripRe, ''), 10) : (this.useNull ? null : 0);
            },
            sortType: st.none,
            type: 'float'
        },
        
        
        BOOL: {
            convert: function(v) {
                return v === true || v === 'true' || v == 1;
            },
            sortType: st.none,
            type: 'bool'
        },
        
        
        DATE: {
            convert: function(v) {
                var df = this.dateFormat;
                if (!v) {
                    return null;
                }
                if (Ext.isDate(v)) {
                    return v;
                }
                if (df) {
                    if (df == 'timestamp') {
                        return new Date(v*1000);
                    }
                    if (df == 'time') {
                        return new Date(parseInt(v, 10));
                    }
                    return Date.parseDate(v, df);
                }
                
                var parsed = Date.parse(v);
                return parsed ? new Date(parsed) : null;
            },
            sortType: st.asDate,
            type: 'date'
        }
    });
    
    Ext.apply(this, {
        
        BOOLEAN: this.BOOL,
        
        
        INTEGER: this.INT,
        
        
        NUMBER: this.FLOAT    
    });
};

Ext.ModelMgr = new Ext.AbstractManager({
    typeName: 'mtype',
    
    
    defaultProxyType: 'ajax',
    
    
    associationStack: [],
    
    
    registerType: function(name, config) {
        
        
        var PluginMgr    = Ext.PluginMgr,
            plugins      = PluginMgr.findByType('model', true),
            fields       = config.fields || [],
            associations = config.associations || [],
            belongsTo    = config.belongsTo,
            hasMany      = config.hasMany,
            extendName   = config.extend,
            modelPlugins = config.plugins || [],
            association, model, length, i,
            extendModel, extendModelProto, extendValidations, proxy;
        
        
        
        if (belongsTo) {
            if (!Ext.isArray(belongsTo)) {
                belongsTo = [belongsTo];
            }
            
            for (i = 0; i < belongsTo.length; i++) {
                association = belongsTo[i];
                
                if (!Ext.isObject(association)) {
                    association = {model: association};
                }
                Ext.apply(association, {type: 'belongsTo'});
                
                associations.push(association);
            }
            
            delete config.belongsTo;
        }
        
        if (hasMany) {
            if (!Ext.isArray(hasMany)) {
                hasMany = [hasMany];
            }
            
            for (i = 0; i < hasMany.length; i++) {
                association = hasMany[i];
                
                if (!Ext.isObject(association)) {
                    association = {model: association};
                }
                
                Ext.apply(association, {type: 'hasMany'});
                
                associations.push(association);
            }
            
            delete config.hasMany;
        }
        
        
        if (extendName) {
            extendModel       = this.types[extendName];
            extendModelProto  = extendModel.prototype;
            extendValidations = extendModelProto.validations;
            
            proxy              = extendModel.proxy;
            fields             = extendModelProto.fields.items.concat(fields);
            associations       = extendModelProto.associations.items.concat(associations);
            config.validations = extendValidations ? extendValidations.concat(config.validations) : config.validations;
        } else {
            extendModel = Ext.data.Model;
            proxy = config.proxy;
        }
        
        model = Ext.extend(extendModel, config);
        
        for (i = 0, length = modelPlugins.length; i < length; i++) {
            plugins.push(PluginMgr.create(modelPlugins[i]));
        }
        
        this.types[name] = model;
        
        Ext.override(model, {
            plugins     : plugins,
            fields      : this.createFields(fields),
            associations: this.createAssociations(associations, name)
        });
        
        model.modelName = name;
        Ext.data.Model.setProxy.call(model, proxy || this.defaultProxyType);
        model.getProxy = model.prototype.getProxy;
        
        model.load = function() {
            Ext.data.Model.load.apply(this, arguments);
        };
        
        for (i = 0, length = plugins.length; i < length; i++) {
            plugins[i].bootstrap(model, config);
        }
        
        model.defined = true;
        this.onModelDefined(model);
        
        return model;
    },
    
    
    onModelDefined: function(model) {
        var stack  = this.associationStack,
            length = stack.length,
            create = [],
            association, i;
        
        for (i = 0; i < length; i++) {
            association = stack[i];
            
            if (association.associatedModel == model.modelName) {
                create.push(association);
            }
        }
        
        length = create.length;
        for (i = 0; i < length; i++) {
            this.addAssociation(create[i], this.types[create[i].ownerModel].prototype.associations);
            stack.remove(create[i]);
        }
    },
    
    
    createAssociations: function(associations, name) {
        var length = associations.length,
            i, associationsMC, association;
        
        associationsMC = new Ext.util.MixedCollection(false, function(association) {
            return association.name;
        });
        
        for (i = 0; i < length; i++) {
            association = associations[i];
            Ext.apply(association, {
                ownerModel: name,
                associatedModel: association.model
            });
            
            if (this.types[association.model] == undefined) {
                this.associationStack.push(association);
            } else {
                this.addAssociation(association, associationsMC);
            }
        }
        
        return associationsMC;
    },
    
    
    addAssociation: function(association, associationsMC) {
        var type = association.type;
        
        if (type == 'belongsTo') {
            associationsMC.add(new Ext.data.BelongsToAssociation(association));
        }
        
        if (type == 'hasMany') {
            associationsMC.add(new Ext.data.HasManyAssociation(association));
        }
        
        if (type == 'polymorphic') {
            associationsMC.add(new Ext.data.PolymorphicAssociation(association));
        }
    },
    
    
    createFields: function(fields) {
        var length = fields.length,
            i, fieldsMC;
        
        fieldsMC = new Ext.util.MixedCollection(false, function(field) {
            return field.name;
        });
        
        for (i = 0; i < length; i++) {
            fieldsMC.add(new Ext.data.Field(fields[i]));
        }
        
        return fieldsMC;
    },
    
    
    getModel: function(id) {
        var model = id;
        if (typeof model == 'string') {
            model = this.types[model];
        }
        return model;
    },
    
    
    create: function(config, name, id) {
        var con = typeof name == 'function' ? name : this.types[name || config.name];
        
        return new con(config, id);
    }
});


Ext.regModel = function() {
    return Ext.ModelMgr.registerType.apply(Ext.ModelMgr, arguments);
};

Ext.data.Operation = Ext.extend(Object, {
    
    synchronous: true,
    
    
    action: undefined,
    
    
    filters: undefined,
    
    
    sorters: undefined,
    
    
    group: undefined,
    
    
    start: undefined,
    
    
    limit: undefined,
    
    
    batch: undefined,
        
    
    started: false,
    
    
    running: false,
    
    
    complete: false,
    
    
    success: undefined,
    
    
    exception: false,
    
    
    error: undefined,
    
    constructor: function(config) {
        Ext.apply(this, config || {});
    },
    
    
    setStarted: function() {
        this.started = true;
        this.running = true;
    },
    
    
    setCompleted: function() {
        this.complete = true;
        this.running  = false;
    },
    
    
    setSuccessful: function() {
        this.success = true;
    },
    
    
    setException: function(error) {
        this.exception = true;
        this.success = false;
        this.running = false;
        this.error = error;
    },
    
    
    markStarted: function() {
        console.warn("Operation: markStarted has been deprecated. Please use setStarted");
        return this.setStarted();
    },
    
    
    markCompleted: function() {
        console.warn("Operation: markCompleted has been deprecated. Please use setCompleted");
        return this.setCompleted();
    },
    
    
    markSuccessful: function() {
        console.warn("Operation: markSuccessful has been deprecated. Please use setSuccessful");
        return this.setSuccessful();
    },
    
    
    markException: function() {
        console.warn("Operation: markException has been deprecated. Please use setException");
        return this.setException();
    },
    
    
    hasException: function() {
        return this.exception === true;
    },
    
    
    getError: function() {
        return this.error;
    },
    
    
    getRecords: function() {
        var resultSet = this.getResultSet();
        
        return (resultSet == undefined ? this.records : resultSet.records);
    },
    
    
    getResultSet: function() {
        return this.resultSet;
    },
    
    
    isStarted: function() {
        return this.started === true;
    },
    
    
    isRunning: function() {
        return this.running === true;
    },
    
    
    isComplete: function() {
        return this.complete === true;
    },
    
    
    wasSuccessful: function() {
        return this.isComplete() && this.success === true;
    },
    
    
    setBatch: function(batch) {
        this.batch = batch;
    },
    
    
    allowWrite: function() {
        return this.action != 'read';
    }
});

Ext.data.ProxyMgr = new Ext.AbstractManager({
    create: function(config) {
        if (config == undefined || typeof config == 'string') {
            config = {
                type: config
            };
        }

        if (!(config instanceof Ext.data.Proxy)) {
            Ext.applyIf(config, {
                type : this.defaultProxyType,
                model: this.model
            });

            var type = config[this.typeName] || config.type,
                Constructor = this.types[type];

            if (Constructor == undefined) {
                throw new Error(Ext.util.Format.format("The '{0}' type has not been registered with this manager", type));
            }

            return new Constructor(config);
        } else {
            return config;
        }
    }
});

Ext.data.ReaderMgr = new Ext.AbstractManager({
    typeName: 'rtype'
});

Ext.data.Request = Ext.extend(Object, {
    
    action: undefined,
    
    
    params: undefined,
    
    
    method: 'GET',
    
    
    url: undefined,

    constructor: function(config) {
        Ext.apply(this, config);
    }
});

Ext.data.ResultSet = Ext.extend(Object, {
    
    loaded: true,
    
    
    count: 0,
    
    
    total: 0,
    
    
    success: false,
    
    

    constructor: function(config) {
        Ext.apply(this, config);
        
        
        this.totalRecords = this.total;
        
        if (config.count == undefined) {
            this.count = this.records.length;
        }
    }
});

Ext.data.AbstractStore = Ext.extend(Ext.util.Observable, {
    remoteSort  : false,
    remoteFilter: false,

    

    
    autoLoad: false,

    
    autoSave: false,

    
    batchUpdateMode: 'operation',

    
    filterOnLoad: true,

    
    sortOnLoad: true,

    
    defaultSortDirection: "ASC",

    
    implicitModel: false,

    
    defaultProxyType: 'memory',

    
    isDestroyed: false,

    isStore: true,

    

    
    constructor: function(config) {
        this.addEvents(
            
            'add',

            
            'remove',
            
            
            'update',

            
            'datachanged',

            
            'beforeload',

            
            'load',

            
            'beforesync'
        );
        
        Ext.apply(this, config);

        
        this.removed = [];

        
        this.sortToggle = {};

        Ext.data.AbstractStore.superclass.constructor.apply(this, arguments);

        this.model = Ext.ModelMgr.getModel(config.model);
        
        
        Ext.applyIf(this, {
            modelDefaults: {}
        });

        
        if (!this.model && config.fields) {
            this.model = Ext.regModel('ImplicitModel-' + this.storeId || Ext.id(), {
                fields: config.fields
            });

            delete this.fields;

            this.implicitModel = true;
        }

        
        this.setProxy(config.proxy || this.model.proxy);

        if (this.id && !this.storeId) {
            this.storeId = this.id;
            delete this.id;
        }

        if (this.storeId) {
            Ext.StoreMgr.register(this);
        }
        
        
        this.sorters = new Ext.util.MixedCollection();
        this.sorters.addAll(this.decodeSorters(config.sorters));
        
        
        this.filters = new Ext.util.MixedCollection();
        this.filters.addAll(this.decodeFilters(config.filters));
    },


    
    setProxy: function(proxy) {
        if (proxy instanceof Ext.data.Proxy) {
            proxy.setModel(this.model);
        } else {
            Ext.applyIf(proxy, {
                model: this.model
            });
            
            proxy = Ext.data.ProxyMgr.create(proxy);
        }
        
        this.proxy = proxy;
        
        return this.proxy;
    },

    
    getProxy: function() {
        return this.proxy;
    },

    
    create: function(data, options) {
        var instance = Ext.ModelMgr.create(Ext.applyIf(data, this.modelDefaults), this.model.modelName),
            operation;
        
        options = options || {};

        Ext.applyIf(options, {
            action : 'create',
            records: [instance]
        });

        operation = new Ext.data.Operation(options);

        this.proxy.create(operation, this.onProxyWrite, this);
        
        return instance;
    },

    read: function() {
        return this.load.apply(this, arguments);
    },

    onProxyRead: Ext.emptyFn,

    update: function(options) {
        options = options || {};

        Ext.applyIf(options, {
            action : 'update',
            records: this.getUpdatedRecords()
        });

        var operation = new Ext.data.Operation(options);

        return this.proxy.update(operation, this.onProxyWrite, this);
    },

    onProxyWrite: Ext.emptyFn,


    
    destroy: function(options) {
        options = options || {};

        Ext.applyIf(options, {
            action : 'destroy',
            records: this.getRemovedRecords()
        });

        var operation = new Ext.data.Operation(options);

        return this.proxy.destroy(operation, this.onProxyWrite, this);
    },

    
    onBatchOperationComplete: function(batch, operation) {
        return this.onProxyWrite(operation);
    },

    
    onBatchComplete: function(batch, operation) {
        var operations = batch.operations,
            length = operations.length,
            i;

        this.suspendEvents();

        for (i = 0; i < length; i++) {
            this.onProxyWrite(operations[i]);
        }

        this.resumeEvents();

        this.fireEvent('datachanged', this);
    },

    onBatchException: function(batch, operation) {
        
        
        
        
        
    },

    
    filterNew: function(item) {
        return item.phantom == true || item.needsAdd == true;
    },

    
    getNewRecords: function() {
        return [];
    },

    
    getUpdatedRecords: function() {
        return [];
    },

    
    filterDirty: function(item) {
        return item.dirty == true;
    },

    
    getRemovedRecords: function() {
        return this.removed;
    },


    sort: function(sorters, direction) {

    },

    
    decodeSorters: function(sorters) {
        if (!Ext.isArray(sorters)) {
            if (sorters == undefined) {
                sorters = [];
            } else {
                sorters = [sorters];
            }
        }

        var length = sorters.length,
            Sorter = Ext.util.Sorter,
            config, i;

        for (i = 0; i < length; i++) {
            config = sorters[i];

            if (!(config instanceof Sorter)) {
                if (Ext.isString(config)) {
                    config = {
                        property: config
                    };
                }
                
                Ext.applyIf(config, {
                    root     : 'data',
                    direction: "ASC"
                });

                
                if (config.fn) {
                    config.sorterFn = config.fn;
                }

                
                if (typeof config == 'function') {
                    config = {
                        sorterFn: config
                    };
                }

                sorters[i] = new Sorter(config);
            }
        }

        return sorters;
    },

    filter: function(filters, value) {

    },

    
    createSortFunction: function(field, direction) {
        direction = direction || "ASC";
        var directionModifier = direction.toUpperCase() == "DESC" ? -1 : 1;

        var fields   = this.model.prototype.fields,
            sortType = fields.get(field).sortType;

        
        
        return function(r1, r2) {
            var v1 = sortType(r1.data[field]),
                v2 = sortType(r2.data[field]);

            return directionModifier * (v1 > v2 ? 1 : (v1 < v2 ? -1 : 0));
        };
    },

    
    decodeFilters: function(filters) {
        if (!Ext.isArray(filters)) {
            if (filters == undefined) {
                filters = [];
            } else {
                filters = [filters];
            }
        }

        var length = filters.length,
            Filter = Ext.util.Filter,
            config, i;

        for (i = 0; i < length; i++) {
            config = filters[i];

            if (!(config instanceof Filter)) {
                Ext.apply(config, {
                    root: 'data'
                });

                
                if (config.fn) {
                    config.filterFn = config.fn;
                }

                
                if (typeof config == 'function') {
                    config = {
                        filterFn: config
                    };
                }

                filters[i] = new Filter(config);
            }
        }

        return filters;
    },

    clearFilter: function(supressEvent) {

    },

    isFiltered: function() {

    },

    filterBy: function(fn, scope) {

    },


    
    sync: function() {
        var me        = this,
            options   = {},
            toCreate  = me.getNewRecords(),
            toUpdate  = me.getUpdatedRecords(),
            toDestroy = me.getRemovedRecords(),
            needsSync = false;

        if (toCreate.length > 0) {
            options.create = toCreate;
            needsSync = true;
        }

        if (toUpdate.length > 0) {
            options.update = toUpdate;
            needsSync = true;
        }

        if (toDestroy.length > 0) {
            options.destroy = toDestroy;
            needsSync = true;
        }

        if (needsSync && me.fireEvent('beforesync', options) !== false) {
            me.proxy.batch(options, me.getBatchListeners());
        }
    },


    
    getBatchListeners: function() {
        var listeners = {
            scope: this,
            exception: this.onBatchException
        };

        if (this.batchUpdateMode == 'operation') {
            listeners['operationcomplete'] = this.onBatchOperationComplete;
        } else {
            listeners['complete'] = this.onBatchComplete;
        }

        return listeners;
    },

    
    save: function() {
        return this.sync.apply(this, arguments);
    },

    
    load: function(options) {
        var me = this,
            operation;

        options = options || {};

        Ext.applyIf(options, {
            action : 'read',
            filters: me.filters.items,
            sorters: me.sorters.items
        });

        operation = new Ext.data.Operation(options);

        if (me.fireEvent('beforeload', me, operation) !== false) {
            me.loading = true;
            me.proxy.read(operation, me.onProxyLoad, me);
        }
        
        return me;
    },

    
    afterEdit : function(record) {
        this.fireEvent('update', this, record, Ext.data.Model.EDIT);
    },

    
    afterReject : function(record) {
        this.fireEvent('update', this, record, Ext.data.Model.REJECT);
    },

    
    afterCommit : function(record) {
        if (this.autoSave) {
            this.sync();
        }

        this.fireEvent('update', this, record, Ext.data.Model.COMMIT);
    },

    clearData: Ext.emptyFn,

    destroyStore: function() {
        if (!this.isDestroyed) {
            if (this.storeId) {
                Ext.StoreMgr.unregister(this);
            }
            this.clearData();
            this.data = null;
            this.tree = null;
            
            this.reader = this.writer = null;
            this.clearListeners();
            this.isDestroyed = true;

            if (this.implicitModel) {
                Ext.destroy(this.model);
            }
        }
    },

    
    getSortState : function() {
        return this.sortInfo;
    },

    getCount: function() {

    },

    getById: function(id) {

    },

    
    
    removeAll: function() {

    }
});


Ext.data.Store = Ext.extend(Ext.data.AbstractStore, {
    
    remoteSort: false,

    
    remoteFilter: false,

    

    

    
    groupField: undefined,

    
    groupDir: "ASC",

    
    pageSize: 25,

    
    currentPage: 1,
    
    
    clearOnPageLoad: true,

    
    implicitModel: false,

    
    loading: false,
    
    
    sortOnFilter: true,

    isStore: true,

    
    constructor: function(config) {
        config = config || {};
        
        
        this.data = new Ext.util.MixedCollection(false, function(record) {
            return record.internalId;
        });

        if (config.data) {
            this.inlineData = config.data;
            delete config.data;
        }

        Ext.data.Store.superclass.constructor.call(this, config);
        
        var proxy = this.proxy,
            data  = this.inlineData;
            
        if (data) {
            if (proxy instanceof Ext.data.MemoryProxy) {
                proxy.data = data;
                this.read();
            } else {
                this.add.apply(this, data);
            }
            
            this.sort();
            delete this.inlineData;
        } else if (this.autoLoad) {
            Ext.defer(this.load, 10, this, [typeof this.autoLoad == 'object' ? this.autoLoad : undefined]);
            
            
        }
    },

    
    getGroups: function() {
        var records  = this.data.items,
            length   = records.length,
            groups   = [],
            pointers = {},
            record, groupStr, group, i;

        for (i = 0; i < length; i++) {
            record = records[i];
            groupStr = this.getGroupString(record);
            group = pointers[groupStr];

            if (group == undefined) {
                group = {
                    name: groupStr,
                    children: []
                };

                groups.push(group);
                pointers[groupStr] = group;
            }

            group.children.push(record);
        }
        
        return groups;
    },

    
    getGroupString: function(instance) {
        return instance.get(this.groupField);
    },
    
    
    first: function() {
        return this.data.first();
    },
    
    
    last: function() {
        return this.data.last();
    },

    
    insert : function(index, records) {
        var i, record, len;

        records = [].concat(records);
        for (i = 0, len = records.length; i < len; i++) {
            record = this.createModel(records[i]);
            record.set(this.modelDefaults);

            this.data.insert(index + i, record);
            record.join(this);
        }

        if (this.snapshot) {
            this.snapshot.addAll(records);
        }

        this.fireEvent('add', this, records, index);
        this.fireEvent('datachanged', this);
    },

    
    add: function(records) {
        
        if (!Ext.isArray(records)) {
            records = Array.prototype.slice.apply(arguments);
        }
        
        var length  = records.length,
            record, i;

        for (i = 0; i < length; i++) {
            record = this.createModel(records[i]);

            if (record.phantom == false) {
                record.needsAdd = true;
            }
            
            records[i] = record;
        }

        this.insert(this.data.length, records);

        return records;
    },

    
    createModel: function(record) {
        if (!(record instanceof Ext.data.Model)) {
            record = Ext.ModelMgr.create(record, this.model);
        }
        
        return record;
    },

    
    each : function(fn, scope) {
        this.data.each(fn, scope);
    },

    
    remove: function(records) {
        if (!Ext.isArray(records)) {
            records = [records];
        }

        var length = records.length,
            i, index, record;

        for (i = 0; i < length; i++) {
            record = records[i];
            index = this.data.indexOf(record);

            if (index > -1) {
                this.removed.push(record);

                if (this.snapshot) {
                    this.snapshot.remove(record);
                }

                record.unjoin(this);
                this.data.remove(record);

                this.fireEvent('remove', this, record, index);
            }
        }

        this.fireEvent('datachanged', this);
    },

    
    removeAt: function(index) {
        var record = this.getAt(index);

        if (record) {
            this.remove(record);
        }
    },

    
    load: function(options) {
        options = options || {};
        
        if (Ext.isFunction(options)) {
            options = {
                callback: options
            };
        }
        
        Ext.applyIf(options, {
            group : {field: this.groupField, direction: this.groupDir},
            start : 0,
            limit : this.pageSize,
            addRecords: false
        });
        
        return Ext.data.Store.superclass.load.call(this, options);
    },
    
    
    isLoading: function() {
        return this.loading;
    },

    
    onProxyLoad: function(operation) {
        var records = operation.getRecords();
        
        this.loadRecords(records, operation.addRecords);
        this.loading = false;
        this.fireEvent('load', this, records, operation.wasSuccessful());
        
        
        
        this.fireEvent('read', this, records, operation.wasSuccessful());

        
        var callback = operation.callback;
        
        if (typeof callback == 'function') {
            callback.call(operation.scope || this, records, operation, operation.wasSuccessful());
        }
    },

    
    onProxyWrite: function(operation) {
        var data     = this.data,
            action   = operation.action,
            records  = operation.getRecords(),
            length   = records.length,
            callback = operation.callback,
            record, i;

        if (operation.wasSuccessful()) {
            if (action == 'create' || action == 'update') {
                for (i = 0; i < length; i++) {
                    record = records[i];

                    record.phantom = false;
                    record.join(this);
                    data.replace(record);
                }
            }

            else if (action == 'destroy') {
                for (i = 0; i < length; i++) {
                    record = records[i];

                    record.unjoin(this);
                    data.remove(record);
                }

                this.removed = [];
            }

            this.fireEvent('datachanged');
        }

        
        if (typeof callback == 'function') {
            callback.call(operation.scope || this, records, operation, operation.wasSuccessful());
        }
    },

    
    getNewRecords: function() {
        return this.data.filterBy(this.filterNew).items;
    },

    
    getUpdatedRecords: function() {
        return this.data.filterBy(this.filterDirty).items;
    },

    
    sort: function(sorters, direction) {
        if (Ext.isString(sorters)) {
            var property   = sorters,
                sortToggle = this.sortToggle,
                toggle     = Ext.util.Format.toggle;

            if (direction == undefined) {
                sortToggle[property] = toggle(sortToggle[property] || "", "ASC", "DESC");
                direction = sortToggle[property];
            }

            sorters = {
                property : property,
                direction: direction
            };
        }
        
        if (arguments.length != 0) {
            this.sorters.clear();
        }
        
        this.sorters.addAll(this.decodeSorters(sorters));

        if (this.remoteSort) {
            
            this.load();
        } else {
            this.data.sort(this.sorters.items);

            this.fireEvent('datachanged', this);
        }
    },


    
    filter: function(filters, value) {
        if (Ext.isString(filters)) {
            filters = {
                property: filters,
                value   : value
            };
        }
        
        this.filters.addAll(this.decodeFilters(filters));

        if (this.remoteFilter) {
            
            this.load();
        } else {
            
            this.snapshot = this.snapshot || this.data.clone();

            this.data = this.data.filter(this.filters.items);
            
            if (this.sortOnFilter && !this.remoteSort) {
                this.sort();
            } else {
                this.fireEvent('datachanged', this);
            }
        }
    },

    
    clearFilter : function(suppressEvent) {
        this.filters.clear();
        
        if (this.isFiltered()) {
            this.data = this.snapshot.clone();
            delete this.snapshot;

            if (suppressEvent !== true) {
                this.fireEvent('datachanged', this);
            }
        }
    },

    
    isFiltered : function() {
        return !!this.snapshot && this.snapshot != this.data;
    },

    
    filterBy : function(fn, scope) {
        this.snapshot = this.snapshot || this.data.clone();
        this.data = this.queryBy(fn, scope || this);
        this.fireEvent('datachanged', this);
    },

    
    queryBy : function(fn, scope) {
        var data = this.snapshot || this.data;
        return data.filterBy(fn, scope||this);
    },
    
    
    loadData: function(data, append) {
        var model  = this.model,
            length = data.length,
            i, record;

        
        for (i = 0; i < length; i++) {
            record = data[i];

            if (!(record instanceof Ext.data.Model)) {
                data[i] = Ext.ModelMgr.create(record, model);
            }
        }

        this.loadRecords(data, append);
    },

    
    loadRecords: function(records, add) {
        if (!add) {
            this.data.clear();
        }
        
        this.data.addAll(records);
        
        
        for (var i = 0, length = records.length; i < length; i++) {
            records[i].needsAdd = false;
            records[i].join(this);
        }
        
        
        this.suspendEvents();

        if (this.filterOnLoad && !this.remoteFilter) {
            this.filter();
        }

        if (this.sortOnLoad && !this.remoteSort) {
            this.sort();
        }

        this.resumeEvents();
        this.fireEvent('datachanged', this, records);
    },

    

    
    loadPage: function(page) {
        this.currentPage = page;

        this.read({
            page : page,
            start: (page - 1) * this.pageSize,
            limit: this.pageSize,
            addRecords: !this.clearOnPageLoad
        });
    },

    
    nextPage: function() {
        this.loadPage(this.currentPage + 1);
    },

    
    previousPage: function() {
        this.loadPage(this.currentPage - 1);
    },

    
    clearData: function(){
        this.data.each(function(record) {
            record.unjoin();
        });

        this.data.clear();
    },

    
    find : function(property, value, start, anyMatch, caseSensitive, exactMatch) {
        var fn = this.createFilterFn(property, value, anyMatch, caseSensitive, exactMatch);
        return fn ? this.data.findIndexBy(fn, null, start) : -1;
    },

    
    findRecord : function() {
        var index = this.find.apply(this, arguments);
        return index != -1 ? this.getAt(index) : null;
    },

    
    createFilterFn : function(property, value, anyMatch, caseSensitive, exactMatch) {
        if(Ext.isEmpty(value)){
            return false;
        }
        value = this.data.createValueMatcher(value, anyMatch, caseSensitive, exactMatch);
        return function(r) {
            return value.test(r.data[property]);
        };
    },

    
    findExact: function(property, value, start) {
        return this.data.findIndexBy(function(rec){
            return rec.get(property) === value;
        }, this, start);
    },

    
    findBy : function(fn, scope, start) {
        return this.data.findIndexBy(fn, scope, start);
    },

    
    collect : function(dataIndex, allowNull, bypassFilter) {
        var values  = [],
            uniques = {},
            length, value, strValue, data, i;

        if (bypassFilter === true && this.snapshot) {
            data = this.snapshot.items;
        } else {
            data = this.data.items;
        }

        length = data.length;

        for (i = 0; i < length; i++) {
            value = data[i].data[dataIndex];
            strValue = String(value);

            if ((allowNull || !Ext.isEmpty(value)) && !uniques[strValue]) {
                uniques[strValue] = true;
                values[values.length] = value;
            }
        }

        return values;
    },

    
    sum : function(property, start, end) {
        var records = this.data.items,
            value   = 0,
            i;

        start = start || 0;
        end   = (end || end === 0) ? end : records.length - 1;

        for (i = start; i <= end; i++) {
            value += (records[i].data[property] || 0);
        }

        return value;
    },

    
    getCount : function() {
        return this.data.length || 0;
    },

    
    getAt : function(index) {
        return this.data.getAt(index);
    },

    
    getRange : function(start, end) {
        return this.data.getRange(start, end);
    },

    
    getById : function(id) {
        return (this.snapshot || this.data).findBy(function(record) {
            return record.getId() === id;
        });
    },

    
    indexOf : function(record) {
        return this.data.indexOf(record);
    },

    
    indexOfId : function(id) {
        return this.data.indexOfKey(id);
    },

    removeAll: function(silent) {
        var items = [];
        this.each(function(rec){
            items.push(rec);
        });
        this.clearData();
        if(this.snapshot){
            this.snapshot.clear();
        }
        
        
        
        if (silent !== true) {
            this.fireEvent('clear', this, items);
        }
    }
});


Ext.data.TreeStore = Ext.extend(Ext.data.AbstractStore, {
    
    clearOnLoad : true,

    
    nodeParam: 'node',

    
    defaultRootId: 'root',

    constructor: function(config) {
        config = config || {};
        var rootCfg = config.root || {};
        rootCfg.id = rootCfg.id || this.defaultRootId;

        
        var rootNode = new Ext.data.RecordNode(rootCfg);
        this.tree = new Ext.data.Tree(rootNode);
        this.tree.treeStore = this;

        Ext.data.TreeStore.superclass.constructor.call(this, config);
        

        if (config.root) {
            this.read({
                node: rootNode,
                doPreload: true
            });
        }
    },


    
    getRootNode: function() {
        return this.tree.getRootNode();
    },

    
    getNodeById: function(id) {
        return this.tree.getNodeById(id);
    },


    
    
    
    load: function(options) {
        options = options || {};
        options.params = options.params || {};

        var node = options.node || this.tree.getRootNode(),
            records,
            record,
            reader = this.proxy.reader,
            root;

        if (this.clearOnLoad) {
            while (node.firstChild){
                node.removeChild(node.firstChild);
            }
        }

        if (!options.doPreload) {
            Ext.applyIf(options, {
                node: node
            });
            record = node.getRecord();
            options.params[this.nodeParam] = record ? record.getId() : 'root';

            return Ext.data.TreeStore.superclass.load.call(this, options);
        } else {
            root = reader.getRoot(node.isRoot ? node.attributes : node.getRecord().raw);
            records = reader.extractData(root, true);
            this.fillNode(node, records);
            return true;
        }
    },

    
    
    fillNode: function(node, records) {
        node.loaded = true;
        var ln = records.length,
            recordNode,
            i = 0,
            raw,
            subStore = node.subStore;

        for (; i < ln; i++) {
            raw = records[i].raw;
            records[i].data.leaf = raw.leaf;
            recordNode = new Ext.data.RecordNode({
                id: records[i].getId(),
                leaf: raw.leaf,
                record: records[i],
                expanded: raw.expanded
            });
            node.appendChild(recordNode);
            if (records[i].doPreload) {
                this.load({
                    node: recordNode,
                    doPreload: true
                });
            }
        }

        
        if (subStore) {
            if (this.clearOnLoad) {
                subStore.removeAll();
            }
            subStore.add.apply(subStore, records);
        }
    },


    onProxyLoad: function(operation) {
        var records = operation.getRecords();

        this.fillNode(operation.node, records);

        this.fireEvent('read', this, operation.node, records, operation.wasSuccessful());
        
        var callback = operation.callback;
        if (typeof callback == 'function') {
            callback.call(operation.scope || this, records, operation, operation.wasSuccessful());
        }
    },


    
    getSubStore: function(node) {
        
        if (node && node.node) {
            node = node.node;
        }
        return node.getSubStore();
    },


    removeAll: function() {
        var rootNode = this.getRootNode();
        rootNode.destroy();
    }
});


Ext.StoreMgr = Ext.apply(new Ext.util.MixedCollection(), {
    

    
    register : function() {
        for (var i = 0, s; (s = arguments[i]); i++) {
            this.add(s);
        }
    },

    
    unregister : function() {
        for (var i = 0, s; (s = arguments[i]); i++) {
            this.remove(this.lookup(s));
        }
    },

    
    lookup : function(id) {
        if (Ext.isArray(id)) {
            var fields = ['field1'], expand = !Ext.isArray(id[0]);
            if(!expand){
                for(var i = 2, len = id[0].length; i <= len; ++i){
                    fields.push('field' + i);
                }
            }
            return new Ext.data.ArrayStore({
                data  : id,
                fields: fields,
                expandData : expand,
                autoDestroy: true,
                autoCreated: true
            });
        }
        return Ext.isObject(id) ? (id.events ? id : Ext.create(id, 'store')) : this.get(id);
    },

    
    getKey : function(o) {
         return o.storeId;
    }
});


Ext.regStore = function(name, config) {
    var store;

    if (Ext.isObject(name)) {
        config = name;
    } else {
        config.storeId = name;
    }

    if (config instanceof Ext.data.Store) {
        store = config;
    } else {
        store = new Ext.data.Store(config);
    }

    return Ext.StoreMgr.register(store);
};


Ext.getStore = function(name) {
    return Ext.StoreMgr.lookup(name);
};


Ext.data.WriterMgr = new Ext.AbstractManager({
    
});

Ext.data.Tree = Ext.extend(Ext.util.Observable, {
    
    constructor: function(root) {
        this.nodeHash = {};
        
        
        this.root = null;
        
        if (root) {
            this.setRootNode(root);
        }
        
        this.addEvents(
            
            "append",
            
            
            "remove",
            
            
            "move",
            
            
            "insert",
            
            
            "beforeappend",
            
            
            "beforeremove",
            
            
            "beforemove",
            
            
            "beforeinsert"
        );
        
        Ext.data.Tree.superclass.constructor.call(this);        
    },
    
    
    pathSeparator: "/",

    
    proxyNodeEvent : function(){
        return this.fireEvent.apply(this, arguments);
    },

    
    getRootNode : function() {
        return this.root;
    },

    
    setRootNode : function(node) {
        this.root = node;
        node.ownerTree = this;
        node.isRoot = true;
        this.registerNode(node);
        return node;
    },

    
    getNodeById : function(id) {
        return this.nodeHash[id];
    },

    
    registerNode : function(node) {
        this.nodeHash[node.id] = node;
    },

    
    unregisterNode : function(node) {
        delete this.nodeHash[node.id];
    },

    toString : function() {
        return "[Tree"+(this.id?" "+this.id:"")+"]";
    }
});


Ext.data.Node = Ext.extend(Ext.util.Observable, {

    constructor: function(attributes) {
        
        this.attributes = attributes || {};

        this.leaf = !!this.attributes.leaf;

        
        this.id = this.attributes.id;

        if (!this.id) {
            this.id = Ext.id(null, "xnode-");
            this.attributes.id = this.id;
        }
        
        this.childNodes = [];

        
        this.parentNode = null;

        
        this.firstChild = null;

        
        this.lastChild = null;

        
        this.previousSibling = null;

        
        this.nextSibling = null;

        this.addEvents({
            
            "append" : true,

            
            "remove" : true,

            
            "move" : true,

            
            "insert" : true,

            
            "beforeappend" : true,

            
            "beforeremove" : true,

            
            "beforemove" : true,

             
            "beforeinsert" : true
        });

        this.listeners = this.attributes.listeners;
        Ext.data.Node.superclass.constructor.call(this);
    },

    
    fireEvent : function(evtName) {
        
        if (Ext.data.Node.superclass.fireEvent.apply(this, arguments) === false) {
            return false;
        }

        
        var ot = this.getOwnerTree();
        if (ot) {
            if (ot.proxyNodeEvent.apply(ot, arguments) === false) {
                return false;
            }
        }
        return true;
    },
    
    
    isLeaf : function() {
        return this.leaf === true;
    },

    
    setFirstChild : function(node) {
        this.firstChild = node;
    },

    
    setLastChild : function(node) {
        this.lastChild = node;
    },


    
    isLast : function() {
       return (!this.parentNode ? true : this.parentNode.lastChild == this);
    },

    
    isFirst : function() {
       return (!this.parentNode ? true : this.parentNode.firstChild == this);
    },

    
    hasChildNodes : function() {
        return !this.isLeaf() && this.childNodes.length > 0;
    },

    
    isExpandable : function() {
        return this.attributes.expandable || this.hasChildNodes();
    },

    
    appendChild : function(node) {
        var multi = false,
            i, len;

        if (Ext.isArray(node)) {
            multi = node;
        } else if (arguments.length > 1) {
            multi = arguments;
        }

        
        if (multi) {
            len = multi.length;

            for (i = 0; i < len; i++) {
                this.appendChild(multi[i]);
            }
        } else {
            if (this.fireEvent("beforeappend", this.ownerTree, this, node) === false) {
                return false;
            }

            var index = this.childNodes.length;
            var oldParent = node.parentNode;

            
            if (oldParent) {
                if (node.fireEvent("beforemove", node.getOwnerTree(), node, oldParent, this, index) === false) {
                    return false;
                }
                oldParent.removeChild(node);
            }

            index = this.childNodes.length;
            if (index === 0) {
                this.setFirstChild(node);
            }

            this.childNodes.push(node);
            node.parentNode = this;
            var ps = this.childNodes[index-1];
            if (ps) {
                node.previousSibling = ps;
                ps.nextSibling = node;
            } else {
                node.previousSibling = null;
            }

            node.nextSibling = null;
            this.setLastChild(node);
            node.setOwnerTree(this.getOwnerTree());
            this.fireEvent("append", this.ownerTree, this, node, index);

            if (oldParent) {
                node.fireEvent("move", this.ownerTree, node, oldParent, this, index);
            }

            return node;
        }
    },

    
    removeChild : function(node, destroy) {
        var index = this.indexOf(node);

        if (index == -1) {
            return false;
        }
        if (this.fireEvent("beforeremove", this.ownerTree, this, node) === false) {
            return false;
        }

        
        this.childNodes.splice(index, 1);

        
        if (node.previousSibling) {
            node.previousSibling.nextSibling = node.nextSibling;
        }
        if (node.nextSibling) {
            node.nextSibling.previousSibling = node.previousSibling;
        }

        
        if (this.firstChild == node) {
            this.setFirstChild(node.nextSibling);
        }
        if (this.lastChild == node) {
            this.setLastChild(node.previousSibling);
        }

        this.fireEvent("remove", this.ownerTree, this, node);
        if (destroy) {
            node.destroy(true);
        } else {
            node.clear();
        }

        return node;
    },

    
    clear : function(destroy) {
        
        this.setOwnerTree(null, destroy);
        this.parentNode = this.previousSibling = this.nextSibling = null;
        if (destroy) {
            this.firstChild = this.lastChild = null;
        }
    },

    
    destroy : function(silent) {
        
        if (silent === true) {
            this.clearListeners();
            this.clear(true);
            Ext.each(this.childNodes, function(n) {
                n.destroy(true);
            });
            this.childNodes = null;
        } else {
            this.remove(true);
        }
    },

    
    insertBefore : function(node, refNode) {
        if (!refNode) { 
            return this.appendChild(node);
        }
        
        if (node == refNode) {
            return false;
        }

        if (this.fireEvent("beforeinsert", this.ownerTree, this, node, refNode) === false) {
            return false;
        }

        var index     = this.indexOf(refNode),
            oldParent = node.parentNode,
            refIndex  = index;

        
        if (oldParent == this && this.indexOf(node) < index) {
            refIndex--;
        }

        
        if (oldParent) {
            if (node.fireEvent("beforemove", node.getOwnerTree(), node, oldParent, this, index, refNode) === false) {
                return false;
            }
            oldParent.removeChild(node);
        }

        if (refIndex === 0) {
            this.setFirstChild(node);
        }

        this.childNodes.splice(refIndex, 0, node);
        node.parentNode = this;

        var ps = this.childNodes[refIndex-1];

        if (ps) {
            node.previousSibling = ps;
            ps.nextSibling = node;
        } else {
            node.previousSibling = null;
        }

        node.nextSibling = refNode;
        refNode.previousSibling = node;
        node.setOwnerTree(this.getOwnerTree());
        this.fireEvent("insert", this.ownerTree, this, node, refNode);

        if (oldParent) {
            node.fireEvent("move", this.ownerTree, node, oldParent, this, refIndex, refNode);
        }
        return node;
    },

    
    remove : function(destroy) {
        var parentNode = this.parentNode;

        if (parentNode) {
            parentNode.removeChild(this, destroy);
        }
        return this;
    },

    
    removeAll : function(destroy) {
        var cn = this.childNodes,
            n;

        while ((n = cn[0])) {
            this.removeChild(n, destroy);
        }
        return this;
    },

    
    getChildAt : function(index) {
        return this.childNodes[index];
    },

    
    replaceChild : function(newChild, oldChild) {
        var s = oldChild ? oldChild.nextSibling : null;

        this.removeChild(oldChild);
        this.insertBefore(newChild, s);
        return oldChild;
    },

    
    indexOf : function(child) {
        return this.childNodes.indexOf(child);
    },

    
    getOwnerTree : function() {
        
        if (!this.ownerTree) {
            var p = this;

            while (p) {
                if (p.ownerTree) {
                    this.ownerTree = p.ownerTree;
                    break;
                }
                p = p.parentNode;
            }
        }

        return this.ownerTree;
    },

    
    getDepth : function() {
        var depth = 0,
            p     = this;

        while (p.parentNode) {
            ++depth;
            p = p.parentNode;
        }

        return depth;
    },

    
    setOwnerTree : function(tree, destroy) {
        
        if (tree != this.ownerTree) {
            if (this.ownerTree) {
                this.ownerTree.unregisterNode(this);
            }
            this.ownerTree = tree;

            
            if (destroy !== true) {
                Ext.each(this.childNodes, function(n) {
                    n.setOwnerTree(tree);
                });
            }
            if (tree) {
                tree.registerNode(this);
            }
        }
    },

    
    setId: function(id) {
        if (id !== this.id) {
            var t = this.ownerTree;
            if (t) {
                t.unregisterNode(this);
            }
            this.id = this.attributes.id = id;
            if (t) {
                t.registerNode(this);
            }
            this.onIdChange(id);
        }
    },

    
    onIdChange: Ext.emptyFn,

    
    getPath : function(attr) {
        attr = attr || "id";
        var p = this.parentNode,
            b = [this.attributes[attr]];

        while (p) {
            b.unshift(p.attributes[attr]);
            p = p.parentNode;
        }

        var sep = this.getOwnerTree().pathSeparator;
        return sep + b.join(sep);
    },

    
    bubble : function(fn, scope, args) {
        var p = this;
        while (p) {
            if (fn.apply(scope || p, args || [p]) === false) {
                break;
            }
            p = p.parentNode;
        }
    },
    

    
    cascadeBy : function(fn, scope, args) {
        if (fn.apply(scope || this, args || [this]) !== false) {
            var childNodes = this.childNodes,
                length     = childNodes.length,
                i;

            for (i = 0; i < length; i++) {
                childNodes[i].cascadeBy(fn, scope, args);
            }
        }
    },

    
    eachChild : function(fn, scope, args) {
        var childNodes = this.childNodes,
            length     = childNodes.length,
            i;

        for (i = 0; i < length; i++) {
            if (fn.apply(scope || this, args || [childNodes[i]]) === false) {
                break;
            }
        }
    },

    
    findChild : function(attribute, value, deep) {
        return this.findChildBy(function(){
            return this.attributes[attribute] == value;
        }, null, deep);
    },

    
    findChildBy : function(fn, scope, deep) {
        var cs = this.childNodes,
            len = cs.length,
            i = 0,
            n,
            res;

        for(; i < len; i++){
            n = cs[i];
            if(fn.call(scope || n, n) === true){
                return n;
            }else if (deep){
                res = n.findChildBy(fn, scope, deep);
                if(res != null){
                    return res;
                }
            }

        }

        return null;
    },

    
    sort : function(fn, scope) {
        var cs  = this.childNodes,
            len = cs.length,
            i, n;

        if (len > 0) {
            var sortFn = scope ? function(){return fn.apply(scope, arguments);} : fn;
            cs.sort(sortFn);
            for (i = 0; i < len; i++) {
                n = cs[i];
                n.previousSibling = cs[i-1];
                n.nextSibling = cs[i+1];

                if (i === 0){
                    this.setFirstChild(n);
                }
                if (i == len - 1) {
                    this.setLastChild(n);
                }
            }
        }
    },

    
    contains : function(node) {
        return node.isAncestor(this);
    },

    
    isAncestor : function(node) {
        var p = this.parentNode;
        while (p) {
            if (p == node) {
                return true;
            }
            p = p.parentNode;
        }
        return false;
    },

    toString : function() {
        return "[Node" + (this.id ? " " + this.id : "") + "]";
    }
});


Ext.data.RecordNode = Ext.extend(Ext.data.Node, {
    constructor: function(config) {
        config = config || {};
        if (config.record) {
            
            config.record.node = this;
        }
        Ext.data.RecordNode.superclass.constructor.call(this, config);
    },

    getChildRecords: function() {
        var cn = this.childNodes,
            ln = cn.length,
            i = 0,
            rs = [],
            r;

        for (; i < ln; i++) {
            r = cn[i].attributes.record;
            
            
            
            
            r.data.leaf = cn[i].leaf;
            rs.push(r);
        }
        return rs;
    },

    getRecord: function() {
        return this.attributes.record;
    },


    getSubStore: function() {

        
        if (this.isLeaf()) {
            throw "Attempted to get a substore of a leaf node.";
        }
        

        var treeStore = this.getOwnerTree().treeStore;
        if (!this.subStore) {
            this.subStore = new Ext.data.Store({
                model: treeStore.model
            });
            
            
            
            var children = this.getChildRecords();
            this.subStore.add.apply(this.subStore, children);
        }

        if (!this.loaded) {
            treeStore.load({
                node: this
            });
        }
        return this.subStore;
    },

    destroy : function(silent) {
        if (this.subStore) {
            this.subStore.destroyStore();
        }
        var attr = this.attributes;
        if (attr.record) {
            delete attr.record.node;
            delete attr.record;
        }

        return Ext.data.RecordNode.superclass.destroy.call(this, silent);
    }
});

Ext.data.Proxy = Ext.extend(Ext.util.Observable, {
    
    batchOrder: 'create,update,destroy',
    
    
    defaultReaderType: 'json',
    
    
    defaultWriterType: 'json',
    
    
    
    constructor: function(config) {
        config = config || {};
        
        if (config.model == undefined) {
            delete config.model;
        }

        Ext.data.Proxy.superclass.constructor.call(this, config);
        
        if (this.model != undefined && !(this.model instanceof Ext.data.Model)) {
            this.setModel(this.model);
        }
    },
    
    
    setModel: function(model, setOnStore) {
        this.model = Ext.ModelMgr.getModel(model);
        
        var reader = this.reader,
            writer = this.writer;
        
        this.setReader(reader);
        this.setWriter(writer);
        
        if (setOnStore && this.store) {
            this.store.setModel(this.model);
        }
    },
    
    
    getModel: function() {
        return this.model;
    },
    
    
    setReader: function(reader) {
        if (reader == undefined || typeof reader == 'string') {
            reader = {
                type: reader
            };
        }

        if (reader instanceof Ext.data.Reader) {
            reader.setModel(this.model);
        } else {
            Ext.applyIf(reader, {
                proxy: this,
                model: this.model,
                type : this.defaultReaderType
            });

            reader = Ext.data.ReaderMgr.create(reader);
        }
        
        this.reader = reader;
        
        return this.reader;
    },
    
    
    getReader: function() {
        return this.reader;
    },
    
    
    setWriter: function(writer) {
        if (writer == undefined || typeof writer == 'string') {
            writer = {
                type: writer
            };
        }

        if (!(writer instanceof Ext.data.Writer)) {
            Ext.applyIf(writer, {
                model: this.model,
                type : this.defaultWriterType
            });

            writer = Ext.data.WriterMgr.create(writer);
        }
        
        this.writer = writer;
        
        return this.writer;
    },
    
    
    getWriter: function() {
        return this.writer;
    },
    
    
    create: Ext.emptyFn,
    
    
    read: Ext.emptyFn,
    
    
    update: Ext.emptyFn,
    
    
    destroy: Ext.emptyFn,
    
    
    batch: function(operations, listeners) {
        var batch = new Ext.data.Batch({
            proxy: this,
            listeners: listeners || {}
        });
        
        Ext.each(this.batchOrder.split(','), function(action) {
            if (operations[action]) {
                batch.add(new Ext.data.Operation({
                    action : action, 
                    records: operations[action]
                }));
            }
        }, this);
        
        batch.start();
        
        return batch;
    }
});


Ext.data.DataProxy = Ext.data.Proxy;

Ext.data.ProxyMgr.registerType('proxy', Ext.data.Proxy);

Ext.data.ServerProxy = Ext.extend(Ext.data.Proxy, {
    
    
    
    
    
    
    
    pageParam: 'page',
    
    
    startParam: 'start',

    
    limitParam: 'limit',
    
    
    groupParam: 'group',
    
    
    sortParam: 'sort',
    
    
    filterParam: 'filter',
    
    
    noCache : true,
    
    
    cacheString: "_dc",
    
    
    timeout : 30000,
    
    
    constructor: function(config) {
        config = config || {};
        
        Ext.data.ServerProxy.superclass.constructor.call(this, config);
        
        
        this.extraParams = config.extraParams || {};
        
        
        this.nocache = this.noCache;
    },
    
    
    create: function() {
        return this.doRequest.apply(this, arguments);
    },
    
    read: function() {
        return this.doRequest.apply(this, arguments);
    },
    
    update: function() {
        return this.doRequest.apply(this, arguments);
    },
    
    destroy: function() {
        return this.doRequest.apply(this, arguments);
    },
    
    
    buildRequest: function(operation) {
        var params = Ext.applyIf(operation.params || {}, this.extraParams || {});
        
        
        params = Ext.applyIf(params, this.getParams(params, operation));
        
        var request = new Ext.data.Request({
            params   : params,
            action   : operation.action,
            records  : operation.records,
            operation: operation
        });
        
        request.url = this.buildUrl(request);
        
        
        operation.request = request;
        
        return request;
    },
    
    
    encodeSorters: function(sorters) {
        var min = [],
            length = sorters.length,
            i;
        
        for (i = 0; i < length; i++) {
            min[i] = {
                property : sorters[i].property,
                direction: sorters[i].direction
            };
        }
        
        return Ext.encode(min);
    },
    
    
    encodeFilters: function(filters) {
        var min = [],
            length = filters.length,
            i;
        
        for (i = 0; i < length; i++) {
            min[i] = {
                property: filters[i].property,
                value   : filters[i].value
            };
        }
        
        return Ext.encode(min);
    },
    
    
    encodeGroupers: function(group) {
        return Ext.encode(group);
    },
    
    
    getParams: function(params, operation) {
        params = params || {};
        
        var group       = operation.group,
            sorters     = operation.sorters,
            filters     = operation.filters,
            page        = operation.page,
            start       = operation.start,
            limit       = operation.limit,
            
            pageParam   = this.pageParam,
            startParam  = this.startParam,
            limitParam  = this.limitParam,
            groupParam  = this.groupParam,
            sortParam   = this.sortParam,
            filterParam = this.filterParam;
        
        if (pageParam && page) {
            params[pageParam] = page;
        }
        
        if (startParam && start) {
            params[startParam] = start;
        }
        
        if (limitParam && limit) {
            params[limitParam] = limit;
        }
        
        if (groupParam && group && group.field) {
            params[groupParam] = this.encodeGroupers(group);
        }
        
        if (sortParam && sorters && sorters.length > 0) {
            params[sortParam] = this.encodeSorters(sorters);
        }
        
        if (filterParam && filters && filters.length > 0) {
            params[filterParam] = this.encodeFilters(filters);
        }
        
        return params;
    },
    
    
    buildUrl: function(request) {
        var url = request.url || this.url;
        
        if (!url) {
            throw new Error("You are using a ServerProxy but have not supplied it with a url.");
        }
        
        if (this.noCache) {
            url = Ext.urlAppend(url, Ext.util.Format.format("{0}={1}", this.cacheString, (new Date().getTime())));
        }
        
        return url;
    },
    
    
    doRequest: function(operation, callback, scope) {
        throw new Error("The doRequest function has not been implemented on your Ext.data.ServerProxy subclass. See src/data/ServerProxy.js for details");
    },
    
    
    afterRequest: Ext.emptyFn,
    
    onDestroy: function() {
        Ext.destroy(this.reader, this.writer);
        
        Ext.data.ServerProxy.superclass.destroy.apply(this, arguments);
    }
});

Ext.data.AjaxProxy = Ext.extend(Ext.data.ServerProxy, {
    
    actionMethods: {
        create : 'POST',
        read   : 'GET',
        update : 'POST',
        destroy: 'POST'
    },
    
    
    
    constructor: function() {
        this.addEvents(
            
            'exception'
        );
        
        Ext.data.AjaxProxy.superclass.constructor.apply(this, arguments);    
    },
    
    
    doRequest: function(operation, callback, scope) {
        var writer  = this.getWriter(),
            request = this.buildRequest(operation, callback, scope);
            
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        
        Ext.apply(request, {
            headers       : this.headers,
            timeout       : this.timeout,
            scope         : this,
            callback      : this.createRequestCallback(request, operation, callback, scope),
            method        : this.getMethod(request),
            disableCaching: false 
        });
        
        Ext.Ajax.request(request);
        
        return request;
    },
    
    
    getMethod: function(request) {
        return this.actionMethods[request.action];
    },
    
    
    createRequestCallback: function(request, operation, callback, scope) {
        var me = this;
        
        return function(options, success, response) {
            if (success === true) {
                var reader  = me.getReader(),
                    result  = reader.read(response),
                    records = result.records,
                    length  = records.length,
                    mc      = new Ext.util.MixedCollection(true, function(r) {return r.getId();}),
                    record, i;
                
                mc.addAll(operation.records);
                for (i = 0; i < length; i++) {
                    record = mc.get(records[i].getId());
                    
                    if (record) {
                        record.set(record.data);
                    }
                }

                
                Ext.apply(operation, {
                    response : response,
                    resultSet: result
                });
                
                operation.setCompleted();
                operation.setSuccessful();
            } else {
                me.fireEvent('exception', this, response, operation);
                
                
                operation.setException();                
            }
            
            
            if (typeof callback == 'function') {
                callback.call(scope || me, operation);
            }
            
            me.afterRequest(request, true);
        };
    }
});

Ext.data.ProxyMgr.registerType('ajax', Ext.data.AjaxProxy);


Ext.data.HttpProxy = Ext.data.AjaxProxy;

Ext.data.RestProxy = Ext.extend(Ext.data.AjaxProxy, {
    
    appendId: true,
    
    
    
    
    actionMethods: {
        create : 'POST',
        read   : 'GET',
        update : 'PUT',
        destroy: 'DELETE'
    },
    
    api: {
        create : 'create',
        read   : 'read',
        update : 'update',
        destroy: 'destroy'
    },
    
    
    buildUrl: function(request) {
        var records = request.operation.records || [],
            record  = records[0],
            format  = this.format,
            url     = request.url || this.url;
        
        if (this.appendId && record) {
            if (!url.match(/\/$/)) {
                url += '/';
            }
            
            url += record.getId();
        }
        
        if (format) {
            if (!url.match(/\.$/)) {
                url += '.';
            }
            
            url += format;
        }
        
        request.url = url;
        
        return Ext.data.RestProxy.superclass.buildUrl.apply(this, arguments);
    }
});

Ext.data.ProxyMgr.registerType('rest', Ext.data.RestProxy);
Ext.apply(Ext, {
    
    getHead : function() {
        var head;
        
        return function() {
            if (head == undefined) {
                head = Ext.get(document.getElementsByTagName("head")[0]);
            }
            
            return head;
        };
    }()
});


Ext.data.ScriptTagProxy = Ext.extend(Ext.data.ServerProxy, {
    defaultWriterType: 'base',
    
    
    callbackParam : "callback",
    
    
    scriptIdPrefix: 'stcScript',
    
    
    callbackPrefix: 'stcCallback',
    
    
    recordParam: 'records',
    
    
    lastRequest: undefined,
    
    
    autoAppendParams: true,
    
    constructor: function(){
        this.addEvents(
            
            'exception'
        );
        
        Ext.data.ScriptTagProxy.superclass.constructor.apply(this, arguments);    
    },

    
    doRequest: function(operation, callback, scope) {
        
        var format     = Ext.util.Format.format,
            transId    = ++Ext.data.ScriptTagProxy.TRANS_ID,
            scriptId   = format("{0}{1}", this.scriptIdPrefix, transId),
            stCallback = format("{0}{1}", this.callbackPrefix, transId);
        
        var writer  = this.getWriter(),
            request = this.buildRequest(operation),
            
            url     = Ext.urlAppend(request.url, format("{0}={1}", this.callbackParam, stCallback));
            
        if (operation.allowWrite()) {
            request = writer.write(request);
        }
        
        
        Ext.apply(request, {
            url       : url,
            transId   : transId,
            scriptId  : scriptId,
            stCallback: stCallback
        });
        
        
        request.timeoutId = Ext.defer(this.createTimeoutHandler, this.timeout, this, [request, operation]);
        
        
        window[stCallback] = this.createRequestCallback(request, operation, callback, scope);
        
        
        var script = document.createElement("script");
        script.setAttribute("src", url);
        script.setAttribute("async", true);
        script.setAttribute("type", "text/javascript");
        script.setAttribute("id", scriptId);
        
        Ext.getHead().appendChild(script);
        operation.setStarted();
        
        this.lastRequest = request;
        
        return request;
    },
    
    
    createRequestCallback: function(request, operation, callback, scope) {
        var me = this;
        
        return function(response) {
            var reader = me.getReader(),
                result = reader.read(response);
            
            
            Ext.apply(operation, {
                response : response,
                resultSet: result
            });
            
            operation.setCompleted();
            operation.setSuccessful();
            
            
            if (typeof callback == 'function') {
                callback.call(scope || me, operation);
            }
            
            me.afterRequest(request, true);
        };
    },
    
    
    afterRequest: function() {
        var cleanup = function(functionName) {
            return function() {
                window[functionName] = undefined;
                
                try {
                    delete window[functionName];
                } catch(e) {}
            };
        };
        
        return function(request, isLoaded) {
            Ext.get(request.scriptId).remove();
            clearTimeout(request.timeoutId);
            
            var callbackName = request.stCallback;
            
            if (isLoaded) {
                cleanup(callbackName)();
                this.lastRequest.completed = true;
            } else {
                
                window[callbackName] = cleanup(callbackName);
            }
        };
    }(),
    
    
    buildUrl: function(request) {
        var url     = Ext.data.ScriptTagProxy.superclass.buildUrl.call(this, request),  
            params  = Ext.apply({}, request.params),
            filters = params.filters,
            filter, i;
            
        delete params.filters;
        
        if (this.autoAppendParams) {
            url = Ext.urlAppend(url, Ext.urlEncode(params));
        }
        
        if (filters && filters.length) {
            for (i = 0; i < filters.length; i++) {
                filter = filters[i];
                
                if (filter.value) {
                    url = Ext.urlAppend(url, filter.property + "=" + filter.value);
                }
            }
        }
        
        
        var records = request.records;
        
        if (Ext.isArray(records) && records.length > 0) {
            url = Ext.urlAppend(url, Ext.util.Format.format("{0}={1}", this.recordParam, this.encodeRecords(records)));
        }
        
        return url;
    },
    
    
    destroy: function() {
        this.abort();
        
        Ext.data.ScriptTagProxy.superclass.destroy.apply(this, arguments);
    },
        
    
    isLoading : function(){
        var lastRequest = this.lastRequest;
        
        return (lastRequest != undefined && !lastRequest.completed);
    },
    
    
    abort: function() {
        if (this.isLoading()) {
            this.afterRequest(this.lastRequest);
        }
    },
        
    
    encodeRecords: function(records) {
        var encoded = "";
        
        for (var i = 0, length = records.length; i < length; i++) {
            encoded += Ext.urlEncode(records[i].data);
        }
        
        return encoded;
    },
    
    
    createTimeoutHandler: function(request, operation) {
        this.afterRequest(request, false);

        this.fireEvent('exception', this, request, operation);
        
        if (typeof request.callback == 'function') {
            request.callback.call(request.scope || window, null, request.options, false);
        }        
    }
});

Ext.data.ScriptTagProxy.TRANS_ID = 1000;

Ext.data.ProxyMgr.registerType('scripttag', Ext.data.ScriptTagProxy);

Ext.data.ClientProxy = Ext.extend(Ext.data.Proxy, {
    
    clear: function() {
        throw new Error("The Ext.data.ClientProxy subclass that you are using has not defined a 'clear' function. See src/data/ClientProxy.js for details.");
    }
});

Ext.data.MemoryProxy = Ext.extend(Ext.data.ClientProxy, {
    
    
    constructor: function(config) {
        Ext.data.MemoryProxy.superclass.constructor.call(this, config);
        
        
        this.setReader(this.reader);
    },
    
    
    read: function(operation, callback, scope) {
        var reader = this.getReader(),
            result = reader.read(this.data);

        Ext.apply(operation, {
            resultSet: result
        });
        
        operation.setCompleted();
        
        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },
    
    clear: Ext.emptyFn
});

Ext.data.ProxyMgr.registerType('memory', Ext.data.MemoryProxy);

Ext.data.WebStorageProxy = Ext.extend(Ext.data.ClientProxy, {
    
    id: undefined,

    
    constructor: function(config) {
        Ext.data.WebStorageProxy.superclass.constructor.call(this, config);
        
        
        this.cache = {};

        if (this.getStorageObject() == undefined) {
            throw "Local Storage is not supported in this browser, please use another type of data proxy";
        }

        
        this.id = this.id || (this.store ? this.store.storeId : undefined);

        if (this.id == undefined) {
            throw "No unique id was provided to the local storage proxy. See Ext.data.LocalStorageProxy documentation for details";
        }

        this.initialize();
    },

    
    create: function(operation, callback, scope) {
        var records = operation.records,
            length  = records.length,
            ids     = this.getIds(),
            id, record, i;
        
        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];

            if (record.phantom) {
                record.phantom = false;
                id = this.getNextId();
            } else {
                id = record.getId();
            }

            this.setRecord(record, id);
            ids.push(id);
        }

        this.setIds(ids);

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    
    read: function(operation, callback, scope) {
        

        var records = [],
            ids     = this.getIds(),
            length  = ids.length,
            i, recordData, record;
        
        
        if (operation.id) {
            record = this.getRecord(operation.id);
            
            if (record) {
                records.push(record);
                operation.setSuccessful();
            }
        } else {
            for (i = 0; i < length; i++) {
                records.push(this.getRecord(ids[i]));
            }
            operation.setSuccessful();
        }
        
        operation.setCompleted();

        operation.resultSet = new Ext.data.ResultSet({
            records: records,
            total  : records.length,
            loaded : true
        });

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    
    update: function(operation, callback, scope) {
        var records = operation.records,
            length  = records.length,
            ids     = this.getIds(),
            record, id, i;

        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];
            this.setRecord(record);
            
            
            
            id = record.getId();
            if (id !== undefined && ids.indexOf(id) == -1) {
                ids.push(id);
            }
        }
        this.setIds(ids);

        operation.setCompleted();
        operation.setSuccessful();

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    
    destroy: function(operation, callback, scope) {
        var records = operation.records,
            length  = records.length,
            ids     = this.getIds(),

            
            newIds  = [].concat(ids),
            i;

        for (i = 0; i < length; i++) {
            newIds.remove(records[i].getId());
            this.removeRecord(records[i], false);
        }

        this.setIds(newIds);

        if (typeof callback == 'function') {
            callback.call(scope || this, operation);
        }
    },

    
    getRecord: function(id) {
        if (this.cache[id] == undefined) {
            var rawData = Ext.decode(this.getStorageObject().getItem(this.getRecordKey(id))),
                data    = {},
                Model   = this.model,
                fields  = Model.prototype.fields.items,
                length  = fields.length,
                i, field, name, record;

            for (i = 0; i < length; i++) {
                field = fields[i];
                name  = field.name;

                if (typeof field.decode == 'function') {
                    data[name] = field.decode(rawData[name]);
                } else {
                    data[name] = rawData[name];
                }
            }

            record = new Model(data, id);
            record.phantom = false;

            this.cache[id] = record;
        }
        
        return this.cache[id];
    },

    
    setRecord: function(record, id) {
        if (id) {
            record.setId(id);
        } else {
            id = record.getId();
        }

        var rawData = record.data,
            data    = {},
            model   = this.model,
            fields  = model.prototype.fields.items,
            length  = fields.length,
            i, field, name;

        for (i = 0; i < length; i++) {
            field = fields[i];
            name  = field.name;

            if (typeof field.encode == 'function') {
                data[name] = field.encode(rawData[name], record);
            } else {
                data[name] = rawData[name];
            }
        }

        var obj = this.getStorageObject(),
            key = this.getRecordKey(id);
        
        
        this.cache[id] = record;
        
        
        obj.removeItem(key);
        obj.setItem(key, Ext.encode(data));
    },

    
    removeRecord: function(id, updateIds) {
        if (id instanceof Ext.data.Model) {
            id = id.getId();
        }

        if (updateIds !== false) {
            var ids = this.getIds();
            ids.remove(id);
            this.setIds(ids);
        }

        this.getStorageObject().removeItem(this.getRecordKey(id));
    },

    
    getRecordKey: function(id) {
        if (id instanceof Ext.data.Model) {
            id = id.getId();
        }

        return Ext.util.Format.format("{0}-{1}", this.id, id);
    },

    
    getRecordCounterKey: function() {
        return Ext.util.Format.format("{0}-counter", this.id);
    },

    
    getIds: function() {
        var ids    = (this.getStorageObject().getItem(this.id) || "").split(","),
            length = ids.length,
            i;

        if (length == 1 && ids[0] == "") {
            ids = [];
        } else {
            for (i = 0; i < length; i++) {
                ids[i] = parseInt(ids[i], 10);
            }
        }

        return ids;
    },

    
    setIds: function(ids) {
        var obj = this.getStorageObject(),
            str = ids.join(",");
        
        obj.removeItem(this.id);
        
        if (!Ext.isEmpty(str)) {
            obj.setItem(this.id, str);
        }
    },

    
    getNextId: function() {
        var obj  = this.getStorageObject(),
            key  = this.getRecordCounterKey(),
            last = obj[key],
            ids, id;
        
        if (last == undefined) {
            ids = this.getIds();
            last = ids[ids.length - 1] || 0;
        }
        
        id = parseInt(last, 10) + 1;
        obj.setItem(key, id);
        
        return id;
    },

    
    initialize: function() {
        var storageObject = this.getStorageObject();
        storageObject.setItem(this.id, storageObject.getItem(this.id) || "");
    },

    
    clear: function() {
        var obj = this.getStorageObject(),
            ids = this.getIds(),
            len = ids.length,
            i;

        
        for (i = 0; i < len; i++) {
            this.removeRecord(ids[i]);
        }

        
        obj.removeItem(this.getRecordCounterKey());
        obj.removeItem(this.id);
    },

    
    getStorageObject: function() {
        throw new Error("The getStorageObject function has not been defined in your Ext.data.WebStorageProxy subclass");
    }
});

Ext.data.LocalStorageProxy = Ext.extend(Ext.data.WebStorageProxy, {
    
    getStorageObject: function() {
        return window.localStorage;
    }
});

Ext.data.ProxyMgr.registerType('localstorage', Ext.data.LocalStorageProxy);

Ext.data.SessionStorageProxy = Ext.extend(Ext.data.WebStorageProxy, {
    
    getStorageObject: function() {
        return window.sessionStorage;
    }
});

Ext.data.ProxyMgr.registerType('sessionstorage', Ext.data.SessionStorageProxy);

Ext.data.Reader = Ext.extend(Object, {
    
    idProperty: 'id',

    
    totalProperty: 'total',

    
    successProperty: 'success',

    
    root: '',
    
    
    implicitIncludes: true,
    
    
    nullResultSet: new Ext.data.ResultSet({
        total  : 0,
        count  : 0,
        records: [],
        success: true
    }),

    constructor: function(config) {
        Ext.apply(this, config || {});

        this.model = Ext.ModelMgr.getModel(config.model);
        if (this.model) {
            this.buildExtractors();
        }
    },

    
    setModel: function(model, setOnProxy) {
        this.model = Ext.ModelMgr.getModel(model);
        this.buildExtractors(true);
        
        if (setOnProxy && this.proxy) {
            this.proxy.setModel(this.model, true);
        }
    },

    
    read: function(response) {
        var data = response;
        
        if (response && response.responseText) {
            data = this.getResponseData(response);
        }
        
        if (data) {
            return this.readRecords(data);
        } else {
            return this.nullResultSet;
        }
    },

    
    readRecords: function(data) {
        
        this.rawData = data;

        data = this.getData(data);

        var root    = this.getRoot(data),
            total   = root.length,
            success = true,
            value, records, recordCount;

        if (this.totalProperty) {
            value = parseInt(this.getTotal(data), 10);
            if (!isNaN(value)) {
                total = value;
            }
        }

        if (this.successProperty) {
            value = this.getSuccess(data);
            if (value === false || value === 'false') {
                success = false;
            }
        }

        records = this.extractData(root, true);
        recordCount = records.length;

        return new Ext.data.ResultSet({
            total  : total || recordCount,
            count  : recordCount,
            records: records,
            success: success
        });
    },

    
    extractData : function(root, returnRecords) {
        var values  = [],
            records = [],
            Model   = this.model,
            length  = root.length,
            idProp  = this.idProperty,
            node, id, record, i;

        for (i = 0; i < length; i++) {
            node   = root[i];
            values = this.extractValues(node);
            id     = this.getId(node);

            if (returnRecords === true) {
                record = new Model(values, id);
                record.raw = node;
                records.push(record);
                
                if (this.implicitIncludes) {
                    this.readAssociated(record, node);
                }
            } else {
                values[idProp] = id;
                records.push(values);
            }
        }

        return records;
    },
    
    
    readAssociated: function(record, data) {
        var associations = record.associations.items,
            length       = associations.length,
            association, associationName, associatedModel, associationData, inverseAssociation, proxy, reader, store, i;
        
        for (i = 0; i < length; i++) {
            association     = associations[i];
            associationName = association.name;
            associationData = this.getAssociatedDataRoot(data, association.associationKey || associationName);
            associatedModel = association.associatedModel;
            
            if (associationData) {
                proxy = associatedModel.proxy;
                
                
                if (proxy) {
                    reader = proxy.getReader();
                } else {
                    reader = new this.constructor({
                        model: association.associatedName
                    });
                }
                
                if (association.type == 'hasMany') {
                    store = record[associationName]();
                    
                    store.add.apply(store, reader.read(associationData).records);
                    
                    
                    
                    inverseAssociation = associatedModel.prototype.associations.findBy(function(assoc) {
                        return assoc.type == 'belongsTo' && assoc.associatedName == record.constructor.modelName;
                    });
                    
                    
                    if (inverseAssociation) {
                        store.data.each(function(associatedRecord) {
                            associatedRecord[inverseAssociation.instanceName] = record;
                        });                        
                    }

                } else if (association.type == 'belongsTo') {
                    record[association.instanceName] = reader.read([associationData]).records[0];
                }
            }
        }
    },
    
    
    getAssociatedDataRoot: function(data, associationName) {
        return data[associationName];
    },

    
    extractValues: function(data) {
        var fields = this.model.prototype.fields.items,
            length = fields.length,
            output = {},
            field, value, i;

        for (i = 0; i < length; i++) {
            field = fields[i];
            value = this.extractorFunctions[i](data) || field.defaultValue;

            output[field.name] = value;
        }

        return output;
    },

    
    getData: function(data) {
        return data;
    },

    
    getRoot: function(data) {
        return data;
    },

    
    getResponseData: function(response) {
        throw new Error("getResponseData must be implemented in the Ext.data.Reader subclass");
    },

    
    onMetaChange : function(meta) {
        var fields = meta.fields,
            newModel;
        
        Ext.apply(this, meta);
        
        if (fields) {
            newModel = Ext.regModel("JsonReader-Model" + Ext.id(), {fields: fields});
            this.setModel(newModel, true);
        } else {
            this.buildExtractors(true);
        }
    },

    
    buildExtractors: function(force) {
        if (force === true) {
            delete this.extractorFunctions;
        }
        
        if (this.extractorFunctions) {
            return;
        }

        var idProp      = this.id || this.idProperty,
            totalProp   = this.totalProperty,
            successProp = this.successProperty,
            messageProp = this.messageProperty;

        
        if (totalProp) {
            this.getTotal = this.createAccessor(totalProp);
        }

        if (successProp) {
            this.getSuccess = this.createAccessor(successProp);
        }

        if (messageProp) {
            this.getMessage = this.createAccessor(messageProp);
        }

        if (idProp) {
            var accessor = this.createAccessor(idProp);

            this.getId = function(record) {
                var id = accessor(record);

                return (id == undefined || id == '') ? null : id;
            };
        } else {
            this.getId = function() {
                return null;
            };
        }
        this.buildFieldExtractors();
    },

    
    buildFieldExtractors: function() {
        
        var fields = this.model.prototype.fields.items,
            ln = fields.length,
            i  = 0,
            extractorFunctions = [],
            field, map;

        for (; i < ln; i++) {
            field = fields[i];
            map   = (field.mapping !== undefined && field.mapping !== null) ? field.mapping : field.name;

            extractorFunctions.push(this.createAccessor(map));
        }

        this.extractorFunctions = extractorFunctions;
    }
});

Ext.data.Writer = Ext.extend(Object, {

    constructor: function(config) {
        Ext.apply(this, config);
    },

    
    write: function(request) {
        var operation = request.operation,
            records   = operation.records || [],
            ln        = records.length,
            i         = 0,
            data      = [];

        for (; i < ln; i++) {
            data.push(this.getRecordData(records[i]));
        }
        return this.writeRecords(request, data);
    },

    
    getRecordData: function(record) {
        return record.data;
    }
});

Ext.data.WriterMgr.registerType('base', Ext.data.Writer);


Ext.data.JsonWriter = Ext.extend(Ext.data.Writer, {
    
    root: 'records',
    
    
    encode: false,
    
    
    writeRecords: function(request, data) {
        if (this.encode === true) {
            data = Ext.encode(data);
        }
        
        request.jsonData = request.jsonData || {};
        request.jsonData[this.root] = data;
        
        return request;
    }
});

Ext.data.WriterMgr.registerType('json', Ext.data.JsonWriter);


Ext.data.JsonReader = Ext.extend(Ext.data.Reader, {
    root: '',
    
    
    
    
    readRecords: function(data) {
        
        if (data.metaData) {
            this.onMetaChange(data.metaData);
        }

        
        this.jsonData = data;

        return Ext.data.JsonReader.superclass.readRecords.call(this, data);
    },

    
    getResponseData: function(response) {
        try {
            var data = Ext.decode(response.responseText);
        }
        catch (ex) {
            throw 'Ext.data.JsonReader.getResponseData: Unable to parse JSON returned by Server.';
        }

        if (!data) {
            throw 'Ext.data.JsonReader.getResponseData: JSON object not found';
        }

        return data;
    },

    
    buildExtractors : function() {
        Ext.data.JsonReader.superclass.buildExtractors.apply(this, arguments);

        if (this.root) {
            this.getRoot = this.createAccessor(this.root);
        } else {
            this.getRoot = function(root) {
                return root;
            };
        }
    },
    
    
    extractData: function(root, returnRecords) {
        var recordName = this.record,
            data = [],
            length, i;
        
        if (recordName) {
            length = root.length;
            
            for (i = 0; i < length; i++) {
                data[i] = root[i][recordName];
            }
        } else {
            data = root;
        }
        
        return Ext.data.JsonReader.superclass.extractData.call(this, data, returnRecords);
    },

    
    createAccessor: function() {
        var re = /[\[\.]/;

        return function(expr) {
            if (Ext.isEmpty(expr)) {
                return Ext.emptyFn;
            }
            if (Ext.isFunction(expr)) {
                return expr;
            }
            var i = String(expr).search(re);
            if (i >= 0) {
                return new Function('obj', 'return obj' + (i > 0 ? '.' : '') + expr);
            }
            return function(obj) {
                return obj[expr];
            };
        };
    }()
});

Ext.data.ReaderMgr.registerType('json', Ext.data.JsonReader);
Ext.data.TreeReader = Ext.extend(Ext.data.JsonReader, {
    extractData : function(root, returnRecords) {
        var records = Ext.data.TreeReader.superclass.extractData.call(this, root, returnRecords),
            ln = records.length,
            i  = 0,
            record;

        if (returnRecords) {
            for (; i < ln; i++) {
                record = records[i];
                record.doPreload = !!this.getRoot(record.raw);
            }
        }
        return records;
    }
});
Ext.data.ReaderMgr.registerType('tree', Ext.data.TreeReader);

Ext.data.ArrayReader = Ext.extend(Ext.data.JsonReader, {

    
    buildExtractors: function() {
        Ext.data.ArrayReader.superclass.buildExtractors.apply(this, arguments);
        
        var fields = this.model.prototype.fields.items,
            length = fields.length,
            extractorFunctions = [],
            i;
        
        for (i = 0; i < length; i++) {
            extractorFunctions.push(function(index) {
                return function(data) {
                    return data[index];
                };
            }(fields[i].mapping || i));
        }
        
        this.extractorFunctions = extractorFunctions;
    }
});

Ext.data.ReaderMgr.registerType('array', Ext.data.ArrayReader);


Ext.data.ArrayStore = Ext.extend(Ext.data.Store, {
    
    constructor: function(config) {
        config = config || {};

        Ext.applyIf(config, {
            proxy: {
                type: 'memory',
                reader: 'array'
            }
        });

        Ext.data.ArrayStore.superclass.constructor.call(this, config);
    },

    loadData: function(data, append) {
        if (this.expandData === true) {
            var r = [],
                i = 0,
                ln = data.length;

            for (; i < ln; i++) {
                r[r.length] = [data[i]];
            }
            
            data = r;
        }

        Ext.data.ArrayStore.superclass.loadData.call(this, data, append);
    }
});
Ext.reg('arraystore', Ext.data.ArrayStore);


Ext.data.SimpleStore = Ext.data.ArrayStore;
Ext.reg('simplestore', Ext.data.SimpleStore);

Ext.data.JsonStore = Ext.extend(Ext.data.Store, {
    
    constructor: function(config) {
        config = config || {};
              
        Ext.applyIf(config, {
            proxy: {
                type  : 'ajax',
                reader: 'json',
                writer: 'json'
            }
        });
        
        Ext.data.JsonStore.superclass.constructor.call(this, config);
    }
});

Ext.reg('jsonstore', Ext.data.JsonStore);

Ext.data.JsonPStore = Ext.extend(Ext.data.Store, {
    
    constructor: function(config) {
        Ext.data.JsonPStore.superclass.constructor.call(this, Ext.apply(config, {
            reader: new Ext.data.JsonReader(config),
            proxy : new Ext.data.ScriptTagProxy(config)
        }));
    }
});

Ext.reg('jsonpstore', Ext.data.JsonPStore);


Ext.data.XmlWriter = Ext.extend(Ext.data.Writer, {
    
    documentRoot: 'xmlData',

    
    header: '',

    
    record: 'record',

    
    writeRecords: function(request, data) {
        var tpl = this.buildTpl(request, data);

        request.xmlData = tpl.apply(data);

        return request;
    },

    buildTpl: function(request, data) {
        if (this.tpl) {
            return this.tpl;
        }

        var tpl = [],
            root = this.documentRoot,
            record = this.record,
            first,
            key;

        if (this.header) {
            tpl.push(this.header);
        }
        tpl.push('<', root, '>');
        if (data.length > 0) {
            tpl.push('<tpl for="."><', record, '>');
            first = data[0];
            for (key in first) {
                if (first.hasOwnProperty(key)) {
                    tpl.push('<', key, '>{', key, '}</', key, '>');
                }
            }
            tpl.push('</', record, '></tpl>');
        }
        tpl.push('</', root, '>');
        this.tpl = new Ext.XTemplate(tpl.join(''));
        return this.tpl;
    }
});

Ext.data.WriterMgr.registerType('xml', Ext.data.XmlWriter);

Ext.data.XmlReader = Ext.extend(Ext.data.Reader, {
    

    

    createAccessor: function() {
        var selectValue = function(key, root, defaultValue){
            var node = Ext.DomQuery.selectNode(key, root),
                val;
            if (node && node.firstChild) {
                val = node.firstChild.nodeValue;
            }
            return Ext.isEmpty(val) ? defaultValue : val;
        };

        return function(key) {
            var fn;

            if (key == this.totalProperty) {
                fn = function(root, defaultValue) {
                    var value = selectValue(key, root, defaultValue);
                    return parseFloat(value);
                };
            }

            else if (key == this.successProperty) {
                fn = function(root, defaultValue) {
                    var value = selectValue(key, root, true);
                    return (value !== false && value !== 'false');
                };
            }

            else {
                fn = function(root, defaultValue) {
                    return selectValue(key, root, defaultValue);
                };
            }

            return fn;
        };
    }(),

    
    getResponseData: function(response) {
        var xml = response.responseXML;

        if (!xml) {
            throw {message: 'Ext.data.XmlReader.read: XML data not found'};
        }

        return xml;
    },

    
    getData: function(data) {
        return data.documentElement || data;
    },

    
    getRoot: function(data) {
        var nodeName = data.nodeName,
            root     = this.root;
        
        if (!root || (nodeName && nodeName == root)) {
            return data;
        } else {
            return Ext.DomQuery.selectNode(root, data);
        }
    },


    


    

    

    

    
    constructor: function(config) {
        config = config || {};

        
        

        Ext.applyIf(config, {
            idProperty     : config.idPath || config.id,
            successProperty: config.success
        });
        
        Ext.data.XmlReader.superclass.constructor.call(this, config);
    },
    
    
    extractData: function(root, returnRecords) {
        var recordName = this.record;
        
        if (recordName != root.nodeName) {
            root = Ext.DomQuery.select(recordName, root);
        } else {
            root = [root];
        }
        
        return Ext.data.XmlReader.superclass.extractData.call(this, root, returnRecords);
    },
    
    
    getAssociatedDataRoot: function(data, associationName) {
        return Ext.DomQuery.select(associationName, data)[0];
    },

    
    readRecords: function(doc) {
        
        if (Ext.isArray(doc)) {
            doc = doc[0];
        }
        
        
        this.xmlData = doc;
        
        return Ext.data.XmlReader.superclass.readRecords.call(this, doc);
    }
});

Ext.data.ReaderMgr.registerType('xml', Ext.data.XmlReader);

Ext.data.XmlStore = Ext.extend(Ext.data.Store, {
    
    constructor: function(config){
        config = config || {};
        config = config || {};
              
        Ext.applyIf(config, {
            proxy: {
                type: 'ajax',
                reader: 'xml',
                writer: 'xml'
            }
        });
        Ext.data.XmlStore.superclass.constructor.call(this, config);
    }
});
Ext.reg('xmlstore', Ext.data.XmlStore);


Ext.History = new Ext.util.Observable({
    constructor: function() {
        Ext.History.superclass.constructor.call(this, config);
        
        this.addEvents(
            
            'change'
        );
    },
    
    
    init: function() {
        var me = this;
        
        me.setToken(window.location.hash);
        
        if (Ext.supports.History) {
            window.addEventListener('hashchange', this.onChange);
        } else {
            setInterval(function() {
                var newToken = me.cleanToken(window.location.hash),
                    oldToken = me.getToken();
                
                if (newToken != oldToken) {
                    me.onChange();
                }
            }, 50);
        }
    },
    
    
    onChange: function() {
        var me       = Ext.History,
            newToken = me.cleanToken(window.location.hash);
        
        if (me.token != newToken) {
            me.fireEvent('change', newToken);
        }
        
        me.setToken(newToken);
    },
    
    
    setToken: function(token) {
        return this.token = this.cleanToken(token);
    },
    
    
    cleanToken: function(token) {
        return token[0] == '#' ? token.substr(1) : token;
    },
    
    
    getToken: function() {
        return this.token;
    },
    
    
    add: function(token) {
        window.location.hash = this.setToken(token);
        
        if (!Ext.supports.History) {
            this.onChange();
        }
    }
});

Ext.ControllerManager = new Ext.AbstractManager({
    register: function(id, options) {
        options.id = id;
        
        Ext.applyIf(options, {
            application: Ext.ApplicationManager.currentApplication
        });
        
        var controller = new Ext.Controller(options);
        
        if (controller.init) {
            controller.init();
        }
        
        this.all.add(controller);
        
        return controller;
    }
});


Ext.regController = function() {
    return Ext.ControllerManager.register.apply(Ext.ControllerManager, arguments);
};

Ext.Controller = Ext.extend(Ext.util.Observable, {
    constructor: function(config) {
        this.addEvents(
            
            'instance-created',
            
            
            'instance-creation-failed',
            
            
            'instance-updated',
            
            
            'instance-update-failed',
            
            
            'instance-destroyed',
            
            
            'instance-destruction-failed'
        );
        
        Ext.Controller.superclass.constructor.call(this, config);
        
        Ext.apply(this, config || {});
        
        if (typeof this.model == 'string') {
            this.model = Ext.ModelMgr.getModel(this.model);
        }
    },
    
    index: function() {
        this.render('index', {
            listeners: {
                scope  : this,
                edit   : this.edit,
                build  : this.build,
                create : this.onCreateInstance,
                destroy: this.onDestroyInstance
            }
        });
    },
    
    
    edit: function(instance) {
        var view = this.render('edit', {
            listeners: this.getEditListeners()
        });
        
        view.loadModel(instance);
    },
    
    
    build: function() {
        this.render('build', {
            listeners: this.getBuildListeners()
        });
    },
    
    
    create: function(data, options) {
        options = options || {};
        
        var model     = this.getModel(),
            instance  = new model(data),
            successCb = options.success,
            failureCb = options.failure,
            scope     = options.scope || this;
        
        instance.save({
            scope  : this,
            success: function(instance) {
                if (typeof successCb == 'function') {
                    successCb.call(scope, instance);
                }
                
                this.fireEvent('instance-created', instance);
            },
            failure: function(instance, errors) {                
                if (typeof failureCb == 'function') {
                    failureCb.call(scope, instance, errors);
                }
                
                this.fireEvent('instance-creation-failed', instance, errors);
            }
        });
    },
    
    
    update: function(instance, updates, options) {
        options = options || {};
        
        var successCb = options.success,
            failureCb = options.failure,
            scope     = options.scope || this;
        
        if (Ext.isObject(updates)) {
            instance.set(updates);
        }
        
        instance.save({
            scope  : this,
            success: function(instance) {
                if (typeof successCb == 'function') {
                    successCb.call(scope, instance);
                }
                
                this.fireEvent('instance-updated', instance);
            },
            failure: function(instance, errors) {
                if (typeof failureCb == 'function') {
                    failureCb.call(scope, instance, errors);
                }
                
                this.fireEvent('instance-update-failed', instance, errors);
            }
        });
    },
    
    
    destroy: function(instance, options) {
        options = options || {};
        
        var successCb = options.success,
            failureCb = options.failure,
            scope     = options.scope || this;
        
        instance.destroy({
            scope  : this,
            success: function(instance) {
                if (typeof successCb == 'function') {
                    successCb.call(scope, instance);
                }
                
                this.fireEvent('instance-destroyed', instance);
            },
            failure: function(instance, errors) {
                if (typeof failureCb == 'function') {
                    failureCb.call(scope, instance, errors);
                }
                
                this.fireEvent('instance-destruction-failed', instance, errors);
            }
        });
    },
    
    
    getBuildListeners: function() {
        return {
            scope : this,
            save  : this.onCreateInstance,
            cancel: this.onCancelBuild
        };
    },
    
    
    getEditListeners: function() {
        return {
            scope : this,
            save  : this.onUpdateInstance,
            cancel: this.onCancelEdit
        };
    },
    
    
    onCancelEdit: function(view) {
        return this.closeView(view);
    },
    
    
    onCancelBuild: function(view) {
        return this.closeView(view);
    },
    
    
    onCreateInstance: function(view) {
        this.create(view.getValues(), {
            scope  : this,
            success: function(instance) {
                this.closeView(view);
            },
            failure: function(instance, errors) {
                console.log('fail');
            }
        });
    },
    
    
    onUpdateInstance: function(view) {
        this.update(view.getRecord(), view.getValues(), {
            scope  : this,
            success: function(instance) {
                this.closeView(view);
            },
            failure: function(instance, errors) {
                
            }
        });
    },
    
    
    onDestroyInstance: function(instance, view) {
        this.destroy(instance, {
            scope  : this,
            success: function(instance) {
                
            },
            failure: function(instance, errors) {
                
            }
        });
    },
    
    
    setRenderTarget: function(target) {
        
        Ext.Controller.renderTarget = target;
    },
    
    
    render: function(config, target) {
        var Controller  = Ext.Controller,
            application = this.application,
            profile     = application ? application.currentProfile : undefined,
            profileTarget, view;
        
        Ext.applyIf(config, {
            profile: profile
        });
        
        view = Ext.ComponentMgr.create(config);
        
        if (target !== false) {
            
            profileTarget = profile ? profile.getRenderTarget(config, application) : target;
            
            if (target == undefined) {
                target = profileTarget || (application ? application.defaultTarget : undefined);
            }

            if (typeof target == 'string') {
                target = Ext.getCmp(target);
            }

            if (target != undefined && target.add) {
                if (profile) {
                    profile.beforeLayout(view, target, application);
                }
                
                target.add(view);

                if (target.layout && target.layout.setActiveItem) {
                    target.layout.setActiveItem(view);
                }

                target.doComponentLayout();
                
                if (profile) {
                    profile.afterLayout(view, target, application);
                }
            }
        }
        
        return view;
    },
    
        
    control : function(view, actions, itemName) {
        if (!view || !view.isView) {
            throw 'Trying to control a view that doesnt exist';
        }

        var item = itemName ? view.refs[itemName] : view,
            key, value, name, child, listener;
    
        if (!item) {
            throw "No item called " + itemName + " found inside the " + view.name + " view.";
        }        
    	
        for (key in actions) {
            value = actions[key];
    	
            
            
            
            if (Ext.isObject(value) && !value.fn) {
                this.control(view, value, key);
            }
            else {
                
                
                if (item.refs) {
                    for (name in item.refs) {
                        child = item.refs[name];
                        if (child.isObservable && child.events[key]) {
                            child.enableBubble(key);
                        }
                    }
                }
    
                if (!value.fn) {
                    listener = {};
                    listener[key] = value;
                    listener.scope = this;
                }
                else {
                    listener = value;
                    if (listener.scope === undefined) {
                        listener.scope = this;
                    }
                }

                
                item.addListener(listener);
            }
        }

        return view;
    },
    
    
    getModel: function() {
        return Ext.ModelMgr.getModel(this.model);
    },
    
    
    closeView: function(view) {
        var ownerCt = view.ownerCt;
        
        if (ownerCt) {
            ownerCt.remove(view);
            ownerCt.doLayout();
            ownerCt.setActiveItem(ownerCt.items.last());
        }
    }
});

Ext.util.Dispatcher = Ext.extend(Ext.util.Observable, {
    
    constructor: function(config) {
        this.addEvents(
            
            'before-dispatch',
            
            
            'dispatch'
        );
        
        Ext.util.Dispatcher.superclass.constructor.call(this, config);
    },
    
    
    dispatch: function(options) {
        var interaction = new Ext.Interaction(options),
            controller  = interaction.controller,
            action      = interaction.action,
            History     = Ext.History;
        
        if (this.fireEvent('before-dispatch', interaction) !== false) {
            if (History && options.historyUrl) {
                History.suspendEvents(false);
                History.add(options.historyUrl);
                Ext.defer(History.resumeEvents, 100, History);
            }
            
            if (controller && action) {
                controller[action].call(controller, interaction);
                interaction.dispatched = true;
            }
            
            this.fireEvent('dispatch', interaction);
        }
    },
    
    
    redirect: function(options) {
        if (options instanceof Ext.data.Model) {
            
            
        } else if (typeof options == 'string') {
            
            var route = Ext.Router.recognize(options);
            
            if (route) {
                return this.dispatch(route);
            }
        }
        return null;
    },
    
    
    createRedirect: function(url) {
        return function() {
            Ext.Dispatcher.redirect(url);
        };
    }
});


Ext.Dispatcher = new Ext.util.Dispatcher();


Ext.dispatch = function() {
    return Ext.Dispatcher.dispatch.apply(Ext.Dispatcher, arguments);
};


Ext.redirect = function() {
    return Ext.Dispatcher.redirect.apply(Ext.Dispatcher, arguments);
};

Ext.createRedirect = Ext.Dispatcher.createRedirect;

Ext.util.Router = Ext.extend(Ext.util.Observable, {
    
    constructor: function(config) {
        config = config || {};

        Ext.apply(this, config, {
            defaults: {
                action: 'index'
            }
        });
        
        this.routes = [];

        Ext.util.Router.superclass.constructor.call(this, config);
    },
    
    
    connect: function(url, params) {
        params = Ext.apply({url: url}, params || {}, this.defaults);
        var route = new Ext.util.Route(params);
        
        this.routes.push(route);
        
        return route;
    },
    
    
    recognize: function(url) {
        var routes = this.routes,
            length = routes.length,
            i, result;
        
        for (i = 0; i < length; i++) {
            result = routes[i].recognize(url);
            
            if (result != undefined) {
                return result;
            }
        }
        return undefined;
    },
    
    
    draw: function(fn) {
        fn.call(this, this);
    }
});


Ext.Router = new Ext.util.Router();

Ext.util.Route = Ext.extend(Object, {
    
    
    constructor: function(config) {
        Ext.apply(this, config, {
            conditions: {}
        });
        
        
        this.paramMatchingRegex = new RegExp(/:([0-9A-Za-z\_]*)/g);
        
        
        this.paramsInMatchString = this.url.match(this.paramMatchingRegex) || [];
        
        this.matcherRegex = this.createMatcherRegex(this.url);
    },
    
    
    recognize: function(url) {
        if (this.recognizes(url)) {
            var matches = this.matchesFor(url);
            
            return Ext.applyIf(matches, {
                controller: this.controller,
                action    : this.action,
                historyUrl: url
            });
        }
    },
    
    
    recognizes: function(url) {
        return this.matcherRegex.test(url);
    },
    
    
    matchesFor: function(url) {
        var params = {},
            keys   = this.paramsInMatchString,
            values = url.match(this.matcherRegex),
            length = keys.length,
            i;
        
        
        values.shift();

        for (i = 0; i < length; i++) {
            params[keys[i].replace(":", "")] = values[i];
        }

        return params;
    },
    
    
    urlFor: function(config) {
        
    },
    
    
    createMatcherRegex: function(url) {
        
        var paramsInMatchString = this.paramsInMatchString,
            length = paramsInMatchString.length,
            i, cond, matcher;
        
        for (i = 0; i < length; i++) {
            cond    = this.conditions[paramsInMatchString[i]];
            matcher = Ext.util.Format.format("({0})", cond || "[%a-zA-Z0-9\\_\\s,]+");

            url = url.replace(new RegExp(paramsInMatchString[i]), matcher);
        }

        
        return new RegExp("^" + url + "$");
    }
});

Ext.Interaction = Ext.extend(Ext.util.Observable, {
    
    controller: '',
    
    
    action: '',
    
    
    
    
    
    
    dispatched: false,
    
    constructor: function(config) {
        Ext.Interaction.superclass.constructor.apply(this, arguments);
        
        config = config || {};
              
        Ext.applyIf(config, {
            scope: this
        });
        
        Ext.apply(this, config);
        
        if (typeof this.controller == 'string') {
            this.controller = Ext.ControllerManager.get(this.controller);
        }
    }
});

Ext.Application = Ext.extend(Ext.util.Observable, {
    

    
    scope: undefined,

    
    useHistory: true,

    

    
    autoUpdateComponentProfiles: true,

    
    setProfilesOnLaunch: true,

    

    constructor: function(config) {
        this.addEvents(
            
            'launch',

            
            'beforeprofilechange',

            
            'profilechange'
        );

        Ext.Application.superclass.constructor.call(this, config);

        this.bindReady();

        var name = this.name;

        if (name) {
            window[name] = this;

            Ext.ns(
                name,
                name + ".views",
                name + ".stores",
                name + ".models",
                name + ".controllers"
            );
        }

        if (Ext.addMetaTags) {
            Ext.addMetaTags(config);
        }
    },

    
    bindReady : function() {
        Ext.onReady(this.onReady, this);
    },

    
    launch: Ext.emptyFn,

    
    useLoadMask: false,

    
    loadMaskFadeDuration: 1000,

    
    loadMaskRemoveDuration: 1050,

    
    autoInitViewport: true,

    
    dispatch: function(options) {
        return Ext.dispatch(options);
    },

    
    initLoadMask: function() {
        var useLoadMask = this.useLoadMask,
            defaultId   = 'loading-mask',
            loadMaskId  = typeof useLoadMask == 'string' ? useLoadMask : defaultId;

        if (useLoadMask) {
            if (loadMaskId == defaultId) {
                Ext.getBody().createChild({id: defaultId});
            }

            var loadingMask  = Ext.get('loading-mask'),
                fadeDuration = this.loadMaskFadeDuration,
                hideDuration = this.loadMaskRemoveDuration;

            Ext.defer(function() {
                loadingMask.addCls('fadeout');

                Ext.defer(function() {
                    loadingMask.remove();
                }, hideDuration);
            }, fadeDuration);
        }
    },

    
    onBeforeLaunch: function() {
        var History    = Ext.History,
            useHistory = History && this.useHistory,
            profile    = this.determineProfile(true);

        if (useHistory) {
            this.historyForm = Ext.getBody().createChild({
                id    : 'history-form',
                cls   : 'x-hide-display',
                style : 'display: none;',
                tag   : 'form',
                action: '#',
                children: [
                    {
                        tag: 'div',
                        children: [
                            {
                                tag : 'input',
                                id  : History.fieldId,
                                type: 'hidden'
                            },
                            {
                                tag: 'iframe',
                                id : History.iframeId
                            }
                        ]
                    }
                ]
            });

            History.init();
            History.on('change', this.onHistoryChange, this);

            var token = History.getToken();

            if (this.launch.call(this.scope || this, profile) !== false) {
                Ext.redirect(token || this.defaultUrl || {controller: 'application', action: 'index'});
            }
        } else {
            this.launch.call(this.scope || this, profile);
        }

        this.launched = true;

        this.fireEvent('launch', this);

        if (this.setProfilesOnLaunch) {
            this.updateComponentProfiles(profile);
        }
    },

    
    onReady: function() {
        if (this.useLoadMask) {
            this.initLoadMask();
        }

        Ext.EventManager.onOrientationChange(this.determineProfile, this);

        if (this.autoInitViewport) {
            Ext.Viewport.init(this.onBeforeLaunch, this);
        } else {
            this.onBeforeLaunch();
        }

        return this;
    },

    
    determineProfile: function(silent) {
        var currentProfile = this.currentProfile,
            profiles       = this.profiles,
            name;

        for (name in profiles) {
            if (profiles[name]() === true) {
                if (name != currentProfile && this.fireEvent('beforeprofilechange', name, currentProfile) !== false) {
                    if (this.autoUpdateComponentProfiles) {
                        this.updateComponentProfiles(name);
                    }

                    if (silent !== true) {
                        this.fireEvent('profilechange', name, currentProfile);
                    }
                }

                this.currentProfile = name;
                break;
            }
        }

        return this.currentProfile;
    },

    
    updateComponentProfiles: function(profile) {
        Ext.ComponentMgr.each(function(key, component){
            if (component.setProfile) {
                component.setProfile(profile);
            }
        });
    },

    
    getProfile: function() {
        return this.currentProfile;
    },

    
    onHistoryChange: function(token) {
        return Ext.redirect(token);
    }
});

Ext.ApplicationManager = new Ext.AbstractManager({
    register: function(name, options) {
        if (Ext.isObject(name)) {
            options = name;
        } else {
            options.name = name;
        }
        
        var application = new Ext.Application(options);
        
        this.all.add(application);
        
        this.currentApplication = application;
        
        return application;
    }
});


Ext.regApplication = function() {
    return Ext.ApplicationManager.register.apply(Ext.ApplicationManager, arguments);
};



(function() {
var El = Ext.Element = Ext.extend(Object, {
    
    defaultUnit : "px",

    constructor : function(element, forceNew) {
        var dom = typeof element == 'string'
                ? document.getElementById(element)
                : element,
            id;

        if (!dom) {
            return null;
        }

        id = dom.id;
        if (!forceNew && id && Ext.cache[id]) {
            return Ext.cache[id].el;
        }

        
        this.dom = dom;

        
        this.id = id || Ext.id(dom);
        return this;
    },

    
    set : function(o, useSet) {
        var el = this.dom,
            attr,
            value;

        for (attr in o) {
            if (o.hasOwnProperty(attr)) {
                value = o[attr];
                if (attr == 'style') {
                    this.applyStyles(value);
                }
                else if (attr == 'cls') {
                    el.className = value;
                }
                else if (useSet !== false) {
                    el.setAttribute(attr, value);
                }
                else {
                    el[attr] = value;
                }
            }
        }
        return this;
    },

    
    is : function(simpleSelector) {
        return Ext.DomQuery.is(this.dom, simpleSelector);
    },

    
    getValue : function(asNumber){
        var val = this.dom.value;
        return asNumber ? parseInt(val, 10) : val;
    },

    
    addListener : function(eventName, fn, scope, options){
        Ext.EventManager.on(this.dom,  eventName, fn, scope || this, options);
        return this;
    },

    
    removeListener : function(eventName, fn, scope) {
        Ext.EventManager.un(this.dom, eventName, fn, scope);
        return this;
    },

    
    removeAllListeners : function(){
        Ext.EventManager.removeAll(this.dom);
        return this;
    },

    
    purgeAllListeners : function() {
        Ext.EventManager.purgeElement(this, true);
        return this;
    },

    
    remove : function() {
        var me = this,
            dom = me.dom;

        if (dom) {
            delete me.dom;
            Ext.removeNode(dom);
        }
    },

    isAncestor : function(c) {
        var p = this.dom;
        c = Ext.getDom(c);
        if (p && c) {
            return p.contains(c);
        }
        return false;
    },

    
    isDescendent : function(p) {
        return Ext.fly(p, '_internal').isAncestor(this);
    },

    
    contains : function(el) {
        return !el ? false : this.isAncestor(el);
    },

    
    getAttribute : function(name, ns) {
        var d = this.dom;
        return d.getAttributeNS(ns, name) || d.getAttribute(ns + ":" + name) || d.getAttribute(name) || d[name];
    },

    
    setHTML : function(html) {
        if(this.dom) {
            this.dom.innerHTML = html;
        }
        return this;
    },

    
    getHTML : function() {
        return this.dom ? this.dom.innerHTML : '';
    },

    
    hide : function() {
        this.setVisible(false);
        return this;
    },

    
    show : function() {
        this.setVisible(true);
        return this;
    },

    
     setVisible : function(visible, animate) {
        var me = this,
            dom = me.dom,
            mode = this.getVisibilityMode();

        switch (mode) {
            case El.VISIBILITY:
                this.removeCls(['x-hidden-display', 'x-hidden-offsets']);
                this[visible ? 'removeCls' : 'addCls']('x-hidden-visibility');
            break;

            case El.DISPLAY:
                this.removeCls(['x-hidden-visibility', 'x-hidden-offsets']);
                this[visible ? 'removeCls' : 'addCls']('x-hidden-display');
            break;

            case El.OFFSETS:
                this.removeCls(['x-hidden-visibility', 'x-hidden-display']);
                this[visible ? 'removeCls' : 'addCls']('x-hidden-offsets');
            break;
        }

        return me;
    },

    getVisibilityMode: function() {
        var dom = this.dom,
            mode = El.data(dom, 'visibilityMode');

        if (mode === undefined) {
            El.data(dom, 'visibilityMode', mode = El.DISPLAY);
        }

        return mode;
    },

    setVisibilityMode : function(mode) {
        El.data(this.dom, 'visibilityMode', mode);
        return this;
    }
});

var Elp = El.prototype;


El.VISIBILITY = 1;

El.DISPLAY = 2;

El.OFFSETS = 3;


El.addMethods = function(o){
   Ext.apply(Elp, o);
};


Elp.on = Elp.addListener;
Elp.un = Elp.removeListener;


Elp.update = Elp.setHTML;


El.get = function(el){
    var extEl,
        dom,
        id;

    if(!el){
        return null;
    }

    if (typeof el == "string") { 
        if (!(dom = document.getElementById(el))) {
            return null;
        }
        if (Ext.cache[el] && Ext.cache[el].el) {
            extEl = Ext.cache[el].el;
            extEl.dom = dom;
        } else {
            extEl = El.addToCache(new El(dom));
        }
        return extEl;
    } else if (el.tagName) { 
        if(!(id = el.id)){
            id = Ext.id(el);
        }
        if (Ext.cache[id] && Ext.cache[id].el) {
            extEl = Ext.cache[id].el;
            extEl.dom = el;
        } else {
            extEl = El.addToCache(new El(el));
        }
        return extEl;
    } else if (el instanceof El) {
        if(el != El.docEl){
            
            
            el.dom = document.getElementById(el.id) || el.dom;
        }
        return el;
    } else if(el.isComposite) {
        return el;
    } else if(Ext.isArray(el)) {
        return El.select(el);
    } else if(el == document) {
        
        if(!El.docEl){
            var F = function(){};
            F.prototype = Elp;
            El.docEl = new F();
            El.docEl.dom = document;
            El.docEl.id = Ext.id(document);
        }
        return El.docEl;
    }
    return null;
};


El.addToCache = function(el, id){
    id = id || el.id;
    Ext.cache[id] = {
        el:  el,
        data: {},
        events: {}
    };
    return el;
};


El.data = function(el, key, value) {
    el = El.get(el);
    if (!el) {
        return null;
    }
    var c = Ext.cache[el.id].data;
    if (arguments.length == 2) {
        return c[key];
    }
    else {
        return (c[key] = value);
    }
};




El.garbageCollect = function() {
    if (!Ext.enableGarbageCollector) {
        clearInterval(El.collectorThreadId);
    }
    else {
        var id,
            dom,
            EC = Ext.cache;

        for (id in EC) {
            if (!EC.hasOwnProperty(id)) {
                continue;
            }
            if(EC[id].skipGarbageCollection){
                continue;
            }
            dom = EC[id].el.dom;
            if(!dom || !dom.parentNode || (!dom.offsetParent && !document.getElementById(id))){
                if(Ext.enableListenerCollection){
                    Ext.EventManager.removeAll(dom);
                }
                delete EC[id];
            }
        }
    }
};



El.Flyweight = function(dom) {
    this.dom = dom;
};

var F = function(){};
F.prototype = Elp;

El.Flyweight.prototype = new F;
El.Flyweight.prototype.isFlyweight = true;

El._flyweights = {};


El.fly = function(el, named) {
    var ret = null;
    named = named || '_global';

    el = Ext.getDom(el);
    if (el) {
        (El._flyweights[named] = El._flyweights[named] || new El.Flyweight()).dom = el;
        ret = El._flyweights[named];
    }

    return ret;
};


Ext.get = El.get;


Ext.fly = El.fly;



})();

Ext.applyIf(Ext.Element, {
    unitRe: /\d+(px|em|%|en|ex|pt|in|cm|mm|pc)$/i,
    camelRe: /(-[a-z])/gi,
    opacityRe: /alpha\(opacity=(.*)\)/i,
    propertyCache: {},
    defaultUnit : "px",
    borders: {l: 'border-left-width', r: 'border-right-width', t: 'border-top-width', b: 'border-bottom-width'},
    paddings: {l: 'padding-left', r: 'padding-right', t: 'padding-top', b: 'padding-bottom'},
    margins: {l: 'margin-left', r: 'margin-right', t: 'margin-top', b: 'margin-bottom'},

    addUnits : function(size, units) {
        if (size === "" || size == "auto" || size === null || size === undefined) {
            size = size || '';
        }
        else if (!isNaN(size) || !this.unitRe.test(size)) {
            size = size + (units || this.defaultUnit || 'px');
        }
        return size;
    },

    
    parseBox : function(box) {
        if (typeof box != 'string') {
            box = box.toString();
        }
        var parts  = box.split(' '),
            ln = parts.length;

        if (ln == 1) {
            parts[1] = parts[2] = parts[3] = parts[0];
        }
        else if (ln == 2) {
            parts[2] = parts[0];
            parts[3] = parts[1];
        }
        else if (ln == 3) {
            parts[3] = parts[1];
        }

        return {
            top   :parseFloat(parts[0]) || 0,
            right :parseFloat(parts[1]) || 0,
            bottom:parseFloat(parts[2]) || 0,
            left  :parseFloat(parts[3]) || 0
        };
    },
    
    
    unitizeBox : function(box, units) {
        var A = this.addUnits,
            B = this.parseBox(box);
            
        return A(B.top, units) + ' ' +
               A(B.right, units) + ' ' +
               A(B.bottom, units) + ' ' +
               A(B.left, units);
        
    },

    
    camelReplaceFn : function(m, a) {
        return a.charAt(1).toUpperCase();
    },

    
    normalize : function(prop) {
        return this.propertyCache[prop] || (this.propertyCache[prop] = prop == 'float' ? 'cssFloat' : prop.replace(this.camelRe, this.camelReplaceFn));
    },

    
    getDocumentHeight: function() {
        return Math.max(!Ext.isStrict ? document.body.scrollHeight : document.documentElement.scrollHeight, this.getViewportHeight());
    },

    
    getDocumentWidth: function() {
        return Math.max(!Ext.isStrict ? document.body.scrollWidth : document.documentElement.scrollWidth, this.getViewportWidth());
    },

    
    getViewportHeight: function(){
        return window.innerHeight;
    },

    
    getViewportWidth : function() {
        return window.innerWidth;
    },

    
    getViewSize : function() {
        return {
            width: window.innerWidth,
            height: window.innerHeight
        };
    },

    
    getOrientation : function() {
        if (Ext.supports.OrientationChange) {
            return (window.orientation == 0) ? 'portrait' : 'landscape';
        }
        
        return (window.innerHeight > window.innerWidth) ? 'portrait' : 'landscape';
    },

    
    fromPoint: function(x, y) {
        return Ext.get(document.elementFromPoint(x, y));
    }
});

Ext.applyIf(Ext.Element, {
    
    
    getComputedTransformOffset: function(el) {
        if (el instanceof Ext.Element)
            el = el.dom;
            
        var transform = window.getComputedStyle(el).webkitTransform,
            cssMatrix = transform != 'none' ? new WebKitCSSMatrix(transform) : new WebKitCSSMatrix();

        if (typeof cssMatrix.m41 != 'undefined') {
            return new Ext.util.Offset(cssMatrix.m41, cssMatrix.m42);
        } else if (typeof cssMatrix.d != 'undefined') {
            return new Ext.util.Offset(cssMatrix.d, cssMatrix.e);
        }

        return new Ext.util.Offset(0, 0);
    },

    
    cssTransform: function(el, transforms) {
        if (el instanceof Ext.Element)
            el = el.dom;

        var m = new WebKitCSSMatrix();

        Ext.iterate(transforms, function(n, v) {
            v = Ext.isArray(v) ? v : [v];
            m = m[n].apply(m, v);
        });

        
        
        if (Ext.supports.CSS3DTransform) {
            el.style.webkitTransform = 'matrix3d(' +
                                            m.m11+', '+m.m12+', '+m.m13+', '+m.m14+', '+
                                            m.m21+', '+m.m22+', '+m.m23+', '+m.m24+', '+
                                            m.m31+', '+m.m32+', '+m.m33+', '+m.m34+', '+
                                            m.m41+', '+m.m42+', '+m.m43+', '+m.m44+
                                       ')';
        } else {
            el.style.webkitTransform = m;
        }
    },

    
    cssTranslate: function(el, offset) {
        if (el instanceof Ext.Element)
            el = el.dom;

        if (Ext.supports.CSS3DTransform) {
            el.style.webkitTransform = 'translate3d('+offset.x+'px, '+offset.y+'px, 0px)';
        } else {
            el.style.webkitTransform = 'translate('+offset.x+'px, '+offset.y+'px)';
        }
    }

});


Ext.Element.addMethods({
    
    getY : function(el) {
        return this.getXY(el)[1];
    },

    
    getX : function(el) {
        return this.getXY(el)[0];
    },

    
    getXY : function() {
        
        var point = window.webkitConvertPointFromNodeToPage(this.dom, new WebKitPoint(0, 0));
        return [point.x, point.y];
    },

    
    getOffsetsTo : function(el){
        var o = this.getXY(),
            e = Ext.fly(el, '_internal').getXY();
        return [o[0]-e[0],o[1]-e[1]];
    },

    
    setXY : function(pos) {
        var me = this;

        if(arguments.length > 1) {
            pos = [pos, arguments[1]];
        }

        
        var pts = me.translatePoints(pos),
            style = me.dom.style;

        for (pos in pts) {
            if (!pts.hasOwnProperty(pos)) {
                continue;
            }
            if(!isNaN(pts[pos])) style[pos] = pts[pos] + "px";
        }
        return me;
    },

    
    setX : function(x){
        return this.setXY([x, this.getY()]);
    },

    
    setY : function(y) {
        return this.setXY([this.getX(), y]);
    },

    
    setLeft : function(left) {
        this.setStyle('left', Ext.Element.addUnits(left));
        return this;
    },

    
    setTop : function(top) {
        this.setStyle('top', Ext.Element.addUnits(top));
        return this;
    },

    
    setTopLeft: function(top, left) {
        var addUnits = Ext.Element.addUnits;

        this.setStyle('top', addUnits(top));
        this.setStyle('left', addUnits(left));

        return this;
    },

    
    setRight : function(right) {
        this.setStyle('right', Ext.Element.addUnits(right));
        return this;
    },

    
    setBottom : function(bottom) {
        this.setStyle('bottom', Ext.Element.addUnits(bottom));
        return this;
    },

    
    getLeft : function(local) {
        return parseInt(this.getStyle('left'), 10) || 0;
    },

    
    getRight : function(local) {
        return parseInt(this.getStyle('right'), 10) || 0;
    },

    
    getTop : function(local) {
        return parseInt(this.getStyle('top'), 10) || 0;
    },

    
    getBottom : function(local) {
        return parseInt(this.getStyle('bottom'), 10) || 0;
    },

    
    setBox : function(left, top, width, height) {
        var undefined;
        if (Ext.isObject(left)) {
            width = left.width;
            height = left.height;
            top = left.top;
            left = left.left;
        }
        
        if (left !== undefined) {
            this.setLeft(left);
        }
        if (top !== undefined) {
            this.setTop(top);
        }
        if (width !== undefined) {
            this.setWidth(width);
        }
        if (height !== undefined) {
            this.setHeight(height);
        }
    
        return this;
    },

    
    getBox : function(contentBox, local) {
        var me = this,
            dom = me.dom,
            width = dom.offsetWidth,
            height = dom.offsetHeight,
            xy, box, l, r, t, b;

        if (!local) {
            xy = me.getXY();
        }
        else if (contentBox) {
            xy = [0,0];
        }
        else {
            xy = [parseInt(me.getStyle("left"), 10) || 0, parseInt(me.getStyle("top"), 10) || 0];
        }

        if (!contentBox) {
            box = {
                x: xy[0],
                y: xy[1],
                0: xy[0],
                1: xy[1],
                width: width,
                height: height
            };
        }
        else {
            l = me.getBorderWidth.call(me, "l") + me.getPadding.call(me, "l");
            r = me.getBorderWidth.call(me, "r") + me.getPadding.call(me, "r");
            t = me.getBorderWidth.call(me, "t") + me.getPadding.call(me, "t");
            b = me.getBorderWidth.call(me, "b") + me.getPadding.call(me, "b");
            box = {
                x: xy[0] + l,
                y: xy[1] + t,
                0: xy[0] + l,
                1: xy[1] + t,
                width: width - (l + r),
                height: height - (t + b)
            };
        }

        box.left = box.x;
        box.top = box.y;
        box.right = box.x + box.width;
        box.bottom = box.y + box.height;

        return box;
    },

    
    getPageBox : function(getRegion) {
        var me = this,
            el = me.dom,
            w = el.offsetWidth,
            h = el.offsetHeight,
            xy = me.getXY(),
            t = xy[1],
            r = xy[0] + w,
            b = xy[1] + h,
            l = xy[0];
        
        if (!el) {
            return new Ext.util.Region();
        }
        
        if (getRegion) {
            return new Ext.util.Region(t, r, b, l);
        }
        else {
            return {
                left: l,
                top: t,
                width: w,
                height: h,
                right: r,
                bottom: b
            };
        }
    },

    
    translatePoints : function(x, y) {
        y = isNaN(x[1]) ? y : x[1];
        x = isNaN(x[0]) ? x : x[0];
        var me = this,
            relative = me.isStyle('position', 'relative'),
            o = me.getXY(),
            l = parseInt(me.getStyle('left'), 10),
            t = parseInt(me.getStyle('top'), 10);

        l = !isNaN(l) ? l : (relative ? 0 : me.dom.offsetLeft);
        t = !isNaN(t) ? t : (relative ? 0 : me.dom.offsetTop);

        return {left: (x - o[0] + l), top: (y - o[1] + t)};
    }
});

(function() {
    
    Ext.Element.classReCache = {};
    var El = Ext.Element,
        view = document.defaultView;

    El.addMethods({
        marginRightRe: /marginRight/i,
        trimRe: /^\s+|\s+$/g,
        spacesRe: /\s+/,

        
        addCls: function(className) {
            var me = this,
                i,
                len,
                v,
                cls = [];

            if (!Ext.isArray(className)) {
                if (className && !this.hasCls(className)) {
                    me.dom.className += " " + className;
                }
            }
            else {
                for (i = 0, len = className.length; i < len; i++) {
                    v = className[i];
                    if (v && !me.hasCls(v)) {
                        cls.push(v);
                    }
                }
                if (cls.length) {
                    me.dom.className += " " + cls.join(" ");
                }
            }
            return me;
        },
        
        addClass : function() {
            throw new Error("Component: addClass has been deprecated. Please use addCls.");
        },

        
        removeCls: function(className) {
            var me = this,
                i,
                idx,
                len,
                cls,
                elClasses;
            if (!Ext.isArray(className)) {
                className = [className];
            }
            if (me.dom && me.dom.className) {
                elClasses = me.dom.className.replace(this.trimRe, '').split(this.spacesRe);
                for (i = 0, len = className.length; i < len; i++) {
                    cls = className[i];
                    if (typeof cls == 'string') {
                        cls = cls.replace(this.trimRe, '');
                        idx = elClasses.indexOf(cls);
                        if (idx != -1) {
                            elClasses.splice(idx, 1);
                        }
                    }
                }
                me.dom.className = elClasses.join(" ");
            }
            return me;
        },
        
        removeClass : function() {
            throw new Error("Component: removeClass has been deprecated. Please use removeCls.");
        },

        
        mask: function(msg, msgCls, transparent) {
            var me = this,
                dom = me.dom,
                el = Ext.Element.data(dom, 'mask'),
                mask,
                size,
                cls = '';

            me.addCls('x-masked');
            if (me.getStyle("position") == "static") {
                me.addCls('x-masked-relative');
            }
            if (el) {
                el.remove();
            }
            if (Ext.isString(msgCls) && !Ext.isEmpty(msgCls)) {
                cls = ' ' + msgCls;
            }
            else {
                if (msgCls) {
                    cls = ' x-mask-gray';
                }
            }
                        
            mask = me.createChild({
                cls: 'x-mask' + ((transparent !== false) ? '' : ' x-mask-gray'),
                html: msg ? ('<div class="' + (msgCls || 'x-mask-message') + '">' + msg + '</div>') : ''
            });

            size = me.getSize();

            Ext.Element.data(dom, 'mask', mask);

            if (dom === document.body) {
                size.height = window.innerHeight;
                if (me.orientationHandler) {
                    Ext.EventManager.unOrientationChange(me.orientationHandler, me);
                }

                me.orientationHandler = function() {
                    size = me.getSize();
                    size.height = window.innerHeight;
                    mask.setSize(size);
                };

                Ext.EventManager.onOrientationChange(me.orientationHandler, me);
            }
            mask.setSize(size);
            if (Ext.is.iPad) {
                Ext.repaint();
            }
        },

        
        unmask: function() {
            var me = this,
                dom = me.dom,
                mask = Ext.Element.data(dom, 'mask');

            if (mask) {
                mask.remove();
                Ext.Element.data(dom, 'mask', undefined);
            }
            me.removeCls(['x-masked', 'x-masked-relative']);

            if (dom === document.body) {
                Ext.EventManager.unOrientationChange(me.orientationHandler, me);
                delete me.orientationHandler;
            }
        },

        
        radioCls: function(className) {
            var cn = this.dom.parentNode.childNodes,
                v;
            className = Ext.isArray(className) ? className: [className];
            for (var i = 0, len = cn.length; i < len; i++) {
                v = cn[i];
                if (v && v.nodeType == 1) {
                    Ext.fly(v, '_internal').removeCls(className);
                }
            };
            return this.addCls(className);
        },
        
        radioClass : function() {
            throw new Error("Component: radioClass has been deprecated. Please use radioCls.");
        },

        
        toggleCls: function(className) {
            return this.hasCls(className) ? this.removeCls(className) : this.addCls(className);
        },
        
        toggleClass : function() {
            throw new Error("Component: toggleClass has been deprecated. Please use toggleCls.");
        },

        
        hasCls: function(className) {
            return className && (' ' + this.dom.className + ' ').indexOf(' ' + className + ' ') != -1;
        },
        
        hasClass : function() {
            throw new Error("Element: hasClass has been deprecated. Please use hasCls.");
            return this.hasCls.apply(this, arguments);
        },

        
        replaceCls: function(oldClassName, newClassName) {
            return this.removeCls(oldClassName).addCls(newClassName);
        },
        
        replaceClass : function() {
            throw new Error("Component: replaceClass has been deprecated. Please use replaceCls.");
        },

        isStyle: function(style, val) {
            return this.getStyle(style) == val;
        },

        
        getStyle: function(prop) {
            var dom = this.dom,
                result,
                display,
                cs,
                platform = Ext.is,
                style = dom.style;

            prop = El.normalize(prop);
            cs = (view) ? view.getComputedStyle(dom, '') : dom.currentStyle;
            result = (cs) ? cs[prop] : null;

            
            if (result && !platform.correctRightMargin &&
                    this.marginRightRe.test(prop) &&
                    style.position != 'absolute' &&
                    result != '0px') {
                display = style.display;
                style.display = 'inline-block';
                result = view.getComputedStyle(dom, null)[prop];
                style.display = display;
            }

            result || (result = style[prop]);

            
            if (!platform.correctTransparentColor && result == 'rgba(0, 0, 0, 0)') {
                result = 'transparent';
            }

            return result;
        },

        
        setStyle: function(prop, value) {
            var tmp,
                style;

            if (typeof prop == 'string') {
                tmp = {};
                tmp[prop] = value;
                prop = tmp;
            }

            for (style in prop) {
                if (prop.hasOwnProperty(style)) {
                    this.dom.style[El.normalize(style)] = prop[style];
                }
            }

            return this;
        },

        
        applyStyles: function(styles) {
            if (styles) {
                var i,
                    len,
                    dom = this.dom;

                if (typeof styles == 'function') {
                    styles = styles.call();
                }
                if (typeof styles == 'string') {
                    styles = Ext.util.Format.trim(styles).split(/\s*(?::|;)\s*/);
                    for (i = 0, len = styles.length; i < len;) {
                        dom.style[El.normalize(styles[i++])] = styles[i++];
                    }
                }
                else if (typeof styles == 'object') {
                    this.setStyle(styles);
                }
            }
        },

        
        getHeight: function(contentHeight) {
            var dom = this.dom,
                height = contentHeight ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight;
            return height > 0 ? height: 0;
        },

        
        getWidth: function(contentWidth) {
            var dom = this.dom,
                width = contentWidth ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth;
            return width > 0 ? width: 0;
        },

        
        setWidth: function(width) {
            var me = this;
                me.dom.style.width = El.addUnits(width);
            return me;
        },

        
        setHeight: function(height) {
            var me = this;
                me.dom.style.height = El.addUnits(height);
            return me;
        },

        
        setSize: function(width, height) {
            var me = this,
                style = me.dom.style;

            if (Ext.isObject(width)) {
                
                height = width.height;
                width = width.width;
            }

            style.width = El.addUnits(width);
            style.height = El.addUnits(height);
            return me;
        },

        
        getBorderWidth: function(side) {
            return this.sumStyles(side, El.borders);
        },

        
        getPadding: function(side) {
            return this.sumStyles(side, El.paddings);
        },

        
        getMargin: function(side) {
            return this.sumStyles(side, El.margins);
        },

        
        getViewSize: function() {
            var doc = document,
                dom = this.dom;

            if (dom == doc || dom == doc.body) {
                return {
                    width: El.getViewportWidth(),
                    height: El.getViewportHeight()
                };
            }
            else {
                return {
                    width: dom.clientWidth,
                    height: dom.clientHeight
                };
            }
        },

        
        getSize: function(contentSize) {
            var dom = this.dom;
            return {
                width: Math.max(0, contentSize ? (dom.clientWidth - this.getPadding("lr")) : dom.offsetWidth),
                height: Math.max(0, contentSize ? (dom.clientHeight - this.getPadding("tb")) : dom.offsetHeight)
            };
        },

        
        repaint: function() {
            var dom = this.dom;
                this.addCls("x-repaint");
            dom.style.background = 'transparent none';
            setTimeout(function() {
                dom.style.background = null;
                Ext.get(dom).removeCls("x-repaint");
            },
            1);
            return this;
        },

        
        getOuterWidth: function() {
            return this.getWidth() + this.getMargin('lr');
        },

        
        getOuterHeight: function() {
            return this.getHeight() + this.getMargin('tb');
        },

        
        sumStyles: function(sides, styles) {
            var val = 0,
                m = sides.match(/\w/g),
                len = m.length,
                s,
                i;

            for (i = 0; i < len; i++) {
                s = m[i] && parseFloat(this.getStyle(styles[m[i]])) || 0;
                if (s) {
                    val += Math.abs(s);
                }
            }
            return val;
        }
    });
})();

Ext.Element.addMethods({
    
    findParent : function(simpleSelector, maxDepth, returnEl) {
        var p = this.dom,
            b = document.body,
            depth = 0,
            stopEl;

        maxDepth = maxDepth || 50;
        if (isNaN(maxDepth)) {
            stopEl = Ext.getDom(maxDepth);
            maxDepth = Number.MAX_VALUE;
        }
        while (p && p.nodeType == 1 && depth < maxDepth && p != b && p != stopEl) {
            if (Ext.DomQuery.is(p, simpleSelector)) {
                return returnEl ? Ext.get(p) : p;
            }
            depth++;
            p = p.parentNode;
        }
        return null;
    },
    
    
    findParentNode : function(simpleSelector, maxDepth, returnEl) {
        var p = Ext.fly(this.dom.parentNode, '_internal');
        return p ? p.findParent(simpleSelector, maxDepth, returnEl) : null;
    },

    
    up : function(simpleSelector, maxDepth) {
        return this.findParentNode(simpleSelector, maxDepth, true);
    },

    
    select : function(selector, composite) {
        return Ext.Element.select(selector, this.dom, composite);
    },

    
    query : function(selector) {
        return Ext.DomQuery.select(selector, this.dom);
    },

    
    down : function(selector, returnDom) {
        var n = Ext.DomQuery.selectNode(selector, this.dom);
        return returnDom ? n : Ext.get(n);
    },

    
    child : function(selector, returnDom) {
        var node,
            me = this,
            id;
        id = Ext.get(me).id;
        
        id = id.replace(/[\.:]/g, "\\$0");
        node = Ext.DomQuery.selectNode('#' + id + " > " + selector, me.dom);
        return returnDom ? node : Ext.get(node);
    },

     
    parent : function(selector, returnDom) {
        return this.matchNode('parentNode', 'parentNode', selector, returnDom);
    },

     
    next : function(selector, returnDom) {
        return this.matchNode('nextSibling', 'nextSibling', selector, returnDom);
    },

    
    prev : function(selector, returnDom) {
        return this.matchNode('previousSibling', 'previousSibling', selector, returnDom);
    },


    
    first : function(selector, returnDom) {
        return this.matchNode('nextSibling', 'firstChild', selector, returnDom);
    },

    
    last : function(selector, returnDom) {
        return this.matchNode('previousSibling', 'lastChild', selector, returnDom);
    },

    matchNode : function(dir, start, selector, returnDom) {
        if (!this.dom)
            return null;
        
        var n = this.dom[start];
        while (n) {
            if (n.nodeType == 1 && (!selector || Ext.DomQuery.is(n, selector))) {
                return !returnDom ? Ext.get(n) : n;
            }
            n = n[dir];
        }
        return null;
    }
});


Ext.Element.addMethods({
    
    getScrollParent : function() {
        var parent = this.dom, scroller;
        while (parent && parent != document.body) {
            if (parent.id && (scroller = Ext.ScrollManager.get(parent.id))) {
                return scroller;
            }
            parent = parent.parentNode;
        }
        return null;
    }
});


Ext.Element.addMethods({
    
    appendChild : function(el) {
        return Ext.get(el).appendTo(this);
    },

    
    appendTo : function(el) {
        Ext.getDom(el).appendChild(this.dom);
        return this;
    },

    
    insertBefore : function(el) {
        el = Ext.getDom(el);
        el.parentNode.insertBefore(this.dom, el);
        return this;
    },

    
    insertAfter : function(el) {
        el = Ext.getDom(el);
        el.parentNode.insertBefore(this.dom, el.nextSibling);
        return this;
    },

    
    insertFirst : function(el, returnDom) {
        el = el || {};
        if (el.nodeType || el.dom || typeof el == 'string') { 
            el = Ext.getDom(el);
            this.dom.insertBefore(el, this.dom.firstChild);
            return !returnDom ? Ext.get(el) : el;
        }
        else { 
            return this.createChild(el, this.dom.firstChild, returnDom);
        }
    },

    
    insertSibling: function(el, where, returnDom){
        var me = this, rt,
        isAfter = (where || 'before').toLowerCase() == 'after',
        insertEl;

        if(Ext.isArray(el)){
            insertEl = me;
            Ext.each(el, function(e) {
                rt = Ext.fly(insertEl, '_internal').insertSibling(e, where, returnDom);
                if(isAfter){
                    insertEl = rt;
                }
            });
            return rt;
        }

        el = el || {};

        if(el.nodeType || el.dom){
            rt = me.dom.parentNode.insertBefore(Ext.getDom(el), isAfter ? me.dom.nextSibling : me.dom);
            if (!returnDom) {
                rt = Ext.get(rt);
            }
        }else{
            if (isAfter && !me.dom.nextSibling) {
                rt = Ext.DomHelper.append(me.dom.parentNode, el, !returnDom);
            } else {
                rt = Ext.DomHelper[isAfter ? 'insertAfter' : 'insertBefore'](me.dom, el, !returnDom);
            }
        }
        return rt;
    },

    
    replace : function(el) {
        el = Ext.get(el);
        this.insertBefore(el);
        el.remove();
        return this;
    },
    
    
    replaceWith: function(el){
        var me = this;
            
        if(el.nodeType || el.dom || typeof el == 'string'){
            el = Ext.get(el);
            me.dom.parentNode.insertBefore(el, me.dom);
        }else{
            el = Ext.DomHelper.insertBefore(me.dom, el);
        }
        
        delete Ext.cache[me.id];
        Ext.removeNode(me.dom);      
        me.id = Ext.id(me.dom = el);
        Ext.Element.addToCache(me.isFlyweight ? new Ext.Element(me.dom) : me);     
        return me;
    },
    
    
    createChild : function(config, insertBefore, returnDom) {
        config = config || {tag:'div'};
        if (insertBefore) {
            return Ext.DomHelper.insertBefore(insertBefore, config, returnDom !== true);
        }
        else {
            return Ext.DomHelper[!this.dom.firstChild ? 'overwrite' : 'append'](this.dom, config,  returnDom !== true);
        }
    },

    
    wrap : function(config, returnDom) {
        var newEl = Ext.DomHelper.insertBefore(this.dom, config || {tag: "div"}, !returnDom);
        newEl.dom ? newEl.dom.appendChild(this.dom) : newEl.appendChild(this.dom);
        return newEl;
    },

    
    insertHtml : function(where, html, returnEl) {
        var el = Ext.DomHelper.insertHtml(where, this.dom, html);
        return returnEl ? Ext.get(el) : el;
    }
});


Ext.Element.addMethods({
    
    getAnchorXY: function(anchor, local, size) {
        
        
        anchor = (anchor || "tl").toLowerCase();
        size = size || {};

        var me = this,
            vp = me.dom == document.body || me.dom == document,
            width = size.width || vp ? window.innerWidth: me.getWidth(),
            height = size.height || vp ? window.innerHeight: me.getHeight(),
            xy,
            rnd = Math.round,
            myXY = me.getXY(),
            extraX = vp ? 0: !local ? myXY[0] : 0,
            extraY = vp ? 0: !local ? myXY[1] : 0,
            hash = {
                c: [rnd(width * 0.5), rnd(height * 0.5)],
                t: [rnd(width * 0.5), 0],
                l: [0, rnd(height * 0.5)],
                r: [width, rnd(height * 0.5)],
                b: [rnd(width * 0.5), height],
                tl: [0, 0],
                bl: [0, height],
                br: [width, height],
                tr: [width, 0]
            };

        xy = hash[anchor];
        return [xy[0] + extraX, xy[1] + extraY];
    },

    
    getAlignToXY: function(el, position, offsets) {
        el = Ext.get(el);

        if (!el || !el.dom) {
            throw new Error("Element.alignToXY with an element that doesn't exist");
        }
        offsets = offsets || [0, 0];

        if (!position || position == '?') {
            position = 'tl-bl?';
        }
        else if (! (/-/).test(position) && position !== "") {
            position = 'tl-' + position;
        }
        position = position.toLowerCase();

        var me = this,
            matches = position.match(/^([a-z]+)-([a-z]+)(\?)?$/),
            dw = window.innerWidth,
            dh = window.innerHeight,
            p1 = "",
            p2 = "",
            a1,
            a2,
            x,
            y,
            swapX,
            swapY,
            p1x,
            p1y,
            p2x,
            p2y,
            width,
            height,
            region,
            constrain;

        if (!matches) {
            throw "Element.alignTo with an invalid alignment " + position;
        }

        p1 = matches[1];
        p2 = matches[2];
        constrain = !!matches[3];

        
        
        a1 = me.getAnchorXY(p1, true);
        a2 = el.getAnchorXY(p2, false);

        x = a2[0] - a1[0] + offsets[0];
        y = a2[1] - a1[1] + offsets[1];

        if (constrain) {
            width = me.getWidth();
            height = me.getHeight();

            region = el.getPageBox();

            
            
            
            p1y = p1.charAt(0);
            p1x = p1.charAt(p1.length - 1);
            p2y = p2.charAt(0);
            p2x = p2.charAt(p2.length - 1);

            swapY = ((p1y == "t" && p2y == "b") || (p1y == "b" && p2y == "t"));
            swapX = ((p1x == "r" && p2x == "l") || (p1x == "l" && p2x == "r"));

            if (x + width > dw) {
                x = swapX ? region.left - width: dw - width;
            }
            if (x < 0) {
                x = swapX ? region.right: 0;
            }
            if (y + height > dh) {
                y = swapY ? region.top - height: dh - height;
            }
            if (y < 0) {
                y = swapY ? region.bottom: 0;
            }
        }

        return [x, y];
    }

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
});


Ext.CompositeElement = function(els, root) {
    
    this.elements = [];
    this.add(els, root);
    this.el = new Ext.Element.Flyweight();
};

Ext.CompositeElement.prototype = {
    isComposite: true,

    
    getElement : function(el) {
        
        var e = this.el;
        e.dom = el;
        e.id = el.id;
        return e;
    },

    
    transformElement : function(el) {
        return Ext.getDom(el);
    },

    
    getCount : function() {
        return this.elements.length;
    },

    
    add : function(els, root) {
        var me = this,
            elements = me.elements;
        if (!els) {
            return this;
        }
        if (typeof els == 'string') {
            els = Ext.Element.selectorFunction(els, root);
        }
        else if (els.isComposite) {
            els = els.elements;
        }
        else if (!Ext.isIterable(els)) {
            els = [els];
        }

        for (var i = 0, len = els.length; i < len; ++i) {
            elements.push(me.transformElement(els[i]));
        }

        return me;
    },

    invoke : function(fn, args) {
        var me = this,
            els = me.elements,
            len = els.length,
            e,
            i;

        for (i = 0; i < len; i++) {
            e = els[i];
            if (e) {
                Ext.Element.prototype[fn].apply(me.getElement(e), args);
            }
        }
        return me;
    },
    
    item : function(index) {
        var me = this,
            el = me.elements[index],
            out = null;

        if (el){
            out = me.getElement(el);
        }
        return out;
    },

    
    addListener : function(eventName, handler, scope, opt) {
        var els = this.elements,
            len = els.length,
            i, e;

        for (i = 0; i<len; i++) {
            e = els[i];
            if (e) {
                Ext.EventManager.on(e, eventName, handler, scope || e, opt);
            }
        }
        return this;
    },

    
    each : function(fn, scope) {
        var me = this,
            els = me.elements,
            len = els.length,
            i, e;

        for (i = 0; i<len; i++) {
            e = els[i];
            if (e) {
                e = this.getElement(e);
                if(fn.call(scope || e, e, me, i)){
                    break;
                }
            }
        }
        return me;
    },

    
    fill : function(els) {
        var me = this;
        me.elements = [];
        me.add(els);
        return me;
    },

    
    filter : function(selector) {
        var els = [],
            me = this,
            elements = me.elements,
            fn = Ext.isFunction(selector) ? selector
                : function(el){
                    return el.is(selector);
                };

        me.each(function(el, self, i){
            if(fn(el, i) !== false){
                els[els.length] = me.transformElement(el);
            }
        });
        me.elements = els;
        return me;
    },

    
    first : function() {
        return this.item(0);
    },

    
    last : function() {
        return this.item(this.getCount()-1);
    },

    
    contains : function(el) {
        return this.indexOf(el) != -1;
    },

    
    indexOf : function(el) {
        return this.elements.indexOf(this.transformElement(el));
    },

    
    clear : function() {
        this.elements = [];
    }
};

Ext.CompositeElement.prototype.on = Ext.CompositeElement.prototype.addListener;

(function(){
var fnName,
    ElProto = Ext.Element.prototype,
    CelProto = Ext.CompositeElement.prototype;

for (fnName in ElProto) {
    if (Ext.isFunction(ElProto[fnName])) {
        (function(fnName) {
            CelProto[fnName] = CelProto[fnName] || function(){
                return this.invoke(fnName, arguments);
            };
        }).call(CelProto, fnName);

    }
}
})();

if(Ext.DomQuery) {
    Ext.Element.selectorFunction = Ext.DomQuery.select;
}


Ext.Element.select = function(selector, root, composite) {
    var els;
    composite = (composite === false) ? false : true;
    if (typeof selector == "string") {
        els = Ext.Element.selectorFunction(selector, root);
    } else if (selector.length !== undefined) {
        els = selector;
    } else {
        throw new Error("Invalid selector");
    }
    return composite ? new Ext.CompositeElement(els) : els;
};

Ext.select = Ext.Element.select;


Ext.CompositeElementLite = Ext.CompositeElement;


Ext.apply(Ext.CompositeElementLite.prototype, {
    addElements : function(els, root){
        if(!els){
            return this;
        }
        if(typeof els == "string"){
            els = Ext.Element.selectorFunction(els, root);
        }
        var yels = this.elements;
        Ext.each(els, function(e) {
            yels.push(Ext.get(e));
        });
        return this;
    },

    
    removeElement : function(keys, removeDom){
        var me = this,
            els = this.elements,
            el;
        Ext.each(keys, function(val){
            if ((el = (els[val] || els[val = me.indexOf(val)]))) {
                if(removeDom){
                    if(el.dom){
                        el.remove();
                    }else{
                        Ext.removeNode(el);
                    }
                }
                els.splice(val, 1);
            }
        });
        return this;
    },

    
    replaceElement : function(el, replacement, domReplace){
        var index = !isNaN(el) ? el : this.indexOf(el),
            d;
        if(index > -1){
            replacement = Ext.getDom(replacement);
            if(domReplace){
                d = this.elements[index];
                d.parentNode.insertBefore(replacement, d);
                Ext.removeNode(d);
            }
            this.elements.splice(index, 1, replacement);
        }
        return this;
    }
});


Ext.DomHelper = {
    emptyTags : /^(?:br|frame|hr|img|input|link|meta|range|spacer|wbr|area|param|col)$/i,
    confRe : /tag|children|cn|html$/i,
    endRe : /end/i,

    
    markup : function(o) {
        var b = '',
            attr,
            val,
            key,
            keyVal,
            cn;

        if (typeof o == "string") {
            b = o;
        }
        else if (Ext.isArray(o)) {
            for (var i=0; i < o.length; i++) {
                if (o[i]) {
                    b += this.markup(o[i]);
                }
            };
        }
        else {
            b += '<' + (o.tag = o.tag || 'div');
            for (attr in o) {
                if (!o.hasOwnProperty(attr)) {
                    continue;
                }
                val = o[attr];
                if (!this.confRe.test(attr)) {
                    if (typeof val == "object") {
                        b += ' ' + attr + '="';
                        for (key in val) {
                            if (!val.hasOwnProperty(key)) {
                                continue;
                            }
                            b += key + ':' + val[key] + ';';
                        };
                        b += '"';
                    }
                    else {
                        b += ' ' + ({cls : 'class', htmlFor : 'for'}[attr] || attr) + '="' + val + '"';
                    }
                }
            };

            
            if (this.emptyTags.test(o.tag)) {
                b += '/>';
            }
            else {
                b += '>';
                if ((cn = o.children || o.cn)) {
                    b += this.markup(cn);
                }
                else if (o.html) {
                    b += o.html;
                }
                b += '</' + o.tag + '>';
            }
        }
        return b;
    },

    
    applyStyles : function(el, styles) {
        if (styles) {
            var i = 0,
                len,
                style;

            el = Ext.fly(el);
            if (typeof styles == 'function') {
                styles = styles.call();
            }
            if (typeof styles == 'string'){
                styles = Ext.util.Format.trim(styles).split(/\s*(?::|;)\s*/);
                for(len = styles.length; i < len;){
                    el.setStyle(styles[i++], styles[i++]);
                }
            } else if (Ext.isObject(styles)) {
                el.setStyle(styles);
            }
        }
    },

    
    insertHtml : function(where, el, html) {
        var hash = {},
            hashVal,
            setStart,
            range,
            frag,
            rangeEl,
            rs;

        where = where.toLowerCase();

        
        hash['beforebegin'] = ['BeforeBegin', 'previousSibling'];
        hash['afterend'] = ['AfterEnd', 'nextSibling'];

        range = el.ownerDocument.createRange();
        setStart = 'setStart' + (this.endRe.test(where) ? 'After' : 'Before');
        if (hash[where]) {
            range[setStart](el);
            frag = range.createContextualFragment(html);
            el.parentNode.insertBefore(frag, where == 'beforebegin' ? el : el.nextSibling);
            return el[(where == 'beforebegin' ? 'previous' : 'next') + 'Sibling'];
        }
        else {
            rangeEl = (where == 'afterbegin' ? 'first' : 'last') + 'Child';
            if (el.firstChild) {
                range[setStart](el[rangeEl]);
                frag = range.createContextualFragment(html);
                if (where == 'afterbegin') {
                    el.insertBefore(frag, el.firstChild);
                }
                else {
                    el.appendChild(frag);
                }
            }
            else {
                el.innerHTML = html;
            }
            return el[rangeEl];
        }

        throw 'Illegal insertion point -> "' + where + '"';
    },

    
    insertBefore : function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'beforebegin');
    },

    
    insertAfter : function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'afterend', 'nextSibling');
    },

    
    insertFirst : function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'afterbegin', 'firstChild');
    },

    
    append : function(el, o, returnElement) {
        return this.doInsert(el, o, returnElement, 'beforeend', '', true);
    },

    
    overwrite : function(el, o, returnElement) {
        el = Ext.getDom(el);
        el.innerHTML = this.markup(o);
        return returnElement ? Ext.get(el.firstChild) : el.firstChild;
    },

    doInsert : function(el, o, returnElement, pos, sibling, append) {
        var newNode = this.insertHtml(pos, Ext.getDom(el), this.markup(o));
        return returnElement ? Ext.get(newNode, true) : newNode;
    }
};


Ext.DomQuery = {
    
    select : function(q, root) {
        var results = [],
            nodes,
            i,
            j,
            qlen,
            nlen;

        root = root || document;
        if (typeof root == 'string') {
            root = document.getElementById(root);
        }

        q = q.split(",");
        for (i = 0, qlen = q.length; i < qlen; i++) {
            if (typeof q[i] == 'string') {
                nodes = root.querySelectorAll(q[i]);

                for (j = 0, nlen = nodes.length; j < nlen; j++) {
                    results.push(nodes[j]);
                }
            }
        }

        return results;
    },

    
    selectNode : function(q, root) {
        return Ext.DomQuery.select(q, root)[0];
    },

    
    is : function(el, q) {
        if (typeof el == "string") {
            el = document.getElementById(el);
        }
        return Ext.DomQuery.select(q).indexOf(el) !== -1;
    }
};

Ext.Element.selectorFunction = Ext.DomQuery.select;
Ext.query = Ext.DomQuery.select;


Ext.Anim = Ext.extend(Object, {
    isAnim: true,
    
    
    disableAnimations: false,


    defaultConfig: {
        
        from: {},

        
        to: {},

        
        duration: 250,

        
        delay: 0,

        
        easing: 'ease-in-out',

        
        autoClear: true,

        
        out: true,

        
        direction: null,

        
        reverse: false
    },

    

    

    opposites: {
        'left': 'right',
        'right': 'left',
        'up': 'down',
        'down': 'up'
    },

    constructor: function(config) {
        config = Ext.apply({}, config || {}, this.defaultConfig);
        this.config = config;

        Ext.Anim.superclass.constructor.call(this);

        this.running = [];
    },

    initConfig : function(el, runConfig) {
        var me = this,
            runtime = {},
            config = Ext.apply({}, runConfig || {}, me.config);

        config.el = el = Ext.get(el);

        if (config.reverse && me.opposites[config.direction]) {
            config.direction = me.opposites[config.direction];
        }

        if (me.config.before) {
            me.config.before.call(config, el, config);
        }

        if (runConfig.before) {
            runConfig.before.call(config.scope || config, el, config);
        }

        return config;
    },
    
    run: function(el, config) {
        el = Ext.get(el);
        config = config || {};


        var me = this,
            style = el.dom.style,
            property,
            after = config.after;

        if (me.running[el.id]) {
            me.onTransitionEnd(null, el, {
                config: config,
                after: after
            });
        }

        config = this.initConfig(el, config);

        if (this.disableAnimations) {
            for (property in config.to) {
                if (!config.to.hasOwnProperty(property)) {
                    continue;
                }
                style[property] = config.to[property];
            }
            this.onTransitionEnd(null, el, {
                config: config,
                after: after
            });
            return me;
        }

        el.un('webkitTransitionEnd', me.onTransitionEnd, me);

        style.webkitTransitionDuration = '0ms';
        for (property in config.from) {
            if (!config.from.hasOwnProperty(property)) {
                continue;
            }
            style[property] = config.from[property];
        }

        setTimeout(function() {
            
            if (!el.dom) {
                return;
            }
            
            
            if (config.is3d === true) {
                el.parent().setStyle({
                    
                    '-webkit-perspective': '1200',
                    '-webkit-transform-style': 'preserve-3d'
                });
            }

            style.webkitTransitionDuration = config.duration + 'ms';
            style.webkitTransitionProperty = 'all';
            style.webkitTransitionTimingFunction = config.easing;

            
            el.on('webkitTransitionEnd', me.onTransitionEnd, me, {
                single: true,
                config: config,
                after: after
            });

            for (property in config.to) {
                if (!config.to.hasOwnProperty(property)) {
                    continue;
                }
                style[property] = config.to[property];
            }
        }, config.delay || 5);

        me.running[el.id] = config;
        return me;
    },

    onTransitionEnd: function(ev, el, o) {
        el = Ext.get(el);

        if (this.running[el.id] === undefined) {
            return;
        }

        var style = el.dom.style,
            config = o.config,
            property,
            me = this;

        if (config.autoClear) {
            for (property in config.to) {
                if (!config.to.hasOwnProperty(property)) {
                    continue;
                }
                style[property] = '';
            }
        }

        style.webkitTransitionDuration = null;
        style.webkitTransitionProperty = null;
        style.webkitTransitionTimingFunction = null;

        if (config.is3d) {
            el.parent().setStyle({
                '-webkit-perspective': '',
                '-webkit-transform-style': ''
            });
        }

        if (me.config.after) {
            me.config.after.call(config, el, config);
        }

        if (o.after) {
            o.after.call(config.scope || me, el, config);
        }

        delete me.running[el.id];
    }
});

Ext.Anim.seed = 1000;


Ext.Anim.run = function(el, anim, config) {
    if (el.isComponent) {
        el = el.el;
    }

    config = config || {};

    if (anim.isAnim) {
        anim.run(el, config);
    }
    else {
        if (Ext.isObject(anim)) {
            if (config.before && anim.before) {
                config.before = Ext.createInterceptor(config.before, anim.before, anim.scope);
            }
            if (config.after && anim.after) {
                config.after = Ext.createInterceptor(config.after, anim.after, anim.scope);
            }
            config = Ext.apply({}, config, anim);
            anim = anim.type;
        }

        if (!Ext.anims[anim]) {
            throw anim + ' is not a valid animation type.';
        }
        else {
            
            if (el && el.dom) {
                Ext.anims[anim].run(el, config);
            }

        }
    }
};


Ext.anims = {
    
    fade: new Ext.Anim({
        before: function(el) {
            var fromOpacity = 1,
                toOpacity = 1,
                curZ = el.getStyle('z-index') == 'auto' ? 0 : el.getStyle('z-index'),
                zIndex = curZ;

            if (this.out) {
                toOpacity = 0;
            } else {
                zIndex = curZ + 1;
                fromOpacity = 0;
            }

            this.from = {
                'opacity': fromOpacity,
                'z-index': zIndex
            };
            this.to = {
                'opacity': toOpacity,
                'z-index': zIndex
            };
        }
    }),

    
    slide: new Ext.Anim({
        direction: 'left',
        cover: false,
        reveal: false,

        before: function(el) {
            var curZ = el.getStyle('z-index') == 'auto' ? 0 : el.getStyle('z-index'),
                zIndex = curZ + 1,
                toX = 0,
                toY = 0,
                fromX = 0,
                fromY = 0,
                elH = el.getHeight(),
                elW = el.getWidth();

            if (this.direction == 'left' || this.direction == 'right') {
                if (this.out == true) {
                    toX = -elW;
                }
                else {
                    fromX = elW;
                }
            }
            else if (this.direction == 'up' || this.direction == 'down') {
                if (this.out == true) {
                    toY = -elH;
                }
                else {
                    fromY = elH;
                }
            }

            if (this.direction == 'right' || this.direction == 'down') {
                toY *= -1;
                toX *= -1;
                fromY *= -1;
                fromX *= -1;
            }

            if (this.cover && this.out) {
                toX = 0;
                toY = 0;
                zIndex = curZ;
            }
            else if (this.reveal && !this.out) {
                fromX = 0;
                fromY = 0;
                zIndex = curZ;
            }

            this.from = {
                '-webkit-transform': 'translate3d(' + fromX + 'px, ' + fromY + 'px, 0)',
                'z-index': zIndex,
                'opacity': 0.99
            };
            this.to = {
                '-webkit-transform': 'translate3d(' + toX + 'px, ' + toY + 'px, 0)',
                'z-index': zIndex,
                'opacity': 1
            };
        }
    }),

    
    pop: new Ext.Anim({
        scaleOnExit: true,
        before: function(el) {
            var fromScale = 1,
                toScale = 1,
                fromOpacity = 1,
                toOpacity = 1,
                curZ = el.getStyle('z-index') == 'auto' ? 0 : el.getStyle('z-index'),
                fromZ = curZ,
                toZ = curZ;

            if (!this.out) {
                fromScale = 0.01;
                fromZ = curZ + 1;
                toZ = curZ + 1;
                fromOpacity = 0;
            }
            else {
                if (this.scaleOnExit) {
                    toScale = 0.01;
                    toOpacity = 0;
                } else {
                    toOpacity = 0.8;
                }
            }

            this.from = {
                '-webkit-transform': 'scale(' + fromScale + ')',
                '-webkit-transform-origin': '50% 50%',
                'opacity': fromOpacity,
                'z-index': fromZ
            };

            this.to = {
                '-webkit-transform': 'scale(' + toScale + ')',
                '-webkit-transform-origin': '50% 50%',
                'opacity': toOpacity,
                'z-index': toZ
            };
        }
    })
};

Ext.apply(Ext.anims, {
    
    flip: new Ext.Anim({
        is3d: true,
        direction: 'left',
        before: function(el) {
            var rotateProp = 'Y',
                fromScale = 1,
                toScale = 1,
                fromRotate = 0,
                toRotate = 0;

            if (this.out) {
                toRotate = -180;
                toScale = 0.8;
            }
            else {
                fromRotate = 180;
                fromScale = 0.8;
            }

            if (this.direction == 'up' || this.direction == 'down') {
                rotateProp = 'X';
            }

            if (this.direction == 'right' || this.direction == 'left') {
                toRotate *= -1;
                fromRotate *= -1;
            }

            this.from = {
                '-webkit-transform': 'rotate' + rotateProp + '(' + fromRotate + 'deg) scale(' + fromScale + ')',
                '-webkit-backface-visibility': 'hidden'
            };
            this.to = {
                '-webkit-transform': 'rotate' + rotateProp + '(' + toRotate + 'deg) scale(' + toScale + ')',
                '-webkit-backface-visibility': 'hidden'
            };
        }
    }),
    
    
    cube: new Ext.Anim({
        is3d: true,
        direction: 'left',
        style: 'outer',
        before: function(el) {
            var origin = '0% 0%',
                fromRotate = 0,
                toRotate = 0,
                rotateProp = 'Y',
                fromZ = 0,
                toZ = 0,
                fromOpacity = 1,
                toOpacity = 1,
                zDepth,
                elW = el.getWidth(),
                elH = el.getHeight(),
                showTranslateZ = true,
                fromTranslate = ' translateX(0)',
                toTranslate = '';

            if (this.direction == 'left' || this.direction == 'right') {
                if (this.out) {
                    origin = '100% 100%';
                    toZ = elW;
                    toOpacity = 0.5;
                    toRotate = -90;
                } else {
                    origin = '0% 0%';
                    fromZ = elW;
                    fromOpacity = 0.5;
                    fromRotate = 90;
                }
            } else if (this.direction == 'up' || this.direction == 'down') {
                rotateProp = 'X';
                if (this.out) {
                    origin = '100% 100%';
                    toZ = elH;
                    toRotate = 90;
                } else {
                    origin = '0% 0%';
                    fromZ = elH;
                    fromRotate = -90;
                }
            }

            if (this.direction == 'down' || this.direction == 'right') {
                fromRotate *= -1;
                toRotate *= -1;
                origin = (origin == '0% 0%') ? '100% 100%': '0% 0%';
            }

            if (this.style == 'inner') {
                fromZ *= -1;
                toZ *= -1;
                fromRotate *= -1;
                toRotate *= -1;

                if (!this.out) {
                    toTranslate = ' translateX(0px)';
                    origin = '0% 50%';
                } else {
                    toTranslate = fromTranslate;
                    origin = '100% 50%';
                }
            }

            this.from = {
                '-webkit-transform': 'rotate' + rotateProp + '(' + fromRotate + 'deg)' + (showTranslateZ ? ' translateZ(' + fromZ + 'px)': '') + fromTranslate,
                '-webkit-transform-origin': origin
            };
            this.to = {
                '-webkit-transform': 'rotate' + rotateProp + '(' + toRotate + 'deg) translateZ(' + toZ + 'px)' + toTranslate,
                '-webkit-transform-origin': origin
            };
        },
        duration: 250
    }),
    
    
    
    wipe: new Ext.Anim({
        before: function(el) {
            var curZ = el.getStyle('z-index'),
                mask = '',
                toSize = '100%',
                fromSize = '100%';

            if (!this.out) {
                zIndex = curZ + 1;
                mask = '-webkit-gradient(linear, left bottom, right bottom, from(transparent), to(#000), color-stop(66%, #000), color-stop(33%, transparent))';
                toSize = el.getHeight() * 100 + 'px';
                fromSize = el.getHeight();

                this.from = {
                    '-webkit-mask-image': mask,
                    '-webkit-mask-size': el.getWidth() * 3 + 'px ' + el.getHeight() + 'px',
                    'z-index': zIndex,
                    '-webkit-mask-position-x': 0
                };
                this.to = {
                    '-webkit-mask-image': mask,
                    '-webkit-mask-size': el.getWidth() * 3 + 'px ' + el.getHeight() + 'px',
                    'z-index': zIndex,
                    '-webkit-mask-position-x': -el.getWidth() * 2 + 'px'
                };
            }
        },
        duration: 500
    })
});


Ext.apply(Ext, {
    
    version : '1.1.0',
    versionDetail : {
        major : 1,
        minor : 1,
        patch : 0
    },
    
    
    setup: function(config) {
        if (config && typeof config == 'object') {
            if (config.addMetaTags !== false) {
                this.addMetaTags(config);
            }

            if (Ext.isFunction(config.onReady)) {
                var me = this;

                Ext.onReady(function() {
                    var args = arguments;

                    if (config.fullscreen !== false) {
                        Ext.Viewport.init(function() {
                            config.onReady.apply(me, args);
                        });
                    }
                    else {
                        config.onReady.apply(this, args);
                    }
                }, config.scope);
            }
        }
    },
    
     
    getDom : function(el) {
        if (!el || !document) {
            return null;
        }

        return el.dom ? el.dom : (typeof el == 'string' ? document.getElementById(el) : el);
    },
    
    
    removeNode : function(node) {
        if (node && node.parentNode && node.tagName != 'BODY') {
            Ext.EventManager.removeAll(node);
            node.parentNode.removeChild(node);
            delete Ext.cache[node.id];
        }
    },
    
    
    addMetaTags: function(config) {
        if (!Ext.isObject(config)) {
            return;
        }
        
        var head = Ext.get(document.getElementsByTagName('head')[0]),
            tag, precomposed;

        
        if (!Ext.is.Desktop) {
            tag = Ext.get(document.createElement('meta'));
            tag.set({
                name: 'viewport',
                content: 'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0;'
            });
            head.appendChild(tag);                    
        }
        
        
        if (Ext.is.iOS) {
                            
            if (config.fullscreen !== false) {
                tag = Ext.get(document.createElement('meta'));
                tag.set({
                    name: 'apple-mobile-web-app-capable',
                    content: 'yes'
                });
                head.appendChild(tag);

                if (Ext.isString(config.statusBarStyle)) {
                    tag = Ext.get(document.createElement('meta'));
                    tag.set({
                        name: 'apple-mobile-web-app-status-bar-style',
                        content: config.statusBarStyle
                    });
                    head.appendChild(tag);
                }
            }
            
            
            if (config.tabletStartupScreen && Ext.is.iPad) {
                tag = Ext.get(document.createElement('link'));
                tag.set({
                    rel: 'apple-touch-startup-image',
                    href: config.tabletStartupScreen
                }); 
                head.appendChild(tag);                  
            }
            
            if (config.phoneStartupScreen && !Ext.is.iPad) {
                tag = Ext.get(document.createElement('link'));
                tag.set({
                    rel: 'apple-touch-startup-image',
                    href: config.phoneStartupScreen
                });
                head.appendChild(tag);
            }
            
            
            if (config.icon) {
                config.phoneIcon = config.tabletIcon = config.icon;
            }
            
            precomposed = (config.glossOnIcon === false) ? '-precomposed' : '';
            if (Ext.is.iPad && Ext.isString(config.tabletIcon)) {
                tag = Ext.get(document.createElement('link'));
                tag.set({
                    rel: 'apple-touch-icon' + precomposed,
                    href: config.tabletIcon
                });
                head.appendChild(tag);
            } 
            else if (!Ext.is.iPad && Ext.isString(config.phoneIcon)) {
                tag = Ext.get(document.createElement('link'));
                tag.set({
                    rel: 'apple-touch-icon' + precomposed,
                    href: config.phoneIcon
                });
                head.appendChild(tag);
            }
        }
    }
});


(function() {
    var initExt = function() {
        
        var bd = Ext.getBody(),
            cls = [];
        if (!bd) {
            return false;
        }
        var Is = Ext.is; 
        if (Is.Phone) {
            cls.push('x-phone');
        }
        else if (Is.Tablet) {
            cls.push('x-tablet');
        }
        else if (Is.Desktop) {
            cls.push('x-desktop');
        }
        if (Is.iPad) {
            cls.push('x-ipad');
        }
        if (Is.iOS) {
            cls.push('x-ios');
        }
        if (Is.Android) {
            cls.push('x-android');
        }
        if (Is.Blackberry) {
            cls.push('x-bb');
        }
        if (Is.Standalone) {
            cls.push('x-standalone');
        }
        if (cls.length) {
            bd.addCls(cls);
        }
        return true;
    };

    if (!initExt()) {
        Ext.onReady(initExt);
    }
})();



Ext.Viewport = new (Ext.extend(Ext.util.Observable, {
    constructor: function() {
        var me = this;

        this.addEvents(
            'orientationchange',
            'resize'
        );

        this.stretchSizes = {};

        if (Ext.supports.OrientationChange) {
            window.addEventListener('orientationchange', Ext.createDelegate(me.onOrientationChange, me), false);
        }
        else {
            window.addEventListener('resize', Ext.createDelegate(me.onResize, me), false);
        }

        if (!Ext.desktop) {
            document.addEventListener('touchstart', Ext.createDelegate(me.onTouchStartCapturing, me), true);
        }
    },

    init: function(fn, scope) {
        var me = this,
            stretchSize = Math.max(window.innerHeight, window.innerWidth) * 2,
            body = Ext.getBody();

        me.updateOrientation();

        this.initialHeight = window.innerHeight;
        this.initialOrientation = this.orientation;

        body.setHeight(stretchSize);

        Ext.gesture.Manager.freeze();

        this.scrollToTop();
        
        
        
        setTimeout(function() {
            me.scrollToTop();
            setTimeout(function() {
                me.scrollToTop();
                me.initialHeight = Math.max(me.initialHeight, window.innerHeight);

                if (fn) {
                    fn.apply(scope || window);
                }

                me.updateBodySize();

                Ext.gesture.Manager.thaw();
            }, 500);
        }, 500);

    },

    scrollToTop: function() {
        if (Ext.is.iOS) {
            if (Ext.is.Phone) {
                document.body.scrollTop = document.body.scrollHeight;
            }
        }
        else if (Ext.is.Blackberry) {
            window.scrollTo(0, 1000);
        }
        else {
            window.scrollTo(0, 1);
        }
    },

    updateBodySize: function() {
        Ext.getBody().setSize(window.innerWidth, window.innerHeight);
    },

    updateOrientation: function() {
        this.lastSize = this.getSize();
        this.orientation = this.getOrientation();
    },

    onTouchStartCapturing: function(e) {
        if (!Ext.currentlyFocusedField && Ext.is.iOS) {
            this.scrollToTop();
        }
    },

    onOrientationChange: function() {
        var me = this,
            body = Ext.getBody();

        if (!Ext.is.Phone) {
            body.setHeight(body.getWidth());

            this.updateOrientation();

            this.fireEvent('orientationchange', this, this.orientation);
            me.scrollToTop();
            me.updateBodySize();
            me.fireResizeEvent();
            Ext.repaint();

            return;
        }

        Ext.gesture.Manager.freeze();

        body.setHeight(body.getWidth());

        this.updateOrientation();

        this.fireEvent('orientationchange', this, this.orientation);

        setTimeout(function() {
            me.scrollToTop();

            setTimeout(function() {
                me.updateBodySize();
                me.fireResizeEvent();

                Ext.gesture.Manager.thaw();

                Ext.repaint();
            }, 200);
        }, 200);
    },

    fireResizeEvent: function() {
        var me = this;

        if (!Ext.is.iOS) {
            if (this.resizeEventTimer) {
                clearTimeout(this.resizeEventTimer);
            }

            this.resizeEventTimer = setTimeout(function() {
                me.fireEvent('resize', me, me.getSize());
            }, 500);
        } else {
            me.fireEvent('resize', me, me.getSize());
        }
    },

    onResize: function() {
        if (this.orientation != this.getOrientation()) {
            this.onOrientationChange();
        } else {
            var size = this.getSize();

            if (!Ext.is.iOS && !Ext.is.Desktop) {
                if ((size.width == this.lastSize.width && size.height > this.lastSize.height) ||
                    (size.height == this.lastSize.height && size.width > this.lastSize.width)) {
                    this.fireEvent('resize', this, size);
                }
            } else {
                this.fireEvent('resize', this, size);
            }
        }
    },

    getSize: function() {
        var size = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        if (!Ext.is.Desktop) {
            size.height = (this.orientation == this.initialOrientation) ?
                            Math.max(this.initialHeight, size.height) :
                            size.height
        }

        return size;
    },

    getOffset: function() {
        return {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    },

    getOrientation: function() {
        var size = this.getSize();

        if (window.hasOwnProperty('orientation')) {
            return (window.orientation == 0 || window.orientation == 180) ? 'portrait' : 'landscape';
        }
        else {
            if (!Ext.is.iOS && !Ext.is.Desktop) {
                if ((size.width == this.lastSize.width && size.height < this.lastSize.height) ||
                    (size.height == this.lastSize.height && size.width < this.lastSize.width)) {
                    return this.orientation;
                }
            }

            return (window.innerHeight > window.innerWidth) ? 'portrait' : 'landscape';
        }

    }

}));


Ext.util.TapRepeater = Ext.extend(Ext.util.Observable, {

    constructor: function(el, config) {
        this.el = Ext.get(el);

        Ext.apply(this, config);

        this.addEvents(
        
        "touchstart",
        
        "tap",
        
        "touchend"
        );

        this.el.on({
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            scope: this
        });

        if (this.preventDefault || this.stopDefault) {
            this.el.on('tap', this.eventOptions, this);
        }

        Ext.util.TapRepeater.superclass.constructor.call(this);
    },

    interval: 10,
    delay: 250,
    preventDefault: true,
    stopDefault: false,
    timer: 0,

    
    eventOptions: function(e) {
        if (this.preventDefault) {
            e.preventDefault();
        }
        if (this.stopDefault) {
            e.stopEvent();
        }
    },

    
    destroy: function() {
        Ext.destroy(this.el);
        this.clearListeners();
    },

    
    onTouchStart: function(e) {
        clearTimeout(this.timer);
        if (this.pressClass) {
            this.el.addCls(this.pressClass);
        }
        this.tapStartTime = new Date();

        this.fireEvent("touchstart", this, e);
        this.fireEvent("tap", this, e);

        
        if (this.accelerate) {
            this.delay = 400;
        }
        this.timer = Ext.defer(this.tap, this.delay || this.interval, this, [e]);
    },

    
    tap: function(e) {
        this.fireEvent("tap", this, e);
        this.timer = Ext.defer(this.tap, this.accelerate ? this.easeOutExpo(Ext.util.Date.getElapsed(this.tapStartTime),
            400,
            -390,
            12000) : this.interval, this, [e]);
    },

    
    
    easeOutExpo: function(t, b, c, d) {
        return (t == d) ? b + c : c * ( - Math.pow(2, -10 * t / d) + 1) + b;
    },

    
    onTouchEnd: function(e) {
        clearTimeout(this.timer);
        this.el.removeCls(this.pressClass);
        this.fireEvent("touchend", this, e);
    }
});











if (!this.JSON) {
    this.JSON = {};
}

(function () {

    function f(n) {
        
        return n < 10 ? '0' + n : n;
    }

    if (typeof Date.prototype.toJSON !== 'function') {

        Date.prototype.toJSON = function (key) {

            return isFinite(this.valueOf()) ?
                   this.getUTCFullYear()   + '-' +
                 f(this.getUTCMonth() + 1) + '-' +
                 f(this.getUTCDate())      + 'T' +
                 f(this.getUTCHours())     + ':' +
                 f(this.getUTCMinutes())   + ':' +
                 f(this.getUTCSeconds())   + 'Z' : null;
        };

        String.prototype.toJSON =
        Number.prototype.toJSON =
        Boolean.prototype.toJSON = function (key) {
            return this.valueOf();
        };
    }

    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
        gap,
        indent,
        meta = {    
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"' : '\\"',
            '\\': '\\\\'
        },
        rep;


    function quote(string) {






        escapable.lastIndex = 0;
        return escapable.test(string) ?
            '"' + string.replace(escapable, function (a) {
                var c = meta[a];
                return typeof c === 'string' ? c :
                    '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' :
            '"' + string + '"';
    }


    function str(key, holder) {



        var i,          
            k,          
            v,          
            length,
            mind = gap,
            partial,
            value = holder[key];



        if (value && typeof value === 'object' &&
                typeof value.toJSON === 'function') {
            value = value.toJSON(key);
        }




        if (typeof rep === 'function') {
            value = rep.call(holder, key, value);
        }



        switch (typeof value) {
        case 'string':
            return quote(value);

        case 'number':



            return isFinite(value) ? String(value) : 'null';

        case 'boolean':
        case 'null':





            return String(value);




        case 'object':




            if (!value) {
                return 'null';
            }



            gap += indent;
            partial = [];



            if (Object.prototype.toString.apply(value) === '[object Array]') {




                length = value.length;
                for (i = 0; i < length; i += 1) {
                    partial[i] = str(i, value) || 'null';
                }




                v = partial.length === 0 ? '[]' :
                    gap ? '[\n' + gap +
                            partial.join(',\n' + gap) + '\n' +
                                mind + ']' :
                          '[' + partial.join(',') + ']';
                gap = mind;
                return v;
            }



            if (rep && typeof rep === 'object') {
                length = rep.length;
                for (i = 0; i < length; i += 1) {
                    k = rep[i];
                    if (typeof k === 'string') {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            } else {



                for (k in value) {
                    if (Object.hasOwnProperty.call(value, k)) {
                        v = str(k, value);
                        if (v) {
                            partial.push(quote(k) + (gap ? ': ' : ':') + v);
                        }
                    }
                }
            }




            v = partial.length === 0 ? '{}' :
                gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' +
                        mind + '}' : '{' + partial.join(',') + '}';
            gap = mind;
            return v;
        }
        return v;
    }



    if (typeof JSON.stringify !== 'function') {
        JSON.stringify = function (value, replacer, space) {







            var i;
            gap = '';
            indent = '';




            if (typeof space === 'number') {
                for (i = 0; i < space; i += 1) {
                    indent += ' ';
                }



            } else if (typeof space === 'string') {
                indent = space;
            }




            rep = replacer;
            if (replacer && typeof replacer !== 'function' &&
                    (typeof replacer !== 'object' ||
                     typeof replacer.length !== 'number')) {
                throw new Error('JSON.stringify');
            }




            return str('', {'': value});
        };
    }




    if (typeof JSON.parse !== 'function') {
        JSON.parse = function (text, reviver) {




            var j;

            function walk(holder, key) {




                var k, v, value = holder[key];
                if (value && typeof value === 'object') {
                    for (k in value) {
                        if (Object.hasOwnProperty.call(value, k)) {
                            v = walk(value, k);
                            if (v !== undefined) {
                                value[k] = v;
                            } else {
                                delete value[k];
                            }
                        }
                    }
                }
                return reviver.call(holder, key, value);
            }






            text = String(text);
            cx.lastIndex = 0;
            if (cx.test(text)) {
                text = text.replace(cx, function (a) {
                    return '\\u' +
                        ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                });
            }














            if (/^[\],:{}\s]*$/.
test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').
replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').
replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {






                j = eval('(' + text + ')');




                return typeof reviver === 'function' ?
                    walk({'': j}, '') : j;
            }



            throw new SyntaxError('JSON.parse');
        };
    }
}());


Ext.util.JSON = {
    encode : function(o) {
        return JSON.stringify(o);
    },

    decode : function(s) {
        return JSON.parse(s);
    }
};


Ext.encode = Ext.util.JSON.encode;

Ext.decode = Ext.util.JSON.decode;

Ext.util.JSONP = {

    
    queue: [],

    
    current: null,

    
    request : function(o) {
        o = o || {};
        if (!o.url) {
            return;
        }

        var me = this;
        o.params = o.params || {};
        if (o.callbackKey) {
            o.params[o.callbackKey] = 'Ext.util.JSONP.callback';
        }
        var params = Ext.urlEncode(o.params);

        var script = document.createElement('script');
        script.type = 'text/javascript';

        this.queue.push({
            url: o.url,
            script: script,
            callback: o.callback || function(){},
            scope: o.scope || window,
            params: params || null
        });

        if (!this.current) {
            this.next();
        }
    },

    
    next : function() {
        this.current = null;
        if (this.queue.length) {
            this.current = this.queue.shift();
            this.current.script.src = this.current.url + (this.current.params ? ('?' + this.current.params) : '');
            document.getElementsByTagName('head')[0].appendChild(this.current.script);
        }
    },

    
    callback: function(json) {
        this.current.callback.call(this.current.scope, json);
        document.getElementsByTagName('head')[0].removeChild(this.current.script);
        this.next();
    }
};


Ext.util.Draggable = Ext.extend(Ext.util.Observable, {
    baseCls: 'x-draggable',

    draggingCls: 'x-dragging',

    proxyCls: 'x-draggable-proxy',

    
    outOfBoundRestrictFactor: 1,

    
    direction: 'both',

    fps: Ext.is.Blackberry ? 25 : ((Ext.is.iOS || Ext.is.Desktop) ? 80 : 50),

    
    constrain: window,

    
    threshold: 0,

    
    delay: 0,

    
    cancelSelector: null,

    
    disabled: false,

    
    revert: false,

    
    group: 'base',

    

    
    useCssTransform: true,

    
    grid: null,
    snap: null,
    proxy: null,
    stack: false,

    
    animationDuration: 300,

    
    updateBoundaryOnTouchStart: true,

    
    
    offsetBoundary: null,

    
    dragging: false,

    
    vertical: false,

    
    horizontal: false,

    
    monitorOrientation: true,

    constructor: function(el, config) {
        this.el = Ext.get(el);
        this.id = el.id;

        config = config || {};

        Ext.apply(this, config);

        this.addEvents(
            
            'offsetchange',

            'offsetboundaryupdate'
        );

        Ext.util.Draggable.superclass.constructor.call(this, config);

        if (this.eventTarget === 'parent') {
            this.eventTarget = this.el.parent();
        } else {
            this.eventTarget = (this.eventTarget) ? Ext.get(this.eventTarget) : this.el;
        }

        if (this.direction == 'both') {
            this.horizontal = true;
            this.vertical = true;
        }
        else if (this.direction == 'horizontal') {
            this.horizontal = true;
        }
        else {
            this.vertical = true;
        }

        this.el.addCls(this.baseCls);

        if (this.proxy) {
            this.getProxyEl().addCls(this.proxyCls);
        }

        this.startEventName = (this.delay > 0) ? 'taphold' : 'dragstart';
        this.dragOptions = (this.delay > 0) ? {holdThreshold: this.delay} : {
            direction: this.direction,
            dragThreshold: this.threshold
        };

        this.container = window;

        if (this.constrain) {
            if (this.constrain === 'parent') {
                this.container = this.el.parent();
            }
            else if (this.constrain !== window) {
                this.container = Ext.get(this.constrain);
            }
        }

        this.offset = new Ext.util.Offset();

        this.linearAnimation = {
            x: new Ext.util.Draggable.Animation.Linear(),
            y: new Ext.util.Draggable.Animation.Linear()
        };

        this.updateBoundary(true);
        this.setDragging(false);

        if (!this.disabled) {
            this.enable();
        }

        return this;
    },

    
    enable: function() {
        return this.setEnabled(true);
    },

    
    disable: function() {
        return this.setEnabled(false);
    },

    
    setEnabled: function(enabled) {
        this.eventTarget[enabled ? 'on' : 'un'](this.startEventName, this.onStart, this, this.dragOptions);
        this.eventTarget[enabled ? 'on' : 'un']('drag', this.onDrag, this, this.dragOptions);
        this.eventTarget[enabled ? 'on' : 'un']('dragend', this.onDragEnd, this, this.dragOptions);
        this.eventTarget[enabled ? 'on' : 'un']('touchstart', this.onTouchStart, this);

        if (enabled) {
            Ext.EventManager.onOrientationChange(this.onOrientationChange, this);
        } else {
            Ext.EventManager.orientationEvent.removeListener(this.onOrientationChange, this);
        }

        this.disabled = !enabled;

        return this;
    },

    
    setUseCssTransform: function(useCssTransform) {
        if (typeof useCssTransform == 'undefined') {
            useCssTransform = true;
        }

        if (useCssTransform != this.useCssTransform) {
            this.useCssTransform = useCssTransform;

            var resetOffset = new Ext.util.Offset();

            if (useCssTransform == false) {
                this.setStyleOffset(this.offset);
                this.setTransformOffset(resetOffset, true);
            } else {
                this.setTransformOffset(this.offset);
                this.setStyleOffset(resetOffset);
            }
        }

        return this;
    },

    
    setOffset: function(offset, animate) {
        if (!this.horizontal) {
            offset.x = 0;
        }

        if (!this.vertical) {
            offset.y = 0;
        }

        if (!(offset instanceof Ext.util.Offset)) {
            offset = Ext.util.Offset.fromObject(offset);
        }

        offset.round();

        if (!this.offset.equals(offset)) {
            if (animate) {
                this.startAnimation(offset, animate);
            }
            else {
                this.offset = offset;
                this.region = new Ext.util.Region(
                    this.initialRegion.top + offset.y,
                    this.initialRegion.right + offset.x,
                    this.initialRegion.bottom + offset.y,
                    this.initialRegion.left + offset.x
                );

                if (this.useCssTransform) {
                    this.setTransformOffset(offset);
                }
                else {
                    this.setStyleOffset(offset);
                }

                this.fireEvent('offsetchange', this, this.offset);
            }
        }


        return this;
    },

    
    setTransformOffset: function(offset, clean) {

        
        if (clean) {
            this.getProxyEl().dom.style.webkitTransform = '';
        } else {
            Ext.Element.cssTranslate(this.getProxyEl(), offset);
        }

        return this;
    },

    
    setStyleOffset: function(offset) {
        var el = this.getProxyEl();

        el.dom.style.left = offset.x + 'px';
        el.dom.style.top = offset.y + 'px';

        return this;
    },

    
    startAnimation: function(offset, animate) {
        var me = this;

        this.stopAnimation();

        var currentTime = Date.now();
        animate = Ext.isNumber(animate) ? animate : this.animationDuration;

        this.linearAnimation.x.set({
            startOffset: this.offset.x,
            endOffset: offset.x,
            startTime: currentTime,
            duration: animate
        });

        this.linearAnimation.y.set({
            startOffset: this.offset.y,
            endOffset: offset.y,
            startTime: currentTime,
            duration: animate
        });

        this.isAnimating = true;

        this.animationTimer = setInterval(function(){
            me.handleAnimationFrame();
        }, this.getFrameDuration());
        return this;
    },

    
    getFrameDuration: function() {
        return 1000 / this.fps;
    },

    
    stopAnimation: function() {
        if (this.isAnimating) {
            clearInterval(this.animationTimer);
            this.isAnimating = false;
            this.setDragging(false);
        }

        return this;
    },

    
    handleAnimationFrame: function() {
        if (!this.isAnimating) {
            return;
        }

        var newOffset = new Ext.util.Offset();
        newOffset.x = this.linearAnimation.x.getOffset();
        newOffset.y = this.linearAnimation.y.getOffset();

        this.setOffset(newOffset);

        if ((newOffset.x === this.linearAnimation.x.endOffset) && (newOffset.y === this.linearAnimation.y.endOffset)) {
            this.stopAnimation();
        }
    },

    
    getOffset: function() {
        var offset = this.offset.copy();
        offset.y = -offset.y;
        offset.x = -offset.x;
        return offset;
    },

    
    updateBoundary: function(init) {
        var offsetBoundary;

        if (typeof init == 'undefined')
            init = false;

        this.size = {
            width: this.el.dom.scrollWidth,
            height: this.el.dom.scrollHeight
        };

        if (this.container === window) {
            this.containerBox = {
                left: 0,
                top: 0,
                right: this.container.innerWidth,
                bottom: this.container.innerHeight,
                width: this.container.innerWidth,
                height: this.container.innerHeight
            };
        }
        else {
            this.containerBox = this.container.getPageBox();
        }

        var elXY = this.el.getXY();

        this.elBox = {
            left: elXY[0] - this.offset.x,
            top: elXY[1] - this.offset.y,
            width: this.size.width,
            height: this.size.height
        };

        this.elBox.bottom = this.elBox.top + this.elBox.height;
        this.elBox.right = this.elBox.left + this.elBox.width;

        this.initialRegion = this.region = new Ext.util.Region(
            elXY[1], elXY[0] + this.elBox.width, elXY[1] + this.elBox.height, elXY[0]
        );

        var top = 0,
            right = 0,
            bottom = 0,
            left = 0;

        if (this.elBox.left < this.containerBox.left) {
            right += this.containerBox.left - this.elBox.left;
        }
        else {
            left -= this.elBox.left - this.containerBox.left;
        }

        if (this.elBox.right > this.containerBox.right) {
            left -= this.elBox.right - this.containerBox.right;
        }
        else {
            right += this.containerBox.right - this.elBox.right;
        }

        if (this.elBox.top < this.containerBox.top) {
            bottom += this.containerBox.top - this.elBox.top;
        }
        else {
            top -= this.elBox.top - this.containerBox.top;
        }

        if (this.elBox.bottom > this.containerBox.bottom) {
            top -= this.elBox.bottom - this.containerBox.bottom;
        }
        else {
            bottom += this.containerBox.bottom - this.elBox.bottom;
        }

        offsetBoundary = new Ext.util.Region(top, right, bottom, left).round();

        if (this.offsetBoundary && this.offsetBoundary.equals(offsetBoundary)) {
            return this;
        }

        this.offsetBoundary = offsetBoundary;

        this.fireEvent('offsetboundaryupdate', this, this.offsetBoundary);

        var currentComputedOffset;

        if (this.useCssTransform) {
            currentComputedOffset = Ext.Element.getComputedTransformOffset(this.getProxyEl());



            if (!this.offset.equals(currentComputedOffset) || init) {
                this.setOffset(currentComputedOffset);
            }
        }

        return this;
    },

    
    onTouchStart: function() {

    },

    
    onStart: function(e) {
        if (this.updateBoundaryOnTouchStart) {
            this.updateBoundary();
        }

        this.stopAnimation();

        this.setDragging(true);
        this.startTouchPoint = new Ext.util.Point(e.startX, e.startY);

        this.startOffset = this.offset.copy();

        this.fireEvent('dragstart', this, e);

        return true;
    },

    
    getNewOffsetFromTouchPoint: function(touchPoint) {
        var xDelta = touchPoint.x - this.startTouchPoint.x,
            yDelta = touchPoint.y - this.startTouchPoint.y,
            newOffset = this.offset.copy();

        if(xDelta == 0 && yDelta == 0) {
            return newOffset;
        }

        if (this.horizontal)
            newOffset.x = this.startOffset.x + xDelta;

        if (this.vertical)
            newOffset.y = this.startOffset.y + yDelta;

        return newOffset;
    },

    
    onDrag: function(e) {
        if (!this.dragging) {
            return;
        }

        this.lastTouchPoint = Ext.util.Point.fromEvent(e);
        var newOffset = this.getNewOffsetFromTouchPoint(this.lastTouchPoint);

        if (this.offsetBoundary != null) {
            newOffset = this.offsetBoundary.restrict(newOffset, this.outOfBoundRestrictFactor);
        }

        this.setOffset(newOffset);

        this.fireEvent('drag', this, e);

        
        
        return true;
    },

    
    onDragEnd: function(e) {
        if (this.dragging) {
            this.fireEvent('beforedragend', this, e);

            if (this.revert && !this.cancelRevert) {
                this.setOffset(this.startOffset, true);
            } else {
                this.setDragging(false);
            }

            this.fireEvent('dragend', this, e);
        }

        
        
        return true;
    },

    
    onOrientationChange: function() {
        this.updateBoundary();
    },

    
    setDragging: function(dragging) {
        if (dragging) {
            if (!this.dragging) {
                this.dragging = true;
                this.getProxyEl().addCls(this.draggingCls);
            }
        } else {
            if (this.dragging) {
                this.dragging = false;
                this.getProxyEl().removeCls(this.draggingCls);
            }
        }

        return this;
    },

    
    getProxyEl: function() {
        return this.proxy || this.el;
    },

    
    destroy: function() {
        this.el.removeCls(this.baseCls);
        this.getProxyEl().removeCls(this.proxyCls);
        this.clearListeners();
        this.disable();
    },

    
    reset: function() {
        this.startOffset = new Ext.util.Offset(0, 0);
        this.setOffset(this.startOffset);

        var oldInitialRegion = this.initialRegion.copy();

        this.updateBoundary();
        this.initialRegion = this.region = this.getProxyEl().getPageBox(true);
        this.startTouchPoint.x += this.initialRegion.left - oldInitialRegion.left;
        this.startTouchPoint.y += this.initialRegion.top - oldInitialRegion.top;
    },

    
    moveTo: function(x, y) {
        this.setOffset(new Ext.util.Offset(x - this.initialRegion.left, y - this.initialRegion.top));
        return this;
    },

    
    isDragging: function() {
        return this.dragging;
    },

    
    isVertical : function() {
        return this.vertical;
    },

    
    isHorizontal : function() {
        return this.horizontal;
    }
});

Ext.util.Draggable.Animation = {};


Ext.util.Draggable.Animation.Abstract = Ext.extend(Object, {
    
    startTime: null,

    
    startOffset: 0,

    
    constructor: function(config) {
        config = config || {};

        this.set(config);

        if (!this.startTime)
            this.startTime = Date.now();
    },

    
    set: function(name, value) {
        if (Ext.isObject(name)) {
            Ext.apply(this, name);
        }
        else {
            this[name] = value;
        }

        return this;
    },

    
    getOffset: Ext.emptyFn
});


Ext.util.Draggable.Animation.Linear = Ext.extend(Ext.util.Draggable.Animation.Abstract, {
    
    duration: 0,

    
    endOffset: 0,

    getOffset : function() {
        var distance = this.endOffset - this.startOffset,
            deltaTime = Date.now() - this.startTime,
            omegaTime = Math.min(1, (deltaTime / this.duration));

        return this.startOffset + (omegaTime * distance);
    }
});


Ext.util.Droppable = Ext.extend(Ext.util.Observable, {
    baseCls: 'x-droppable',
    
    activeCls: 'x-drop-active',
    
    invalidCls: 'x-drop-invalid',
    
    hoverCls: 'x-drop-hover',

    
    validDropMode: 'intersect',

    
    disabled: false,

    
    group: 'base',

    
    tolerance: null,


    
    monitoring: false,
    
    
    constructor : function(el, config) {
        config = config || {};
        Ext.apply(this, config);

        this.addEvents(
            
            'dropactivate',

            
            'dropdeactivate',

            
            'dropenter',

            
            'dropleave',

            
            'drop'
        );

        this.el = Ext.get(el);
        Ext.util.Droppable.superclass.constructor.call(this);

        if (!this.disabled) {
            this.enable();
        }

        this.el.addCls(this.baseCls);
    },

    
    onDragStart : function(draggable, e) {
        if (draggable.group === this.group) {
            this.monitoring = true;
            this.el.addCls(this.activeCls);
            this.region = this.el.getPageBox(true);

            draggable.on({
                drag: this.onDrag,
                beforedragend: this.onBeforeDragEnd,
                dragend: this.onDragEnd,
                scope: this
            });

            if (this.isDragOver(draggable)) {
                this.setCanDrop(true, draggable, e);
            }

            this.fireEvent('dropactivate', this, draggable, e);
        }
        else {
            draggable.on({
                dragend: function() {
                    this.el.removeCls(this.invalidCls);
                },
                scope: this,
                single: true
            });
            this.el.addCls(this.invalidCls);
        }
    },

    
    isDragOver : function(draggable, region) {
        return this.region[this.validDropMode](draggable.region);
    },

    
    onDrag : function(draggable, e) {
        this.setCanDrop(this.isDragOver(draggable), draggable, e);
    },

    
    setCanDrop : function(canDrop, draggable, e) {
        if (canDrop && !this.canDrop) {
            this.canDrop = true;
            this.el.addCls(this.hoverCls);
            this.fireEvent('dropenter', this, draggable, e);
        }
        else if (!canDrop && this.canDrop) {
            this.canDrop = false;
            this.el.removeCls(this.hoverCls);
            this.fireEvent('dropleave', this, draggable, e);
        }
    },

    
    onBeforeDragEnd: function(draggable, e) {
        draggable.cancelRevert = this.canDrop;
    },

    
    onDragEnd : function(draggable, e) {
        this.monitoring = false;
        this.el.removeCls(this.activeCls);

        draggable.un({
            drag: this.onDrag,
            beforedragend: this.onBeforeDragEnd,
            dragend: this.onDragEnd,
            scope: this
        });


        if (this.canDrop) {
            this.canDrop = false;
            this.el.removeCls(this.hoverCls);
            this.fireEvent('drop', this, draggable, e);
        }

        this.fireEvent('dropdeactivate', this, draggable, e);
    },

    
    enable : function() {
        if (!this.mgr) {
            this.mgr = Ext.util.Observable.observe(Ext.util.Draggable);
        }
        this.mgr.on({
            dragstart: this.onDragStart,
            scope: this
        });
        this.disabled = false;
    },

    
    disable : function() {
        this.mgr.un({
            dragstart: this.onDragStart,
            scope: this
        });
        this.disabled = true;
    },
    
    
    isDisabled : function() {
        return this.disabled;
    },
    
    
    isMonitoring : function() {
        return this.monitoring;
    }
});

(function(){

Ext.ScrollManager = new Ext.AbstractManager();


Ext.util.ScrollView = Ext.extend(Ext.util.Observable, {

    
    useIndicators: true,

    
    indicatorConfig: {},

    
    indicatorMargin: 4,

    constructor: function(el, config) {
        var indicators = [],
            directions = ['vertical', 'horizontal'];

        Ext.util.ScrollView.superclass.constructor.call(this);

        ['useIndicators', 'indicatorConfig', 'indicatorMargin'].forEach(function(c) {
            if (config.hasOwnProperty(c)) {
                this[c] = config[c];
                delete config[c];
            }
        }, this);

        config.scrollView = this;
        this.scroller = new Ext.util.Scroller(el, config);

        if (this.useIndicators === true) {
            directions.forEach(function(d) {
                if (this.scroller[d]) {
                    indicators.push(d);
                }
            }, this);
        } else if (directions.indexOf(this.useIndicators) !== -1) {
            indicators.push(this.useIndicators);
        }

        this.indicators = {};
        this.indicatorOffsetExtras = {};

        indicators.forEach(function(i) {
            this.indicators[i] = new Ext.util.Scroller.Indicator(this.scroller.container, Ext.apply({}, this.indicatorConfig, {type: i}));
        }, this);

        this.mon(this.scroller, {
            scrollstart: this.onScrollStart,
            scrollend: this.onScrollEnd,
            scroll: this.onScroll,
            scope: this
        });
    },

    
    onScrollStart: function() {
        this.showIndicators();
    },

    
    onScrollEnd: function() {
        this.hideIndicators();
    },

    
    onScroll: function(scroller) {
        if (scroller.offsetBoundary == null || (!this.indicators.vertical && !this.indicators.horizontal))
            return;

        var sizeAxis,
            offsetAxis,
            offsetMark,
            boundary = scroller.offsetBoundary,
            offset = scroller.offset;

        this.containerSize = scroller.containerBox;
        this.scrollerSize = scroller.size;
        this.outOfBoundOffset = boundary.getOutOfBoundOffset(offset);
        this.restrictedOffset = boundary.restrict(offset);
        this.boundarySize = boundary.getSize();

        if (!this.indicatorSizes) {
            this.indicatorSizes = {vertical: 0, horizontal: 0};
        }

        if (!this.indicatorOffsets) {
            this.indicatorOffsets = {vertical: 0, horizontal: 0};
        }

        Ext.iterate(this.indicators, function(axis, indicator) {
            sizeAxis = (axis == 'vertical') ? 'height' : 'width';
            offsetAxis = (axis == 'vertical') ? 'y' : 'x';
            offsetMark = (axis == 'vertical') ? 'bottom' : 'right';

            if (this.scrollerSize[sizeAxis] < this.containerSize[sizeAxis]) {
                this.indicatorSizes[axis] = this.containerSize[sizeAxis] * (this.scrollerSize[sizeAxis] / this.containerSize[sizeAxis]);
            }
            else {
                this.indicatorSizes[axis] = this.containerSize[sizeAxis] * (this.containerSize[sizeAxis] / this.scrollerSize[sizeAxis]);
            }
            this.indicatorSizes[axis] -= Math.abs(this.outOfBoundOffset[offsetAxis]);
            this.indicatorSizes[axis] = Math.max(this.indicatorMargin * 4, this.indicatorSizes[axis]);

            if (this.boundarySize[sizeAxis] != 0) {
                this.indicatorOffsets[axis] = (((boundary[offsetMark] - this.restrictedOffset[offsetAxis]) / this.boundarySize[sizeAxis])
                                              * (this.containerSize[sizeAxis] - this.indicatorSizes[axis]));
            } else if (offset[offsetAxis] < boundary[offsetMark]) {
                this.indicatorOffsets[axis] = this.containerSize[sizeAxis] - this.indicatorSizes[axis];
            } else {
                this.indicatorOffsets[axis] = 0;
            }

            indicator.setOffset(this.indicatorOffsetExtras[axis] + this.indicatorOffsets[axis] + this.indicatorMargin);
            indicator.setSize(this.indicatorSizes[axis] - (this.indicatorMargin * 2));
        }, this);
    },

    
    showIndicators : function() {
        Ext.iterate(this.indicators, function(axis, indicator) {
            indicator.show();
            this.indicatorOffsetExtras[axis] = indicator.el.dom.parentNode[axis === 'vertical' ? 'scrollTop' : 'scrollLeft'];
        }, this);

        return this;
    },

     
    hideIndicators : function() {
        Ext.iterate(this.indicators, function(axis, indicator) {
            indicator.hide();
        }, this);
    },

    
    destroy: function() {
        this.scroller.destroy();

        if (this.indicators) {
            Ext.iterate(this.indicators, function(axis, indicator) {
                indicator.destroy();
            }, this);
        }

        return Ext.util.ScrollView.superclass.destroy.apply(this, arguments);
    }
});


Ext.util.Scroller = Ext.extend(Ext.util.Draggable, {
    
    baseCls: '',

    
    draggingCls: '',

    
    direction: 'both',

    
    constrain: 'parent',

    
    outOfBoundRestrictFactor: 0.5,

    
    acceleration: 20,

    
    

    autoAdjustFps: false,

    
    friction: 0.5,

    
    startMomentumResetTime: 350,

    
    springTension: 0.3,

    
    minVelocityForAnimation: 1,

    
    bounces: true,

    
    momentum: true,

    cancelRevert: true,

    threshold: 5,

    constructor: function(el, config) {
        el = Ext.get(el);

        var scroller = Ext.ScrollManager.get(el.id);
        if (scroller) {
            return Ext.apply(scroller, config);
        }

        Ext.util.Scroller.superclass.constructor.apply(this, arguments);

        this.addEvents(
            
            'scrollstart',
            
            'scroll',
            
            'scrollend',
            
             'bouncestart',
             
             'bounceend'
        );

        this.on({
            dragstart: this.onDragStart,
            offsetchange: this.onOffsetChange,
            scope: this
        });

        Ext.ScrollManager.register(this);

        this.el.addCls('x-scroller');
        this.container.addCls('x-scroller-parent');

        if (this.bounces !== false) {
            var both = this.bounces === 'both' || this.bounces === true,
                horizontal = both || this.bounces === 'horizontal',
                vertical = both || this.bounces === 'vertical';

            this.bounces = {
                x: horizontal,
                y: vertical
            };
        }

        this.theta = Math.log(1 - (this.friction / 10));
        this.bouncingVelocityFactor = this.springTension * Math.E;
        this.bouncingTimeFactor = ((1 / this.springTension) * this.acceleration);

        if (!this.decelerationAnimation) {
            this.decelerationAnimation = {};
        }

        if (!this.bouncingAnimation) {
            this.bouncingAnimation = {};
        }

        ['x', 'y'].forEach(function(a) {
            if (!this.decelerationAnimation[a]) {
                this.decelerationAnimation[a] = new Ext.util.Scroller.Animation.Deceleration({
                    acceleration: this.acceleration,
                    theta: this.theta
                });
            }

            if (!this.bouncingAnimation[a]) {
                this.bouncingAnimation[a] = new Ext.util.Scroller.Animation.Bouncing({
                    acceleration: this.acceleration,
                    springTension: this.springTension
                });
            }
        }, this);

        return this;
    },

    
    updateBoundary: function(animate) {
        Ext.util.Scroller.superclass.updateBoundary.apply(this, arguments);

        this.snapToBoundary(animate);

        return this;
    },

    
    onOffsetChange: function(scroller, offset) {
        this.fireEvent('scroll', scroller, {
            x: -offset.x,
            y: -offset.y
        });
    },

    
    onTouchStart: function(e) {
        Ext.util.Scroller.superclass.onTouchStart.apply(this, arguments);

        this.stopMomentumAnimation();
    },

    
    onDragStart: function(e) {
        this.fireEvent('scrollstart', this, e);
    },

    
    setStartTime: function(e) {
        this.startTime = e.time;
        this.originalStartTime = (e.event.originalTimeStamp) ? e.event.originalTimeStamp : e.time;
    },

    
    onStart: function(e) {
        if (Ext.util.Scroller.superclass.onStart.apply(this, arguments) !== true)
            return;

        this.setStartTime(e);
        this.lastEventTime = e.time;
        this.startTimeOffset = this.offset.copy();
        this.isScrolling = true;

        this.momentumAnimationFramesHandled = 0;
    },

    
    onDrag: function(e) {
        if (Ext.util.Scroller.superclass.onDrag.apply(this, arguments) !== true)
            return;

        this.lastEventTime = e.time;

        if (this.lastEventTime - this.startTime > this.startMomentumResetTime) {
            this.setStartTime(e);
            this.startTimeOffset = this.offset.copy();
        }
    },

    
    onDragEnd: function(e) {
        if (Ext.util.Scroller.superclass.onDragEnd.apply(this, arguments) !== true)
            return;

        if (!this.startMomentumAnimation(e)) {
            this.fireScrollEndEvent();
        }
    },

    
    onOrientationChange: function() {
        Ext.util.Scroller.superclass.onOrientationChange.apply(this, arguments);

        this.snapToBoundary();
    },

    
    fireScrollEndEvent: function() {
        this.isScrolling = false;
        this.isMomentumAnimating = false;
        this.snapToBoundary();
        this.fireEvent('scrollend', this, this.getOffset());

        this.snapToSlot();
    },


    
    getLastActualFps: function() {
        var duration = (this.momentumAnimationEndTime - this.momentumAnimationStartTime - this.momentumAnimationProcessingTime) / 1000;
        return this.momentumAnimationFramesHandled / duration;
    },

    
    scrollTo: function(pos, animate) {
        this.stopMomentumAnimation();

        var newOffset = this.offsetBoundary.restrict(new Ext.util.Offset(-pos.x, -pos.y));

        this.setOffset(newOffset, animate);

        return this;
    },

    
    scrollBy: function(offset, animate) {
        this.stopMomentumAnimation();

        var newOffset = this.offset.copy();
        newOffset.x += offset.x;
        newOffset.y += offset.y;

        this.setOffset(newOffset, animate);

        return this;
    },

    
    setSnap: function(snap) {
        this.snap = snap;
    },

    
    snapToBoundary: function(animate) {
        var offset = this.offsetBoundary.restrict(this.offset);
        this.setOffset(offset, animate);

        return this;
    },

    snapToSlot: function() {
        var offset = this.offsetBoundary.restrict(this.offset);
        offset.round();

        if (this.snap) {
            if (this.snap === true) {
                this.snap = {
                    x: 50,
                    y: 50
                };
            }
            else if (Ext.isNumber(this.snap)) {
                this.snap = {
                    x: this.snap,
                    y: this.snap
                };
            }
            if (this.snap.y) {
                offset.y = Math.round(offset.y / this.snap.y) * this.snap.y;
            }
            if (this.snap.x) {
                offset.x = Math.round(offset.x / this.snap.x) * this.snap.x;
            }

            if (!this.offset.equals(offset)) {
                this.scrollTo({x: -offset.x, y: -offset.y}, this.snapDuration);
            }
        }
    },

    
    startMomentumAnimation: function(e) {
        var me = this,
            originalTime = (e.event.originalTimeStamp) ? e.event.originalTimeStamp : e.time,
            duration = Math.max(40, originalTime - this.originalStartTime);

        this.fireEvent('beforemomentumanimationstart');

        if (
            (!this.momentum || !(duration <= this.startMomentumResetTime)) &&
            !this.offsetBoundary.isOutOfBound(this.offset)
        ) {
            return false;
        }

        
        var minVelocity = this.minVelocityForAnimation,
            currentVelocity,
            currentOffset = this.offset.copy(),
            restrictedOffset,
            acceleration = (duration / this.acceleration);

        this.isBouncing = {x: false, y: false};
        this.isDecelerating = {x: false, y: false};
        this.momentumAnimationStartTime = e.time;
        this.momentumAnimationProcessingTime = 0;
        this.bouncingData = {x: null, y: null};

        
        this.momentumAnimationStartVelocity = {
            x: (this.offset.x - this.startTimeOffset.x) / acceleration,
            y: (this.offset.y - this.startTimeOffset.y) / acceleration
        };

        this.momentumAnimationStartOffset = currentOffset;

        ['x', 'y'].forEach(function(axis) {

            this.isDecelerating[axis] = (Math.abs(this.momentumAnimationStartVelocity[axis]) > minVelocity);

            if (this.bounces && this.bounces[axis]) {
                restrictedOffset = this.offsetBoundary.restrict(axis, currentOffset[axis]);

                if (restrictedOffset !== currentOffset[axis]) {
                    currentVelocity = (currentOffset[axis] - restrictedOffset) * this.bouncingVelocityFactor;

                    this.bouncingData[axis] = {
                        axis: axis,
                        offset: restrictedOffset,
                        time: this.momentumAnimationStartTime,
                        velocity: currentVelocity
                    };

                    this.isBouncing[axis] = true;
                    this.isDecelerating[axis] = false;

                    this.fireEvent('bouncestart', this, this.bouncingData[axis]);

                    this.bouncingAnimation[axis].set({
                        startTime: this.bouncingData[axis].time - this.bouncingTimeFactor,
                        startOffset: this.bouncingData[axis].offset,
                        startVelocity: this.bouncingData[axis].velocity
                    });
                }
            }

            if (this.isDecelerating[axis]) {
                this.decelerationAnimation[axis].set({
                    startVelocity: this.momentumAnimationStartVelocity[axis],
                    startOffset: this.momentumAnimationStartOffset[axis],
                    startTime: this.momentumAnimationStartTime
                });
            }
        }, this);

        if (this.isDecelerating.x || this.isDecelerating.y || this.isBouncing.x || this.isBouncing.y) {
            this.isMomentumAnimating = true;
            this.momentumAnimationFramesHandled = 0;
            this.fireEvent('momentumanimationstart');

            me.handleMomentumAnimationFrame();
            this.momentumAnimationTimer = setInterval(function() {
                me.handleMomentumAnimationFrame();
            }, this.getFrameDuration());
            return true;
        }

        return false;
    },

    
    stopMomentumAnimation: function() {
        if (this.isMomentumAnimating) {
            if (this.momentumAnimationTimer) {
                clearInterval(this.momentumAnimationTimer);
            }
            this.momentumAnimationEndTime = Date.now();

            var lastFps = this.getLastActualFps();

            if (!this.maxFps || lastFps > this.maxFps) {
                this.maxFps = lastFps;
            }

            if (this.autoAdjustFps) {
                this.fps = this.maxFps;
            }

            this.isDecelerating = {};
            this.isBouncing = {};

            this.fireEvent('momentumanimationend');
            this.fireScrollEndEvent();

        }

        return this;
    },

    
    handleMomentumAnimationFrame : function() {
        if (!this.isMomentumAnimating) {
            return;
        }

        var currentTime = Date.now(),
            newOffset = this.offset.copy(),
            offsetBoundary = this.offsetBoundary,
            currentVelocity,
            restrictedOffset,
            outOfBoundDistance;

        ['x', 'y'].forEach(function(axis) {
            if (this.isDecelerating[axis]) {
                newOffset[axis] = this.decelerationAnimation[axis].getOffset();
                currentVelocity = this.momentumAnimationStartVelocity[axis] * this.decelerationAnimation[axis].getFrictionFactor();
                outOfBoundDistance = offsetBoundary.getOutOfBoundOffset(axis, newOffset[axis]);

                
                if (outOfBoundDistance !== 0) {
                    restrictedOffset = offsetBoundary.restrict(axis, newOffset[axis]);

                    if (this.bounces && this.bounces[axis]) {
                        this.bouncingData[axis] = {
                            axis: axis,
                            offset: restrictedOffset,
                            time: currentTime,
                            velocity: currentVelocity
                        };

                        this.fireEvent('bouncestart', this, this.bouncingData[axis]);

                        this.bouncingAnimation[axis].set({
                            startTime: this.bouncingData[axis].time,
                            startOffset: this.bouncingData[axis].offset,
                            startVelocity: this.bouncingData[axis].velocity
                        });
                        this.isBouncing[axis] = true;
                    }

                    this.isDecelerating[axis] = false;
                }
                else if (Math.abs(currentVelocity) <= 1) {
                    this.isDecelerating[axis] = false;
                }
            }
            else if (this.isBouncing[axis]) {
                newOffset[axis] = this.bouncingAnimation[axis].getOffset();
                restrictedOffset = offsetBoundary.restrict(axis, newOffset[axis]);

                if (Math.abs(newOffset[axis] - restrictedOffset) <= 1) {
                    this.isBouncing[axis] = false;
                    this.fireEvent('bounceend', this, {axis: axis});
                    newOffset[axis] = restrictedOffset;
                }
            }
        }, this);

        if (!this.isDecelerating.x && !this.isDecelerating.y && !this.isBouncing.x && !this.isBouncing.y) {
            this.stopMomentumAnimation();
            return;
        }

        this.momentumAnimationFramesHandled++;
        this.momentumAnimationProcessingTime += Date.now() - currentTime;

        this.setOffset(newOffset);
    },

    
    destroy: function() {
        Ext.ScrollManager.unregister(this);
        return Ext.util.Scroller.superclass.destroy.apply(this, arguments);
    }
});

Ext.util.Scroller.Animation = {};

Ext.util.Scroller.Animation.Deceleration = Ext.extend(Ext.util.Draggable.Animation.Abstract, {
    acceleration: 30,
    theta: null,
    startVelocity: null,

    getOffset: function() {
        return this.startOffset - this.startVelocity * (1 - this.getFrictionFactor()) / this.theta;
    },

    getFrictionFactor : function() {
        var deltaTime = Date.now() - this.startTime;

        return Math.exp(deltaTime / this.acceleration * this.theta);
    }
});

Ext.util.Scroller.Animation.Bouncing = Ext.extend(Ext.util.Draggable.Animation.Abstract, {
    springTension: 0.3,
    acceleration: 30,
    startVelocity: null,

    getOffset: function() {
        var deltaTime = (Date.now() - this.startTime),
            powTime = (deltaTime / this.acceleration) * Math.pow(Math.E, -this.springTension * (deltaTime / this.acceleration));

        return this.startOffset + (this.startVelocity * powTime);
    }
});


Ext.util.Scroller.Indicator = Ext.extend(Object, {
    baseCls: 'x-scrollbar',

    ui: 'dark',

    
    type: 'horizontal',

    constructor: function(container, config) {
        this.container = container;

        Ext.apply(this, config);

        this.el = this.container.createChild({
            cls: [this.baseCls, this.baseCls + '-' + this.type, this.baseCls + '-' + this.ui].join(' ')
        });

        this.offset = new Ext.util.Offset();

        this.hide();
    },

    
    hide: function() {
        var me = this;

        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
        }

        this.hideTimer = setTimeout(function() {
            me.el.setStyle('opacity', 0);
        }, 100);

        return this;
    },

    
    show: function() {
        if (this.hideTimer) {
            clearTimeout(this.hideTimer);
        }

        this.el.setStyle('opacity', 1);

        return this;
    },

    
    setVisibility: function(isVisible) {
        return this[isVisible ? 'show' : 'hide']();
    },

    
    setSize: function(size) {
        if (this.size && size > this.size) {
            size = Math.round(size);
        }

        
        this.el.dom.style[(this.type == 'horizontal') ? 'width' : 'height'] = size + 'px';

        this.size = size;

        return this;
    },

    
    setOffset: function(offset) {
        if (this.type == 'vertical') {
            this.offset.y = offset;
        } else {
            this.offset.x = offset;
        }

        if (!Ext.is.iOS && !Ext.is.Desktop) {
            if (this.type == 'vertical') {
                this.el.dom.style.top = this.offset.y + 'px';
            } else {
                this.el.dom.style.left = this.offset.x + 'px';
            }
        } else {
            Ext.Element.cssTranslate(this.el, this.offset);
        }

        return this;
    }

});

})();


Ext.util.Sortable = Ext.extend(Ext.util.Observable, {
    baseCls: 'x-sortable',

    
    direction: 'vertical',

    
    cancelSelector: null,

    
    
    
    

    
    constrain: window,
    
    group: 'base',

    
    revert: true,

    
    itemSelector: null,

    
    handleSelector: null,

    
    disabled: false,

    
    delay: 0,

    

    
    sorting: false,

    
    vertical: false,

    
    vertical: false,
    
    constructor : function(el, config) {
        config = config || {};
        Ext.apply(this, config);

        this.addEvents(
            
            'sortstart',
            
            'sortend',
            
            'sortchange'

            
            
            
            
            
            
            
            
        );

        this.el = Ext.get(el);
        Ext.util.Sortable.superclass.constructor.call(this);

        if (this.direction == 'horizontal') {
            this.horizontal = true;
        }
        else if (this.direction == 'vertical') {
            this.vertical = true;
        }
        else {
            this.horizontal = this.vertical = true;
        }

        this.el.addCls(this.baseCls);
        this.startEventName = (this.delay > 0) ? 'taphold' : 'tapstart';
        if (!this.disabled) {
            this.enable();
        }
    },

    
    onStart : function(e, t) {
        if (this.cancelSelector && e.getTarget(this.cancelSelector)) {
            return;
        }
        if (this.handleSelector && !e.getTarget(this.handleSelector)) {
            return;
        }
        
        if (!this.sorting) {
            this.onSortStart(e, t);
        }
    },

    
    onSortStart : function(e, t) {
        this.sorting = true;
        var draggable = new Ext.util.Draggable(t, {
            threshold: 0,
            revert: this.revert,
            direction: this.direction,
            constrain: this.constrain === true ? this.el : this.constrain,
            animationDuration: 100
        });
        draggable.on({
            drag: this.onDrag,
            dragend: this.onDragEnd,
            scope: this
        });
        
        this.dragEl = t;
        this.calculateBoxes();

        if (!draggable.dragging) {
            draggable.onStart(e);
        }
        
        this.fireEvent('sortstart', this, e);
    },

    
    calculateBoxes : function() {
        this.items = [];
        var els = this.el.select(this.itemSelector, false),
            ln = els.length, i, item, el, box;

        for (i = 0; i < ln; i++) {
            el = els[i];
            if (el != this.dragEl) {
                item = Ext.fly(el).getPageBox(true);
                item.el = el;
                this.items.push(item);
            }
        }
    },

    
    onDrag : function(draggable, e) {
        var items = this.items,
            ln = items.length,
            region = draggable.region,
            sortChange = false,
            i, intersect, overlap, item;
            
        for (i = 0; i < ln; i++) {
            item = items[i];
            intersect = region.intersect(item);
            if (intersect) {
                if (this.vertical && Math.abs(intersect.top - intersect.bottom) > (region.bottom - region.top) / 2) {
                    if (region.bottom > item.top && item.top > region.top) {
                        draggable.el.insertAfter(item.el);
                    }
                    else {
                        draggable.el.insertBefore(item.el);
                    }
                    sortChange = true;
                }
                else if (this.horizontal && Math.abs(intersect.left - intersect.right) > (region.right - region.left) / 2) {
                    if (region.right > item.left && item.left > region.left) {
                        draggable.el.insertAfter(item.el);
                    }
                    else {
                        draggable.el.insertBefore(item.el);
                    }
                    sortChange = true;
                }

                if (sortChange) {
                    
                    draggable.reset();

                    
                    
                    draggable.moveTo(region.left, region.top);

                    
                    this.calculateBoxes();
                    this.fireEvent('sortchange', this, draggable.el, this.el.select(this.itemSelector, false).indexOf(draggable.el.dom));
                    return;
                }
            }
        }
    },

    
    onDragEnd : function(draggable, e) {
        draggable.destroy();
        this.sorting = false;
        this.fireEvent('sortend', this, draggable, e);
    },

    
    enable : function() {
        this.el.on(this.startEventName, this.onStart, this, {delegate: this.itemSelector, holdThreshold: this.delay});
        this.disabled = false;
    },

    
    disable : function() {
        this.el.un(this.startEventName, this.onStart, this);
        this.disabled = true;
    },
    
    
    isDisabled : function() {
        return this.disabled;
    },
    
    
    isSorting : function() {
        return this.sorting;
    },
    
    
    isVertical : function() {
        return this.vertical;
    },
    
    
    isHorizontal : function() {
        return this.horizontal;
    }    
});




 (function() {

    
    Date.useStrict = false;


    
    
    
    function xf(format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/\{(\d+)\}/g,
        function(m, i) {
            return args[i];
        });
    }


    
    Date.formatCodeToRegex = function(character, currentGroup) {
        
        var p = Date.parseCodes[character];

        if (p) {
            p = typeof p == 'function' ? p() : p;
            Date.parseCodes[character] = p;
            
        }

        return p ? Ext.applyIf({
            c: p.c ? xf(p.c, currentGroup || "{0}") : p.c
        },
        p) : {
            g: 0,
            c: null,
            s: Ext.util.Format.escapeRegex(character)
            
        };
    };

    
    var $f = Date.formatCodeToRegex;

    Ext.apply(Date, {
        
        parseFunctions: {
            "M$": function(input, strict) {
                
                
                var re = new RegExp('\\/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\/');
                var r = (input || '').match(re);
                return r ? new Date(((r[1] || '') + r[2]) * 1) : null;
            }
        },
        parseRegexes: [],

        
        formatFunctions: {
            "M$": function() {
                
                return '\\/Date(' + this.getTime() + ')\\/';
            }
        },

        y2kYear: 50,

        
        MILLI: "ms",

        
        SECOND: "s",

        
        MINUTE: "mi",

        
        HOUR: "h",

        
        DAY: "d",

        
        MONTH: "mo",

        
        YEAR: "y",

        
        defaults: {},

        
        dayNames: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
        ],

        
        monthNames: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
        ],

        
        monthNumbers: {
            Jan: 0,
            Feb: 1,
            Mar: 2,
            Apr: 3,
            May: 4,
            Jun: 5,
            Jul: 6,
            Aug: 7,
            Sep: 8,
            Oct: 9,
            Nov: 10,
            Dec: 11
        },

        
        getShortMonthName: function(month) {
            return Date.monthNames[month].substring(0, 3);
        },

        
        getShortDayName: function(day) {
            return Date.dayNames[day].substring(0, 3);
        },

        
        getMonthNumber: function(name) {
            
            return Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
        },

        
        formatCodes: {
            d: "Ext.util.Format.leftPad(this.getDate(), 2, '0')",
            D: "Date.getShortDayName(this.getDay())",
            
            j: "this.getDate()",
            l: "Date.dayNames[this.getDay()]",
            N: "(this.getDay() ? this.getDay() : 7)",
            S: "this.getSuffix()",
            w: "this.getDay()",
            z: "this.getDayOfYear()",
            W: "Ext.util.Format.leftPad(this.getWeekOfYear(), 2, '0')",
            F: "Date.monthNames[this.getMonth()]",
            m: "Ext.util.Format.leftPad(this.getMonth() + 1, 2, '0')",
            M: "Date.getShortMonthName(this.getMonth())",
            
            n: "(this.getMonth() + 1)",
            t: "this.getDaysInMonth()",
            L: "(this.isLeapYear() ? 1 : 0)",
            o: "(this.getFullYear() + (this.getWeekOfYear() == 1 && this.getMonth() > 0 ? +1 : (this.getWeekOfYear() >= 52 && this.getMonth() < 11 ? -1 : 0)))",
            Y: "this.getFullYear()",
            y: "('' + this.getFullYear()).substring(2, 4)",
            a: "(this.getHours() < 12 ? 'am' : 'pm')",
            A: "(this.getHours() < 12 ? 'AM' : 'PM')",
            g: "((this.getHours() % 12) ? this.getHours() % 12 : 12)",
            G: "this.getHours()",
            h: "Ext.util.Format.leftPad((this.getHours() % 12) ? this.getHours() % 12 : 12, 2, '0')",
            H: "Ext.util.Format.leftPad(this.getHours(), 2, '0')",
            i: "Ext.util.Format.leftPad(this.getMinutes(), 2, '0')",
            s: "Ext.util.Format.leftPad(this.getSeconds(), 2, '0')",
            u: "Ext.util.Format.leftPad(this.getMilliseconds(), 3, '0')",
            O: "this.getGMTOffset()",
            P: "this.getGMTOffset(true)",
            T: "this.getTimezone()",
            Z: "(this.getTimezoneOffset() * -60)",

            c: function() {
                
                for (var c = "Y-m-dTH:i:sP", code = [], i = 0, l = c.length; i < l; ++i) {
                    var e = c.charAt(i);
                    code.push(e == "T" ? "'T'": Date.getFormatCode(e));
                    
                }
                return code.join(" + ");
            },
            

            U: "Math.round(this.getTime() / 1000)"
        },

        
        isValid: function(y, m, d, h, i, s, ms) {
            
            h = h || 0;
            i = i || 0;
            s = s || 0;
            ms = ms || 0;

            var dt = new Date(y, m - 1, d, h, i, s, ms);

            return y == dt.getFullYear() &&
            m == dt.getMonth() + 1 &&
            d == dt.getDate() &&
            h == dt.getHours() &&
            i == dt.getMinutes() &&
            s == dt.getSeconds() &&
            ms == dt.getMilliseconds();
        },

        
        parseDate: function(input, format, strict) {
            var p = Date.parseFunctions;
            if (p[format] == null) {
                Date.createParser(format);
            }
            return p[format](input, Ext.isDefined(strict) ? strict: Date.useStrict);
        },

        
        getFormatCode: function(character) {
            var f = Date.formatCodes[character];

            if (f) {
                f = typeof f == 'function' ? f() : f;
                Date.formatCodes[character] = f;
                
            }

            
            return f || ("'" + Ext.util.Format.escape(character) + "'");
        },

        
        createFormat: function(format) {
            var code = [],
            special = false,
            ch = '';

            for (var i = 0; i < format.length; ++i) {
                ch = format.charAt(i);
                if (!special && ch == "\\") {
                    special = true;
                } else if (special) {
                    special = false;
                    code.push("'" + Ext.util.Format.escape(ch) + "'");
                } else {
                    code.push(Date.getFormatCode(ch));
                }
            }
            Date.formatFunctions[format] = new Function("return " + code.join('+'));
        },

        
        createParser: function() {
            var code = [
            "var dt, y, m, d, h, i, s, ms, o, z, zz, u, v,",
            "def = Date.defaults,",
            "results = String(input).match(Date.parseRegexes[{0}]);",
            
            "if(results){",
            "{1}",

            "if(u != null){",
            
            "v = new Date(u * 1000);",
            
            "}else{",
            
            
            
            "dt = (new Date()).clearTime();",

            
            "y = Ext.num(y, Ext.num(def.y, dt.getFullYear()));",
            "m = Ext.num(m, Ext.num(def.m - 1, dt.getMonth()));",
            "d = Ext.num(d, Ext.num(def.d, dt.getDate()));",

            
            "h  = Ext.num(h, Ext.num(def.h, dt.getHours()));",
            "i  = Ext.num(i, Ext.num(def.i, dt.getMinutes()));",
            "s  = Ext.num(s, Ext.num(def.s, dt.getSeconds()));",
            "ms = Ext.num(ms, Ext.num(def.ms, dt.getMilliseconds()));",

            "if(z >= 0 && y >= 0){",
            
            
            
            "v = new Date(y, 0, 1, h, i, s, ms);",

            
            "v = !strict? v : (strict === true && (z <= 364 || (v.isLeapYear() && z <= 365))? v.add(Date.DAY, z) : null);",
            "}else if(strict === true && !Date.isValid(y, m + 1, d, h, i, s, ms)){",
            
            "v = null;",
            
            "}else{",
            
            "v = new Date(y, m, d, h, i, s, ms);",
            "}",
            "}",
            "}",

            "if(v){",
            
            "if(zz != null){",
            
            "v = v.add(Date.SECOND, -v.getTimezoneOffset() * 60 - zz);",
            "}else if(o){",
            
            "v = v.add(Date.MINUTE, -v.getTimezoneOffset() + (sn == '+'? -1 : 1) * (hr * 60 + mn));",
            "}",
            "}",

            "return v;"
            ].join('\n');

            return function(format) {
                var regexNum = Date.parseRegexes.length,
                currentGroup = 1,
                calc = [],
                regex = [],
                special = false,
                ch = "",
                i = 0,
                obj,
                last;

                for (; i < format.length; ++i) {
                    ch = format.charAt(i);
                    if (!special && ch == "\\") {
                        special = true;
                    } else if (special) {
                        special = false;
                        regex.push(Ext.util.Format.escape(ch));
                    } else {
                        obj = $f(ch, currentGroup);
                        currentGroup += obj.g;
                        regex.push(obj.s);
                        if (obj.g && obj.c) {
                            if (obj.last) {
                                last = obj;
                            } else {
                                calc.push(obj.c);
                            }
                        }
                    }
                }
                
                if (last) {
                    calc.push(last);
                }

                Date.parseRegexes[regexNum] = new RegExp("^" + regex.join('') + "$");
                Date.parseFunctions[format] = new Function("input", "strict", xf(code, regexNum, calc.join('')));
            };
        }(),

        
        parseCodes: {
            
            d: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
                
            },
            j: {
                g: 1,
                c: "d = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,2})"
                
            },
            D: function() {
                for (var a = [], i = 0; i < 7; a.push(Date.getShortDayName(i)), ++i);
                
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + a.join("|") + ")"
                };
            },
            l: function() {
                return {
                    g: 0,
                    c: null,
                    s: "(?:" + Date.dayNames.join("|") + ")"
                };
            },
            N: {
                g: 0,
                c: null,
                s: "[1-7]"
                
            },
            S: {
                g: 0,
                c: null,
                s: "(?:st|nd|rd|th)"
            },
            w: {
                g: 0,
                c: null,
                s: "[0-6]"
                
            },
            z: {
                g: 1,
                c: "z = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,3})"
                
            },
            W: {
                g: 0,
                c: null,
                s: "(?:\\d{2})"
                
            },
            F: function() {
                return {
                    g: 1,
                    c: "m = parseInt(Date.getMonthNumber(results[{0}]), 10);\n",
                    
                    s: "(" + Date.monthNames.join("|") + ")"
                };
            },
            M: function() {
                for (var a = [], i = 0; i < 12; a.push(Date.getShortMonthName(i)), ++i);
                
                return Ext.applyIf({
                    s: "(" + a.join("|") + ")"
                },
                $f("F"));
            },
            m: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(\\d{2})"
                
            },
            n: {
                g: 1,
                c: "m = parseInt(results[{0}], 10) - 1;\n",
                s: "(\\d{1,2})"
                
            },
            t: {
                g: 0,
                c: null,
                s: "(?:\\d{2})"
                
            },
            L: {
                g: 0,
                c: null,
                s: "(?:1|0)"
            },
            o: function() {
                return $f("Y");
            },
            Y: {
                g: 1,
                c: "y = parseInt(results[{0}], 10);\n",
                s: "(\\d{4})"
                
            },
            y: {
                g: 1,
                c: "var ty = parseInt(results[{0}], 10);\n"
                + "y = ty > Date.y2kYear ? 1900 + ty : 2000 + ty;\n",
                
                s: "(\\d{1,2})"
            },
            a: function(){
                return $f("A");
            },
            A: {
                
                calcLast: true,
                g: 1,
                c: "if (results[{0}] == 'AM') {\n"
                    + "if (!h || h == 12) { h = 0; }\n"
                    + "} else { if (!h || h < 12) { h = (h || 0) + 12; }}",
                s: "(AM|PM)"
            },
            g: function() {
                return $f("G");
            },
            G: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(\\d{1,2})"
                
            },
            h: function() {
                return $f("H");
            },
            H: {
                g: 1,
                c: "h = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
                
            },
            i: {
                g: 1,
                c: "i = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
                
            },
            s: {
                g: 1,
                c: "s = parseInt(results[{0}], 10);\n",
                s: "(\\d{2})"
                
            },
            u: {
                g: 1,
                c: "ms = results[{0}]; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n",
                s: "(\\d+)"
                
            },
            O: {
                g: 1,
                c: [
                "o = results[{0}];",
                "var sn = o.substring(0,1),",
                
                "hr = o.substring(1,3)*1 + Math.floor(o.substring(3,5) / 60),",
                
                "mn = o.substring(3,5) % 60;",
                
                "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.util.Format.leftPad(hr, 2, '0') + Ext.util.Format.leftPad(mn, 2, '0')) : null;\n"
                
                ].join("\n"),
                s: "([+\-]\\d{4})"
                
            },
            P: {
                g: 1,
                c: [
                "o = results[{0}];",
                "var sn = o.substring(0,1),",
                
                "hr = o.substring(1,3)*1 + Math.floor(o.substring(4,6) / 60),",
                
                "mn = o.substring(4,6) % 60;",
                
                "o = ((-12 <= (hr*60 + mn)/60) && ((hr*60 + mn)/60 <= 14))? (sn + Ext.util.Format.leftPad(hr, 2, '0') + Ext.util.Format.leftPad(mn, 2, '0')) : null;\n"
                
                ].join("\n"),
                s: "([+\-]\\d{2}:\\d{2})"
                
            },
            T: {
                g: 0,
                c: null,
                s: "[A-Z]{1,4}"
                
            },
            Z: {
                g: 1,
                c: "zz = results[{0}] * 1;\n"
                
                + "zz = (-43200 <= zz && zz <= 50400)? zz : null;\n",
                s: "([+\-]?\\d{1,5})"
                
            },
            c: function() {
                var calc = [],
                arr = [
                $f("Y", 1),
                
                $f("m", 2),
                
                $f("d", 3),
                
                $f("h", 4),
                
                $f("i", 5),
                
                $f("s", 6),
                
                {
                    c: "ms = results[7] || '0'; ms = parseInt(ms, 10)/Math.pow(10, ms.length - 3);\n"
                },
                
                {
                    c: [
                    
                    "if(results[8]) {",
                    
                    "if(results[8] == 'Z'){",
                    "zz = 0;",
                    
                    "}else if (results[8].indexOf(':') > -1){",
                    $f("P", 8).c,
                    
                    "}else{",
                    $f("O", 8).c,
                    
                    "}",
                    "}"
                    ].join('\n')
                }
                ];

                for (var i = 0, l = arr.length; i < l; ++i) {
                    calc.push(arr[i].c);
                }

                return {
                    g: 1,
                    c: calc.join(""),
                    s: [
                    arr[0].s,
                    
                    "(?:", "-", arr[1].s,
                    
                    "(?:", "-", arr[2].s,
                    
                    "(?:",
                    "(?:T| )?",
                    
                    arr[3].s, ":", arr[4].s,
                    
                    "(?::", arr[5].s, ")?",
                    
                    "(?:(?:\\.|,)(\\d+))?",
                    
                    "(Z|(?:[-+]\\d{2}(?::)?\\d{2}))?",
                    
                    ")?",
                    ")?",
                    ")?"
                    ].join("")
                };
            },
            U: {
                g: 1,
                c: "u = parseInt(results[{0}], 10);\n",
                s: "(-?\\d+)"
                
            }
        }
    });

} ());

Ext.apply(Date.prototype, {
    
    dateFormat: function(format) {
        if (Date.formatFunctions[format] == null) {
            Date.createFormat(format);
        }
        return Date.formatFunctions[format].call(this);
    },

    
    getTimezone: function() {
        
        
        
        
        
        
        
        
        
        
        
        
        return this.toString().replace(/^.* (?:\((.*)\)|([A-Z]{1,4})(?:[\-+][0-9]{4})?(?: -?\d+)?)$/, "$1$2").replace(/[^A-Z]/g, "");
    },

    
    getGMTOffset: function(colon) {
        return (this.getTimezoneOffset() > 0 ? "-": "+")
        + Ext.util.Format.leftPad(Math.floor(Math.abs(this.getTimezoneOffset()) / 60), 2, "0")
        + (colon ? ":": "")
        + Ext.util.Format.leftPad(Math.abs(this.getTimezoneOffset() % 60), 2, "0");
    },

    
    getDayOfYear: function() {
        var num = 0,
        d = this.clone(),
        m = this.getMonth(),
        i;

        for (i = 0, d.setDate(1), d.setMonth(0); i < m; d.setMonth(++i)) {
            num += d.getDaysInMonth();
        }
        return num + this.getDate() - 1;
    },

    
    getWeekOfYear: function() {
        
        var ms1d = 864e5,
        
        ms7d = 7 * ms1d;
        
        return function() {
            
            var DC3 = Date.UTC(this.getFullYear(), this.getMonth(), this.getDate() + 3) / ms1d,
            
            AWN = Math.floor(DC3 / 7),
            
            Wyr = new Date(AWN * ms7d).getUTCFullYear();

            return AWN - Math.floor(Date.UTC(Wyr, 0, 7) / ms7d) + 1;
        };
    }(),

    
    isLeapYear: function() {
        var year = this.getFullYear();
        return !! ((year & 3) == 0 && (year % 100 || (year % 400 == 0 && year)));
    },

    
    getFirstDayOfMonth: function() {
        var day = (this.getDay() - (this.getDate() - 1)) % 7;
        return (day < 0) ? (day + 7) : day;
    },

    
    getLastDayOfMonth: function() {
        return this.getLastDateOfMonth().getDay();
    },


    
    getFirstDateOfMonth: function() {
        return new Date(this.getFullYear(), this.getMonth(), 1);
    },

    
    getLastDateOfMonth: function() {
        return new Date(this.getFullYear(), this.getMonth(), this.getDaysInMonth());
    },

    
    getDaysInMonth: function() {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        return function() {
            
            var m = this.getMonth();

            return m == 1 && this.isLeapYear() ? 29: daysInMonth[m];
        };
    }(),

    
    getSuffix: function() {
        switch (this.getDate()) {
        case 1:
        case 21:
        case 31:
            return "st";
        case 2:
        case 22:
            return "nd";
        case 3:
        case 23:
            return "rd";
        default:
            return "th";
        }
    },

    
    clone: function() {
        return new Date(this.getTime());
    },

    
    isDST: function() {
        
        
        return new Date(this.getFullYear(), 0, 1).getTimezoneOffset() != this.getTimezoneOffset();
    },

    
    clearTime: function(clone) {
        if (clone) {
            return this.clone().clearTime();
        }

        
        var d = this.getDate();

        
        this.setHours(0);
        this.setMinutes(0);
        this.setSeconds(0);
        this.setMilliseconds(0);

        if (this.getDate() != d) {
            
            
            
            
            for (var hr = 1, c = this.add(Date.HOUR, hr); c.getDate() != d; hr++, c = this.add(Date.HOUR, hr));

            this.setDate(d);
            this.setHours(c.getHours());
        }

        return this;
    },

    
    add: function(interval, value) {
        var d = this.clone();
        if (!interval || value === 0) return d;

        switch (interval.toLowerCase()) {
        case Date.MILLI:
            d.setMilliseconds(this.getMilliseconds() + value);
            break;
        case Date.SECOND:
            d.setSeconds(this.getSeconds() + value);
            break;
        case Date.MINUTE:
            d.setMinutes(this.getMinutes() + value);
            break;
        case Date.HOUR:
            d.setHours(this.getHours() + value);
            break;
        case Date.DAY:
            d.setDate(this.getDate() + value);
            break;
        case Date.MONTH:
            var day = this.getDate();
            if (day > 28) {
                day = Math.min(day, this.getFirstDateOfMonth().add('mo', value).getLastDateOfMonth().getDate());
            }
            d.setDate(day);
            d.setMonth(this.getMonth() + value);
            break;
        case Date.YEAR:
            d.setFullYear(this.getFullYear() + value);
            break;
        }
        return d;
    },

    
    between: function(start, end) {
        var t = this.getTime();
        return start.getTime() <= t && t <= end.getTime();
    }
});



Date.prototype.format = Date.prototype.dateFormat;




Ext.data.Connection = Ext.extend(Ext.util.Observable, {
    method: 'post',
    url: null,

    
    disableCaching: true,

    
    disableCachingParam: '_dc',

    
    timeout : 30000,

    useDefaultHeader : true,
    defaultPostHeader : 'application/x-www-form-urlencoded; charset=UTF-8',
    useDefaultXhrHeader : true,
    defaultXhrHeader : 'XMLHttpRequest',

    constructor : function(config) {
        config = config || {};
        Ext.apply(this, config);

        this.addEvents(
            
            'beforerequest',
            
            'requestcomplete',
            
            'requestexception'
        );
        this.requests = {};
        Ext.data.Connection.superclass.constructor.call(this);
    },

    
    request : function(o) {
        var me = this;
        if (me.fireEvent('beforerequest', me, o) !== false) {
            var params      = o.params,
                url         = o.url || me.url,
                urlParams   = o.urlParams,
                extraParams = me.extraParams,
                request, data, headers,
                method, key, xhr;

            
            if (Ext.isFunction(params)) {
                params = params.call(o.scope || window, o);
            }

            
            if (Ext.isFunction(url)) {
                url = url.call(o.scope || window, o);
            }

            
            data = o.rawData || o.xmlData || o.jsonData || null;
            if (o.jsonData && !Ext.isPrimitive(o.jsonData)) {
                data = Ext.encode(data);
            }
            
            
            params = Ext.urlEncode(extraParams, Ext.isObject(params) ? Ext.urlEncode(params) : params);
            
            urlParams = Ext.isObject(urlParams) ? Ext.urlEncode(urlParams) : urlParams;

            
            method = (o.method || ((params || data) ? 'POST' : 'GET')).toUpperCase();

            
            if (method === 'GET' && o.disableCaching !== false && me.disableCaching) {
                url = Ext.urlAppend(url, o.disableCachingParam || me.disableCachingParam + '=' + (new Date().getTime()));
            }

            
            if ((method == 'GET' || data) && params){
                url = Ext.urlAppend(url, params);
                params = null;
            }

            
            if (urlParams) {
                url = Ext.urlAppend(url, urlParams);
            }

            
            if (o.autoAbort === true || me.autoAbort) {
                me.abort();
            }

            
            xhr = this.getXhrInstance();

            
            xhr.open(method.toUpperCase(), url, true);

            
            headers = Ext.apply({}, o.headers || {}, me.defaultHeaders || {});
            if (!headers['Content-Type'] && (data || params)) {
                var contentType = me.defaultPostHeader,
                    jsonData    = o.jsonData,
                    xmlData     = o.xmlData;
                
                if (data) {
                    if (o.rawData) {
                        contentType = 'text/plain';
                    } else {
                        if (xmlData && Ext.isDefined(xmlData)) {
                            contentType = 'text/xml';
                        } else if (jsonData && Ext.isDefined(jsonData)) {
                            contentType = 'application/json';
                        }
                    }
                }
                headers['Content-Type'] = contentType;
            }
            if (me.useDefaultXhrHeader && !headers['X-Requested-With']) {
                headers['X-Requested-With'] = me.defaultXhrHeader;
            }
            
            for (key in headers) {
                if (headers.hasOwnProperty(key)) {
                    try {
                        xhr.setRequestHeader(key, headers[key]);
                    }
                    catch(e) {
                        me.fireEvent('exception', key, headers[key]);
                    }                    
                }
            }

            
            request = {
                id: ++Ext.data.Connection.requestId,
                xhr: xhr,
                headers: headers,
                options: o,
                timeout: setTimeout(function() {
                    request.timedout = true;
                    me.abort(request);
                }, o.timeout || me.timeout)
            };
            me.requests[request.id] = request;

            
            xhr.onreadystatechange = Ext.createDelegate(me.onStateChange, me, [request]);

            
            xhr.send(data || params || null);
            return request;
        } else {
            return o.callback ? o.callback.apply(o.scope, [o, undefined, undefined]) : null;
        }
    },

    getXhrInstance : function() {
        return new XMLHttpRequest();
    },
    
    
    isLoading : function(r) {
        
        return r && !{0:true, 4:true}[r.xhr.readyState];
    },

    
    abort : function(r) {
        if (r && this.isLoading(r)) {
            if (!request.timedout) {
                request.aborted = true;
            }
            
            r.xhr.abort();
        }
        else if (!r) {
            var id;
            for(id in this.requests) {
                if (!this.requests.hasOwnProperty(id)) {
                    continue;
                }
                this.abort(this.requests[id]);
            }
        }
    },

    
    onStateChange : function(r) {
        if (r.xhr.readyState == 4) {
            clearTimeout(r.timeout);
            delete r.timeout;
            this.onComplete(r);
        }
    },

    
    onComplete : function(r) {
        var status = r.xhr.status,
            options = r.options,
            success = true,
            response;

        if ((status >= 200 && status < 300) || status == 304) {
            response = this.createResponse(r);
            this.fireEvent('requestcomplete', this, response, options);
            if (options.success) {
                if (!options.scope) {
                    options.success(response, options);
                }
                else {
                    options.success.call(options.scope, response, options);
                }
            }
        }
        else {
            success = false;
            switch (status) {
                case 12002:
                case 12029:
                case 12030:
                case 12031:
                case 12152:
                case 13030:
                    response = this.createException(r);
                    break;
                default:
                    response = this.createResponse(r);
            }
            this.fireEvent('requestexception', this, response, options);
            if (options.failure) {
                if (!options.scope) {
                    options.failure(response, options);
                }
                else {
                    options.failure.call(options.scope, response, options);
                }
            }
        }

        if (options.callback) {
            if (!options.scope) {
                options.callback(options, success, response);
            }
            else {
                options.callback.call(options.scope, options, success, response);
            }
        }
        
        delete this.requests[r.id];
    },

    
    createResponse : function(r) {
        var xhr = r.xhr,
            headers = {},
            lines = xhr.getAllResponseHeaders().replace(/\r\n/g, '\n').split('\n'),
            count = lines.length,
            line, index, key, value;

        while (count--) {
            line = lines[count];
            index = line.indexOf(':');
            if(index >= 0) {
                key = line.substr(0, index).toLowerCase();
                if (line.charAt(index + 1) == ' ') {
                    ++index;
                }
                headers[key] = line.substr(index + 1);
            }
        }

        delete r.xhr;

        return {
            request: r,
            requestId : r.id,
            status : xhr.status,
            statusText : xhr.statusText,
            getResponseHeader : function(header){ return headers[header.toLowerCase()]; },
            getAllResponseHeaders : function(){ return headers; },
            responseText : xhr.responseText,
            responseXML : xhr.responseXML
        };
    },

    
    createException : function(r) {
        return {
            request : r,
            requestId : r.id,
            status : r.aborted ? -1 : 0,
            statusText : r.aborted ? 'transaction aborted' : 'communication failure',
            aborted: r.aborted,
            timedout: r.timedout
        };
    }
});

Ext.data.Connection.requestId = 0;


Ext.Ajax = new Ext.data.Connection({
    
    
    
    
    
    

    

    
    
    
    
    
    

    
    autoAbort : false
});


Ext.util.EventSimulator = Ext.extend(Object, {

    supportedEvents: {
        touch: ['touchstart', 'touchmove', 'touchend', 'gesturestart', 'gesturechange', 'gestureend'],
        mouse: ['mousedown', 'mousemove', 'mouseup', 'click']
    },

    getEventTypeByName: function(name) {
        var ret = null;

        Ext.iterate(this.supportedEvents, function(type, events) {
            if (events.indexOf(name) != -1)
                ret = type;
        });

        return ret;
    },

    fire: function(type, target, options) {
        type = type.toLowerCase();

        if (arguments.length == 2) {
            options = target;
            target = document;
        }

        switch(this.getEventTypeByName(type)) {
            case 'touch':
                this.fireTouchEvent.call(this, type, target, options);
                break;

            case 'mouse':
                this.fireMouseEvent.call(this, type, target, options);
                break;

            default:
                throw new Error("Event type " + type + " is currently not supported");
        }

        return this;
    },

    createEvent: function(data, serializable) {

    },

    createEventData: function(event, serializable) {
        switch (this.getEventTypeByName(event.type)) {
            case 'touch':
                return this.createTouchEventData(event.type, event.target, event, serializable);
                break;

            case 'mouse':
                return this.createMouseEventData(event.type, event.target, event, serializable);
                break;

            default:
                throw new Error("Event type " + event.type + " is currently not supported");
        }
    },

    

    fireTouchEvent: function(type, target, options) {
        var touchEventData = this.createTouchEventData(type, target, options);

        var touchEvent = this.createTouchEvent(type, touchEventData);
        touchEvent.isSimulated = true;

        return target.dispatchEvent(touchEvent);
    },

    createTouchEventData: function(type, target, options, serializable) {
        var touchEventData = {
            type: type,
            timeStamp: Date.now(),
            bubbles: true,
            cancelable: true,
            detail: 1, 
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            scale: 1,
            rotation: 0
        };

        if (!serializable) {
            touchEventData.target = target;
            touchEventData.view = document.defaultView;
        }

        if (options) {
            Ext.iterate(touchEventData, function(key, value) {
                if (options.hasOwnProperty(key)) {
                    touchEventData[key] = options[key];
                }
            });
        }
        
        ['touches', 'targetTouches', 'changedTouches'].forEach(function(touchListName) {
            if (options.hasOwnProperty(touchListName)) {
                touchEventData[touchListName] = this.createTouchList(options[touchListName], target, serializable);
            }
            else {
                touchEventData[touchListName] = this.createTouchList(touchEventData, target, serializable);
            }
        }, this);

        return touchEventData;
    },

    createTouchEvent: function(type, data) {
        if (typeof type != 'string') {
            data = type;
            type = type.type;
        }

        var touchEvent = document.createEvent('TouchEvent');

        if (touchEvent.initTouchEvent.length == 9) {
            touchEvent.initTouchEvent(data.touches, data.targetTouches, data.changedTouches,
                type, data.view, data.screenX, data.screenY, data.clientX, data.clientY);

        } else {
            touchEvent.initTouchEvent(type, data.bubbles, data.cancelable, data.view,
                data.detail, data.screenX, data.screenY, data.pageX, data.pageY, data.ctrlKey,
                data.altKey, data.shiftKey, data.metaKey, data.touches, data.targetTouches,
                data.changedTouches, data.scale, data.rotation);
        }

        return touchEvent;
    },

    createTouch: function(target, options, serializable) {
		if (!document.createTouch || serializable) {
			return {
                pageX: options.pageX,
                pageY: options.pageY,
                clientX: options.pageX,
                clientY: options.pageY,
                screenX: options.pageX,
                screenY: options.pageY,
                identifier: +options.identifier || 0
            };
		}
		
        return document.createTouch(
            document.defaultView,
            target,
            +options.identifier || 0,
            +options.pageX || 0,
            +options.pageY || 0,
            +options.screenX || 0,
            +options.screenY || 0);
    },

    createTouchList: function(data, target, serializable) {
        var touch,
            touches = [];

        if (Ext.isObject(data) && typeof data.target != 'undefined') {
            data = [data];
        }

        if (data) {
            for (var i = 0; i < data.length; i++) {
                if (!serializable && !data[i].target) {
                    data[i].target = target;
                }

                touch = this.createTouch(data[i].target, data[i], serializable);
                touches.push(touch);
            }
        }

		if (!document.createTouchList || serializable) {
			return touches;
		}
		
        return document.createTouchList.apply(document, touches);
    },

    

    fireMouseEvent: function(type, target, options) {
        var eventData = this.createMouseEventData(type, target, options);

        var event = this.createMouseEvent(type, eventData);
        event.isSimulated = true;
        event.originalTimeStamp = eventData.timeStamp;
        
        return target.dispatchEvent(event);
    },

    createMouseEventData: function(type, target, options, serializable) {
        var mouseEventData = {
            type: type,
            timeStamp: Date.now(),
            bubbles: true, 
            cancelable: (type != 'mousemove'), 
            detail: 1, 
            screenX: 0,
            screenY: 0,
            pageX: 0,
            pageY: 0,
            clientX: 0,
            clientY: 0,
            ctrlKey: false,
            altKey: false,
            shiftKey: false,
            metaKey: false,
            button: 0,
            relatedTarget: null
        }, 
        coordProperties = ['screen', 'client', 'page'],
        coords = {
            x: 0,
            y: 0
        };
        
        if (!serializable) {
            mouseEventData.target = target;
            mouseEventData.view = window;
        }

        if (options) {
            Ext.iterate(mouseEventData, function(key, value) {
                if (options.hasOwnProperty(key)) {
                    mouseEventData[key] = options[key];
                }
            });
        }

        coordProperties.forEach(function(p) {
            if (mouseEventData[p + 'X'] != 0) {
                coords.x = mouseEventData[p + 'X']
            }

            if (mouseEventData[p + 'Y'] != 0) {
                coords.y = mouseEventData[p + 'Y']
            }
        });

        coordProperties.forEach(function(p) {
            if (mouseEventData[p + 'X'] == 0 && coords.x != 0) {
                mouseEventData[p + 'X'] = coords.x;
            }

            if (mouseEventData[p + 'Y'] == 0 && coords.y != 0) {
                mouseEventData[p + 'Y'] = coords.y;
            }
        });

        return mouseEventData;
    },

    createMouseEvent: function(type, data) {
        var mouseEvent = document.createEvent('MouseEvents');

        mouseEvent.initMouseEvent(
            type, data.bubbles, data.cancelable, data.view, data.detail,
            data.screenX, data.screenY, data.clientX, data.clientY,
            data.ctrlKey, data.altKey, data.shiftKey, data.metaKey,
            data.button, data.relatedTarget);

        return mouseEvent;
    }

});

Ext.util.EventRecorder = Ext.extend(Ext.util.Observable, {

    eventCollection: null,

    currentEventSetName: null,

    constructor: function() {
        this.addEvents(
            'replaystart',
            'beforecalculatetarget',
            'beforefire',
            'afterfire',
            'aftercalculatetarget',
            'replayend',
            'interrupted'
        );

        this.eventSets = {};
        this.interruptedIndexes = {};

        return this;
    },

    getEventSet: function(name) {
        if (typeof name != 'string') {
            if (this.currentEventSetName == null)
                throw new Error('No EventSet is currently used');

            name = this.currentEventSetName;
        }

        if (typeof this.eventSets[name] == 'undefined') {
            this.eventSets[name] = [];
        }
        return this.eventSets[name];
    },

    start: function(name) {
        this.currentEventSetName = name;
    },

    record: function(name, event) {
        if (typeof name != 'string') {
            
            if (this.currentEventSetName == null)
                return;

            event = name;
            name = this.currentEventSetName;
        }

        var eventData = this.getEventSimulator().createEventData(event, true);

        this.getEventSet(name).push(eventData);
    },

    setEventSet: function(name, events) {
        this.eventSets[name] = events;
    },

    erase: function(name) {
        
        this.getEventSet(name).length = 0;
    },

    stopReplay: function() {
        this.interruptFlag = true;
    },

    resumeReplay: function(name) {
        var index = this.interruptedIndexes[name] || 0;
        this.replay(name, index);
    },

    replay: function(name, startIndex) {
        var simulator = this.getEventSimulator(),
            events = this.getEventSet(name),
            numEvents,
            delay = 0,
            index = 0,
            event,
            point,
            target,
            reserveTargetEvents = ['touchmove', 'touchend', 'mousemove', 'mouseup'],
            me = this;

        if (typeof startIndex == 'undefined') {
            startIndex = 0;
        }

        index = startIndex;
        
        numEvents = events.length;

        this.interruptFlag = false;

        if (numEvents > 0) {
            this.fireEvent('replaystart', name, startIndex);
            setTimeout(function() {
                event = events[index];
                
                if (event) {

                    if (reserveTargetEvents.indexOf(event.type) === -1) {
                        me.fireEvent('beforecalculatetarget', event.type, event);
                        point = Ext.util.Point.fromEvent(event);
                        target = document.elementFromPoint(point.x, point.y);
                        me.fireEvent('aftercalculatetarget', event.type, target, event);
                    }
                    
                    if (target) {
                        if (me.interruptFlag === true) {
                            me.interruptFlag = false;
                            me.interruptedIndexes[name] = index;
                            me.fireEvent('interrupted', index);
                            me.fireEvent('replayend', name, true);
                            return;
                        }
                        me.fireEvent('beforefire', event.type, target, event);
                        simulator.fire(event.type, target, event);
                        me.fireEvent('afterfire', event.type, target, event);
                    }

                    if (++index < numEvents) {
                        setTimeout(arguments.callee, events[index].timeStamp - event.timeStamp);
                    } else {
                        me.fireEvent('replayend', name, false);
                    }
                }
            }, delay);
        }
    },

    end: function() {
        this.currentEventSetName = null;
    },

    getEventSimulator: function() {
        if (!this._eventSimulator) {
            this._eventSimulator = new Ext.util.EventSimulator();
        }

        return this._eventSimulator;
    },

    setEventSimulator: function(eventSimulator) {
        if (!(eventSimulator instanceof Ext.util.EventSimulator))
            throw new Error('eventSimulator must be an instance of Ext.util.EventSimulator');

        this._eventSimulator = eventSimulator;
    },

    
    save: function(name) {

    }
});

Ext.gesture.Manager = new Ext.AbstractManager({
    eventNames: {
        start: 'touchstart',
        move: 'touchmove',
        end: 'touchend'
    },

    defaultPreventedMouseEvents: ['click'],

    clickMoveThreshold: 5,

    init: function() {
        this.targets = [];

        this.followTouches = [];
        this.currentGestures = [];
        this.currentTargets = [];

        if (!Ext.supports.Touch) {
            Ext.apply(this.eventNames, {
                start: 'mousedown',
                move: 'mousemove',
                end: 'mouseup'
            });
        }

        this.listenerWrappers = {
            start: Ext.createDelegate(this.onTouchStart, this),
            move: Ext.createDelegate(this.onTouchMove, this),
            end: Ext.createDelegate(this.onTouchEnd, this),
            mouse: Ext.createDelegate(this.onMouseEvent, this)
        };

        this.attachListeners();
    },

    freeze: function() {
        this.isFrozen = true;
    },

    thaw: function() {
        this.isFrozen = false;
    },

    getEventSimulator: function() {
        if (!this.eventSimulator) {
            this.eventSimulator = new Ext.util.EventSimulator();
        }

        return this.eventSimulator;
    },

    attachListeners: function() {
        Ext.iterate(this.eventNames, function(key, name) {
            document.addEventListener(name, this.listenerWrappers[key], false);
        }, this);

        if (Ext.supports.Touch) {
            this.defaultPreventedMouseEvents.forEach(function(name) {
                document.addEventListener(name, this.listenerWrappers['mouse'], true);
            }, this);
        }
    },

    detachListeners: function() {
        Ext.iterate(this.eventNames, function(key, name) {
            document.removeEventListener(name, this.listenerWrappers[key], false);
        }, this);

        if (Ext.supports.Touch) {
            this.defaultPreventedMouseEvents.forEach(function(name) {
                document.removeEventListener(name, this.listenerWrappers['mouse'], true);
            }, this);
        }
    },

    onMouseEvent: function(e) {
        if (!e.isSimulated) {
            e.preventDefault();
            e.stopPropagation();
        }
    },

    onTouchStart: function(e) {
        var targets = [],
            target = e.target;

        if (e.stopped === true) {
            return;
        }

        if (Ext.is.Android) {
            if (!(target.tagName && ['input', 'textarea', 'select'].indexOf(target.tagName.toLowerCase()) !== -1)) {
                e.preventDefault();
            }
        }

        if (this.isFrozen) {
            return;
        }

        
        
        
        if (this.startEvent) {
            this.onTouchEnd(e);
        }

        this.locks = {};

        this.currentTargets = [target];

        while (target) {
            if (this.targets.indexOf(target) !== -1) {
                targets.unshift(target);
            }

            target = target.parentNode;
            this.currentTargets.push(target);
        }

        this.startEvent = e;
        this.startPoint = Ext.util.Point.fromEvent(e);
        this.lastMovePoint = null;
        this.isClick = true;
        this.handleTargets(targets, e);
    },

    onTouchMove: function(e) {
        if (!Ext.is.Android) {
            e.preventDefault();
        }

        if (!this.startEvent) {
            return;
        }

        if (Ext.is.Desktop) {
            e.target = this.startEvent.target;
        }

        if (this.isFrozen) {
            return;
        }

        var gestures = this.currentGestures,
            gesture,
            touch = e.changedTouches ? e.changedTouches[0] : e;

        this.lastMovePoint = Ext.util.Point.fromEvent(e);

        if (Ext.supports.Touch && this.isClick && !this.lastMovePoint.isWithin(this.startPoint, this.clickMoveThreshold)) {
            this.isClick = false;
        }

        for (var i = 0; i < gestures.length; i++) {
            if (e.stopped) {
                break;
            }

            gesture = gestures[i];

            if (gesture.listenForMove) {
                gesture.onTouchMove(e, touch);
            }
        }
    },

    
    onTouchEnd: function(e) {
        if (Ext.is.Blackberry) {
            e.preventDefault();
        }

        if (this.isFrozen) {
            return;
        }

        var gestures = this.currentGestures.slice(0),
            ln = gestures.length,
            i, gesture, endPoint,
            needsAnotherMove = false,
            touch = e.changedTouches ? e.changedTouches[0] : e;

        if (this.startPoint) {
            endPoint = Ext.util.Point.fromEvent(e);
            if (!(this.lastMovePoint || this.startPoint)['equals'](endPoint)) {
                needsAnotherMove = true;
            }
        }

        for (i = 0; i < ln; i++) {
            gesture = gestures[i];

            if (!e.stopped && gesture.listenForEnd) {
                
                
                
                if (needsAnotherMove) {
                    gesture.onTouchMove(e, touch);
                }

                gesture.onTouchEnd(e, touch);
            }

            this.stopGesture(gesture);
        }


        if (Ext.supports.Touch && this.isClick) {
            this.isClick = false;
            this.getEventSimulator().fire('click', this.startEvent.target, touch);
        }

        this.lastMovePoint = null;
        this.followTouches = [];
        this.startedChangedTouch = false;
        this.currentTargets = [];
        this.startEvent = null;
        this.startPoint = null;
    },

    handleTargets: function(targets, e) {
        
        
        var ln = targets.length,
            i;

        this.startedChangedTouch = false;
        this.startedTouches = Ext.supports.Touch ? e.touches : [e];

        for (i = 0; i < ln; i++) {
            if (e.stopped) {
                break;
            }

            this.handleTarget(targets[i], e, true);
        }

        for (i = ln - 1; i >= 0; i--) {
            if (e.stopped) {
                break;
            }

            this.handleTarget(targets[i], e, false);
        }

        if (this.startedChangedTouch) {
            this.followTouches = this.followTouches.concat((Ext.supports.Touch && e.targetTouches) ? Ext.toArray(e.targetTouches) : [e]);
        }
    },

    handleTarget: function(target, e, capture) {
        var gestures = Ext.Element.data(target, 'x-gestures') || [],
            ln = gestures.length,
            i, gesture;

        for (i = 0; i < ln; i++) {
            gesture = gestures[i];
            if (
                (!!gesture.capture === !!capture) &&
                (this.followTouches.length < gesture.touches) &&
                ((Ext.supports.Touch && e.targetTouches) ? (e.targetTouches.length === gesture.touches) : true)
            ) {
                this.startedChangedTouch = true;
                this.startGesture(gesture);

                if (gesture.listenForStart) {
                    gesture.onTouchStart(e, e.changedTouches ? e.changedTouches[0] : e);
                }

                if (e.stopped) {
                    break;
                }
            }
        }
    },

    startGesture: function(gesture) {
        gesture.started = true;
        this.currentGestures.push(gesture);
    },

    stopGesture: function(gesture) {
        gesture.started = false;
        this.currentGestures.remove(gesture);
    },

    addEventListener: function(target, eventName, listener, options) {
        target = Ext.getDom(target);
        options = options || {};

        var targets = this.targets,
            name = this.getGestureName(eventName),
            gestures = Ext.Element.data(target, 'x-gestures'),
            gesture;

        if (!gestures) {
            gestures = [];
            Ext.Element.data(target, 'x-gestures', gestures);
        }

        
        if (!name) {
            throw new Error('Trying to subscribe to unknown event ' + eventName);
        }
        

        if (targets.indexOf(target) === -1) {
            this.targets.push(target);
        }

        gesture = this.get(target.id + '-' + name);

        if (!gesture) {
            gesture = this.create(Ext.apply({}, options, {
                target: target,
                type: name
            }));

            gestures.push(gesture);
            
            
        }

        gesture.addListener(eventName, listener);

        
        if (this.startedChangedTouch && this.currentTargets.contains(target) && !gesture.started && !options.subsequent) {
            this.startGesture(gesture);
            if (gesture.listenForStart) {
                gesture.onTouchStart(this.startEvent, this.startedTouches[0]);
            }
        }
    },

    removeEventListener: function(target, eventName, listener) {
        target = Ext.getDom(target);

        var name = this.getGestureName(eventName),
            gestures = Ext.Element.data(target, 'x-gestures') || [],
            gesture;

        gesture = this.get(target.id + '-' + name);

        if (gesture) {
            gesture.removeListener(eventName, listener);

            for (name in gesture.listeners) {
                return;
            }

            gesture.destroy();
            gestures.remove(gesture);
            Ext.Element.data(target, 'x-gestures', gestures);
        }
    },

    getGestureName: function(ename) {
        return this.names && this.names[ename];
    },

    registerType: function(type, cls) {
        var handles = cls.prototype.handles,
            i, ln;

        this.types[type] = cls;

        cls[this.typeName] = type;

        if (!handles) {
            handles = cls.prototype.handles = [type];
        }

        this.names = this.names || {};

        for (i = 0, ln = handles.length; i < ln; i++) {
            this.names[handles[i]] = type;
        }
    }
});

Ext.regGesture = function() {
    return Ext.gesture.Manager.registerType.apply(Ext.gesture.Manager, arguments);
};

Ext.TouchEventObjectImpl = Ext.extend(Object, {
    constructor : function(e, args) {
        if (e) {
            this.setEvent(e, args);
        }
    },

    setEvent : function(e, args) {
        Ext.apply(this, {
            event: e,
            time: e.timeStamp
        });

        this.touches = e.touches || [e];
        this.changedTouches = e.changedTouches || [e];
        this.targetTouches = e.targetTouches || [e];
        
        if (args) {
            this.target = args.target;
            Ext.apply(this, args);
        }
        else {
            this.target = e.target;
        }
        return this;
    },

    stopEvent : function() {
        this.stopPropagation();
        this.preventDefault();
    },

    stopPropagation : function() {
        this.event.stopped = true;
    },

    preventDefault : function() {
        this.event.preventDefault();
    },

    getTarget : function(selector, maxDepth, returnEl) {
        if (selector) {
            return Ext.fly(this.target).findParent(selector, maxDepth, returnEl);
        }
        else {
            return returnEl ? Ext.get(this.target) : this.target;
        }
    }
});

Ext.TouchEventObject = new Ext.TouchEventObjectImpl();
Ext.gesture.Gesture = Ext.extend(Object, {    
    listenForStart: true,
    listenForEnd: true,
    listenForMove: true,
    
    disableLocking: false,
    
    touches: 1,
    
    constructor: function(config) {
        config = config || {};
        Ext.apply(this, config);
        
        this.target = Ext.getDom(this.target);
        this.listeners = {};
        
        
        if (!this.target) {
            throw new Error('Trying to bind a ' + this.type + ' event to element that does\'nt exist: ' + this.target);
        }
        
        
        this.id = this.target.id + '-' + this.type;
        
        Ext.gesture.Gesture.superclass.constructor.call(this);
        Ext.gesture.Manager.register(this);
    },
    
    addListener: function(name, listener) {
        this.listeners[name] = this.listeners[name] || [];
        this.listeners[name].push(listener);
    },
    
    removeListener: function(name, listener) {
        var listeners = this.listeners[name];
            
        if (listeners) {
            listeners.remove(listener);

            if (listeners.length == 0) {
                delete this.listeners[name];
            }

            for (name in this.listeners) {
                if (this.listeners.hasOwnProperty(name)) {
                    return;
                }
            }
            
            this.listeners = {};
        }
    },
    
    fire: function(type, e, args) {
        var listeners = this.listeners && this.listeners[type],
            ln = listeners && listeners.length,
            i;

        if (!this.disableLocking && this.isLocked(type)) {
            return false;
        }
        
        if (ln) {
            args = Ext.apply(args || {}, {
                time: e.timeStamp,
                type: type,
                gesture: this,
                target: (e.target.nodeType == 3) ? e.target.parentNode: e.target
            });
            
            for (i = 0; i < ln; i++) {
                listeners[i](e, args);
            }
        }
        
        return true;
    },
    
    stop: function() {
        Ext.gesture.Manager.stopGesture(this);
    },
    
    lock: function() {
        if (!this.disableLocking) {
            var args = arguments,
                ln = args.length,
                i;

            for (i = 0; i < ln; i++) {
                Ext.gesture.Manager.locks[args[i]] = this.id;
            }            
        }
    },
    
    unlock: function() {
        if (!this.disableLocking) {
            var args = arguments,
                ln = args.length,
                i;

            for (i = 0; i < ln; i++) {
                if (Ext.gesture.Manager.locks[args[i]] == this.id) {
                    delete Ext.gesture.Manager.locks[args[i]]; 
                }
            }            
        }
    },
    
    isLocked : function(type) {
        var lock = Ext.gesture.Manager.locks[type];
        return !!(lock && lock !== this.id);
    },
    
    getLockingGesture : function(type) {
        var lock = Ext.gesture.Manager.locks[type];
        if (lock) {
            return Ext.gesture.Manager.get(lock) || null;
        }
        return null;
    },
    
    onTouchStart: Ext.emptyFn,
    onTouchMove: Ext.emptyFn,
    onTouchEnd: Ext.emptyFn,
    
    destroy: function() {
        this.stop();
        this.listeners = null;
        Ext.gesture.Manager.unregister(this);
    }
});
Ext.gesture.Touch = Ext.extend(Ext.gesture.Gesture, {
    handles: ['touchstart', 'touchmove', 'touchend', 'touchdown'],
    
    touchDownInterval: 500,
    
    onTouchStart: function(e, touch) {
        this.startX = this.previousX = touch.pageX;
        this.startY = this.previousY = touch.pageY;
        this.startTime = this.previousTime = e.timeStamp;

        this.fire('touchstart', e);
        this.lastEvent = e;
        
        if (this.listeners && this.listeners.touchdown) {
            this.touchDownIntervalId = setInterval(Ext.createDelegate(this.touchDownHandler, this), this.touchDownInterval);
        }
    },
    
    onTouchMove: function(e, touch) {
        this.fire('touchmove', e, this.getInfo(touch));
        this.lastEvent = e;
    },
    
    onTouchEnd: function(e) {
        this.fire('touchend', e, this.lastInfo);
        clearInterval(this.touchDownIntervalId);
    },
    
    touchDownHandler : function() {
        this.fire('touchdown', this.lastEvent, this.lastInfo);
    },
    
    getInfo : function(touch) {
        var time = Date.now(),
            deltaX = touch.pageX - this.startX,
            deltaY = touch.pageY - this.startY,
            info = {
                startX: this.startX,
                startY: this.startY,
                previousX: this.previousX,
                previousY: this.previousY,
                pageX: touch.pageX,
                pageY: touch.pageY,
                deltaX: deltaX,
                deltaY: deltaY,
                absDeltaX: Math.abs(deltaX),
                absDeltaY: Math.abs(deltaY),
                previousDeltaX: touch.pageX - this.previousX,
                previousDeltaY: touch.pageY - this.previousY,
                time: time,
                startTime: this.startTime,
                previousTime: this.previousTime,
                deltaTime: time - this.startTime,
                previousDeltaTime: time - this.previousTime
            };
        
        this.previousTime = info.time;
        this.previousX = info.pageX;
        this.previousY = info.pageY;
        this.lastInfo = info;
        
        return info;
    }
});

Ext.regGesture('touch', Ext.gesture.Touch);
Ext.gesture.Tap = Ext.extend(Ext.gesture.Gesture, {
    handles: [
        'tapstart',
        'tapcancel',
        'tap', 
        'doubletap', 
        'taphold',
        'singletap'
    ],
    
    cancelThreshold: 10,
    
    doubleTapThreshold: 800,

    singleTapThreshold: 400,

    holdThreshold: 1000,

    fireClickEvent: false,
    
    onTouchStart : function(e, touch) {
        var me = this;
        
        me.startX = touch.pageX;
        me.startY = touch.pageY;
        me.fire('tapstart', e, me.getInfo(touch));
        
        if (this.listeners.taphold) {    
            me.timeout = setTimeout(function() {
                me.fire('taphold', e, me.getInfo(touch));
                delete me.timeout;
            }, me.holdThreshold);            
        }
        
        me.lastTouch = touch;
    },
    
    onTouchMove : function(e, touch) {
        var me = this;
        if (me.isCancel(touch)) {
            me.fire('tapcancel', e, me.getInfo(touch));
            if (me.timeout) {
                clearTimeout(me.timeout);
                delete me.timeout;
            }
            me.stop();
        }
        
        me.lastTouch = touch;
    },
    
    onTouchEnd : function(e) {
        var me = this,
            info = me.getInfo(me.lastTouch);
        
        this.fireTapEvent(e, info);
        
        if (me.lastTapTime && e.timeStamp - me.lastTapTime <= me.doubleTapThreshold) {
            me.lastTapTime = null;
            e.preventDefault();
            me.fire('doubletap', e, info);
        }
        else {
            me.lastTapTime = e.timeStamp;
        }

        if (me.listeners && me.listeners.singletap && me.singleTapThreshold && !me.preventSingleTap) {
            me.fire('singletap', e, info);
            me.preventSingleTap = true;
            setTimeout(function() {
                me.preventSingleTap = false;
            }, me.singleTapThreshold);
        }
        
        if (me.timeout) {
            clearTimeout(me.timeout);
            delete me.timeout;
        }
    },

    fireTapEvent: function(e, info) {
        this.fire('tap', e, info);
        
        if (e.event)
            e = e.event;

        var target = (e.changedTouches ? e.changedTouches[0] : e).target;

        if (!target.disabled && this.fireClickEvent) {
            var clickEvent = document.createEvent("MouseEvent");
                clickEvent.initMouseEvent('click', e.bubbles, e.cancelable, document.defaultView, e.detail, e.screenX, e.screenY, e.clientX,
                                         e.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, e.metaKey, e.button, e.relatedTarget);
                clickEvent.isSimulated = true;


            target.dispatchEvent(clickEvent);
        }
    },
    
    getInfo : function(touch) {
        var x = touch.pageX,
            y = touch.pageY;
            
        return {
            pageX: x,
            pageY: y,
            startX: x,
            startY: y
        };
    },
    
    isCancel : function(touch) {
        var me = this;
        return (
            Math.abs(touch.pageX - me.startX) >= me.cancelThreshold ||
            Math.abs(touch.pageY - me.startY) >= me.cancelThreshold
        );
    }
});
Ext.regGesture('tap', Ext.gesture.Tap);
Ext.gesture.Swipe = Ext.extend(Ext.gesture.Gesture, {    
    listenForEnd: false,
   
    swipeThreshold: 35,
    swipeTime: 1000,
    
    onTouchStart : function(e, touch) {
        this.startTime = e.timeStamp;
        this.startX = touch.pageX;
        this.startY = touch.pageY;
        this.lock('scroll', 'scrollstart', 'scrollend');
    },
   
    onTouchMove : function(e, touch) {
        var deltaY = touch.pageY - this.startY,
            deltaX = touch.pageX - this.startX,
            absDeltaY = Math.abs(deltaY),
            absDeltaX = Math.abs(deltaX),
            deltaTime = e.timeStamp - this.startTime;

        
        if (absDeltaY - absDeltaX > 3 || deltaTime > this.swipeTime) {
            this.unlock('drag', 'dragstart', 'dragend');
            this.stop();
        }
        else if (absDeltaX > this.swipeThreshold && absDeltaX > absDeltaY) {
           
           this.fire('swipe', e, {
               direction: (deltaX < 0) ? 'left' : 'right',
               distance: absDeltaX,
               deltaTime: deltaTime,
               deltaX: deltaX
           });
   
           this.stop();
        }
    }
});
Ext.regGesture('swipe', Ext.gesture.Swipe);
Ext.gesture.Drag = Ext.extend(Ext.gesture.Touch, {
    handles: ['dragstart', 'drag', 'dragend'],

    dragThreshold: 5,

    direction: 'both',

    horizontal: false,
    vertical: false,

    constructor: function() {
        Ext.gesture.Drag.superclass.constructor.apply(this, arguments);

        if (this.direction == 'both') {
            this.horizontal = true;
            this.vertical = true;
        }
        else if (this.direction == 'horizontal') {
            this.horizontal = true;
        }
        else {
            this.vertical = true;
        }

        return this;
    },
    
    onTouchStart: function(e, touch) {
        this.startX = this.previousX = touch.pageX;
        this.startY = this.previousY = touch.pageY;
        this.startTime = this.previousTime = e.timeStamp;
 
        this.dragging = false;
    },    
    
    onTouchMove: function(e, touch) {
        if (this.isLocked('drag')) {
            return;
        }
        
        var info = this.getInfo(touch);
        
        if (!this.dragging) {
            if (this.isDragging(info) && this.fire('dragstart', e, info)) {
                this.dragging = true;
                this.lock('drag', 'dragstart', 'dragend');
                this.fire('drag', e, info);
            }
        }
        else {
            this.fire('drag', e, info);
       }
    },

    onTouchEnd: function(e) {
        if (this.dragging) {
            this.fire('dragend', e, this.lastInfo);
        }
        
        this.dragging = false;
    },
    
    isDragging: function(info) {
        return (
            (this.horizontal && info.absDeltaX >= this.dragThreshold) ||
            (this.vertical && info.absDeltaY >= this.dragThreshold)
        );
    },
    
    
    isVertical: function() {
        return this.vertical;
    },
    
    
    isHorizontal: function() {
        return this.horizontal;
    }
});

Ext.regGesture('drag', Ext.gesture.Drag);
Ext.gesture.Pinch = Ext.extend(Ext.gesture.Gesture, {
    handles: [
        'pinchstart',
        'pinch',
        'pinchend'
    ],
    
    touches: 2,
    
    onTouchStart : function(e) {
        var me = this;
        
        if (Ext.supports.Touch && e.targetTouches.length >= 2) {
            me.lock('swipe', 'scroll', 'scrollstart', 'scrollend', 'touchmove', 'touchend', 'touchstart', 'tap', 'tapstart', 'taphold', 'tapcancel', 'doubletap');
            me.pinching = true;
            
            var targetTouches = e.targetTouches,
                firstTouch = me.firstTouch = targetTouches[0],
                secondTouch = me.secondTouch = targetTouches[1];
            
            me.previousDistance = me.startDistance = me.getDistance();
            me.previousScale = 1;
            
            me.fire('pinchstart', e, {
                distance: me.startDistance,
                scale: me.previousScale
            });
        }
        else if (me.pinching) {
            me.unlock('swipe', 'scroll', 'scrollstart', 'scrollend', 'touchmove', 'touchend', 'touchstart', 'tap', 'tapstart', 'taphold', 'tapcancel', 'doubletap');
            me.pinching = false;
        }
    },
    
    onTouchMove : function(e) {
        if (this.pinching) {
            this.fire('pinch', e, this.getPinchInfo());
        }
    },
    
    onTouchEnd : function(e) {
        if (this.pinching) {
            this.fire('pinchend', e, this.getPinchInfo());
        }
    },
    
    getPinchInfo : function() {
        var me = this,
            distance = me.getDistance(),
            scale = distance / me.startDistance,
            firstTouch = me.firstTouch,
            secondTouch = me.secondTouch,
            info = {
                scale: scale,
                deltaScale: scale - 1,
                previousScale: me.previousScale,
                previousDeltaScale: scale - me.previousScale,
                distance: distance,
                deltaDistance: distance - me.startDistance,
                startDistance: me.startDistance,
                previousDistance: me.previousDistance,
                previousDeltaDistance: distance - me.previousDistance,
                firstTouch: firstTouch,
                secondTouch: secondTouch,
                firstPageX: firstTouch.pageX,
                firstPageY: firstTouch.pageY,
                secondPageX: secondTouch.pageX,
                secondPageY: secondTouch.pageY,
                
                midPointX: (firstTouch.pageX + secondTouch.pageX) / 2,
                midPointY: (firstTouch.pageY + secondTouch.pageY) / 2
            };
        
        me.previousScale = scale;
        me.previousDistance = distance;
        
        return info;  
    },
    
    getDistance : function() {
        var me = this;
        return Math.sqrt(
            Math.pow(Math.abs(me.firstTouch.pageX - me.secondTouch.pageX), 2) +
            Math.pow(Math.abs(me.firstTouch.pageY - me.secondTouch.pageY), 2)
        );        
    }
});

Ext.regGesture('pinch', Ext.gesture.Pinch);


Ext.lib.Component = Ext.extend(Ext.util.Observable, {
    isComponent: true,

    
    renderTpl: null,

    

    

    

    

    

    
    tplWriteMode: 'overwrite',

    
    baseCls: 'x-component',

    

    

    
    disabledCls: 'x-item-disabled',

    

   
    
    
    
    
    
    
    
    
    
    

    
    hidden: false,

    
    disabled: false,

    

    
    draggable: false,

    
    floating: false,

    

    

    
    styleHtmlContent: false,

    
    styleHtmlCls: 'x-html',

    
    
    
    

     
     allowDomMove: true,
     autoShow: false,
     
     autoRender: false,

     needsLayout: false,

    

    
    rendered: false,

    constructor : function(config) {
        config = config || {};
        this.initialConfig = config;
        Ext.apply(this, config);

        this.addEvents(
            
             'beforeactivate',
            
             'activate',
            
             'beforedeactivate',
            
             'deactivate',
            
             'added',
            
             'disable',
            
             'enable',
            
             'beforeshow',
            
             'show',
            
             'beforehide',
            
             'hide',
            
             'removed',
            
             'beforerender',
            
             'render',
            
             'afterrender',
            
             'beforedestroy',
            
             'destroy',
            
             'resize',
            
             'move',

             'beforestaterestore',
             'staterestore',
             'beforestatesave',
             'statesave'
        );

        this.getId();

        this.mons = [];
        this.additionalCls = [];
        this.renderData = this.renderData || {};
        this.renderSelectors = this.renderSelectors || {};

        this.initComponent();

        
        Ext.ComponentMgr.register(this);

        
        Ext.lib.Component.superclass.constructor.call(this);

        
        if (this.plugins) {
            this.plugins = [].concat(this.plugins);
            for (var i = 0, len = this.plugins.length; i < len; i++) {
                this.plugins[i] = this.initPlugin(this.plugins[i]);
            }
        }

        
        if (this.applyTo) {
            this.applyToMarkup(this.applyTo);
            delete this.applyTo;
        }
        else if (this.renderTo) {
            this.render(this.renderTo);
            delete this.renderTo;
        }
        
        if (Ext.isDefined(this.disabledClass)) {
            throw "Component: disabledClass has been deprecated. Please use disabledCls.";
        }
    },

    initComponent: Ext.emptyFn,
    applyToMarkup: Ext.emptyFn,
    
    show: Ext.emptyFn,

    onShow : function() {
        
        var needsLayout = this.needsLayout;
        if (Ext.isObject(needsLayout)) {
            this.doComponentLayout(needsLayout.width, needsLayout.height, needsLayout.isSetSize);
        }
    },
    
    
    initPlugin : function(plugin) {
        if (plugin.ptype && typeof plugin.init != 'function') {
            plugin = Ext.PluginMgr.create(plugin);
        }
        else if (typeof plugin == 'string') {
            plugin = Ext.PluginMgr.create({
                ptype: plugin
            });
        }

        plugin.init(this);

        return plugin;
    },

    
    render : function(container, position) {
        if (!this.rendered && this.fireEvent('beforerender', this) !== false) {
            
            
            if (this.el) {
                this.el = Ext.get(this.el);
            }

            container = this.initContainer(container);

            this.onRender(container, position);
            this.fireEvent('render', this);

            this.initContent();

            this.afterRender(container);
            this.fireEvent('afterrender', this);

            this.initEvents();

            if (this.autoShow) {
                this.show();
            }

            if (this.hidden) {
                
                this.onHide(false); 
            }

            if (this.disabled) {
                
                this.disable(true);
            }
        }

        return this;
    },

    
    onRender : function(container, position) {
        var el = this.el,
            renderTpl,
            renderData;

        position = this.getInsertPosition(position);

        if (!el) {
            if (position) {
                el = Ext.DomHelper.insertBefore(position, this.getElConfig(), true);
            }
            else {
                el = Ext.DomHelper.append(container, this.getElConfig(), true);
            }
        }
        else if (this.allowDomMove !== false) {
            container.dom.insertBefore(el.dom, position);
        }

        el.addCls(this.initCls());
        el.setStyle(this.initStyles());

        
        
        
        
        
        
        
        
        
        

        renderTpl = this.initRenderTpl();
        if (renderTpl) {
            renderData = this.initRenderData();
            renderTpl.append(el, renderData);
        }

        this.el = el;
        this.applyRenderSelectors();
        this.rendered = true;
    },

    
    initCls: function() {
        var cls = [ this.baseCls ];

        if (this.componentCls) {
            cls.push(this.componentCls);
        }
        else {
            this.componentCls = this.baseCls;
        }
        if (this.cls) {
            cls.push(this.cls);
            delete this.cls;
        }
        if (this.ui) {
            cls.push(this.componentCls + '-' + this.ui);
        }
        return cls.concat(this.additionalCls);
    },

    
    afterRender : function() {
        this.getComponentLayout();

        if (this.x || this.y) {
            this.setPosition(this.x, this.y);
        }

        if (this.styleHtmlContent) {
            this.getTargetEl().addCls(this.styleHtmlCls);
        }

        
        
        if (!this.ownerCt) {
            this.setSize(this.width, this.height);
        }
    },

    getElConfig : function() {
        return {tag: 'div', id: this.id};
    },

    
    getInsertPosition: function(position) {
        
        if (position !== undefined) {
            if (Ext.isNumber(position)) {
                position = this.container.dom.childNodes[position];
            }
            else {
                position = Ext.getDom(position);
            }
        }

        return position;
    },

    
    initContainer: function(container) {
        
        
        
        if (!container && this.el) {
            container = this.el.dom.parentNode;
            this.allowDomMove = false;
        }

        this.container = Ext.get(container);

        if (this.ctCls) {
            this.container.addCls(this.ctCls);
        }

        return this.container;
    },

    
    initRenderData: function() {
        return Ext.applyIf(this.renderData, {
            baseCls: this.baseCls,
            componentCls: this.componentCls
        });
    },

    
    initRenderTpl: function() {
        var renderTpl = this.renderTpl;
        if (renderTpl) {
            if (this.proto.renderTpl !== renderTpl) {
                if (Ext.isArray(renderTpl) || typeof renderTpl === "string") {
                    renderTpl = new Ext.XTemplate(renderTpl);
                }
            }
            else if (Ext.isArray(this.proto.renderTpl)){
                renderTpl = this.proto.renderTpl = new Ext.XTemplate(renderTpl);
            }
        }
        return renderTpl;
    },

    
    initStyles: function() {
        var style = {},
            Element = Ext.Element,
            i, ln, split, prop;

        if (Ext.isString(this.style)) {
            split = this.style.split(';');
            for (i = 0, ln = split.length; i < ln; i++) {
                if (!Ext.isEmpty(split[i])) {
                    prop = split[i].split(':');
                    style[Ext.util.Format.trim(prop[0])] = Ext.util.Format.trim(prop[1]);
                }
            }
        } else {
            style = Ext.apply({}, this.style);
        }

        
        
        if (this.padding != undefined) {
            style.padding = Element.unitizeBox((this.padding === true) ? 5 : this.padding);
        }

        if (this.margin != undefined) {
            style.margin = Element.unitizeBox((this.margin === true) ? 5 : this.margin);
        }

        if (this.border != undefined) {
            style.borderWidth = Element.unitizeBox((this.border === true) ? 1 : this.border);
        }

        delete this.style;
        return style;
    },

    
    initContent: function() {
        var target = this.getTargetEl();

        if (this.html) {
            target.update(Ext.DomHelper.markup(this.html));
            delete this.html;
        }

        if (this.contentEl) {
            var contentEl = Ext.get(this.contentEl);
            contentEl.show();
            target.appendChild(contentEl.dom);
        }

        if (this.tpl) {
            
            if (!this.tpl.isTemplate) {
                this.tpl = new Ext.XTemplate(this.tpl);
            }

            if (this.data) {
                this.tpl[this.tplWriteMode](target, this.data);
                delete this.data;
            }
        }
    },

    
    initEvents : function() {
        var afterRenderEvents = this.afterRenderEvents,
            property, listeners;
        if (afterRenderEvents) {
            for (property in afterRenderEvents) {
                if (!afterRenderEvents.hasOwnProperty(property)) {
                    continue;
                }
                listeners = afterRenderEvents[property];
                if (this[property] && this[property].on) {
                    this.mon(this[property], listeners);
                }
            }
        }
    },

    
    applyRenderSelectors: function() {
        var selectors = this.renderSelectors || {},
            el = this.el.dom,
            selector;

        for (selector in selectors) {
            if (!selectors.hasOwnProperty(selector)) {
                continue;
            }
            this[selector] = Ext.get(Ext.DomQuery.selectNode(selectors[selector], el));
        }
    },

    is: function(selector) {
        return Ext.ComponentQuery.is(this, selector);
    },

    
    up: function(selector) {
        var result = this.ownerCt;
        if (selector) {
            for (; result; result = result.ownerCt) {
                if (Ext.ComponentQuery.is(result, selector)) {
                    return result;
                }
            }
        }
        return result;
    },

    
    nextSibling: function(selector) {
        var o = this.ownerCt, it, last, idx, c; 
        if (o) {
            it = o.items;
            idx = it.indexOf(this) + 1;
            if (idx) {
                if (selector) {
                    for (last = it.getCount(); idx < last; idx++) {
                        if ((c = it.getAt(idx)).is(selector)) {
                            return c;
                        }
                    }
                } else {
                    if (idx < it.getCount()) {
                        return it.getAt(idx);
                    }
                }
            }
        }
        return null;
    },

    
    previousSibling: function(selector) {
        var o = this.ownerCt, it, idx, c; 
        if (o) {
            it = o.items;
            idx = it.indexOf(this);
            if (idx != -1) {
                if (selector) {
                    for (--idx; idx >= 0; idx--) {
                        if ((c = it.getAt(idx)).is(selector)) {
                            return c;
                        }
                    }
                } else {
                    if (idx) {
                        return it.getAt(--idx);
                    }
                }
            }
        }
        return null;
    },

    
    getId : function() {
        return this.id || (this.id = 'ext-comp-' + (++Ext.lib.Component.AUTO_ID));
    },

    getItemId : function() {
        return this.itemId || this.id;
    },

    
    getEl : function() {
        return this.el;
    },

    
    getTargetEl: function() {
        return this.el;
    },

    
    isXType: function(xtype, shallow) {
        
        if (Ext.isFunction(xtype)) {
            xtype = xtype.xtype;
            
        } else if (Ext.isObject(xtype)) {
            xtype = xtype.constructor.xtype;
            
        }

        return !shallow ? ('/' + this.getXTypes() + '/').indexOf('/' + xtype + '/') != -1: this.constructor.xtype == xtype;
    },

    
    getXTypes: function() {
        var constructor = this.constructor,
            xtypes      = [],
            superclass  = this,
            xtype;

        if (!constructor.xtypes) {
            while (superclass) {
                xtype = superclass.constructor.xtype;

                if (xtype != undefined) {
                    xtypes.unshift(xtype);
                }

                superclass = superclass.constructor.superclass;
            }

            constructor.xtypeChain = xtypes;
            constructor.xtypes = xtypes.join('/');
        }

        return constructor.xtypes;
    },

    
    update : function(htmlOrData, loadScripts, cb) {
        if (this.tpl && !Ext.isString(htmlOrData)) {
            this.data = htmlOrData;
            if (this.rendered) {
                this.tpl[this.tplWriteMode](this.getTargetEl(), htmlOrData || {});
            }
        }
        else {
            this.html = Ext.isObject(htmlOrData) ? Ext.DomHelper.markup(htmlOrData) : htmlOrData;
            if (this.rendered) {
                this.getTargetEl().update(this.html, loadScripts, cb);
            }
        }

        if (this.rendered) {
            this.doComponentLayout();
        }
    },

    
    setVisible : function(visible) {
        return this[visible ? 'show': 'hide']();
    },

    
    isVisible: function() {
        var visible = !this.hidden,
            cmp     = this.ownerCt;

        
        this.hiddenOwnerCt = false;
        if (this.destroyed) {
            return false;
        };

        if (visible && this.rendered && cmp) {
            while (cmp) {
                if (cmp.hidden || cmp.collapsed) {
                    
                    this.hiddenOwnerCt = cmp;
                    visible = false;
                    break;
                }
                cmp = cmp.ownerCt;
            }
        }
        return visible;
    },

    
    enable : function(silent) {
        if (this.rendered) {
            this.el.removeCls(this.disabledCls);
            this.el.dom.disabled = false;
            this.onEnable();
        }

        this.disabled = false;

        if (silent !== true) {
            this.fireEvent('enable', this);
        }

        return this;
    },

    
    disable : function(silent) {
        if (this.rendered) {
            this.el.addCls(this.disabledCls);
            this.el.dom.disabled = true;
            this.onDisable();
        }

        this.disabled = true;

        if (silent !== true) {
            this.fireEvent('disable', this);
        }

        return this;
    },

    
    isDisabled : function() {
        return this.disabled;
    },
    
    
    setDisabled : function(disabled) {
        return this[disabled ? 'disable': 'enable']();
    },

    
    isHidden : function() {
        return this.hidden;
    },
    
    
    addCls : function() {
        var me = this,
            args = Ext.toArray(arguments);
        if (me.rendered) {
            me.el.addCls(args);
        }
        else {
            me.additionalCls = me.additionalCls.concat(args);
        }
        return me;
    },

    addClass : function() {
        throw "Component: addClass has been deprecated. Please use addCls.";
    },
    
    
    removeCls : function() {
        var me = this,
            args = Ext.toArray(arguments);
        if (me.rendered) {
            me.el.removeCls(args);
        }
        else if (me.additionalCls.length) {
            Ext.each(args, function(cls) {
                me.additionalCls.remove(cls);
            });
        }
        return me;
    },
    
    removeClass : function() {
        throw "Component: removeClass has been deprecated. Please use removeCls.";
    },

    addListener : function(element, listeners, scope, options) {
        if (Ext.isString(element) && (Ext.isObject(listeners) || options && options.element)) {
            if (options.element) {
                var fn = listeners,
                    option;

                listeners = {};
                listeners[element] = fn;
                element = options.element;
                if (scope) {
                    listeners.scope = scope;
                }

                for (option in options) {
                    if (!options.hasOwnProperty(option)) {
                        continue;
                    }
                    if (this.eventOptionsRe.test(option)) {
                        listeners[option] = options[option];
                    }
                }
            }

            
            
            if (this[element] && this[element].on) {
                this.mon(this[element], listeners);
            }
            else {
                this.afterRenderEvents = this.afterRenderEvents || {};
                this.afterRenderEvents[element] = listeners;
            }
        }

        return Ext.lib.Component.superclass.addListener.apply(this, arguments);
    },

    

    
    getBubbleTarget : function() {
        return this.ownerCt;
    },

    
    isFloating : function() {
        return this.floating;
    },

        
    isDraggable : function() {
        return !!this.draggable;
    },
    
    
    isDroppable : function() {
        return !!this.droppable;
    },

    
    onAdded : function(container, pos) {
        this.ownerCt = container;
        this.fireEvent('added', this, container, pos);
    },

    
    onRemoved : function() {
        this.fireEvent('removed', this, this.ownerCt);
        delete this.ownerCt;
    },

    
    onEnable : Ext.emptyFn,
    
    onDisable : Ext.emptyFn,
    
    beforeDestroy : Ext.emptyFn,
    
    
    onResize : Ext.emptyFn,

    
    setSize : function(width, height) {
        
        if (Ext.isObject(width)) {
            height = width.height;
            width  = width.width;
        }
        if (!this.rendered || !this.isVisible()) {
            
            if (this.hiddenOwnerCt) {
                var layoutCollection = this.hiddenOwnerCt.layoutOnShow;
                layoutCollection.remove(this);
                layoutCollection.add(this);
            }
            this.needsLayout = {
                width: width,
                height: height,
                isSetSize: true
            };
            if (!this.rendered) {
                this.width  = (width !== undefined) ? width : this.width;
                this.height = (height !== undefined) ? height : this.height;
            }
            return this;
        }
        this.doComponentLayout(width, height, true);

        return this;
    },

    setCalculatedSize : function(width, height) {
        
        if (Ext.isObject(width)) {
            height = width.height;
            width  = width.width;
        }
        if (!this.rendered || !this.isVisible()) {
            
            if (this.hiddenOwnerCt) {
                var layoutCollection = this.hiddenOwnerCt.layoutOnShow;
                layoutCollection.remove(this);
                layoutCollection.add(this);
            }
            this.needsLayout = {
                width: width,
                height: height,
                isSetSize: false
            };
            return this;
        }
        this.doComponentLayout(width, height);

        return this;
    },

    
    doComponentLayout : function(width, height, isSetSize) {
        var componentLayout = this.getComponentLayout();
        if (this.rendered && componentLayout) {
            width = (width !== undefined || this.collapsed === true) ? width : this.width;
            height = (height !== undefined || this.collapsed === true) ? height : this.height;
            if (isSetSize) {
                this.width = width;
                this.height = height;
            }

            componentLayout.layout(width, height);
        }
        return this;
    },

    
    setComponentLayout : function(layout) {
        var currentLayout = this.componentLayout;
        if (currentLayout && currentLayout.isLayout && currentLayout != layout) {
            currentLayout.setOwner(null);
        }
        this.componentLayout = layout;
        layout.setOwner(this);
    },
    
    getComponentLayout : function() {
        if (!this.componentLayout || !this.componentLayout.isLayout) {
            this.setComponentLayout(Ext.layout.LayoutManager.create(this.componentLayout, 'autocomponent'));
        }
        return this.componentLayout;
    },

    afterComponentLayout: Ext.emptyFn,

    
    setPosition : function(x, y) {
        if (Ext.isObject(x)) {
            y = x.y;
            x = x.x;
        }

        if (!this.rendered) {

            return this;
        }

        if (x !== undefined || y !== undefined) {
            this.el.setBox(x, y);
            this.onPosition(x, y);
            this.fireEvent('move', this, x, y);
        }
        return this;
    },

    
    onPosition: Ext.emptyFn,

    
    setWidth : function(width) {
        return this.setSize(width);
    },

    
    setHeight : function(height) {
        return this.setSize(undefined, height);
    },

    
    getSize : function() {
        return this.el.getSize();
    },

    
    getWidth : function() {
        return this.el.getWidth();
    },

    
    getHeight : function() {
        return this.el.getHeight();
    },

        
    setLoading : function(load, targetEl) {
        if (this.rendered) {
            if (load) {
                this.loadMask = this.loadMask || new Ext.LoadMask(targetEl ? this.getTargetEl() : this.el, Ext.applyIf(Ext.isObject(load) ? load : {}));
                this.loadMask.show();
            } else {
                Ext.destroy(this.loadMask);
                this.loadMask = null;
            }
        }
        
        return this.loadMask;
    },

    
    setDocked : function(dock, layoutParent) {
        this.dock = dock;
        if (layoutParent && this.ownerCt && this.rendered) {
            this.ownerCt.doComponentLayout();
        }
        return this;
    },

    onDestroy : function() {
        if (this.monitorResize && Ext.EventManager.resizeEvent) {
            Ext.EventManager.resizeEvent.removeListener(this.setSize, this);
        }
        Ext.destroy(this.componentLayout, this.loadMask);
    },

    
    destroy : function() {
        if (!this.isDestroyed) {
            if (this.fireEvent('beforedestroy', this) !== false) {
                this.destroying = true;
                this.beforeDestroy();

                if (this.ownerCt && this.ownerCt.remove) {
                    this.ownerCt.remove(this, false);
                }

                if (this.rendered) {
                    this.el.remove();
                }

                this.onDestroy();

                Ext.ComponentMgr.unregister(this);
                this.fireEvent('destroy', this);

                this.clearListeners();
                this.destroying = false;
                this.isDestroyed = true;
            }
        }
    }
});

Ext.lib.Component.prototype.on = Ext.lib.Component.prototype.addListener;
Ext.lib.Component.prototype.prev = Ext.lib.Component.prototype.previousSibling;
Ext.lib.Component.prototype.next = Ext.lib.Component.prototype.nextSibling;


Ext.lib.Component.AUTO_ID = 1000;


Ext.Component = Ext.extend(Ext.lib.Component, {});
Ext.reg('component', Ext.Component);


Ext.Component = Ext.extend(Ext.lib.Component, {
    
    showAnimation: null,

    
    monitorOrientation: false,

    
    floatingCls: 'x-floating',

    
    hideOnMaskTap: true,
    
        
    stopMaskTapEvent: true,

    
    centered: false,

    
    modal: false,

    
     
     
    fullscreen: false,

    
    layoutOnOrientationChange: null,
    
    
    initComponent : function() {
        this.addEvents(
            
            'beforeorientationchange',
            
            'orientationchange'
        );

        if (this.fullscreen || this.floating) {
            this.monitorOrientation = true;
            this.autoRender = true;
        }

        if (this.fullscreen) {
            var viewportSize = Ext.Viewport.getSize();
            this.width = viewportSize.width;
            this.height = viewportSize.height;
            this.cls = (this.cls || '') + ' x-fullscreen';
            this.renderTo = document.body;
        }
    },

    onRender : function() {
        Ext.Component.superclass.onRender.apply(this, arguments);

        if (this.monitorOrientation) {
            this.el.addCls('x-' + Ext.Viewport.orientation);
        }

        if (this.floating) {
            this.setFloating(true);
        }

        if (this.draggable) {
            this.setDraggable(this.draggable);
        }

        if (this.scroll) {
            this.setScrollable(this.scroll);
        }
    },

    afterRender : function() {
        if (this.fullscreen) {
            this.layoutOrientation(Ext.Viewport.orientation, this.width, this.height);
        }
        Ext.Component.superclass.afterRender.call(this);
    },

    initEvents : function() {
        Ext.Component.superclass.initEvents.call(this);

        if (this.monitorOrientation) {
            Ext.EventManager.onOrientationChange(this.setOrientation, this);
        }
    },

    
    
    afterComponentLayout : function() {
        var scrollEl = this.scrollEl,
            scroller = this.scroller,
            parentEl;

        if (scrollEl) {
            parentEl = scrollEl.parent();

            if (scroller.horizontal) {
                scrollEl.setStyle('min-width', parentEl.getWidth(true) + 'px');
                scrollEl.setHeight(parentEl.getHeight(true) || null);
            }
            if (scroller.vertical) {
                scrollEl.setStyle('min-height', parentEl.getHeight(true) + 'px');
                scrollEl.setWidth(parentEl.getWidth(true) || null);
            }
            scroller.updateBoundary(true);
        }

        if (this.fullscreen && Ext.is.iPad) {
            Ext.repaint();
        }
    },

    layoutOrientation: Ext.emptyFn,

    
    update: function(){
        
        Ext.Component.superclass.update.apply(this, arguments);
        var scroller = this.scroller;
        if (scroller && scroller.updateBoundary){
            scroller.updateBoundary(true);
        }
    },

    
    show : function(animation) {
        var rendered = this.rendered;
        if ((this.hidden || !rendered) && this.fireEvent('beforeshow', this) !== false) {
            if (this.anchorEl) {
                this.anchorEl.hide();
            }
            if (!rendered && this.autoRender) {
                this.render(Ext.isBoolean(this.autoRender) ? Ext.getBody() : this.autoRender);
            }
            this.hidden = false;
            if (this.rendered) {
                this.onShow(animation);
                this.fireEvent('show', this);
            }
        }
        return this;
    },

    
    showBy : function(alignTo, animation, allowSides, anchor) {
        if (!this.floating) {
            return this;
        }
        
        if (alignTo.isComponent) {
            alignTo = alignTo.el;
        }
        else {
            alignTo = Ext.get(alignTo);
        }

        this.x = 0;
        this.y = 0;

        this.show(animation);

        if (anchor !== false) {
            if (!this.anchorEl) {
                this.anchorEl = this.el.createChild({
                    cls: 'x-anchor'
                });
            }
            this.anchorEl.show();            
        }
        
        this.alignTo(alignTo, allowSides, 20);
    },
    
    alignTo : function(alignTo, allowSides, offset) {
        
        var alignBox = alignTo.getPageBox(),
            constrainBox = {
                width: window.innerWidth,
                height: window.innerHeight
            },
            size = this.getSize(),
            newSize = {
                width: Math.min(size.width, constrainBox.width),
                height: Math.min(size.height, constrainBox.height)
            },
            position,
            index = 2,
            positionMap = [
                'tl-bl',
                't-b',
                'tr-br',
                'l-r',
                'l-r',
                'r-l',
                'bl-tl',
                'b-t',
                'br-tr'
            ],
            anchorEl = this.anchorEl,
            offsets = [0, offset],
            targetBox, cls,
            onSides = false,
            arrowOffsets = [0, 0],
            alignCenterX = alignBox.left + (alignBox.width / 2),
            alignCenterY = alignBox.top + (alignBox.height / 2);

        if (alignCenterX <= constrainBox.width * (1/3)) {
            index = 1;
            arrowOffsets[0] = 25;
        }
        else if (alignCenterX >= constrainBox.width * (2/3)) {
            index = 3;
            arrowOffsets[0] = -30;
        }
        
        if (alignCenterY >= constrainBox.height * (2/3)) {
            index += 6;
            offsets = [0, -offset];
            arrowOffsets[1] = -10;
        }
        
        
        else if (allowSides !== false && alignCenterY >= constrainBox.height * (1/3)) {
            index += 3;
            offsets = (index <= 5) ? [offset, 0] : [-offset, 0];
            arrowOffsets = (index <= 5) ? [10, 0] : [-10, 0];
            onSides = true;
        }
        else {
            arrowOffsets[1] = 10;
        }
        
        position = positionMap[index-1];
        targetBox = this.el.getAlignToXY(alignTo, position, offsets);

        
        
        if (onSides) {
            if (targetBox[0] < 0) {
                newSize.width = alignBox.left - offset;
            }
            else if (targetBox[0] + newSize.width > constrainBox.width) {
                newSize.width = constrainBox.width - alignBox.right - offset;
            }
        }
        else {
            if (targetBox[1] < 0) {
                newSize.height = alignBox.top - offset;
            }
            else if (targetBox[1] + newSize.height > constrainBox.height) {
                newSize.height = constrainBox.height - alignBox.bottom - offset;
            }
        }
        
        if (newSize.width != size.width) {
            this.setSize(newSize.width);
        }
        else if (newSize.height != size.height) {
            this.setSize(undefined, newSize.height);
        }

        targetBox = this.el.getAlignToXY(alignTo, position, offsets);                
        this.setPosition(targetBox[0], targetBox[1]);
        
        if (anchorEl) {
            
            anchorEl.removeCls(['x-anchor-bottom', 'x-anchor-left', 'x-anchor-right', 'x-anchor-top']);
            if (offsets[1] == offset) {
                cls = 'x-anchor-top';
            }
            else if (offsets[1] == -offset) {
                cls = 'x-anchor-bottom';
            }
            else if (offsets[0] == offset) {
                cls = 'x-anchor-left';
            }
            else {
                cls = 'x-anchor-right';
            }
            targetBox = anchorEl.getAlignToXY(alignTo, position, arrowOffsets);
            anchorEl.setXY(targetBox);
            anchorEl.addCls(cls);
        }
        
        return position;
    },

    
    setCentered : function(centered, update) {
        this.centered = centered;

        if (this.rendered && update) {
            var x, y;
            if (!this.ownerCt) {
                x = (Ext.Element.getViewportWidth() / 2) - (this.getWidth() / 2);
                y = (Ext.Element.getViewportHeight() / 2) - (this.getHeight() / 2);
            }
            else {
                x = (this.ownerCt.getTargetEl().getWidth() / 2) - (this.getWidth() / 2);
                y = (this.ownerCt.getTargetEl().getHeight() / 2) - (this.getHeight() / 2);
            }
            this.setPosition(x, y);
        }

        return this;
    },

    
    hide : function(animation) {
        if (!this.hidden && this.fireEvent('beforehide', this) !== false) {
            this.hidden = true;
            if (this.rendered) {
                this.onHide(animation, true);
            }
        }
        return this;
    },

    
    onShow : function(animation) {
        this.el.show();
        
        Ext.Component.superclass.onShow.call(this, animation);
        
        if (animation === undefined || animation === true) {
            animation = this.showAnimation;
        }

        if (this.floating) {
            this.el.dom.parentNode || this.el.appendTo(document.body);

            if (animation) {
                this.el.setStyle('opacity', 0.01);
            }

            if (this.centered) {
                this.setCentered(true, true);
            }
            else {
                this.setPosition(this.x, this.y);
            }

            if (this.modal) {
                this.el.parent().mask(null, 'x-mask-gray');
            }

            if (this.hideOnMaskTap) {
                Ext.getDoc().on('touchstart', this.onFloatingTouchStart, this, {capture: true, subsequent: true});
            }
        }
        
        if (animation) {
            

            Ext.Anim.run(this, animation, {
                out: false,
                autoClear: true
            });

            this.showAnimation = animation;
        }
    },

    
    onFloatingTouchStart: function(e) {
        if (!this.el.contains(e.target)) {
            this.hide();
            if (this.stopMaskTapEvent || Ext.fly(e.target).hasCls('x-mask')) {
                e.stopEvent();
            }
        }
    },

    
    onHide : function(animation, fireHideEvent) {
        if (animation === undefined || animation === true) {
            animation = this.showAnimation;
        }

        if (this.hideOnMaskTap && this.floating) {
            Ext.getDoc().un('touchstart', this.onFloatingTouchStart, this, {capture: true, subsequent: true});
        }

        if (animation) {
            Ext.Anim.run(this, animation, {
                out: true,
                reverse: true,
                autoClear: true,
                scope: this,
                fireHideEvent: fireHideEvent,
                after: this.doHide
            });
        } else {
            this.doHide(null, {fireHideEvent: fireHideEvent});
        }
    },

    
    doHide : function(el, options) {
        var parent = this.el.parent();

        this.el.hide();
        
        if (parent && this.floating && this.modal) {
            parent.unmask();
        }
        if (options && options.fireHideEvent) {
            this.fireEvent('hide', this);
        }
    },

    
    setScrollable : function(config) {
        var me = this,
            direction;
            
        if (!me.rendered) {
            me.scroll = config;
            return;
        }

        Ext.destroy(me.scroller);
        me.scroller = null;
        
        
        if (me.originalGetTargetEl) {
            me.getTargetEl = me.originalGetTargetEl;
        }
        
        if (config !== false) {
            direction = Ext.isObject(config) ? config.direction: config;
            config = Ext.apply({},
            Ext.isObject(config) ? config: {}, {

                direction: direction
            });

            if (!me.scrollEl) {
                me.scrollEl = me.getTargetEl().createChild();
            }
            me.originalGetTargetEl = me.getTargetEl;
            me.getTargetEl = function() {
                return me.scrollEl;
            };
            me.scroller = (new Ext.util.ScrollView(me.scrollEl, config)).scroller;
        }
    },

    
    setFloating : function(floating, autoShow) {
        this.floating = !!floating;
        this.hidden = true;
        if (this.rendered) {
            if (floating !== false) {
                this.el.addCls(this.floatingCls);
                if (autoShow) {
                    this.show();
                }
            }
            else {
                this.el.removeCls(this.floatingCls);
                Ext.getDoc().un('touchstart', this.onFloatingTouchStart, this);
            }
        }
        else if (floating !== false) {
            if (this.layoutOnOrientationChange !== false) {
                this.layoutOnOrientationChange = true;
            }
            this.autoRender = true;
        }
    },

    
    setDraggable : function(draggable, autoShow) {
        this.isDraggable = draggable;

        if (this.rendered) {
            if (draggable === false) {
                if (this.dragObj) {
                    this.dragObj.disable();
                }
            } else {
                if (autoShow) {
                    this.show();
                }
                if (this.dragObj) {
                    this.dragObj.enable();
                } else {
                    this.dragObj = new Ext.util.Draggable(this.el, Ext.apply({}, this.draggable || {}));
                    this.relayEvents(this.dragObj, ['dragstart', 'beforedragend' ,'drag', 'dragend']);
                }
            }
        }
    },

    
    setOrientation : function(orientation, w, h) {
        if (this.fireEvent('beforeorientationchange', this, orientation, w, h) !== false) {
            if (this.orientation != orientation) {
                this.el.removeCls('x-' + this.orientation);
                this.el.addCls('x-' + orientation);
            }

            this.orientation = orientation;
            this.layoutOrientation(orientation, w, h);

            if (this.fullscreen) {
                this.setSize(w, h);
            }
            else if (this.layoutOnOrientationChange) {
                this.doComponentLayout();
            }

            if (this.floating && this.centered) {
                this.setCentered(true, true);
            }

            this.onOrientationChange(orientation, w, h);
            this.fireEvent('orientationchange', this, orientation, w, h);
        }
    },

    
    onOrientationChange : Ext.emptyFn,

    beforeDestroy : function() {
        if (this.floating && this.modal && !this.hidden) {
            this.el.parent().unmask();
        }
        Ext.destroy(this.scroller);
        Ext.Component.superclass.beforeDestroy.call(this);
    },
    
    onDestroy : function() {
        if (this.monitorOrientation && Ext.EventManager.orientationEvent) {
            Ext.EventManager.orientationEvent.removeListener(this.setOrientation, this);
        }
        
        Ext.Component.superclass.onDestroy.call(this);
    }
});


Ext.BoxComponent = Ext.Component;

Ext.reg('component', Ext.Component);
Ext.reg('box', Ext.BoxComponent);

Ext.lib.Container = Ext.extend(Ext.Component, {
    
     
    
    
    


    
    autoDestroy : true,

     
    defaultType: 'panel',

    isContainer : true,

    baseCls: 'x-container',

    
    bubbleEvents: ['add', 'remove'],

    
    initComponent : function(){
        this.addEvents(
            
            'afterlayout',
            
            'beforeadd',
            
            'beforeremove',
            
            'add',
            
            'remove',
            
            'beforecardswitch',
            
            'cardswitch'
        );

        
        this.layoutOnShow = new Ext.util.MixedCollection();
        Ext.lib.Container.superclass.initComponent.call(this);
        this.initItems();
    },

    
    initItems : function() {
        var items = this.items;
        
        
        this.items = new Ext.util.MixedCollection(false, this.getComponentId);

        if (items) {
            if (!Ext.isArray(items)) {
                items = [items];
            }

            this.add(items);
        }
    },

    
    afterRender : function() {
        this.getLayout();
        Ext.lib.Container.superclass.afterRender.apply(this, arguments);
    },

    
    setLayout : function(layout) {
        var currentLayout = this.layout;
        
        if (currentLayout && currentLayout.isLayout && currentLayout != layout) {
            currentLayout.setOwner(null);
        }
        
        this.layout = layout;
        layout.setOwner(this);
    },

    
    getLayout : function() {
        if (!this.layout || !this.layout.isLayout) {
            this.setLayout(Ext.layout.LayoutManager.create(this.layout, 'autocontainer'));
        }
        
        return this.layout;
    },

    
    doLayout : function() {
        var layout = this.getLayout();
        
        if (this.rendered && layout) {
            layout.layout();
        }
        
        return this;
    },

    
    afterLayout : function(layout) {
        this.fireEvent('afterlayout', this, layout);
    },

    
    prepareItems : function(items, applyDefaults) {
        if (!Ext.isArray(items)) {
            items = [items];
        }
        
        
        var item, i, ln;
        
        for (i = 0, ln = items.length; i < ln; i++) {
            item = items[i];
            
            if (applyDefaults) {
                item = this.applyDefaults(item);
            }
            
            items[i] = this.lookupComponent(item);
        }
        
        return items;
    },

    
    applyDefaults : function(config) {
        var defaults = this.defaults;
        
        if (defaults) {
            if (Ext.isFunction(defaults)) {
                defaults = defaults.call(this, config);
            }
            
            if (Ext.isString(config)) {
                config = Ext.ComponentMgr.get(config);
                Ext.apply(config, defaults);
            } else if (!config.isComponent) {
                Ext.applyIf(config, defaults);
            } else {
                Ext.apply(config, defaults);
            }
        }
        
        return config;
    },

    
    lookupComponent : function(comp) {
        if (Ext.isString(comp)) {
            return Ext.ComponentMgr.get(comp);
        } else {
            return this.createComponent(comp);
        }
        return comp;
    },

    
    createComponent : function(config, defaultType) {
        if (config.isComponent) {
            return config;
        }

        
        
        
        
        
        

        return Ext.create(config, defaultType || this.defaultType);
    },

    
    getComponentId : function(comp) {
        return comp.getItemId();
    },

    
    add : function() {
        var args = Array.prototype.slice.call(arguments),
            index = -1;

        if (typeof args[0] == 'number') {
            index = args.shift();
        }

        var hasMultipleArgs = args.length > 1;
        
        if (hasMultipleArgs || Ext.isArray(args[0])) {
            var items = hasMultipleArgs ? args : args[0],
                results = [],
                i, ln, item;

            for (i = 0, ln = items.length; i < ln; i++) {
                item = items[i];
                if (!item) {
                    throw "Trying to add a null item as a child of Container with itemId/id: " + this.getItemId();
                }
                
                if (index != -1) {
                    item = this.add(index + i, item);
                } else {
                    item = this.add(item);
                }
                results.push(item);
            }

            return results;
        }

        var cmp = this.prepareItems(args[0], true)[0];
        index = (index !== -1) ? index : this.items.length;

        if (this.fireEvent('beforeadd', this, cmp, index) !== false && this.onBeforeAdd(cmp) !== false) {
            this.items.insert(index, cmp);
            cmp.onAdded(this, index);
            this.onAdd(cmp, index);
            this.fireEvent('add', this, cmp, index);
        }

        return cmp;
    },

    onAdd : Ext.emptyFn,
    onRemove : Ext.emptyFn,

    
    insert : function(index, comp){
        return this.add(index, comp);
    },

    
    onBeforeAdd : function(item) {
        if (item.ownerCt) {
            item.ownerCt.remove(item, false);
        }
        
        if (this.hideBorders === true){
            item.border = (item.border === true);
        }
    },

    
    remove : function(comp, autoDestroy) {
        var c = this.getComponent(comp);
			if (!c) {
            	console.warn("Attempted to remove a component that does not exist. Ext.Container: remove takes an argument of the component to remove. cmp.remove() is incorrect usage.");				
			}
        
        if (c && this.fireEvent('beforeremove', this, c) !== false) {
            this.doRemove(c, autoDestroy);
            this.fireEvent('remove', this, c);
        }
        
        return c;
    },

    
    doRemove : function(component, autoDestroy) {
        var layout = this.layout,
            hasLayout = layout && this.rendered;

        this.items.remove(component);
        component.onRemoved();
        
        if (hasLayout) {
            layout.onRemove(component);
        }
        
        this.onRemove(component, autoDestroy);

        if (autoDestroy === true || (autoDestroy !== false && this.autoDestroy)) {
            component.destroy();
        }

        if (hasLayout && !autoDestroy) {
            layout.afterRemove(component);
        }
    },

    
    removeAll : function(autoDestroy) {
        var item,
            removeItems = this.items.items.slice(),
            items = [],
            ln = removeItems.length,
            i;
        
        for (i = 0; i < ln; i++) {
            item = removeItems[i];
            this.remove(item, autoDestroy);
            
            if (item.ownerCt !== this) {
                items.push(item);
            }
        }
        
        return items;
    },

    
    
    
    
    getRefItems : function(deep) {
        var items = this.items.items.slice(),
            ln = items.length,
            i, item;

        if (deep) {
            for (i = 0; i < ln; i++) {
                item = items[i];
                
                if (item.getRefItems) {
                    items = items.concat(item.getRefItems(true));
                }
            }
        }

        return items;
    },

    
    getComponent : function(comp) {
        if (Ext.isObject(comp)) {
            comp = comp.getItemId();
        }
        
        return this.items.get(comp);
    },

    
    query : function(selector) {
        return Ext.ComponentQuery.query(selector, this);
    },

    
    child : function(selector) {
        return this.query('> ' + selector)[0] || null;
    },
    
    
    
    down : function(selector) {
        return this.query(selector)[0] || null;
    },

    
    show : function() {
        Ext.lib.Container.superclass.show.apply(this, arguments);
        
        var layoutCollection = this.layoutOnShow,
            ln = layoutCollection.getCount(),
            i = 0,
            needsLayout,
            item;
            
        for (; i < ln; i++) {
            item = layoutCollection.get(i);
            needsLayout = item.needsLayout;
            
            if (Ext.isObject(needsLayout)) {
                item.doComponentLayout(needsLayout.width, needsLayout.height, needsLayout.isSetSize);
            }
        }
        
        layoutCollection.clear();
    },

    
    beforeDestroy : function() {
        var items = this.items,
            c;
            
        if (items) {
            while ((c = items.first())) {
                this.doRemove(c, true);
            }
        }
        
        Ext.destroy(this.layout);
        Ext.lib.Container.superclass.beforeDestroy.call(this);
    }
});


Ext.Container = Ext.extend(Ext.lib.Container, {});
Ext.reg('container', Ext.Container);


Ext.Container = Ext.extend(Ext.lib.Container, {
    
    cardSwitchAnimation: null,

    initComponent: function() {
        if (this.scroll) {
            this.fields = new Ext.util.MixedCollection();

            if (!Ext.is.Blackberry) {
                this.fields.on({
                    add: this.onFieldAdd,
                    remove: this.onFieldRemove,
                    scope: this
                });
            }

            this.on({
                add: this.onItemAdd,
                remove: this.onItemRemove,
                scope: this
            });
        }


        Ext.Container.superclass.initComponent.apply(this, arguments);
    },

    afterRender: function() {
        Ext.Container.superclass.afterRender.apply(this, arguments);

        if (this.scroller) {
            if ((Ext.is.Android) && this.containsFormFields) {
                this.scroller.setUseCssTransform(false);
            }

            this.scroller.on('scrollstart', this.onFieldScrollStart, this);
        }
    },

    onFieldScrollStart: function() {
        var focusedField = this.focusedField;

        if (focusedField && Ext.is.iOS) {
            focusedField.blur();

        }
    },

    onItemAdd: function(me, item) {
        this.fields.addAll(Ext.ComponentQuery.query('[isField]', item));
    },

    onItemRemove: function(me, item) {
        this.fields.removeAll(Ext.ComponentQuery.query('[isField]', item));
    },

    onFieldAdd: function(key, field) {
        this.handleFieldEventListener(true, field);
    },

    onFieldRemove: function(key, field) {
        this.handleFieldEventListener(false, field);
    },

    handleFieldEventListener: function(isAdding, item) {
        if (!this.fieldEventWrap)
            this.fieldEventWrap = {};

        if (['textfield', 'passwordfield', 'emailfield',
             'textareafield', 'searchfield', 'urlfield',
             'numberfield', 'spinnerfield'].indexOf(item.xtype) !== -1) {
            if (isAdding) {
                this.fieldEventWrap[item.id] = {
                    beforefocus: function(e) {this.onFieldBeforeFocus(item, e);},
                    focus: function(e) {this.onFieldFocus(item, e);},
                    blur: function(e) {this.onFieldBlur(item, e);},
                    keyup: function(e) {this.onFieldKeyUp(item, e);},
                    scope: this
                };

                this.containsFormFields = true;
            }

            item[isAdding ? 'on' : 'un'](this.fieldEventWrap[item.id]);

            if (!isAdding) {
                delete this.fieldEventWrap[item.id];
            }
        }
    },

    onFieldKeyUp: function(field, e) {
        if (Ext.is.iOS || Ext.is.Desktop) {
            this.resetLastWindowScroll();
        }
    },

    onFieldBeforeFocus: function(field, e) {
        this.focusingField = field;
    },

    getLastWindowScroll: function() {
        if (!this.lastWindowScroll) {
            this.resetLastWindowScroll();
        }

        return {x: this.lastWindowScroll.x, y: this.lastWindowScroll.y};
    },

    resetLastWindowScroll: function() {
        this.lastWindowScroll = {
            x: window.pageXOffset,
            y: window.pageYOffset
        };
    },

    adjustScroller: function(offset) {
        var scroller = this.getClosestScroller(),
            windowScroll = this.getLastWindowScroll();

        scroller.setOffset(offset);

        
        if (Ext.is.iOS) {
            window.scrollTo(windowScroll.x, windowScroll.y);
        }

        this.resetLastWindowScroll();
    },

    onFieldFocus: function(field, e) {
        if (!Ext.is.iOS && !Ext.is.Desktop) {
            var dom = field.fieldEl.dom;

            if (dom.scrollIntoViewIfNeeded) {
                dom .scrollIntoViewIfNeeded(true);
            }
        }
        else {
             var scroller = this.getClosestScroller(),
                containerRegion = Ext.util.Region.from(scroller.containerBox),
                fieldRegion = field.fieldEl.getPageBox(true);

            
            if (this.focusingField == field || !Ext.is.iOS) {
                if (Ext.is.iOS && window.pageYOffset == 0) {
                    window.scrollTo(0, 0);
                }

                var adjustment = new Ext.util.Offset();

                if (fieldRegion.left < containerRegion.left) {
                    adjustment.x = containerRegion.left - fieldRegion.left;
                }

                if (fieldRegion.top < containerRegion.top) {
                    adjustment.y = containerRegion.top - fieldRegion.top;
                }

                if (!adjustment.isZero()) {
                    var windowScroll = this.getLastWindowScroll();

                    scroller.scrollBy(adjustment);

                    if (Ext.is.iOS) {
                        window.scrollTo(windowScroll.x, windowScroll.y);
                    }

                    this.resetLastWindowScroll();
                }
            }
            
            else {
                if (this.lastFocusedField) {
                    var deltaY = fieldRegion.top - this.lastFocusedField.fieldEl.getY(),
                        offsetY = scroller.offset.y - deltaY,
                        selfHandling = false;

                    if (!containerRegion.contains(fieldRegion) &&
                        (offsetY != 0 || (offsetY == 0 && scroller.offset.y != 0))) {
                        selfHandling = true;
                    }

                    if (offsetY > 0) {
                        offsetY = 0;
                    }

                    if (selfHandling) {
                        this.adjustScroller(new Ext.util.Offset(
                            scroller.offset.x, offsetY
                        ));
                    }
                }
            }

            this.resetLastWindowScroll();
        }

        this.lastFocusedField = field;
        this.focusedField = field;
        this.focusingField = null;
    },

    getClosestScroller: function() {
        if (!this.closestScroller) {
            this.closestScroller = this.scroller || this.el.getScrollParent();
        }

        return this.closestScroller;
    },

    onFieldBlur: function(field, e) {
        if (this.focusingField == field) {
            this.focusingField = null;
        }

        if (this.focusedField == field) {
            this.focusedField = null;
        }
    },

    
    afterLayout : function(layout) {
        if (this.floating && this.centered) {
            this.setCentered(true, true);
        }

        if (this.scroller) {
            this.scroller.updateBoundary();
        }
        Ext.Container.superclass.afterLayout.call(this, layout);
    },

    
    getActiveItem : function() {
        if (this.layout && this.layout.type == 'card') {
            return this.layout.activeItem;
        }
        else {
            return null;
        }
    },

    
    setActiveItem : function(card, animation) {
        this.layout.setActiveItem(card, animation);
        return this;
    },


    
    onBeforeCardSwitch : function(newCard, oldCard, newIndex, animated) {
        return this.fireEvent('beforecardswitch', this, newCard, oldCard, newIndex, animated);
    },

    
    onCardSwitch : function(newCard, oldCard, newIndex, animated) {
        return this.fireEvent('cardswitch', this, newCard, oldCard, newIndex, animated);
    },

    
    disable: function() {
        Ext.Container.superclass.disable.call(this);
        this.el.mask(null, 'x-mask-gray');
    },

    
    enable: function() {
        Ext.Container.superclass.enable.call(this);
        this.el.unmask();
    }
});

Ext.reg('container', Ext.Container);


Ext.lib.Panel = Ext.extend(Ext.Container, {
    
    baseCls : 'x-panel',

    

    

    

    isPanel: true,

    componentLayout: 'dock',

    renderTpl: ['<div class="{baseCls}-body<tpl if="bodyCls"> {bodyCls}</tpl>"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>></div>'],

    

    initComponent : function() {
        this.addEvents(
            
            'bodyresize'
            
            
            
            
        );

        Ext.applyIf(this.renderSelectors, {
            body: '.' + this.baseCls + '-body'
        });

        Ext.lib.Panel.superclass.initComponent.call(this);
    },

    
    initItems : function() {
        Ext.lib.Panel.superclass.initItems.call(this);

        var items = this.dockedItems;
        this.dockedItems = new Ext.util.MixedCollection(false, this.getComponentId);
        if (items) {
            this.addDocked(items);
        }
    },

    
    getDockedComponent: function(comp) {
        if (Ext.isObject(comp)) {
            comp = comp.getItemId();
        }
        return this.dockedItems.get(comp);
    },

    
    getComponent: function(comp) {
        var component = Ext.lib.Panel.superclass.getComponent.call(this, comp);
        if (component == undefined) {
            component = this.getDockedComponent(comp);
        }
        return component;
    },

    
    initBodyStyles: function() {
        var bodyStyle = Ext.isString(this.bodyStyle) ? this.bodyStyle.split(';') : [],
            Element = Ext.Element;

        if (this.bodyPadding != undefined) {
            bodyStyle.push('padding: ' + Element.unitizeBox((this.bodyPadding === true) ? 5 : this.bodyPadding));
        }
        if (this.bodyMargin != undefined) {
            bodyStyle.push('margin: ' + Element.unitizeBox((this.bodyMargin === true) ? 5 : this.bodyMargin));
        }
        if (this.bodyBorder != undefined) {
            bodyStyle.push('border-width: ' + Element.unitizeBox((this.bodyBorder === true) ? 1 : this.bodyBorder));
        }
        delete this.bodyStyle;
        return bodyStyle.length ? bodyStyle.join(';') : undefined;
    },

    
    initRenderData: function() {
        return Ext.applyIf(Ext.lib.Panel.superclass.initRenderData.call(this), {
            bodyStyle: this.initBodyStyles(),
            bodyCls: this.bodyCls
        });
    },

    
    addDocked : function(items, pos) {
        items = this.prepareItems(items);

        var item, i, ln;
        for (i = 0, ln = items.length; i < ln; i++) {
            item = items[i];
            item.dock = item.dock || 'top';
            if (pos !== undefined) {
                this.dockedItems.insert(pos+i, item);
            }
            else {
                this.dockedItems.add(item);
            }
            item.onAdded(this, i);
            this.onDockedAdd(item);
        }
        if (this.rendered) {
            this.doComponentLayout();
        }
    },

    
    onDockedAdd : Ext.emptyFn,
    onDockedRemove : Ext.emptyFn,

    
    insertDocked : function(pos, items) {
        this.addDocked(items, pos);
    },

    
    removeDocked : function(item, autoDestroy) {
        if (!this.dockedItems.contains(item)) {
            return item;
        }

        var layout = this.componentLayout,
            hasLayout = layout && this.rendered;

        if (hasLayout) {
            layout.onRemove(item);
        }

        this.dockedItems.remove(item);
        item.onRemoved();
        this.onDockedRemove(item);

        if (autoDestroy === true || (autoDestroy !== false && this.autoDestroy)) {
            item.destroy();
        }

        if (hasLayout && !autoDestroy) {
            layout.afterRemove(item);
        }
        this.doComponentLayout();

        return item;
    },

    
    getDockedItems : function() {
        if (this.dockedItems && this.dockedItems.items.length) {
            return this.dockedItems.items.slice();
        }
        return [];
    },

    
    getTargetEl : function() {
        return this.body;
    },


    getRefItems: function(deep) {
        var refItems    = Ext.lib.Panel.superclass.getRefItems.call(this, deep),
            
            dockedItems = this.getDockedItems(),
            ln          = dockedItems.length,
            i           = 0,
            item;

        refItems = refItems.concat(dockedItems);

        if (deep) {
            for (; i < ln; i++) {
                item = dockedItems[i];
                if (item.getRefItems) {
                    refItems = refItems.concat(item.getRefItems(true));
                }
            }
        }

        return refItems;
    },
    
    beforeDestroy: function(){
        var docked = this.dockedItems,
            c;
            
        if (docked) {
            while ((c = docked.first())) {
                this.removeDocked(c, true);
            }
        }
        Ext.lib.Panel.superclass.beforeDestroy.call(this);
    }
});


Ext.Panel = Ext.extend(Ext.lib.Panel, {});
Ext.reg('panel', Ext.Panel);


Ext.Panel = Ext.extend(Ext.lib.Panel, {
    
    scroll: false
});

Ext.reg('panel', Ext.Panel);



Ext.Button = Ext.extend(Ext.Component, {
    

    initComponent: function(){
        this.addEvents(
            
            'tap',
            
            
            'beforetap'
        );
        Ext.Button.superclass.initComponent.call(this);

        this.createAutoHandler();
    },

    

    

    
     
    
    iconAlign: 'left',
    
    

    

    

    

    
    baseCls: 'x-button',

    
    pressedCls: 'x-button-pressed',

    
    badgeText: '',

    
    badgeCls: 'x-badge',

    hasBadgeCls: 'x-hasbadge',

    labelCls: 'x-button-label',

    
    ui: 'normal',

    isButton: true,

    

    
    pressedDelay: 0,
    
    
    iconMaskCls: 'x-icon-mask',
    
    
    iconMask: false,

    
    afterRender : function(ct, position) {
        var me = this;
        
        Ext.Button.superclass.afterRender.call(me, ct, position);

        var text = me.text,
            icon = me.icon,
            iconCls = me.iconCls,
            badgeText = me.badgeText;

        me.text = me.icon = me.iconCls = me.badgeText = null;

        me.setText(text);
        me.setIcon(icon);
        me.setIconClass(iconCls);
        
        if (me.iconMask && me.iconEl) {
            me.iconEl.addCls(me.iconMaskCls);
        }
        me.setBadge(badgeText);
    },

    
    initEvents : function() {
        var me = this;
        
        Ext.Button.superclass.initEvents.call(me);

        me.mon(me.el, {
            scope: me,
            
            tap      : me.onPress,
            tapstart : me.onTapStart,
            tapcancel: me.onTapCancel
        });
    },

    
    onTapStart : function() {
        var me = this;
        if (!me.disabled) {
            if (me.pressedDelay) {
                me.pressedTimeout = setTimeout(function() {
                    me.el.addCls(me.pressedCls);
                }, Ext.isNumber(me.pressedDelay) ? me.pressedDelay : 100);
            }
            else {
                me.el.addCls(me.pressedCls);
            }
        }
    },

    
    onTapCancel : function() {
        var me = this;
        if (me.pressedTimeout) {
            clearTimeout(me.pressedTimeout);
            delete me.pressedTimeout;
        }
        me.el.removeCls(me.pressedCls);
    },

    
    setHandler : function(handler, scope) {
        this.handler = handler;
        this.scope = scope;
        return this;
    },

    
    setText: function(text) {
        var me = this;
        
        if (me.rendered) {
            if (!me.textEl && text) {
                me.textEl = me.el.createChild({
                    tag: 'span',
                    html: text,
                    cls: this.labelCls
                });
            }
            else if (me.textEl && text != me.text) {
                if (text) {
                    me.textEl.setHTML(text);
                }
                else {
                    me.textEl.remove();
                    me.textEl = null;
                }
            }
        }
        me.text = text;
        return me;
    },

    
    setIcon: function(icon) {
        var me = this;
        
        if (me.rendered) {
            if (!me.iconEl && icon) {
                me.iconEl = me.el.createChild({
                    tag: 'img',
                    src: Ext.BLANK_IMAGE_URL,
                    style: 'background-image: ' + (icon ? 'url(' + icon + ')' : '')
                });
                
                me.setIconAlign(me.iconAlign);
            }
            else if (me.iconEl && icon != me.icon) {
                if (icon) {
                    me.iconEl.setStyle('background-image', icon ? 'url(' + icon + ')' : '');
                    me.setIconAlign(me.iconAlign);
                }
                else {
                    me.setIconAlign(false);
                    me.iconEl.remove();
                    me.iconEl = null;
                }
            }
        }
        me.icon = icon;
        return me;
    },

    
    setIconClass: function(cls) {
        var me = this;
        
        if (me.rendered) {
            if (!me.iconEl && cls) {
                me.iconEl = me.el.createChild({
                    tag: 'img',
                    src: Ext.BLANK_IMAGE_URL,
                    cls: cls
                });
                
                me.setIconAlign(me.iconAlign);
            }
            else if (me.iconEl && cls != me.iconCls) {
                if (cls) {
                    if (me.iconCls) {
                        me.iconEl.removeCls(me.iconCls);
                    }
                    me.iconEl.addCls(cls);
                    me.setIconAlign(me.iconAlign);
                }
                else {
                    me.setIconAlign(false);
                    me.iconEl.remove();
                    me.iconEl = null;
                }
            }
        }
        me.iconCls = cls;
        return me;
    },
    
    
    setIconAlign: function(alignment) {
        var me         = this,
            alignments = ['top', 'right', 'bottom', 'left'],
            alignment  = ((alignments.indexOf(alignment) == -1 || !alignment) && alignment !== false) ? me.iconAlign : alignment,
            i;
        
        if (me.rendered && me.iconEl) {
            me.el.removeCls('x-iconalign-' + me.iconAlign);
            
            if (alignment) me.el.addCls('x-iconalign-' + alignment);
        }
        me.iconAlign = (alignment === false) ? me.iconAlign : alignment;
        return me;
    },

    
    setBadge : function(text) {
        var me = this;
        
        if (me.rendered) {
            if (!me.badgeEl && text) {
                me.badgeEl = me.el.createChild({
                    tag: 'span',
                    cls: me.badgeCls,
                    html: text
                });
                me.el.addCls(me.hasBadgeCls);
            }
            else if (me.badgeEl && text != me.badgeText) {
                if (text) {
                    me.badgeEl.setHTML(text);
                    me.el.addCls(me.hasBadgeCls);
                }
                else {
                    me.badgeEl.remove();
                    me.badgeEl = null;
                    me.el.removeCls(me.hasBadgeCls);
                }
            }
        }
        me.badgeText = text;
        return me;
    },

    
    getText : function() {
        return this.text;
    },

    
    getBadgeText : function() {
        return this.badgeText;
    },

    
    onDisable : function() {
        this.onDisableChange(true);
    },

    
    onEnable : function() {
        this.onDisableChange(false);
    },

    
    onDisableChange : function(disabled) {
        var me = this;
        if (me.el) {
            me.el[disabled ? 'addCls' : 'removeCls'](me.disabledCls);
            me.el.dom.disabled = disabled;
        }
        me.disabled = disabled;
    },

    
    onPress : function(e) {
        var me = this;
        if (!me.disabled && this.fireEvent('beforetap') !== false) {
            setTimeout(function() {
                if (!me.preventCancel) {
                    me.onTapCancel();
                }
                me.callHandler(e);
                me.fireEvent('tap', me, e);                
            }, 10);
        }
    },

    
    callHandler: function(e) {
        var me = this;
        if (me.handler) {
            me.handler.call(me.scope || me, me, e);
        }
    },

    
    createAutoHandler: function() {
        var me = this,
            autoEvent = me.autoEvent;

        if (autoEvent) {
            if (typeof autoEvent == 'string') {
                autoEvent = {
                    name: autoEvent,
                    scope: me.scope || me
                };
            }

            me.addEvents(autoEvent.name);

            me.setHandler(function() {
                autoEvent.scope.fireEvent(autoEvent.name, autoEvent.scope, me);
            }, autoEvent.scope);
        }
    }
});

Ext.reg('button', Ext.Button);


Ext.SegmentedButton = Ext.extend(Ext.Container, {
    defaultType: 'button',
    componentCls: 'x-segmentedbutton',
    pressedCls: 'x-button-pressed',

    
    allowMultiple: false,

    
    
    
    initComponent : function() {
        this.layout = Ext.apply({}, this.layout || {}, {
            type: 'hbox',
            align: 'stretch'
        });
        
        Ext.SegmentedButton.superclass.initComponent.call(this);
        
        if (this.allowDepress === undefined) {
            this.allowDepress = this.allowMultiple;
        }
        
        this.addEvents(
            
            'toggle'
        );
    },

    
    initEvents : function() {
        Ext.SegmentedButton.superclass.initEvents.call(this);

        this.mon(this.el, {
            tap: this.onTap,
            capture: true,
            scope: this
        });
    },

    
    afterLayout : function(layout) {
        var me = this;
        
        Ext.SegmentedButton.superclass.afterLayout.call(me, layout);

        if (!me.initialized) {
            me.items.each(function(item, index) {
                me.setPressed(item, !!item.pressed, true); 
            });
            if (me.allowMultiple) {
                me.pressedButtons = me.getPressedButtons();
            }
            me.initialized = true;
        }
    },

    
    onTap : function(e, t) {
        if (!this.disabled && (t = e.getTarget('.x-button'))) {
            this.setPressed(t.id, this.allowDepress ? undefined : true);
        }
    },
    
    
    getPressed : function() {
        return this.allowMultiple ? this.getPressedButtons() : this.pressedButton;
    },

    
    setPressed : function(btn, pressed, suppressEvents) {
        var me = this;
        
        btn = me.getComponent(btn);
        if (!btn || !btn.isButton || btn.disabled) {
            if (!me.allowMultiple && me.pressedButton) {
                me.setPressed(me.pressedButton, false);
            }
            return;
        }
        
        if (!Ext.isBoolean(pressed)) {
            pressed = !btn.pressed;
        }
        
        if (pressed) {
            if (!me.allowMultiple) {
                if (me.pressedButton && me.pressedButton !== btn) {
                    me.pressedButton.el.removeCls(me.pressedCls);
                    me.pressedButton.pressed = false;
                    if (suppressEvents !== true) {
                        me.fireEvent('toggle', me, me.pressedButton, false);
                    }               
                }
                me.pressedButton = btn;
            }

            btn.el.addCls(me.pressedCls);
            btn.pressed = true;
            btn.preventCancel = true;
            if (me.initialized && suppressEvents !== true) {
                me.fireEvent('toggle', me, btn, true);
            }
        }
        else if (!pressed) {
            if (!me.allowMultiple && btn === me.pressedButton) {
                me.pressedButton = null;
            }
            
            if (btn.pressed) {
                btn.el.removeCls(me.pressedCls);
                btn.pressed = false;
                if (suppressEvents !== true) {
                    me.fireEvent('toggle', me, btn, false);
                }
            }
        }
        
        if (me.allowMultiple && me.initialized) {
            me.pressedButtons = me.getPressedButtons();
        }
    },
    
    
    getPressedButtons : function(toggleEvents) {
        var pressed = this.items.filterBy(function(item) {
            return item.isButton && !item.disabled && item.pressed;
        });
        return pressed.items;
    },

    
    disable : function() {
        this.items.each(function(item) {
            item.disable();
        });

        Ext.SegmentedButton.superclass.disable.apply(this, arguments);
    },

    
    enable : function() {
        this.items.each(function(item) {
            item.enable();
        }, this);

        Ext.SegmentedButton.superclass.enable.apply(this, arguments);
    }
});

Ext.reg('segmentedbutton', Ext.SegmentedButton);

Ext.AbstractStoreSelectionModel = Ext.extend(Ext.util.Observable, {
    

    
    
    
    allowDeselect: false,

    
    selected: null,

    constructor: function(cfg) {
        cfg = cfg || {};
        Ext.apply(this, cfg);

        this.modes = {
            SINGLE: true,
            SIMPLE: true,
            MULTI: true
        };

        
        this.setSelectionMode(cfg.mode);

        
        this.selected = new Ext.util.MixedCollection();

        Ext.AbstractStoreSelectionModel.superclass.constructor.call(this, cfg);
    },

    
    bind : function(store, initial){
        if(!initial && this.store){
            if(store !== this.store && this.store.autoDestroy){
                this.store.destroy();
            }else{
                this.store.un("add", this.onStoreAdd, this);
                this.store.un("clear", this.onStoreClear, this);
                this.store.un("remove", this.onStoreRemove, this);
                this.store.un("update", this.onStoreUpdate, this);
            }
        }
        if(store){
            store = Ext.StoreMgr.lookup(store);
            store.on({
                add: this.onStoreAdd,
                clear: this.onStoreClear,
                remove: this.onStoreRemove,
                update: this.onStoreUpdate,
                scope: this
            });
        }
        this.store = store;
        if(store && !initial) {
            this.refresh();
        }
    },

    selectAll: function(silent) {
        var selections = this.store.getRange();
        for (var i = 0, ln = selections.length; i < ln; i++) {
            this.doSelect(selections[i], true, silent);
        }
    },

    deselectAll: function() {
        var selections = this.getSelection();
        for (var i = 0, ln = selections.length; i < ln; i++) {
            this.doDeselect(selections[i]);
        }
    },

    
    
    
    selectWithEvent: function(record, e) {
        switch (this.selectionMode) {
            case 'MULTI':
                if (e.ctrlKey && this.isSelected(record)) {
                    this.doDeselect(record, false);
                } else if (e.shiftKey && this.lastFocused) {
                    this.selectRange(this.lastFocused, record, e.ctrlKey);
                } else if (e.ctrlKey) {
                    this.doSelect(record, true, false);
                } else if (this.isSelected(record) && !e.shiftKey && !e.ctrlKey && this.selected.getCount() > 1) {
                    this.doSelect(record, false, false);
                } else {
                    this.doSelect(record, false);
                }
                break;
            case 'SIMPLE':
                if (this.isSelected(record)) {
                    this.doDeselect(record);
                } else {
                    this.doSelect(record, true);
                }
                break;
            case 'SINGLE':
                
                if (this.allowDeselect && this.isSelected(record)) {
                    this.doDeselect(record);
                
                } else {
                    this.doSelect(record, false);
                }
                break;
        }
    },

    
    selectRange : function(startRecord, endRecord, keepExisting, dir){
        var i,
            startRow = this.store.indexOf(startRecord),
            endRow = this.store.indexOf(endRecord),
            tmp,
            selectedCount = 0,
            dontDeselect;

        if (this.isLocked()){
            return;
        }

        
        if (startRow > endRow){
            tmp = endRow;
            endRow = startRow;
            startRow = tmp;
        }

        for (i = startRow; i <= endRow; i++) {
            if (this.isSelected(this.store.getAt(i))) {
                selectedCount++;
            }
        }

        if (!dir) {
            dontDeselect = -1;
        } else {
            dontDeselect = (dir == 'up') ? startRow : endRow;
        }
        for (i = startRow; i <= endRow; i++){
            if (selectedCount == (endRow - startRow + 1)) {
                if (i != dontDeselect) {
                    this.doDeselect(i, true);
                }
            } else {
                this.doSelect(i, true);
            }

        }
    },
    
    
    select: function(records, keepExisting, suppressEvent) {
        this.doSelect(records, keepExisting, suppressEvent);
    },

    
    deselect: function(records, suppressEvent) {
        this.doDeselect(records, suppressEvent);
    },
    
    doSelect: function(records, keepExisting, suppressEvent) {
        if (this.locked) {
            return;
        }
        if (typeof records === "number") {
            records = [this.store.getAt(records)];
        }
        if (this.selectionMode == "SINGLE" && records) {
            var record = records.length ? records[0] : records;
            this.doSingleSelect(record, suppressEvent);
        } else {
            this.doMultiSelect(records, keepExisting, suppressEvent);
        }
    },

    doMultiSelect: function(records, keepExisting, suppressEvent) {
        if (this.locked) {
            return;
        }
        var selected = this.selected,
            change = false,
            record;

        records = !Ext.isArray(records) ? [records] : records;
        if (!keepExisting && selected.getCount() > 0) {
            change = true;
            this.doDeselect(this.getSelection(), true);
        }

        for (var i = 0, ln = records.length; i < ln; i++) {
            record = records[i];
            if (keepExisting && this.isSelected(record)) {
                continue;
            }
            change = true;
            this.lastSelected = record;
            selected.add(record);
            if (!suppressEvent) {
                this.setLastFocused(record);
            }

            this.onSelectChange(record, true, suppressEvent);
        }
        
        this.maybeFireSelectionChange(change && !suppressEvent);
    },

    
    doDeselect: function(records, suppressEvent) {
        if (this.locked) {
            return;
        }

        if (typeof records === "number") {
            records = [this.store.getAt(records)];
        }

        var change = false,
            selected = this.selected,
            record;

        records = !Ext.isArray(records) ? [records] : records;
        for (var i = 0, ln = records.length; i < ln; i++) {
            record = records[i];
            if (selected.remove(record)) {
                if (this.lastSelected == record) {
                    this.lastSelected = selected.last();
                }
                this.onSelectChange(record, false, suppressEvent);
                change = true;
            }
        }
        
        this.maybeFireSelectionChange(change && !suppressEvent);
    },

    doSingleSelect: function(record, suppressEvent) {
        if (this.locked) {
            return;
        }
        
        
        if (this.isSelected(record)) {
            return;
        }
        var selected = this.selected;
        if (selected.getCount() > 0) {
            this.doDeselect(this.lastSelected, suppressEvent);
        }
        selected.add(record);
        this.lastSelected = record;
        this.onSelectChange(record, true, suppressEvent);
        this.setLastFocused(record);
        this.maybeFireSelectionChange(!suppressEvent);
    },

    
    setLastFocused: function(record) {
        var recordBeforeLast = this.lastFocused;
        this.lastFocused = record;
        this.onLastFocusChanged(recordBeforeLast, record);
    },


    
    
    maybeFireSelectionChange: function(fireEvent) {
        if (fireEvent) {
            this.fireEvent('selectionchange', this, this.getSelection());
        }
    },

    
    getLastSelected: function() {
        return this.lastSelected;
    },
    
    getLastFocused: function() {
        return this.lastFocused;
    },

    
    getSelection: function() {
        return this.selected.getRange();
    },

    
    getSelectionMode: function() {
        return this.selectionMode;
    },

    
    setSelectionMode: function(selMode) {
        selMode = selMode ? selMode.toUpperCase() : 'SINGLE';
        
        
        this.selectionMode = this.modes[selMode] ? selMode : 'SINGLE';
    },

    
    isLocked: function() {
        return this.locked;
    },

    
    setLocked: function(locked) {
        this.locked = !!locked;
    },

    
    isSelected: function(record) {
        record = Ext.isNumber(record) ? this.store.getAt(record) : record;
        return this.selected.indexOf(record) !== -1;
    },
    
    
    hasSelection: function() {
        return this.selected.getCount() > 0;
    },

    refresh: function() {
        var toBeSelected = [],
            oldSelections = this.getSelection(),
            ln = oldSelections.length,
            selection,
            change,
            i = 0;

        
        
        
        for (; i < ln; i++) {
            selection = oldSelections[i];
            if (this.store.indexOf(selection) != -1) {
                toBeSelected.push(selection);
            }
        }

        
        
        if (this.selected.getCount() != toBeSelected.length) {
            change = true;
        }

        this.clearSelections();

        if (toBeSelected.length) {
            
            this.doSelect(toBeSelected, false, true);
        }
        
        this.maybeFireSelectionChange(change);
    },

    clearSelections: function() {
        
        this.selected.clear();
        this.lastSelected = null;
        this.setLastFocused(null);
    },

    
    onStoreAdd: function() {

    },

    
    
    onStoreClear: function() {
        var selected = this.selected;
        if (selected.getCount > 0) {
            selected.clear();
            this.lastSelected = null;
            this.setLastFocused(null);
            this.maybeFireSelectionChange(true);
        }
    },

    
    
    
    onStoreRemove: function(store, record) {
        if (this.locked) {
            return;
        }
        var selected = this.selected;
        if (selected.remove(record)) {
            if (this.lastSelected == record) {
                this.lastSelected = null;
            }
            if (this.getLastFocused() == record) {
                this.setLastFocused(null);
            }
            this.maybeFireSelectionChange(true);
        }
    },

    getCount: function() {
        return this.selected.getCount();
    },

    
    destroy: function() {

    },

    
    onStoreUpdate: function() {

    },

    
    onSelectChange: function(record, isSelected, suppressEvent) {

    },

    
    onLastFocusChanged: function(oldFocused, newFocused) {

    },

    
    onEditorKey: function(field, e) {

    },

    
    bindComponent: function(cmp) {

    }
});
Ext.DataViewSelectionModel = Ext.extend(Ext.AbstractStoreSelectionModel, {
    deselectOnContainerClick: true,
    bindComponent: function(view) {
        this.view = view;
        this.bind(view.getStore());
        var eventListeners = {
            refresh: this.refresh,
            scope: this,
            el: {
                scope: this
            }
        };
        eventListeners.el[view.triggerEvent] = this.onItemClick;
        eventListeners.el[view.triggerCtEvent] = this.onContainerClick;
        
        view.on(eventListeners);
    },


    onItemClick: function(e) {
        var view   = this.view,
            node   = view.findTargetByEvent(e);
        
        if (node) {
            this.selectWithEvent(view.getRecord(node), e);
        } else {
            return false;
        }
    },

    onContainerClick: function() {
        if (this.deselectOnContainerClick) {
            this.deselectAll();
        }
    },

    
    onSelectChange: function(record, isSelected, suppressEvent) {
        var view = this.view;
        
        if (isSelected) {
            view.onItemSelect(record);
            if (!suppressEvent) {
                this.fireEvent('select', this, record);
            }
        } else {
            view.onItemDeselect(record);
            if (!suppressEvent) {
                this.fireEvent('deselect', this, record);
            }
        }
    }
});



Ext.DataView = Ext.extend(Ext.Component, {
    
    

    
    

    

    
    loadingText: 'Loading...',

    
    selectedItemCls: "x-item-selected",

    
    emptyText: "",

    
    deferEmptyText: true,

    
    trackOver: false,

    
    blockRefresh: false,

    


    
    last: false,
    
    triggerEvent: 'click',
    triggerCtEvent: 'containerclick',
    
    addCmpEvents: function() {
        
    },

    
    initComponent : function(){
        var isDef = Ext.isDefined;
        if (!isDef(this.tpl) || !isDef(this.store) || !isDef(this.itemSelector)) {
            throw "DataView requires tpl, store and itemSelector configurations to be defined.";
        }

        Ext.DataView.superclass.initComponent.call(this);
        if(Ext.isString(this.tpl) || Ext.isArray(this.tpl)){
            this.tpl = new Ext.XTemplate(this.tpl);
        }

        
        
        if (Ext.isDefined(this.overCls) || Ext.isDefined(this.overClass)) {
            this.overItemCls = this.overCls || this.overClass;
            delete this.overCls;
            delete this.overClass;
            throw "Using the deprecated overCls or overClass configuration. Use overItemCls.";
        }

        if (Ext.isDefined(this.selectedCls) || Ext.isDefined(this.selectedClass)) {
            this.selectedItemCls = this.selectedCls || this.selectedClass;
            delete this.selectedCls;
            delete this.selectedClass;
            throw "Using the deprecated selectedCls or selectedClass configuration. Use selectedItemCls.";
        }
        
        this.addEvents(
            
            'beforerefresh',
            
            'refresh'
        );
        
        this.addCmpEvents();

        this.store = Ext.StoreMgr.lookup(this.store)
        this.all = new Ext.CompositeElementLite();
        this.getSelectionModel().bindComponent(this);
    },
    
    onRender : function() {
        Ext.DataView.superclass.onRender.apply(this, arguments);
        if (this.loadingText) {
            this.loadMask = new Ext.LoadMask(this.el, {
                msg: this.loadingText
            });
        }
    },

    getSelectionModel: function(){
        if (!this.selModel) {
            this.selModel = {};
        }

        var mode;
        switch(true) {
            case this.simpleSelect:
                mode = 'SIMPLE';
            break;
            
            case this.multiSelect:
                mode = 'MULTI';
            break;
            
            case this.singleSelect:
            default:
                mode = 'SINGLE';
            break;
        }
        
        Ext.applyIf(this.selModel, {
            allowDeselect: this.allowDeselect,
            mode: mode
        });        
        
        if (!this.selModel.events) {
            this.selModel = new Ext.DataViewSelectionModel(this.selModel);
        }
        
        if (!this.selModel.hasRelaySetup) {
            this.relayEvents(this.selModel, ['selectionchange', 'select', 'deselect']);
            this.selModel.hasRelaySetup = true;
        }

        
        
        if (this.disableSelection) {
            this.selModel.locked = true;
        }
        
        return this.selModel;
    },

    
    refresh: function() {
        if (!this.rendered) {
            return;
        }
        
        this.fireEvent('beforerefresh', this);
        var el = this.getTargetEl(),
            records = this.store.getRange();

        el.update('');
        if (records.length < 1) {
            if (!this.deferEmptyText || this.hasSkippedEmptyText) {
                el.update(this.emptyText);
            }
            this.all.clear();
        } else {
            this.tpl.overwrite(el, this.collectData(records, 0));
            this.all.fill(Ext.query(this.itemSelector, el.dom));
            this.updateIndexes(0);
        }
        this.hasSkippedEmptyText = true;
        this.fireEvent('refresh', this);
    },

    
    prepareData: function(data, index, record) {
        if (record) {    
            Ext.apply(data, this.prepareAssociatedData(record));            
        }
        return data;
    },
    
    
    prepareAssociatedData: function(record, ids) {
        
        ids = ids || [];
        
        var associations     = record.associations.items,
            associationCount = associations.length,
            associationData  = {},
            associatedStore, associatedName, associatedRecords, associatedRecord,
            associatedRecordCount, association, internalId, i, j;
        
        for (i = 0; i < associationCount; i++) {
            association = associations[i];
            
            
            associatedStore = record[association.storeName];
            
            
            associationData[association.name] = [];
            
            
            if (associatedStore && associatedStore.data.length > 0) {
                associatedRecords = associatedStore.data.items;
                associatedRecordCount = associatedRecords.length;
            
                
                for (j = 0; j < associatedRecordCount; j++) {
                    associatedRecord = associatedRecords[j];
                    internalId = associatedRecord.internalId;
                    
                    
                    
                    if (ids.indexOf(internalId) == -1) {
                        ids.push(internalId);
                        
                        associationData[association.name][j] = associatedRecord.data;
                        Ext.apply(associationData[association.name][j], this.prepareAssociatedData(associatedRecord, ids));
                    }
                }
            }
        }
        
        return associationData;
    },

    
    collectData : function(records, startIndex){
        var r = [],
            i = 0,
            len = records.length;

        for(; i < len; i++){
            r[r.length] = this.prepareData(records[i].data, startIndex + i, records[i]);
        }

        return r;
    },

    
    bufferRender : function(records, index){
        var div = document.createElement('div');
        this.tpl.overwrite(div, this.collectData(records, index));
        return Ext.query(this.itemSelector, div);
    },

    
    onUpdate : function(ds, record){
        var index = this.store.indexOf(record),
            original,
            node;

        if (index > -1){
            original = this.all.elements[index];
            node = this.bufferRender([record], index)[0];

            this.all.replaceElement(index, node, true);
            this.updateIndexes(index, index);

            
            
            this.selModel.refresh();
        }
    },

    
    onAdd : function(ds, records, index){
        if (this.all.getCount() === 0) {
            this.refresh();
            return;
        }

        var nodes = this.bufferRender(records, index), n, a = this.all.elements;
        if (index < this.all.getCount()) {
            n = this.all.item(index).insertSibling(nodes, 'before', true);
            a.splice.apply(a, [index, 0].concat(nodes));
        } else {
            n = this.all.last().insertSibling(nodes, 'after', true);
            a.push.apply(a, nodes);
        }
        this.updateIndexes(index);
    },

    
    onRemove : function(ds, record, index){
        this.all.removeElement(index, true);
        this.updateIndexes(index);
        if (this.store.getCount() === 0){
            this.refresh();
        }
    },

    
    refreshNode : function(index){
        this.onUpdate(this.store, this.store.getAt(index));
    },

    
    updateIndexes : function(startIndex, endIndex){
        var ns = this.all.elements;
        startIndex = startIndex || 0;
        endIndex = endIndex || ((endIndex === 0) ? 0 : (ns.length - 1));
        for(var i = startIndex; i <= endIndex; i++){
            ns[i].viewIndex = i;
        }
    },

    
    getStore : function(){
        return this.store;
    },

    
    bindStore : function(store, initial) {
        if (!initial && this.store) {
            if (store !== this.store && this.store.autoDestroy) {
                this.store.destroy();
            } 
            else {
                this.mun(this.store, {
                    scope: this,
                    beforeload: this.onBeforeLoad,
                    datachanged: this.onDataChanged,
                    add: this.onAdd,
                    remove: this.onRemove,
                    update: this.onUpdate,
                    clear: this.refresh                    
                });
            }
            if (!store) {
                if (this.loadMask) {
                    this.loadMask.bindStore(null);
                }
                this.store = null;
            }
        }
        if (store) {
            store = Ext.StoreMgr.lookup(store);
            this.mon(store, {
                scope: this,
                beforeload: this.onBeforeLoad,
                datachanged: this.onDataChanged,
                add: this.onAdd,
                remove: this.onRemove,
                update: this.onUpdate,
                clear: this.refresh                    
            });
            if (this.loadMask) {
                this.loadMask.bindStore(store);
            }
        }
        
        this.store = store;
        
        this.getSelectionModel().bind(store);
        
        if (store) {
            this.refresh();
        }
    },

    
    onDataChanged: function() {
        if (this.blockRefresh !== true) {
            this.refresh.apply(this, arguments);
        }
    },

    
    findItemByChild: function(node){
        return Ext.fly(node).findParent(this.itemSelector, this.getTargetEl());
    },
    
    
    findTargetByEvent: function(e) {
        return e.getTarget(this.itemSelector, this.getTargetEl());
    },


    
    getSelectedNodes: function(){
        var nodes   = [],
            records = this.selModel.getSelection(),
            ln = records.length,
            i  = 0;

        for (; i < ln; i++) {
            nodes.push(this.getNode(records[i]));
        }

        return nodes;
    },

    
    getRecords: function(nodes) {
        var records = [],
            i = 0,
            len = nodes.length;

        for (; i < len; i++) {
            records[records.length] = this.store.getAt(nodes[i].viewIndex);
        }

        return r;
    },

    
    getRecord: function(node){
        return this.store.getAt(node.viewIndex);
    },

    
    isSelected : function(node) {
        
        var r = this.getRecord(node);
        return this.selModel.isSelected(r);
    },
    
    
    select: function(records, keepExisting, suppressEvent) {
        this.selModel.select(records, keepExisting, suppressEvent);
    },

    
    deselect: function(records, suppressEvent) {
        this.selModel.deselect(records, suppressEvent);
    },

    
    getNode : function(nodeInfo) {
        if (Ext.isString(nodeInfo)) {
            return document.getElementById(nodeInfo);
        } else if (Ext.isNumber(nodeInfo)) {
            return this.all.elements[nodeInfo];
        } else if (nodeInfo instanceof Ext.data.Model) {
            var idx = this.store.indexOf(nodeInfo);
            return this.all.elements[idx];
        }
        return nodeInfo;
    },

    
    getNodes: function(start, end) {
        var ns = this.all.elements,
            nodes = [],
            i;

        start = start || 0;
        end = !Ext.isDefined(end) ? Math.max(ns.length - 1, 0) : end;
        if (start <= end) {
            for (i = start; i <= end && ns[i]; i++) {
                nodes.push(ns[i]);
            }
        } else {
            for (i = start; i >= end && ns[i]; i--) {
                nodes.push(ns[i]);
            }
        }
        return nodes;
    },

    
    indexOf: function(node) {
        node = this.getNode(node);
        if (Ext.isNumber(node.viewIndex)) {
            return node.viewIndex;
        }
        return this.all.indexOf(node);
    },

    
    onBeforeLoad: function() {
        if (this.loadingText) {
            this.getTargetEl().update('');
            this.all.clear();
        }
    },

    onDestroy : function() {
        this.all.clear();
        Ext.DataView.superclass.onDestroy.call(this);
        this.bindStore(null);
        this.selModel.destroy();
    },

    
    onItemSelect: function(record) {
        var node = this.getNode(record);
        Ext.fly(node).addCls(this.selectedItemCls);
    },

    
    onItemDeselect: function(record) {
        var node = this.getNode(record);
        Ext.fly(node).removeCls(this.selectedItemCls);
    },
    
    select: function(records, keepExisting, supressEvents) {
        console.warn("DataView: select will be removed, please access select through a DataView's SelectionModel, ie: view.getSelectionModel().select()");
        var sm = this.getSelectionModel();
        return sm.select.apply(sm, arguments);
    },
    clearSelections: function() {
        console.warn("DataView: clearSelections will be removed, please access deselectAll through DataView's SelectionModel, ie: view.getSelectionModel().deselectAll()");
        var sm = this.getSelectionModel();
        return sm.deselectAll();
    }
});
Ext.reg('dataview', Ext.DataView);






Ext.DataView.override({
    
    
    

    
    getSelectionCount : function(){
        return this.selModel.getSelection().length;
    },

    
    getSelectedRecords : function(){
        return this.selModel.getSelection();
    }
});

Ext.DataView.override({
    scroll: 'vertical',

    
    pressedCls : "x-item-pressed",

    
    pressedDelay: 100,
    
    
    allowDeselect: true,

    
    triggerEvent: 'singletap',
    
    triggerCtEvent: 'containertap',
    
    
    
    addCmpEvents: function() {

        this.addEvents(
            
            'itemtap',

            
            'itemdoubletap',

            
            'itemswipe',

            
            "containertap",

            
            "selectionchange",

            
            "beforeselect"
        );

    },

    
    afterRender: function() {
        var me = this;

        Ext.DataView.superclass.afterRender.call(me);

        var eventHandlers = {
            tapstart : me.onTapStart,
            tapcancel: me.onTapCancel,
            touchend : me.onTapCancel,
            doubletap: me.onDoubleTap,
            swipe    : me.onSwipe,
            scope    : me
        };
        eventHandlers[this.triggerEvent] = me.onTap;
        me.mon(me.getTargetEl(), eventHandlers);
        
        if (this.store) {
            this.bindStore(this.store, true);
        }
    },

    
    onTap: function(e) {
        var item = this.findTargetByEvent(e);
        if (item) {
            Ext.fly(item).removeCls(this.pressedCls);
            var index = this.indexOf(item);
            if (this.onItemTap(item, index, e) !== false) {
                this.fireEvent("itemtap", this, index, item, e);
            }
        }
        else {
            if(this.fireEvent("containertap", this, e) !== false) {
                this.onContainerTap(e);
            }
        }
    },

    
    onTapStart: function(e, t) {
        var me = this,
            item = this.findTargetByEvent(e);

        if (item) {
            if (me.pressedDelay) {
                if (me.pressedTimeout) {
                    clearTimeout(me.pressedTimeout);
                }
                me.pressedTimeout = setTimeout(function() {
                    Ext.fly(item).addCls(me.pressedCls);
                }, Ext.isNumber(me.pressedDelay) ? me.pressedDelay : 100);
            }
            else {
                Ext.fly(item).addCls(me.pressedCls);
            }
        }
    },

    
    onTapCancel: function(e, t) {
        var me = this,
            item = this.findTargetByEvent(e);

        if (me.pressedTimeout) {
            clearTimeout(me.pressedTimeout);
            delete me.pressedTimeout;
        }

        if (item) {
            Ext.fly(item).removeCls(me.pressedCls);
        }
    },

    
    onContainerTap: function(e) {
        
        
        
    },

    
    onDoubleTap: function(e) {
        var item = this.findTargetByEvent(e);
        if (item) {
            this.fireEvent("itemdoubletap", this, this.indexOf(item), item, e);
        }
    },

    
    onSwipe: function(e) {
        var item = this.findTargetByEvent(e);
        if (item) {
            this.fireEvent("itemswipe", this, this.indexOf(item), item, e);
        }
    },

    
    onItemTap: function(item, index, e) {
        if (this.pressedTimeout) {
            clearTimeout(this.pressedTimeout);
            delete this.pressedTimeout;
        }
        return true;
    }
});


Ext.List = Ext.extend(Ext.DataView, {
    componentCls: 'x-list',

    
    pinHeaders: Ext.is.iOS || Ext.is.Desktop,

    
    indexBar: false,

    
    grouped: false,

    
    clearSelectionOnDeactivate: true,

    renderTpl: [
        '<tpl if="grouped"><h3 class="x-list-header x-list-header-swap x-hidden-display"></h3></tpl>'
    ],

    groupTpl : [
        '<tpl for=".">',
            '<div class="x-list-group x-group-{id}">',
                '<h3 class="x-list-header">{group}</h3>',
                '<div class="x-list-group-items">',
                    '{items}',
                '</div>',
            '</div>',
        '</tpl>'
    ],
    
    
    itemSelector: '.x-list-item',
    
    
    itemCls: '',
    
    

    
    onItemDisclosure: false,
    
    
    preventSelectionOnDisclose: true,

    
    initComponent : function() {
        
        
        
        var memberFnsCombo = {};
        
        if (Ext.isArray(this.itemTpl)) {
            this.itemTpl = this.itemTpl.join('');
        } else if (this.itemTpl && this.itemTpl.html) {
            Ext.apply(memberFnsCombo, this.itemTpl.initialConfig);
            this.itemTpl = this.itemTpl.html;
        }
        
        if (!Ext.isDefined(this.itemTpl)) {
            throw new Error("Ext.List: itemTpl is a required configuration.");
        }
        
        
        if (this.itemTpl && this.itemTpl.indexOf("\"x-list-item\"") !== -1) {
            throw new Error("Ext.List: Using a CSS class of x-list-item within your own tpl will break Ext.Lists. Remove the x-list-item from the tpl/itemTpl");
        }
        
        this.tpl = '<tpl for="."><div class="x-list-item ' + this.itemCls + '"><div class="x-list-item-body">' + this.itemTpl + '</div>';
        if (this.onItemDisclosure) {
            this.tpl += '<div class="x-list-disclosure"></div>';
        }
        this.tpl += '</div></tpl>';
        this.tpl = new Ext.XTemplate(this.tpl, memberFnsCombo);
       

        if (this.grouped) {
            
            this.listItemTpl = this.tpl;
            if (Ext.isString(this.listItemTpl) || Ext.isArray(this.listItemTpl)) {
                
                
                this.listItemTpl = new Ext.XTemplate(this.listItemTpl, memberFnsCombo);
            }
            if (Ext.isString(this.groupTpl) || Ext.isArray(this.groupTpl)) {
                this.tpl = new Ext.XTemplate(this.groupTpl);
            }
        }
        else {
            this.indexBar = false;
        }
        
        if (this.scroll !== false) {
            this.scroll = {
                direction: 'vertical',
                useIndicators: !this.indexBar
            };
        }

        
        
        
        
        Ext.List.superclass.initComponent.call(this);

        if (this.onItemDisclosure) {
            
            
            if (Ext.isFunction(this.onItemDisclosure)) {
                this.onItemDisclosure = {
                    scope: this,
                    handler: this.onItemDisclosure
                };
            }
        }

        this.on('deactivate', this.onDeactivate, this);
        
        this.addEvents(
             
             'disclose',
             
             
             'update'
         );
    },

    
    onRender : function() {
        if (this.grouped) {
            Ext.applyIf(this.renderData, {
                grouped: true
            });

            if (this.scroll) {
                Ext.applyIf(this.renderSelectors, {
                    header: '.x-list-header-swap'
                });                
            }
        }
        
        Ext.List.superclass.onRender.apply(this, arguments);
    },

    
    onDeactivate : function() {
        if (this.clearSelectionOnDeactivate) {
            this.getSelectionModel().deselectAll();
        }
    },

    
    afterRender : function() {
        if (!this.grouped) {
            this.el.addCls('x-list-flat');
        }
        this.getTargetEl().addCls('x-list-parent');

        if (this.indexBar) {
            this.indexBar = new Ext.IndexBar(Ext.apply({}, Ext.isObject(this.indexBar) ? this.indexBar : {}, {
                xtype: 'indexbar',
                alphabet: true,
                renderTo: this.el
            }));
            this.addCls('x-list-indexed');
        }
        
        Ext.List.superclass.afterRender.call(this);
        
        if (this.onItemDisclosure) {
            this.mon(this.getTargetEl(), 'singletap', this.handleItemDisclosure, this, {delegate: '.x-list-disclosure'});
        }
    },

    
    initEvents : function() {
        Ext.List.superclass.initEvents.call(this);

        if (this.grouped) {
            if (this.pinHeaders && this.scroll) {
                this.mon(this.scroller, {
                    scrollstart: this.onScrollStart,
                    scroll: this.onScroll,
                    scope: this
                });
            }

            if (this.indexBar) {
                this.mon(this.indexBar, {
                    index: this.onIndex,
                    scope: this
                });
            }
        }
    },

    //@private

    handleItemDisclosure : function(e, t) {
        var node = this.findItemByChild(t),
            record, index;
            
        if (node) {
            record = this.getRecord(node);
            index  = this.indexOf(node);
            if (this.preventSelectionOnDisclose) {
                e.stopEvent();
            }
            this.fireEvent('disclose', record, node, index, e);
     
            if (Ext.isObject(this.onItemDisclosure) && this.onItemDisclosure.handler) {
                this.onItemDisclosure.handler.call(this, record, node, index);
            }
        }
    },

    
    setActiveGroup : function(group) {
        var me = this;
        if (group) {
            if (!me.activeGroup || me.activeGroup.header != group.header) {
                me.header.setHTML(group.header.getHTML());
                me.header.show();
            }            
        }
        else {
            me.header.hide();
        }

        this.activeGroup = group;
    },

    
    getClosestGroups : function(pos) {
        
        if (!this.groupOffsets) {
            this.updateOffsets();
        }
        var groups = this.groupOffsets,
            ln = groups.length,
            group, i,
            current, next;

        for (i = 0; i < ln; i++) {
            group = groups[i];
            if (group.offset > pos.y) {
                next = group;
                break;
            }
            current = group;
        }

        return {
            current: current,
            next: next
        };
    },

    updateIndexes : function() {
        Ext.List.superclass.updateIndexes.apply(this, arguments);
        this.updateList();
    },

    afterComponentLayout : function() {
        Ext.List.superclass.afterComponentLayout.apply(this, arguments);
        this.updateList();
    },

    updateList : function() {
        this.fireEvent('update', this);
        this.updateOffsets();
    },
    
    updateOffsets : function() {
        if (this.grouped) {
            this.groupOffsets = [];

            var headers = this.getTargetEl().query('h3.x-list-header'),
                ln = headers.length,
                header, i;

            for (i = 0; i < ln; i++) {
                header = Ext.get(headers[i]);
                header.setVisibilityMode(Ext.Element.VISIBILITY);
                this.groupOffsets.push({
                    header: header,
                    offset: header.dom.offsetTop
                });
            }
        }
    },

    
    onScrollStart : function() {
        var offset = this.scroller.getOffset();
        this.closest = this.getClosestGroups(offset);
        this.setActiveGroup(this.closest.current);
    },

    
    onScroll : function(scroller, pos, options) {
        if (!this.closest) {
            this.closest = this.getClosestGroups(pos);
        }

        if (!this.headerHeight) {
            this.headerHeight = this.header.getHeight();
        }

        if (pos.y <= 0) {
            if (this.activeGroup) {
                this.setActiveGroup(false);
                this.closest.next = this.closest.current;
            }
            return;
        }
        else if (
            (this.closest.next && pos.y > this.closest.next.offset) ||
            (pos.y < this.closest.current.offset)
        ) {
            this.closest = this.getClosestGroups(pos);
            this.setActiveGroup(this.closest.current);
        }
        if (this.closest.next && pos.y > 0 && this.closest.next.offset - pos.y <= this.headerHeight) {
            var transform = this.headerHeight - (this.closest.next.offset - pos.y);
            Ext.Element.cssTranslate(this.header, {x: 0, y: -transform});
            this.transformed = true;
        }
        else if (this.transformed) {
            this.header.setStyle('-webkit-transform', null);
            this.transformed = false;
        }
    },

    
    onIndex : function(record, target, index) {
        var key = record.get('key').toLowerCase(),
            groups = this.store.getGroups(),
            ln = groups.length,
            group, i, closest, id;

        for (i = 0; i < ln; i++) {
            group = groups[i];
            id = this.getGroupId(group);

            if (id == key || id > key) {
                closest = id;
                break;
            }
            else {
                closest = id;
            }
        }

        closest = this.getTargetEl().down('.x-group-' + id);
        if (closest) {
            this.scroller.scrollTo({x: 0, y: closest.getOffsetsTo(this.scrollEl)[1]}, false, null, true);
        }
    },
    
    getGroupId : function(group) {
        return group.name.toLowerCase();
    },

    
    collectData : function(records, startIndex) {
        if (!this.grouped) {
            return Ext.List.superclass.collectData.call(this, records, startIndex);
        }

        var results = [],
            groups = this.store.getGroups(),
            ln = groups.length,
            children, cln, c,
            group, i;

        for (i = 0, ln = groups.length; i < ln; i++) {
            group = groups[i];
            children = group.children;
            for (c = 0, cln = children.length; c < cln; c++) {
                children[c] = children[c].data;
            }
            results.push({
                group: group.name,
                id: this.getGroupId(group),
                items: this.listItemTpl.apply(children)
            });
        }

        return results;
    },

    
    
    
    onUpdate : function(store, record) {
        if (this.grouped) {
            this.refresh();
        }
        else {
            Ext.List.superclass.onUpdate.apply(this, arguments);
        }
    },

    
    onAdd : function(ds, records, index) {
        if (this.grouped) {
            this.refresh();
        }
        else {
            Ext.List.superclass.onAdd.apply(this, arguments);
        }
    },

    
    onRemove : function(ds, record, index) {
        if (this.grouped) {
            this.refresh();
        }
        else {
            Ext.List.superclass.onRemove.apply(this, arguments);
        }
    }
});

Ext.reg('list', Ext.List);


Ext.IndexBar = Ext.extend(Ext.DataView, {
    
    componentCls: 'x-indexbar',

    
    direction: 'vertical',

    
    tpl: '<tpl for="."><div class="x-indexbar-item">{value}</div></tpl>',

    
    itemSelector: 'div.x-indexbar-item',

    
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],

    
    listPrefix: '',

    

    

    
    componentLayout: 'autocomponent',

    scroll: false,
    
    
    initComponent : function() {
        
        this.componentLayout = this.getComponentLayout();

        if (!this.store) {
            this.store = new Ext.data.Store({
                model: 'IndexBarModel'
            });
        }

        if (this.alphabet == true) {
            this.ui = this.ui || 'alphabet';
        }

        if (this.direction == 'horizontal') {
            this.horizontal = true;
        }
        else {
            this.vertical = true;
        }

        this.addEvents(
          
          'index'
        );

        Ext.apply(this.renderData, {
            componentCls: this.componentCls
        });
        
        Ext.apply(this.renderSelectors, {
            body: '.' + this.componentCls + '-body'
        });
        
        Ext.IndexBar.superclass.initComponent.call(this);
    },

    renderTpl : ['<div class="{componentCls}-body"></div>'],
    
    getTargetEl : function() {
        return this.body;
    },
    
    
    afterRender : function() {
        Ext.IndexBar.superclass.afterRender.call(this);

        if (this.alphabet === true) {
            this.loadAlphabet();
        }
        if (this.vertical) {
            this.el.addCls(this.componentCls + '-vertical');
        }
        else if (this.horizontal) {
            this.el.addCls(this.componentCls + '-horizontal');
        }
    },

    
    loadAlphabet : function() {
        var letters = this.letters,
            len = letters.length,
            data = [],
            i, letter;

        for (i = 0; i < len; i++) {
            letter = letters[i];
            data.push({key: letter.toLowerCase(), value: letter});
        }

        this.store.loadData(data);
    },

    
    refresh: function() {
        var el = this.getTargetEl(),
            records = this.store.getRange();

        el.update('');
        if (records.length < 1) {
            if (!this.deferEmptyText || this.hasSkippedEmptyText) {
                el.update(this.emptyText);
            }
            this.all.clear();
        } else {
            this.tpl.overwrite(el, this.collectData(records, 0));
            this.all.fill(Ext.query(this.itemSelector, el.dom));
            this.updateIndexes(0);
        }
        this.hasSkippedEmptyText = true;
        this.fireEvent('refresh');
    },
    
    collectData : function() {
        var data = Ext.IndexBar.superclass.collectData.apply(this, arguments);
        if (this.listPrefix.length > 0) {
            data.unshift({
                key: '',
                value: this.listPrefix
            });
        }
        return data;
    },

    
    initEvents : function() {
        Ext.IndexBar.superclass.initEvents.call(this);

        this.mon(this.el, {
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            touchmove: this.onTouchMove,
            scope: this
        });
    },

    
    onTouchStart : function(e, t) {
        e.stopEvent();
        this.el.addCls(this.componentCls + '-pressed');
        this.pageBox = this.el.getPageBox();
        this.onTouchMove(e);
    },

    
    onTouchEnd : function(e, t) {
        e.stopEvent();
        this.el.removeCls(this.componentCls + '-pressed');
    },

    
    onTouchMove : function(e) {
        e.stopPropagation();

        var point = Ext.util.Point.fromEvent(e),
            target,
            record,
            pageBox = this.pageBox;

        if (!pageBox) {
            pageBox = this.pageBox = this.el.getPageBox();
        }

        if (this.vertical) {
            if (point.y > pageBox.bottom || point.y < pageBox.top) {
                return;
            }
            target = Ext.Element.fromPoint(pageBox.left + (pageBox.width / 2), point.y);
        }
        else if (this.horizontal) {
            if (point.x > pageBox.right || point.x < pageBox.left) {
                return;
            }
            target = Ext.Element.fromPoint(point.x, pageBox.top + (pageBox.height / 2));
        }

        if (target) {
            record = this.getRecord(target.dom);
            if (record) {
                this.fireEvent('index', record, target, this.indexOf(target));
            }
        }
    },
    
    
    isVertical : function() {
        return this.vertical;
    },
    
    
    isHorizontal : function() {
        return this.horizontal;
    }
});

Ext.reg('indexbar', Ext.IndexBar);

Ext.regModel('IndexBarModel', {
    fields: ['key', 'value']
});


Ext.Toolbar = Ext.extend(Ext.Container, {
    
    isToolbar: true,
    
    
    defaultType: 'button',

    
    baseCls: 'x-toolbar',

    
    titleCls: 'x-toolbar-title',

    
    ui: 'dark',

    
    layout: null,

    

    

    
    titleEl: null,

    initComponent : function() {
        this.layout = Ext.apply({}, this.layout || {}, {
            type: 'hbox',
            align: 'center'
        });
        Ext.Toolbar.superclass.initComponent.call(this);
    },

    afterRender : function() {
        Ext.Toolbar.superclass.afterRender.call(this);

        if (this.title) {
            this.titleEl = this.el.createChild({
                cls: this.titleCls,
                html: this.title
            });
        }
    },

    
    setTitle : function(title) {
        this.title = title;
        if (this.rendered) {
            if (!this.titleEl) {
                this.titleEl = this.el.createChild({
                    cls: this.titleCls,
                    html: this.title
                });
            }
            this.titleEl.setHTML(title);
        }
    },

    
    showTitle : function() {
        if (this.titleEl) {
            this.titleEl.show();
        }
    },

    
    hideTitle : function() {
        if (this.titleEl) {
            this.titleEl.hide();
        }
    }
});

Ext.reg('toolbar', Ext.Toolbar);



Ext.Spacer = Ext.extend(Ext.Component, {
    initComponent : function() {
        if (!this.width) {
            this.flex = 1;
        }

        Ext.Spacer.superclass.initComponent.call(this);
    },

    onRender : function() {
        Ext.Spacer.superclass.onRender.apply(this, arguments);

        if (this.flex) {
            this.el.setStyle('-webkit-box-flex', this.flex);
        }
    }
});

Ext.reg('spacer', Ext.Spacer);

Ext.Sheet = Ext.extend(Ext.Panel, {
    baseCls : 'x-sheet',
    centered : false,
    floating : true,
    modal    : true,
    draggable : false,
    monitorOrientation : true,
    
    hidden    : true,
    
    
    hideOnMaskTap : false,
    
    

    

    
    enter : 'bottom',

    
    exit : 'bottom',


    
    enterAnimation : 'slide',

    
    exitAnimation : 'slide',

    
    transitions : {
        bottom : 'up',
        top    : 'down',
        right  : 'left',
        left   : 'right'
    },

    //@private

    animSheet : function(animate) {
      var anim = null,
          me = this,
          tr = me.transitions,
          opposites = Ext.Anim.prototype.opposites || {};

      if (animate && this[animate]) {
         if (animate == 'enter') {
             anim = (typeof me.enterAnimation == 'string') ?
                 {
                     type : me.enterAnimation || 'slide',
                     direction : tr[me.enter] || 'up'
                 } : me.enterAnimation;

         }
         else if (animate == 'exit') {
            anim = (typeof me.exitAnimation == 'string') ?
                 {
                     type : me.exitAnimation || 'slide',
                     direction : tr[me.exit] || 'down'
                 } :  me.exitAnimation;
         }
      }
      return anim;
    },

    
    orient : function(orientation, w, h) {
        if(!this.container || this.centered || !this.floating){
            return this;
        }

        var me = this,
            cfg = me.initialConfig || {},
            
            size = {width : cfg.width, height : cfg.height},
            pos  = {x : cfg.x, y : cfg.y},
            box  = me.el.getPageBox(),
            pageBox, scrollTop = 0;

        if (me.container.dom == document.body) {
            pageBox = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            scrollTop = document.body.scrollTop;
        }
        else {
            pageBox = me.container.getPageBox();
        }

        pageBox.centerY = pageBox.height / 2;
        pageBox.centerX = pageBox.width / 2;

        if(pos.x != undefined || pos.y != undefined){
            pos.x = pos.x || 0;
            pos.y = pos.y || 0;
        }
        else {
            if (/^(bottom|top)/i.test(me.enter)) {
                size.width  = me.stretchX ? pageBox.width : Math.min(200,Math.max(size.width || box.width || pageBox.width, pageBox.width));
                size.height = Math.min(size.height || 0, pageBox.height) || undefined;
                size = me.setSize(size).getSize();
                pos.x = pageBox.centerX - size.width / 2;
                pos.y = me.enter == 'top' ? 0 : pageBox.height - size.height + scrollTop;

            } else if (/^(left|right)/i.test(me.enter)) {
                size.height = me.stretchY ? pageBox.height : Math.min(200, Math.max(size.height || box.height || pageBox.height, pageBox.height));
                size.width  = Math.min(size.width || 0, pageBox.width) || undefined;
                size = me.setSize(size).getSize();
                pos.y = 0;
                pos.x = me.enter == 'left' ? 0 : pageBox.width - size.width;
            }
        }
        me.setPosition(pos);
        return this;
    },

     
    afterRender : function() {
        Ext.Sheet.superclass.afterRender.apply(this, arguments);
        this.el.setVisibilityMode(Ext.Element.OFFSETS);
    },

    
    onShow : function(animation) {
        this.orient();
        return Ext.Sheet.superclass.onShow.call(this, animation || this.animSheet('enter'));
    },

    
    onOrientationChange : function(orientation, w, h) {
        this.orient();
        Ext.Sheet.superclass.onOrientationChange.apply(this, arguments);
    },

    
    beforeDestroy : function() {
        delete this.showAnimation;
        this.hide(false);
        Ext.Sheet.superclass.beforeDestroy.call(this);
    }
});

Ext.reg('sheet', Ext.Sheet);



Ext.ActionSheet = Ext.extend(Ext.Sheet, {
    componentCls: 'x-sheet-action',

    stretchY: true,
    stretchX: true,

    defaultType: 'button',

    constructor : function(config) {
        config = config || {};

        Ext.ActionSheet.superclass.constructor.call(this, Ext.applyIf({
            floating : true
        }, config));
    }
});

Ext.reg('actionsheet', Ext.ActionSheet);

Ext.TabBar = Ext.extend(Ext.Panel, {
    componentCls: 'x-tabbar',

    
    activeTab: null,

    
    defaultType: 'tab',

    
    sortable: false,

    
    sortHoldThreshold: 350,

    
    initComponent : function() {
        
        this.addEvents('change');

        this.layout = Ext.apply({}, this.layout || {}, {
            type: 'hbox',
            align: 'middle'
        });

        Ext.TabBar.superclass.initComponent.call(this);

    },

    
    initEvents : function() {
        if (this.sortable) {
            this.sortable = new Ext.util.Sortable(this.el, {
                itemSelector: '.x-tab',
                direction: 'horizontal',
                delay: this.sortHoldThreshold,
                constrain: true
            });
            this.mon(this.sortable, 'sortchange', this.onSortChange, this);
        }

        this.mon(this.el, {
            touchstart: this.onTouchStart,
            scope: this
        });

        Ext.TabBar.superclass.initEvents.call(this);
    },

    
    onTouchStart : function(e, t) {
        t = e.getTarget('.x-tab');
        if (t) {
            this.onTabTap(Ext.getCmp(t.id));
        }
    },

    
    onSortChange : function(sortable, el, index) {
    },

    
    onTabTap : function(tab) {
        if (!tab.disabled) {
            if (this.cardLayout) {
                if (this.cardSwitchAnimation) {
                    var animConfig = {
                        reverse: (this.items.indexOf(tab) < this.items.indexOf(this.activeTab)) ? true : false
                    };

                    if (Ext.isObject(this.cardSwitchAnimation)) {
                        Ext.apply(animConfig, this.cardSwitchAnimation);
                    } else {
                        Ext.apply(animConfig, {
                            type: this.cardSwitchAnimation
                        });
                    }
                }
                
                this.cardLayout.setActiveItem(tab.card, animConfig || this.cardSwitchAnimation);
            }
            this.activeTab = tab;
            this.fireEvent('change', this, tab, tab.card);
        }
    },

    
    getCardLayout : function() {
        return this.cardLayout;
    }
});

Ext.reg('tabbar', Ext.TabBar);


Ext.Tab = Ext.extend(Ext.Button, {
    isTab: true,
    baseCls: 'x-tab',

    
    pressedCls: 'x-tab-pressed',

    
    activeCls: 'x-tab-active',

    
    active: false,

    
    initComponent : function() {
        this.addEvents(
            
            'activate',
            
            'deactivate'
        );

        Ext.Tab.superclass.initComponent.call(this);

        var card = this.card;
        if (card) {
            this.card = null;
            this.setCard(card);
        }
    },

    
    setCard : function(card) {
        if (this.card) {
            this.mun(this.card, {
                activate: this.activate,
                deactivate: this.deactivate,
                scope: this
            });
        }
        this.card = card;
        if (card) {
            Ext.apply(this, card.tab || {});
            this.setText(this.title || card.title || this.text );
            this.setIconClass(this.iconCls || card.iconCls);
            this.setBadge(this.badgeText || card.badgeText);

            this.mon(card, {
                beforeactivate: this.activate,
                beforedeactivate: this.deactivate,
                scope: this
            });
        }
    },

    onRender: function() {
        Ext.Tab.superclass.onRender.apply(this, arguments);
        if (this.active) {
            this.el.addCls(this.activeCls);
        }
    },

    
    getCard : function() {
        return this.card;
    },

    
    activate : function() {
        this.active = true;
        if (this.el) {
            this.el.addCls(this.activeCls);
        }
        this.fireEvent('activate', this);
    },

    
    deactivate : function() {
        this.active = false;
        if (this.el) {
            this.el.removeCls(this.activeCls);
        }
        this.fireEvent('deactivate', this);
    }
});

Ext.reg('tab', Ext.Tab);


Ext.TabPanel = Ext.extend(Ext.Panel, {
    
    cardSwitchAnimation: 'slide',

    
    tabBarDock: 'top',
    componentCls: 'x-tabpanel',

    
    ui: 'dark',

    

    

    

    
    initComponent : function() {

        
        var layout = new Ext.layout.CardLayout(this.layout || {});
        this.layout = null;
        this.setLayout(layout);

        this.tabBar = new Ext.TabBar(Ext.apply({}, this.tabBar || {}, {
            cardLayout: layout,
            cardSwitchAnimation: this.cardSwitchAnimation,
            dock: this.tabBarDock,
            ui: this.ui,
            sortable: this.sortable
        }));

        if (this.dockedItems && !Ext.isArray(this.dockedItems)) {
            this.dockedItems = [this.dockedItems];
        }
        else if (!this.dockedItems) {
            this.dockedItems = [];
        }
        this.dockedItems.push(this.tabBar);

        Ext.TabPanel.superclass.initComponent.call(this);
    },

    
    getTabBar : function() {
        return this.tabBar;
    },
    
    
    
    onAdd: function(cmp, idx) {
        var tabBar = this.tabBar;
        
        cmp.tab = tabBar.insert(idx, {
            xtype: 'tab',
            card: cmp
        });
        tabBar.doLayout();
    },
    
    
    onRemove: function(cmp, autoDestroy) {
        
        if (!this.destroying) {
            this.tabBar.remove(cmp.tab, autoDestroy);
            this.tabBar.doLayout();
        }
    }
});

Ext.reg('tabpanel', Ext.TabPanel);


Ext.Carousel = Ext.extend(Ext.Panel, {
    
    baseCls: 'x-carousel',

    
    indicator: true,

    
    ui: 'dark',

    
    direction: 'horizontal',

    
    horizontal: false,
    
    vertical: false,
    
    
    initComponent: function() {
        this.layout = {
            type: 'card',
            
            sizeAllCards: true,
            
            hideInactive: false,
            itemCls: 'x-carousel-item',
            targetCls: 'x-carousel-body',
            setOwner : function(owner) {
                Ext.layout.CardLayout.superclass.setOwner.call(this, owner);
            }
        };
         
        if (this.indicator) {
            var cfg = Ext.isObject(this.indicator) ? this.indicator : {};
            this.indicator = new Ext.Carousel.Indicator(Ext.apply({}, cfg, {
                direction: this.direction,
                carousel: this,
                ui: this.ui
            }));
        }

        if (this.direction == 'horizontal') {
            this.horizontal = true;
        }
        else {
            this.vertical = true;
        }
        
        Ext.Carousel.superclass.initComponent.call(this);
    },

    
    afterRender: function() {
        Ext.Carousel.superclass.afterRender.call(this);

        
        this.mon(this.body, {
            drag: this.onDrag,
            dragThreshold: 5,
            dragend: this.onDragEnd,
            direction: this.direction,
            scope: this
        });
        
        this.el.addCls(this.baseCls + '-' + this.direction);
    },
    
    
    onAdd: function(){
        Ext.Carousel.superclass.onAdd.apply(this, arguments);
        var indicator = this.indicator;
        if (indicator) {
            indicator.onCardAdd();
        }    
    },
    
    
    onRemove: function(){
        Ext.Carousel.superclass.onRemove.apply(this, arguments);
        var indicator = this.indicator;
        if (indicator) {
            indicator.onCardRemove();
        }
    },
    
        
    afterLayout : function() {
        Ext.Carousel.superclass.afterLayout.apply(this, arguments);
        
        this.currentSize = this.body.getSize();
        this.currentScroll = {x: 0, y: 0};
        
        this.updateCardPositions();
        
        var activeItem = this.layout.getActiveItem();        
        if (activeItem && this.indicator) {  
            this.indicator.onBeforeCardSwitch(this, activeItem, null, this.items.indexOf(activeItem));
        }
    },

        
    onDrag : function(e) {
        this.currentScroll = {
            x: e.deltaX,
            y: e.deltaY
        };
        
        
        var activeIndex = this.items.items.indexOf(this.layout.activeItem);
        
        if (this.horizontal) {
            if (
                
                (activeIndex == 0 && e.deltaX > 0) || 
                
                (activeIndex == this.items.length - 1 && e.deltaX < 0)
            ) {
                
                this.currentScroll.x = e.deltaX / 2;             
            }
        }
        
        else if (this.vertical) {
            if (
                
                (activeIndex == 0 && e.deltaY > 0) || 
                
                (activeIndex == this.items.length - 1 && e.deltaY < 0)
            ) {
                
                this.currentScroll.y = e.deltaY / 2;
            }
        }
        
        this.updateCardPositions();
    },

    
    updateCardPositions : function(animate) {
        var cards = this.items.items,
            ln = cards.length,
            cardOffset,
            i, card, el, style;
        
        
        
        
        for (i = 0; i < ln; i++) {
            card = cards[i];  
            
            
            if (this.isCardInRange(card)) {
                if (card.hidden) {
                    card.show();
                }
                
                el = card.el;
                style = el.dom.style;
                
                if (animate) {
                    if (card === this.layout.activeItem) {
                        el.on('webkitTransitionEnd', this.onTransitionEnd, this, {single: true});
                    }
                    style.webkitTransitionDuration = '300ms';
                }
                else {
                    style.webkitTransitionDuration = '0ms';
                }

                cardOffset = this.getCardOffset(card);
                if (this.horizontal) {
                    Ext.Element.cssTransform(el, {translate: [cardOffset, 0]});
                }
                else {
                    Ext.Element.cssTransform(el, {translate: [0, cardOffset]});
                }
            }
            else if (!card.hidden) {
                
                card.hide();
            }
        }
    },

        
    getCardOffset : function(card) {
        var cardOffset = this.getCardIndexOffset(card),
            currentSize = this.currentSize,
            currentScroll = this.currentScroll;
            
        return this.horizontal ?
            (cardOffset * currentSize.width) + currentScroll.x :
            (cardOffset * currentSize.height) + currentScroll.y;
    },

            
    getCardIndexOffset : function(card) {
        return this.items.items.indexOf(card) - this.getActiveIndex();
    },

        
    isCardInRange : function(card) {
        return Math.abs(this.getCardIndexOffset(card)) <= 2;
    },

        
    getActiveIndex : function() {
        return this.items.indexOf(this.layout.activeItem);
    },

            
    onDragEnd : function(e, t) {
        var previousDelta, deltaOffset; 
            
        if (this.horizontal) {
            deltaOffset = e.deltaX;
            previousDelta = e.previousDeltaX;
        }
        else {
            deltaOffset = e.deltaY;
            previousDelta = e.previousDeltaY;
        }
            
        
        if (deltaOffset < 0 && Math.abs(deltaOffset) > 3 && previousDelta <= 0 && this.layout.getNext()) {
            this.next();
        }
        
        else if (deltaOffset > 0 && Math.abs(deltaOffset) > 3 && previousDelta >= 0 && this.layout.getPrev()) {
            this.prev();
        }
        else {
            
            this.scrollToCard(this.layout.activeItem);
        }
    },

    
    onBeforeCardSwitch : function(newCard) {
        if (!this.customDrag && this.items.indexOf(newCard) != -1) {
            var style = newCard.el.dom.style;
            style.webkitTransitionDuration = null;
            style.webkitTransform = null;
        }
        return Ext.Carousel.superclass.onBeforeCardSwitch.apply(this, arguments);
    },

        
    scrollToCard : function(newCard) {
        this.currentScroll = {x: 0, y: 0};
        this.oldCard = this.layout.activeItem;
        
        if (newCard != this.oldCard && this.isCardInRange(newCard) && this.onBeforeCardSwitch(newCard, this.oldCard, this.items.indexOf(newCard), true) !== false) {
            this.layout.activeItem = newCard;
            if (this.horizontal) {
                this.currentScroll.x = -this.getCardOffset(newCard);
            }
            else {
                this.currentScroll.y = -this.getCardOffset(newCard);
            }
        }
        
        this.updateCardPositions(true);
    },    

    
    onTransitionEnd : function(e, t) {
        this.customDrag = false;
        this.currentScroll = {x: 0, y: 0};
        if (this.oldCard && this.layout.activeItem != this.oldCard) {
            this.onCardSwitch(this.layout.activeItem, this.oldCard, this.items.indexOf(this.layout.activeItem), true);
        }
        delete this.oldCard;
    },
        
    
    onCardSwitch : function(newCard, oldCard, index, animated) {
        this.currentScroll = {x: 0, y: 0};
        this.updateCardPositions();
        Ext.Carousel.superclass.onCardSwitch.apply(this, arguments);
        newCard.fireEvent('activate', newCard);
    },

    
    next: function() {
        var next = this.layout.getNext();
        if (next) {
            this.customDrag = true;
            this.scrollToCard(next);
        }
        return this;
    },

    
    prev: function() {
        var prev = this.layout.getPrev();
        if (prev) {
            this.customDrag = true;
            this.scrollToCard(prev);
        }
        return this;
    },
    
    
    isVertical : function() {
        return this.vertical;
    },
    
    
    isHorizontal : function() {
        return this.horizontal;
    },
    
    
    beforeDestroy: function(){
        Ext.destroy(this.indicator);
        Ext.Carousel.superclass.beforeDestroy.call(this);
    }
});

Ext.reg('carousel', Ext.Carousel);


Ext.Carousel.Indicator = Ext.extend(Ext.Component, {
    baseCls: 'x-carousel-indicator',

    initComponent: function() {
        if (this.carousel.rendered) {
            this.render(this.carousel.body);
            this.onBeforeCardSwitch(null, null, this.carousel.items.indexOf(this.carousel.layout.getActiveItem()));
        }
        else {
            this.carousel.on('render', function() {
                this.render(this.carousel.body);
            }, this, {single: true});
        }
        Ext.Carousel.Indicator.superclass.initComponent.call(this);
    },

    
    onRender: function() {
        Ext.Carousel.Indicator.superclass.onRender.apply(this, arguments);

        for (var i = 0, ln = this.carousel.items.length; i < ln; i++) {
            this.createIndicator();
        }

        this.mon(this.carousel, {
            beforecardswitch: this.onBeforeCardSwitch,
            scope: this
        });

        this.mon(this.el, {
            tap: this.onTap,
            scope: this
        });
        
        this.el.addCls(this.baseCls + '-' + this.direction);
    },

    
    onTap: function(e, t) {
        var box = this.el.getPageBox(),
            centerX = box.left + (box.width / 2),
            centerY = box.top + (box.height / 2),
            carousel = this.carousel;

        if ((carousel.isHorizontal() && e.pageX > centerX) || (carousel.isVertical() && e.pageY > centerY)) {
            this.carousel.next();
        } else {
            this.carousel.prev();
        }
    },

    
    createIndicator: function() {
        this.indicators = this.indicators || [];
        this.indicators.push(this.el.createChild({
            tag: 'span'
        }));
    },

    
    onBeforeCardSwitch: function(carousel, card, old, index) {
        if (Ext.isNumber(index) && index != -1 && this.indicators[index]) {
            this.indicators[index].radioCls('x-carousel-indicator-active');
        }
    },

    
    onCardAdd: function() {
        if (this.rendered) {
            this.createIndicator();
        }
    },

    
    onCardRemove: function() {
        if (this.rendered) {
            this.indicators.pop().remove();
        }
    }
});

Ext.reg('carouselindicator', Ext.Carousel.Indicator);

Ext.Map = Ext.extend(Ext.Component, {
    
    baseCls: 'x-map',

    
    useCurrentLocation: false,
    
    monitorResize : true,

    

    
    map: null,

    
    geo: null,

    
    maskMap: false,
    
    maskMapCls: 'x-mask-map',


    initComponent : function() {
        this.mapOptions = this.mapOptions || {};
        
        this.scroll = false;
        
        
        if(!(window.google || {}).maps){
            this.html = 'Google Maps API is required';   
        }
        else if (this.useCurrentLocation) {
            this.geo = this.geo || new Ext.util.GeoLocation({autoLoad: false});
            this.geo.on({
                locationupdate : this.onGeoUpdate,
                locationerror : this.onGeoError, 
                scope : this
            });
        }
        
        Ext.Map.superclass.initComponent.call(this);
                
        this.addEvents ( 
                 
            'maprender',
        
                 
            'centerchange',
            
                 
            'typechange',
            
                 
            'zoomchange'
        );
        
        if (this.geo){
            this.on({
                activate: this.onUpdate,
                scope: this,
                single: true
            });
            this.geo.updateLocation();
        }
        
    },
    
    
    onRender : function(container, position) {
        Ext.Map.superclass.onRender.apply(this, arguments);
        this.el.setVisibilityMode(Ext.Element.OFFSETS);        
    },
    
     
    afterRender : function() {
        Ext.Map.superclass.afterRender.apply(this, arguments);
        this.renderMap();
    },
    
    
    onResize : function( w, h) {
        Ext.Map.superclass.onResize.apply(this, arguments);
        if (this.map) {
            google.maps.event.trigger(this.map, 'resize');
        }
    },
    
    afterComponentLayout : function() {
        if (this.maskMap && !this.mask) {
            this.el.mask(null, this.maskMapCls);
            this.mask = true;
        }
    },
    
    renderMap : function(){
        var me = this,
            gm = (window.google || {}).maps;
        
        if (gm) {
            if (Ext.is.iPad) {
                Ext.applyIf(me.mapOptions, {
                    navigationControlOptions: {
                        style: gm.NavigationControlStyle.ZOOM_PAN
                    }
                });
            }
                
            Ext.applyIf(me.mapOptions, {
                center: new gm.LatLng(37.381592, -122.135672), 
                zoom: 12,
                mapTypeId: gm.MapTypeId.ROADMAP
            });
            
            if (me.maskMap && !me.mask) {
                me.el.mask(null, this.maskMapCls);
                me.mask = true;
            }
    
            if (me.el && me.el.dom && me.el.dom.firstChild) {
                Ext.fly(me.el.dom.firstChild).remove();
            }
        
            if (me.map) {
                gm.event.clearInstanceListeners(me.map);
            }
            
            me.map = new gm.Map(me.el.dom, me.mapOptions);
            
            var event = gm.event;
            
            event.addListener(me.map, 'zoom_changed', Ext.createDelegate(me.onZoom, me));
            event.addListener(me.map, 'maptypeid_changed', Ext.createDelegate(me.onTypeChange, me));
            event.addListener(me.map, 'center_changed', Ext.createDelegate(me.onCenterChange, me));
            
            me.fireEvent('maprender', me, me.map);
        }
        
    },

    onGeoUpdate : function(coords) {
        var center;
        if (coords) {
            center = this.mapOptions.center = new google.maps.LatLng(coords.latitude, coords.longitude);
        }
        
        if (this.rendered) {
            this.update(center);
        }
        else {
            this.on('activate', this.onUpdate, this, {single: true, data: center});
        }
    },
    
    onGeoError : function(geo){
          
    },

    onUpdate : function(map, e, options) {
        this.update((options || {}).data);
    },
    
    
    
    update : function(coordinates) {
        var me = this, 
            gm = (window.google || {}).maps;

        if (gm) {
            coordinates = coordinates || me.coords || new gm.LatLng(37.381592, -122.135672);
            
            if (coordinates && !(coordinates instanceof gm.LatLng) && 'longitude' in coordinates) {
                coordinates = new gm.LatLng(coordinates.latitude, coordinates.longitude);
            }
            
            if (!me.hidden && me.rendered) {
                me.map || me.renderMap();
                if (me.map && coordinates instanceof gm.LatLng) {
                   me.map.panTo(coordinates);
                }
            }
            else {
                me.on('activate', me.onUpdate, me, {single: true, data: coordinates});
            }
        }
    },
    
    
    onZoom  : function() {
        this.mapOptions.zoom = (this.map && this.map.getZoom 
            ? this.map.getZoom() 
            : this.mapOptions.zoom) || 10 ;
            
        this.fireEvent('zoomchange', this, this.map, this.mapOptions.zoom);
    },
    
    
    onTypeChange  : function() {
        this.mapOptions.mapTypeId = this.map && this.map.getMapTypeId 
            ? this.map.getMapTypeId() 
            : this.mapOptions.mapTypeId;
        
        this.fireEvent('typechange', this, this.map, this.mapOptions.mapTypeId);
    },

    
    onCenterChange : function(){
       this.mapOptions.center = this.map && this.map.getCenter 
            ? this.map.getCenter() 
            : this.mapOptions.center;
        
       this.fireEvent('centerchange', this, this.map, this.mapOptions.center);
       
    },
    
    getState : function(){
        return this.mapOptions;  
    },
    
    
    onDestroy : function() {
        Ext.destroy(this.geo);
        if (this.maskMap && this.mask) {
            this.el.unmask();
        }
        if (this.map && (window.google || {}).maps) {
            google.maps.event.clearInstanceListeners(this.map);
        }
        Ext.Map.superclass.onDestroy.call(this);
    }
});

Ext.reg('map', Ext.Map);

Ext.NestedList = Ext.extend(Ext.Panel, {
    componentCls: 'x-nested-list',
    
    layout: 'card',

    

    

    
    
    

    
    cardSwitchAnimation: 'slide',

    
    backButton: null,

    
    backText: 'Back',

    
    useTitleAsBackText: true,

    
    updateTitleText: true,

    
    displayField: 'text',

    
    loadingText: 'Loading...',

    
    emptyText: 'No items available.',

    
    onItemDisclosure: false,

    
    clearSelectionDelay: 200,
    
    
    
    allowDeselect: false,

    
    getItemTextTpl: function(node) {
        return '{' + this.displayField + '}';
    },

    
    getTitleTextTpl: function(node) {
        return '{' + this.displayField + '}';
    },

    
    renderTitleText: function(node) {
        
        
        
        if (!node.titleTpl) {
            node.titleTpl = new Ext.XTemplate(this.getTitleTextTpl(node));
        }
        var record = node.getRecord();
        if (record) {
            return node.titleTpl.applyTemplate(record.data);
        } else if (node.isRoot) {
            return this.title || this.backText;
        
        } else {
            throw new Error("No RecordNode passed into renderTitleText");
        }
        
    },

    
    
    useToolbar: true,

    

    

    
    getDetailCard: function(recordNode, parentNode) {
        return false;
    },

    initComponent : function() {
        
        var store    = Ext.StoreMgr.lookup(this.store),
            rootNode = store.getRootNode(),
            title    = rootNode.getRecord() ? this.renderTitleText(rootNode) : this.title || '';

        this.store = store;

        if (this.useToolbar) {
            
            this.backButton = new Ext.Button({
                text: this.backText,
                ui: 'back',
                handler: this.onBackTap,
                scope: this,
                
                hidden: true
            });
            if (!this.toolbar || !this.toolbar.isComponent) {
                
                this.toolbar = Ext.apply({}, this.toolbar || {}, {
                    dock: 'top',
                    xtype: 'toolbar',
                    ui: 'light',
                    title: title,
                    items: []
                });
                this.toolbar.items.unshift(this.backButton);
                this.toolbar = new Ext.Toolbar(this.toolbar);

                this.dockedItems = this.dockedItems || [];
                this.dockedItems.push(this.toolbar);
            } else {
                this.toolbar.insert(0, this.backButton);
            }
        }

        this.items = [this.getSubList(rootNode)];

        Ext.NestedList.superclass.initComponent.call(this);
        this.on('itemtap', this.onItemTap, this);


        this.addEvents(
            

            

            

            

            

            
            
            'listchange',

            
            'leafitemtap'
        );
    },

    
    getListConfig: function(node) {
        var itemId = node.internalId,
            emptyText = this.emptyText;

        return {
            itemId: itemId,
            xtype: 'list',
            autoDestroy: true,
            recordNode: node,
            store: this.store.getSubStore(node),
            loadingText: this.loadingText,
            onItemDisclosure: this.onItemDisclosure,
            displayField: this.displayField,
            singleSelect: true,
            clearSelectionOnDeactivate: false,
            bubbleEvents: [
                'itemtap',
                'containertap',
                'beforeselect',
                'itemdoubletap',
                'selectionchange'
            ],
            itemTpl: '<span<tpl if="leaf == true"> class="x-list-item-leaf"</tpl>>' + this.getItemTextTpl(node) + '</span>',
            deferEmptyText: true,
            allowDeselect: this.allowDeselect,
            refresh: function() {
                if (this.hasSkippedEmptyText) {
                    this.emptyText = emptyText;
                }
                Ext.List.prototype.refresh.apply(this, arguments);
            }
        };
    },

    
    getSubList: function(node) {
        var items  = this.items,
            list,
            itemId = node.internalId;

        
        
        if (items && items.get) {
            list = items.get(itemId);
        }

        if (list) {
            return list;
        } else {
            return this.getListConfig(node);
        }
    },

    addNextCard: function(recordNode, swapTo) {
        var nextList,
            parentNode   = recordNode ? recordNode.parentNode : null,
            card;

        if (recordNode.leaf) {
            card = this.getDetailCard(recordNode, parentNode);
            if (card) {
                nextList = this.add(card);
            }
        } else {
            nextList = this.getSubList(recordNode);
            nextList = this.add(nextList);
        }
        return nextList;
    },

    setActivePath: function(path) {
        
        
        
        var gotoRoot = path.substr(0, 1) === "/",
            j        = 0,
            ds       = this.store,
            tree     = ds.tree,
            node, card, lastCard,
            pathArr, pathLn;

        if (gotoRoot) {
            path = path.substr(1);
        }

        pathArr = Ext.toArray(path.split('/'));
        pathLn  = pathArr.length;


        if (gotoRoot) {
            
            var items      = this.items,
                itemsArray = this.items.items,
                i          = items.length;

            for (; i > 1; i--) {
                this.remove(itemsArray[i - 1], true);
            }

            
            
            var rootNode = itemsArray[0].recordNode;
            if (rootNode.id !== pathArr[0]) {
                throw new Error("rootNode doesn't match!");
            }
            

            
            j = 1;
        }


        
        for (; j < pathLn; j++) {
            if (pathArr[j] !== "") {
                node = tree.getNodeById(pathArr[j]);

                
                
                
                card = this.addNextCard(node);

                
                
                if (card) {
                    lastCard = card;
                }
            }
        }

        
        if (!lastCard) {
            throw new Error("Card was not found when trying to add to NestedList.");
        }
        

        this.setActiveItem(lastCard, false);
        this.fireEvent('listchange', this, lastCard);
        this.syncToolbar();
    },

    syncToolbar: function(card) {
        var list          = card || this.getActiveItem(),
            depth         = this.items.indexOf(list),
            recordNode    = list.recordNode,
            parentNode    = recordNode ? recordNode.parentNode : null,
            backBtn       = this.backButton,
            backBtnText   = this.useTitleAsBackText && parentNode ? this.renderTitleText(parentNode) : this.backText,
            backToggleMth = (depth !== 0) ? 'show' : 'hide';


            if (backBtn) {
                backBtn[backToggleMth]();
                if (parentNode) {
                    backBtn.setText(backBtnText);
                }
            }


            if (this.toolbar && this.updateTitleText) {
                this.toolbar.setTitle(recordNode && recordNode.getRecord() ? this.renderTitleText(recordNode) : this.title || '');
                this.toolbar.doLayout();
            }
    },

    
    onItemTap: function(subList, subIdx, el, e) {
        var store        = subList.getStore(),
            record       = store.getAt(subIdx),
            recordNode   = record.node,
            parentNode   = recordNode ? recordNode.parentNode : null,
            displayField = this.displayField,
            backToggleMth,
            nextDepth,
            nextList;

        nextList = this.addNextCard(recordNode);

        if (recordNode.leaf) {
            this.fireEvent("leafitemtap", subList, subIdx, el, e, nextList);
        }

        if (nextList) {
            
            
            nextDepth = this.items.indexOf(nextList);

            this.setActiveItem(nextList, {
                type: this.cardSwitchAnimation
            });
            this.syncToolbar(nextList);
        }
    },

    
    onBackTap: function() {
        var currList      = this.getActiveItem(),
            currIdx       = this.items.indexOf(currList);

        if (currIdx != 0) {
            var prevDepth     = currIdx - 1,
                prevList      = this.items.getAt(prevDepth),
                recordNode    = prevList.recordNode,
                record        = recordNode.getRecord(),
                parentNode    = recordNode ? recordNode.parentNode : null,
                backBtn       = this.backButton,
                backToggleMth = (prevDepth !== 0) ? 'show' : 'hide',
                backBtnText;

            this.on('cardswitch', function(newCard, oldCard) {
                var selModel = prevList.getSelectionModel();
                this.remove(currList);
                if (this.clearSelectionDelay) {
                    Ext.defer(selModel.deselectAll, this.clearSelectionDelay, selModel);
                }
            }, this, {single: true});
            
            this.setActiveItem(prevList, {
                type: this.cardSwitchAnimation,
                reverse: true,
                scope: this
            });
            this.syncToolbar(prevList);
        }
    }
});
Ext.reg('nestedlist', Ext.NestedList);

Ext.Picker = Ext.extend(Ext.Sheet, {
    
    componentCls: 'x-picker',
    
    stretchX: true,
    stretchY: true,
    hideOnMaskTap: false,
    
    
    doneButton: 'Done',
    
    
    cancelButton: 'Cancel',

    
    height: 220,
    
    
    useTitles: false,

    
    

    
    
    
    
    
    defaultType: 'pickerslot',
    
    
    initComponent : function() {

        this.addEvents(
            
            'pick',

            
            'change',

            
            'cancel'
        );
            
        this.layout = {
            type: 'hbox',
            align: 'stretch'
        };

        if (this.slots) {
            this.items = this.items ? (Ext.isArray(this.items) ? this.items : [this.items]) : [];
            this.items = this.items.concat(this.slots);
        }
        
        if (this.useTitles) {
            this.defaults = Ext.applyIf(this.defaults || {}, {
                title: ''
            });            
        }

        this.on('slotpick', this.onSlotPick, this);

        if (this.doneButton || this.cancelButton) {
            var toolbarItems = [];

            if (this.cancelButton) {
                toolbarItems.push(
                    Ext.apply(
                        {
                            handler: this.onCancelButtonTap,
                            scope: this
                        },
                        ((Ext.isObject(this.cancelButton) ? this.cancelButton : { text: String(this.cancelButton) }))
                    )
                );
            }

            toolbarItems.push({xtype: 'spacer'});

            if (this.doneButton) {
                toolbarItems.push(
                    Ext.apply(
                        {
                            ui: 'action',
                            handler: this.onDoneButtonTap,
                            scope: this
                        },
                        ((Ext.isObject(this.doneButton) ? this.doneButton : { text: String(this.doneButton) }))
                    )
                );
            }

            this.toolbar = new Ext.Toolbar(Ext.applyIf(this.buttonBar || {
                dock: 'top',
                items: toolbarItems,
                defaults: {
                    xtype: 'button'
                }
            }));
           
            this.dockedItems = this.dockedItems ? (Ext.isArray(this.dockedItems) ? this.dockedItems : [this.dockedItems]) : [];
            this.dockedItems.push(this.toolbar);
        }

        Ext.Picker.superclass.initComponent.call(this);
    },

    
    afterRender: function() {
        Ext.Picker.superclass.afterRender.apply(this, arguments);

        if (this.value) {
            this.setValue(this.value, false);
        }
    },

    
    onDoneButtonTap : function() {
        var anim = this.animSheet('exit');
        Ext.apply(anim, {
            after: function() {
                this.fireEvent('change', this, this.getValue());
            },
            scope: this
        });
        this.hide(anim);
    },

    
    onCancelButtonTap : function() {
        var anim = this.animSheet('exit');
        Ext.apply(anim, {
            after: function() {
                
                this.setValue(this.values);
                this.fireEvent('cancel', this);
            },
            scope: this
        });
        this.hide(anim);
    },
    
    
    onSlotPick: function(slot, value, node) {
        this.fireEvent('pick', this, this.getValue(), slot);
        return false;
    },
    
    
    setValue: function(values, animated) {
        var slot,
            items = this.items.items,
            ln = items.length;

        
        if (!values) {
            for (var i = 0; i < ln; i++) {
                items[i].setSelectedNode(0);
            }
            
            return this;
        }

        Ext.iterate(values, function(key, value) {
            slot = this.child('[name=' + key + ']');
            
            if (slot) {
                slot.setValue(value, animated);
            }
        }, this);

        this.values = values;
       
        return this;
    },
    
    
    getValue: function() {
        var values = {},
            items = this.items.items,
            ln = items.length, item, i;

        for (i = 0; i < ln; i++) {
            item = items[i];
            values[item.name] = item.getValue();
        }

        return values;
    }
});

Ext.regModel('x-textvalue', {
    fields: ['text', 'value']
});


Ext.Picker.Slot = Ext.extend(Ext.DataView, {
    isSlot: true,
    
    flex: 1,

    
    name: null,

    
    displayField: 'text',

    
    valueField: 'value',

    
    align: 'center',
    
    
    itemSelector: 'div.x-picker-item',
    
    
    componentCls: 'x-picker-slot',
    
    
    renderTpl : [
        '<div class="x-picker-mask">',
            '<div class="x-picker-bar"></div>',
        '</div>'
    ],
    
    
    selectedIndex: 0,
    
    
    getElConfig: function() {
        return {
            tag: 'div',
            id: this.id,
            cls: 'x-picker-' + this.align
        };
    },
    
    
    initComponent : function() {
        
        if (!this.name) {
            throw new Error('Each picker slot is required to have a name.');
        }
        

        Ext.apply(this.renderSelectors, {
            mask: '.x-picker-mask',
            bar: '.x-picker-bar'
        });

        this.scroll = {
            direction: 'vertical',
            useIndicators: false,
            friction: 0.7,
            acceleration: 25,
            snapDuration: 200,
            animationDuration: 200
        };

        this.tpl = new Ext.XTemplate([
            '<tpl for=".">',
                '<div class="x-picker-item {cls} <tpl if="extra">x-picker-invalid</tpl>">{' + this.displayField + '}</div>',
            '</tpl>'
        ]);

        var data = this.data,
            parsedData = [],
            ln = data && data.length,
            i, item, obj;

        if (data && Ext.isArray(data) && ln) {
            for (i = 0; i < ln; i++) {
                item = data[i];
                obj = {};
                if (Ext.isArray(item)) {
                    obj[this.valueField] = item[0];
                    obj[this.displayField] = item[1];
                }
                else if (Ext.isString(item)) {
                    obj[this.valueField] = item;
                    obj[this.displayField] = item;
                }
                else if (Ext.isObject(item)) {
                    obj = item;
                }
                parsedData.push(obj);
            }

            this.store = new Ext.data.Store({
                model: 'x-textvalue',
                data: parsedData
            });
            
            this.tempStore = true;
        }
        else if (this.store) {
            this.store = Ext.StoreMgr.lookup(this.store);
        }

        this.enableBubble('slotpick');

        if (this.title) {
            this.title = new Ext.Component({
                dock: 'top',
                componentCls: 'x-picker-slot-title',
                html: this.title
            });
            this.dockedItems = this.title;
        }

        Ext.Picker.Slot.superclass.initComponent.call(this);

        if (this.value !== undefined) {
            this.setValue(this.value, false);
        }
    },
    
    
    setupBar: function() {
        this.el.setStyle({padding: ''});

        var padding = this.bar.getY() - this.el.getY();
        this.barHeight = this.bar.getHeight();

        this.el.setStyle({
            padding: padding + 'px 0'
        });
        this.slotPadding = padding;
        this.scroller.updateBoundary();
        this.scroller.setSnap(this.barHeight);
        this.setSelectedNode(this.selectedIndex, false);
    },
    
    
    afterComponentLayout: function() {
        
        
        Ext.defer(this.setupBar, 200, this);
    },
    
    
    initEvents: function() {
        this.mon(this.scroller, {
            scrollend: this.onScrollEnd,
            scope: this
        });
    },
    
    
    onScrollEnd: function(scroller, offset) {
        this.selectedNode = this.getNode(Math.round(offset.y / this.barHeight));
        this.selectedIndex = this.indexOf(this.selectedNode);
        this.fireEvent('slotpick', this, this.getValue(), this.selectedNode);
    },
    
    
    scrollToNode: function(node, animate) {
        var offsetsToBody = Ext.fly(node).getOffsetsTo(this.scrollEl)[1];
        this.scroller.scrollTo({
            y: offsetsToBody
        }, animate !== false ? true : false);
    },
    
    
    onItemTap: function(node) {
        Ext.Picker.Slot.superclass.onItemTap.apply(this, arguments);
        this.setSelectedNode(node);

        this.selectedNode = node;
        this.selectedIndex = this.indexOf(node);
        this.fireEvent('slotpick', this, this.getValue(), this.selectedNode);
    },
    
    
    getSelectedNode: function() {
        return this.selectedNode;
    },
    
    
    setSelectedNode: function(selected, animate) {
        
        if (Ext.isNumber(selected)) {
            selected = this.getNode(selected);
        }
        else if (selected.isModel) {
            selected = this.getNode(this.store.indexOf(selected));
        }

        
        if (selected) {
            this.selectedNode = selected;
            this.selectedIndex = this.indexOf(selected);
            this.scrollToNode(selected, animate);
        }
    },
    
    
    getValue: function() {
        var record = this.store.getAt(this.selectedIndex);
        return record ? record.get(this.valueField) : null;
    },

    
    setValue: function(value, animate) {
        var index = this.store.find(this.valueField, value);
        if (index != -1) {
            if (!this.rendered) {
                this.selectedIndex = index;
                return;
            }
            this.setSelectedNode(index, animate);
        }
    },

    onDestroy: function() {
        if (this.tempStore) {
            this.store.destroyStore();
            this.store = null;
        }
        Ext.Picker.Slot.superclass.onDestroy.call(this);
    }
});

Ext.reg('pickerslot', Ext.Picker.Slot);


Ext.DatePicker = Ext.extend(Ext.Picker, {
    
    yearFrom: 1980,

    
    yearTo: new Date().getFullYear(),

    
    monthText: 'Month',

    
    dayText: 'Day',

    
    yearText: 'Year',

    

    
    slotOrder: ['month', 'day', 'year'],

    initComponent: function() {
        var yearsFrom = this.yearFrom,
            yearsTo = this.yearTo,
            years = [],
            days = [],
            months = [],
            ln, tmp, i,
            daysInMonth;

        
        if (yearsFrom > yearsTo) {
            tmp = yearsFrom;
            yearsFrom = yearsTo;
            yearsTo = tmp;
        }

        for (i = yearsFrom; i <= yearsTo; i++) {
            years.push({
                text: i,
                value: i
            });
        }

        daysInMonth = this.getDaysInMonth(1, new Date().getFullYear());

        for (i = 0; i < daysInMonth; i++) {
            days.push({
                text: i + 1,
                value: i + 1
            });
        }

        for (i = 0, ln = Date.monthNames.length; i < ln; i++) {
            months.push({
                text: Date.monthNames[i],
                value: i + 1
            });
        }

        this.slots = [];

        this.slotOrder.forEach(function(item){
            this.slots.push(this.createSlot(item, days, months, years));
        }, this);

        Ext.DatePicker.superclass.initComponent.call(this);
    },

    afterRender: function() {
        Ext.DatePicker.superclass.afterRender.apply(this, arguments);

        this.setValue(this.value);
    },

    createSlot: function(name, days, months, years){
        switch (name) {
            case 'year':
                return {
                    name: 'year',
                    align: 'center',
                    data: years,
                    title: this.useTitles ? this.yearText : false,
                    flex: 3
                };
            case 'month':
                return {
                    name: name,
                    align: 'right',
                    data: months,
                    title: this.useTitles ? this.monthText : false,
                    flex: 4
                };
            case 'day':
                return {
                    name: 'day',
                    align: 'center',
                    data: days,
                    title: this.useTitles ? this.dayText : false,
                    flex: 2
                };
        }
    },

    
    onSlotPick: function(slot, value) {
        var name = slot.name,
            date, daysInMonth, daySlot;

        if (name === "month" || name === "year") {
            daySlot = this.child('[name=day]');
            date = this.getValue();
            daysInMonth = this.getDaysInMonth(date.getMonth()+1, date.getFullYear());
            daySlot.store.clearFilter();
            daySlot.store.filter({
                fn: function(r) {
                    return r.get('extra') === true || r.get('value') <= daysInMonth;
                }
            });
            daySlot.scroller.updateBoundary(true);
        }

        Ext.DatePicker.superclass.onSlotPick.apply(this, arguments);
    },

    
    getValue: function() {
        var value = Ext.DatePicker.superclass.getValue.call(this),
            daysInMonth = this.getDaysInMonth(value.month, value.year),
            day = Math.min(value.day, daysInMonth);

        return new Date(value.year, value.month-1, day);
    },

    
    setValue: function(value, animated) {
        if (!Ext.isDate(value) && !Ext.isObject(value)) {
            value = null;
        }

        if (Ext.isDate(value)) {
            this.value = {
                day : value.getDate(),
                year: value.getFullYear(),
                month: value.getMonth() + 1
            };
        } else {
            this.value = value;
        }

        return Ext.DatePicker.superclass.setValue.call(this, this.value, animated);
    },

    
    getDaysInMonth: function(month, year) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        return month == 2 && this.isLeapYear(year) ? 29 : daysInMonth[month-1];
    },

    
    isLeapYear: function(year) {
        return !!((year & 3) === 0 && (year % 100 || (year % 400 === 0 && year)));
    }
});

Ext.reg('datepicker', Ext.DatePicker);


Ext.Media = Ext.extend(Ext.Component, {
    

    
    url: '',

    
    enableControls: true,
    
    
    autoResume: false,

    
    autoPause: true,

    
    preload: true,

    
    playing: false,

    
    afterRender : function() {
        var cfg = this.getConfiguration();
        Ext.apply(cfg, {
            src: this.url,
            preload: this.preload ? 'auto' : 'none'
        });
        if(this.enableControls){
            cfg.controls = 'controls';
        }
        if(this.loop){
            cfg.loop = 'loop';
        }
        
        this.media = this.el.createChild(cfg);
        Ext.Media.superclass.afterRender.call(this);
        
        this.on({
            scope: this,
            activate: this.onActivate,
            beforedeactivate: this.onDeactivate
        });
    },
    
    
    onActivate: function(){
        if (this.autoResume && !this.playing) {
            this.play();
        }
    },
    
    
    onDeactivate: function(){
        if (this.autoPause && this.playing) {
            this.pause();
        }
    },

    
    play : function() {
        this.media.dom.play();
        this.playing = true;
    },

    
    pause : function() {
        this.media.dom.pause();
        this.playing = false;
    },

    
    toggle : function() {
        if(this.playing){
            this.pause();    
        }
        else {
            this.play();
        }
    }
});

Ext.reg('media', Ext.Media);

Ext.Video = Ext.extend(Ext.Media, {
    

    

    
    posterUrl: '',
    
    
    componentCls: 'x-video',

    afterRender : function() {
        Ext.Video.superclass.afterRender.call(this);
        if (this.posterUrl) {
            this.media.hide();
            this.ghost = this.el.createChild({
                cls: 'x-video-ghost',
                style: 'width: 100%; height: 100%; background: #000 url(' + this.posterUrl + ') center center no-repeat; -webkit-background-size: 100% auto;'
            });
            this.ghost.on('tap', this.onGhostTap, this, {single: true});
        }
    },
    
    onGhostTap: function(){
        this.media.show();
        this.ghost.hide();
        this.play();
    },
    
    
    getConfiguration: function(){
        return {
            tag: 'video',
            width: '100%',
            height: '100%'
        };
    }    
});

Ext.reg('video', Ext.Video);

Ext.Audio = Ext.extend(Ext.Media, {
    

    

    componentCls: 'x-audio',
    
    
    onActivate: function(){
        Ext.Audio.superclass.onActivate.call(this);
        if (Ext.is.Phone) {
            this.media.show();
        }    
    },
    
    
    onDeactivate: function(){
        Ext.Audio.superclass.onDeactivate.call(this);
        if (Ext.is.Phone) {
            this.media.hide();
        }
    },
    
    
    getConfiguration: function(){
        var hidden = !this.enableControls;
        if (!Ext.supports.AudioTag) {
            return {
                tag: 'embed',
                type: 'audio/mpeg',
                target: 'myself',
                controls: 'true',
                hidden: hidden
            };
        } else {
            return {
                tag: 'audio',
                hidden: hidden
            };
        }    
    }
});

Ext.reg('audio', Ext.Audio);

Ext.MessageBox = Ext.extend(Ext.Sheet, {
    
    centered: true,

    
    renderHidden: true,

    
    ui: 'dark',

    
    componentCls: 'x-msgbox',

    
    enterAnimation: 'pop',

    
    exitAnimation: 'pop',

    autoHeight      : true,

    
    defaultTextHeight : 75,

    constructor : function(config) {

        config = config || {};

        var ui = config.ui || this.ui || '',
            baseCls = config.componentCls || this.componentCls;

        delete config.html;

        this.titleBar = Ext.create({
            xtype : 'toolbar',
            ui    : ui,
            dock  : 'top',
            cls   : baseCls + '-title',
            title : '&#160;'
        });

        this.buttonBar = Ext.create({
            xtype : 'toolbar',
            ui    : ui,
            dock  : 'bottom',
            layout: { pack: 'center' },
            cls   : baseCls + '-buttons'
        });

        config = Ext.apply({
                    ui  : ui,
            dockedItems : [this.titleBar, this.buttonBar],
        renderSelectors : {
                           body : '.' + baseCls + '-body',
                         iconEl : '.' + baseCls + '-icon',
                   msgContentEl : '.' + baseCls + '-content',
                          msgEl : '.' + baseCls + '-text',
                       inputsEl : '.' + baseCls + '-inputs',
                        inputEl : '.' + baseCls + '-input-single',
                    multiLineEl : '.' + baseCls + '-input-textarea'
           }
         }, config || {});

        Ext.MessageBox.superclass.constructor.call(this, config);
    },

    renderTpl: [
        '<div class="{componentCls}-body"<tpl if="bodyStyle"> style="{bodyStyle}"</tpl>>',
            '<div class="{componentCls}-icon x-hidden-display"></div>',
            '<div class="{componentCls}-content">',
                '<div class="{componentCls}-text"></div>',
                '<div class="{componentCls}-inputs x-hidden-display">',
                    '<input type="text" class="{componentCls}-input {componentCls}-input-single" />',
                    '<textarea class="{componentCls}-input {componentCls}-input-textarea"></textarea>',
                '</div>',
            '</div>',
        '</div>'
    ],

    
    onClick : function(button) {
        if (button) {
            var config = button.config || {};

            if (typeof config.fn == 'function') {
                config.fn.call(
                    config.scope || null,
                    button.itemId || button.text,
                    config.input ? config.input.dom.value : null,
                    config
                );
            }

            if (config.cls) {
                    this.el.removeCls(config.cls);
                }

            if (config.input) {
                config.input.dom.blur();
            }
        }

        this.hide();
    },

    
    show : function(config) {
        var attrib,
            attrName,
            attribs = {
                autocomplete : 'off',
                autocapitalize : 'off',
                autocorrect : 'off',
                maxlength : 0,
                autofocus : true,
                placeholder : '',
                type : 'text'
            },
            assert = /true|on/i;

        this.rendered || this.render(document.body);

        config = Ext.applyIf(
            config || {}, {
                multiLine : false,
                prompt  : false,
                value   : '',
                modal   : true
            }
        );

        if (config.title) {
            this.titleBar.setTitle(config.title);
            this.titleBar.show();
        } else {
            this.titleBar.hide();
        }

        if (this.inputsEl && (config.multiLine || config.prompt)) {
            this.inputsEl.show();

            if (this.multiLineEl && config.multiLine) {
                this.inputEl && this.inputEl.hide();
                this.multiLineEl.show().setHeight(Ext.isNumber(config.multiLine) ? parseFloat(config.multiLine) : this.defaultTextHeight);
                config.input = this.multiLineEl;
            } else if (this.inputEl) {
                this.inputEl.show();
                this.multiLineEl && this.multiLineEl.hide();
                config.input = this.inputEl;
            }

            
            if (Ext.isObject(config.prompt)) {
                Ext.apply(attribs, config.prompt);
            }

            for (attrName in attribs) {
                if (attribs.hasOwnProperty(attrName)) {
                    attrib = attribs[attrName];
                    config.input.dom.setAttribute(
                        attrName.toLowerCase(),
                        /^auto/i.test(attrName) ? (assert.test(attrib+'') ? 'on' : 'off' ) : attrib
                    );
                }
            }

        } else {
            this.inputsEl && this.inputsEl.hide();
        }

        this.setIcon(config.icon || '', false);
        this.updateText(config.msg, false);

        if (config.cls) {
            this.el.addCls(config.cls);
        }

        this.modal = !!config.modal;

        var bbar = this.buttonBar,
            bs = [];

        bbar.removeAll();

        Ext.each([].concat(config.buttons || Ext.MessageBox.OK), function(button) {
            if (button) {
                bs.push(
                    Ext.applyIf({
                        config  : config,
                        scope   : this,
                        handler : this.onClick
                    }, button)
                );
            }
        }, this);

        bbar.add(bs);

        if (bbar.rendered) {
            bbar.doLayout();
        }

        Ext.MessageBox.superclass.show.call(this, config.animate);

        if (config.input) {
            config.input.dom.value = config.value || '';
            
            if (assert.test(attribs.autofocus+'') && !('autofocus' in config.input.dom)) {
                config.input.dom.focus();
            }
        }

        return this;
    },

     
    onOrientationChange : function() {
        this.doComponentLayout();

        Ext.MessageBox.superclass.onOrientationChange.apply(this, arguments);
    },

    
    adjustScale : function(){
        Ext.apply(this,{
            maxWidth : window.innerWidth,
            maxHeight : window.innerHeight,
            minWidth : window.innerWidth * .5,
            minHeight : window.innerHeight * .5
        });
    },

    
    doComponentLayout : function() {
        this.adjustScale();

        return Ext.MessageBox.superclass.doComponentLayout.apply(this, arguments);
    },

    
    alert : function(title, msg, fn, scope) {
        return this.show({
            title : title,
            msg   : msg,
            buttons: Ext.MessageBox.OK,
            fn    : fn,
            scope : scope,
            icon  : Ext.MessageBox.INFO
        });
    },

    
    confirm : function(title, msg, fn, scope) {
        return this.show({
            title : title,
            msg : msg,
            buttons: Ext.MessageBox.YESNO,
            fn: function(button) {
                fn.call(scope, button);
            },
            scope : scope,
            icon: Ext.MessageBox.QUESTION
        });
     },

    
    prompt : function(title, msg, fn, scope, multiLine, value, promptConfig) {
        return this.show({
            title : title,
            msg : msg,
            buttons: Ext.MessageBox.OKCANCEL,
            fn: function(button, inputValue) {
                fn.call(scope, button, inputValue);
            },
            scope : scope,
            icon  : Ext.MessageBox.QUESTION,
            prompt: promptConfig || true,
            multiLine: multiLine,
            value: value
        });
    },

    
    updateText : function(text, doLayout) {
        if(this.msgEl) {
            this.msgEl.update(text ? String(text) : '&#160;');
            if(doLayout !== false) {
                this.doComponentLayout();
            }
        }
        return this;
    },

    
    setIcon : function(icon, doLayout) {
        if (icon) {
            this.iconEl.show();
            this.iconEl.replaceCls(this.iconCls, icon);
        } else {
            this.iconEl.replaceCls(this.iconCls, 'x-hidden-display');
        }

        if (doLayout !== false) {
            this.doComponentLayout();
        }

        this.iconCls = icon;
        return this;
    }
});

(function(){
    var B = Ext.MessageBox;

    Ext.apply(B, {
        OK     : {text : 'OK',     itemId : 'ok',  ui : 'action' },
        CANCEL : {text : 'Cancel', itemId : 'cancel'},
        YES    : {text : 'Yes',    itemId : 'yes', ui : 'action' },
        NO     : {text : 'No',     itemId : 'no'},
        

        
        INFO     : 'x-msgbox-info',
        WARNING  : 'x-msgbox-warning',
        QUESTION : 'x-msgbox-question',
        ERROR    : 'x-msgbox-error'
    });

    Ext.apply(B, {
        OKCANCEL    : [B.CANCEL, B.OK],
        YESNOCANCEL : [B.CANCEL, B.NO, B.YES],
        YESNO       : [B.NO, B.YES]
        
    });

})();

Ext.reg('messagebox', Ext.MessageBox);


Ext.reg('msgbox', Ext.MessageBox);


Ext.Msg = new Ext.MessageBox();

Ext.form.FormPanel = Ext.extend(Ext.Panel, {
    
    standardSubmit: false,

    componentCls: 'x-form',
    
    
    url: undefined,
    
    
    baseParams : undefined,
    
    
    waitTpl: new Ext.XTemplate(
        '<div class="{cls}">{message}&hellip;</div>'
    ),
    
    
    submitOnAction : true,    

    getElConfig: function() {
        return Ext.apply(Ext.form.FormPanel.superclass.getElConfig.call(this), {
            tag: 'form'
        });
    },
    
    
    initComponent : function() {
        this.addEvents(
           
            'submit', 
           
             'beforesubmit', 
           
             'exception'
        );

        Ext.form.FormPanel.superclass.initComponent.call(this);
        
        this.on('action', this.onFieldAction, this);
    },
    
    
    afterRender : function() {
        Ext.form.FormPanel.superclass.afterRender.call(this);
        this.el.on('submit', this.onSubmit, this);
    },

    
    onSubmit : function(e, t) {
        if (!this.standardSubmit || this.fireEvent('beforesubmit', this, this.getValues(true)) === false) {
            if (e) {
                e.stopEvent();
            }       
        }
    },
    
    
    onFieldAction : function(field) {
        if (this.submitOnAction) {
            field.blur();
            this.submit();
        }
    },
    
    

    submit: function(options) {
        var form = this.el.dom || {},
            formValues

            options = Ext.apply({
               url : this.url || form.action,
               submitDisabled : false,
               method : form.method || 'post',
               autoAbort : false,
               params : null,
               waitMsg : null,
               headers : null,
               success : null,
               failure : null
            }, options || {});

            formValues = this.getValues(this.standardSubmit || !options.submitDisabled);
        
        if (this.standardSubmit) {
            if (form) {
                if (options.url && Ext.isEmpty(form.action)) {
                    form.action = options.url;
                }

                form.method = (options.method || form.method).toLowerCase();

                if (this.fireEvent('beforesubmit', this, formValues, options) !== false) {
                    form.submit();
                }
            }
            return null;
        }
        
        if (this.fireEvent('beforesubmit', this, formValues, options ) !== false) {
            if (options.waitMsg) {
                this.showMask(options.waitMsg);
            }
            
            return Ext.Ajax.request({
                url     : options.url,
                method  : options.method,
                rawData : Ext.urlEncode(Ext.apply(
                    Ext.apply({}, this.baseParams || {}),
                    options.params || {},
                    formValues
                )),
                autoAbort : options.autoAbort,
                headers  : Ext.apply(
                   {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    options.headers || {}),
                scope    : this,
                callback : function(callbackOptions, success, response) {
                    var responseText = response.responseText;
                    this.hideMask();
                        
                    if (success) {

                        response = Ext.decode(responseText);
                        success = !!response.success;

                        if (success) {
                            if (Ext.isFunction(options.success)) {
                                options.success.call(options.scope || this, this, response, responseText);
                            }

                            this.fireEvent('submit', this, response);
                            return;
                        }
                    }

                    if (Ext.isFunction(options.failure)) {
                        options.failure.call(options.scope || this, this, response, responseText);
                    }
                    
                    this.fireEvent('exception', this, response);
                }
            });
        }
    },

    
    loadRecord: function(instance) {
        if (instance && instance.data) {
            this.setValues(instance.data);
            
            
            this.record = instance;
        }
        
        return this;
    },
    
    
    loadModel: function() {
        return this.loadRecord.apply(this, arguments);
    },
    
    
    getRecord: function() {
        return this.record;
    },
    
    
    updateRecord: function(instance, enabled) {
        var fields, values, name;
        
        if(instance && (fields = instance.fields)){
            values = this.getValues(enabled);
            for (name in values) {
                if(values.hasOwnProperty(name) && fields.containsKey(name)){
                   instance.set(name, values[name]);     
                }
            }
        }
        return this;
    },
    

    
    setValues: function(values) {
         var fields = this.getFields(),
             name,
             field,
             value;
             
        values = values || {};
        
        for (name in values) {
            if (values.hasOwnProperty(name)) {
                field = fields[name];
                value = values[name];
                if (field) {
                    if (Ext.isArray(field)) {
                        field.forEach(function(field){
                            if (Ext.isArray(values[name])) {
                                field.setChecked((value.indexOf(field.getValue()) != -1));
                            } else {
                                field.setChecked((value == field.getValue()));
                            }
                        });
                    } else {  
                        if (field.setChecked) {
                            field.setChecked(value);
                        } else {
                            field.setValue(value);
                        }
                    }
                }
            }       
        }
        
        return this;
    },

    
    getValues: function(enabled) {
        var fields = this.getFields(),
            field,
            values = {},
            name;

        for (name in fields) {
            if (fields.hasOwnProperty(name)) {
                if (Ext.isArray(fields[name])) {
                    values[name] = [];

                    fields[name].forEach(function(field) {
                        if (field.isChecked() && !(enabled && field.disabled)) {
                            if (field instanceof Ext.form.Radio) {
                                values[name] = field.getValue();
                            } else {
                                values[name].push(field.getValue());
                            }
                        }
                    });
                } else {
                    field = fields[name];
                    
                    if (!(enabled && field.disabled)) {
                        if (field instanceof Ext.form.Checkbox) {
                            values[name] = (field.isChecked()) ? field.getValue() : null;
                        } else {
                            values[name] = field.getValue();
                        }
                    }
                }
            }
        }

        return values;
    },

    
    reset: function() {
        this.getFieldsAsArray().forEach(function(field) {
            field.reset();
        });

        return this;
    },

    
    enable: function() {
        this.getFieldsAsArray().forEach(function(field) {
            field.enable();
        });

        return this;
    },

    
    disable: function() {
        this.getFieldsAsArray().forEach(function(field) {
            field.disable();
        });

        return this;
    },

    getFieldsAsArray: function() {
        var fields = [];

        var getFieldsFrom = function(item) {
            if (item.isField) {
                fields.push(item);
            }

            if (item.isContainer) {
                item.items.each(getFieldsFrom);
            }
        };

        this.items.each(getFieldsFrom);

        return fields;
    },

    
    getFields: function(byName) {
        var fields = {},
            itemName;

        var getFieldsFrom = function(item) {
            if (item.isField) {
                itemName = item.getName();

                if ((byName && itemName == byName) || typeof byName == 'undefined') {
                    if (fields.hasOwnProperty(itemName)) {
                        if (!Ext.isArray(fields[itemName])) {
                            fields[itemName] = [fields[itemName]];
                        }

                        fields[itemName].push(item);
                    } else {
                        fields[itemName] = item;
                    }
                }

            }

            if (item.isContainer) {
                item.items.each(getFieldsFrom);
            }
        };

        this.items.each(getFieldsFrom);
        
        return (byName) ? (fields[byName] || []) : fields;
    },

    getFieldsFromItem: function() {

    },
    
    showMask : function(cfg, target) {
        cfg = Ext.isString(cfg) ? {message : cfg} : cfg; 
        
        if (cfg && this.waitTpl) {
            this.maskTarget = target = Ext.get(target || cfg.target) || this.el;
            target && target.mask(this.waitTpl.apply(cfg));
        }
        return this;
    },
    
    
    hideMask : function(){
        if(this.maskTarget){
            this.maskTarget.unmask();
            delete this.maskTarget;
        }
        return this;
    }
});


Ext.form.FormPanel.prototype.load = Ext.form.FormPanel.prototype.loadModel; 

Ext.reg('formpanel', Ext.form.FormPanel);


Ext.reg('form', Ext.form.FormPanel);


Ext.form.FieldSet = Ext.extend(Ext.Panel, {
    componentCls: 'x-form-fieldset',

    
    initComponent : function() {
        this.componentLayout = this.getLayout();
        Ext.form.FieldSet.superclass.initComponent.call(this);
    },
    

    

    

    
    afterLayout : function(layout) {
        Ext.form.FieldSet.superclass.afterLayout.call(this, layout);
        
        if (this.title && !this.titleEl) {
            this.setTitle(this.title);
        } else if (this.titleEl) {
            this.el.insertFirst(this.titleEl);
        }

        if (this.instructions && !this.instructionsEl) {
            this.setInstructions(this.instructions);
        } else if (this.instructionsEl) {
            this.el.appendChild(this.instructionsEl);
        }
    },
    
    
    setTitle: function(title){
        if (this.rendered) {
            if (!this.titleEl) {
                this.titleEl = this.el.insertFirst({
                    cls: this.componentCls + '-title'
                });
            }
            this.titleEl.setHTML(title);
        } else {
            this.title = title;
        }
        return this;
    },
    
    
    setInstructions: function(instructions){
        if (this.rendered) {
            if (!this.instructionsEl) {
                this.instructionsEl = this.el.createChild({
                    cls: this.componentCls + '-instructions'
                });
            }
            this.instructionsEl.setHTML(instructions);
        } else {
            this.instructions = instructions;
        }
        return this;
    }
});

Ext.reg('fieldset', Ext.form.FieldSet);

Ext.form.Field = Ext.extend(Ext.Component,  {
    
    isField: true,

    

    

    

    

    

    
    fieldCls: 'x-form-field',

    baseCls: 'x-field',

    
    inputCls: undefined,

    
    disabled: false,

    renderTpl: [
        '<tpl if="label">',
            '<div class="x-form-label"><span>{label}</span></div>',
        '</tpl>',
        '<tpl if="fieldEl">',
            '<div class="x-form-field-container"><input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls}"',
                '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
                '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
                '<tpl if="style">style="{style}" </tpl>',
                '<tpl if="maxlength">maxlength="{maxlength}" </tpl>',
                '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
                '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
                '<tpl if="autoCorrect">autocorrect="{autoCorrect}" </tpl> />',
            '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
            '</div>',
            '<tpl if="useClearIcon"><div class="x-field-clear-container"><div class="x-field-clear x-hidden-visibility">&#215;</div></div></tpl>',
        '</tpl>'
    ],

    
    isFormField: true,

    
    autoCreateField: true,

    
    inputType: 'text',
    
    
    label: null,

    
    labelWidth: '30%',

    
    labelAlign: 'left',

    
    required: false,

    
    useMask: false,

    
    initComponent: function() {

        Ext.form.Field.superclass.initComponent.call(this);
    },

    
    getName: function() {
        return this.name || this.id || '';
    },

    
    applyRenderSelectors: function() {
        this.renderSelectors = Ext.applyIf(this.renderSelectors || {}, {
            mask: '.x-field-mask',
            labelEl: '.x-form-label',
            fieldEl: '.' + Ext.util.Format.trim(this.renderData.fieldCls).replace(/ /g, '.')
        });

        Ext.form.Field.superclass.applyRenderSelectors.call(this);
    },

    
    initRenderData: function() {
        Ext.form.Field.superclass.initRenderData.apply(this, arguments);
        
        Ext.applyIf(this.renderData, {
            disabled        :   this.disabled,
            fieldCls        :   'x-input-' + this.inputType + (this.inputCls ? ' ' + this.inputCls: ''),
            fieldEl         :   !this.fieldEl && this.autoCreateField,
            inputId         :   Ext.id(),
            label           :    this.label,
            labelAlign      :   'x-label-align-' + this.labelAlign,
            name            :   this.getName(),
            required        :   this.required,
            style           :   this.style,
            tabIndex        :   this.tabIndex,
            inputType       :   this.inputType,
            useMask         :   this.useMask
        });
        
        return this.renderData;
    },

    
    initEvents: function() {
        Ext.form.Field.superclass.initEvents.apply(this, arguments);
        
        if (this.fieldEl) {
            if (this.useMask && this.mask) {
                this.mon(this.mask, {
                    click: this.onMaskTap,
                    scope: this
                });
            }
        }
    },

    
    onRender: function() {
        Ext.form.Field.superclass.onRender.apply(this, arguments);
        
        var cls = [];
        
        if (this.required) {
            cls.push('x-field-required');
        }
        if (this.label) {
            cls.push('x-label-align-' + this.labelAlign);
        }

        this.el.addCls(cls);
    },

    
    afterRender: function() {
        Ext.form.Field.superclass.afterRender.apply(this, arguments);

        if (this.label) {
            this.setLabelWidth(this.labelWidth);
        }

        this.initValue();
    },

    isDisabled: function() {
        return this.disabled;
    },

    
    onEnable: function() {
        this.fieldEl.dom.disabled = false;
    },

    
    onDisable: function() {
        this.fieldEl.dom.disabled = true;
    },

    
    initValue: function() {
        this.setValue(this.value || '', true);

        
        this.originalValue = this.getValue();
    },

    
    isDirty: function() {
        if (this.disabled || !this.rendered) {
            return false;
        }
        
        return String(this.getValue()) !== String(this.originalValue);
    },

    
    onMaskTap: function(e) {
        if (this.disabled) {
            return false;
        }








        return true;
    },

    
    showMask: function(e) {
        if (this.mask) {
            this.mask.setStyle('display', 'block');
        }
    },

    hideMask: function(e) {
        if (this.mask) {
            this.mask.setStyle('display', 'none');
        }
    },
    
    
    reset: function() {
        this.setValue(this.originalValue);
    },

    
    getValue: function(){
        if (!this.rendered || !this.fieldEl) {
            return this.value;
        }
        
        return this.fieldEl.getValue();
    },

    
    setValue: function(value){
        this.value = value;

        if (this.rendered && this.fieldEl) {
            this.fieldEl.dom.value = (Ext.isEmpty(value) ? '' : value);
        }

        return this;
    },

    
    setLabelWidth: function(width) {
        if (this.labelEl) {
            this.labelEl.setWidth(width);
        }

        return this;
    }
});

Ext.reg('field', Ext.form.Field);


Ext.form.Slider = Ext.extend(Ext.form.Field, {
    ui: 'slider',
    

    
    inputCls: 'x-slider',

    inputType: 'slider',

    
    minValue: 0,

    
    maxValue: 100,

    
    animationDuration: 200,

    
    value: 0,

    
    trackWidth: null,

    monitorOrientation: true,

    renderTpl: [
        '<tpl if="label">',
            '<div class="x-form-label"><span>{label}</span></div>',
        '</tpl>',
        '<tpl if="fieldEl">',
            '<div id="{inputId}" name="{name}" class="{fieldCls}"',
            '<tpl if="tabIndex">tabIndex="{tabIndex}"</tpl>',
            '<tpl if="style">style="{style}" </tpl>',
        '/></tpl>'
    ],

    
    increment: 1,


    

    

    
    constructor: function(config) {
        this.addEvents(
            
            'beforechange',

            
            'change',
            
            'drag',
            
            'dragend'
        );

        Ext.form.Slider.superclass.constructor.call(this, config);
    },

    
    initComponent: function() {
        this.tabIndex = -1;

        if (this.increment == 0) {
            this.increment = 1;
        }

        this.increment = Math.abs(this.increment);

        
        
        this.values = [this.value];

        Ext.form.Slider.superclass.initComponent.apply(this, arguments);

        if (this.thumbs == undefined) {
            var thumbs = [],
                values = this.values,
                length = values.length,
                i,
                Thumb = this.getThumbClass();

            for (i = 0; i < length; i++) {
                thumbs[thumbs.length] = new Thumb({
                    value: values[i],
                    slider: this,

                    listeners: {
                        scope  : this,
                        drag   : this.onDrag,
                        dragend: this.onThumbDragEnd
                    }
                });
            }

            this.thumbs = thumbs;
        }
    },

    
    initValue: function() {
        var thumb = this.getThumb();

        if (thumb.dragObj) {
            thumb.dragObj.updateBoundary();
        }

        Ext.form.Slider.superclass.initValue.apply(this, arguments);
    },

    onOrientationChange: function() {
        Ext.form.Slider.superclass.onOrientationChange.apply(this, arguments);

        var me = this,
            thumb = this.getThumb();

        if (thumb.dragObj) {
            setTimeout(function() {
                thumb.dragObj.updateBoundary();
                me.moveThumb(thumb, me.getPixelValue(thumb.getValue(), thumb), 0);
            }, 100);
        }
    },

    getThumbClass: function() {
        return Ext.form.Slider.Thumb;
    },

    
    setValue: function(value, animationDuration, moveThumb) {
        if (typeof moveThumb == 'undefined') {
            moveThumb = true;
        }

        moveThumb = !!moveThumb;

        
        var thumb    = this.getThumb(),
            oldValue = thumb.getValue(),
            newValue = this.constrain(value);

        if (this.fireEvent('beforechange', this, thumb, newValue, oldValue) !== false) {
            if (moveThumb) {
                this.moveThumb(thumb, this.getPixelValue(newValue, thumb), animationDuration);
            }

            thumb.setValue(newValue);
            this.doComponentLayout();

            this.fireEvent('change', this, thumb, newValue, oldValue);
        }

        return this;
    },

    
    constrain: function(value) {
        var remainder = value % this.increment;

        value -= remainder;

        if (Math.abs(remainder) >= (this.increment / 2)) {
            value += (remainder > 0) ? this.increment : -this.increment;
        }

        value = Math.max(this.minValue, value);
        value = Math.min(this.maxValue, value);

        return value;
    },

    
    getValue: function() {
        
        return this.getThumb().getValue();
    },

    
    getThumb: function() {
        
        
        return this.thumbs[0];
    },

    
    getSliderValue: function(pixelValue, thumb) {
        var trackWidth = thumb.dragObj.offsetBoundary.right,
            range = this.maxValue - this.minValue,
            ratio;

        this.trackWidth = (trackWidth > 0) ? trackWidth : this.trackWidth;
        ratio = range / this.trackWidth;

        return this.minValue + (ratio * (pixelValue));
    },

    
    getPixelValue: function(value, thumb) {
        var trackWidth = thumb.dragObj.offsetBoundary.right,
            range = this.maxValue - this.minValue,
            ratio;

        this.trackWidth = (trackWidth > 0) ? trackWidth : this.trackWidth;
        ratio = this.trackWidth / range;

        return (ratio * (value - this.minValue));
    },

    
    renderThumbs: function() {
        var thumbs = this.thumbs,
            length = thumbs.length,
            i;

        for (i = 0; i < length; i++) {
            thumbs[i].render(this.fieldEl);
        }
    },

    
    onThumbDragEnd: function(draggable) {
        var value = this.getThumbValue(draggable);

        this.setValue(value);
        this.fireEvent('dragend', this, draggable.thumb, this.constrain(value));
    },

    
    getThumbValue: function(draggable) {
        var thumb = draggable.thumb;

        return this.getSliderValue(-draggable.getOffset().x, thumb);
    },

    
    onDrag: function(draggable){
        var value = this.getThumbValue(draggable);
        this.fireEvent('drag', this, draggable.thumb, this.constrain(value));
    },

    
    onTap: function(e) {
        if (!this.disabled) {
            var sliderBox = this.fieldEl.getPageBox(),
                leftOffset = e.pageX - sliderBox.left,
                thumb = this.getNearest(leftOffset),
                halfThumbWidth = thumb.dragObj.size.width / 2;

            this.setValue(this.getSliderValue(leftOffset - halfThumbWidth, thumb), this.animationDuration, true);
        }
    },

    
    moveThumb: function(thumb, pixel, animationDuration) {
        thumb.dragObj.setOffset(new Ext.util.Offset(pixel, 0), animationDuration);
    },

    
    afterRender: function(ct) {
        var me = this;

        me.renderThumbs();

        Ext.form.Slider.superclass.afterRender.apply(me, arguments);

        me.fieldEl.on({
            scope: me,
            tap  : me.onTap
        });
    },

    
    getNearest: function(value) {
        
        return this.thumbs[0];
    },

    
    setThumbsDisabled: function(disable) {
        var thumbs = this.thumbs,
            ln     = thumbs.length,
            i      = 0;

        for (; i < ln; i++) {
            thumbs[i].dragObj[disable ? 'disable' : 'enable']();
        }
    },

    
    disable: function() {
        Ext.form.Slider.superclass.disable.call(this);
        this.setThumbsDisabled(true);
    },

    
    enable: function() {
        Ext.form.Slider.superclass.enable.call(this);
        this.setThumbsDisabled(false);
    }
});

Ext.reg('sliderfield', Ext.form.Slider);


Ext.form.Slider.Thumb = Ext.extend(Ext.form.Field, {
    isField: false,
    baseCls: 'x-thumb',
    autoCreateField: false,
    draggable: true,

    
    value: 0,

    

    
    onRender: function() {
        this.draggable = {
            direction: 'horizontal',
            constrain: this.slider.fieldEl,
            revert: false,
            thumb: this
        };

        Ext.form.Slider.Thumb.superclass.onRender.apply(this, arguments);
    },

    
    setValue: function(newValue) {
        this.value = newValue;

        return this;
    },

    
    getValue: function() {
        return this.value;
    }
});

Ext.reg('sliderthumb', Ext.form.Slider.Thumb);



Ext.form.Toggle = Ext.extend(Ext.form.Slider, {
    minValue: 0,

    maxValue: 1,

    ui: 'toggle',
    
    inputType: 'toggle',

    

    
    minValueCls: 'x-toggle-off',

    
    maxValueCls: 'x-toggle-on',

    
    animationDuration: 70,
    
    
    toggle: function() {
        var thumb = this.thumbs[0],
            value = thumb.getValue();

        this.setValue(value == this.minValue ? this.maxValue : this.minValue, this.animationDuration);
    },

    
    setValue: function(value) {
        Ext.form.Toggle.superclass.setValue.call(this, value, this.animationDuration);

        var fieldEl = this.fieldEl;
        
        if (this.constrain(value) === this.minValue) {
            fieldEl.addCls(this.minValueCls);
            fieldEl.removeCls(this.maxValueCls);
        }
        else {
            fieldEl.addCls(this.maxValueCls);
            fieldEl.removeCls(this.minValueCls);
        }
    },

    
    onTap: function() {
        if (!this.disabled) {
            this.toggle();
        }
    },

    getThumbClass: function() {
        return Ext.form.Toggle.Thumb;
    }
});

Ext.reg('togglefield', Ext.form.Toggle);



Ext.form.Toggle.Thumb = Ext.extend(Ext.form.Slider.Thumb, {
    onRender: function() {
        Ext.form.Toggle.Thumb.superclass.onRender.apply(this, arguments);
        Ext.DomHelper.append(this.el, [{
            cls: 'x-toggle-thumb-off',
            html: '<span>OFF</span>'
        },{
            cls: 'x-toggle-thumb-on',
            html: '<span>ON</span>'
        },{
            cls: 'x-toggle-thumb-thumb'
        }]);
    }
});

Ext.form.Text = Ext.extend(Ext.form.Field, {
    ui: 'text',

    
    focusCls: 'x-field-focus',

    
    maxLength: 0,

    
    placeHolder: undefined,

    
    autoComplete: undefined,

    
    autoCapitalize: undefined,

    
    autoCorrect: undefined,

    

    
    isFocused: false,

    
    isClearIconVisible: false,

    useMask: Ext.is.iOS,

    initComponent: function() {
        this.addEvents(
            
            'focus',
            
            'blur',
            
            'keyup',
            
            'change',
            
            'action'
        );
        
        this.enableBubble('action');

        Ext.form.Text.superclass.initComponent.apply(this, arguments);
    },

    applyRenderSelectors: function() {
        this.renderSelectors = Ext.applyIf(this.renderSelectors || {}, {
            clearIconEl: '.x-field-clear',
            clearIconContainerEl: '.x-field-clear-container'
        });
        
        Ext.form.Text.superclass.applyRenderSelectors.call(this);
    },

    initRenderData: function() {
        var renderData     = Ext.form.Text.superclass.initRenderData.call(this),
            autoComplete   = this.autoComplete,
            autoCapitalize = this.autoCapitalize,
            autoCorrect    = this.autoCorrect;

        Ext.applyIf(renderData, {
            placeHolder : this.placeHolder,
            maxlength   : this.maxLength,
            useClearIcon   : this.useClearIcon
        });

        var testArray = [true, 'on'];

        if (autoComplete !== undefined) {
            renderData.autoComplete = (testArray.indexOf(autoComplete) !== -1)  ? 'on': 'off';
        }

        if (autoCapitalize !== undefined) {
            renderData.autoCapitalize = (testArray.indexOf(autoCapitalize) !== -1) ? 'on': 'off';
        }

        if (autoCorrect !== undefined) {
            renderData.autoCorrect = (testArray.indexOf(autoCorrect) !== -1) ? 'on': 'off';
        }

        this.renderData = renderData;
        
        return renderData;
    },

    initEvents: function() {
        Ext.form.Text.superclass.initEvents.call(this);

        if (this.fieldEl) {
            this.mon(this.fieldEl, {
                focus: this.onFocus,
                blur: this.onBlur,
                keyup: this.onKeyUp,
                paste: this.updateClearIconVisibility,
                mousedown: this.onBeforeFocus,
                scope: this
            });

            if (this.clearIconEl){
                this.mon(this.clearIconContainerEl, {
                    scope: this,
                    tap: this.onClearIconTap
                });
            }
        }
    },

    
    onEnable: function() {
        Ext.form.Text.superclass.onEnable.apply(this, arguments);

        this.disabled = false;
        
        this.updateClearIconVisibility();
    },

    
    onDisable: function() {
        Ext.form.Text.superclass.onDisable.apply(this, arguments);

        this.blur();
        
        this.hideClearIcon();
    },

    
    onClearIconTap: function() {
        if (!this.disabled) {
            this.setValue('');
        }
    },

    
    updateClearIconVisibility: function() {
        var value = this.getValue();

        if (!value) {
            value = '';
        }
        
        if (value.length < 1){
            this.hideClearIcon();
        }
        else {
            this.showClearIcon();
        }

        return this;
    },

    
    showClearIcon: function() {
        if (!this.disabled && this.fieldEl && this.clearIconEl && !this.isClearIconVisible) {
            this.isClearIconVisible = true;
            this.fieldEl.addCls('x-field-clearable');
            this.clearIconEl.removeCls('x-hidden-visibility');
        }

        return this;
    },

    
    hideClearIcon: function() {
        if (this.fieldEl && this.clearIconEl && this.isClearIconVisible) {
            this.isClearIconVisible = false;
            this.fieldEl.removeCls('x-field-clearable');
            this.clearIconEl.addCls('x-hidden-visibility');
        }

        return this;
    },

    
    afterRender: function() {
        Ext.form.Text.superclass.afterRender.call(this);
        this.updateClearIconVisibility();
    },
    
    onBeforeFocus: function(e) {
        this.fireEvent('beforefocus', e);
    },

    
    beforeFocus: Ext.emptyFn,

    
    onMaskTap: function(e) {
        if (Ext.form.Text.superclass.onMaskTap.apply(this, arguments) !== true) {
            return false;
        }
        
        this.maskCorrectionTimer = Ext.defer(this.showMask, 1000, this);
        this.hideMask();
    },

    
    onFocus: function(e) {
        if (this.mask) {
            if (this.maskCorrectionTimer) {
                clearTimeout(this.maskCorrectionTimer);
            }
            
            this.hideMask();
        }

        this.beforeFocus();

        if (this.focusCls) {
            this.el.addCls(this.focusCls);
        }

        if (!this.isFocused) {
            this.isFocused = true;
            
            this.startValue = this.getValue();
            this.fireEvent('focus', this, e);
        }

        Ext.currentlyFocusedField = this;
    },

    
    beforeBlur: Ext.emptyFn,

    
    onBlur: function(e) {
        this.beforeBlur();

        if (this.focusCls) {
            this.el.removeCls(this.focusCls);
        }

        this.isFocused = false;

        var value = this.getValue();

        if (String(value) != String(this.startValue)){
            this.fireEvent('change', this, value, this.startValue);
        }

        this.fireEvent('blur', this, e);

        this.updateClearIconVisibility();

        this.showMask();

        this.afterBlur();

        Ext.currentlyFocusedField = null;
    },

    
    afterBlur: Ext.emptyFn,

    
    focus: function(){
        if (this.rendered && this.fieldEl && this.fieldEl.dom.focus) {
            this.fieldEl.dom.focus();
        }

        return this;
    },

    
    blur: function(){
        if(this.rendered && this.fieldEl && this.fieldEl.dom.blur) {
            this.fieldEl.dom.blur();
        }
        return this;
    },

    
    setValue: function() {
        Ext.form.Text.superclass.setValue.apply(this, arguments);

        this.updateClearIconVisibility();
    },

    
    onKeyUp: function(e) {
        this.updateClearIconVisibility();
        
        this.fireEvent('keyup', this, e);

        if (e.browserEvent.keyCode === 13) {
            this.blur();
            this.fireEvent('action', this, e);
        }
    }
});

Ext.reg('textfield', Ext.form.Text);


Ext.form.TextField = Ext.extend(Ext.form.Text, {
    constructor: function() {
        console.warn("Ext.form.TextField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Text instead");
        Ext.form.TextField.superclass.constructor.apply(this, arguments);
    }
});


Ext.form.Password = Ext.extend(Ext.form.Text, {
    inputType: 'password',
    autoCapitalize : false
});

Ext.reg('passwordfield', Ext.form.Password);


Ext.form.Email = Ext.extend(Ext.form.Text, {
    inputType: 'email',
    
    autoCapitalize: false
});

Ext.reg('emailfield', Ext.form.Email);


Ext.form.Url = Ext.extend(Ext.form.Text, {
    inputType: 'url',
    
    autoCapitalize: false
});

Ext.reg('urlfield', Ext.form.Url);


Ext.form.Search = Ext.extend(Ext.form.Text, {
    inputType: 'search'
    
});

Ext.reg('searchfield', Ext.form.Search);


Ext.form.Number = Ext.extend(Ext.form.Text, {
    ui: 'number',

    inputType: 'number',
    
    minValue : undefined,
    
    maxValue : undefined,
    
    stepValue : undefined,

    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl"><div class="x-form-field-container">',
            '<input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls}"',
                '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
                '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
                '<tpl if="style">style="{style}" </tpl>',
                '<tpl if="minValue != undefined">min="{minValue}" </tpl>',
                '<tpl if="maxValue != undefined">max="{maxValue}" </tpl>',
                '<tpl if="stepValue != undefined">step="{stepValue}" </tpl>',
                '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
                '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
                '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>',
            '/>',
            '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
            '</div></tpl>',
        '<tpl if="useClearIcon"><div class="x-field-clear-container"><div class="x-field-clear x-hidden-visibility">&#215;</div><div></tpl>'
    ],
    
    
    onRender : function() {
        Ext.apply(this.renderData, {
            maxValue : this.maxValue,
            minValue : this.minValue,
            stepValue : this.stepValue 
        });
        
        Ext.form.Number.superclass.onRender.apply(this, arguments);
    }
});

Ext.reg('numberfield', Ext.form.Number);



Ext.form.Spinner = Ext.extend(Ext.form.Number, {

    
    componentCls: 'x-spinner',
    
    
    minValue: Number.NEGATIVE_INFINITY,
    
    maxValue: Number.MAX_VALUE,
    
    incrementValue: 1,
    
    accelerateOnTapHold: true,

    
    defaultValue: 0,

    
    cycle: false,
    
    
    disableInput: false,

    
    useClearIcon: false,

    
    autoCapitalize: false,

    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl">',
            '<div class="{componentCls}-body">',
                '<div class="{componentCls}-down"><span>-</span></div>',
                '<div class="x-form-field-container">',
                    '<input id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"',
                        '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
                        '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
                        '<tpl if="style">style="{style}" </tpl>',
                        '<tpl if="minValue != undefined">min="{minValue}" </tpl>',
                        '<tpl if="maxValue != undefined">max="{maxValue}" </tpl>',
                        '<tpl if="stepValue != undefined">step="{stepValue}" </tpl>',
                        '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
                        '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>',
                    '/>',
                    '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
                '</div>',
                '<div class="{componentCls}-up"><span>+</span></div>',
            '</div>',
        '</tpl>'
    ],
    
    initComponent: function() {
        
        this.addEvents(
            
            'spin',
            
            'spindown',
            
            'spinup'
        );

        Ext.form.Spinner.superclass.initComponent.call(this);    
    },

    
    onRender: function() {
        this.renderData.disableInput = this.disableInput;

        Ext.applyIf(this.renderSelectors, {
            spinUpEl: '.x-spinner-up',
            spinDownEl: '.x-spinner-down'
        });

        Ext.form.Spinner.superclass.onRender.apply(this, arguments);
        
        this.downRepeater = this.createRepeater(this.spinDownEl, this.onSpinDown);
        this.upRepeater = this.createRepeater(this.spinUpEl, this.onSpinUp);
    },

    initValue: function() {
        if (isNaN(this.defaultValue)) {
            this.defaultValue = 0;
        }

        if (!this.value) {
            this.value = this.defaultValue;
        }

        Ext.form.Spinner.superclass.initValue.apply(this, arguments);
    },
    
    
    createRepeater: function(el, fn){
        var repeat = new Ext.util.TapRepeater(el, {
            accelerate: this.accelerateOnTapHold
        });

        this.mon(repeat, {
            tap: fn,
            touchstart: this.onTouchStart,
            touchend: this.onTouchEnd,
            preventDefault: true,
            scope: this
        });
        
        return repeat;
    },

    
    onSpinDown: function() {
        if (!this.disabled) {
            this.spin(true);
        }
    },

    
    onSpinUp: function() {
        if (!this.disabled) {
            this.spin(false);
        }
    },

    onKeyUp: function(e) {








        Ext.form.Spinner.superclass.onKeyUp.apply(this, arguments);
    },

    
    onTouchStart: function(btn) {
        if (!this.disabled) {
            btn.el.addCls('x-button-pressed');
        }
    },

    
    onTouchEnd: function(btn) {
        btn.el.removeCls('x-button-pressed');
    },

    setValue: function(value) {
        value = parseFloat(value);

        if (isNaN(value)) {
            value = this.defaultValue;
        }

        Ext.form.Spinner.superclass.setValue.call(this, value);
    },

    
    spin: function(down) {
        var value = parseFloat(this.getValue()),
            increment = this.incrementValue,
            cycle = this.cycle,
            min = this.minValue,
            max = this.maxValue,
            direction = down ? 'down': 'up';

        if (down){
            value -= increment;
        }
        else{
            value += increment;
        }

        value = (isNaN(value)) ? this.defaultValue: value;

        if (value < min) {
            value = cycle ? max: min;
        }
        else if (value > max) {
            value = cycle ? min: max;
        }

        this.setValue(value);

        this.fireEvent('spin' + direction, this, value);
        this.fireEvent('spin', this, value, direction);
    },

    
    destroy: function() {
        Ext.destroy(this.downRepeater, this.upRepeater);
        Ext.form.Spinner.superclass.destroy.call(this, arguments);
    }
});

Ext.reg('spinnerfield', Ext.form.Spinner);


Ext.form.Hidden = Ext.extend(Ext.form.Field, {
    ui: 'hidden',
    
    inputType: 'hidden',

    tabIndex: -1
});

Ext.reg('hiddenfield', Ext.form.Hidden);



Ext.form.HiddenField = Ext.extend(Ext.form.Hidden, {

    constructor: function() {
        console.warn("Ext.form.HiddenField has been deprecated and will be removed in Sencha Touch 1.0. Please use Ext.form.Hidden instead");
        Ext.form.HiddenField.superclass.constructor.apply(this, arguments);
    }
});


Ext.form.Checkbox = Ext.extend(Ext.form.Field, {
    ui: 'checkbox',
    
    inputType: 'checkbox',

    
    checked: false,
    
    
    value: '',

    
    constructor: function(config) {
        this.addEvents(
            
            'check',

            
            'uncheck'
        );

        Ext.form.Checkbox.superclass.constructor.call(this, config);
    },
    
    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl"><input id="{inputId}" type="{inputType}" name="{name}" class="{fieldCls}" tabIndex="-1" ',
            '<tpl if="checked"> checked </tpl>',
            '<tpl if="style">style="{style}" </tpl> value="{inputValue}" />',
        '</tpl>'
    ],

    
    onRender: function() {
        var isChecked = this.getBooleanIsChecked(this.checked);

        Ext.apply(this.renderData, {
            inputValue  : String(this.value),
            checked     : isChecked
        });

        Ext.form.Checkbox.superclass.onRender.apply(this, arguments);

        if (this.fieldEl) {
            this.mon(this.fieldEl, {
                click: this.onChange,
                scope: this
            });

            this.setChecked(isChecked);
            this.originalState = this.isChecked();
        }
    },
    
    
    onChange: function(e) {
        if (e) {
            if (e.browserEvent) {
                e = e.browserEvent;
            }

            if (Ext.supports.Touch && !e.isSimulated) {
                e.preventDefault();
                e.stopPropagation();
                return;
            }
        }
        
        if (this.isChecked()) {
            this.fireEvent('check', this);
        } else {
            this.fireEvent('uncheck', this);
        }
    },

    
    isChecked: function() {
        if (this.rendered) {
            return this.fieldEl.dom.checked || false;
        } else {
            return !!this.checked;
        }
    },

    
    setChecked: function(checked) {
        var newState = this.getBooleanIsChecked(checked),
            rendered = this.rendered,
            currentState,
            field;
    
        if (rendered) {
            field = this.fieldEl.dom;
            currentState = field.checked;
        } else {
            currentState = !!this.checked;
        }

        if (currentState != newState) {
            if (rendered) {
                field.checked = newState;
            } else {
                this.checked = newState;
            }
            this.onChange();
        }
        return this;
    },

    
    check: function() {
        return this.setChecked(true);
    },

    
    uncheck: function() {
        return this.setChecked(false);
    },

    
    reset: function() {
        Ext.form.Checkbox.superclass.reset.apply(this, arguments);
        
        this.setChecked(this.originalState);

        return this;
    },

    //@private

    getBooleanIsChecked: function(value) {
        return /^(true|1|on)/i.test(String(value));
    },

    getSameGroupFields: function() {
        var parent = this.el.up('form'),
            formComponent = Ext.getCmp(parent.id),
            fields = [];

        if (formComponent) {
            fields = formComponent.getFields(this.getName());
        }

        return fields;
    },

    
    getGroupValues: function() {
        var values = [];

        this.getSameGroupFields().forEach(function(field) {
            if (field.isChecked()) {
                values.push(field.getValue());
            }
        });

        return values;
    },

    
    setGroupValues: function(values) {
        this.getSameGroupFields().forEach(function(field) {
            field.setChecked((values.indexOf(field.getValue()) !== -1));
        });
        
        return this;
    },

    
    setValue: function(value) {
        value = String(value);

        Ext.form.Checkbox.superclass.setValue.call(this, value);
    }
});

Ext.reg('checkboxfield', Ext.form.Checkbox);


Ext.form.Radio = Ext.extend(Ext.form.Checkbox, {
    inputType: 'radio',
    
    ui: 'radio',
    
    

    
    getGroupValue: function() {
        var field,
            fields = this.getSameGroupFields();

        for (var i=0; i<fields.length; i++) {
            field = fields[i];

            if (field.isChecked()) {
                return field.getValue();
            }
        }

        return null;
    },

    
    setGroupValue: function(value) {
        var field,
            fields = this.getSameGroupFields(),
            i = 0,
            len = fields.length;

        for (; i < len; i++) {
            field = fields[i];

            if (field.getValue() == value) {
                field.check();
                return;
            }
        }
    }
});

Ext.reg('radiofield', Ext.form.Radio);


Ext.form.Select = Ext.extend(Ext.form.Text, {
    ui: 'select',
    

    
    valueField: 'value',

    
    displayField: 'text',

    

    
    
    
    
    
    tabIndex: -1,

    
    useMask: true,

    monitorOrientation: true,
    
    
    initComponent: function() {
        var options = this.options;

        if (this.store) {
            this.store = Ext.StoreMgr.lookup(this.store);
        }
        else {
            this.store = new Ext.data.Store({
                fields: [this.valueField, this.displayField]
            });

            if (options && Ext.isArray(options) && options.length > 0) {
                this.setOptions(this.options);
            }
        }

        Ext.form.Select.superclass.initComponent.call(this);

        this.addEvents(
            
            'change'
        );
    },

    
    onRender: function(){
        Ext.form.Select.superclass.onRender.apply(this, arguments);
        
        var name = this.hiddenName;
        if (name) {
            this.hiddenField = this.el.insertSibling({
                name: name,
                tag: 'input',
                type: 'hidden'
            }, 'after');
        }    
    },

    
    getPicker: function() {
        if (!this.picker) {
            this.picker = new Ext.Picker({
                slots: [{
                    align       : 'center',
                    name        : this.name,
                    valueField  : this.valueField,
                    displayField: this.displayField,
                    value       : this.getValue(),
                    store       : this.store
                }],
                listeners: {
                    change: this.onPickerChange,
                    scope: this
                }
            });
        }

        return this.picker;
    },

    
    getListPanel: function() {
        if (!this.listPanel) {
            this.listPanel = new Ext.Panel({
                floating         : true,
                stopMaskTapEvent : false,
                hideOnMaskTap    : true,
                cls              : 'x-select-overlay',
                scroll           : 'vertical',
                items: {
                    xtype: 'list',
                    store: this.store,
                    itemId: 'list',
                    scroll: false,
                    itemTpl : [
                        '<span class="x-list-label">{' + this.displayField + '}</span>',
                        '<span class="x-list-selected"></span>'
                    ],
                    listeners: {
                        select : this.onListSelect,
                        scope  : this
                    }
                }
            });
        }

        return this.listPanel;
    },

    
    onOrientationChange: function() {
        if (this.listPanel && !this.listPanel.hidden && !Ext.is.Phone) {
            this.listPanel.showBy(this.el, false, false);
        }
    },

    
    onMaskTap: function() {
        if (this.disabled) {
            return;
        }
        
        this.showComponent();
    },

    
    showComponent: function() {
        if (Ext.is.Phone) {
            this.getPicker().show();
        }
        else {
            var listPanel = this.getListPanel(),
                index = this.store.findExact(this.valueField, this.value);

            listPanel.showBy(this.el, 'fade', false);
            listPanel.down('#list').getSelectionModel().select(index != -1 ? index: 0, false, true);
        }
    },

    
    onListSelect: function(selModel, selected) {
        if (selected) {
            this.setValue(selected.get(this.valueField));
            this.fireEvent('change', this, this.getValue());
        }
        
        this.listPanel.hide({
            type: 'fade',
            out: true,
            scope: this
        });
    },

    
    onPickerChange: function(picker, value) {
        var currentValue = this.getValue(),
            newValue = value[this.name];

        if (newValue != currentValue) {
            this.setValue(newValue);
            this.fireEvent('change', this, newValue);
        }
    },

    
    setValue: function(value) {
        var idx = 0,
            hiddenField = this.hiddenField,
            record;

        if (value) {
            idx = this.store.findExact(this.valueField, value)
        } 
        record = this.store.getAt(idx);

        if (record && this.rendered) {
            this.fieldEl.dom.value = record.get(this.displayField);
            this.value = record.get(this.valueField);
            if (hiddenField) {
                hiddenField.dom.value = this.value;
            }
        } else {
            if (this.rendered) {
                this.fieldEl.dom.value = value;
            }
            this.value = value;
        }

        
        if (this.picker) {
            var pickerValue = {};
            pickerValue[this.name] = this.value;
            this.picker.setValue(pickerValue);
        }
        
        return this;
    },

    
    getValue: function(){
        return this.value;
    },

    
    setOptions: function(options, append) {
        if (!options) {
            this.store.clearData();
            this.setValue(null);
        }
        else {
            this.store.loadData(options, append);
        }
    },

    destroy: function() {
        Ext.form.Select.superclass.destroy.apply(this, arguments);
        Ext.destroy(this.listPanel, this.picker, this.hiddenField);
    }
});

Ext.reg('selectfield', Ext.form.Select);


Ext.form.TextArea = Ext.extend(Ext.form.Text, {
    ui: 'textarea',

    
    maxRows: undefined,
    
    autoCapitalize: false,

    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl"><div class="x-form-field-container">',
            '<textarea id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"',
            '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
            '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
            '<tpl if="style">style="{style}" </tpl>',
            '<tpl if="maxRows != undefined">rows="{maxRows}" </tpl>',
            '<tpl if="maxlength">maxlength="{maxlength}" </tpl>',
            '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
            '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
            '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>',
            '></textarea>',
            '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
        '</div></tpl>'
    ],
    
    
    onRender: function() {
        this.renderData.maxRows = this.maxRows;
        
        Ext.form.TextArea.superclass.onRender.apply(this, arguments);
    },

    onKeyUp: function(e) {
        this.fireEvent('keyup', this, e);
    }
});

Ext.reg('textareafield', Ext.form.TextArea);



Ext.form.DatePicker = Ext.extend(Ext.form.Field, {
    ui: 'select',
    
    
    picker: null,

    

    
    destroyPickerOnHide: false,

    

    
    
    
    initComponent: function() {
        this.addEvents(
            
            'change'
        );

        this.tabIndex = -1;
        this.useMask = true;

        Ext.form.Text.superclass.initComponent.apply(this, arguments);
    },

    
    getDatePicker: function() {
        if (!this.datePicker) {
            if (this.picker instanceof Ext.DatePicker) {
                this.datePicker = this.picker;
            } else {
                this.datePicker = new Ext.DatePicker(Ext.apply(this.picker || {}));
            }

            this.datePicker.setValue(this.value || null);

            this.datePicker.on({
                scope : this,
                change: this.onPickerChange,
                hide  : this.onPickerHide
            });
        }

        return this.datePicker;
    },

    
    onMaskTap: function() {
        if (Ext.form.DatePicker.superclass.onMaskTap.apply(this, arguments) !== true) {
            return false;
        }
        
        this.getDatePicker().show();
    },
    
    
    onPickerChange : function(picker, value) {
        this.setValue(value);
        this.fireEvent('change', this, this.getValue());
    },
    
    
    onPickerHide: function() {
        if (this.destroyPickerOnHide && this.datePicker) {
            this.datePicker.destroy();
        }
    },

    
    setValue: function(value, animated) {
        if (this.datePicker) {
            this.datePicker.setValue(value, animated);
            this.value = (value != null) ? this.datePicker.getValue() : null;
        } else {
            if (!Ext.isDate(value) && !Ext.isObject(value)) {
                value = null;
            }

            if (Ext.isObject(value)) {
                this.value = new Date(value.year, value.month-1, value.day);
            } else {
                this.value = value;
            }
        }

        if (this.rendered) {
            this.fieldEl.dom.value = this.getValue(true);
        }
        
        return this;
    },
    
    
    getValue: function(format) {
        var value = this.value || null;
        return (format && Ext.isDate(value)) ? value.format(Ext.util.Format.defaultDateFormat) : value;
    },
    
    
    onDestroy: function() {
        if (this.datePicker) {
            this.datePicker.destroy();
        }
        
        Ext.form.DatePicker.superclass.onDestroy.call(this);
    }
});

Ext.reg('datepickerfield', Ext.form.DatePicker);



Ext.layout.LayoutManager = new Ext.AbstractManager({
    
    create : function(config, defaultType) {
        if (!config) {
            config = defaultType;
        }
        if (Ext.isString(config)) {
            return new this.types[config || defaultType];
        }
        else if (Ext.isObject(config)) {
            if (config.isLayout) {
                return config;
            }
            else {
                return new this.types[config.type || defaultType](config);
            }
        }
    }
});


Ext.regLayout = function() {
    return Ext.layout.LayoutManager.registerType.apply(Ext.layout.LayoutManager, arguments);
};


Ext.layout.Layout = Ext.extend(Object, {
    isLayout: true,
    initialized: false,

    constructor : function(config) {
        this.id = Ext.id(null, 'ext-layout-' + this.type + '-');
        Ext.apply(this, config);
    },

    
    layout : function() {
        var me = this;
        me.layoutBusy = true;
        me.initLayout();

        if (me.beforeLayout.apply(me, arguments) !== false) {
            me.onLayout.apply(me, arguments);
            me.afterLayout();
            me.owner.needsLayout = false;
            me.layoutBusy = false;
        }
    },

    beforeLayout : function() {
        this.renderItems(this.getLayoutItems(), this.getTarget());
        return true;
    },

    
    renderItems : function(items, target) {
        var ln = items.length,
            i = 0,
            item;

        for (; i < ln; i++) {
            item = items[i];
            if (item && !item.rendered) {
                this.renderItem(item, i, target);
            }
            else if (!this.isValidParent(item, target)) {
                this.moveItem(item, i, target);
            }
        }
    },

    
    renderItem : function(item, position, target) {
        if (!item.rendered) {
            item.render(target, position);
            this.configureItem(item, position);
            this.childrenChanged = true;
        }
    },

    
    moveItem : function(item, position, target) {
        if (typeof position == 'number') {
            position = target.dom.childNodes[position];
        }
        
        target = target.dom || target;
        target.insertBefore(item.el.dom, position || null);
        item.container = target;
        this.configureItem(item, position);
        this.childrenChanged = true;
    },

    
    initLayout : function() {
        if (!this.initialized && !Ext.isEmpty(this.targetCls)) {
            this.getTarget().addCls(this.targetCls);
        }
        this.initialized = true;
    },

    
    setOwner : function(owner) {
        this.owner = owner;
    },

    
    getLayoutItems : function() {
        return [];
    },

    
    isValidParent : function(item, target) {
        var dom = item.el ? item.el.dom : Ext.getDom(item);
        return target && (dom.parentNode == (target.dom || target));
    },

    
    configureItem: function(item, position) {
        if (this.itemCls) {
            item.el.addCls(this.itemCls);
        }
    },
    
    
    onLayout : Ext.emptyFn,
    afterLayout : Ext.emptyFn,
    onRemove : Ext.emptyFn,
    onDestroy : Ext.emptyFn,

    
    afterRemove : function(item) {
        if (this.itemCls && item.rendered) {
            item.el.removeCls(this.itemCls);
        }
    },

    
    destroy : function() {
        if (!Ext.isEmpty(this.targetCls)) {
            var target = this.getTarget();
            if (target) {
                target.removeCls(this.targetCls);
            }
        }
        this.onDestroy();
    }
});

Ext.layout.ComponentLayout = Ext.extend(Ext.layout.Layout, {
    type: 'component',

    monitorChildren: true,

    beforeLayout : function(width, height) {
        Ext.layout.ComponentLayout.superclass.beforeLayout.call(this);
        var owner = this.owner,
            isVisible = owner.isVisible(),
            layoutCollection;
        
        if (!isVisible && owner.hiddenOwnerCt) {
            layoutCollection = owner.hiddenOwnerCt.layoutOnShow;
            layoutCollection.remove(owner);
            layoutCollection.add(owner);
            owner.needsLayout = {
                width: width,
                height: height,
                isSetSize: false
            };
        }

        return isVisible && this.needsLayout(width, height);
    },

    
    needsLayout : function(width, height) {
        this.lastComponentSize = this.lastComponentSize || {
            width: -Infinity,
            height: -Infinity
        };

        var childrenChanged = this.childrenChanged;
        this.childrenChanged = false;

        return (childrenChanged || this.lastComponentSize.width !== width || this.lastComponentSize.height !== height);
    },

    
    setElementSize: function(el, width, height) {
        if (width !== undefined && height !== undefined) {
            el.setSize(width, height);
        }
        else if (height !== undefined) {
            el.setHeight(height);
        }
        else if (width !== undefined) {
            el.setWidth(width);
        }
    },

    
    getTarget : function() {
        return this.owner.el;
    },

    
    setTargetSize : function(width, height) {
        this.setElementSize(this.owner.el, width, height);
        this.lastComponentSize = {
            width: width,
            height: height
        };
    },

    afterLayout : function() {
        var owner = this.owner,
            layout = owner.layout,
            ownerCt = owner.ownerCt,
            ownerCtSize, activeSize, ownerSize, width, height;

        owner.afterComponentLayout(this);

        
        if (layout && layout.isLayout) {
            layout.layout();
        }

        if (ownerCt && ownerCt.componentLayout && ownerCt.componentLayout.monitorChildren && !ownerCt.componentLayout.layoutBusy) {
            ownerCt.componentLayout.childrenChanged = true;

            
            if (ownerCt.layout && !ownerCt.layout.layoutBusy) {
                if (ownerCt.layout.type == 'autocontainer') {
                    ownerCt.doComponentLayout(width, height);
                }
                else {
                    ownerCt.layout.layout();
                }
            }
        }
    }
});


Ext.layout.AutoComponentLayout = Ext.extend(Ext.layout.ComponentLayout, {
    type: 'autocomponent',

    onLayout : function(width, height) {
        this.setTargetSize(width, height);
    }
});

Ext.regLayout('autocomponent', Ext.layout.AutoComponentLayout);


Ext.layout.DockLayout = Ext.extend(Ext.layout.ComponentLayout, {
    type: 'dock',

    
    itemCls: 'x-docked',

    
    onLayout: function(width, height) {
        var me = this,
            owner = me.owner,
            body = owner.body,
            ownerCt = owner.ownerCt,
            layout = owner.layout,
            collapsed = owner.collapsed,
            contracted = owner.contracted,
            expanded = owner.expanded,
            headerItem = me.headerItem,
            target = me.getTarget(),
            autoWidth = false,
            autoHeight = false,
            animTo;

        
        var info = me.info = {
            boxes: [],
            size: {
                width: width,
                height: height
            },
            padding: {
                top: target.getPadding('t'),
                right: target.getPadding('r'),
                bottom: target.getPadding('b'),
                left: target.getPadding('l')
            },
            border: {
                top: target.getBorderWidth('t'),
                right: target.getBorderWidth('r'),
                bottom: target.getBorderWidth('b'),
                left: target.getBorderWidth('l')
            },
            bodyMargin: {
                top: body.getMargin('t'),
                right: body.getMargin('r'),
                bottom: body.getMargin('b'),
                left: body.getMargin('l')
            },
            bodyBox: {}
        };

        
        if (height === undefined || height === null || width === undefined || width === null || contracted) {
            
            if ((height === undefined || height === null) && (width === undefined || width === null)) {
                autoHeight = true;
                autoWidth = true;
                if (!owner.animCollapse || (!expanded && !contracted)) {
                    me.setTargetSize(null, null);
                }
                me.setBodyBox({width: null, height: null});
            }
            
            else if (height === undefined || height === null) {
                autoHeight = true;
                
                if (!owner.animCollapse || (!expanded && !contracted)) {
                    me.setTargetSize(width, null);
                }
                me.setBodyBox({width: width, height: null});
            
            }
            else {
                autoWidth = true;
                
                if (!owner.animCollapse || (!expanded && !contracted)) {
                    me.setTargetSize(null, height);
                }
                me.setBodyBox({width: null, height: height});
            }

            
            if (!collapsed && layout && layout.isLayout) {
                layout.layout();
            }

            
            
            
            
            
            me.dockItems(autoWidth, autoHeight);
            if (collapsed) {
                if (headerItem) {
                    if (headerItem.dock == 'top' || headerItem.dock == 'bottom') {
                        info.size.height = headerItem.getHeight();
                    }
                    else {
                        info.size.width = headerItem.getWidths();
                    }
                } else {
                    info.size.height = 0;
                }
            }
            if (expanded || contracted) {
                if (owner.animCollapse) {
                    Ext.createDelegate(owner.animCollapseFn, owner, [info.size.width, info.size.height])();
                }
                else {
                    Ext.createDelegate(owner['after' + (expanded ? 'Expand' : 'Collapse')], owner)();
                    me.setTargetSize(info.size.width, info.size.height);
                }
            }
            else {
                me.setTargetSize(info.size.width, info.size.height);
            }
        }
        else {
            
            
            
            if (expanded || contracted) {
                if (owner.animCollapse) {
                    Ext.createDelegate(owner.animCollapseFn, owner, [width, height])();
                }
                else {
                    Ext.createDelegate(owner['after' + (expanded ? 'Expand' : 'Collapse')], owner)();
                    me.setTargetSize(width, height);
                }
            }
            else {
                me.setTargetSize(width, height);
                me.dockItems();
            }
        }
        Ext.layout.DockLayout.superclass.onLayout.call(me, width, height);
    },

    afterLayout : function() {
        Ext.layout.DockLayout.superclass.afterLayout.call(this);
    },

    
    dockItems : function(autoWidth, autoHeight) {
        this.calculateDockBoxes(autoWidth, autoHeight);

        
        
        
        var info = this.info,
            collapsed = this.owner.collapsed,
            boxes = info.boxes,
            ln = boxes.length,
            dock, i;

        
        
        for (i = 0; i < ln; i++) {
            dock = boxes[i];
            if (collapsed === true && !dock.isHeader) {
                continue;
            }
            dock.item.setPosition(dock.x, dock.y);
        }

        
        
        if (autoWidth) {
            info.bodyBox.width = null;
        }
        if (autoHeight) {
            info.bodyBox.height = null;
        }
        this.setBodyBox(info.bodyBox);
    },

    
    calculateDockBoxes : function(autoWidth, autoHeight) {
        
        
        
        var me = this,
            target = me.getTarget(),
            items = me.getLayoutItems(),
            owner = me.owner,
            contracted = owner.contracted,
            expanded = owner.expanded,
            bodyEl = owner.body,
            info = me.info,
            size = info.size,
            ln = items.length,
            padding = info.padding,
            border = info.border,
            item, i, box, w, h, itemEl, vis;

        
        
        if (autoHeight) {
            size.height = bodyEl.getHeight() + padding.top + border.top + padding.bottom + border.bottom;
        }
        else {
            size.height = target.getHeight() - target.getMargin('tb');
        }
        
        if (autoWidth) {
            size.width = bodyEl.getWidth() + padding.left + border.left + padding.right + border.right;
        }
        else {
            size.width = target.getWidth() - target.getMargin('lr');
        }

        info.bodyBox = {
            x: border.left + padding.left,
            y: border.top + padding.top,
            width: size.width - padding.left - border.left - padding.right - border.right,
            height: size.height - border.top - padding.top - border.bottom - padding.bottom
        };

        
        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.isHeader) {
                me.headerItem = item;
            }
            
            
            
            box = me.initBox(item);

            if (autoHeight === true) {
                box = me.adjustAutoBox(box, i);
            }
            else {
                box = me.adjustSizedBox(box, i);
            }

            
            
            
            info.boxes.push(box);
        }
    },

    
    adjustSizedBox : function(box, index) {
        var bodyBox = this.info.bodyBox;
        switch (box.type) {
            case 'top':
                box.y = bodyBox.y;
                break;

            case 'left':
                box.x = bodyBox.x;
                break;

            case 'bottom':
                box.y = (bodyBox.y + bodyBox.height) - box.height;
                break;

            case 'right':
                box.x = (bodyBox.x + bodyBox.width) - box.width;
                break;
        }

        
        if (!box.overlay) {
            switch (box.type) {
                case 'top':
                    bodyBox.y += box.height;
                    bodyBox.height -= box.height;
                    break;

                case 'left':
                    bodyBox.x += box.width;
                    bodyBox.width -= box.width;
                    break;

                case 'bottom':
                    bodyBox.height -= box.height;
                    break;

                case 'right':
                    bodyBox.width -= box.width;
                    break;
            }
        }
        return box;
    },

    
    adjustAutoBox : function (box, index) {
        var info = this.info,
            bodyBox = info.bodyBox,
            size = info.size,
            boxes = info.boxes,
            pos = box.type,
            i, adjustBox;

        if (pos == 'top' || pos == 'bottom') {
            
            for (i = 0; i < index; i++) {
                adjustBox = boxes[i];
                if (adjustBox.stretched && adjustBox.type == 'left' || adjustBox.type == 'right') {
                    adjustBox.height += box.height;
                }
                else if (adjustBox.type == 'bottom') {
                    adjustBox.y += box.height;
                }
            }
        }

        switch (pos) {
            case 'top':
                box.y = bodyBox.y;
                if (!box.overlay) {
                    bodyBox.y += box.height;
                }
                size.height += box.height;
                break;

            case 'bottom':
                box.y = (bodyBox.y + bodyBox.height);
                size.height += box.height;
                break;

            case 'left':
                box.x = bodyBox.x;
                if (!box.overlay) {
                    bodyBox.x += box.width;
                    bodyBox.width -= box.width;
                }
                break;

            case 'right':
                if (!box.overlay) {
                    bodyBox.width -= box.width;
                }
                box.x = (bodyBox.x + bodyBox.width);
                break;
        }
        return box;
    },

    
    initBox : function(item) {
        var bodyBox = this.info.bodyBox,
            horizontal = (item.dock == 'top' || item.dock == 'bottom'),
            box = {
                item: item,
                overlay: item.overlay,
                type: item.dock
            };
        
        if (item.stretch !== false) {
            box.stretched = true;
            if (horizontal) {
                box.x = bodyBox.x;
                box.width = bodyBox.width;
                item.doComponentLayout(box.width - item.el.getMargin('lr'));
            }
            else {
                box.y = bodyBox.y;
                box.height = bodyBox.height;
                item.doComponentLayout(undefined, box.height - item.el.getMargin('tb'));
            }
        }
        else {
            item.doComponentLayout();
            box.width = item.getWidth();
            box.height = item.getHeight();
            if (horizontal) {
                box.x = (item.align == 'right') ? bodyBox.width - box.width : bodyBox.x;
            }
        }

        
        
        if (box.width == undefined) {
            box.width = item.getWidth() + item.el.getMargin('lr');
        }
        if (box.height == undefined) {
            box.height = item.getHeight() + item.el.getMargin('tb');
        }

        return box;
    },

    
    getLayoutItems : function() {
        return this.owner.getDockedItems();
    },

    
    setBodyBox : function(box) {
        var me = this,
            owner = me.owner,
            body = owner.body,
            contracted = owner.contracted,
            expanded = owner.expanded,
            info = me.info,
            bodyMargin = info.bodyMargin,
            padding = info.padding,
            border = info.border;

        if (Ext.isNumber(box.width)) {
            box.width -= bodyMargin.left + bodyMargin.right;
        }
        if (Ext.isNumber(box.height)) {
            box.height -= bodyMargin.top + bodyMargin.bottom;
        }

        me.setElementSize(body, box.width, box.height);
        body.setLeft(box.x - padding.left - border.left);
        body.setTop(box.y - padding.top - border.top);
    },

    
    configureItem : function(item, pos) {
        Ext.layout.DockLayout.superclass.configureItem.call(this, item, pos);

        var el = item.el || Ext.get(item);
        if (this.itemCls) {
            el.addCls(this.itemCls + '-' + item.dock);
        }
    },

    afterRemove : function(item) {
        Ext.layout.DockLayout.superclass.afterRemove.call(this, item);
        if (this.itemCls) {
            item.el.removeCls(this.itemCls + '-' + item.dock);
        }
        var dom = item.el.dom;
        
        if (dom) {
            dom.parentNode.removeChild(dom);
        }
        
        this.childrenChanged = true;
    }
});

Ext.regLayout('dock', Ext.layout.DockLayout);

Ext.layout.FieldLayout = Ext.extend(Ext.layout.ComponentLayout, {
    type: 'field',

    
    onLayout: function(width, height) {
        Ext.layout.FieldLayout.superclass.onLayout.call(this, owner, target);

        this.setTargetSize(width, height);
        
    },

    
    handleLabel : function() {
        this.owner.labelEl.setWidth(this.owner.labelWidth);
    }
});

Ext.regLayout('field', Ext.layout.FieldLayout);


Ext.layout.ContainerLayout = Ext.extend(Ext.layout.Layout, {
    type: 'container',
        
    
     
    
    getLayoutItems : function() {
        return this.owner && this.owner.items && this.owner.items.items || [];
    },
    
    afterLayout : function() {
        this.owner.afterLayout(this);
    },    
    
    getTarget : function() {
        return this.owner.getTargetEl();
    }
});


Ext.layout.AutoContainerLayout = Ext.extend(Ext.layout.ContainerLayout, {
    type: 'autocontainer',

    
    onLayout : function(owner, target) {
        var items = this.getLayoutItems(),
            ln = items.length, i;
        for (i = 0; i < ln; i++) {
            items[i].doComponentLayout();
        }
    }
});

Ext.regLayout('auto', Ext.layout.AutoContainerLayout);
Ext.regLayout('autocontainer', Ext.layout.AutoContainerLayout);

Ext.layout.FitLayout = Ext.extend(Ext.layout.ContainerLayout, {
    itemCls: 'x-fit-item',
    targetCls: 'x-layout-fit',
    type: 'fit',
    
    
    onLayout : function() {
        Ext.layout.FitLayout.superclass.onLayout.call(this);

        if (this.owner.items.length) {
            var box = this.getTargetBox(),
                item = this.owner.items.get(0);
            
            this.setItemBox(item, box);
            item.cancelAutoSize = true;
        }
    },

    getTargetBox : function() {
        var target = this.getTarget(),
            size = target.getSize(),
            padding = {
                left: target.getPadding('l'),
                right: target.getPadding('r'),
                top: target.getPadding('t'),
                bottom: target.getPadding('b')
            }, 
            border = {
                left: target.getBorderWidth('l'),
                right: target.getBorderWidth('r'),
                top: target.getBorderWidth('t'),
                bottom: target.getBorderWidth('b')
            };
            
        return {
            width: size.width- padding.left - padding.right - border.left - border.right,
            height: size.height - padding.top - padding.bottom - border.top - border.bottom,
            x: padding.left + border.left,
            y: padding.top + border.top
        };        
    },
    
    
    setItemBox : function(item, box) {
        if (item && box.height > 0) {
            box.width -= item.el.getMargin('lr');
            
            box.height -= item.el.getMargin('tb');
            item.setCalculatedSize(box);
            item.setPosition(box);
        }
    }
});

Ext.regLayout('fit', Ext.layout.FitLayout);



Ext.layout.CardLayout = Ext.extend(Ext.layout.FitLayout, {
    type: 'card',

    sizeAllCards: false,
    hideInactive: true,

    beforeLayout: function() {
        this.activeItem = this.getActiveItem();
        return Ext.layout.CardLayout.superclass.beforeLayout.apply(this, arguments);
    },

    onLayout: function() {
        Ext.layout.FitLayout.superclass.onLayout.apply(this, arguments);

        var activeItem = this.activeItem,
            items = this.getLayoutItems(),
            ln = items.length,
            targetBox = this.getTargetBox(),
            i,
            item;

        for (i = 0; i < ln; i++) {
            item = items[i];
            this.setItemBox(item, targetBox);
        }

        if (!this.firstActivated && activeItem) {
            if (activeItem.fireEvent('beforeactivate', activeItem) !== false) {
                activeItem.fireEvent('activate', activeItem);
            }
            this.firstActivated = true;
        }
    },

    
    getActiveItem: function() {
        if (!this.activeItem && this.owner) {
            this.activeItem = this.parseActiveItem(this.owner.activeItem);
        }

        if (this.activeItem && this.owner.items.items.indexOf(this.activeItem) != -1) {
            return this.activeItem;
        }

        return null;
    },

    
    parseActiveItem: function(item) {
        if (item && item.isComponent) {
            return item;
        }
        else if (typeof item == 'number' || item == undefined) {
            return this.getLayoutItems()[item || 0];
        }
        else {
            return this.owner.getComponent(item);
        }
    },

    
    configureItem: function(item, position) {
        Ext.layout.FitLayout.superclass.configureItem.call(this, item, position);
        if (this.hideInactive && this.activeItem !== item) {
            item.hide();
        }
        else {
            item.show();
        }
    },

    onRemove: function(component) {
        if (component === this.activeItem) {
            this.activeItem = null;
            if (this.owner.items.getCount() == 0) {
                this.firstActivated = false;
            }
        }
    },

    
    getAnimation: function(newCard, owner) {
        var newAnim = (newCard || {}).cardSwitchAnimation;
        if (newAnim === false) {
            return false;
        }
        return newAnim || owner.cardSwitchAnimation;
    },

    
    setActiveItem: function(newCard, animation) {
        var me = this,
            owner = me.owner,
            doc = Ext.getDoc(),
            oldCard = me.activeItem,
            newIndex;
        
        animation = (animation == undefined) ? this.getAnimation(newCard, owner) : animation;

        newCard = me.parseActiveItem(newCard);
        newIndex = owner.items.indexOf(newCard);


        
        if (newIndex == -1) {
            owner.add(newCard);
        }

        
        if (newCard && oldCard != newCard && owner.onBeforeCardSwitch(newCard, oldCard, newIndex, !!animation) !== false) {
            
            if (!newCard.rendered) {
                this.layout();
            }

            
            if (newCard.fireEvent('beforeactivate', newCard, oldCard) === false) {
                return false;
            }
            if (oldCard && oldCard.fireEvent('beforedeactivate', oldCard, newCard) === false) {
                return false;
            }
                        
            
            if (newCard.hidden) {
                newCard.show();
            }

            me.activeItem = newCard;

            if (animation) {
                doc.on('click', Ext.emptyFn, me, {
                    single: true,
                    preventDefault: true
                });

                Ext.Anim.run(newCard, animation, {
                    out: false,
                    autoClear: true,
                    scope: me,
                    after: function() {
                        Ext.defer(function() {
                            doc.un('click', Ext.emptyFn, me);
                        },
                        50, me);

                        newCard.fireEvent('activate', newCard, oldCard);

                        if (!oldCard) {
                            
                            
                            owner.onCardSwitch(newCard, oldCard, newIndex, true);
                        }
                    }
                });

                if (oldCard) {
                    Ext.Anim.run(oldCard, animation, {
                        out: true,
                        autoClear: true,
                        after: function() {
                            oldCard.fireEvent('deactivate', oldCard, newCard);
                            if (me.hideInactive && me.activeItem != oldCard) {
                                oldCard.hide();
                            }

                            
                            
                            
                            owner.onCardSwitch(newCard, oldCard, newIndex, true);
                        }
                    });
                }
            }
            else {
                newCard.fireEvent('activate', newCard, oldCard);
                if (oldCard) {
                    oldCard.fireEvent('deactivate', oldCard, newCard);
                    if (me.hideInactive) {
                        oldCard.hide();
                    }
                }
                owner.onCardSwitch(newCard, oldCard, newIndex, false);
            }

            return newCard;
        }

        return false;
    },

    
    getNext: function(wrap) {
        var items = this.getLayoutItems(),
            index = items.indexOf(this.activeItem);
        return items[index + 1] || (wrap ? items[0] : false);
    },

    
    next: function(anim, wrap) {
        return this.setActiveItem(this.getNext(wrap), anim);
    },

    
    getPrev: function(wrap) {
        var items = this.getLayoutItems(),
            index = items.indexOf(this.activeItem);
        return items[index - 1] || (wrap ? items[items.length - 1] : false);
    },

    
    prev: function(anim, wrap) {
        return this.setActiveItem(this.getPrev(wrap), anim);
    }
});

Ext.regLayout('card', Ext.layout.CardLayout);

Ext.layout.BoxLayout = Ext.extend(Ext.layout.ContainerLayout, {
    type: 'box',

    targetCls: 'x-layout-box',
    
    innerCls: 'x-layout-box-inner',

    
    pack : 'start',
    align: 'center',

    notifyOwnerCtContainer: true,

    fixedLayout: false,

    
    direction: 'normal',

    
    onLayout: function() {
        Ext.layout.BoxLayout.superclass.onLayout.call(this);
        
        if (this.pack === 'left' || this.pack === 'top') {
            this.pack = 'start';
        } else if (this.pack === 'right' || this.pack === 'bottom') {
            this.pack = 'end';
        }

        var target = this.getTarget(),
            ct = target.parent(),
            targetWidth = (ct.getWidth() - ct.getPadding('lr') - ct.getBorderWidth('lr')) + 'px',
            targetHeight = (ct.getHeight() - ct.getPadding('tb') - ct.getBorderWidth('tb')) + 'px';
            
        target.setStyle({
            '-webkit-box-orient': this.orientation,
            '-webkit-box-direction': this.direction,
            '-webkit-box-pack': this.pack,
            '-webkit-box-align': this.align
        });
        
        if (this.orientation == 'horizontal') {
            target.setStyle({
                'min-width': targetWidth,
                'height': targetHeight
            });
        } else {
            target.setStyle({
                'min-height': targetHeight,
                'width': targetWidth
            });
        }

        this.prepareFlexedItems();
        this.setFlexedItems();
    },
    
    prepareFlexedItems : function() {        
        var items = this.getLayoutItems(),
            ln = items.length,
            item, i;

        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.flex != undefined) {
                item.el.setStyle('position', 'absolute');
                item.boxEl = this.createBoxEl(item);
            } else {
                item.doComponentLayout();
            }
        }
    },    
        
    setFlexedItems : function() {
        var items = this.getLayoutItems(),
            ln = items.length,
            item, i;
            
        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.flex != undefined) {
                item.boxSize = item.boxEl.getSize();
            }
        }

        for (i = 0; i < ln; i++) {
            item = items[i];
            if (item.flex != undefined) {
                item.el.setStyle('position', '');
                if (this.align == 'stretch') {
                    item.setSize(item.boxSize);
                } else {
                    if (this.orientation == 'horizontal') {
                        item.setWidth(item.boxSize.width);
                    } else {
                        item.setHeight(item.boxSize.height);
                    }
                }                
                item.boxEl.remove();
                delete item.boxEl;
                delete item.boxSize;
            }
        }
    },
    
    getTarget : function() {
        var owner = this.owner,
            innerCt = this.innerCt;
        
        if (!innerCt) {
            if (owner.scrollEl) {
                innerCt = owner.scrollEl.addCls(this.innerCls);
            } else {
                innerCt = owner.getTargetEl().createChild({cls: this.innerCls});
            }
            this.innerCt = innerCt;
        }

        return innerCt;
    },
    
    createBoxEl : function(item) {
        var el = item.el;
        return el.insertSibling({
            style: 'margin-top: ' + el.getMargin('tb') + 'px; margin-left: ' + el.getMargin('lr') + 'px; -webkit-box-flex: ' + item.flex
        });
    }
});


Ext.layout.HBoxLayout = Ext.extend(Ext.layout.BoxLayout, {
    orientation: 'horizontal'
    
    
    
    
});

Ext.regLayout('hbox', Ext.layout.HBoxLayout);


Ext.layout.VBoxLayout = Ext.extend(Ext.layout.BoxLayout, {
    orientation: 'vertical'
    
    
    
    
    
});

Ext.regLayout('vbox', Ext.layout.VBoxLayout);



Ext.plugins.ListPagingPlugin = Ext.extend(Ext.util.Observable, {
    
    autoPaging: false,

    
    loadMoreText: 'Load More...',

    init: function(list) {
        this.list = list;

        list.onBeforeLoad = Ext.util.Functions.createInterceptor(list.onBeforeLoad, this.onBeforeLoad, this);

        
        this.mon(list, 'update', this.onListUpdate, this);
    },

    onListUpdate : function() {
        if (!this.rendered) {
            this.render();
        }

        this.el.appendTo(this.list.getTargetEl());
        if (!this.autoPaging) {
            this.el.removeCls('x-loading');
        }
        this.loading = false;
    },

    render : function() {
        var list = this.list,
            targetEl = list.getTargetEl(),
            html = '';

        if (!this.autoPaging) {
            html += '<div class="x-list-paging-msg">' + this.loadMoreText + '</div>';
        }

        this.el = targetEl.createChild({
            cls: 'x-list-paging' + (this.autoPaging ? ' x-loading' : ''),
            html: html + Ext.LoadingSpinner
        });

        if (this.autoPaging) {
            this.mon(targetEl.getScrollParent(), 'scrollend', this.onScrollEnd, this);
        }
        else {
            this.mon(this.el, 'tap', this.onPagingTap, this);
        }

        this.rendered = true;
    },

    onBeforeLoad : function() {
        if (this.loading && this.list.store.getCount() > 0) {
            this.list.loadMask.disable();
            return false;
        }
    },

    
    onPagingTap : function(e) {
        if (!this.loading) {
            this.loading = true;
            this.list.store.nextPage();
            this.el.addCls('x-loading');
        }
    },

    onScrollEnd : function(scroller, pos) {
        if (pos.y >= Math.abs(scroller.offsetBoundary.top)) {
            this.loading = true;
            this.list.store.nextPage();
        }
    }
});

Ext.preg('listpaging', Ext.plugins.ListPagingPlugin);


Ext.plugins.PullRefreshPlugin = Ext.extend(Ext.util.Observable, {
    
    pullRefreshText: 'Pull down to refresh...',

    
    releaseRefreshText: 'Release to refresh...',

    
    loadingText: 'Loading...',

    
    snappingAnimationDuration: 150,

    
    refreshFn: null,

    
    pullTpl: new Ext.XTemplate(
        '<div class="x-list-pullrefresh">',
            '<div class="x-list-pullrefresh-arrow"></div>',
            Ext.LoadingSpinner,
            '<div class="x-list-pullrefresh-wrap">',
                '<h3 class="x-list-pullrefresh-message">{message}</h3>',
                '<div class="x-list-pullrefresh-updated">Last Updated: <span>{lastUpdated:date("m/d/Y h:iA")}</span></div>',
            '</div>',
        '</div>'
    ),

    isRefreshing: false,
    isLoading: false,
    currentViewState: '',

    init: function(list) {
        this.list = list;
        this.lastUpdated = new Date();

        list.on('update', this.onListUpdate, this);

        list.onBeforeLoad = Ext.util.Functions.createInterceptor(list.onBeforeLoad, this.onBeforeLoad, this);
    },

    
    onListUpdate: function() {
        if (!this.rendered) {
            this.render();
        }

        this.list.getTargetEl().insertFirst(this.el);

        if (!this.refreshFn) {
            this.onLoadComplete.call(this);
        }
    },

    
    render : function() {
        var list = this.list,
            targetEl = list.getTargetEl(),
            scroller = targetEl.getScrollParent();

        if (!this.pullTpl.isTemplate) {
            this.pullTpl = new Ext.XTemplate(this.pullTpl);
        }

        this.el = this.pullTpl.insertFirst(targetEl, {
            message: this.pullRefreshText,
            lastUpdated: this.lastUpdated
        }, true);

        this.messageEl = this.el.down('.x-list-pullrefresh-message');
        this.updatedEl = this.el.down('.x-list-pullrefresh-updated > span');

        this.pullHeight = this.el.getHeight();

        
        this.scroller = scroller;

        scroller.on('bouncestart', this.onBounceStart, this);
        scroller.on('offsetchange', this.onOffsetChange, this);
        scroller.on('bounceend', this.onBounceEnd, this);
        scroller.on('offsetboundaryupdate', this.onOffsetBoundaryUpdate, this);

        this.rendered = true;
    },

    onOffsetBoundaryUpdate: function(scroller, offsetBoundary) {
        if (this.isRefreshing) {
            offsetBoundary.bottom += this.pullHeight;
        }
    },

    onBounceStart: function(scroller, info) {
        if (info.axis === 'y') {
            if (!this.isRefreshing && scroller.offset.y > this.pullHeight) {
                this.isRefreshing = true;

                this.onOffsetBoundaryUpdate(scroller, scroller.offsetBoundary);
            }
        }
    },

    onBounceEnd: function(scroller, info) {
        if (info.axis === 'y') {
            if (this.isRefreshing) {
                this.isRefreshing = false;

                this.setViewState('loading');
                this.isLoading = true;

                if (this.refreshFn) {
                    this.refreshFn.call(this, this.onLoadComplete, this);
                }
                else {
                    this.list.getStore().load();
                }
            }
        }
    },

    onOffsetChange: function(scroller, offset) {
        if (offset.y > 0 && !this.isRefreshing && !this.isLoading) {
            if (offset.y > this.pullHeight) {
                this.setViewState('release');
            }
            else {
                this.setViewState('pull');
            }
        }
    },

    setViewState: function(state) {
        if (state === this.currentViewState) {
            return this;
        }

        this.currentViewState = state;

        switch (state) {
            case 'pull':
                this.messageEl.setHTML(this.pullRefreshText);
                this.el.removeCls(['x-list-pullrefresh-release', 'x-list-pullrefresh-loading']);
            break;

            case 'release':
                this.messageEl.setHTML(this.releaseRefreshText);
                this.el.addCls('x-list-pullrefresh-release');
            break;

            case 'loading':
                this.messageEl.setHTML(this.loadingText);
                this.el.addCls('x-list-pullrefresh-loading');
                break;
        }

        return this;
    },

    
    onBeforeLoad: function() {
        if (this.isLoading && this.list.store.getCount() > 0) {
            this.list.loadMask.disable();
            return false;
        }
    },

    
    onLoadComplete: function() {
        var me = this;

        if (this.isLoading) {
            this.isLoading = false;

            this.setViewState('pull');
            this.updatedEl.setHTML(Ext.util.Format.date(this.lastUpdated, "m/d/Y h:iA"));

            setTimeout(function() {
                me.scroller.updateBoundary(me.snappingAnimationDuration);
            }, 100);
        }
    }
});

Ext.preg('pullrefresh', Ext.plugins.PullRefreshPlugin);



