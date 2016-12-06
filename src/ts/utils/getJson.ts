export default (url: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		var xhr = new XMLHttpRequest();

		xhr.open('GET', url, true);

		xhr.onload = () => {
			if (xhr.status === 200 || xhr.status === 304) {
				resolve(xhr.responseText);
			} else {
				reject(xhr.status);
			}
		}

		xhr.onerror = () => {
			reject(new Error('Network Error'));
		}

		xhr.send();
	});
}