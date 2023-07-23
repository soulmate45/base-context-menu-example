import Coordinates from '../interfaces/Coordinates.ts';

class Component {
	private readonly coords: Coordinates;
	protected component: HTMLElement;
	
	constructor(coordsOutput: Coordinates) {
		this.coords = coordsOutput;
		this.component = document.createElement('div');
	}
	
	public getComponent = (): HTMLElement => this.component;
	public deleteComponent = (): void => this.component.remove();
	public getRect = (): DOMRect => this.component.getBoundingClientRect();
	
}
export default Component;