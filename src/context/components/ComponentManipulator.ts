import Component from '../components/Component.ts';
import ICoordinates from '../interfaces/ICoordinates.ts';

/** ------------------------------------------------------------------------------------------------------------
 *     Класс, отвечающий за перенос компонента по экрану,
 *     сохраняет в себе компонент, который будет перемещатся, и координаты по которым он будет это выполнять.
 */
class ComponentManipulator {
	private component: Component | null;
	private coords: ICoordinates | null;
	private offset: ICoordinates;
	
	constructor() {
		this.component = null;
		this.coords = null;
		this.offset = {x: 0, y: 0};
	};
	
	public setComponent = (components: Component, coords: ICoordinates) => {
		this.component = components;
		const rect = this.component.getRect();
		this.offset.x = coords.x - rect.x;
		this.offset.y = coords.y - rect.y;
	};
	
	public setCoordinates = (coordsOutput: ICoordinates) => {
		this.coords = {
			x: coordsOutput.x - this.offset.x,
			y: coordsOutput.y - this.offset.y,
		};
	};
	
	/** -------------------------------------------------------------------------------------
	 *     Метод, который вызывается при окончании переноса компонента, для его остановки.
	 */
	public stop = () => {
		this.component = null;
	};
	
	public callMoveComponent = () => {
		if (this.coords && this.component) {
			this.component.setPosition(this.coords);
		}
	};
}

export default ComponentManipulator;