class ContextMenu {
	private readonly root: HTMLElement;
	private readonly element: HTMLElement;

	constructor(rootElement: HTMLElement) {
		this.element = document.createElement('div');
		this.element.className = 'context-menu';
		this.root = rootElement;
	}

	public open = (clientX: number, clientY: number) => {
		this.root.append(this.element);
		this.element.style.top = `${clientY}px`;
		this.element.style.left = `${clientX}px`;
	}

	public close = () => {
		this.element.remove();
	}
}

export default ContextMenu;
