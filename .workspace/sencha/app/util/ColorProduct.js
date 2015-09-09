/*
	用于获取固定的几种颜色
*/
Ext.define('VisLeader.util.ColorProduct', {  singleton: true,
  alternateClassName: 'ColorProduct',
  color: ['#B15BFF', '#ff7575', '#6A6AFF', '#00FFFF', '#79FF79', '#FF95CA', '#FF9D6F', '#C2FF68', '#FFE66F', '#C07AB8', '#81C0C0'],
  
  getColor: function(id) {
  	return this.color[id];
  }

});