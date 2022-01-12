import { screen, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import CharacterList from './CharacterList'
import App from '../../App';

const server = setupServer();
rest.get('https://rickandmortyapi.com/api/character', (req, res, ctx) => {
    return res(ctx.json({
        info: {
            pages: 1
        },
        results: [
            {image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
            name:'Rick Sanchez'
        },
        {
            image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
            name: 'Morty Smith'
        }
        ]
    
        
}))
})
describe('CharacterList', () => {
    beforeAll(() => {
        server.listen();
    })
    afterAll(() => {
        server.close();
    })
    it('should render a character list', async () => {
        render(
            <MemoryRouter initialEntries={['/characters']}>
                <App />
            </MemoryRouter>
        )

        screen.getByText('Characters')
        await screen.findByText('Rick Sanchez');
        await screen.findByText('Morty Smith');
    })
})