{{#class 'ETFramework.app.Controller'}}
  requires: [
    '{{app "util.StoreRecipe"}}',
    '{{view "storagecount.SelectRecipePage"}}',
    '{{view "storagecount.ProductionStore"}}'
  ],
  config: {
  	control: {
  		'viewport': {
  		  recipeQuery: 'recipeQuery',
        addrecipe: 'addrecipe',
        loadmorerecipe: 'loadmorerecipe',
        productionStore: 'productionStore'
  		}
  	}
	},

  //界面跳转
  addrecipe: function() {
    this.redirectTo('recipe');
  },
  productStore: function() {
    this.redirectTo('productstore');
  },

  //分产品显示
  productionStore: function(recipe) {
    this.productStore();
    this.request({
      bo: 'et.bcp.leader.stock.bo.ProduceStockBo',
      params: {
        action: 'queryproduce',
        formul_id: recipe,
        stockdoc_id: null,
        startnum: null,
        rows: null,
        user_id: localStorage.user_id,
        corp_id: bcpConfig.appcorpid || 'wuzoufen-f76b-4437-a3bd-9f1ab1343dfc'
      },
      callback: function(err, flag, message) {
        if(err != null) {

        } else if (flag == 'true' || flag ) {
          var store = Ext.StoreMgr.lookup('recipeproductionstore');
          var proids = [];
          if(store != null) {
            store.removeAll();
          }
          if(message.length != null) {
            message.forEach(function(data) {
              proids.push(data.region_id);
              data.previous_sales = '0.00t';
              data.sales_num = data.sales_num + 't';
              data.tasknum = data.tasknum + 't';
              store.add(data);
            })

            this.publishStore(proids);
          }
        } else {//错误

        }
      },
      scope: this
    })
  },

  //按配方查询分页
  loadmorerecipe: function(view) {
    view.getScrollable().getScroller().on({
      scrollend: this.scrollEnd,
      scope: this
    });
    this.recipeQuery(StoreRecipe.recipe, 0, false);
  },

  scrollEnd: function(scroller, x, y) {
    var recipeView = Ext.Viewport.query('currentstoreview')[0];
    if (!recipeView.getStore().isLoading() && y >= scroller.maxPosition.y) {
      recipeView.setScrollToTopOnRefresh(false);
      var length = recipeView.getStore().getAllCount();
      if(length != 0) {
        this.recipeQuery(StoreRecipe.recipe, length, true);       
      }
    }
  },

	//按配方查询（分页）
	recipeQuery: function(value, length, mark) {
		this.request({
  		bo: 'et.bcp.leader.stock.bo.ProduceStockBo',
  		params: {
  			action: 'queryrecipe',
  			stockdoc_id: null,
  			formul_name: value == "" ? null : value,
  			startnum: length,
  			rows: 15,
        user_id: localStorage.user_id,
  			corp_id: bcpConfig.appcorpid || 'wuzoufen-f76b-4437-a3bd-9f1ab1343dfc'
  		},
  		callback: function(err, flag, message) {
        var store = Ext.StoreMgr.lookup('recipeallstore');
        
        if(store.getAllCount() != 0 && !mark) {
          store.removeAll();
        }
        if(err != null) {

        } else if(flag == 'true' || flag) {
          if(message.length == 0) {
            Toast.toast('没有要查询的数据');
          } else {
            message.forEach(function(data) {
              data.sales_num = data.sales_num + 't';
              data.tasknum = data.tasknum + 't';
              store.add(data);
            })
          }
        } else {
          //flag = false;
        }

  		},
      scope: this
  	})
  },

  //查询发布量
  publishStore: function(proids) {
    Ext.Ajax.request({
      method: 'get',
      timeout: 10000,
      url: bcpConfig.storeURL + '/groupsumvalue',
      disableCaching: false,
      useDefaultXhrHeader: false,
      params: {
        keys: Ext.encode(proids),
        //groups: Ext.encode("bcpgroup"),
        groups: Ext.endcode('stockgroups:'+(localStorage.corp_id||bcpConfig.appcorpid)),
        user_id: Ext.encode(localStorage.user_id)
      },
      callback: function(err, flag, args) {
        console.log(arguments);
        var store = Ext.StoreMgr.lookup('recipeproductionstore');
        var response = Ext.decode(args.responseText);
        for(res in response){
          var value = store.findRecord('region_id', res);
          value.getData().previous_sales = response[res]+'t';
        }
        store.fireEvent('refresh');//用于刷新store
      }
    });
  }
{{/class}}