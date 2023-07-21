import ContextMenuOption from './ContextMenuOption.ts';
import Coordinates from './Coordinates.ts';
import PictureComponent from './components/PictureComponent.ts';
import TextComponent from './components/TextComponent.ts';
import ComponentStorage from './components/ComponentStorage.ts';
import '../styles/context-menu/__context-menu-frame.scss';
import HTMLGenerator from './HTMLGenerator.ts';

interface ContextMenuProps {
	rootComponent: HTMLElement,
}

class ContextMenu {
	private readonly ADD_IMAGE_BUTTON = 'Добавить картинку';
	private readonly ADD_TEXT_BUTTON = 'Добавить текст'
	private readonly DELETE_BUTTON = 'Удалить';
	
	private readonly COMPONENT_CLASS_NAME = 'context-menu__frame';
	
	private readonly root: HTMLElement;
	private readonly component: HTMLElement;
	private readonly windowAddImageOption: ContextMenuOption;
	private readonly windowAddTextOption: ContextMenuOption;
	private readonly windowDeleteImageOption: ContextMenuOption;
	// private readonly windowDeleteTextOption: ContextMenuOption;
	private readonly componentStorage: ComponentStorage;
	private coords: Coordinates;
	
	
	constructor(props: ContextMenuProps) {
		this.component = HTMLGenerator.getDiv();
		this.component.className = this.COMPONENT_CLASS_NAME;
		this.componentStorage = new ComponentStorage();
		this.root = props.rootComponent;
		this.coords = { x: 0, y: 0 };
		
		this.windowAddImageOption = new ContextMenuOption(this.ADD_IMAGE_BUTTON);
		this.windowAddImageOption.addPostClickEvent(this.onAddImageClick);
		
		this.windowAddTextOption = new ContextMenuOption(this.ADD_TEXT_BUTTON);
		this.windowAddTextOption.addPostClickEvent(this.onAddTextClick)
		
		this.windowDeleteImageOption = new ContextMenuOption(this.DELETE_BUTTON);
		this.windowDeleteImageOption.addPostClickEvent(this.onDeleteImageClick);
		
		this.component.append(
			this.windowAddImageOption.getComponent(),
			this.windowAddTextOption.getComponent(),
			this.windowDeleteImageOption.getComponent(),
		);
	}

	public open = (coordsOutput: Coordinates) => {
		this.coords = coordsOutput;
		this.root.append(this.component);
		
		const position = this.coordinateSearch(coordsOutput);
		this.setPosition(position);
	}
	
	public close = () => {
		this.component.remove();
	}
	
	private coordinateSearch = (coords: Coordinates): Coordinates => {
		const contextMenuWidth = this.component.offsetWidth;
		const contextMenuHeight = this.component.offsetHeight;
		
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
	
	private setPosition = (coords: Coordinates, component: HTMLElement = this.component) => {
		const positionX = `${coords.x}px`;
		const positionY = `${coords.y}px`;
		
		component.style.left = positionX;
		component.style.top = positionY;
	}
	
	private addPictureComponent = () => {
		const pictureComponent = new PictureComponent(this.coords);
		this.componentStorage.addElement(pictureComponent);
		const image = pictureComponent.getComponent();
		this.root.append(image);
		this.setPosition(this.coords, image);
	}
	
	private onAddImageClick = () => {
		this.addPictureComponent();
	}
	
	private addTextComponent = () => {
		const textComponent = new TextComponent(this.coords);
		this.componentStorage.addElement(textComponent);
		const text = textComponent.getComponent();
		this.root.append(text);
		this.setPosition(this.coords, text);
	}
	
	private onAddTextClick = () => {
		this.addTextComponent();
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
