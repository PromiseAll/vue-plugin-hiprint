import {hiprint, defaultElementTypeProvider} from './hiprint/hiprint.bundle.js'
require('./hiprint/hiprint.config')

/**
 * 使用 hiprint 提供的 jq-3.31
 * 见webpack.config
 * alias: {
 *     'jquery$': path.resolve(__dirname, "./src/hiprint/plugins/jq-3.31.js")
 *   },
 * plugins: [
 *    new webpack.ProvidePlugin({
 *     jQuery: "jquery",
 *     $: "jquery"
 *   }),
 * ]
 */
function initJquery() {
  if (window !== undefined) {
    window.jQuery = window.$ = jQuery;
    window.autoConnect = true;
  }
}

function initConfig() {

}

initJquery()

/**
 * 自动连接 / 连接
 */
let autoConnect = function() {
  console.log('autoConnect');
  window.autoConnect = true;
  window.hiwebSocket && window.hiwebSocket.hasIo() && window.hiwebSocket.start();
};

/**
 * 取消自动连接 / 断开连接
 */
let disAutoConnect = function() {
  console.log('disAutoConnect');
  window.autoConnect = false;
  window.hiwebSocket && window.hiwebSocket.hasIo() && window.hiwebSocket.stop();
};

let hiPrintPlugin = {
  disAutoConnect,
  install: function (Vue, name = '$hiPrint', autoConnect = true) {
    if (!autoConnect) {
      disAutoConnect();
    }
    Object.defineProperty(Vue.prototype, name, {value: hiprint});
	// Vue.component(HiPrint.name, HiPrint) // printPanel.name 组件的name属性
	/**
   * 预览打印，调起系统打印预览
	 * provider 左侧拖拽元素
	 * template 模版json字符串
	 * args 打印数据data, options,
	 */
	 Vue.prototype.$print = function (provider = defaultElementTypeProvider, template, ...args) {
		 hiprint.init({
			providers: [new provider()]
		});
		var hiprintTemplate = new hiprint.PrintTemplate({
			template: template,
		});
		hiprintTemplate.print(...args);
		return hiprintTemplate;
	 }
	 /**
    * 单模版直接打印， 需客户端支持
	  * provider 左侧拖拽项对象
	  * template 模版json字符串
	  * args 打印数据data, options,
	  */
	 Vue.prototype.$print2 = function (provider = defaultElementTypeProvider, template, ...args) {
		 hiprint.init({
			providers: [new provider()]
		});
		var hiprintTemplate = new hiprint.PrintTemplate({
			template: template,
		});
		hiprintTemplate.print2(...args);
		return hiprintTemplate;
	 }
  }
}

export {
  autoConnect,
  disAutoConnect,
  hiprint,
  hiPrintPlugin,
  defaultElementTypeProvider,
}


