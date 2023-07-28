import PictureComponent from '../../components/PictureComponent.ts';
import TextComponent from '../../components/TextComponent.ts';
import Component from '../../components/Component.ts';
import ComponentType from '../../components/ComponentType.ts';

/** --------------------------------
 *     Класс, создающий компоненты.
 */
class Factory {
	public getComponent = (type: ComponentType): Component => {
		switch (type) {
			case ComponentType.PICTURE_COMPONENT: {
				return new PictureComponent();
			}
			case ComponentType.TEXT_COMPONENT: {
				return new TextComponent();
			}
		}
	};
}

export default Factory;