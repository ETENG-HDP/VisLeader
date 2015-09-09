/**
 * @author zxh 
 瀑布查询，下拉到底部时刷新下一页数据
 调用实例
 {
     xtype: 'list',
     plugins: [{
            xclass: 'FertilizerSellMobile.util.FallsRefresh',
            pageSize: 10,
            fallsRefresh: function() {
                console.log('fallsRefresh--------------');
                Ext.Viewport.fireEvent('orderDownFlush');
            }
        }]
 }
 * 
 */
Ext.define('VisLeader.util.FallsRefresh', {    alias: 'plugin.fallsRefresh',
    config: {
        fallslist: null,
        pageSize: 10, //每次瀑布查询的条数，默认为10
        fallsRefresh: null //查询方法
    },

    constructor: function(config) {
        this.initConfig(config);
        this.callParent([config]);
    },

    init: function(fallslist) {
        this.setFallslist(fallslist);
        fallslist.getStore().setPageSize(this.getPageSize());
        fallslist.getScrollable().getScroller().on({
            scrollend: this.onScrollEnd,
            scope: this
        });
    },

    onScrollEnd: function(scroller, x, y) {
        if (!this.getFallslist().getStore().isLoading() && y >= scroller.maxPosition.y) {
            this.getFallslist().setScrollToTopOnRefresh(false);
            this.getFallsRefresh().call(this, this);
        }
    }
});