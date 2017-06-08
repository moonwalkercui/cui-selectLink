# cui-selectLink

## 支持动态多级联动JQ插件
* 支持自定义样式class
* 支持自定义内容三级select联动
* 如果使用自定义sql数据，请自定义字段，主要字段命名为：id（主键）parent_id（上级id）name（名称），默认自动获取parent_id为0的数据
* 请自行配置获取json数据的url
* 提供了一个sql文件供使用
* 动态多级联动 多级城市 JQ插件 select linkage jq

## JS调用
  ``
  <script src="../jquery.min.js"></script>
  <script src="cui-selectLink.js"></script>

  <div class="cui-city"></div>
  <div class="cui-city2"></div>

  <script>
  $(function(){
    $('.cui-city').CuiSelectLink({ "size" : 2  , "selectItems" : [ 4 , 87 , 1327 ] ,"class" : "btn_submit", "url" : "/getcity.html"});
    $('.cui-city2').CuiSelectLink({ "size" : 2  , "url" : "/getcity.html" });
  });
  </script>
    ``
## 参数规范

元素调用："$(选择器).CuiSelectLink({参数});"

*	  "selectItems"   : 0, // 默认选中的区域，为数组，如'[ 4 , 87 , 1327 ]'
*   "url"       : false, // 获取json数据的连接 自行搭建
*   "size"      : 3, // 联动的select个数 默认为3
*   "class"     : "c-select", // 生成select的类名
*   "name"      : "c-select", // 生成select元素的name

## JSON数据

* 提供了一个sql文件标准，可以直接使用，内容为中国省市区数据，注意别名一下area_id as id,area_parent_id as parent_id,area_name as name
* 如果使用自定义sql数据，请自定义字段，并更改js文件中的id（主键）parent_id（上级id）name（名称）

## 联系作者

* 作者：xiangrui
* 541720500@qq.com