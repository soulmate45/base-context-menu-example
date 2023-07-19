import ContextMenuOption from "./ContextMenuOption.ts";
import AddWindow from "./AddWindow.ts";
import DeleteWindow from "./DeleteWindow.ts";

interface Coordinates {
	x: number;
	y: number;
}

class ContextMenu {
	private readonly ADD_BUTTON_TEXT = 'Добавить окно';
	private readonly DELETE_BUTTON_TEXT = 'Удалить';
	
	private readonly root: HTMLElement;
	private readonly element: HTMLElement;
	private readonly windowAddOption: ContextMenuOption;
	private readonly windowDeleteOption: ContextMenuOption;

	constructor(rootElement: HTMLElement) {
		this.element = document.createElement('div');
		this.element.className = 'context-menu';
		this.root = rootElement;
		
		this.windowAddOption = new ContextMenuOption(this.ADD_BUTTON_TEXT, this.onAddImage);
		this.windowDeleteOption = new ContextMenuOption(this.DELETE_BUTTON_TEXT, this.onDeleteImage);
		
		this.element.append(
			this.windowAddOption.getElement(),
			this.windowDeleteOption.getElement(),
		);
		
	}

	public open = (coords: Coordinates, target: EventTarget | null) => {
		
		//TODO ВСЕ ХУЙНЯ, ДАВАЙ ПО НОВОЙ.
		if (target instanceof HTMLImageElement) {
			this.windowDeleteOption.style.display = 'block';
		} else {
			this.windowDeleteOption.style.display = 'none';
		}
		this.root.append(this.element);
		//TODO ---
		
		this.coordinateSearch(coords)
	}
	
	private coordinateSearch = (coords: Coordinates) => {
		const contextMenuWidth = this.element.offsetWidth;
		const contextMenuHeight = this.element.offsetHeight;
		
		const browserWindowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		
		let left = coords.x;
		let top = coords.y;
		
		if (coords.x + contextMenuWidth > browserWindowWidth) {
			left -= contextMenuWidth;
		}
		
		if (coords.y + contextMenuHeight > windowHeight) {
			top -= contextMenuHeight;
		}
		this.emergenceContexMenu( { x: left, y: top });
	}
	
	private emergenceContexMenu = (coords: Coordinates) => {
		const positionX = `${coords.x}px`
		const positionY = `${coords.y}px`
		
		this.element.style.left = positionX;
		this.element.style.top = positionY;
	}

	public close = () => {
		this.element.remove();
	}
	
	private onAddWindowClick = () => {
		new AddWindow(this.root)
	}

	private onDeleteWindowClick = () => {
		new DeleteWindow(this.root);
	}
}

export default ContextMenu;
