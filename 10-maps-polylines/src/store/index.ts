import { createStore } from 'vuex'

import exampleModule from './module-template';
import { ExampleStateInterface} from './module-template/state';

// es el estado global de la app
export interface RootState {
  example: ExampleStateInterface
}
// le pasamos el RootType a este createStore
export default createStore<RootState>({
  modules: {
    example: exampleModule
  }
})
