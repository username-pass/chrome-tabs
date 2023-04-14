var tabContent = document.querySelector('.mock-browser-content');
var urlBar = document.querySelector('.chrome-tabs-url-bar');
var urlInput = document.querySelector('.url-input');
var el = document.querySelector('.chrome-tabs');
var chromeTabs = new ChromeTabs()
var defaultTab = 'w://new-tab';
chromeTabs.init(el)

chromeTabs.addTab({
	title: 'Google',
	favicon: 'demo/images/google-favicon.ico',
	url: 'https://google.com'
});
chromeTabs.addTab({
	title: 'Facebook',
	favicon: 'demo/images/facebook-favicon.ico',
	url: 'https://facebook.com'
});

el.addEventListener('activeTabChange', ({ detail }) => {
	console.log('Active tab changed', detail.tabEl.getAttribute('url'));
	tabContent.innerText = detail.tabEl.getAttribute('url');
})
el.addEventListener('tabAdd', ({ detail }) => console.log('Tab added', detail.tabEl))
el.addEventListener('tabRemove', ({ detail }) => console.log('Tab removed', detail.tabEl))

urlInput.addEventListener('keydown', (e) => {
	if (e.key == 'Enter') {
		let url = urlInput.value;
		//console.log(url)
		if (e.shiftKey) {
			chromeTabs.addTab({
				title: 'New Tab',
				favicon: false,
				url
			});
		} else {
			let properties = chromeTabs.getProperties(chromeTabs.activeTabEl);
			properties = JSON.parse(properties);
			console.log(properties);
			properties.url = url;
			chromeTabs.updateTab(chromeTabs.activeTabEl,properties)
			tabContent.innerText = chromeTabs.activeTabEl.getAttribute('url');
		}
		urlInput.value = '';
	}
})

document.querySelector('button[data-add-tab]').addEventListener('click', _ => {
	chromeTabs.addTab({
		title: 'New Tab',
		favicon: false,
		url: defaultTab
	})
})

document.querySelector('button[data-add-background-tab]').addEventListener('click', _ => {
	chromeTabs.addTab({
		title: 'New Tab',
		favicon: false,
		url: defaultTab
	}, {
		background: true
	})
})

document.querySelector('button[data-remove-tab]').addEventListener('click', _ => {
	chromeTabs.removeTab(chromeTabs.activeTabEl)
})

document.querySelector('button[data-theme-toggle]').addEventListener('click', _ => {
	if (el.classList.contains('chrome-tabs-dark-theme')) {
		document.documentElement.classList.remove('dark-theme')
		el.classList.remove('chrome-tabs-dark-theme')
	} else {
		document.documentElement.classList.add('dark-theme')
		el.classList.add('chrome-tabs-dark-theme')
	}
})

window.addEventListener('keydown', (event) => {
	if (event.ctrlKey && event.key === 't') {
		chromeTabs.addTab({
			title: 'New Tab',
			favicon: false,
			url: defaultTab
		})
	}
})