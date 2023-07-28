import HTMLGenerator from '../HTMLGenerator.ts';
import ICoordinates from '../interfaces/ICoordinates.ts';

class Component {
	protected component: HTMLElement;
	
	constructor() {
		this.component = HTMLGenerator.getDiv();
	};
	
	public getComponent = (): HTMLElement => this.component;
	public deleteComponent = (): void => this.component.remove();
	public getRect = (): DOMRect => this.component.getBoundingClientRect();
	
	public setPosition = (coords: ICoordinates) => {
		this.component.style.top = `${coords.y}px`;
		this.component.style.left = `${coords.x}px`;
	};
}

export default Component;