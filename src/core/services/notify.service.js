const noop = () => { };
class NotifyService {
    _impl = noop;
    register(impl) {
        this._impl = impl;
    }
    notify(widget, namespace) {
        this._impl(widget, namespace);
    }
}
export const notifyService = new NotifyService();
