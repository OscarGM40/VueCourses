import { shallowMount } from '@vue/test-utils'

// en el describe va únicamente el nombre del componente
describe('Example Component', () => {
  // en it debo usar como descripcion lo que quiero testear
  it('debe de ser mayor a 10', () => {
    // value es el sujeto de pruebas(qué es un sujeto de pruebas??)
    // arreglar(Arrange)
    let ouncesPerCan = 5; 

    // shallow es poco profundo(sólo renderiza un nivel??) (shallow !== deep)
    // actuar(Act)
    ouncesPerCan = ouncesPerCan + 12;
    
    // afirmar(Assert) 
    expect(ouncesPerCan).toBeGreaterThan(10)
  })
})
