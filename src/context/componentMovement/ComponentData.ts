import Component from '../components/Component.ts';
import ComponentMover from './ComponentMover.ts';
import Coordinates from '../interfaces/Coordinates.ts';

class ComponentData {
	private component: Component | null;
	private coords : Coordinates | null;
	private readonly componentMover: ComponentMover;
	private offset: Coordinates;
	
	constructor () {
		this.component = null;
		this.coords = null;
		this.componentMover = new ComponentMover();
		this.offset = { x: 0, y: 0 };
	}
	
	public setComponent = (components: Component, coords: Coordinates) => {
		this.component = components;
		const rect = this.component.getRect();
		this.offset.x = coords.x - rect.x;
		this.offset.y = coords.y - rect.y;
	}
	
	public setCoordinates = (coordsOutput: Coordinates) => {
		this.coords = {
			x: coordsOutput.x - this.offset.x,
			y: coordsOutput.y - this.offset.y,
		};
	}
	public end = () => {
		this.component = null;
	}
	
	public callMoveComponent = () => {
		if (this.coords && this.component) {
			this.componentMover.moveComponent(this.coords, this.component);
		}
	}
}
export default ComponentData;