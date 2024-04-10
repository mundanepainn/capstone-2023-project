import React from 'react';
import {fireEvent, render, screen, waitFor } from "@testing-library/react";
import WedoNavbar from '../src/components/WedoNavbar';
import {BrowserRouter as Router} from 'react-router-dom';
import { describe, it, expect, test, beforeEach } from 'vitest';

/**
* @vitest-environment jsdom
*/
describe("Rendering NavBar component", () => {
    const {container} = render(<Router><WedoNavbar /></Router>);
    test('Should render the WedoNavBar', () => {
        expect(container.firstChild.classList.contains('wedonav')).toBe(true);
    })

    test('should retrieve a length of four to represent the amount of buttons', () => {
        expect(screen.getAllByRole('button').length).toBe(4);
    })

    test('should retrieve the test ids of all components', () => {
        expect(screen.getByTestId('SearchIcon'));
        expect(screen.getByTestId('ChatIcon'));
        expect(screen.getByTestId('EventIcon'));
        expect(screen.getByTestId('AccountBoxIcon'));
    })
    test('the hosting and joining buttons should function properly', () => {
        const eventButton = screen.getByTestId('EventIcon')
        expect(screen.queryByText('Hosting')).toBeNull()
        expect(screen.queryByText('Joining')).toBeNull()

        fireEvent.click(eventButton)

        expect(screen.getByText('Hosting'))
        expect(screen.getByText('Joining'))

        fireEvent.click(eventButton)

        expect(screen.queryByText('Hosting')).toBeNull()
        expect(screen.queryByText('Joining')).toBeNull()
    })
});