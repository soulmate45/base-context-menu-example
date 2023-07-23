
class ContextMenuOption {
	
	private readonly component: HTMLElement
	private readonly postClickEvents: (() => void)[];
	
	constructor (buttonText: string) {
		this.component = document.createElement('div');
		this.postClickEvents=[];
		this.component.textContent = buttonText;
		this.component.addEventListener('click', this.onComponentClick);
	}
	
	public getComponent = () => this.component;
	
	public addPostClickEvent = (event: () => void) => {
		this.postClickEvents.push(event);
	}
	
	private onComponentClick = () => {
		this.postClickEvents.forEach(element => {
			element();
		});
	}
	
	public show() {
		this.component.style.display = 'block';
	}
	
	public hide() {
		this.component.style.display = 'none';
	}
	
}

export default ContextMenuOption;