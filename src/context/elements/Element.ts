import Coordinates from "../Coordinates";

class Element {
	private readonly coords: Coordinates;
	protected element: HTMLElement;
	
	constructor(coordsOutput: Coordinates) {
		this.coords = coordsOutput
		this.element = document.createElement('div')
	}
	
	public getElement = (): HTMLElement => this.element;
	public deleteElement = (): void => this.element.remove();
	public getCoords = (): Coordinates => this.coords;
	
}
export default Element;