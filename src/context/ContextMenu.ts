import ContextMenuOption from './ContextMenuOption.ts';
import Coordinates from './interfaces/Coordinates.ts';
import ComponentStorage from './components/ComponentStorage.ts';
import HTMLGenerator from './HTMLGenerator.ts';
import Injector from './injector/Injector.ts';
import '../styles/context-menu/__context-menu-frame.scss';

interface ContextMenuProps {
	rootComponent: HTMLElement,
	componentStorage: ComponentStorage,
	injector: Injector,
}

class ContextMenu {
	private readonly ADD_IMAGE_BUTTON = 'Добавить картинку';
	private readonly ADD_TEXT_BUTTON = 'Добавить текст'
	private readonly DELETE_BUTTON = 'Удалить';
	
	private readonly COMPONENT_FRAME_CLASS_NAME = 'context-menu__frame';
	
	private readonly root: HTMLElement;
	private readonly component: HTMLElement;
	private readonly windowAddImageOption: ContextMenuOption;
	private readonly windowAddTextOption: ContextMenuOption;
	private readonly windowDeleteImageOption: ContextMenuOption;
	private readonly componentStorage: ComponentStorage;
	private readonly injector: Injector;
	private coords: Coordinates;
	
	
	constructor(props: ContextMenuProps) {
		this.component = HTMLGenerator.getDiv();
		this.component.className = this.COMPONENT_FRAME_CLASS_NAME;
		this.componentStorage = props.componentStorage;
		this.injector = props.injector;
		this.root = props.rootComponent;
		this.coords = { x: 0, y: 0 };
		
		this.windowAddImageOption = new ContextMenuOption(this.ADD_IMAGE_BUTTON);
		this.windowAddImageOption.addPostClickEvent(this.onAddImageClick);
		
		this.windowAddTextOption = new ContextMenuOption(this.ADD_TEXT_BUTTON);
		this.windowAddTextOption.addPostClickEvent(this.onAddTextClick)
		
		this.windowDeleteImageOption = new ContextMenuOption(this.DELETE_BUTTON);
		this.windowDeleteImageOption.addPostClickEvent(this.onDeleteClick);
		
		this.component.append(
			this.windowAddImageOption.getComponent(),
			this.windowAddTextOption.getComponent(),
			this.windowDeleteImageOption.getComponent(),
		);
	}

	public open = (coordsOutput: Coordinates, targetComponent: HTMLElement) => {
		this.coords = coordsOutput;
		
		if (targetComponent.tagName === 'IMG' || targetComponent.classList.contains('context-menu__text-component')) {
			this.windowDeleteImageOption.show();
		} else {
			this.windowDeleteImageOption.hide();
		}
		
		this.root.append(this.component);
		
		const position = this.coordinateSearch(coordsOutput);
		this.setPositionMenu(position);
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
	
	private setPositionMenu = (coords: Coordinates, component: HTMLElement = this.component) => {
		component.style.top = `${coords.y}px`;
		component.style.left =`${coords.x}px`;
	}
	
	private addPictureComponent = () => {
		const image = this.injector.injectImage(this.coords);
		this.root.append(image);
	}
	
	private onAddImageClick = () => {
		this.addPictureComponent();
	}
	
	private addTextComponent = () => {
		const text = this.injector.injectText(this.coords);
		this.root.append(text);
	}
	
	private onAddTextClick = () => {
		this.addTextComponent();
	}
	
	private deleteComponentClick = () => {
		this.componentStorage.deleteComponentAt(this.coords);
	}
	
	private onDeleteClick = () => {
		this.deleteComponentClick();
	}
	
}

export default ContextMenu;
