import {screen, render } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import { MemoryRouter } from 'react-router-dom'
import CharacterDetail from './CharacterDetail';
import App from '../../App';

const server = setupServer();
rest.get('https://rickandmortyapi.com/api/character/:id', (req, res, ctx) => {
    return res(ctx.json({id: 1, image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg", name: 'Rick Sanchez', species: 'Human', status: 'Alive' }))
});

describe('CharacterDetail', () => {
    beforeAll(() => {
        server.listen();
    })
    afterAll(() => {
        server.close();
    })

    it('should render a character', async () => {
        render(

        <MemoryRouter initialEntries={['/characters/1']} >
                <App />
        </MemoryRouter>
        )
        screen.getByText('Loading character...');
        await screen.findByText('Rick Sanchez');
    })
})