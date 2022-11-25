// 这里的Vue为Vue对象(非创建出来的实例)，vm为main.js中“Vue.use(httpInterceptor, app)”这一句的第二个参数，
// 为一个Vue的实例，也即每个页面的"this"
// 如果需要了解这个install方法是什么，请移步：https://uviewui.com/components/vueUse.html
const install = (Vue, vm) => {
	// 此为自定义配置参数，具体参数见上方说明
	Vue.prototype.$u.http.setConfig({
		baseUrl: vm.baseUrl,
		loadingText: '努力加载中~',
		loadingTime: 800,
		// 设置自定义头部content-type
		// header: {
		// 	'Authorization': uni.getStorageSync('token')
		// }
		// ......
	});

	// 请求拦截部分，如配置，每次请求前都会执行
	Vue.prototype.$u.http.interceptor.request = (config) => {

		// 方式四，如果token放在了Storage本地存储中，拦截是每次请求都执行的
		// 所以哪怕您重新登录修改了Storage，下一次的请求将会是最新值
		if (config.url === '/prod-api/api/login' || config.url === '/prod-api/api/register') {
			return config
		}
		config.header.Authorization = uni.getStorageSync('token');
		return config;
	}


	// 响应拦截，如配置，每次请求结束都会执行本方法
	Vue.prototype.$u.http.interceptor.response = (res) => {
		const {
			code,
			msg
		} = res
		if (code === 401) {
			vm.$u.toast('登录已过期，请重新登录')
			setTimeout(() => {
				vm.$u.route('/pages/login/login')
			}, 1000)
			return false;
		} else {
			vm.$u.toast(msg);
			return false
		}

	}
}
export default {
	install
}
