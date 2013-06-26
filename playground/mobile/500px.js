/*jslint eqeq: true, newcap: true, nomen: true, plusplus: true, browser: true, indent: 2 */
(function () {
  'use strict';

  var Response, _500pxSDK;

  _500pxSDK = function () {
    var self = this,
      oauth_token,
      container,
      site_url = 'https://api.500px.com/',
      version = 'v1',
      api_url = site_url + version,
      events = {},
      public_methods,
      bind_method,
      i,
      method_name,
      original_method,
      random_method_name,
      handle_api_callback,
      encode_param_name,
      object_to_params,
      fire_event,
      login_callback;

    // Public methods

    // init(options)
    //
    // Initializes the 500px SDK. You must run this command before using the SDK.
    // Options are specified as an object. Valid options are:
    // - `sdk_key` (required) The sdk key for your application. You can obtain this key from (http://500px.com/settings/applications)
    // - `oauth_token` (optional) An oauth token for the current user. If you use `ensureAuthorization`, `login`, `authorization` or `getAuthorizationStatus` this value may be overwritten.
    //
    //    _500px.init({
    //      sdk_key: 'XXXXXXXXXXXXXXXXXXXXXX',
    //    });
    this.init = function (options) {
      if (this.sdk_key) {
        throw 'init: Already initialized';
      }
      if (!options || !options.sdk_key) {
        throw 'init: You must specify an sdk key';
      }
      if (!document.body) {
        throw 'init: Could not find the body element, make sure the document is loaded before calling init';
      }

      this.sdk_key = options.sdk_key;

      if (options && options.oauth_token) {
        oauth_token = options.oauth_token;
      }

      var container_element = document.createElement('div'), remove_container;
      container_element.id = '_500px_container';
      container_element.style.display = 'none';
      container_element.style.width = 0;
      container_element.style.height = 0;
      container_element.style.border = 0;
      container_element.style.margin = 0;
      container_element.style.padding = 0;
      document.body.appendChild(container_element);

      container = document.getElementById('_500px_container');

      remove_container = function () {
        var e = document.getElementById('_500px_container');
        document.body.removeChild(e);
        return null;
      };
    };

    // api(url, http_method, parameters, callback)
    //
    // Executes an API call. All parameters are optional except `url`. `parameters` must be an object and `callback` a function.
    // The callback will be passed a Response object. The response object has these methods:
    //
    //    `success` (boolean) True if no errors occurred, false if errors occured.
    //    `error` (boolean) True if an error occured.
    //    `error_message` (string) The text of the error message.
    //    `status` (integer) The HTTP status code of the response.
    //    `data` (object) The data returned by the API.
    //
    //    _500px.api('/users', function (response) {
    //      console.log('My User Data Is', response.data);
    //    });
    //
    //    _500px.api('/users/937847/friend', 'post', function (response) {
    //      console.log('Now following user ', 937847);
    //    });
    //
    //    _500px.api('/photos/899999', 'put', { name: 'My New Photo Name' }, function (response) {
    //      if (response.success) {
    //        console.log('Your photo was updated');
    //      } else {
    //        console.log('An Error occurred: ', response.error_message);
    //      }
    //    });
    this.api = function () {
      if (!this.sdk_key) {
        throw "api: SDK not initialized. Use _500px.init() first.";
      }
      var args, url, method, data, callback, tag, callback_function_name, tag_src;
      args = Array.prototype.slice.call(arguments); // This converts arguments into an Array
      url = args.shift();
      if (!url || url.replace(/^\s*/, '').replace(/\s*$/, '') == '') {
        throw 'api: You must specify an end point';
      }

      method = 'get';
      if (args[0] && typeof args[0] == 'string') {
        method = args.shift();
      }

      data = {};
      if (args[0] && typeof args[0] == 'object') {
        data = args.shift();
      }

      callback = function () {};
      if (args[0] && typeof args[0] == 'function') {
        callback = args.shift();
      }

      data._method = method;
      if (oauth_token) {
        data.oauth_token = oauth_token;
      }
      data.sdk_key = this.sdk_key;

      // Construct JSONP request
      tag = document.createElement('script');

      callback_function_name = random_method_name();

      window[callback_function_name] = function (data) {
        document.body.removeChild(tag);
        handle_api_callback(callback)(data);
      };

      tag_src = api_url + url + '.jsonp';
      data.callback = callback_function_name;
      tag_src += '?';
      tag_src += object_to_params(data);
      tag.src = tag_src;
      document.body.appendChild(tag);
    };

    // login([callback])
    //
    // Logs a user in and authorizes your application. You may specify an optional callback function.
    // The callback function will be passed a string. It will be `denied` if the user did not authorize the application and `authorized` if the user accepted.
    // If the user does authorize the application an `authorization_obtained` event will be triggered.
    //
    // Once authorized an oauth token is obtain for the user. When making api requests you will not be logged in as that user.
    //
    //    _500px.login();
    //
    //    _500px.login(function (resposne) {
    //      if (response == 'denied') {
    //        console.log('User did not authorize the app');
    //      } elsif (response == 'authorized') {
    //        console.log('User did authorize the app');
    //      }
    //    });
    this.login = function (callback) {
      if (!this.sdk_key) {
        throw "login: SDK not initialized. Use _500px.init() first.";
      }

      var callback_function_name, left_offset, top_offset;

      callback_function_name = random_method_name();
      window[callback_function_name] = function (parameters) {
        login_callback.call(self, callback, parameters);
      };

      left_offset = (screen.width / 2) - (1240 / 2);
      top_offset = (screen.height / 2) - (480 / 2);

      window.open(site_url + 'api/js-sdk/authorize?sdk_key=' + this.sdk_key + '&callback=' + callback_function_name,
                  '500px_js_sdk_login',
                  'width=1240,height=480,left=' + left_offset + ',top=' + top_offset + ',menu=no,location=yes,scrollbars=no,status=no,toolbar=no');
    };

    // authorize(callback)
    //
    // Alias for `login`.
    this.authorize = function (callback) {
      if (!this.sdk_key) {
        throw "authorize: SDK not initialized. Use _500px.init() first.";
      }
      this.login(callback);
    };

    // ensureAuthorization(callback)
    //
    // Executes callback only if authorization for the user can be obtained.
    // If authorization was previously obtained and an oauth token is present
    // the callback will be executed immediately. Otherwise `getAuthorizationStatus`
    // is used to check if the user has authorized the application & authorizes it if they haven't.
    // If the user declines to authorize the app, or closes the authorization popup the callback will not be called.
    this.ensureAuthorization = function (callback) {
      if (!this.sdk_key) {
        throw "ensureAuthorization: SDK not initialized. Use _500px.init() first.";
      }

      var bound_callback = function () {
        if (callback) {
          callback.call(self);
        }
      };

      if (oauth_token) {
        bound_callback();
        return;
      }

      this.getAuthorizationStatus(function (response) {
        if (response == 'authorized') {
          bound_callback();
        } else {
          self.login(function (response) {
            if (response == 'authorized') {
              bound_callback();
            }
          });
        }
      });
    };

    // getAuthorizationStatus([callback])
    //
    // Determines whether or not the user has authorized your application. If the user has authorized the application it will return and save the user's oauth token.
    // The callback function will be passed a string. Possible values are:
    //    `not_logged_in` The user is not logged in to 500px.
    //    `not_authorized` The user is logged in, but has not authorized your app.
    //    `authorized` The user has authorized your app.
    //
    //    _500px.getAuthorizationStatus(function (response) {
    //      if (response != 'authorized') {
    //        _500px.login();
    //      }
    //    });
    this.getAuthorizationStatus = function (callback) {
      if (!this.sdk_key) {
        throw "getAuthorizationStatus: SDK not initialized. Use _500px.init() first.";
      }

      var callback_function_name = random_method_name(),
        iframe_element = document.createElement('iframe');

      window[callback_function_name] = function (parameters) {
        setTimeout(function () {
          container.removeChild(iframe_element);
        }, 0);

        if (parameters.not_logged_in) {
          oauth_token = null;
          if (callback && typeof callback == 'function') {
            callback('not_logged_in');
          }
        } else if (parameters.not_authorized) {
          oauth_token = null;
          if (callback && typeof callback == 'function') {
            callback('not_authorized');
          }
        } else if (parameters.token) {
          oauth_token = parameters.token;
          fire_event('authorization_obtained');
          if (callback && typeof callback == 'function') {
            callback('authorized');
          }
        }
      };

      iframe_element.src = site_url + 'api/js-sdk/check_authorization?sdk_key=' + this.sdk_key + '&callback=' + callback_function_name;
      container.appendChild(iframe_element);
    };

    // on(event_name, callback)
    //
    // Subscribe to an event
    //    `logout` Fired when the user logs out, or if the API returns an OAuth error (like oauth_token is invalid)
    //    `authorization_obtained` Fired when the SDK obtains an oauth token for a user. For example with `login()` is used, or `getAuthorizationStatus()` returns an `authorized` value.
    //    'authorization_denied' Fired when the user denies authorization for your application.
    this.on = function (event_name, callback) {
      if (!events[event_name]) {
        events[event_name] = [];
      }
      if (typeof callback != 'function') {
        throw 'on: Callback is not a function';
      }

      events[event_name].push(callback);
    };

    // off(event_name[, callback])
    //
    // Unsubscribed from an event. Specify the callback to remove just one funcgtion. Specify no callback to remove all callbacks for an event.
    this.off = function (event_name, callback) {
      var i, current_callback;
      if (callback) {
        if (!events[event_name]) {
          return;
        }
        for (i = 0; i < events[event_name].length; i++) {
          current_callback = events[event_name][i];
          if (current_callback == callback) {
            events[event_name][i] = undefined;
          }
        }
      } else {
        events[event_name] = [];
      }
    };

    // logout
    //
    // Logs the user out from 500px
    this.logout = function (callback) {
      if (!this.sdk_key) {
        throw "logout: SDK not initialized. Use _500px.init() first.";
      }
      if (!oauth_token) {
        throw "logout: User is not logged in";
      }

      var callback_function_name = random_method_name(),
        iframe_element = document.createElement('iframe'),
        left_offset,
        top_offset;

      window[callback_function_name] = function (parameters) {
        var status;

        setTimeout(function () {
          container.removeChild(iframe_element);
        }, 0);
        if (parameters.no_token_specified) {
          status = 'no_token_specified';
        } else if (parameters.invalid_token) {
          status = 'invalid_token';
        } else if (parameters.not_logged_in) {
          status = 'not_logged_in';
        } else if (parameters.logged_out) {
          status = 'logged_out';
        }
        if (callback && typeof callback == 'function') {
          callback(status);
        }
        fire_event('logout');
      };

      if (navigator.userAgent.match(/MSIE/)) {
        left_offset = (screen.width / 2) - (1240 / 2);
        top_offset = (screen.height / 2) - (480 / 2);

        window.open(site_url + 'api/js-sdk/authorize?sdk_key=' + this.sdk_key + '&token=' + oauth_token + '&_method=delete&callback=' + callback_function_name,
                    '500px_logout_window',
                    'width=1240,height=480,left=' + left_offset + ',top=' + top_offset + ',menu=no,location=yes,scrollbars=no,status=yes,toolbar=yes');
      } else {
        iframe_element.src = site_url + 'api/js-sdk/authorize?sdk_key=' + this.sdk_key + '&token=' + oauth_token + '&_method=delete&callback=' + callback_function_name;
      }
      container.appendChild(iframe_element);
    };

    // Private methods

    function encode_param_name(name, root) {
      if (root) {
        return encodeURIComponent(root + '[' + name + ']');
      } else {
        return encodeURIComponent(name);
      }
    };

    function object_to_params(object, root) {
      var string_parts = [], property, i;

      for (property in object) {
        if (object.hasOwnProperty(property)) {
          var value = object[property];
          if (value instanceof Array) {
            for (i = 0; i < value.length; i++) {
              var encoded_value = encodeURIComponent(value[i]);
              string_parts.push(encode_param_name(property, root) + '%5B%5D=' + encoded_value);
            }
          } else if (typeof value == 'object') {
            string_parts.push(this.object_to_params(value, encode_param_name(property, root)));
          } else {
            string_parts.push(encode_param_name(property, root) + '=' + encodeURIComponent(value));
          }
        }
      }
      return string_parts.join('&');
    };

    fire_event = function (event_name) {
      if (events[event_name]) {
        var i;
        for (i = 0; i < events[event_name].length; i++) {
          events[event_name][i].call(self);
        }
      }
    };

    login_callback = function (callback, parameters) {
      if (parameters.denied && callback && typeof callback == 'function') {
        fire_event('authorization_cancelled');
        callback.call(self, 'denied');
      } else if (parameters.token) {
        oauth_token = parameters.token;
        fire_event('authorization_obtained');
        if (callback && typeof callback == 'function') {
          callback.call(self, 'authorized');
        }
      }
    };

    handle_api_callback = function (callback) {
      return function (data) {
        var response = new Response(data);
        callback.call(self, response);
        if (data.status && data.status == 401) {
          oauth_token = null;
          fire_event('logout');
        }
      };
    };

    random_method_name = function () {
      return '_500pxCallback' + String(Math.round(Math.random() * 100000000));
    };

    // Bind all public methods

    public_methods = [
      'init',
      'api',
      'login',
      'authorize',
      'ensureAuthorization',
      'getAuthorizationStatus',
      'on',
      'off',
      'logout'];

    bind_method = function (method) {
      return function () {
        method.apply(self, arguments);
      };
    };

    for (i = 0; i < public_methods.length; i++) {
      method_name = public_methods[i];
      original_method = this[method_name];
      this[method_name] = bind_method(original_method);
    }
  };

  window._500px = new _500pxSDK();

  Response = function (data) {
    this.success = true;

    if (data.status && data.status != 200 && data.error) {
      this.success = false;
      this.error_message = data.error;
      this.status = data.status;
    }
    if (!this.status) {
      this.status = 200;
    }

    this.error = !this.success;
    this.data = data;
  };
}());
