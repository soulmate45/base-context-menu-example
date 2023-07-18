class DeleteWindow {
	private readonly root: HTMLElement;
	
	constructor(rootElement: HTMLElement) {
		this.root = rootElement;
		const img = this.root.querySelector('img');
		
		if (img) {
			img.remove();
		}
	}
	
	
}

export default DeleteWindow;