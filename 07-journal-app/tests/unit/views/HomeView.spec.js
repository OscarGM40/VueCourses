import HomeView from '@/views/HomeView.vue'
import { shallowMount } from '@vue/test-utils'

describe('HomeView Cmp test suite', () => { 
  
  afterEach(() => jest.clearAllMocks());
  
  test('should match snapshot', () => { 
    const wrapper = shallowMount(HomeView);
    expect(wrapper).toMatchSnapshot(); 
  })
  
  test('click on a button should redirect to no-entry',() => {
    const mockRouter = {
      push: jest.fn()
    }
     const wrapper = shallowMount(HomeView,{
      global:{
        mocks:{
          $router: mockRouter
        }
      }
     });
    //  que encuentre el primero,nos da igual
     const btn = wrapper.find('button');
     btn.trigger('click')
     expect(mockRouter.push).toHaveBeenCalledTimes(1)
     expect(mockRouter.push).toHaveBeenCalledWith({name:"no-entry"})
   })
   
 })