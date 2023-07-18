import DeleteWindow from './DeleteWindow.ts';
import AddWindow from "./AddWindow.ts";

class ContextMenu {
	private readonly root: HTMLElement;
	private readonly element: HTMLElement;
	private readonly addWindowOption: HTMLElement;
	private readonly deleteWindowOption: HTMLElement;

	constructor(rootElement: HTMLElement) {
		this.element = document.createElement('div');
		this.element.className = 'context-menu';
		this.root = rootElement;
		
		this.addWindowOption = document.createElement('div');
		this.addWindowOption.textContent = 'Добавить окно'
		this.addWindowOption.className = 'add-window'
		this.addWindowOption.addEventListener('click', () => {
			new AddWindow(this.root)
		});
		this.element.append(this.addWindowOption);
		
		this.deleteWindowOption = document.createElement('div');
		this.deleteWindowOption.textContent = 'Удалить'
		this.deleteWindowOption.className = 'delete-window'
		this.deleteWindowOption.addEventListener('click', () => {
			new DeleteWindow(this.root);
		});
		this.element.append(this.deleteWindowOption);
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
