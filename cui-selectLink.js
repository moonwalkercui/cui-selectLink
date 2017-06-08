/*
* 支持动态多级联动
* 支持自定义样式
* 如果使用自定义sql数据，请自定义字段，并更改本人中的id（主键）parent_id（上级id）name（名称）
* 请自行配置uirl
*
*/
;(function($){
  var CuiSelectLink = function(opt,ele){
    this.data = null;
    this.$ele = ele;
    this.index = this.$ele.index();
    this.option = $.extend({},this.opt,opt);
    if(this.option.url == false) alert('数据连接地址未设置');
    this.init();
    // 默认添加省
    this.initArea(this.option.selectItems);

  };
  CuiSelectLink.prototype = {
    opt : {
      "selectItems"   : 0, // 默认选中的区域，多项的话为id的整形数组
      "url"       : false, // 获取数据的连接
      "size"      : 3, // 联动的select个数 默认为3
      "class"     : "c-select", // 生成select的类名
      "name"      : "c-select", // 生成select元素的name
    },
    //生成三个select框,设置省份列表,并选中默认参数里的省市区
    init : function(){
      var _this = this;
      for(var i = 0;i<this.option.size;i++){
        var $select = $('<select></select>');
        var $option = $('<option></option>');
        $select.attr('name',this.option.name+i).addClass(this.option.class);
        $option.text('请选择').appendTo($select);
        $select.appendTo(this.$ele);
        $select.bind('change',function () {
          _this.onChange($(this).find("option:selected"));
        });
      }
    },
    // 选中默认参数里的省市区
    initArea : function(selectItems){
      var $first = this.$ele.find('select:first');
      this.getData(0,$first);
      var _this = this;
      if(this.option.selectItems != 0 && $.isArray(this.option.selectItems)){
        this.option.selectItems.map(function (val,index) {
          _this.getData(val,_this.$ele.children().eq(index+1));
        });
      }
    },
    getData : function ( id , $ele ) {
      var _this = this;
      $.get(this.option.url, {"id":id},function(data){
        _this.makeContent( data , $ele );
      });
    },
    makeContent : function(data,$ele){
      var _this = this,
          selected = this.option.selectItems,
          dom ='';
      $.each(data,function(i,n){
        if(selected[$ele.index()] == n.id && $.isArray(_this.option.selectItems)){
          dom += "<option value='"+n.id+"' data-pid='"+n.parent_id+"' selected>"+n.name+"</option>";
        }else{
          dom += "<option value='"+n.id+"' data-pid='"+n.parent_id+"'>"+n.name+"</option>";
        }
      });
      $ele.append(dom);
    },
    onChange : function($dom){
      var id = $dom.val();
      var $select = $dom.parent('select');
      var lev = parseInt($select.index()) + 1;
      var $next = this.$ele.children().eq(lev);
      if(id == '') return;
      this.optionFresh(this.$ele.children().slice(lev,this.option.size));
      if(this.option.size > lev) this.getData(id , $next);
    },
    optionFresh : function($doms){
      $doms.html('<option value="">请选择</option>');
    }
  };
  $.fn.extend({
    CuiSelectLink : function(opt){
      this.each(function () {
        new CuiSelectLink(opt,$(this));
      })
    }
  });
})(jQuery);