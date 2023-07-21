
class ContextMenuOption {
	
	private readonly component: HTMLElement
	private readonly postClickEvents: (() => void)[];
	
	constructor (buttonText: string) {
		this.component = document.createElement('div');
		this.postClickEvents=[];
		this.component.textContent = buttonText;
		this.component.addEventListener('click', this.onElementClick);
	}
	
	public getElement = () => this.component;
	
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