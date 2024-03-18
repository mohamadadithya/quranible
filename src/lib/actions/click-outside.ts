const clickOutside = (element: HTMLElement, callback: () => void) => {
	const onClick = (event: Event) => {
		const targetEl = event.target as HTMLElement;
		if (!element.contains(targetEl)) callback();
	};

	const documentEl = document.documentElement as HTMLElement;
	documentEl.addEventListener('click', onClick);

	return {
		update: (newCallback: () => void) => (callback = newCallback),
		destroy: () => documentEl.removeEventListener('click', onClick)
	};
};

export { clickOutside };
