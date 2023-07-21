import Component from './Component.ts';

class ComponentStorage {
	private readonly componentStorage: Component[];
	
	constructor() {
		this.componentStorage = [];
	}
	
	public addElement = (component: Component) => {
		this.componentStorage.push(component)
	}
}

export default ComponentStorage;