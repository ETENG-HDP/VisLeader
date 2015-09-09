Ext.define('ETFramework.app.Controller', {
    extend: 'Ext.app.Controller',
    requires: [
        'ETFramework.Backend'
    ],

    statics: {
        _enter: false
    },

    enter: function (value) {
        if (arguments.length === 0) {
            return ETFramework.app.Controller._enter;
        }
        ETFramework.app.Controller._enter = value;
    },

    first: function (value) {
        if (arguments.length === 0) {
            return localStorage._first;
        }
        localStorage._first = value;
    },

    back: function () {
        history.back();
    },

    showView: function (xtype) {
        if (Ext.isObject(xtype)) {
            return Ext.Viewport.setActiveItem(xtype);
        };

        var view = Ext.Viewport.query(xtype)[0] || {
            xtype: xtype
        };
        return Ext.Viewport.setActiveItem(view);
    },

    request: function () {
        ETFramework.Backend.request.apply(ETFramework.Backend, arguments);
    },

    signIn: function (username, password, callback) {
        if (arguments.length === 0) {
            return ETFramework.Backend.isSignIn();
        } else {
            ETFramework.Backend.signIn({
                params: {
                    username: username,
                    password: password
                },
                callback: callback,
                scope: this
            });
            return this;
        }
    },

    // abstrast
    entry: Ext.emptyFn
});