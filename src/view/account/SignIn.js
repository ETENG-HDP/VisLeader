//登录界面
{{#class 'Ext.form.Panel'}}
  xtype: 'signin',
  requires: [
    'Ext.Button',
    'Ext.form.FieldSet',
    'Ext.field.Text',
    'Ext.field.Password'
  ],
  config:{
    scrollable: null,
    layout: 'vbox',
    items: [
      {
        xtype: 'component',
        flex: 1
      },
      {
        xtype: 'component',
        cls: 'ad'
      },
      {
        xtype: 'fieldset',
        items: [
          {
		    xtype: 'textfield',
		    name: 'corpcode',
		    label: '公司账号',
		    placeHolder: '请输入您的公司账号'
		  },
          {
            xtype: 'textfield',
            name: 'username',
            label: '用户名',
            placeHolder: '请输入您的手机号码'
          },
          {
            xtype: 'passwordfield',
            name: 'password',
            label: '密码',
            placeHolder: '请输入您的账户密码'
          }
        ]
      },
      {
        layout: 'hbox',
        items: [
          {
            xtype: 'button',
            margin: '0 0 0 .5em',
            text: '注册',
            flex: 1,
            handler:function(){
              //Ext.Viewport.fireEvent 'signup'
              Ext.Viewport.fireEvent ('registRegion');
            }
          },
          {
            xtype: 'button',
            ui: 'confirm',
            margin: '0 .5em',
            iconCls: '',
            text: '登录',
            flex: 1,
            handler:function(){
              form = this.up('signin');
              message = form.getValues();
              Ext.Viewport.fireEvent ('login', message.username, message.password,message.corpcode);
            }
          }
        ]
      },
      {
        xtype: 'component',
        flex: 1
      }
    ]
  }
{{/class}}