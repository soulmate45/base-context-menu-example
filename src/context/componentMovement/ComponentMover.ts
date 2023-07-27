import Coordinates from '../interfaces/Coordinates.ts';
import Component from '../components/Component.ts';

class ComponentMover {
	private component: Component | null;
	private cords: Coordinates | null;
	
	constructor () {
		this.component = null;
		this.cords = null;
	}
	
	public moveComponent = (coordsOutput: Coordinates, componentOutput: Component) => {
		this.cords = coordsOutput;
		this.component = componentOutput;
		this.component.setPosition(this.cords, this.component.getComponent());
	}
}

export default ComponentMover;