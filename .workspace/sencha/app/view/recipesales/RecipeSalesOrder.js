Ext.define('VisLeader.view.recipesales.RecipeSalesOrder', {
    extend: 'Ext.Container',
  requires: [
    'VisLeader.model.feature.FeatureModel',
    'VisLeader.view.recipesales.RecipeSalePie',
    'VisLeader.view.recipesales.SaleOrder'
  ],
	xtype: 'recipesaleorder',
  config: {
    scrollable: true,
    listeners: {
      painted: function() {
        Ext.Viewport.fireEvent('recipesaleorder');
      }
    },
    layout: 'vbox',
  	items: [{
  		docked: 'top',
  		xtype: 'toolbar',
  		ui: 'light',
      items: [{xtype: 'spacer'},{
        cls: 'profeature',
        ui: 'light',
        usePicker: false,
        displayField: 'feature_name',
        valueField: 'feature_id',
        xtype: 'selectfield',
        disabled: true,
        name: 'feature',
        centered: 'true',
        placeHolder: '产品特征',
        listeners: {
          painted: function() {
            Ext.Viewport.fireEvent('querychara');
          },
          change: function(item, newValue, oldValue) {
            Ext.Viewport.fireEvent('recipesaleorder', newValue);
          }
        },
        store: {
          autoSync: true,
          autoLoad: true,
          model: 'VisLeader.model.feature.FeatureModel',
          storeId: 'featurestore'
        }
      }, {xtype: 'spacer'}]
  	}, {
      margin: '0.3em 0.3em 0em 0.3em',
      scrollable: false,
      disableSelection: true,
      minHeight: '72px',
  		xtype: 'saleorder',
      name: 'recipelist',
      store: 'recipproductsalestore',
  		listeners: {
  			itemtap: function(item, index, target, record) {
          var view = Ext.Viewport.query('selectfield[name=feature]')[0];
          var feature = view.getValue();
          var recipe = record.getData().region_id;
  				Ext.Viewport.fireEvent('recipesalenum', feature, recipe);//配方销量
  			}
  		}
  	}, {
      margin: '0.3em 0.3em 0em 0.3em',
      html: '<div style="text-align: center">配方月销量占比</div>'
    }, {
      margin: '0.3em 0.3em 0em 0.3em',
      height: '15em',
      xtype: 'recipepiechart'
    }]
  }
});