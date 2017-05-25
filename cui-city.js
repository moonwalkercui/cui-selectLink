/*
* 支持动态多级联动
* 支持自定义样式
* 如果使用自定义sql数据，请自定义字段，并更改本人中的area_id（主键）area_parent_id（上级id）area_name（名称）
* 请自行配置uirl
*
*
*/
;(function($){
  var CuiCity = function(opt,ele){
    this.data = null;
    this.$ele = ele;
    this.index = this.$ele.index();
    this.option = $.extend({},this.opt,opt);
    if(this.option.url == false) alert('数据连接地址未设置');
    this.init();
    // 默认添加省
    this.initArea(this.option.selectItems);

  };
  CuiCity.prototype = {
    opt : {
      "selectItems"   : 0, // 默认选中的区域，可为数字数组
      "url"       : false, // 获取数据的连接
      "size"      : 4, // 几级联动
      "class"     : "c-select", // select的类名
    },
    //生成三个select框,设置省份列表,并选中默认参数里的省市区
    init : function(){
      var _this = this;
      for(var i = 0;i<this.option.size;i++){
        var $select = $('<select></select>');
        var $option = $('<option></option>');
        $select.attr('name','c-select'+i).addClass(this.option.class);
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
        if(selected[$ele.index()] == n.area_id && $.isArray(_this.option.selectItems)){
          dom += "<option value='"+n.area_id+"' data-pid='"+n.area_parent_id+"' selected>"+n.area_name+"</option>";
        }else{
          dom += "<option value='"+n.area_id+"' data-pid='"+n.area_parent_id+"'>"+n.area_name+"</option>";
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
      // this.$ele.children().eq(lev+1).css({ "color": "#ff0011", "background": "blue" });return;
    },
    optionFresh : function($doms){
      $doms.html('<option value="">请选择</option>');
    }
  };
  $.fn.extend({
    CuiCity : function(opt){
      this.each(function () {
        new CuiCity(opt,$(this));
      })
    }
  });
})(jQuery);