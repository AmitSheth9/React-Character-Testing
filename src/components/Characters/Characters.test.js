import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import Characters from './Characters'

const characters = [
    {
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg", 
    name: 'Rick Sanchez', 
    },
    {
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        name: 'Morty Smith'
    }
]

it('renders a character list', () => {
        const container = render  (
        <MemoryRouter initialEntries={['/characters']}>
        <Characters characters={characters} />
        </MemoryRouter>
        );
        expect(container).toMatchSnapshot();
      
});