class AddWindow {
	private readonly root: HTMLElement;
	private readonly image: HTMLImageElement;
	
	constructor(rootElement: HTMLElement) {
		this.root = rootElement;
		this.image = document.createElement('img')
		this.image.src = 'https://avatars.mds.yandex.net/get-afishanew/31447/01cb6baba420b2b38bc01d427a65554b/s270x190'
		this.image.className = 'img-kipelov'
    this.root.append(this.image);
	}
}

export default AddWindow;