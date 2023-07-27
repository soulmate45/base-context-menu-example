import HTMLGenerator from "../HTMLGenerator.ts";
import Coordinates from "../interfaces/Coordinates.ts";

class Component {
	protected component: HTMLElement;
	
	constructor() {
		this.component = HTMLGenerator.getDiv();
	}
	
	public getComponent = (): HTMLElement => this.component;
	public deleteComponent = (): void => this.component.remove();
	public getRect = (): DOMRect => this.component.getBoundingClientRect();
	
	public setPosition = (coords: Coordinates, component: HTMLElement) =>{
		component.style.top = `${coords.y}px`;
		component.style.left =`${coords.x}px`;
	}
}
export default Component;