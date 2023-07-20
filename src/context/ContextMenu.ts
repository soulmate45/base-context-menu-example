import ContextMenuOption from './ContextMenuOption.ts';
import Coordinates from './Coordinates.ts';
import PictureElement from './elements/PictureElement.ts';
import TextElement from './elements/TextElement.ts';
import '../styles/context-menu/__context-menu-frame.scss'
import ElementStorage from './elements/ElementStorage.ts';

interface ContextMenuProps {
	rootElement: HTMLElement,
}

class ContextMenu {
	private readonly ADD_IMAGE_BUTTON = 'Добавить картинку';
	private readonly ADD_TEXT_BUTTON = 'Добавить текст'
	private readonly DELETE_BUTTON = 'Удалить';
	
	private readonly root: HTMLElement;
	private readonly element: HTMLElement;
	private readonly windowAddImageOption: ContextMenuOption;
	private readonly windowAddTextOption: ContextMenuOption;
	private readonly windowDeleteImageOption: ContextMenuOption;
	// private readonly windowDeleteTextOption: ContextMenuOption;
	private readonly elementStorage: ElementStorage;
	private coords: Coordinates;
	
	
	constructor(props: ContextMenuProps) {
		this.element = document.createElement('div');
		this.element.className = 'context-menu__frame';
		this.elementStorage = new ElementStorage();
		this.root = props.rootElement;
		this.coords = { x: 0, y: 0 };
		
		this.windowAddImageOption = new ContextMenuOption(this.ADD_IMAGE_BUTTON);
		this.windowAddImageOption.addPostClickEvent(this.onAddImageClick);
		
		this.windowAddTextOption = new ContextMenuOption(this.ADD_TEXT_BUTTON);
		this.windowAddTextOption.addPostClickEvent(this.onAddTextClick)
		
		this.windowDeleteImageOption = new ContextMenuOption(this.DELETE_BUTTON);
		this.windowDeleteImageOption.addPostClickEvent(this.onDeleteImageClick);
		
		this.element.append(
			this.windowAddImageOption.getElement(),
			this.windowAddTextOption.getElement(),
			this.windowDeleteImageOption.getElement(),
		);
	}

	public open = (coordsOutput: Coordinates) => {
		this.coords = coordsOutput;
		
		const position = this.coordinateSearch(coordsOutput);
		this.setPosition(position);
		
		this.root.append(this.element);
	}
	
	public close = () => {
		this.element.remove();
	}
	
	private coordinateSearch = (coords: Coordinates): Coordinates => {
		const contextMenuWidth = this.element.offsetWidth;
		const contextMenuHeight = this.element.offsetHeight;
		
		const browserWindowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		
		let { x, y } = coords;
		
		if (coords.x + contextMenuWidth > browserWindowWidth) {
			x -= contextMenuWidth;
		}
		
		if (coords.y + contextMenuHeight > windowHeight) {
			y -= contextMenuHeight;
		}
		return { x, y }
	}
	
	private setPosition = (coords: Coordinates, element: HTMLElement = this.element) => {
		const positionX = `${coords.x}px`;
		const positionY = `${coords.y}px`;
		
		element.style.left = positionX;
		element.style.top = positionY;
	}
	
	private addPictureElement = () => {
		const pictureElement = new PictureElement(this.coords);
		this.elementStorage.addElement(pictureElement);
		const image = pictureElement.getElement();
		this.root.append(image);
		this.setPosition(this.coords, image);
	}
	
	private onAddImageClick = () => {
		this.addPictureElement();
	}
	
	private addTextElement = () => {
		const textElement = new TextElement(this.coords);
		this.elementStorage.addElement(textElement);
		const text = textElement.getElement();
		this.root.append(text);
		this.setPosition(this.coords, text);
	}
	
	private onAddTextClick = () => {
		this.addTextElement();
	}
	
	private deleteImageElement = () => {
	
	}
	
	private onDeleteImageClick = () => {
		this.deleteImageElement();
	}
	
	// private deleteTextElement = () => {
	//
	// }
	
	// private onDeleteTextClick = () => {
	// 	this.deleteTextElement();
	// }
	
}

export default ContextMenu;
