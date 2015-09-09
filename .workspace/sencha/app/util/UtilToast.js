/**
*/
/*公共类*/
Ext.define('VisLeader.util.UtilToast', {    alternateClassName: 'utils',
    statics: {
        //加载stroe
        storeLoad: function (id) {
            var store = Ext.getStore(id);
            if (store.getCount() < 1) {
                store.load();
            }
        },
        //加载data数据
        dataLoad: function (view, url, params) {
            Ext.Ajax.request({
                url: url,
                params: params,
                success: function (result, request) {
                    result = Ext.decode(result.responseText);
                    console.log(result.result[5]);
                    view.setData(result.result[5]);
                }
            });
        },
        //加载record数据
        recordLoad: function (record, view, url, params, ckName) {
            if (record.data.ckName) {
                view.setData(record.data);
                return;
            }
            Ext.Ajax.request({
                url: url,
                params: params,
                success: function (result, request) {
                    result = Ext.decode(result.responseText);
                    record.set(result);
                    view.setData(record.data);
                }
            });
        },
        //显示pick
        showPick: function (xtype, params) {
            var pick = Ext.create(xtype);
            Ext.Viewport.add(pick);
            pick.show(params);
        },
        //结束pick
        endPick: function (xtype) {
            var pick = Ext.Viewport.down(xtype);
            if (pick) {
                pick.endPick();
            }
        },
        //Viewport添加新项,Viewport之中始终只有一项
        ePush: function (xtype) {
            var me = Ext.Viewport,
            view = me.getActiveItem();
            if (view && view.getItemId() == xtype) {
                return;
            }
            view = Ext.create(xtype, {
                itemId: xtype
            });
            //切换
            me.animateActiveItem(view, {
                type: 'slide',
                direction: 'left'
            });
        },
        //监控Viewport界面切换,切换时销毁旧项
        eActiveitemchange: function () {
            var me = Ext.Viewport;
            me.onAfter('activeitemchange',
            function (t, value, oldValue, eOpts) {
                if (oldValue) {
                    //强制销毁，防止销毁不完全引发错误
                    me.remove(oldValue, true);
                }
            });
        },
        /*为Ext.Viewport添加一个消息提示组件*/
        addMessage: function () {
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                cls: 'message',
                transparent: true,
                indicator: false
            });
            this.hideMessage();
        },
        /*显示一个消息提示*/
        showMessage: function (mes, autoHide) {
            var me = this,
            message = this.getMessage();
            message.setMessage(mes);
            message.show();
            //是否自动关闭提示
            if (autoHide) {
                setTimeout(function () {
                    message.hide();
                },
                1000);
            }
        },
        /*隐藏消息提示*/
        hideMessage: function () {
            this.getMessage().hide();
        },
        //消息组件
        getMessage: function () {
            return Ext.Viewport.getMasked();
        },
        //验证模型
        valid: function (model, from) {
            var tmpModel = Ext.create(model),
            me = this,
            errors, valid;
            from.updateRecord(tmpModel);
            errors = tmpModel.validate();
            valid = errors.isValid();
            if (!valid) {
                errors.each(function (err) {
                    me.showMessage(err.getMessage(), true);
                    return;
                });
            }
            return valid;
        },
        //重写ajax
        overrideAjax: function () {
            var me = this;
            //开始加载
            Ext.Ajax.on('beforerequest',
            function (connection, options) {
                if (!options.hidMessage) {
                    me.showMessage('正在努力加载中...');
                }
            });
            //加载成功
            Ext.Ajax.on('requestcomplete',
            function (connection, options) {
                me.hideMessage();
            });
            //加载失败
            Ext.Ajax.on('requestexception',
            function (connection, options) {
                if (!options.hidMessage) {
                    me.showMessage('加载失败，请稍后再试...', true);
                }
            });
        },
        //重写list
        overrideList: function () {
            //重写分页插件
            Ext.define("Ext.zh.plugin.ListPaging", {
                override: "Ext.plugin.ListPaging",
                config: {
                    //自动加载
                    autoPaging: true,
                    //滚动到最底部时是否自动加载下一页数据
                    noMoreRecordsText: '没有更多内容了',
                    loadMoreText: '加载更多...' //加载更多按钮显示内容
                }
            });
            //重写List
            Ext.define("Ext.zh.List", {
                override: "Ext.List",
                config: {
                    //取消选择效果
                    selectedCls: '',
                    //禁用加载遮罩，防止跳转时页面卡顿，使用统一的遮罩效果
                    loadingText: false,
                    emptyText: '没有更多内容了'
                }
            });
        },
        //重写Pick相关
        overridePick: function () {
            Ext.Date.monthNames = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
            Ext.define("Ext.zh.DatePicker", {
                override: "Ext.picker.Date",
                config: {
                    yearFrom: 2000,
                    monthText: '月',
                    dayText: '日',
                    yearText: '年'
                }
            });
            Ext.define("Ext.local_zh_cn.Picker", {
                override: "Ext.picker.Picker",
                applyDoneButton: function (config) {
                    if (config) {
                        if (Ext.isBoolean(config)) {
                            config = {};
                        }
                        if (typeof config == "string") {
                            config = {
                                text: config
                            };
                        }
                        Ext.applyIf(config, {
                            ui: 'action',
                            align: 'right',
                            text: '确定'
                        });
                    }
                    return Ext.factory(config, 'Ext.Button', this.getDoneButton());
                },
                applyCancelButton: function (config) {
                    if (config) {
                        if (Ext.isBoolean(config)) {
                            config = {};
                        }
                        if (typeof config == "string") {
                            config = {
                                text: config
                            };
                        }
                        Ext.applyIf(config, {
                            align: 'left',
                            text: '取消'
                        });
                    }
                    return Ext.factory(config, 'Ext.Button', this.getCancelButton());
                }

            });
        },
        //app初始化执行
        inIt: function () {
            this.eActiveitemchange();
            this.overrideList();
            this.overrideAjax();
            this.addMessage();
            this.overridePick();
        }
    }
});