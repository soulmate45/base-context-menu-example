import ContextMenuOption from './ContextMenuOption.ts';
import ICoordinates from './interfaces/ICoordinates.ts';
import ComponentStorage from './components/ComponentStorage.ts';
import HTMLGenerator from './HTMLGenerator.ts';
import Injector from './injector/Injector.ts';
import '../styles/context-menu/__context-menu-frame.scss';

interface ContextMenuProps {
	rootComponent: HTMLElement,
	componentStorage: ComponentStorage,
	injector: Injector,
}

/** ------------------------------------------------------------------------
 *     Главный класс контексного меню, который выполняет следующие задачи:
 *     - появление меню в поставленных координатах;
 *     - закрытие контекстного меню на левую кнопку мыши;
 *     - создание кнопок и их функционала.
 */
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
	private coords: ICoordinates;
	
	constructor(props: ContextMenuProps) {
		this.component = HTMLGenerator.getDiv();
		this.component.className = this.COMPONENT_FRAME_CLASS_NAME;
		this.componentStorage = props.componentStorage;
		this.injector = props.injector;
		this.root = props.rootComponent;
		this.coords = {x: 0, y: 0};
		
		/** ----------------------------------------
		 *     Создание кнопок в контекстном меню.
		 */
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
	
	/** -----------------------------------------------------------
	 *     Метод, который отвечает за появление контекстного меню.
	 */
	public open = (coordsOutput: ICoordinates, targetComponent: HTMLElement) => {
		this.coords = coordsOutput;
		
		/** --------------------------------------------------------------------------------------------------
		 *     Проверка для кнопки удаления, если вызов контекстного меню произошел не на созданном элементе,
		 *     то кнопка удалить скрывается.
		 */
		if (targetComponent.tagName === 'IMG' || targetComponent.classList.contains('context-menu__text-component')) {
			this.windowDeleteImageOption.show();
		} else {
			this.windowDeleteImageOption.hide();
		}
		
		this.root.append(this.component);
		
		const position = this.coordinateSearch(coordsOutput);
		this.setPositionMenu(position);
	}
	
	/** ----------------------------------------------------------
	 *     Метод, который отвечает за закрытие контекстного меню.
	 */
	public close = () => {
		this.component.remove();
	}
	
	/** ------------------------------------------------------------------------
	 *     Метод, который ищет координаты и задает ограничения, в виде области,
	 *     в которой может открыться контекстное меню.
	 */
	private coordinateSearch = (coords: ICoordinates): ICoordinates => {
		const contextMenuWidth = this.component.offsetWidth;
		const contextMenuHeight = this.component.offsetHeight;
		
		const browserWindowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;
		
		let {x, y} = coords;
		
		if (coords.x + contextMenuWidth > browserWindowWidth) {
			x -= contextMenuWidth;
		}
		
		if (coords.y + contextMenuHeight > windowHeight) {
			y -= contextMenuHeight;
		}
		return {x, y}
	}
	
	/** -----------------------------------------------------------
	 *     Метод, который устанавливает позицию контекстного меню.
	 */
	private setPositionMenu = (coords: ICoordinates, component: HTMLElement = this.component) => {
		component.style.top = `${coords.y}px`;
		component.style.left = `${coords.x}px`;
	}
	
	/** ----------------------------------------------------------------------------------------------
	 *     Следующие методы отвечают за функционал: добавление компонентов и их последующее удаление.
	 */
	
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
