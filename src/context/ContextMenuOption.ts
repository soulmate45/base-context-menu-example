import HTMLGenerator from './HTMLGenerator.ts';

/** -------------------------------------------------------------------------------------------------
 *     Класс, который ассистирует классу ContextMenu, он создает кнопки,
 *     которые мы используем в классе ContextMenu, и добавляет обработчик событий addEventListener.
 */
class ContextMenuOption {
	private readonly component: HTMLElement;
	private readonly postClickEvents: (() => void)[];
	
	constructor(buttonText: string) {
		this.component = HTMLGenerator.getDiv();
		this.postClickEvents = [];
		this.component.textContent = buttonText;
		this.component.addEventListener('click', this.onComponentClick);
	}
	
	public getComponent = () => this.component;
	
	public addPostClickEvent = (event: () => void) => {
		this.postClickEvents.push(event);
	};
	
	private onComponentClick = () => {
		this.postClickEvents.forEach(element => {
			element();
		});
	};
	
	/** ------------------------------------------------
	 *     @function show - показывает кнопку удаления,
	 *     @function hide - скрывает кнопку удаления.
	 */
	public show = () => {
		this.component.style.display = 'block';
	};
	
	public hide = () => {
		this.component.style.display = 'none';
	};
	
}

export default ContextMenuOption;