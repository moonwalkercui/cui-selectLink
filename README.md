# selectLink

## 支持动态多级联动JQ插件
* 支持自定义样式class
* 支持自定义内容三级select联动
* 如果使用自定义sql数据，请自定义字段，并更改本文中的area_id（主键）area_parent_id（上级id）area_name（名称）
* 请自行配置获取json数据的url
* 提供了一个sql文件供使用
* 动态多级联动 多级城市 JQ插件 select linkage jq

## HTML规范
	```
	<script src="../jquery.min.js"></script>
  	<script src="cui-city.js"></script>
  	<script">
	$(function(){
      $('.cui-city').CuiCity({ "selectItems" : [ 4 , 87 , 1327 ] ,"class" : "btn_submit"});
      $('.cui-city2').CuiCity({ "size" : 2  , "url" : "/getcity.html" });
    });
    </script>
    ```
## 参数规范

* 	js调用：$(选择器).CuiCity({参数});
*	"selectItems"   : 0, // 默认选中的区域，可以为数组，如'[ 4 , 87 , 1327 ]'
*   "url"       : false, // 获取json数据的连接 自行搭建
*   "size"      : 4, // 联动的select个数
*   "class"     : "c-select", // select的类名

## JSON规范

* 提供了一个sql文件标准，可以直接使用，内容为中国省市区数据
* 如果使用自定义sql数据，请自定义字段，并更改js文件中的area_id（主键）area_parent_id（上级id）area_name（名称）

## 联系作者：541720500@qq.com