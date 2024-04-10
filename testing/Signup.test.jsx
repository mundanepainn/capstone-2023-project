import React from 'react';
import {fireEvent, render, screen, waitFor } from "@testing-library/react";
import Signin from '../src/pages/SignIn';
import {BrowserRouter as Router} from 'react-router-dom';
import { describe, it, expect, test, beforeEach } from 'vitest';

/**
* @vitest-environment jsdom
*/

describe('Rendering the landing page', () => {
    const {container} = render(<Router><Signin /></Router>);
    test('expected that the form is shown', () => {
        const signform = screen.findByRole('form')
        expect(signform).toBeDefined()
    })

    test('tests to see if the expected text components are there', () => {
        expect(screen.getByText('E-mail'))
        expect(screen.getByText('Password'))
    })

});