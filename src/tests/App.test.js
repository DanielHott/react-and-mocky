import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseApi from './mocks'

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    //Fazer o mock do fetch aqui 
    global.fetch = jest.fn( async () => ({
      json: async() => responseApi
    }))
    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', () => {
    const titleRick = screen.getByRole('heading', { level:3, name: /Rick Sanchez/i})
    expect(titleRick).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const inputTxt = screen.getByRole('textbox')
    const buttonSeach = screen.getByText(/buscar/i)
    expect(inputTxt).toBeInTheDocument()
    expect(buttonSeach).toBeInTheDocument()
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const inputTxt = screen.getByRole('textbox')
    userEvent.type(inputTxt, 'Smith')
    const buttonSeach = screen.getByText(/buscar/i)
    userEvent.click(buttonSeach)
    const names = screen.getAllByRole('heading', { level: 3, name: /Smith/i })
    expect(names.length).toBe(4)
  })

})
