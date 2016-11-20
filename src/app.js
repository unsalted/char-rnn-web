
export class App {

  configureRouter(config, router) {
    this.router = router

    config.title = 'Aurelia';
    config.map([
      { route: ['', 'home'], name: 'Hello', moduleId: 'home' },
      { route: 'editor', name: 'Editor', moduleId: 'text-editor' }
    ])
  }

}