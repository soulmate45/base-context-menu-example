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

	public open = (clientX: number, clientY: number, target: EventTarget | null) => {
		if (target instanceof HTMLImageElement) {
			this.deleteWindowOption.style.display = 'block';
		} else {
			this.deleteWindowOption.style.display = 'none';
		}
		this.root.append(this.element);
		
		const menuWidth = this.element.offsetWidth;
		const menuHeight = this.element.offsetHeight;
		
		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		
		if (clientX + menuWidth > windowWidth) {
			clientX -= menuWidth;
		}
		
		if (clientY + menuHeight > windowHeight) {
			clientY -= menuHeight;
		}
		
		this.element.style.top = `${clientY}px`;
		this.element.style.left = `${clientX}px`;
	}

	public close = () => {
		this.element.remove();
	}
	
}

export default ContextMenu;
