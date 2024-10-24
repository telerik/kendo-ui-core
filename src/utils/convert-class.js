export function fromESClass(ESClass) {
    class ExtendedClass extends ESClass {
        static extend(proto) {
            const subclass = class extends ExtendedClass {
                constructor() {
                    super();
                    if (proto && proto.init) {
                        proto.init.apply(this, arguments);
                    }
                }
            };

            // Copy the prototype so that the constructor is not overwritten
            Object.assign(subclass.prototype, proto);

            addInstanceGetter(subclass.prototype);

            // Apply the prototype to fn to allow for chaining
            subclass.fn = subclass.prototype;

            return subclass;
        }
    }

    addInstanceGetter(ExtendedClass.prototype);

    // Apply the prototype to fn to allow for chaining
    ExtendedClass.fn = ExtendedClass.prototype;

    return ExtendedClass;
}

function addInstanceGetter(proto) {
    Object.defineProperty(proto, '_instance', {
        get: function() {
            return this;
        }
    });
}