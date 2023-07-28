import Component from './Component.ts';
import ICoordinates from '../interfaces/ICoordinates.ts';

/** ----------------------------------------------------
 *     Класс, хранящий созданные компоненты на экране.
 */
class ComponentStorage {
	private readonly componentStorage: Component[];
	
	constructor() {
		this.componentStorage = [];
	};
	
	public addComponent = (component: Component) => {
		this.componentStorage.push(component);
	};
	
	/** ----------------------------------------------------------------------
	 *     Удаляет из массива компонент, по которому произошло нажатие мыши.
	 *     @param coords - координаты мыши.
	 */
	public deleteComponentAt = (coords: ICoordinates) => {
		for (let i = 0; i < this.componentStorage.length; i++) {
			const component = this.componentStorage[i];
			const rect = component.getRect();
			if (coords.x >= rect.left && coords.x <= rect.right && coords.y >= rect.top && coords.y <= rect.bottom) {
				this.componentStorage.splice(i, 1);
				component.deleteComponent();
				break;
			}
		}
	};
	
	/** -----------------------------------------------------------------------------------------------------
	 *     Находит по координатам мыши компонент, на который произошло нажатие и выполняет его возвращение.
	 *     @param coords - координаты мыши.
	 */
	public componentSearch = (coords: ICoordinates): Component | undefined => this.componentStorage.find(comp => {
		const rect = comp.getRect();
		if (coords.x >= rect.left && coords.x <= rect.right && coords.y >= rect.top && coords.y <= rect.bottom) {
			return true;
		}
	});
}

export default ComponentStorage;