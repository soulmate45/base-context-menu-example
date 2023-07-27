import Component from './Component.ts';
import Coordinates from '../interfaces/Coordinates.ts';

class ComponentStorage {
	private readonly componentStorage: Component[];
	
	constructor() {
		this.componentStorage = [];
	}
	
	public addComponent = (component: Component) => {
		this.componentStorage.push(component)
	}
	
	public deleteComponentAt = (coords: Coordinates) => {
		for (let i = 0; i < this.componentStorage.length; i++) {
			const component = this.componentStorage[i];
			const rect = component.getRect();
			if (coords.x >= rect.left && coords.x <= rect.right && coords.y >= rect.top && coords.y <= rect.bottom) {
				this.componentStorage.splice(i, 1);
				component.deleteComponent();
				break;
			}
		}
	}
	
	public componentSearch = (coords: Coordinates): Component | undefined => {
		for (let i = 0; i < this.componentStorage.length; i++) {
			const component = this.componentStorage[i];
			const rect = component.getRect();
			if (coords.x >= rect.left && coords.x <= rect.right && coords.y >= rect.top && coords.y <= rect.bottom) {
				return component;
			}
		}
		return undefined;
	}
}

export default ComponentStorage;