
class ContextMenuOption {
	
	private readonly element: HTMLElement
	private readonly postClickEvents: (() => void)[];
	
	constructor (buttonText: string) {
		this.element = document.createElement('div');
		this.postClickEvents=[];
		this.element.textContent = buttonText;
		this.element.addEventListener('click', this.onElementClick);
	}
	
	public getElement = () => this.element;
	
	public addPostClickEvent = (event: () => void) => {
		this.postClickEvents.push(event);
	}
	
	private onElementClick = () => {
		this.postClickEvents.forEach(element => {
			element();
		});
	}
}

export default ContextMenuOption;