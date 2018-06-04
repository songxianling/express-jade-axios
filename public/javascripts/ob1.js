
/**
 * 存储localStorage
 */
window.setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
window.getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
window.removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}