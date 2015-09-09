/**
 * 解决弹出框中的按钮不能点击的bug.
 * 更换版本之后可考虑去掉,现在有问题版本为:sencha touch 2.2.1-2.3.1(now)
 */
//Ext.define('BcpBoss.util.CssTransition', {
Ext.define('VisLeader.util.CssTransition', {    override: 'Ext.fx.runner.CssTransition',
    onTransitionEnd: function(e) {
        var target = e.target,
        id = target.id,
        propertyName = e.browserEvent.propertyName,
        styleDashPrefix = Ext.browser.getStyleDashPrefix();
        if (id && this.runningAnimationsData.hasOwnProperty(id)) {
            if (Ext.feature.has.CssTransformNoPrefix) {
                if (propertyName.indexOf(styleDashPrefix) >= 0) {
                    propertyName = propertyName.substring(styleDashPrefix.length);
                }
            }
            this.refreshRunningAnimationsData(Ext.get(target), [propertyName]);
        }
    }
});//});